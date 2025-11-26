# Smash Burgers Website

A modern, high-performance restaurant website built with Next.js 14+ featuring a "Liquid Glass" aesthetic.

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS + tailwind-merge + clsx
- **Animation:** Framer Motion
- **Scroll:** @studio-freight/react-lenis
- **Icons:** Lucide React
- **State:** Zustand
- **Fonts:** Anton, Inter, Plus Jakarta Sans

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Important Setup Notes

### Noise Texture
The project uses a noise texture for the "Liquid Glass" effect. You need to add a proper noise texture image:

1. Create or download a noise texture (512x512 recommended)
2. Save it as `public/noise.png`
3. The texture should be a grayscale noise pattern

You can generate one online at sites like:
- https://www.noisetexturegenerator.com/
- Or use Photoshop/GIMP with a noise filter

### Images
The website uses images from the `/images` folder. Make sure all referenced images exist:
- Hero image: `images/IMG_6429.JPG`
- Burger: `images/IMG_6422.JPG`
- Chicken: `images/IMG_6427.JPG`
- Reuben: `images/IMG_6435.JPG`
- Fries: `images/IMG_6450.JPG`

## Project Structure

```
/app
  layout.tsx          # Root layout with fonts & global styles
  page.tsx            # Home page
  globals.css         # Global styles
/components
  /ui                 # Atomic components (GlassCard, etc.)
  /layout             # Header, Footer
/lib
  utils.ts            # cn() utility
/public
  noise.png           # Noise texture for glass effect
/images
  *.JPG               # Product images
```

## Design System

### Colors
- **Primary:** #FF5E0F (Smash Burger Orange)
- **Background:** #0F0F0F (Rich Black)
- **Glass System:** Various rgba values for the liquid glass effect

### Typography
- **Display:** Anton (headings, uppercase)
- **Body:** Inter
- **Subheadings:** Plus Jakarta Sans

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Features

- Responsive design (mobile-first)
- "Liquid Glass" aesthetic with backdrop-blur and saturation
- Smooth animations with Framer Motion
- Optimized images with Next.js Image
- SEO-friendly with proper metadata
- Accessibility compliant

## Next Steps

1. Install dependencies: `npm install`
2. Add noise texture to `public/noise.png`
3. Run development server: `npm run dev`
4. Customize content in `app/page.tsx`
5. Add menu, locations, and contact pages as needed
