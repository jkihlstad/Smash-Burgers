# Hosting & Performance Optimization To-Do List
## Smash Burgers Next.js Website

**Current Status:**
- Next.js 15.5.6
- 48 images (~13MB total, avg 270KB each, mostly JPG)
- Build size: 187MB (dev), Production: ~155KB First Load JS
- Using: Framer Motion, Lenis smooth scroll, Zustand
- All pages: Static prerendered (SSG)
- Google Fonts: Anton, Inter, Plus Jakarta Sans

---

## 1. PERFORMANCE OPTIMIZATION

### 1.1 Image Optimization (CRITICAL PRIORITY)

#### Current Issues:
- 48 images totaling ~13MB
- Individual images range 234KB-628KB (unoptimized JPGs)
- All images served from `/images` directory
- Next.js Image component used but source files are not optimized

**Action Items:**

**A. Pre-optimize Source Images** (Priority: CRITICAL | Impact: HIGH | Effort: 2-3 hours)
```bash
# Install image optimization tools
npm install -D sharp
# or use ImageMagick/CLI tools
brew install imagemagick
```

**Steps:**
1. Resize all images to maximum necessary dimensions:
   - Hero images: 1920x1080px max
   - Menu card images: 800x800px max (they display at 96px but need higher res for retina)
   - Feature section images: 600x600px max

2. Convert JPG images to optimized WebP/AVIF format:
   ```bash
   # Create a script to batch convert
   for img in images/*.JPG; do
     cwebp -q 85 "$img" -o "${img%.JPG}.webp"
   done
   ```

3. Compress remaining JPGs:
   ```bash
   # Use ImageMagick to compress
   for img in images/*.JPG; do
     convert "$img" -quality 85 -sampling-factor 4:2:0 -strip "$img"
   done
   ```

**Expected Gains:** 60-75% file size reduction (13MB → 3-4MB)

**B. Implement Responsive Images** (Priority: HIGH | Impact: MEDIUM | Effort: 2 hours)
```tsx
// Update next.config.js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
}
```

**Update Image Components:**
```tsx
// Hero images - add sizes prop
<Image
  src="/images/IMG_6429.webp"
  sizes="100vw"
  quality={85}
/>

// Menu card images (currently 96px)
<Image
  src={image}
  sizes="96px"  // Already correct
  quality={80}
/>

// Feature section images
<Image
  src="/images/IMG_6422.webp"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  quality={80}
/>
```

**Expected Gains:** Additional 20-30% bandwidth reduction via proper sizing

**C. Implement Placeholder Images** (Priority: MEDIUM | Impact: MEDIUM | Effort: 1 hour)
```tsx
// Generate blur placeholders for better UX
<Image
  src="/images/hero.webp"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..." // Generate with plaiceholder or sharp
/>
```

**Expected Gains:** Improved CLS score, better perceived performance

---

### 1.2 Code Splitting & Bundle Optimization (HIGH PRIORITY)

**A. Dynamic Import Heavy Components** (Priority: HIGH | Impact: MEDIUM | Effort: 1-2 hours)

Current heavy dependencies:
- Framer Motion (~48KB)
- Lenis smooth scroll (~12KB)
- Lucide icons (~variable)

**Actions:**
```tsx
// 1. app/layout.tsx - Lazy load smooth scroll
'use client'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), {
  ssr: false,
})

// 2. Lazy load Framer Motion components
const MotionDiv = dynamic(() => import('framer-motion').then(mod => ({
  default: mod.motion.div
})))

// 3. Split MenuItemCard animations
// components/features/MenuItemCard.tsx
const AnimatedCard = dynamic(() => import('./AnimatedMenuCard'), {
  loading: () => <StaticMenuCard />, // Show static version while loading
})
```

**Expected Gains:** 30-40KB reduction in initial bundle, improved FID

**B. Optimize Icon Imports** (Priority: MEDIUM | Impact: LOW | Effort: 30 min)
```tsx
// Instead of:
import { MapPin, Clock, Plus, UtensilsCrossed } from 'lucide-react'

// Use specific imports:
import MapPin from 'lucide-react/dist/esm/icons/map-pin'
import Clock from 'lucide-react/dist/esm/icons/clock'
```

**Expected Gains:** 5-10KB bundle reduction

**C. Remove Unused Dependencies** (Priority: MEDIUM | Impact: LOW | Effort: 30 min)

Check if Lenis smooth scroll is actually implemented:
```bash
grep -r "lenis" app/ components/
```

If not used, remove:
```bash
npm uninstall @studio-freight/lenis
```

**Expected Gains:** 12KB+ bundle reduction if unused

---

### 1.3 Font Optimization (MEDIUM PRIORITY)

**A. Subset Google Fonts** (Priority: MEDIUM | Impact: MEDIUM | Effort: 30 min)
```tsx
// app/layout.tsx
const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
  preload: true,
  fallback: ['Impact', 'Arial Black', 'sans-serif'],
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  preload: false, // Only load when needed
})
```

**B. Add Font Preconnect** (Priority: MEDIUM | Impact: LOW | Effort: 5 min)
```tsx
// app/layout.tsx - Add to <head>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
```

**Expected Gains:** 100-200ms faster font loading, improved CLS

---

### 1.4 CSS Optimization (MEDIUM PRIORITY)

**A. Purge Unused Tailwind Classes** (Priority: MEDIUM | Impact: LOW | Effort: 15 min)

Already configured correctly in `tailwind.config.ts`, but verify:
```ts
// Ensure all paths are included
content: [
  './pages/**/*.{js,ts,jsx,tsx,mdx}',
  './components/**/*.{js,ts,jsx,tsx,mdx}',
  './app/**/*.{js,ts,jsx,tsx,mdx}',
],
```

**B. Extract Critical CSS** (Priority: LOW | Impact: LOW | Effort: 1 hour)
```bash
npm install -D critters
```

Update `next.config.js`:
```js
const nextConfig = {
  experimental: {
    optimizeCss: true, // Use critters for critical CSS
  },
}
```

**Expected Gains:** Faster first paint, 5-10% LCP improvement

---

### 1.5 Lazy Loading Implementation (HIGH PRIORITY)

**A. Implement Intersection Observer for Below-Fold Images** (Priority: HIGH | Impact: MEDIUM | Effort: 1 hour)

Home page currently loads 5+ images immediately. Defer below-fold:
```tsx
// app/page.tsx - Feature section images
<Image
  src="/images/IMG_6422.JPG"
  loading="lazy" // Add to all non-hero images
  quality={80}
/>
```

**B. Lazy Load Components** (Priority: MEDIUM | Impact: LOW | Effort: 30 min)
```tsx
// app/page.tsx
const Footer = dynamic(() => import('@/components/layout/Footer'))
```

**Expected Gains:** 40-50% faster initial page load

---

## 2. HOSTING CONFIGURATION

### 2.1 Hosting Platform Recommendation (CRITICAL PRIORITY)

**Recommended: Vercel** (Priority: CRITICAL | Impact: HIGH | Effort: 30 min)

**Why Vercel:**
- Zero-config Next.js deployment
- Global Edge Network (CDN built-in)
- Automatic image optimization via `next/image`
- Free SSL/HTTPS
- Automatic preview deployments
- 100GB bandwidth free tier
- Perfect for static sites

**Alternative Options:**

**Option B: Netlify** (Good alternative)
- Similar features to Vercel
- Excellent for static sites
- 100GB bandwidth free
- Setup: `npm run build && netlify deploy`

**Option C: Cloudflare Pages** (Best for cost at scale)
- Unlimited bandwidth (free)
- Global CDN
- Requires some Next.js config tweaks
- Best long-term cost efficiency

**Option D: AWS Amplify/S3 + CloudFront** (Most control)
- Cheapest at scale
- Requires more setup
- Full AWS ecosystem
- Best for advanced users

**Recommendation:** Start with Vercel, migrate to Cloudflare Pages if traffic grows significantly.

---

### 2.2 Vercel Deployment Setup (CRITICAL PRIORITY)

**A. Initial Deployment** (Priority: CRITICAL | Impact: HIGH | Effort: 30 min)

**Steps:**
1. Create Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```
3. Deploy:
   ```bash
   cd /path/to/project
   vercel
   ```
4. Follow prompts:
   - Link to existing project? No
   - Project name: smash-burgers
   - Directory: ./
   - Override settings? No

5. Production deployment:
   ```bash
   vercel --prod
   ```

**B. Configure Environment** (Priority: HIGH | Impact: MEDIUM | Effort: 15 min)

Create `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "rewrites": [
    { "source": "/images/:path*", "destination": "/images/:path*" }
  ]
}
```

**C. Configure Git Integration** (Priority: HIGH | Impact: MEDIUM | Effort: 15 min)

1. Initialize git (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Create GitHub repository
3. Push code:
   ```bash
   git remote add origin https://github.com/USERNAME/smash-burgers.git
   git push -u origin main
   ```

4. Connect to Vercel:
   - Go to Vercel dashboard
   - Import Git repository
   - Auto-deploys on push to main

**Expected Result:** Automatic deployments, preview URLs for branches

---

### 2.3 CDN & Caching Configuration (HIGH PRIORITY)

**A. Configure Next.js Headers** (Priority: HIGH | Impact: HIGH | Effort: 20 min)

Update `next.config.js`:
```js
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(?:jpg|jpeg|gif|png|svg|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}
```

**Expected Gains:** 90%+ cache hit rate, dramatically reduced bandwidth

**B. Configure Vercel Edge Caching** (Priority: MEDIUM | Impact: MEDIUM | Effort: 10 min)

Vercel does this automatically, but verify in `vercel.json`:
```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Expected Gains:** Near-instant image delivery worldwide

---

### 2.4 Custom Domain Setup (MEDIUM PRIORITY)

**A. Domain Configuration** (Priority: MEDIUM | Impact: LOW | Effort: 30 min)

**Steps:**
1. Purchase domain (e.g., smashburgers-oregon.com)
2. In Vercel dashboard:
   - Go to Project Settings → Domains
   - Add domain
3. Update DNS records (at domain registrar):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (Vercel IP)

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```
4. Wait for propagation (5 min - 24 hours)

**B. SSL Configuration** (Priority: MEDIUM | Impact: MEDIUM | Effort: 5 min)

Vercel handles this automatically. Verify:
- HTTPS redirect enabled
- SSL certificate provisioned

**Expected Result:** Professional domain with automatic HTTPS

---

### 2.5 Environment Variables (MEDIUM PRIORITY)

**A. Setup Environment Files** (Priority: MEDIUM | Impact: LOW | Effort: 15 min)

Create `.env.local` (for local development):
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ID=
```

Create `.env.production` (for production):
```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_ANALYTICS_ID=
```

**B. Configure Vercel Environment Variables** (Priority: MEDIUM | Impact: LOW | Effort: 10 min)

In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add variables for Production, Preview, Development
3. Redeploy to apply

**Expected Result:** Proper environment separation

---

## 3. BUILD OPTIMIZATION

### 3.1 Production Build Settings (HIGH PRIORITY)

**A. Enable Production Optimizations** (Priority: HIGH | Impact: HIGH | Effort: 15 min)

Update `next.config.js`:
```js
const nextConfig = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
    unoptimized: false, // Ensure optimization is enabled
  },

  // Compression
  compress: true,

  // React optimization
  reactStrictMode: true,

  // Production source maps (disable for smaller builds)
  productionBrowserSourceMaps: false,

  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
    ],
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev) {
      config.optimization.minimize = true
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
        },
      }
    }
    return config
  },
}
```

**Expected Gains:** 15-20% smaller bundle, faster builds

**B. Optimize Package.json Scripts** (Priority: LOW | Impact: LOW | Effort: 5 min)

Update `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "analyze": "ANALYZE=true next build",
    "validate-menu": "node scripts/update-menu.js validate",
    "validate-images": "node scripts/update-images.js check",
    "list-menu": "node scripts/update-menu.js list",
    "list-images": "node scripts/update-images.js list",
    "find-unused-images": "node scripts/update-images.js unused",
    "validate-all": "node scripts/update-menu.js validate && node scripts/update-images.js check"
  }
}
```

---

### 3.2 Static Generation Optimization (MEDIUM PRIORITY)

**A. Verify Static Generation** (Priority: MEDIUM | Impact: MEDIUM | Effort: 10 min)

Current status: All pages are static (✓ Good!)

Verify build output shows `○ (Static)` for all routes:
```bash
npm run build
```

**B. Add Metadata for SEO** (Priority: MEDIUM | Impact: MEDIUM | Effort: 1 hour)

```tsx
// app/page.tsx
export const metadata = {
  title: 'Smash Burgers - Simply Better Burgers | Albany & Salem, OR',
  description: 'Fresh, handcrafted burgers, sandwiches, and fries made daily in Albany and Salem, Oregon. Order online for pickup or delivery.',
  keywords: 'smash burgers, Albany Oregon, Salem Oregon, burgers, chicken sandwiches, reubens, fries',
  openGraph: {
    title: 'Smash Burgers - Simply Better Burgers',
    description: 'Fresh, handcrafted burgers made daily.',
    images: ['/images/og-image.jpg'],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smash Burgers',
    description: 'Fresh, handcrafted burgers made daily.',
    images: ['/images/twitter-image.jpg'],
  },
}
```

Repeat for all pages.

**Expected Gains:** Better SEO, social sharing

**C. Generate Sitemap** (Priority: MEDIUM | Impact: LOW | Effort: 30 min)

Create `app/sitemap.ts`:
```ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://your-domain.com/menu',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://your-domain.com/locations',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://your-domain.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://your-domain.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
```

**Expected Gains:** Better search engine indexing

---

### 3.3 Compression Settings (HIGH PRIORITY)

**A. Enable Brotli Compression** (Priority: HIGH | Impact: MEDIUM | Effort: 5 min)

Vercel handles this automatically, but verify in `next.config.js`:
```js
const nextConfig = {
  compress: true, // Already enabled
}
```

**B. Compress Static Assets** (Priority: MEDIUM | Impact: LOW | Effort: 30 min)

Install compression plugin:
```bash
npm install -D compression-webpack-plugin
```

Update `next.config.js`:
```js
const CompressionPlugin = require('compression-webpack-plugin')

const nextConfig = {
  webpack: (config, { dev }) => {
    if (!dev) {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      )
    }
    return config
  },
}
```

**Expected Gains:** 30-40% reduction in text asset sizes

---

## 4. CORE WEB VITALS OPTIMIZATION

### 4.1 LCP (Largest Contentful Paint) - Target: <2.5s

**Current Issues:**
- Large hero image (potentially 1MB+)
- Fonts loading from Google
- No preload hints

**A. Preload Hero Image** (Priority: CRITICAL | Impact: HIGH | Effort: 10 min)

```tsx
// app/page.tsx
export default function Home() {
  return (
    <>
      <link
        rel="preload"
        href="/images/IMG_6429.webp"
        as="image"
        type="image/webp"
      />
      {/* Rest of component */}
    </>
  )
}
```

**B. Optimize Hero Image** (Priority: CRITICAL | Impact: HIGH | Effort: 15 min)

1. Resize hero to 1920x1080 max
2. Compress to WebP at 85% quality
3. Add blur placeholder:
   ```tsx
   <Image
     src="/images/IMG_6429.webp"
     alt="..."
     fill
     priority
     placeholder="blur"
     blurDataURL="data:image/webp;base64,..."
   />
   ```

**Expected Gains:** LCP < 2.0s (from likely 3-4s)

**C. Inline Critical CSS** (Priority: HIGH | Impact: MEDIUM | Effort: 30 min)

Already using Tailwind which is optimized, but ensure critical styles load first:
```tsx
// app/layout.tsx
import './globals.css' // Ensure this is first
```

**Expected Gains:** 200-300ms LCP improvement

---

### 4.2 FID (First Input Delay) - Target: <100ms

**Current Issues:**
- Framer Motion adds main thread work
- Multiple JavaScript bundles

**A. Reduce Main Thread Blocking** (Priority: HIGH | Impact: MEDIUM | Effort: 1 hour)

1. Code split animations:
   ```tsx
   const AnimatedComponent = dynamic(
     () => import('./AnimatedComponent'),
     { ssr: false }
   )
   ```

2. Defer non-critical scripts:
   ```tsx
   <Script
     src="/analytics.js"
     strategy="lazyOnload"
   />
   ```

**Expected Gains:** FID < 50ms

**B. Optimize Event Handlers** (Priority: MEDIUM | Impact: LOW | Effort: 30 min)

```tsx
// Use passive event listeners
useEffect(() => {
  const handleScroll = () => { /* ... */ }
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**Expected Gains:** 10-20ms FID improvement

---

### 4.3 CLS (Cumulative Layout Shift) - Target: <0.1

**Current Issues:**
- Images without dimensions
- Web fonts causing FOUT
- Dynamic content loading

**A. Add Image Dimensions** (Priority: HIGH | Impact: HIGH | Effort: 1 hour)

```tsx
// All images should have explicit dimensions or aspect ratio
<Image
  src="/images/IMG_6422.JPG"
  width={600}
  height={600}
  alt="..."
/>

// Or use fill with aspect ratio container
<div className="relative w-full aspect-square">
  <Image src="..." fill className="object-cover" />
</div>
```

**B. Font Display Strategy** (Priority: HIGH | Impact: MEDIUM | Effort: 10 min)

Already using `display: 'swap'` (✓ Good!)

Add fallback fonts:
```css
/* tailwind.config.ts */
fontFamily: {
  display: ['var(--font-anton)', 'Impact', 'Arial Black', 'sans-serif'],
  body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
}
```

**C. Reserve Space for Dynamic Content** (Priority: MEDIUM | Impact: MEDIUM | Effort: 30 min)

```tsx
// Add min-height to prevent layout shift
<section className="min-h-[600px]">
  {/* Dynamic content */}
</section>
```

**Expected Gains:** CLS < 0.05

---

### 4.4 TTFB (Time to First Byte) - Target: <600ms

**Current Issues:**
- Static site, should be fast already
- No server-side processing needed

**A. Enable Edge Functions** (Priority: LOW | Impact: LOW | Effort: 5 min)

Vercel automatically deploys to edge, verify:
```js
// vercel.json
{
  "regions": ["iad1", "sfo1"] // US East + West
}
```

**B. Optimize Build Output** (Priority: MEDIUM | Impact: LOW | Effort: 15 min)

Ensure static export is optimized:
```bash
npm run build
# Verify all pages show ○ (Static)
```

**Expected Gains:** TTFB < 200ms on Vercel Edge

---

## 5. ADDITIONAL SPEED OPTIMIZATIONS

### 5.1 Service Worker / PWA (LOW PRIORITY)

**A. Add PWA Support** (Priority: LOW | Impact: MEDIUM | Effort: 2 hours)

Install PWA plugin:
```bash
npm install next-pwa
```

Update `next.config.js`:
```js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  // existing config
})
```

Create `public/manifest.json`:
```json
{
  "name": "Smash Burgers",
  "short_name": "Smash Burgers",
  "description": "Fresh, handcrafted burgers made daily",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0F0F0F",
  "theme_color": "#FF5E0F",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Expected Gains:** Offline support, faster repeat visits, installable app

---

### 5.2 Preloading / Prefetching Strategies (MEDIUM PRIORITY)

**A. Preload Critical Routes** (Priority: MEDIUM | Impact: MEDIUM | Effort: 30 min)

```tsx
// app/layout.tsx
import Link from 'next/link'

// Links automatically prefetch on hover
<Link href="/menu" prefetch={true}>
  View Menu
</Link>
```

**B. Prefetch Menu Data** (Priority: MEDIUM | Impact: LOW | Effort: 15 min)

```tsx
// app/page.tsx
import Link from 'next/link'

<Link href="/menu" prefetch={true}>
  {/* Menu data will prefetch on hover */}
</Link>
```

**Expected Gains:** Instant navigation feel, 50-70% faster perceived navigation

---

### 5.3 Third-Party Script Optimization (HIGH PRIORITY)

**A. Optimize Analytics Loading** (Priority: HIGH | Impact: MEDIUM | Effort: 30 min)

If adding Google Analytics or similar:
```tsx
// app/layout.tsx
import Script from 'next/script'

<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

**B. Defer Social Media Scripts** (Priority: MEDIUM | Impact: LOW | Effort: 15 min)

```tsx
// Load Facebook/Instagram widgets lazily
<Script
  src="https://connect.facebook.net/en_US/sdk.js"
  strategy="lazyOnload"
/>
```

**Expected Gains:** 500ms-1s faster initial load

---

### 5.4 Database / API Optimization (NOT APPLICABLE)

**Current Status:** No database, no external APIs. All data static from JSON files.

**Future Consideration:** If adding ordering system:
- Use edge functions for API routes
- Implement request caching
- Use SWR or React Query for data fetching
- Consider Redis for session management

---

## 6. MONITORING & ANALYTICS

### 6.1 Performance Monitoring Setup (HIGH PRIORITY)

**A. Add Web Vitals Reporting** (Priority: HIGH | Impact: LOW | Effort: 30 min)

Create `app/web-vitals.tsx`:
```tsx
'use client'

import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric)
    // Send to analytics
    if (window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.value),
        metric_id: metric.id,
        metric_delta: metric.delta,
      })
    }
  })
}
```

Add to `app/layout.tsx`:
```tsx
import { WebVitals } from './web-vitals'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <WebVitals />
        {children}
      </body>
    </html>
  )
}
```

**B. Setup Vercel Analytics** (Priority: HIGH | Impact: LOW | Effort: 10 min)

```bash
npm install @vercel/analytics
```

```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

**C. Setup Speed Insights** (Priority: MEDIUM | Impact: LOW | Effort: 10 min)

```bash
npm install @vercel/speed-insights
```

```tsx
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

**Expected Result:** Real-time performance monitoring

---

### 6.2 Lighthouse CI Setup (MEDIUM PRIORITY)

**A. Add Lighthouse CI** (Priority: MEDIUM | Impact: LOW | Effort: 1 hour)

```bash
npm install -D @lhci/cli
```

Create `.lighthouserc.json`:
```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./.next",
      "url": [
        "http://localhost:3000",
        "http://localhost:3000/menu",
        "http://localhost:3000/about"
      ]
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", {"minScore": 0.9}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["error", {"minScore": 0.9}],
        "categories:seo": ["error", {"minScore": 0.9}]
      }
    }
  }
}
```

Add script to `package.json`:
```json
{
  "scripts": {
    "lighthouse": "lhci autorun"
  }
}
```

**Expected Result:** Automated performance testing

---

## 7. DEPLOYMENT CHECKLIST

### Pre-Deployment (Complete before first deploy)
- [ ] Optimize all images (resize, convert to WebP)
- [ ] Enable production optimizations in next.config.js
- [ ] Add proper metadata to all pages
- [ ] Configure caching headers
- [ ] Test build locally (`npm run build && npm start`)
- [ ] Run Lighthouse audit
- [ ] Check all links work
- [ ] Verify responsive design on mobile

### Initial Deployment
- [ ] Create Vercel account
- [ ] Deploy to Vercel
- [ ] Verify deployment works
- [ ] Check all images load correctly
- [ ] Test all pages and navigation
- [ ] Verify fonts load correctly

### Post-Deployment
- [ ] Configure custom domain (if applicable)
- [ ] Setup SSL certificate
- [ ] Add environment variables
- [ ] Setup analytics
- [ ] Setup monitoring
- [ ] Run production Lighthouse audit
- [ ] Check Core Web Vitals in Search Console

### Ongoing Optimization
- [ ] Monitor performance metrics weekly
- [ ] Review and optimize images quarterly
- [ ] Update dependencies monthly
- [ ] Review bundle size after each update
- [ ] A/B test performance improvements

---

## 8. EXPECTED PERFORMANCE TARGETS

### Before Optimization (Estimated Current State)
- **LCP:** 3.5-4.5s (Large unoptimized images)
- **FID:** 100-200ms (Heavy animations)
- **CLS:** 0.15-0.25 (Missing dimensions, font loading)
- **TTFB:** 500-800ms (Depends on hosting)
- **Lighthouse Score:** 60-75/100
- **Bundle Size:** 155KB First Load JS (good!)
- **Image Payload:** ~13MB (terrible!)

### After Critical Optimizations (Phase 1)
- **LCP:** <2.0s (Optimized hero image, preload)
- **FID:** <50ms (Code splitting)
- **CLS:** <0.05 (Proper dimensions, font strategy)
- **TTFB:** <200ms (Vercel Edge)
- **Lighthouse Score:** 85-92/100
- **Bundle Size:** 120KB First Load JS
- **Image Payload:** ~3MB

### After All Optimizations (Phase 2)
- **LCP:** <1.5s (All images optimized, CDN)
- **FID:** <30ms (Minimal JS, lazy loading)
- **CLS:** <0.01 (Perfect layout stability)
- **TTFB:** <100ms (Edge optimization)
- **Lighthouse Score:** 95-100/100
- **Bundle Size:** 100KB First Load JS
- **Image Payload:** <2MB

---

## 9. IMPLEMENTATION ROADMAP

### Week 1: Critical Path (Deploy-Ready)
**Priority:** Get site live with baseline performance
- [ ] Optimize hero images (1 hour)
- [ ] Configure next.config.js for production (30 min)
- [ ] Setup Vercel account and deploy (1 hour)
- [ ] Configure caching headers (30 min)
- [ ] Add lazy loading to below-fold images (30 min)
- **Total Time:** ~3.5 hours
- **Expected Impact:** Site live, LCP <2.5s

### Week 2: Image Optimization
**Priority:** Reduce bandwidth by 70%
- [ ] Batch optimize all 48 images (2 hours)
- [ ] Convert to WebP/AVIF (1 hour)
- [ ] Add blur placeholders (1 hour)
- [ ] Test and verify all images (1 hour)
- **Total Time:** ~5 hours
- **Expected Impact:** 10MB+ bandwidth savings, LCP <2.0s

### Week 3: Code Optimization
**Priority:** Improve interactivity and bundle size
- [ ] Dynamic import Framer Motion (1 hour)
- [ ] Optimize icon imports (30 min)
- [ ] Code split components (2 hours)
- [ ] Add font optimization (30 min)
- **Total Time:** ~4 hours
- **Expected Impact:** 30KB bundle reduction, FID <50ms

### Week 4: Core Web Vitals
**Priority:** Achieve perfect scores
- [ ] Fix all CLS issues (2 hours)
- [ ] Optimize LCP further (1 hour)
- [ ] Add proper metadata (2 hours)
- [ ] Generate sitemap (30 min)
- **Total Time:** ~5.5 hours
- **Expected Impact:** Lighthouse >95, all Core Web Vitals green

### Week 5: Advanced Features
**Priority:** PWA and monitoring
- [ ] Add PWA support (2 hours)
- [ ] Setup analytics (1 hour)
- [ ] Configure monitoring (1 hour)
- [ ] Setup Lighthouse CI (1 hour)
- **Total Time:** ~5 hours
- **Expected Impact:** Offline support, real-time monitoring

---

## 10. TOOLS & RESOURCES

### Required Tools
- **Node.js 18+** - Runtime environment
- **npm/yarn** - Package manager
- **Vercel CLI** - Deployment tool
- **ImageMagick** or **sharp** - Image optimization
- **Chrome DevTools** - Performance testing

### Recommended Tools
- **Lighthouse** - Performance auditing
- **WebPageTest** - Real-world performance testing
- **GTmetrix** - Additional performance insights
- **Bundle Analyzer** - Bundle size analysis
  ```bash
  npm install -D @next/bundle-analyzer
  ```

### Online Resources
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Deployment:** https://vercel.com/docs
- **Web.dev:** https://web.dev (Core Web Vitals guides)
- **Image Optimization:** https://squoosh.app
- **PageSpeed Insights:** https://pagespeed.web.dev

### Performance Testing URLs
- **Lighthouse:** Chrome DevTools → Lighthouse tab
- **PageSpeed Insights:** https://pagespeed.web.dev
- **WebPageTest:** https://www.webpagetest.org
- **GTmetrix:** https://gtmetrix.com

---

## 11. COST BREAKDOWN

### Vercel (Recommended)
- **Free Tier:**
  - 100GB bandwidth/month
  - Unlimited deployments
  - Automatic SSL
  - Preview deployments
  - **Cost:** $0/month

- **Pro Tier** (if needed):
  - 1TB bandwidth/month
  - Advanced analytics
  - Team collaboration
  - **Cost:** $20/month

### Domain Registration
- **.com domain:** $12-15/year
- **Privacy protection:** Included with most registrars
- **Total:** ~$12-15/year

### Total Estimated Costs
- **Year 1:** $0-12 (domain only if using free hosting)
- **Ongoing:** $0-240/year (if upgrading to Pro)

---

## 12. SUCCESS METRICS

### Technical Metrics
- Lighthouse Performance Score: >95
- LCP: <1.5s
- FID: <50ms
- CLS: <0.05
- TTFB: <200ms
- Bundle Size: <120KB First Load JS
- Image Payload: <3MB total

### Business Metrics
- Page Load Time: <2s
- Bounce Rate: <30%
- Mobile Performance: >90 Lighthouse score
- SEO Score: >95
- Accessibility Score: >95

### Monitoring KPIs
- 95th percentile LCP: <2.5s
- Average FID: <30ms
- CLS occurrences: <5% of sessions
- Uptime: >99.9%
- CDN cache hit rate: >90%

---

## CONCLUSION

This comprehensive plan will transform the Smash Burgers website from a functional site into a blazing-fast, optimized web application. The prioritized approach ensures you can deploy quickly while iteratively improving performance.

**Minimum viable deployment:** Week 1 tasks (~3.5 hours)
**Optimal deployment:** Weeks 1-4 tasks (~18 hours)
**Full optimization:** All tasks (~23 hours)

Start with the critical path to get online, then systematically work through image and code optimizations for maximum impact.

**Questions or issues?** Refer to the Next.js documentation or Vercel support for additional guidance.

Good luck with your deployment! 🍔⚡
