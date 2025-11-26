import { MenuItem, MenuData, MenuCategoryType } from "@/types/menu";
import menuItemsData from "@/data/menu-items.json";

/**
 * Load all menu items from the JSON data file
 */
export function getMenuData(): MenuData {
  // Add backward compatibility for image field
  const processItems = (items: any[]) =>
    items.map((item) => ({
      ...item,
      image: item.imagePath, // For backward compatibility
    })) as MenuItem[];

  return {
    burgers: processItems(menuItemsData.burgers),
    chicken: processItems(menuItemsData.chicken),
    reubens: processItems(menuItemsData.reubens),
    sides: processItems(menuItemsData.sides),
  };
}

/**
 * Get all items from a specific category
 */
export function getMenuItemsByCategory(
  category: MenuCategoryType
): MenuItem[] {
  const menuData = getMenuData();
  return menuData[category];
}

/**
 * Get a single menu item by its ID
 */
export function getMenuItemById(id: string): MenuItem | undefined {
  const menuData = getMenuData();
  const allItems = [
    ...menuData.burgers,
    ...menuData.chicken,
    ...menuData.reubens,
    ...menuData.sides,
  ];
  return allItems.find((item) => item.id === id);
}

/**
 * Get all featured menu items
 */
export function getFeaturedMenuItems(): MenuItem[] {
  const menuData = getMenuData();
  const allItems = [
    ...menuData.burgers,
    ...menuData.chicken,
    ...menuData.reubens,
    ...menuData.sides,
  ];
  return allItems.filter((item) => item.featured);
}

/**
 * Get all featured items from a specific category
 */
export function getFeaturedItemsByCategory(
  category: MenuCategoryType
): MenuItem[] {
  const items = getMenuItemsByCategory(category);
  return items.filter((item) => item.featured);
}

/**
 * Format price for display (adds $ symbol)
 */
export function formatPrice(price: string): string {
  return `$${price}`;
}

/**
 * Validate a menu item has all required fields
 */
export function validateMenuItem(item: Partial<MenuItem>): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!item.id || item.id.trim() === "") {
    errors.push("ID is required");
  } else if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(item.id)) {
    errors.push(
      "ID must be lowercase letters, numbers, and hyphens only (e.g., 'classic-smash')"
    );
  }

  if (!item.name || item.name.trim() === "") {
    errors.push("Name is required");
  } else if (item.name.length > 100) {
    errors.push("Name must be 100 characters or less");
  }

  if (!item.description || item.description.trim() === "") {
    errors.push("Description is required");
  } else if (item.description.length < 10) {
    errors.push("Description must be at least 10 characters");
  } else if (item.description.length > 200) {
    errors.push("Description must be 200 characters or less");
  }

  if (!item.price) {
    errors.push("Price is required");
  } else if (!/^[0-9]+\.[0-9]{2}$/.test(item.price)) {
    errors.push(
      "Price must be in format XX.XX (e.g., '10.99') without dollar sign"
    );
  }

  if (!item.category) {
    errors.push("Category is required");
  } else if (
    !["burgers", "chicken", "reubens", "sides"].includes(item.category)
  ) {
    errors.push("Category must be one of: burgers, chicken, reubens, sides");
  }

  if (!item.imagePath || item.imagePath.trim() === "") {
    errors.push("Image path is required");
  } else if (!item.imagePath.startsWith("/images/")) {
    errors.push("Image path must start with '/images/'");
  } else if (
    !/\.(jpg|jpeg|png|webp|JPG|JPEG|PNG|WEBP)$/.test(item.imagePath)
  ) {
    errors.push("Image path must end with a valid image extension");
  }

  if (typeof item.featured !== "boolean") {
    errors.push("Featured must be true or false");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Check if a menu item ID already exists
 */
export function menuItemIdExists(id: string): boolean {
  const item = getMenuItemById(id);
  return item !== undefined;
}
