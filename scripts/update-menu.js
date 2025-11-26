#!/usr/bin/env node

/**
 * Menu Update Script
 *
 * This script helps validate and update menu items in the menu-items.json file.
 *
 * Usage:
 *   node scripts/update-menu.js validate    - Validate the menu data
 *   node scripts/update-menu.js list        - List all menu items
 *   node scripts/update-menu.js check-id <id> - Check if an ID exists
 *
 * To update menu items, edit data/menu-items.json directly and run:
 *   node scripts/update-menu.js validate
 */

const fs = require('fs');
const path = require('path');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// File paths
const MENU_FILE = path.join(process.cwd(), 'data', 'menu-items.json');
const IMAGES_DIR = path.join(process.cwd(), 'images');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

// Helper functions
function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  log(`❌ ERROR: ${message}`, 'red');
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function warning(message) {
  log(`⚠️  WARNING: ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'cyan');
}

// Load menu data
function loadMenuData() {
  try {
    const data = fs.readFileSync(MENU_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    error(`Failed to load menu data: ${err.message}`);
    process.exit(1);
  }
}

// Validate a single menu item
function validateMenuItem(item, category) {
  const errors = [];
  const warnings = [];

  // Validate ID
  if (!item.id || typeof item.id !== 'string' || item.id.trim() === '') {
    errors.push('ID is required');
  } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(item.id)) {
    errors.push(`ID "${item.id}" must be lowercase with hyphens only (e.g., "classic-smash")`);
  }

  // Validate name
  if (!item.name || typeof item.name !== 'string' || item.name.trim() === '') {
    errors.push('Name is required');
  } else if (item.name.length > 100) {
    errors.push('Name must be 100 characters or less');
  }

  // Validate description
  if (!item.description || typeof item.description !== 'string' || item.description.trim() === '') {
    errors.push('Description is required');
  } else if (item.description.length < 10) {
    errors.push('Description must be at least 10 characters');
  } else if (item.description.length > 200) {
    errors.push('Description must be 200 characters or less');
  }

  // Validate price
  if (!item.price || typeof item.price !== 'string') {
    errors.push('Price is required');
  } else if (!/^[0-9]+\.[0-9]{2}$/.test(item.price)) {
    errors.push(`Price "${item.price}" must be in format XX.XX (e.g., "10.99") without dollar sign`);
  }

  // Validate category
  if (!item.category || typeof item.category !== 'string') {
    errors.push('Category is required');
  } else if (!['burgers', 'chicken', 'reubens', 'sides'].includes(item.category)) {
    errors.push('Category must be one of: burgers, chicken, reubens, sides');
  } else if (item.category !== category) {
    errors.push(`Category "${item.category}" does not match section "${category}"`);
  }

  // Validate imagePath
  if (!item.imagePath || typeof item.imagePath !== 'string' || item.imagePath.trim() === '') {
    errors.push('Image path is required');
  } else if (!item.imagePath.startsWith('/images/')) {
    errors.push('Image path must start with "/images/"');
  } else if (!/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/.test(item.imagePath)) {
    errors.push('Image path must end with a valid image extension');
  } else {
    // Check if image file exists
    const filename = item.imagePath.replace('/images/', '');
    const imagesPath = path.join(IMAGES_DIR, filename);
    const publicPath = path.join(PUBLIC_IMAGES_DIR, filename);

    if (!fs.existsSync(imagesPath) && !fs.existsSync(publicPath)) {
      warnings.push(`Image file not found: ${item.imagePath}`);
    }
  }

  // Validate featured
  if (typeof item.featured !== 'boolean') {
    errors.push('Featured must be true or false');
  }

  // Check for extra fields
  const validFields = ['id', 'name', 'description', 'price', 'category', 'imagePath', 'featured'];
  const extraFields = Object.keys(item).filter(key => !validFields.includes(key));
  if (extraFields.length > 0) {
    warnings.push(`Extra fields found: ${extraFields.join(', ')}`);
  }

  return { errors, warnings };
}

// Validate all menu data
function validateMenuData() {
  log('\n📋 Validating Menu Data...\n', 'blue');

  const menuData = loadMenuData();
  let totalErrors = 0;
  let totalWarnings = 0;
  let totalItems = 0;
  const duplicateIds = new Set();
  const allIds = new Set();

  const categories = ['burgers', 'chicken', 'reubens', 'sides'];

  for (const category of categories) {
    if (!menuData[category]) {
      error(`Missing category: ${category}`);
      totalErrors++;
      continue;
    }

    if (!Array.isArray(menuData[category])) {
      error(`Category "${category}" must be an array`);
      totalErrors++;
      continue;
    }

    log(`\n${category.toUpperCase()}:`, 'magenta');

    menuData[category].forEach((item, index) => {
      totalItems++;
      const { errors, warnings } = validateMenuItem(item, category);

      // Check for duplicate IDs
      if (item.id) {
        if (allIds.has(item.id)) {
          duplicateIds.add(item.id);
          errors.push(`Duplicate ID found: ${item.id}`);
        }
        allIds.add(item.id);
      }

      if (errors.length > 0 || warnings.length > 0) {
        log(`\n  Item ${index + 1}: ${item.name || '(unnamed)'}`, 'yellow');

        errors.forEach(err => {
          error(`    ${err}`);
          totalErrors++;
        });

        warnings.forEach(warn => {
          warning(`    ${warn}`);
          totalWarnings++;
        });
      } else {
        success(`  ✓ ${item.name} ($${item.price})`);
      }
    });
  }

  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log('VALIDATION SUMMARY', 'blue');
  log('='.repeat(60), 'blue');
  log(`Total Items: ${totalItems}`);
  log(`Total Errors: ${totalErrors}`, totalErrors > 0 ? 'red' : 'green');
  log(`Total Warnings: ${totalWarnings}`, totalWarnings > 0 ? 'yellow' : 'green');

  if (totalErrors === 0) {
    success('\n🎉 All menu items are valid!\n');
    return true;
  } else {
    error('\n❌ Please fix the errors above before using the menu data.\n');
    return false;
  }
}

// List all menu items
function listMenuItems() {
  const menuData = loadMenuData();

  log('\n📋 All Menu Items\n', 'blue');

  const categories = ['burgers', 'chicken', 'reubens', 'sides'];

  categories.forEach(category => {
    if (!menuData[category]) return;

    log(`\n${category.toUpperCase()}:`, 'magenta');
    log('─'.repeat(60), 'blue');

    menuData[category].forEach((item, index) => {
      const featuredBadge = item.featured ? ' ⭐' : '';
      log(`${index + 1}. ${item.name}${featuredBadge}`, 'cyan');
      log(`   ID: ${item.id}`, 'reset');
      log(`   Price: $${item.price}`, 'green');
      log(`   Description: ${item.description}`, 'reset');
      log(`   Image: ${item.imagePath}`, 'reset');
      log('');
    });
  });
}

// Check if an ID exists
function checkId(id) {
  const menuData = loadMenuData();
  const categories = ['burgers', 'chicken', 'reubens', 'sides'];

  for (const category of categories) {
    if (!menuData[category]) continue;

    const item = menuData[category].find(item => item.id === id);
    if (item) {
      success(`\n✅ ID "${id}" exists in category "${category}"\n`);
      log('Item Details:', 'cyan');
      log(JSON.stringify(item, null, 2), 'reset');
      return true;
    }
  }

  error(`\n❌ ID "${id}" not found\n`);
  return false;
}

// Show help
function showHelp() {
  log('\n📖 Menu Update Script - Help\n', 'blue');
  log('Usage:', 'cyan');
  log('  node scripts/update-menu.js <command> [options]\n', 'reset');
  log('Commands:', 'cyan');
  log('  validate           - Validate all menu items', 'reset');
  log('  list               - List all menu items', 'reset');
  log('  check-id <id>      - Check if a menu item ID exists', 'reset');
  log('  help               - Show this help message\n', 'reset');
  log('Examples:', 'cyan');
  log('  node scripts/update-menu.js validate', 'reset');
  log('  node scripts/update-menu.js list', 'reset');
  log('  node scripts/update-menu.js check-id classic-smash\n', 'reset');
}

// Main
function main() {
  const command = process.argv[2];

  if (!command || command === 'help') {
    showHelp();
    return;
  }

  switch (command) {
    case 'validate':
      const isValid = validateMenuData();
      process.exit(isValid ? 0 : 1);
      break;

    case 'list':
      listMenuItems();
      break;

    case 'check-id':
      const id = process.argv[3];
      if (!id) {
        error('Please provide an ID to check');
        log('Usage: node scripts/update-menu.js check-id <id>\n', 'cyan');
        process.exit(1);
      }
      checkId(id);
      break;

    default:
      error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main();
