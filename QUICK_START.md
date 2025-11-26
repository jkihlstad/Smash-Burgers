# Quick Start Guide - Smash Burgers Website

## Get Up and Running in 5 Minutes

### Step 1: Install Dependencies (2 minutes)

```bash
cd "/Users/tonyakihlstadius/Documents/Jason's Work Documents/Smash Burgers/Website/website_build"
npm install
```

This will install:
- Next.js 15.0.0
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- And all other dependencies

### Step 2: Add Noise Texture (1 minute)

The Liquid Glass effect requires a noise texture. Choose one option:

**Quick Option (Recommended):**
Download a noise texture from https://www.noisetexturegenerator.com/ and save as:
```
public/noise.png
```

**Alternative:**
The project includes `public/noise.svg` as a fallback. It will work but PNG is preferred.

### Step 3: Start Development Server (30 seconds)

```bash
npm run dev
```

### Step 4: Open in Browser (10 seconds)

Navigate to: **http://localhost:3000**

You should see the home page with:
- Hero section with burger image
- Locations & Hours cards
- Famous For grid
- CTA section
- Footer

---

## That's It!

The website is now running locally.

## What Pages Are Available?

- **/** - Home page (you just created this)
- **/menu** - Menu page (already exists)
- **/about** - About page (already exists)
- **/contact** - Contact page (already exists)

---

## Common Issues & Solutions

### Issue: Images not loading
**Solution:** The images folder is symlinked to `public/images`. If images don't show:
```bash
ls -la public/images
```
Should show a symlink. If not:
```bash
ln -s "$(pwd)/images" "$(pwd)/public/images"
```

### Issue: Fonts not loading
**Solution:** Fonts load from Google Fonts automatically. Make sure you have internet connection on first load.

### Issue: TypeScript errors
**Solution:** The project uses strict TypeScript. Run:
```bash
npm run lint
```
to check for issues.

### Issue: Noise texture not visible
**Solution:** The noise is very subtle (3% opacity). It's correct. If you want it more visible, edit the opacity in the relevant component files.

---

## Development Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Check code for issues
```

---

## Project Structure Quick Reference

```
app/
  page.tsx         ← Home page (START HERE)
  layout.tsx       ← Root layout (fonts, global styles)
  menu/           ← Menu page
  about/          ← About page
  contact/        ← Contact page

components/
  layout/
    Header.tsx     ← Navigation bar
    Footer.tsx     ← Footer
  ui/
    GlassCard.tsx  ← Liquid glass card
    Button.tsx     ← Animated button

public/
  images/          ← Product photos (symlink)
  noise.png        ← Noise texture (add this)
```

---

## Customization Quick Tips

### Change Primary Color
Edit `tailwind.config.ts`:
```typescript
primary: {
  DEFAULT: '#FF5E0F',  // Change this
  glow: '#FF8A50',     // And this
  deep: '#CC4000',     // And this
}
```

### Change Hero Image
Edit `app/page.tsx` line 17:
```typescript
src="/images/YOUR_IMAGE.JPG"
```

### Change Logo
Edit `components/layout/Header.tsx` and `Footer.tsx` - replace SVG or add image.

### Add New Page
Create `app/newpage/page.tsx`:
```typescript
export default function NewPage() {
  return <div>Your content</div>
}
```

---

## Deploy to Production

### Option 1: Vercel (Recommended - Free)
1. Push code to GitHub
2. Connect to Vercel
3. Deploy (automatic)

### Option 2: Any Host
```bash
npm run build
```
Upload the `.next` folder and run:
```bash
npm run start
```

---

## Get Help

- **Next.js Docs:** https://nextjs.org/docs
- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Framer Motion Docs:** https://www.framer.com/motion/

---

## What's Next?

1. ✅ Home page is done
2. Review menu, about, and contact pages
3. Customize content
4. Add your own images
5. Deploy to production

**You're ready to go! Happy coding!**
