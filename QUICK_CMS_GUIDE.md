# Quick CMS Guide - Smash Burgers

## 5-Minute Quick Start

### To Update a Price

1. Open `data/menu-items.json`
2. Find your item (Ctrl+F to search)
3. Change the `"price"` value (e.g., `"10.99"` to `"12.99"`)
4. Save the file
5. Run: `npm run validate-menu`
6. If it says "All menu items are valid!" you're done!

**Example:**
```json
{
  "name": "The Classic Smash",
  "price": "12.99"  ← Change this number
}
```

### To Add a New Menu Item

1. Open `data/menu-items.json`
2. Find the right category section (burgers, chicken, reubens, or sides)
3. Copy an existing item from that category
4. Paste it at the end of the array (don't forget the comma!)
5. Update all the fields:
   - `id`: unique-lowercase-with-hyphens
   - `name`: Display Name
   - `description`: Short description
   - `price`: XX.XX (no dollar sign)
   - `imagePath`: /images/yourimage.jpg
   - `featured`: true or false
6. Save and run: `npm run validate-menu`

### To Update an Image

1. Put your new image in the `/images/` folder
2. Open `data/menu-items.json`
3. Find the item
4. Change `"imagePath"` to your new image
5. Save and run: `npm run validate-all`

---

## Command Reference

### Quick Commands

```bash
# Validate everything
npm run validate-all

# Validate just menu items
npm run validate-menu

# Validate just images
npm run validate-images

# List all menu items
npm run list-menu

# Find unused images (safe to delete)
npm run find-unused-images
```

### Direct Script Commands

```bash
# Menu commands
node scripts/update-menu.js validate
node scripts/update-menu.js list
node scripts/update-menu.js check-id <item-id>

# Image commands
node scripts/update-images.js check
node scripts/update-images.js list
node scripts/update-images.js unused
node scripts/update-images.js validate
```

---

## Admin Panel

**URL**: http://localhost:3000/admin (when dev server running)

**Password**: `smashburgers2024`

Use the admin panel to:
- Add/Edit/Delete items visually
- Preview changes before saving
- Export JSON file for deployment

---

## Files You'll Edit

| File | What It Does |
|------|-------------|
| `data/menu-items.json` | All menu items (prices, names, descriptions) |
| `data/image-mappings.json` | Image paths and descriptions |

## Files You'll Read

| File | What It Does |
|------|-------------|
| `data/menu-schema.json` | Explains the data structure |
| `CONTENT_UPDATE_GUIDE.md` | Detailed instructions with examples |
| `CMS_SYSTEM_README.md` | Complete system documentation |

---

## Common Tasks

### Change Price: 2 minutes
1. Edit `data/menu-items.json`
2. Update `"price"` field
3. Run `npm run validate-menu`

### Add New Item: 5 minutes
1. Edit `data/menu-items.json`
2. Copy similar item, paste, update fields
3. Run `npm run validate-menu`

### Update Description: 3 minutes
1. Edit `data/menu-items.json`
2. Update `"description"` field
3. Run `npm run validate-menu`

### Change Image: 5 minutes
1. Add image to `/images/`
2. Update `"imagePath"` in `data/menu-items.json`
3. Run `npm run validate-all`

---

## Menu Item Template

Copy this when adding new items:

```json
{
  "id": "your-item-id",
  "name": "Your Item Name",
  "description": "Brief description of your item.",
  "price": "12.99",
  "category": "burgers",
  "imagePath": "/images/your-image.jpg",
  "featured": false
}
```

**Remember:**
- ID: lowercase-with-hyphens
- Price: No $ symbol, always XX.XX format
- Category: Must be burgers, chicken, reubens, or sides
- Image path: Must start with /images/
- Featured: true or false (no quotes)

---

## Validation Checklist

Before saving changes, make sure:

- [ ] Prices are in XX.XX format (e.g., "10.99")
- [ ] No $ symbol in prices
- [ ] IDs are lowercase with hyphens only
- [ ] All items have commas between them
- [ ] Image paths start with /images/
- [ ] Category matches the section
- [ ] Run `npm run validate-all` with no errors

---

## What Each Field Means

| Field | Example | Notes |
|-------|---------|-------|
| `id` | `"classic-smash"` | Unique, lowercase, hyphens only |
| `name` | `"The Classic Smash"` | Display name (max 100 chars) |
| `description` | `"Juicy patty..."` | 10-200 characters |
| `price` | `"10.99"` | No $ sign, 2 decimals |
| `category` | `"burgers"` | burgers/chicken/reubens/sides |
| `imagePath` | `"/images/burger.jpg"` | Path to image file |
| `featured` | `true` or `false` | No quotes! |

---

## Getting Help

**Read First:** `CONTENT_UPDATE_GUIDE.md` - Full instructions with examples

**Need Help?**
1. Check the validation error message (it tells you what's wrong)
2. Look in `data/menu-schema.json` for field explanations
3. Review examples in `CONTENT_UPDATE_GUIDE.md`

**Common Errors:**
- Missing comma between items
- Dollar sign in price
- Uppercase in ID
- Missing /images/ in path
- Category doesn't match section

---

## Current Menu

- **Burgers**: 3 items
- **Chicken**: 2 items
- **Reubens**: 2 items
- **Sides**: 3 items
- **Total**: 10 items

All validated and working!

---

## Pro Tips

1. **Always validate** after making changes
2. **Keep backups** of your JSON files
3. **Test one change** at a time
4. **Use the admin panel** for a visual interface
5. **Check image files** exist before referencing them

---

## Need More Detail?

- **User Guide**: `CONTENT_UPDATE_GUIDE.md` (detailed step-by-step)
- **System Docs**: `CMS_SYSTEM_README.md` (complete documentation)
- **Schema Reference**: `data/menu-schema.json` (data structure)

**You've got this!**
