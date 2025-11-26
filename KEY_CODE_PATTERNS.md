# Key Code Patterns - Menu Page Implementation

## 1. Liquid Glass Effect Pattern

This is the core aesthetic pattern used throughout the Menu Page:

```tsx
<motion.div
  whileHover={{ scale: 1.01 }}
  className={cn(
    // Glass morphism base
    "bg-glass-clear backdrop-blur-xl backdrop-saturate-150",
    "border border-glass-border",

    // Shadow and transitions
    "shadow-sm transition-shadow duration-300",
    "hover:shadow-lg hover:ring-2 hover:ring-primary",

    // Layout
    "relative overflow-hidden rounded-lg p-3",
  )}
>
  {/* Specular Highlight - The 'Wet' Look */}
  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />

  {/* Magma Glow on Hover */}
  <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

  {/* Noise Texture */}
  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

  {/* Content with z-10 to appear above effects */}
  <div className="relative z-10">
    {children}
  </div>
</motion.div>
```

### Key Components:
1. **backdrop-blur-xl** + **backdrop-saturate-150** = Liquid Glass look
2. **Specular highlight** = Top edge white gradient
3. **Magma glow** = Primary color glow on hover
4. **Noise texture** = Subtle grain overlay
5. **z-index layering** = Content above effects

---

## 2. Sticky Header Pattern

Two-tier sticky header system:

```tsx
{/* Header - Tier 1 */}
<header className="sticky top-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-glass-border">
  {/* Header content */}
</header>

{/* Category Nav - Tier 2 */}
<nav className="sticky top-[72px] z-40 bg-dark-bg/80 backdrop-blur-md border-b border-glass-border">
  {/* Navigation pills */}
</nav>
```

### Key Points:
- First header: `top-0`
- Second header: `top-[72px]` (height of first header)
- Both use `z-50` and `z-40` respectively
- Both have backdrop blur for glass effect

---

## 3. Animated Category Indicator Pattern

Using Framer Motion's layout animations:

```tsx
const [activeCategory, setActiveCategory] = useState("burgers");

{categories.map((category) => {
  const isActive = activeCategory === category.id;

  return (
    <motion.a
      key={category.id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative overflow-hidden rounded-full px-4 h-10",
        isActive
          ? "bg-primary border-primary text-white"
          : "bg-glass-clear border-glass-border text-white/70"
      )}
    >
      {/* Animated glow follows active category */}
      {isActive && (
        <motion.div
          layoutId="activeCategory"  // ← Key: shared layout ID
          className="absolute inset-0 bg-primary/20 blur-xl"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}

      <p className="relative z-10">{category.label}</p>
    </motion.a>
  );
})}
```

### Key Points:
- `layoutId="activeCategory"` makes the glow animate between categories
- Spring animation for smooth, physical movement
- z-10 on text keeps it above the glow

---

## 4. Auto-Scroll Detection Pattern

Detecting which section is currently in view:

```tsx
useEffect(() => {
  const handleScroll = () => {
    const sections = categories.map((cat) => {
      const element = document.getElementById(cat.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        return {
          id: cat.id,
          top: rect.top,
          bottom: rect.bottom,
        };
      }
      return null;
    }).filter(Boolean);

    // Find section in viewport (200px threshold)
    const current = sections.find(
      (section) => section && section.top <= 200 && section.bottom >= 200
    );

    if (current) {
      setActiveCategory(current.id);
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [categories]);
```

### Key Points:
- Checks all section positions on scroll
- 200px threshold accounts for sticky headers
- Updates active category automatically

---

## 5. Smooth Scroll to Section Pattern

```tsx
const handleClick = (e: React.MouseEvent, href: string, id: string) => {
  e.preventDefault();

  const element = document.getElementById(id);
  if (element) {
    const yOffset = -140; // Height of sticky headers
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};
```

### Key Points:
- Prevents default anchor behavior
- Calculates offset for sticky headers
- Uses native smooth scroll

---

## 6. Image Optimization Pattern

```tsx
import Image from "next/image";

<div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md">
  <Image
    src={image}
    alt={name}
    fill                // Fill parent container
    className="object-cover transition-transform duration-500 group-hover:scale-110"
    sizes="96px"        // Optimize for actual display size
  />
</div>
```

### Key Points:
- `fill` prop for responsive sizing
- `object-cover` for proper aspect ratio
- `sizes` prop for optimization
- `group-hover:scale-110` for zoom effect

---

## 7. TypeScript Interface Pattern

```tsx
interface MenuItemCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  onAddToCart?: () => void;  // Optional callback
  className?: string;         // Optional styling override
}

export const MenuItemCard = ({
  name,
  description,
  price,
  image,
  onAddToCart,
  className,
}: MenuItemCardProps) => {
  // Component implementation
};
```

### Key Points:
- Strict typing for all props
- Optional props with `?`
- Exported interfaces for reusability
- Destructured props in function signature

---

## 8. Server vs Client Component Pattern

**Server Component (Default):**
```tsx
// app/menu/page.tsx
// No "use client" directive
export default function MenuPage() {
  // Server-side rendering
  // No hooks, no browser APIs
  return (
    <div>
      {/* Can use Client Components here */}
      <MenuItemCard {...props} />
    </div>
  );
}
```

**Client Component:**
```tsx
// components/features/MenuItemCard.tsx
"use client";  // ← Required for interactivity

import { motion } from "framer-motion";  // Client-only library

export const MenuItemCard = ({ ... }) => {
  // Can use hooks, browser APIs, event handlers
  return <motion.div>...</motion.div>;
};
```

### Key Points:
- Server Components: Default, faster, no client JS
- Client Components: Only when needed (hooks, animations, events)
- Client Components can be nested in Server Components
- Server Components cannot be nested in Client Components

---

## 9. cn() Utility Usage Pattern

```tsx
import { cn } from "@/lib/utils";

<button
  className={cn(
    // Base styles (always applied)
    "rounded-full px-4 h-9",

    // Conditional styles
    isActive && "bg-primary text-white",
    !isActive && "bg-glass-clear text-white/70",

    // Hover states
    "hover:scale-105 transition-all",

    // User override (last, takes priority)
    className
  )}
>
```

### Key Points:
- Merges Tailwind classes intelligently
- Later classes override earlier ones
- Handles conditional classes
- Always include `className` prop last for user overrides

---

## 10. Framer Motion Animation Pattern

```tsx
<motion.button
  whileHover={{ scale: 1.1 }}      // On hover
  whileTap={{ scale: 0.95 }}       // On click
  transition={{                      // Animation config
    type: "spring",
    stiffness: 400,
    damping: 17
  }}
  className="..."
>
  Click me
</motion.button>
```

### Key Points:
- `whileHover` for hover animations
- `whileTap` for click feedback
- Spring animations for physical feel
- Works with Tailwind classes

---

## Design Token Reference

From `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: '#FF5E0F',  // Smash Burger Orange
    glow: '#FF8A50',     // Lighter orange
    deep: '#CC4000',     // Darker orange
  },
  dark: {
    bg: '#0F0F0F',       // Rich black background
    surface: '#161616',  // Slightly lighter surface
  },
  glass: {
    clear: 'rgba(255, 255, 255, 0.03)',
    frosted: 'rgba(255, 255, 255, 0.1)',
    magma: 'rgba(255, 94, 15, 0.1)',
    border: 'rgba(255, 255, 255, 0.08)',
    highlight: 'rgba(255, 255, 255, 0.15)',
  },
}
```

Usage in components:
- `bg-primary` → #FF5E0F
- `bg-dark-bg` → #0F0F0F
- `bg-glass-clear` → rgba(255, 255, 255, 0.03)
- `border-glass-border` → rgba(255, 255, 255, 0.08)
