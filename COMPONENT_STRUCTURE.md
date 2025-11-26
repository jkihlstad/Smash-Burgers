# Menu Page Component Structure

## File Tree
```
website_build/
├── app/
│   └── menu/
│       └── page.tsx                 (Main Menu Page - Server Component)
├── components/
│   └── features/
│       ├── MenuItemCard.tsx         (Glass card for menu items - Client Component)
│       └── CategoryNav.tsx          (Sticky category navigation - Client Component)
├── lib/
│   └── utils.ts                     (cn() utility for class merging)
├── types/
│   └── menu.ts                      (TypeScript interfaces)
└── tailwind.config.ts               (Design tokens already configured)
```

## Component Hierarchy

```
MenuPage (Server Component)
├── Header (Sticky)
│   ├── UtensilsCrossed Icon
│   ├── Title: "Our Menu"
│   └── Location Badge (MapPin + "Albany, OR")
│
├── CategoryNav (Client Component - Sticky)
│   └── Category Pills (Burgers, Chicken, Reubens, Sides)
│
├── Main Content
│   ├── Section: Smash Burgers (#smash-burgers)
│   │   └── MenuItemCard[] (2 items)
│   │
│   ├── Section: Chicken Sandwiches (#chicken-sandwiches)
│   │   └── MenuItemCard[] (1 item)
│   │
│   ├── Section: Reubens (#reubens)
│   │   └── MenuItemCard[] (1 item)
│   │
│   └── Section: Fries & Sides (#fries-sides)
│       └── MenuItemCard[] (1 item)
│
└── Footer
    ├── Copyright
    └── Links (Locations, About Us, Contact)
```

## MenuItemCard Component Structure

```
MenuItemCard (Client Component)
├── Container (motion.div)
│   ├── Specular Highlight (top edge)
│   ├── Magma Glow (hover effect)
│   ├── Noise Texture (overlay)
│   │
│   ├── Image (Next.js Image)
│   │   └── Hover: scale-110
│   │
│   ├── Content
│   │   ├── Name (h3)
│   │   ├── Description (p)
│   │   └── Price (p)
│   │
│   └── Add Button (motion.button)
│       └── Plus Icon (Lucide)
```

## CategoryNav Component Structure

```
CategoryNav (Client Component)
├── Sticky Nav Container
│   └── Scrollable Pills Container
│       └── For each category:
│           ├── motion.a (pill button)
│           ├── Active Glow (layoutId animation)
│           └── Label
│
└── Features:
    ├── Scroll Detection (auto-highlight active section)
    ├── Smooth Scroll to Section
    └── Animated Active Indicator
```

## Data Flow

```
menuData (in page.tsx)
    ↓
MenuPage Server Component
    ↓
Map over categories → MenuItemCard components
    ↓
Props: { name, description, price, image, onAddToCart }
    ↓
Rendered with Liquid Glass styling
```

## Styling Approach

All components use:
- **Tailwind CSS** for styling
- **cn()** utility for conditional/merged classes
- **Framer Motion** for animations
- **Design tokens** from tailwind.config.ts

### Key Tailwind Classes Used:

1. **Glass Effect**:
   - `bg-glass-clear`
   - `backdrop-blur-xl`
   - `backdrop-saturate-150`
   - `border-glass-border`

2. **Layout**:
   - `sticky top-0` / `sticky top-[72px]`
   - `flex`, `grid`
   - `gap-4`, `px-4`

3. **Colors**:
   - `text-primary` (#FF5E0F)
   - `bg-dark-bg` (#0F0F0F)
   - `text-white`, `text-white/60`, `text-white/40`

4. **Animations**:
   - `transition-all duration-300`
   - `hover:scale-110`
   - `group-hover:bg-primary`

## Interactivity Features

### MenuItemCard
- ✅ Hover scale effect on card
- ✅ Image zoom on hover
- ✅ Button color change on hover
- ✅ Click handler for add to cart

### CategoryNav
- ✅ Auto-scroll detection
- ✅ Active category highlighting
- ✅ Smooth scroll to sections
- ✅ Animated pill indicator
- ✅ Horizontal scroll on mobile

## TypeScript Types

```typescript
// MenuItem
interface MenuItemCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  onAddToCart?: () => void;
  className?: string;
}

// Category
interface Category {
  id: string;
  label: string;
  href: string;
}

// CategoryNav
interface CategoryNavProps {
  categories: Category[];
  className?: string;
}
```

## Performance Considerations

1. **Server Component**: Main page is a Server Component (faster initial load)
2. **Client Boundaries**: Only interactive components are Client Components
3. **Image Optimization**: Uses Next.js Image component
4. **Lazy Motion**: Framer Motion only loads where needed
5. **CSS-only Effects**: Many effects use pure CSS (no JS overhead)

## Accessibility

- ✅ Semantic HTML (header, nav, main, section, footer)
- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Alt text ready for images
- ✅ Touch targets 44px minimum
- ✅ Keyboard navigation support (anchor links)
- ✅ Focus states on interactive elements
