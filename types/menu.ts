export type MenuCategoryType = "burgers" | "chicken" | "reubens" | "sides";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: MenuCategoryType;
  imagePath: string;
  featured: boolean;
  // Legacy support
  image?: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  href: string;
}

export interface MenuData {
  burgers: MenuItem[];
  chicken: MenuItem[];
  reubens: MenuItem[];
  sides: MenuItem[];
}

export interface ImageMapping {
  path: string;
  alt: string;
  description: string;
}

export interface ImageMappings {
  hero: {
    main: ImageMapping;
  };
  featured: {
    burgers: ImageMapping;
    chicken: ImageMapping;
    reubens: ImageMapping;
    fries: ImageMapping;
  };
  menuItems: {
    [itemId: string]: ImageMapping;
  };
  about: {
    restaurant: ImageMapping;
  };
}
