#!/usr/bin/env node

/**
 * Image Management Script
 *
 * This script helps manage and organize images for the Smash Burgers website.
 *
 * Usage:
 *   node scripts/update-images.js list           - List all images in /images/
 *   node scripts/update-images.js check          - Check image references
 *   node scripts/update-images.js unused         - Find unused images
 *   node scripts/update-images.js validate       - Validate image mappings
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
const IMAGES_DIR = path.join(process.cwd(), 'images');
const PUBLIC_IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const MENU_FILE = path.join(process.cwd(), 'data', 'menu-items.json');
const IMAGE_MAPPINGS_FILE = path.join(process.cwd(), 'data', 'image-mappings.json');

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

// Get all image files
function getImageFiles() {
  let images = [];

  // Check main images directory
  if (fs.existsSync(IMAGES_DIR)) {
    const files = fs.readdirSync(IMAGES_DIR);
    images = files.filter(file =>
      /\.(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG|WEBP|GIF)$/i.test(file)
    );
  }

  // Check public/images directory
  if (fs.existsSync(PUBLIC_IMAGES_DIR)) {
    const files = fs.readdirSync(PUBLIC_IMAGES_DIR);
    const publicImages = files.filter(file =>
      /\.(jpg|jpeg|png|webp|gif|JPG|JPEG|PNG|WEBP|GIF)$/i.test(file)
    );
    images = [...images, ...publicImages];
  }

  return [...new Set(images)]; // Remove duplicates
}

// Load menu data
function loadMenuData() {
  try {
    const data = fs.readFileSync(MENU_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    error(`Failed to load menu data: ${err.message}`);
    return null;
  }
}

// Load image mappings
function loadImageMappings() {
  try {
    const data = fs.readFileSync(IMAGE_MAPPINGS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    error(`Failed to load image mappings: ${err.message}`);
    return null;
  }
}

// Get all referenced images from menu data
function getReferencedImagesFromMenu() {
  const menuData = loadMenuData();
  if (!menuData) return [];

  const images = [];
  const categories = ['burgers', 'chicken', 'reubens', 'sides'];

  categories.forEach(category => {
    if (menuData[category]) {
      menuData[category].forEach(item => {
        if (item.imagePath) {
          images.push(item.imagePath.replace('/images/', ''));
        }
      });
    }
  });

  return images;
}

// Get all referenced images from image mappings
function getReferencedImagesFromMappings() {
  const mappings = loadImageMappings();
  if (!mappings) return [];

  const images = [];

  // Helper to extract image paths
  const extractPaths = (obj) => {
    if (!obj) return;

    if (obj.path) {
      images.push(obj.path.replace('/images/', ''));
    }

    if (typeof obj === 'object') {
      Object.values(obj).forEach(value => {
        if (typeof value === 'object') {
          extractPaths(value);
        }
      });
    }
  };

  extractPaths(mappings);
  return images;
}

// List all images
function listImages() {
  log('\n🖼️  All Images\n', 'blue');

  const images = getImageFiles();

  if (images.length === 0) {
    warning('No images found in /images/ directory');
    return;
  }

  images.forEach((image, index) => {
    const fullPath = `/images/${image}`;
    log(`${index + 1}. ${image}`, 'cyan');

    // Check if image exists in both locations
    const inImages = fs.existsSync(path.join(IMAGES_DIR, image));
    const inPublic = fs.existsSync(path.join(PUBLIC_IMAGES_DIR, image));

    if (inImages && inPublic) {
      warning(`   Found in both /images/ and /public/images/`);
    } else if (inImages) {
      info(`   Location: /images/`);
    } else if (inPublic) {
      info(`   Location: /public/images/`);
    }

    // Get file size
    const filePath = inImages
      ? path.join(IMAGES_DIR, image)
      : path.join(PUBLIC_IMAGES_DIR, image);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      log(`   Size: ${sizeKB} KB`, 'reset');
    }

    log('');
  });

  log(`\nTotal: ${images.length} images\n`, 'green');
}

// Check image references
function checkImageReferences() {
  log('\n🔍 Checking Image References\n', 'blue');

  const allImages = getImageFiles();
  const menuImages = getReferencedImagesFromMenu();
  const mappingImages = getReferencedImagesFromMappings();
  const allReferences = [...new Set([...menuImages, ...mappingImages])];

  let missingCount = 0;

  log('MENU ITEM IMAGES:', 'magenta');
  log('─'.repeat(60), 'blue');

  if (menuImages.length === 0) {
    warning('No images referenced in menu data');
  } else {
    menuImages.forEach(image => {
      const exists = allImages.includes(image);
      if (exists) {
        success(`✓ ${image}`);
      } else {
        error(`✗ ${image} (MISSING)`);
        missingCount++;
      }
    });
  }

  log('\nIMAGE MAPPING REFERENCES:', 'magenta');
  log('─'.repeat(60), 'blue');

  if (mappingImages.length === 0) {
    warning('No images referenced in image mappings');
  } else {
    mappingImages.forEach(image => {
      const exists = allImages.includes(image);
      if (exists) {
        success(`✓ ${image}`);
      } else {
        error(`✗ ${image} (MISSING)`);
        missingCount++;
      }
    });
  }

  log('\n' + '='.repeat(60), 'blue');
  log(`Total referenced images: ${allReferences.length}`);
  log(`Missing images: ${missingCount}`, missingCount > 0 ? 'red' : 'green');

  if (missingCount === 0) {
    success('\n🎉 All referenced images exist!\n');
  } else {
    error('\n❌ Some images are missing. Please add them to /images/\n');
  }
}

// Find unused images
function findUnusedImages() {
  log('\n🗑️  Finding Unused Images\n', 'blue');

  const allImages = getImageFiles();
  const menuImages = getReferencedImagesFromMenu();
  const mappingImages = getReferencedImagesFromMappings();
  const allReferences = [...new Set([...menuImages, ...mappingImages])];

  const unusedImages = allImages.filter(image => !allReferences.includes(image));

  if (unusedImages.length === 0) {
    success('✅ All images are being used!\n');
    return;
  }

  log('The following images are not referenced anywhere:', 'yellow');
  log('─'.repeat(60), 'blue');

  unusedImages.forEach((image, index) => {
    log(`${index + 1}. ${image}`, 'cyan');

    const filePath = fs.existsSync(path.join(IMAGES_DIR, image))
      ? path.join(IMAGES_DIR, image)
      : path.join(PUBLIC_IMAGES_DIR, image);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      log(`   Size: ${sizeKB} KB`, 'reset');
    }
  });

  log(`\nTotal unused images: ${unusedImages.length}`, 'yellow');
  log('\nThese images can be safely deleted if they are not needed.\n', 'cyan');
}

// Validate image mappings
function validateImageMappings() {
  log('\n✓ Validating Image Mappings\n', 'blue');

  const mappings = loadImageMappings();
  if (!mappings) {
    process.exit(1);
  }

  let errorCount = 0;
  let warningCount = 0;

  // Validate structure
  const validateMapping = (mapping, name) => {
    if (!mapping.path) {
      error(`${name}: Missing 'path' field`);
      errorCount++;
    } else if (!mapping.path.startsWith('/images/')) {
      error(`${name}: Path must start with '/images/'`);
      errorCount++;
    }

    if (!mapping.alt) {
      warning(`${name}: Missing 'alt' text (important for accessibility)`);
      warningCount++;
    } else if (mapping.alt.length < 10) {
      warning(`${name}: Alt text is too short (should be descriptive)`);
      warningCount++;
    }

    if (!mapping.description) {
      warning(`${name}: Missing 'description' field`);
      warningCount++;
    }
  };

  // Check hero images
  if (mappings.hero && mappings.hero.main) {
    validateMapping(mappings.hero.main, 'Hero Main');
  } else {
    error('Missing hero.main image mapping');
    errorCount++;
  }

  // Check featured images
  const featuredCategories = ['burgers', 'chicken', 'reubens', 'fries'];
  featuredCategories.forEach(category => {
    if (mappings.featured && mappings.featured[category]) {
      validateMapping(mappings.featured[category], `Featured ${category}`);
    } else {
      warning(`Missing featured.${category} image mapping`);
      warningCount++;
    }
  });

  // Check menu item images
  if (mappings.menuItems) {
    Object.entries(mappings.menuItems).forEach(([id, mapping]) => {
      validateMapping(mapping, `Menu Item: ${id}`);
    });
  }

  // Check about images
  if (mappings.about && mappings.about.restaurant) {
    validateMapping(mappings.about.restaurant, 'About Restaurant');
  } else {
    warning('Missing about.restaurant image mapping');
    warningCount++;
  }

  log('\n' + '='.repeat(60), 'blue');
  log(`Total errors: ${errorCount}`, errorCount > 0 ? 'red' : 'green');
  log(`Total warnings: ${warningCount}`, warningCount > 0 ? 'yellow' : 'green');

  if (errorCount === 0 && warningCount === 0) {
    success('\n🎉 All image mappings are valid!\n');
  } else if (errorCount === 0) {
    warning('\n⚠️  Image mappings are valid but have some warnings.\n');
  } else {
    error('\n❌ Please fix the errors in image mappings.\n');
  }
}

// Show help
function showHelp() {
  log('\n📖 Image Management Script - Help\n', 'blue');
  log('Usage:', 'cyan');
  log('  node scripts/update-images.js <command>\n', 'reset');
  log('Commands:', 'cyan');
  log('  list               - List all images in /images/', 'reset');
  log('  check              - Check if all referenced images exist', 'reset');
  log('  unused             - Find images that are not being used', 'reset');
  log('  validate           - Validate image mapping structure', 'reset');
  log('  help               - Show this help message\n', 'reset');
  log('Examples:', 'cyan');
  log('  node scripts/update-images.js list', 'reset');
  log('  node scripts/update-images.js check', 'reset');
  log('  node scripts/update-images.js unused\n', 'reset');
}

// Main
function main() {
  const command = process.argv[2];

  if (!command || command === 'help') {
    showHelp();
    return;
  }

  switch (command) {
    case 'list':
      listImages();
      break;

    case 'check':
      checkImageReferences();
      break;

    case 'unused':
      findUnusedImages();
      break;

    case 'validate':
      validateImageMappings();
      break;

    default:
      error(`Unknown command: ${command}`);
      showHelp();
      process.exit(1);
  }
}

main();
