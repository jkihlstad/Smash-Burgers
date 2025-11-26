Here is the single, comprehensive claude_rules.md file. This file acts as the "source of truth" for the entire project, covering the design system, architecture, and coding standards for the high-fidelity "Liquid Glass" aesthetic.

Markdown

# Smash Burgers Project Rules & Design System

## 1. Project Overview & Tech Stack

**Objective:** Build a state-of-the-art, high-performance restaurant website featuring a "Liquid Glass" aesthetic, advanced micro-interactions, and fluid navigation.

### Core Stack
* **Framework:** Next.js 14+ (App Router).
* **Language:** TypeScript (Strict Mode).
* **Styling:** Tailwind CSS + `tailwind-merge` + `clsx`.
* **Animation:** Framer Motion (Complex layout & shared element transitions).
* **Scroll:** `@studio-freight/react-lenis` (Inertial smooth scrolling).
* **Icons:** Lucide React (Preferred over Material Symbols for cleaner SVG paths).
* **State:** Zustand (Cart management).
* **Fonts:** `next/font` (Anton, Plus Jakarta Sans, Inter).

---

## 2. Directory Structure

Adopt a feature-based architecture within the Next.js App Router:

```bash
/app
  layout.tsx          # Root layout with SmoothScrollProvider & NoiseOverlay
  page.tsx            # Hero Landing
  template.tsx        # Page transition animations
  /menu               # Menu feature routes
  /about              # About feature routes
/components
  /ui                 # Atomic primitives (Button, Input, Badge)
  /liquid             # High-end glass components (GlassCard, LiquidContainer)
  /layout             # Header, Footer, MobileNav
  /features           # Complex business logic (CartDrawer, MenuGrid)
/lib
  utils.ts            # cn() utility
  constants.ts        # App-wide constants
  hooks.ts            # Custom hooks
/public
  /textures           # noise.png, grain.png
3. Design System: "Liquid Magma" Theme
The visual language combines deep, dark backgrounds with vibrant orange accents and highly saturated, blurred "glass" layers that feel liquid and tactile.

3.1 Color Palette (Tailwind Config)
Implement these specific tokens in tailwind.config.ts:

TypeScript

colors: {
  // Brand Identity
  primary: {
    DEFAULT: "#FF5E0F",  // Smash Burger Orange
    glow: "#FF8A50",     // Highlight
    deep: "#CC4000",     // Shadow/Pressed
  },
  // Backgrounds
  dark: {
    bg: "#0F0F0F",       // Main background (Rich Black)
    surface: "#161616",  // Secondary background
  },
  // Glass System (The Core Aesthetic)
  glass: {
    clear: "rgba(255, 255, 255, 0.03)",
    frosted: "rgba(255, 255, 255, 0.1)",
    magma: "rgba(255, 94, 15, 0.1)", // Orange tinted glass
    border: "rgba(255, 255, 255, 0.08)",
    highlight: "rgba(255, 255, 255, 0.15)",
  }
}
3.2 Typography
Headings (Display): Anton (Google Fonts). Uppercase, tight leading, tracking-wide.

Subheadings: Plus Jakarta Sans. Bold weights (700/800).

Body: Inter. Use text-pretty for optical alignment.

3.3 Visual Effects (CSS/Tailwind Layers)
The "Liquid Glass" Utility: Do not use standard backdrop-blur. Create a composed utility class:

Blur: backdrop-blur-xl (16px+)

Saturation: backdrop-saturate-150 (Crucial for the "Liquid" look)

Border: 1px solid border-glass-border

Highlight: A subtle inner white gradient at the top inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent.

Noise: A 5% opacity noise texture overlay on top of the glass.

4. Component Patterns & Rules
4.1 Functional Components
Use const with named exports: export const GlassCard = () => {}.

Always strictly type props using interface.

Use the cn() utility for class merging.

4.2 The "Liquid Glass" Card
Use this structure for Menu Items and Feature Cards:

TypeScript

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  className?: string;
  children: React.ReactNode;
}

export const GlassCard = ({ className, children }: GlassCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.01 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-glass-border",
        "bg-glass-clear backdrop-blur-xl backdrop-saturate-150",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]", // Deep shadow
        "group transition-all duration-500 ease-out",
        className
      )}
    >
      {/* Specular Highlight (The 'Wet' Look) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Magma Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      
      {/* Noise Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
4.3 Magnetic Buttons
Buttons should feel physical.

Interaction: Use Framer Motion's whileHover and whileTap.

Style: rounded-full, uppercase, tracking-widest.

Animation: A "shine" effect passing through the button on hover.

5. Next.js Specific Guidelines
5.1 Server vs Client Components
Default to Server: Pages (page.tsx) and Layouts must be Server Components.

Client Boundaries: Use "use client" only for interactive leaves (Buttons, Forms, Framer Motion wrappers).

Data Fetching: Fetch menu data directly in Server Components.

5.2 Image Optimization
Use next/image for ALL bitmaps.

Use the /Users/tonyakihlstadius/Documents/Jason's Work Documents/Smash Burgers/Website/website_build/images folder for all images to use in the website

Parallax Layers: Images in hero sections must use fill with object-cover.

Placeholder: Use placeholder="blur" for large assets.

Z-Index Layering: Food images should visually "break" their containers (negative margins or absolute positioning) to create depth.

5.3 Fonts
Load fonts via next/font/google in layout.tsx to prevent CLS (Cumulative Layout Shift).

TypeScript

import { Anton, Inter } from 'next/font/google'

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable}`}>
      <body className="bg-dark-bg text-white antialiased">
        {children}
      </body>
    </html>
  )
}
6. Animation Guidelines
6.1 Page Transitions
Use template.tsx to animate routes entering/exiting.

Motion: Simple opacity fade + slight Y-axis slide (y: 20 -> 0).

6.2 Scroll Animations
Reveal: Elements should stagger in as they enter the viewport.

Parallax: Background images should move at 50% speed of scroll (useScroll + useTransform).

7. Code Quality Checklist
Before commiting code:

Responsiveness: Does the grid collapse from 4 -> 2 -> 1 columns?

Touch: Are interactive areas at least 44px tall?

Merge: Did I use cn() for dynamic classes?

Images: Did I add alt text and correct aspect ratios?

Clean Up: Remove unused imports and console.log.

DSIGN OF EACH PAGE

Home Page
<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Smash Burgers - Simply Better Burgers</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Anton&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<style>
        .material-symbols-outlined {
            font-variation-settings:
                'FILL' 0,
                'wght' 400,
                'GRAD' 0,
                'opsz' 24
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "primary": "#FF5E0F",
                        "background-light": "#FDFBF7",
                        "background-dark": "#1A1816",
                        "surface-light": "#FFFFFF",
                        "surface-dark": "#242220",
                        "text-light": "#211E1C",
                        "text-dark": "#F3F0EC",
                        "text-muted-light": "#6B6661",
                        "text-muted-dark": "#A8A29A"
                    },
                    fontFamily: {
                        "display": ["Anton", "sans-serif"],
                        "body": ["Inter", "sans-serif"]
                    },
                    borderRadius: {
                        "DEFAULT": "1rem",
                        "lg": "2rem",
                        "xl": "3rem",
                        "full": "9999px"
                    },
                },
            },
        }
    </script>
<style>
        body {
            min-height: max(884px, 100dvh);
            perspective: 1px;
            transform-style: preserve-3d;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .parallax-bg {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: -1;
            transform: translateZ(-1px) scale(2);
            background-size: cover;
            background-position: center;
        }
        .content-wrapper {
            position: relative;
            z-index: 1;
            background-color: var(--tw-bg-opacity, 1) var(--background-light);
        }
        .dark .content-wrapper {
            background-color: var(--tw-bg-opacity, 1) var(--background-dark);
        }
    </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-body text-text-light dark:text-text-dark">
<div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<nav class="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-b border-black/5 dark:border-white/5">
<div class="container mx-auto px-4">
<div class="flex items-center justify-between h-20">
<div class="flex items-center space-x-3">
<div class="bg-primary rounded-full p-2">
<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 18.5V16.5C11 14.29 9.21 12.5 7 12.5C4.79 12.5 3 14.29 3 16.5V18.5M11 18.5H3M21 18.5V16.5C21 14.29 19.21 12.5 17 12.5C14.79 12.5 13 14.29 13 16.5V18.5M21 18.5H13M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</div>
<span class="text-2xl font-display uppercase tracking-wider text-text-light dark:text-text-dark">Smash Burgers</span>
</div>
<div class="hidden md:flex items-center space-x-8">
<a class="text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">Menu</a>
<a class="text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">Locations</a>
<a class="text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary transition-colors font-medium" href="#">Contact</a>
</div>
<button class="md:hidden text-text-light dark:text-text-dark">
<span class="material-symbols-outlined text-3xl">menu</span>
</button>
</div>
</div>
</nav>
<header class="relative h-[85vh] min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
<div class="parallax-bg" data-alt="A delicious looking smash burger with melted cheese and fresh lettuce, alongside a portion of crispy golden fries" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKhF4GZUWw8NptlXP_fUY8g4f4r6-T_TLGbCJxAgKshSa5jSRfAmsPY8tuREk2uHVjnoh0kiB2OevlqDZC-Sq7mEKXPlzPLAW9Z4G-2aX3_ZYZN-OyOYrJDnF-3Js1ZBNRgs-JykaE-VwqZQWUM777iJ-O4Yrc6XPER-UclePrfV75CghTU5qNQKN9jNQRIo9_HwpSyX4dLya00NuoD3gLV1OggtB0pD6uupb7XY-PIcVQgzEzl5-WI_RF7PXYkP6WOPpbcfjOXQ");'></div>
<div class="absolute inset-0 bg-black/60"></div>
<div class="relative z-10 p-4 flex flex-col items-center gap-6">
<h1 class="font-display text-5xl md:text-7xl uppercase tracking-wider">
                    Simply Better Burgers
                </h1>
<p class="text-lg md:text-xl max-w-2xl text-white/90">
                    Fresh, handcrafted burgers, sandwiches, and fries made daily.
                </p>
<button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-wide uppercase transition-transform hover:scale-105 active:scale-100">
<span class="truncate">View Menu &amp; Order</span>
</button>
</div>
</header>
<div class="content-wrapper">
<section class="container mx-auto px-4 py-16 sm:py-24">
<div class="bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg p-8 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10 dark:divide-white/10">
<div class="flex flex-col items-center text-center gap-4 py-8 md:py-4">
<span class="material-symbols-outlined text-primary text-4xl">location_on</span>
<h2 class="text-2xl font-bold font-display tracking-wide uppercase">Our Locations</h2>
<div class="text-text-muted-light dark:text-text-muted-dark text-lg space-y-1">
<p>Albany, Oregon</p>
<p>Salem, Oregon</p>
</div>
<a class="mt-2 font-semibold text-primary hover:underline" href="#">Get Directions</a>
</div>
<div class="flex flex-col items-center text-center gap-4 py-8 md:py-4">
<span class="material-symbols-outlined text-primary text-4xl">schedule</span>
<h2 class="text-2xl font-bold font-display tracking-wide uppercase">Operating Hours</h2>
<div class="text-text-muted-light dark:text-text-muted-dark text-lg space-y-1">
<p>Tuesday - Sunday</p>
<p>11:00 AM - 8:00 PM</p>
</div>
<p class="mt-2 text-text-muted-light dark:text-text-muted-dark">(Closed Mondays)</p>
</div>
</div>
</section>
<section class="container mx-auto px-4 py-16 sm:py-24">
<div class="flex flex-col gap-8 text-center items-center">
<h2 class="text-4xl md:text-5xl font-display uppercase tracking-wider max-w-3xl">
                        What We're Famous For
                    </h2>
<p class="text-lg text-text-muted-light dark:text-text-muted-dark max-w-3xl">
                        Every meal is crafted with high-quality ingredients and a passion for flavor. Discover your new favorite.
                    </p>
</div>
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
<div class="flex flex-col gap-4 group">
<div class="w-full overflow-hidden rounded-lg">
<div class="w-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-500 group-hover:scale-110" data-alt="Close up of a juicy smash burger with cheese and pickles on a brioche bun." style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRKgKVgSyYg4zRawYis7fpu_KIH5Id0Z08-HF6RzZo-ZnC8Rcu1dVBjETocC_O-E5cIxeRxHuPA_5jDaT3FBSbfjaddSHuplcKRsNLkDV7JsfpBw3KtZ0GczlM8x8veApSHGuAo_By9dySnJbYNlhqW8S1Ox84f0w3ZRpybAUUA-gWVthm1DAs7A3ndNbaiiOYNFK6CqJjltZr_RUQ60m8Z6_0FWEYTGaDf4uOIAihayMf_Z56xtMojwiSluaaYQQTm47Wg4IWPQ");'></div>
</div>
<div>
<h3 class="text-xl font-bold">Smash Burgers</h3>
<p class="text-text-muted-light dark:text-text-muted-dark mt-1">Perfectly seared patties with a crispy crust, melted cheese, and fresh toppings.</p>
</div>
</div>
<div class="flex flex-col gap-4 group">
<div class="w-full overflow-hidden rounded-lg">
<div class="w-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-500 group-hover:scale-110" data-alt="A crispy fried chicken sandwich with lettuce and sauce on a toasted bun." style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA0PoCI_IisN8gt7sK0xO3kFnEbOEONFj9Fd8xJhw2T5tVft-Cc-ZLHnesfuF5_jri0mXxVmj-v9qYjAaI0Yn_ezmaZVwXBJOYwxedbykl7aFreSigRuNV8phzK5tdYdXCGZHdDtWX5jKzfsfr0-9MIYXnX65sF-Caqt6fmvYCjbL4lpQdH_FSFdVHmNBZKS0Gqpij1USbGg_xGr_0jZSzxHWC0A7pyEmO7g_Pfen8d5f8Ne68eJRYKEyqYT3BglwjGPmQ9-bkAVw");'></div>
</div>
<div>
<h3 class="text-xl font-bold">Chicken Sandwiches</h3>
<p class="text-text-muted-light dark:text-text-muted-dark mt-1">Juicy, tender chicken, fried to golden perfection and served on a toasted bun.</p>
</div>
</div>
<div class="flex flex-col gap-4 group">
<div class="w-full overflow-hidden rounded-lg">
<div class="w-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-500 group-hover:scale-110" data-alt="A classic Reuben sandwich sliced in half, showing layers of corned beef, sauerkraut, and Swiss cheese." style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhDnCkthVHBrb_JaXllQQvEPFWR2UGwyb3ZiS7ypfs54Cg7jpBVSCidoH1ErvBDB8N36NDzwKRYoD9njmqfpKMt0m43VSUwOfoZjnainVP0Aa3LVt7OAitqU_C8it476XYAnqypPPHBONMyr0xwLf5AWWcaS61vEjfOvXXGhaQi7lfDMguoX-wq0cgqP19dPhv-z09VQ1cMCSuEklEJVCddJ96BUCgufs-I8WIhy5Dkg2VwTOdtba_2SSPrsCsuznZQ6fmBWnrHw");'></div>
</div>
<div>
<h3 class="text-xl font-bold">Classic Reubens</h3>
<p class="text-text-muted-light dark:text-text-muted-dark mt-1">A timeless classic with corned beef, Swiss cheese, sauerkraut, and Russian dressing.</p>
</div>
</div>
<div class="flex flex-col gap-4 group">
<div class="w-full overflow-hidden rounded-lg">
<div class="w-full bg-center bg-no-repeat aspect-square bg-cover transition-transform duration-500 group-hover:scale-110" data-alt="A basket of golden, crispy french fries." style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDiUsUzESF3x4VQYk2OEqtFSgFAZJyxbvBmF-ccYv00-TBoAbGVjRt3EpuOvk6F3buc2Lpa1CfIh_8_-5GQiQMJ5T0ZXEFjU2hvy1pC3n-LGbbblvpSbr5yowPLCTDlao7jFl_46EgR1ixtJFZG8hO9EwhzDsNq2ylwbQxPbf_SIXGINQlhwAdVU3XkLDSwmFpswBRPqvs98fQG5xS6hLGczzS-XPDrlvyKEGNKsZwZfHq8FTVm1PEPRNJ_Yw2GnLJ-wEG343w65A");'></div>
</div>
<div>
<h3 class="text-xl font-bold">Crispy Fries</h3>
<p class="text-text-muted-light dark:text-text-muted-dark mt-1">Hand-cut and double-fried for the ultimate crispy texture and fluffy inside.</p>
</div>
</div>
</div>
</section>
<section class="bg-primary/5 dark:bg-primary/10">
<div class="container mx-auto px-4 py-16 sm:py-24 text-center flex flex-col items-center gap-6">
<h2 class="text-4xl md:text-5xl font-display uppercase tracking-wider max-w-3xl">
                        Ready to Eat?
                    </h2>
<p class="text-lg text-text-muted-light dark:text-text-muted-dark max-w-2xl">
                        Don't wait. Find your nearest Smash Burgers and order now for pickup or delivery.
                    </p>
<button class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-14 px-8 bg-primary text-white text-lg font-bold leading-normal tracking-wide uppercase transition-transform hover:scale-105 active:scale-100">
<span class="truncate">View Menu &amp; Order</span>
</button>
</div>
</section>
<footer class="bg-background-light dark:bg-background-dark border-t border-black/5 dark:border-white/5">
<div class="container mx-auto px-4 py-16 flex flex-col items-center gap-8">
<div class="flex items-center space-x-3">
<div class="bg-primary rounded-full p-2">
<svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 18.5V16.5C11 14.29 9.21 12.5 7 12.5C4.79 12.5 3 14.29 3 16.5V18.5M11 18.5H3M21 18.5V16.5C21 14.29 19.21 12.5 17 12.5C14.79 12.5 13 14.29 13 16.5V18.5M21 18.5H13M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke-linecap="round" stroke-linejoin="round"></path></svg>
</div>
<span class="text-2xl font-display uppercase tracking-wider text-text-light dark:text-text-dark">Smash Burgers</span>
</div>
<div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
<a class="text-text-muted-light dark:text-text-muted-dark font-medium hover:text-primary dark:hover:text-primary transition-colors" href="#">Menu</a>
<a class="text-text-muted-light dark:text-text-muted-dark font-medium hover:text-primary dark:hover:text-primary transition-colors" href="#">Locations</a>
<a class="text-text-muted-light dark:text-text-muted-dark font-medium hover:text-primary dark:hover:text-primary transition-colors" href="#">Contact</a>
<a class="text-text-muted-light dark:text-text-muted-dark font-medium hover:text-primary dark:hover:text-primary transition-colors" href="#">Privacy Policy</a>
</div>
<div class="flex justify-center gap-6">
<a class="text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M12.315 2c-4.09.022-5.468.166-7.382.918-1.93.754-3.27 2.08-4.02 4.018C.17 8.84 0 10.21 0 14.3s.17 5.46.91 7.38c.75 1.93 2.09 3.27 4.02 4.02 1.91.75 3.29.9 7.38.91 4.09-.02 5.47-.16 7.38-.91 1.93-.75 3.27-2.09 4.02-4.02.74-1.91.9-3.29.9-7.38s-.16-5.47-.9-7.38c-.75-1.93-2.09-3.27-4.02-4.02C17.785 2.166 16.405 2.022 12.315 2zm-1.01 1.8h2.4c4.14 0 5.28.16 7.1.88 1.48.58 2.5 1.6 3.08 3.08.72 1.82.88 2.96.88 7.1s-.16 5.28-.88 7.1c-.58 1.48-1.6 2.5-3.08 3.08-1.82.72-2.96.88-7.1.88h-2.4c-4.14 0-5.28-.16-7.1-.88-1.48-.58-2.5-1.6-3.08-3.08-.72-1.82-.88-2.96-.88-7.1s.16-5.28.88-7.1c.58-1.48 1.6-2.5 3.08-3.08 1.82-.72 2.96-.88 7.1-.88z" fill-rule="evenodd"></path><path d="M11.3 7.725c-2.95 0-5.35 2.4-5.35 5.35s2.4 5.35 5.35 5.35 5.35-2.4 5.35-5.35-2.4-5.35-5.35-5.35zm0 8.9c-1.96 0-3.55-1.59-3.55-3.55s1.59-3.55 3.55-3.55 3.55 1.59 3.55 3.55-1.59 3.55-3.55 3.55z"></path><circle cx="17.73" cy="6.27" r="1.3"></circle></svg>
</a>
<a class="text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path clip-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" fill-rule="evenodd"></path></svg>
</a>
<a class="text-text-muted-light dark:text-text-muted-dark hover:text-primary dark:hover:text-primary transition-colors" href="#">
<svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
</a>
</div>
<p class="text-sm text-text-muted-light dark:text-text-muted-dark">© 2024 Smash Burgers. All Rights Reserved.</p>
</div>
</footer>
</div>
</div>
</body></html>

Menu Page
<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Smash Burgers Menu</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet"/>
<style>
    .material-symbols-outlined {
      font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 24
    }
  </style>
<script id="tailwind-config">
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#FF5E0F",
            "background-light": "#f8f6f6",
            "background-dark": "#181111",
            "surface-light": "#ffffff",
            "surface-dark": "#211111",
          },
          fontFamily: {
            "display": ["Plus Jakarta Sans", "sans-serif"]
          },
          borderRadius: {
            "DEFAULT": "1rem",
            "lg": "2rem",
            "xl": "3rem",
            "full": "9999px"
          },
        },
      },
    }
  </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
<div class="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<header class="sticky top-0 z-50 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200/50 dark:border-gray-700/50">
<div class="text-primary dark:text-primary flex size-12 shrink-0 items-center justify-center">
<span class="material-symbols-outlined text-4xl">lunch_dining</span>
</div>
<h1 class="text-[#181111] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Our Menu</h1>
<div class="flex items-center justify-end gap-1.5 w-auto pr-2">
<span class="material-symbols-outlined text-sm text-[#886364] dark:text-gray-400">location_on</span>
<p class="text-[#886364] dark:text-gray-400 text-base font-bold leading-normal tracking-[0.015em] shrink-0">Albany, OR</p>
</div>
</header>
<nav class="sticky top-[72px] z-40 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md pt-3 pb-3">
<div class="flex gap-2.5 px-4 overflow-x-auto whitespace-nowrap no-scrollbar">
<a class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary pl-4 pr-4 border-2 border-primary" href="#smash-burgers">
<p class="text-white text-sm font-bold leading-normal">Burgers</p>
</a>
<a class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-transparent pl-4 pr-4 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors" href="#chicken-sandwiches">
<p class="text-[#181111] dark:text-gray-300 text-sm font-bold leading-normal">Chicken</p>
</a>
<a class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-transparent pl-4 pr-4 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors" href="#reubens">
<p class="text-[#181111] dark:text-gray-300 text-sm font-bold leading-normal">Reubens</p>
</a>
<a class="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full bg-transparent pl-4 pr-4 border-2 border-gray-200 dark:border-gray-700 hover:border-primary/50 transition-colors" href="#fries-sides">
<p class="text-[#181111] dark:text-gray-300 text-sm font-bold leading-normal">Sides</p>
</a>
</div>
</nav>
<main class="flex-grow px-4">
<section class="pt-6" id="smash-burgers">
<h2 class="text-primary dark:text-primary text-3xl font-bold leading-tight tracking-[-0.015em] mb-4">Smash Burgers</h2>
<div class="grid grid-cols-1 gap-4">
<div class="flex items-center gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-3 shadow-sm hover:shadow-lg transition-shadow duration-300 group hover:ring-2 hover:ring-primary">
<div class="h-24 w-24 shrink-0 overflow-hidden rounded-md">
<div class="h-full w-full bg-center bg-no-repeat bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCokKE8PYeCiqLMIbNEJQCwomWWaekBGGIGpaYF68UWIROYkqrC4XOJkfYd-evsHGjSnjMJAH2I6OTEHcoH5FXcewfxeNwdA2gbVDI7FOM2UYMMGTviDwsHXQ22piry2tdxn0ukmL2-FUTFcCozsu7N-qRF_m3ZP5rIvwVu18NGxqJgMG8zaYaGs_U6W0uPPWqstXa73nLTkdgm_sk42whW_tdUvlMx82dsJ38MRJT_zJIsUJIcaih3JxzbPbEJzS_GjmkumZVyvw");'></div>
</div>
<div class="flex-grow">
<h3 class="text-[#181111] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">The Classic Smash</h3>
<p class="text-[#886364] dark:text-gray-400 text-sm font-normal leading-normal mt-1">A juicy smashed patty, American cheese, pickles, signature sauce.</p>
<p class="text-primary text-lg font-bold leading-normal mt-2">$10.99</p>
</div>
<button class="flex min-w-[36px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 ml-auto self-end">
<span class="material-symbols-outlined text-xl">add</span>
</button>
</div>
<div class="flex items-center gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-3 shadow-sm hover:shadow-lg transition-shadow duration-300 group hover:ring-2 hover:ring-primary">
<div class="h-24 w-24 shrink-0 overflow-hidden rounded-md">
<div class="h-full w-full bg-center bg-no-repeat bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgHspNuvHR-FDRfpqMFzpXPeeZQG7CiPtFLqii4T_RxMdI6oeU28OCuLAQwvO9VCcMqLhQSS4aMYNc0-F8YgSuyg_X8VN9bMFoxUvPoIg-8mKD2_piDzuFH_6HrnJfnkGsI5Rtw7MD_wahpJrlrWc5_GO7V_hyaXWcjMkuGM9QSJqJ0J7KD7bHp5d1HWPhNpAoCD0cucE1rx8gNM68HHDuvpU-nQt4uemnsmetvnS1ppXAe3eFb32iSa_FWDcx2GxJdSRYhjViXg");'></div>
</div>
<div class="flex-grow">
<h3 class="text-[#181111] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Double Bacon Smash</h3>
<p class="text-[#886364] dark:text-gray-400 text-sm font-normal leading-normal mt-1">Two patties, crispy bacon, cheddar, grilled onions, BBQ sauce.</p>
<p class="text-primary text-lg font-bold leading-normal mt-2">$13.99</p>
</div>
<button class="flex min-w-[36px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 ml-auto self-end">
<span class="material-symbols-outlined text-xl">add</span>
</button>
</div>
</div>
</section>
<section class="pt-8" id="chicken-sandwiches">
<h2 class="text-primary dark:text-primary text-3xl font-bold leading-tight tracking-[-0.015em] mb-4">Chicken Sandwiches</h2>
<div class="grid grid-cols-1 gap-4">
<div class="flex items-center gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-3 shadow-sm hover:shadow-lg transition-shadow duration-300 group hover:ring-2 hover:ring-primary">
<div class="h-24 w-24 shrink-0 overflow-hidden rounded-md">
<div class="h-full w-full bg-center bg-no-repeat bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAgKg0_TTVqRL8kMUplDTn3L_P6hvF6yZ9YNhZ8qZ_bmRM7sWxpv2ecyEH632Afq91b7q7-Y3-Sz0AtbTWIDEbM-wY7CdUWWVBLF-wQWXoVfNIfq5iQeTOMSo9WU1NV7zZDfaHzkoPvylCYJp6UHCyPEjZoRVFGDsTWHLW3clAZpRg73Q2Fnnbp0-DVBQLmxXV5BucEeEvqDU_-eyg81itdk1eerPRGurg6URDkN_VMS7-5EtdsVyUTSpji-5SSYiYp0SiHVtsEog");'></div>
</div>
<div class="flex-grow">
<h3 class="text-[#181111] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Crispy Chicken Classic</h3>
<p class="text-[#886364] dark:text-gray-400 text-sm font-normal leading-normal mt-1">Golden-fried chicken breast, lettuce, tomato, creamy mayo.</p>
<p class="text-primary text-lg font-bold leading-normal mt-2">$11.99</p>
</div>
<button class="flex min-w-[36px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 ml-auto self-end">
<span class="material-symbols-outlined text-xl">add</span>
</button>
</div>
</div>
</section>
<section class="pt-8" id="reubens">
<h2 class="text-primary dark:text-primary text-3xl font-bold leading-tight tracking-[-0.015em] mb-4">Reubens</h2>
<div class="grid grid-cols-1 gap-4">
<div class="flex items-center gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-3 shadow-sm hover:shadow-lg transition-shadow duration-300 group hover:ring-2 hover:ring-primary">
<div class="h-24 w-24 shrink-0 overflow-hidden rounded-md">
<div class="h-full w-full bg-center bg-no-repeat bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDEGf86MkieZdK96N9SA6vzrQthYaZs8ZRw-cKsUs-4EFJcSqge4A-ntecLlCqBr4YJwWSfe9_EFgnqoh-bvpjOkq3m9lxvF5LPVYRG4bCtwXPQX2rpt1jEvt1HnDUctV0dsYc2KyAA-t0odStAwev0d62aIl2Hw6fIlM-WnWtpZJo4Zymu9FTy_UpfSXwZvfx1NTr-u25a_avFH4vLzuAa7C6LNSg37cKOtiZrxeaN9ODZVPeQb3CH8yJFdpoGWkhBGuaR5jCryA");'></div>
</div>
<div class="flex-grow">
<h3 class="text-[#181111] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">The Signature Reuben</h3>
<p class="text-[#886364] dark:text-gray-400 text-sm font-normal leading-normal mt-1">Corned beef, Swiss cheese, sauerkraut, Russian dressing, grilled rye.</p>
<p class="text-primary text-lg font-bold leading-normal mt-2">$12.99</p>
</div>
<button class="flex min-w-[36px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 ml-auto self-end">
<span class="material-symbols-outlined text-xl">add</span>
</button>
</div>
</div>
</section>
<section class="pt-8 pb-8" id="fries-sides">
<h2 class="text-primary dark:text-primary text-3xl font-bold leading-tight tracking-[-0.015em] mb-4">Fries &amp; Sides</h2>
<div class="grid grid-cols-1 gap-4">
<div class="flex items-center gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-3 shadow-sm hover:shadow-lg transition-shadow duration-300 group hover:ring-2 hover:ring-primary">
<div class="h-24 w-24 shrink-0 overflow-hidden rounded-md">
<div class="h-full w-full bg-center bg-no-repeat bg-cover" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDOSnjBB_bm2LIKPA9Pc5xNaRGA-MegHOUx4ZOgEERFpBa278otL1G67UWiSWdUZXfZD5TOOPHkQmwIlcZFFuJHuglKASigum_X_JWsJY7XVUd8WkR19GGCt6aJmIFK6hgPD8GI-VFsM2vfkgOwwTKcKvV5AflaYRH8hbAFzKOTaGhqhzbRX4bvZU8zjSIWEza7JvxUwMWZM6ubmH52E3eLqx_NeAKttn9RfDhncaa13eQt6sQBUD8TSjEY9mHZtlZUth8gRXBIVg");'></div>
</div>
<div class="flex-grow">
<h3 class="text-[#181111] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Classic Fries</h3>
<p class="text-[#886364] dark:text-gray-400 text-sm font-normal leading-normal mt-1">Perfectly salted, crispy, and golden brown.</p>
<p class="text-primary text-lg font-bold leading-normal mt-2">$4.99</p>
</div>
<button class="flex min-w-[36px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 w-9 bg-primary/20 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 ml-auto self-end">
<span class="material-symbols-outlined text-xl">add</span>
</button>
</div>
</div>
</section>
</main>
<footer class="bg-gray-100 dark:bg-gray-900 mt-8 py-8">
<div class="container mx-auto px-4 text-center">
<p class="text-sm text-gray-500 dark:text-gray-400">© 2024 Smash Burgers. All Rights Reserved.</p>
<div class="flex justify-center gap-6 mt-4">
<a class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary" href="#">Locations</a>
<a class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary" href="#">About Us</a>
<a class="text-sm text-gray-600 dark:text-gray-300 hover:text-primary" href="#">Contact</a>
</div>
</div>
</footer>
</div>

</body></html>

About Us Page
<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>About Us - Smash Burgers</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&amp;family=Roboto:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200" rel="stylesheet"/>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  </style>
<script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#FF5E0F",
            "background-light": "#fdfcfc",
            "background-dark": "#1a1a1a",
            "surface-light": "#ffffff",
            "surface-dark": "#242424",
            "text-light": "#181111",
            "text-dark": "#f0f0f0",
            "text-muted-light": "#5a5a5a",
            "text-muted-dark": "#a0a0a0",
          },
          fontFamily: {
            "display": ["Playfair Display", "serif"],
            "body": ["Roboto", "sans-serif"]
          },
          borderRadius: {
            "DEFAULT": "1rem",
            "lg": "2rem",
            "xl": "3rem",
            "full": "9999px"
          },
        },
      },
    }
  </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-body text-text-light dark:text-text-dark">
<div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div class="relative min-h-[50vh] flex items-center justify-center text-center text-white px-6 py-16">
<div class="absolute inset-0 bg-black/60 z-10"></div>
<div class="absolute inset-0 bg-cover bg-center" data-alt="A juicy, freshly made smash burger with melted cheese and fresh toppings, ready to be served." style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMCdobz7tgFsDt7gLlB235VsQ--agOlp6ABDSzDuEhzi2EEqqAZUVdyFYZx6m5oR50RGZcHM6DH-qg0VAFsSJdEmFMV0zYsyTrg3NpCvqQEf0kNxDhL50l0FGLBiuw19DGUkToyF4hNt3hc-ASU3EuAO76qqOf4S8kuCpiH1LiyXKmR4mCCeqanoHNo7AQBqNPKXrZwPIy4UYFMSnzupsNd2Nwn_BmIJDedbfoOcXhlPSzh0xzqpWYn1nya5Sb8q1dcwTqSYrxZw");'></div>
<div class="relative z-20 flex flex-col items-center">
<h1 class="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">The Art of the Smash.</h1>
<p class="max-w-xl text-base md:text-lg font-light text-white/90">Crafting Oregon's favorite burgers from the freshest local ingredients.</p>
</div>
</div>
<div class="py-16 md:py-24 px-6 bg-surface-light dark:bg-surface-dark">
<div class="max-w-3xl mx-auto text-center">
<h2 class="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-6">Our <span class="text-primary">Story</span></h2>
<p class="text-text-muted-light dark:text-text-muted-dark text-lg md:text-xl font-light leading-relaxed mb-4">
        Welcome to Smash Burgers, where our passion for the perfect burger is smashed into every single patty. It all started with a simple mission: to serve the best smash burgers in Oregon, made with love and the finest local ingredients.
      </p>
<p class="text-text-muted-light dark:text-text-muted-dark text-lg md:text-xl font-light leading-relaxed">
        We believe in quality you can taste, community you can feel, and a flavor that brings you back.
      </p>
</div>
</div>
<div class="px-6 py-16 md:py-24 bg-background-light dark:bg-background-dark">
<div class="max-w-4xl mx-auto">
<h2 class="font-display text-3xl md:text-4xl font-bold text-center text-text-light dark:text-text-dark mb-12">From a <span class="text-primary">Simple Idea</span> to a Local Favorite</h2>
<div class="relative">
<div class="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
<div class="relative flex flex-col gap-12">
<div class="flex items-start gap-6">
<div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
<span class="material-symbols-outlined text-xl">lightbulb</span>
</div>
<div class="pt-1.5">
<h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">2018: The Spark</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">A dream to create the perfect smash burger using only Oregon's best local produce takes root.</p>
</div>
</div>
<div class="flex items-start gap-6">
<div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
<span class="material-symbols-outlined text-xl">storefront</span>
</div>
<div class="pt-1.5">
<h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">2020: Albany Opens</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">Our first location opens its doors, quickly becoming a beloved spot for Albany's burger enthusiasts.</p>
</div>
</div>
<div class="flex items-start gap-6">
<div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
<span class="material-symbols-outlined text-xl">celebration</span>
</div>
<div class="pt-1.5">
<h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">2022: Welcome, Salem!</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">We bring the smash to Salem, expanding our family and sharing our passion with a new community.</p>
</div>
</div>
<div class="flex items-start gap-6">
<div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
<span class="material-symbols-outlined text-xl">favorite</span>
</div>
<div class="pt-1.5">
<h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">Today: More Than a Burger</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">We continue to serve up smiles, support local farms, and strive to be your favorite neighborhood burger joint.</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="relative bg-surface-light dark:bg-surface-dark py-16 px-6 md:py-24">
<div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
<div class="w-full md:w-1/2">
<div class="aspect-square w-full rounded-lg bg-cover bg-center shadow-lg" data-alt="A team of smiling chefs working in a clean, modern restaurant kitchen." style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvM_CXGMRGmipZ_sEBCuQpu9xd6WEv5QXlvIdbW5rYWNoaufvPiGidC5JJg3YDj_y-Bw6qEO8n7zMPqM0ZrBb-lae3yzd-Hb_iskzpjMtyxak5zKV2vquN4w6FPz53qutMLQNnNTD817jFtrtmlITYozLN_i0EeyoDtT0cvuD6AYhu3R_VysW4Im3FrQgokor0Rei21TJzpml3V6Asnl7mltJs_fLwATzgOZzgtfevdt3ZQtzFqpL2cadVZ1VKgHVFikdXWbpzjA");'>
</div>
</div>
<div class="w-full md:w-1/2 text-center md:text-left">
<h3 class="text-primary text-sm font-bold tracking-widest uppercase mb-2">Our Values</h3>
<h2 class="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">Crafted with Care</h2>
<p class="text-text-muted-light dark:text-text-muted-dark text-lg font-light leading-relaxed mb-6">
          Our team is a family of food lovers dedicated to the art of the burger. We're the friendly faces who greet you, the skilled hands that craft your meal, and the reason every visit feels like coming home. We're committed to three things:
        </p>
<ul class="space-y-4 text-left">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">eco</span>
<div>
<h4 class="font-bold text-text-light dark:text-text-dark">Local Sourcing</h4>
<p class="text-text-muted-light dark:text-text-muted-dark">Supporting Oregon farms for unbeatable flavor.</p>
</div>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">handshake</span>
<div>
<h4 class="font-bold text-text-light dark:text-text-dark">Community First</h4>
<p class="text-text-muted-light dark:text-text-muted-dark">Building a welcoming place for friends and family.</p>
</div>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">verified</span>
<div>
<h4 class="font-bold text-text-light dark:text-text-dark">Uncompromising Quality</h4>
<p class="text-text-muted-light dark:text-text-muted-dark">From our 100% grass-fed beef to our daily-baked buns.</p>
</div>
</li>
</ul>
</div>
</div>
</div>
<div class="px-6 py-16 md:py-24 bg-background-light dark:bg-background-dark">
<div class="max-w-4xl mx-auto text-center">
<h2 class="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-12">Come Say Hi!</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
<div class="flex flex-col gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
<h3 class="font-display text-2xl font-bold text-text-light dark:text-text-dark">Albany</h3>
<div class="border-t border-gray-200 dark:border-gray-700"></div>
<div class="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
<span class="material-symbols-outlined text-xl text-primary mt-1">location_on</span>
<p class="flex-1">123 Burger Lane, Albany, OR 97321</p>
</div>
<div class="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
<span class="material-symbols-outlined text-xl text-primary mt-1">schedule</span>
<p class="flex-1">Mon - Sun: 11:00 AM - 9:00 PM</p>
</div>
<a class="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90" href="#">
              Get Directions
            </a>
</div>
<div class="flex flex-col gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
<h3 class="font-display text-2xl font-bold text-text-light dark:text-text-dark">Salem</h3>
<div class="border-t border-gray-200 dark:border-gray-700"></div>
<div class="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
<span class="material-symbols-outlined text-xl text-primary mt-1">location_on</span>
<p class="flex-1">456 Patty Place, Salem, OR 97301</p>
</div>
<div class="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
<span class="material-symbols-outlined text-xl text-primary mt-1">schedule</span>
<p class="flex-1">Mon - Sun: 11:00 AM - 9:00 PM</p>
</div>
<a class="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90" href="#">
              Get Directions
            </a>
</div>
</div>
</div>
</div>
<div class="sticky bottom-0 mt-auto w-full bg-white/90 p-4 backdrop-blur-md dark:bg-background-dark/90 border-t border-gray-200 dark:border-gray-700">
<div class="max-w-4xl mx-auto">
<a class="flex w-full items-center justify-center rounded-full bg-primary px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02]" href="#">
          Order Now
        </a>
</div>
</div>
</div>

</body></html>

Contact Us Page
<!DOCTYPE html>
<html class="light" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>About Us - Smash Burgers</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&amp;family=Roboto:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,0..200" rel="stylesheet"/>
<style>
    .material-symbols-outlined {
      font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    }
  </style>
<script>
    tailwind.config = {
      darkMode: "class",
      theme: {
        extend: {
          colors: {
            "primary": "#FF5E0F",
            "background-light": "#fdfcfc",
            "background-dark": "#1a1a1a",
            "surface-light": "#ffffff",
            "surface-dark": "#242424",
            "text-light": "#181111",
            "text-dark": "#f0f0f0",
            "text-muted-light": "#5a5a5a",
            "text-muted-dark": "#a0a0a0",
          },
          fontFamily: {
            "display": ["Playfair Display", "serif"],
            "body": ["Roboto", "sans-serif"]
          },
          borderRadius: {
            "DEFAULT": "1rem",
            "lg": "2rem",
            "xl": "3rem",
            "full": "9999px"
          },
        },
      },
    }
  </script>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
<style>
    body {
      min-height: max(884px, 100dvh);
    }
  </style>
  </head>
<body class="bg-background-light dark:bg-background-dark font-body text-text-light dark:text-text-dark">
<div class="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
<div class="relative min-h-[50vh] flex items-center justify-center text-center text-white px-6 py-16">
<div class="absolute inset-0 bg-black/60 z-10"></div>
<div class="absolute inset-0 bg-cover bg-center" data-alt="A juicy, freshly made smash burger with melted cheese and fresh toppings, ready to be served." style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAMCdobz7tgFsDt7gLlB235VsQ--agOlp6ABDSzDuEhzi2EEqqAZUVdyFYZx6m5oR50RGZcHM6DH-qg0VAFsSJdEmFMV0zYsyTrg3NpCvqQEf0kNxDhL50l0FGLBiuw19DGUkToyF4hNt3hc-ASU3EuAO76qqOf4S8kuCpiH1LiyXKmR4mCCeqanoHNo7AQBqNPKXrZwPIy4UYFMSnzupsNd2Nwn_BmIJDedbfoOcXhlPSzh0xzqpWYn1nya5Sb8q1dcwTqSYrxZw");'></div>
<div class="relative z-20 flex flex-col items-center">
<h1 class="font-display text-4xl md:text-6xl font-bold leading-tight mb-4">The Art of the Smash.</h1>
<p class="max-w-xl text-base md:text-lg font-light text-white/90">Crafting Oregon's favorite burgers from the freshest local ingredients.</p>
</div>
</div>
<div class="py-16 md:py-24 px-6 bg-surface-light dark:bg-surface-dark">
<div class="max-w-3xl mx-auto text-center">
<h2 class="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-6">Our <span class="text-primary">Story</span></h2>
<p class="text-text-muted-light dark:text-text-muted-dark text-lg md:text-xl font-light leading-relaxed mb-4">
        Welcome to Smash Burgers, where our passion for the perfect burger is smashed into every single patty. It all started with a simple mission: to serve the best smash burgers in Oregon, made with love and the finest local ingredients.
      </p>
<p class="text-text-muted-light dark:text-text-muted-dark text-lg md:text-xl font-light leading-relaxed">
        We believe in quality you can taste, community you can feel, and a flavor that brings you back.
      </p>
</div>
</div>
<div class="px-6 py-16 md:py-24 bg-background-light dark:bg-background-dark">
<div class="max-w-4xl mx-auto">
<h2 class="font-display text-3xl md:text-4xl font-bold text-center text-text-light dark:text-text-dark mb-12">From a <span class="text-primary">Simple Idea</span> to a Local Favorite</h2>
<div class="relative">
<div class="absolute left-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-x-1/2"></div>
<div class="relative flex flex-col gap-12">
<div class="flex items-start gap-6">
<div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
<span class="material-symbols-outlined text-xl">lightbulb</span>
</div>
<div class="pt-1.5">
<h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">2018: The Spark</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">A dream to create the perfect smash burger using only Oregon's best local produce takes root.</p>
</div>
</div>
<div class="flex items-start gap-6">
<div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
<span class="material-symbols-outlined text-xl">storefront</span>
</div>
<div class="pt-1.5">
<h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">2020: Albany Opens</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">Our first location opens its doors, quickly becoming a beloved spot for Albany's burger enthusiasts.</p>
</div>
</div>
<div class="flex items-start gap-6">
<div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
<span class="material-symbols-outlined text-xl">celebration</span>
</div>
<div class="pt-1.5">
<h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">2022: Welcome, Salem!</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">We bring the smash to Salem, expanding our family and sharing our passion with a new community.</p>
</div>
</div>
<div class="flex items-start gap-6">
<div class="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-white z-10">
<span class="material-symbols-outlined text-xl">favorite</span>
</div>
<div class="pt-1.5">
<h3 class="text-xl font-bold text-text-light dark:text-text-dark mb-1">Today: More Than a Burger</h3>
<p class="text-text-muted-light dark:text-text-muted-dark leading-relaxed">We continue to serve up smiles, support local farms, and strive to be your favorite neighborhood burger joint.</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="relative bg-surface-light dark:bg-surface-dark py-16 px-6 md:py-24">
<div class="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">
<div class="w-full md:w-1/2">
<div class="aspect-square w-full rounded-lg bg-cover bg-center shadow-lg" data-alt="A team of smiling chefs working in a clean, modern restaurant kitchen." style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCvM_CXGMRGmipZ_sEBCuQpu9xd6WEv5QXlvIdbW5rYWNoaufvPiGidC5JJg3YDj_y-Bw6qEO8n7zMPqM0ZrBb-lae3yzd-Hb_iskzpjMtyxak5zKV2vquN4w6FPz53qutMLQNnNTD817jFtrtmlITYozLN_i0EeyoDtT0cvuD6AYhu3R_VysW4Im3FrQgokor0Rei21TJzpml3V6Asnl7mltJs_fLwATzgOZzgtfevdt3ZQtzFqpL2cadVZ1VKgHVFikdXWbpzjA");'>
</div>
</div>
<div class="w-full md:w-1/2 text-center md:text-left">
<h3 class="text-primary text-sm font-bold tracking-widest uppercase mb-2">Our Values</h3>
<h2 class="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-4">Crafted with Care</h2>
<p class="text-text-muted-light dark:text-text-muted-dark text-lg font-light leading-relaxed mb-6">
          Our team is a family of food lovers dedicated to the art of the burger. We're the friendly faces who greet you, the skilled hands that craft your meal, and the reason every visit feels like coming home. We're committed to three things:
        </p>
<ul class="space-y-4 text-left">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">eco</span>
<div>
<h4 class="font-bold text-text-light dark:text-text-dark">Local Sourcing</h4>
<p class="text-text-muted-light dark:text-text-muted-dark">Supporting Oregon farms for unbeatable flavor.</p>
</div>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">handshake</span>
<div>
<h4 class="font-bold text-text-light dark:text-text-dark">Community First</h4>
<p class="text-text-muted-light dark:text-text-muted-dark">Building a welcoming place for friends and family.</p>
</div>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary mt-1">verified</span>
<div>
<h4 class="font-bold text-text-light dark:text-text-dark">Uncompromising Quality</h4>
<p class="text-text-muted-light dark:text-text-muted-dark">From our 100% grass-fed beef to our daily-baked buns.</p>
</div>
</li>
</ul>
</div>
</div>
</div>
<div class="px-6 py-16 md:py-24 bg-background-light dark:bg-background-dark">
<div class="max-w-4xl mx-auto text-center">
<h2 class="font-display text-3xl md:text-4xl font-bold text-text-light dark:text-text-dark mb-12">Come Say Hi!</h2>
<div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
<div class="flex flex-col gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
<h3 class="font-display text-2xl font-bold text-text-light dark:text-text-dark">Albany</h3>
<div class="border-t border-gray-200 dark:border-gray-700"></div>
<div class="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
<span class="material-symbols-outlined text-xl text-primary mt-1">location_on</span>
<p class="flex-1">123 Burger Lane, Albany, OR 97321</p>
</div>
<div class="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
<span class="material-symbols-outlined text-xl text-primary mt-1">schedule</span>
<p class="flex-1">Mon - Sun: 11:00 AM - 9:00 PM</p>
</div>
<a class="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90" href="#">
              Get Directions
            </a>
</div>
<div class="flex flex-col gap-4 rounded-lg bg-surface-light dark:bg-surface-dark p-6 shadow-sm">
<h3 class="font-display text-2xl font-bold text-text-light dark:text-text-dark">Salem</h3>
<div class="border-t border-gray-200 dark:border-gray-700"></div>
<div class="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
<span class="material-symbols-outlined text-xl text-primary mt-1">location_on</span>
<p class="flex-1">456 Patty Place, Salem, OR 97301</p>
</div>
<div class="flex items-start gap-3 text-text-muted-light dark:text-text-muted-dark">
<span class="material-symbols-outlined text-xl text-primary mt-1">schedule</span>
<p class="flex-1">Mon - Sun: 11:00 AM - 9:00 PM</p>
</div>
<a class="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-bold text-white transition-opacity hover:opacity-90" href="#">
              Get Directions
            </a>
</div>
</div>
</div>
</div>
<div class="sticky bottom-0 mt-auto w-full bg-white/90 p-4 backdrop-blur-md dark:bg-background-dark/90 border-t border-gray-200 dark:border-gray-700">
<div class="max-w-4xl mx-auto">
<a class="flex w-full items-center justify-center rounded-full bg-primary px-8 py-4 text-center text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02]" href="#">
          Order Now
        </a>
</div>
</div>
</div>

</body></html>