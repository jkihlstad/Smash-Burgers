# Content Update Guide for Smash Burgers Website

This guide will help you update menu items, prices, descriptions, and images on the Smash Burgers website - even if you have no technical experience!

## Table of Contents

1. [Quick Start](#quick-start)
2. [Updating Menu Prices](#updating-menu-prices)
3. [Changing Menu Item Descriptions](#changing-menu-item-descriptions)
4. [Adding New Menu Items](#adding-new-menu-items)
5. [Updating Images](#updating-images)
6. [Adding New Images](#adding-new-images)
7. [Using the Validation Tools](#using-the-validation-tools)
8. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
9. [Getting Help](#getting-help)

---

## Quick Start

All menu content is stored in easy-to-edit JSON files:

- **Menu Items**: `data/menu-items.json`
- **Images**: `data/image-mappings.json`
- **Schema Reference**: `data/menu-schema.json` (explains the structure)

### Before You Start

1. Open the file in a text editor (VS Code, Sublime Text, or even Notepad)
2. Make your changes carefully
3. Save the file
4. Run the validation script to check for errors
5. If validation passes, your changes will appear on the website!

---

## Updating Menu Prices

**How long it takes:** 2-3 minutes per item

### Step-by-Step Instructions

1. **Open the menu data file**
   - Navigate to: `data/menu-items.json`
   - Open it in your text editor

2. **Find the item you want to update**
   - Use your editor's "Find" feature (Ctrl+F or Cmd+F)
   - Search for the item name (e.g., "Classic Smash")

3. **Update the price**
   - Look for the line that says `"price": "10.99"`
   - Change the number to your new price
   - **IMPORTANT**:
     - DO NOT include the dollar sign ($)
     - ALWAYS use exactly 2 decimal places (e.g., `"10.99"` not `"11"` or `"10.9"`)
     - Keep the quotation marks around the price

4. **Example:**

   ```json
   {
     "id": "classic-smash",
     "name": "The Classic Smash",
     "description": "A juicy smashed patty, American cheese, pickles, signature sauce.",
     "price": "10.99",    ← Change this number only
     "category": "burgers",
     "imagePath": "/images/IMG_6456.JPG",
     "featured": true
   }
   ```

   To change to $12.99:

   ```json
   "price": "12.99",
   ```

5. **Save the file**
   - Press Ctrl+S (Windows) or Cmd+S (Mac)

6. **Validate your changes** (see [Using the Validation Tools](#using-the-validation-tools))

---

## Changing Menu Item Descriptions

**How long it takes:** 3-5 minutes per item

### Step-by-Step Instructions

1. **Open the menu data file**
   - Navigate to: `data/menu-items.json`

2. **Find the item you want to update**
   - Use Find (Ctrl+F or Cmd+F) to search for the item name

3. **Update the description**
   - Look for the `"description"` line
   - Change the text between the quotation marks
   - **Guidelines**:
     - Keep it between 10-200 characters
     - Make it appetizing and descriptive
     - List key ingredients or features

4. **Example:**

   ```json
   {
     "id": "classic-smash",
     "name": "The Classic Smash",
     "description": "A juicy smashed patty, American cheese, pickles, signature sauce.",
     "price": "10.99",
     "category": "burgers",
     "imagePath": "/images/IMG_6456.JPG",
     "featured": true
   }
   ```

   To update the description:

   ```json
   "description": "Our signature beef patty, perfectly smashed and topped with melted American cheese, crisp pickles, and house-made sauce.",
   ```

5. **Save the file**

6. **Validate your changes**

---

## Adding New Menu Items

**How long it takes:** 5-10 minutes per item

### Step-by-Step Instructions

1. **Open the menu data file**
   - Navigate to: `data/menu-items.json`

2. **Decide which category**
   - Choose from: `burgers`, `chicken`, `reubens`, or `sides`

3. **Find the category section**
   - Locate the category array in the file
   - Example: `"burgers": [`

4. **Copy an existing item as a template**
   - Find a similar item in the same category
   - Copy everything from the opening `{` to the closing `}`
   - Paste it at the end of the category array
   - **IMPORTANT**: Add a comma after the previous item!

5. **Update all fields**

   ```json
   {
     "id": "your-new-item-id",           ← Unique ID (lowercase, hyphens only)
     "name": "Your New Item Name",       ← Display name
     "description": "Description here.", ← Short description (10-200 chars)
     "price": "12.99",                   ← Price (no $ symbol, 2 decimals)
     "category": "burgers",              ← Must match the section
     "imagePath": "/images/your-image.jpg", ← Path to image
     "featured": false                   ← true or false (no quotes!)
   }
   ```

6. **Creating a unique ID**
   - Use lowercase letters and numbers only
   - Separate words with hyphens
   - Examples: `"spicy-bacon-burger"`, `"loaded-fries"`, `"bbq-chicken"`

7. **Complete Example:**

   **Before** (existing items):
   ```json
   "burgers": [
     {
       "id": "classic-smash",
       "name": "The Classic Smash",
       "description": "A juicy smashed patty, American cheese, pickles, signature sauce.",
       "price": "10.99",
       "category": "burgers",
       "imagePath": "/images/IMG_6456.JPG",
       "featured": true
     }
   ]
   ```

   **After** (with new item added):
   ```json
   "burgers": [
     {
       "id": "classic-smash",
       "name": "The Classic Smash",
       "description": "A juicy smashed patty, American cheese, pickles, signature sauce.",
       "price": "10.99",
       "category": "burgers",
       "imagePath": "/images/IMG_6456.JPG",
       "featured": true
     },                                    ← Notice the comma here!
     {
       "id": "spicy-jalapeño-smash",
       "name": "Spicy Jalapeño Smash",
       "description": "Double patty, pepper jack cheese, jalapeños, chipotle mayo, crispy onions.",
       "price": "13.99",
       "category": "burgers",
       "imagePath": "/images/spicy-burger.jpg",
       "featured": false
     }
   ]
   ```

8. **Save and validate**

---

## Updating Images

**How long it takes:** 5 minutes per image

### Step-by-Step Instructions

1. **Prepare your new image**
   - Recommended size: At least 800x800 pixels
   - Format: JPG, PNG, or WEBP
   - Good quality, well-lit food photography

2. **Add the image to the images folder**
   - Copy your image file to the `/images/` folder
   - Use a descriptive filename (e.g., `classic-burger.jpg`)

3. **Update the menu item**
   - Open `data/menu-items.json`
   - Find the item you want to update
   - Change the `"imagePath"` field

   ```json
   "imagePath": "/images/your-new-image.jpg",
   ```

4. **Update the image mappings (optional but recommended)**
   - Open `data/image-mappings.json`
   - Find the menu item by its ID under `"menuItems"`
   - Update the path and alt text:

   ```json
   "menuItems": {
     "classic-smash": {
       "path": "/images/new-classic-burger.jpg",
       "alt": "The Classic Smash burger with American cheese and pickles",
       "description": "Updated classic burger photo"
     }
   }
   ```

5. **Save both files**

6. **Validate your changes**

---

## Adding New Images

**How long it takes:** 3-5 minutes

### For Menu Items

Follow the steps in [Updating Images](#updating-images) above.

### For Hero/Featured Images

1. **Add image to the images folder**
   - Copy your image to `/images/`

2. **Update image mappings**
   - Open `data/image-mappings.json`
   - Find the appropriate section:
     - `"hero"` - Main homepage banner
     - `"featured"` - Category showcase images
     - `"about"` - About page images

3. **Update the path and description**

   ```json
   "hero": {
     "main": {
       "path": "/images/new-hero-image.jpg",
       "alt": "Delicious smash burger with fries",
       "description": "New hero image for homepage"
     }
   }
   ```

4. **Save and validate**

---

## Using the Validation Tools

These tools help catch errors before they break your website!

### Validate Menu Items

**Windows:**
```bash
node scripts/update-menu.js validate
```

**Mac/Linux:**
```bash
node scripts/update-menu.js validate
```

**What it checks:**
- All required fields are present
- Prices are formatted correctly
- IDs are unique
- Categories match
- Image paths are valid

**Example output:**

```
✅ VALIDATION SUMMARY
Total Items: 10
Total Errors: 0
Total Warnings: 0

🎉 All menu items are valid!
```

### Validate Images

```bash
node scripts/update-images.js check
```

**What it checks:**
- All referenced images exist
- Image paths are correct
- No missing images

### List All Menu Items

```bash
node scripts/update-menu.js list
```

Shows all menu items with their details.

### Find Unused Images

```bash
node scripts/update-images.js unused
```

Shows images that aren't being used anywhere (safe to delete).

---

## Common Mistakes to Avoid

### 1. Including the Dollar Sign in Price

❌ **WRONG:**
```json
"price": "$10.99",
```

✅ **CORRECT:**
```json
"price": "10.99",
```

### 2. Wrong Price Format

❌ **WRONG:**
```json
"price": "10.9",   ← Missing second decimal
"price": "11",     ← No decimals
"price": 10.99,    ← Missing quotes
```

✅ **CORRECT:**
```json
"price": "10.99",
```

### 3. Forgetting Commas Between Items

❌ **WRONG:**
```json
{
  "id": "item-1",
  "name": "Item 1"
}               ← Missing comma!
{
  "id": "item-2",
  "name": "Item 2"
}
```

✅ **CORRECT:**
```json
{
  "id": "item-1",
  "name": "Item 1"
},              ← Comma here!
{
  "id": "item-2",
  "name": "Item 2"
}
```

### 4. Using Uppercase in IDs

❌ **WRONG:**
```json
"id": "Classic-Smash",
"id": "CLASSIC_SMASH",
```

✅ **CORRECT:**
```json
"id": "classic-smash",
```

### 5. Wrong Image Path

❌ **WRONG:**
```json
"imagePath": "images/burger.jpg",    ← Missing leading /
"imagePath": "burger.jpg",           ← Missing /images/
"imagePath": "/public/images/burger.jpg", ← Don't include public
```

✅ **CORRECT:**
```json
"imagePath": "/images/burger.jpg",
```

### 6. Missing Quotes on Boolean Values

For the `featured` field:

❌ **WRONG:**
```json
"featured": "true",   ← Don't use quotes
"featured": "false",  ← Don't use quotes
```

✅ **CORRECT:**
```json
"featured": true,
"featured": false,
```

### 7. Category Mismatch

If adding to the "burgers" section:

❌ **WRONG:**
```json
"burgers": [
  {
    "id": "item",
    "category": "chicken",  ← Wrong category!
    ...
  }
]
```

✅ **CORRECT:**
```json
"burgers": [
  {
    "id": "item",
    "category": "burgers",  ← Matches section!
    ...
  }
]
```

---

## Getting Help

### If Validation Fails

1. **Read the error message carefully**
   - The validation script will tell you exactly what's wrong
   - It will show you the item name and the specific error

2. **Common fixes:**
   - Check for missing commas
   - Verify all quotation marks are matching
   - Make sure price format is correct
   - Ensure ID is lowercase with hyphens only

3. **Example error:**
   ```
   ❌ ERROR: Price "10.9" must be in format XX.XX (e.g., "10.99")
   ```
   Fix: Change `"10.9"` to `"10.99"`

### If Images Don't Appear

1. **Check the image path**
   - Make sure it starts with `/images/`
   - Make sure the filename matches exactly (case-sensitive!)

2. **Check the file exists**
   - Look in the `/images/` folder
   - Verify the filename is spelled correctly

3. **Run the image checker**
   ```bash
   node scripts/update-images.js check
   ```

### Need More Help?

- Check `data/menu-schema.json` for field descriptions
- Run validation scripts after every change
- Keep a backup of the original file before making changes
- Test changes on a development version first if possible

---

## Quick Reference Card

### Menu Item Structure

```json
{
  "id": "unique-item-id",
  "name": "Display Name",
  "description": "10-200 character description.",
  "price": "XX.XX",
  "category": "burgers|chicken|reubens|sides",
  "imagePath": "/images/filename.jpg",
  "featured": true or false
}
```

### Validation Commands

```bash
# Check menu items
node scripts/update-menu.js validate

# List all items
node scripts/update-menu.js list

# Check if ID exists
node scripts/update-menu.js check-id item-id

# Check images
node scripts/update-images.js check

# Find unused images
node scripts/update-images.js unused
```

### Files to Edit

- **Menu Items**: `data/menu-items.json`
- **Images**: `data/image-mappings.json`
- **Reference**: `data/menu-schema.json` (read only)

---

**Remember:** Always validate your changes before publishing! The validation tools are your friends - they catch mistakes before they go live.

Good luck, and happy updating! 🍔
