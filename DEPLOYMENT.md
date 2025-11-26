# Deployment Guide - Smash Burgers Website

This Next.js application is ready for deployment on various hosting platforms. Below are instructions for the most popular options.

## Pre-Deployment Checklist

- [x] Production build tested successfully
- [x] All placeholder links replaced with actual URLs
- [x] SEO metadata configured for all pages
- [x] Images optimized and paths verified
- [x] No TypeScript errors
- [x] Environment variables documented

## Recommended Hosting Platform: Vercel

Vercel is the recommended platform for Next.js applications, offering the best performance and developer experience.

### Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configure Custom Domain (Optional)**
   - Go to Project Settings > Domains
   - Add your custom domain
   - Follow DNS configuration instructions

### Build Configuration (Auto-detected)
- **Framework Preset:** Next.js
- **Build Command:** `npm run build`
- **Output Directory:** `.next`
- **Install Command:** `npm install`

## Alternative: Netlify

### Deploy to Netlify

1. **Push code to GitHub** (same as above)

2. **Connect to Netlify**
   - Visit [netlify.com](https://netlify.com)
   - Click "Add new site" > "Import an existing project"
   - Connect to GitHub and select your repository
   - Netlify will use the `netlify.toml` configuration

3. **The `netlify.toml` file is already configured with:**
   - Build command and settings
   - Next.js plugin
   - Security headers
   - Cache optimization

## Important Notes

### Missing Assets
- **noise.png**: The `/public/noise.png` file is currently empty. You need to add a proper noise texture before deployment:
  1. Generate a noise texture (512x512 recommended) from:
     - https://www.noisetexturegenerator.com/
     - Or use Photoshop/GIMP with a noise filter
  2. Save it as `public/noise.png`
  3. This is used for the "Liquid Glass" visual effect

### Placeholder Content to Update
Before going live, update these placeholder values:

1. **Location Addresses**
   - Albany: "123 Burger Lane, Albany, OR 97321" (placeholder)
   - Salem: "456 Patty Place, Salem, OR 97301" (placeholder)
   - Update in: `/app/page.tsx`, `/app/about/page.tsx`, `/app/contact/page.tsx`, `/app/locations/page.tsx`

2. **Phone Numbers**
   - Albany: (541) 555-0123 (placeholder)
   - Salem: (503) 555-0456 (placeholder)
   - Update in: `/app/contact/page.tsx`, `/app/locations/page.tsx`

3. **Social Media Links**
   - Instagram, Facebook, Twitter links in `/components/layout/Footer.tsx` are set to generic URLs
   - Replace with actual business social media profiles

4. **Email Address**
   - Update `info@smashburgers.com` in `/app/contact/page.tsx` with actual email

5. **Operating Hours**
   - Verify hours are correct in all locations
   - Currently set to: Tuesday-Sunday 11:00 AM - 8:00 PM (Closed Mondays)

### Environment Variables
Currently, no environment variables are required. If you need to add any (e.g., Google Maps API key, analytics, etc.):

1. Copy `.env.example` to `.env.local` for local development
2. Add variables to your hosting platform's environment settings
3. Prefix public variables with `NEXT_PUBLIC_`

### Performance Optimization
- All images are already using Next.js Image component for automatic optimization
- Images are served from `/images` directory (symlinked in `/public`)
- Static pages are pre-rendered at build time
- Tailwind CSS is purged of unused styles in production

## Post-Deployment

After deployment:

1. **Test all pages**
   - Home: `/`
   - Menu: `/menu`
   - About: `/about`
   - Contact: `/contact`
   - Locations: `/locations`

2. **Verify functionality**
   - All navigation links work
   - Images load correctly
   - Forms work (contact form)
   - Mobile responsiveness

3. **SEO Check**
   - Run Lighthouse audit
   - Verify meta tags with view-source
   - Submit sitemap to Google Search Console

4. **Update placeholders**
   - Replace all placeholder addresses, phone numbers, and links with real information

## Troubleshooting

### Build Fails
- Run `npm run build` locally first to catch errors
- Check Node.js version (recommended: 18.x or 20.x)
- Clear cache: `rm -rf .next node_modules && npm install`

### Images Not Loading
- Verify images exist in `/images` directory
- Check that `/public/images` symlink exists
- Ensure image paths use `/images/` prefix

### Styling Issues
- Run `npm run build` to regenerate Tailwind styles
- Check for Tailwind config conflicts

## Support

For Next.js deployment help:
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
