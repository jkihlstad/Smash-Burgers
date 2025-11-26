import { ImageMapping, ImageMappings } from "@/types/menu";
import imageMappingsData from "@/data/image-mappings.json";

/**
 * Get all image mappings
 */
export function getImageMappings(): ImageMappings {
  return imageMappingsData as ImageMappings;
}

/**
 * Get the hero image for the homepage
 */
export function getHeroImage(): ImageMapping {
  const mappings = getImageMappings();
  return mappings.hero.main;
}

/**
 * Get a featured category image
 */
export function getFeaturedImage(
  category: "burgers" | "chicken" | "reubens" | "fries"
): ImageMapping {
  const mappings = getImageMappings();
  return mappings.featured[category];
}

/**
 * Get an image for a specific menu item by ID
 */
export function getMenuItemImage(itemId: string): ImageMapping | undefined {
  const mappings = getImageMappings();
  return mappings.menuItems[itemId];
}

/**
 * Get the about page restaurant image
 */
export function getAboutImage(): ImageMapping {
  const mappings = getImageMappings();
  return mappings.about.restaurant;
}

/**
 * Validate an image path exists and is in the correct format
 */
export function validateImagePath(path: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!path || path.trim() === "") {
    errors.push("Image path is required");
    return { valid: false, errors };
  }

  if (!path.startsWith("/images/")) {
    errors.push("Image path must start with '/images/'");
  }

  const validExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
    ".JPG",
    ".JPEG",
    ".PNG",
    ".WEBP",
  ];
  const hasValidExtension = validExtensions.some((ext) => path.endsWith(ext));

  if (!hasValidExtension) {
    errors.push(
      "Image path must end with a valid image extension (.jpg, .jpeg, .png, .webp)"
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Get the filename from an image path
 */
export function getImageFilename(path: string): string {
  return path.split("/").pop() || "";
}

/**
 * Get all menu item image IDs
 */
export function getAllMenuItemImageIds(): string[] {
  const mappings = getImageMappings();
  return Object.keys(mappings.menuItems);
}

/**
 * Check if an image mapping exists for a menu item
 */
export function hasMenuItemImage(itemId: string): boolean {
  const mappings = getImageMappings();
  return itemId in mappings.menuItems;
}

/**
 * Generate optimized image props for Next.js Image component
 */
export function getImageProps(
  mapping: ImageMapping,
  sizes?: string
): {
  src: string;
  alt: string;
  sizes?: string;
} {
  return {
    src: mapping.path,
    alt: mapping.alt,
    ...(sizes && { sizes }),
  };
}
