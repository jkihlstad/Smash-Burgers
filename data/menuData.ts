export type MenuItemType = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export type CategoryType = {
  id: string;
  label: string;
};

export const CATEGORIES: CategoryType[] = [
  { id: 'beef', label: 'Beef Burgers' },
  { id: 'specialty', label: 'Specialty' },
  { id: 'alternative', label: 'Alternative' },
  { id: 'kids', label: 'Kids' },
  { id: 'sides', label: 'Sides' },
  { id: 'beverages', label: 'Beverages' },
];

export const MENU_ITEMS: MenuItemType[] = [
  // Beef Burgers
  {
    id: 1,
    name: "Single Smash",
    price: 9,
    description: "Single patty, Tillamook cheese, house pickles, grilled onions, secret sauce or spicy sauce.",
    category: "beef",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 2,
    name: "Double Smash",
    price: 11,
    description: "Double patties, Tillamook cheese, house pickles, grilled onions, secret sauce or spicy sauce.",
    category: "beef",
    image: "/images/IMG_6435.webp"
  },
  {
    id: 3,
    name: "Bacon Smash",
    price: 13,
    description: "Single patty, crispy bacon, Tillamook cheese, house pickles, grilled onions, secret sauce or spicy sauce.",
    category: "beef",
    image: "/images/IMG_6436.webp"
  },

  // Specialty Burgers
  {
    id: 4,
    name: "Spicy Jalapeño Smash",
    price: 10,
    description: "Single patty, Tillamook cheese, pickles, onions, jalapeños, spicy sauce.",
    category: "specialty",
    image: "/images/IMG_6435.webp"
  },
  {
    id: 5,
    name: "Peanut Butter Bacon Smash",
    price: 13,
    description: "Single patty, crispy bacon, Tillamook cheese, pickles, onions, peanut butter, secret sauce or spicy sauce.",
    category: "specialty",
    image: "/images/IMG_6422.webp"
  },
  {
    id: 6,
    name: "The Pastrami Smash",
    price: 14,
    description: "Single patty, pastrami, Swiss cheese, pickles, onions, secret sauce or spicy sauce.",
    category: "specialty",
    image: "/images/IMG_6436.webp"
  },
  {
    id: 7,
    name: "Bacon Guac Smash",
    price: 14,
    description: "Single patty, crispy bacon, Tillamook cheese, pickles, onions, guacamole, secret sauce or spicy sauce.",
    category: "specialty",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 8,
    name: "Cheesesteak Smash",
    price: 13,
    description: "Single patty, grilled onions & peppers, provolone cheese, secret sauce or spicy sauce.",
    category: "specialty",
    image: "/images/IMG_6435.webp"
  },
  {
    id: 9,
    name: "Cheese Steak Sandwich",
    price: 15,
    description: "Thinly sliced steak, sautéed onions & green peppers, white American cheese on hoagie.",
    category: "specialty",
    image: "/images/IMG_6436.webp"
  },
  {
    id: 10,
    name: "Hot Pastrami Sandwich",
    price: 16,
    description: "Sliced Pastrami, sautéed onions, green peppers, white American cheese on hoagie.",
    category: "specialty",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 11,
    name: "N'Reener's Ruben",
    price: 16,
    description: "Sliced Pastrami, Sauerkraut, Swiss cheese, thousand island on Rye.",
    category: "specialty",
    image: "/images/IMG_6436.webp"
  },

  // Alternative Burgers
  {
    id: 12,
    name: "Chicken Smash",
    price: 10,
    description: "Grilled ground chicken, lettuce, tomato, onion, pickles, secret sauce or spicy sauce.",
    category: "alternative",
    image: "/images/IMG_6429.webp"
  },
  {
    id: 13,
    name: "Spicy Spicy Chicken Smash",
    price: 12,
    description: "Spicy grilled chicken, lettuce, tomato, onion, jalapeños, pickles, spicy sauce.",
    category: "alternative",
    image: "/images/IMG_6429.webp"
  },
  {
    id: 14,
    name: "Veggie Smash",
    price: 13,
    description: "Smashed Impossible patty, lettuce, tomato, onion, pickles, secret sauce.",
    category: "alternative",
    image: "/images/IMG_6432.webp"
  },

  // Kids Menu
  {
    id: 15,
    name: "Mini Corn Dogs & Fries",
    price: 7,
    description: "Includes fries.",
    category: "kids",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 16,
    name: "Chicken Nuggets & Fries",
    price: 7,
    description: "Includes fries.",
    category: "kids",
    image: "/images/IMG_6429.webp"
  },
  {
    id: 17,
    name: "Mini Smash & Fries",
    price: 8,
    description: "Includes fries.",
    category: "kids",
    image: "/images/IMG_6435.webp"
  },

  // Sides
  {
    id: 18,
    name: "Oregon Fries",
    price: 3.50,
    description: "Classic fries with secret seasoning.",
    category: "sides",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 19,
    name: "Sweet Potato Fries",
    price: 4,
    description: "Classic sweet potato fries, salted.",
    category: "sides",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 20,
    name: "Tater Tots",
    price: 4,
    description: "Classic tater tots with secret seasoning.",
    category: "sides",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 21,
    name: "Secret Sauces",
    price: 0.75,
    description: "Extra side of Secret Sauce or Spicy Secret Sauce.",
    category: "sides",
    image: "/images/IMG_6434.webp"
  },

  // Beverages
  {
    id: 22,
    name: "Soda & Water",
    price: 2,
    description: "Can of soda or bottle of water.",
    category: "beverages",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 23,
    name: "Glass Bottle of Soda",
    price: 4,
    description: "Coca-Cola, Henry's cream soda, or root beer.",
    category: "beverages",
    image: "/images/IMG_6434.webp"
  },
  {
    id: 24,
    name: "Lemonade & Limeade",
    price: 5,
    description: "Various flavors (Cherry, Mango, Jalapeño, etc.).",
    category: "beverages",
    image: "/images/IMG_6434.webp"
  }
];
