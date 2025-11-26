# Pre-Launch Update Checklist

Use this checklist to update all placeholder content before deploying to production.

## 🚨 CRITICAL - Must Fix

### [ ] 1. Add Noise Texture
**File:** `/public/noise.png`
**Current:** Empty file (0 bytes)
**Action:**
1. Visit https://www.noisetexturegenerator.com/
2. Generate a grayscale noise texture (512x512 recommended)
3. Save as `noise.png`
4. Replace the empty file in `/public/noise.png`

---

## ⚠️ HIGH PRIORITY - Update Before Launch

### [ ] 2. Albany Location - Address
**Files to update:**
- `/app/page.tsx` - Line 56
- `/app/about/page.tsx` - Line 204
- `/app/contact/page.tsx` - Line 318
- `/app/locations/page.tsx` - Line 53

**Current:** `123 Burger Lane, Albany, OR 97321`
**Replace with:** `_______________________________`

### [ ] 3. Albany Location - Phone
**Files to update:**
- `/app/contact/page.tsx` - Line 320
- `/app/locations/page.tsx` - Lines 67-72

**Current:** `(541) 555-0123`
**Replace with:** `_______________________________`

### [ ] 4. Albany Location - Google Maps Link
**Files to update:**
- `/app/about/page.tsx` - Line 212 (href attribute)
- `/app/contact/page.tsx` - Line 79 (conditional in LocationCard)
- `/app/locations/page.tsx` - Line 76 (href attribute)

**Current:** `https://maps.google.com/?q=123+Burger+Lane+Albany+OR+97321`
**Replace with:** `_______________________________`

---

### [ ] 5. Salem Location - Address
**Files to update:**
- `/app/page.tsx` - Line 57
- `/app/about/page.tsx` - Line 226
- `/app/contact/page.tsx` - Line 324
- `/app/locations/page.tsx` - Line 105

**Current:** `456 Patty Place, Salem, OR 97301`
**Replace with:** `_______________________________`

### [ ] 6. Salem Location - Phone
**Files to update:**
- `/app/contact/page.tsx` - Line 326
- `/app/locations/page.tsx` - Lines 119-124

**Current:** `(503) 555-0456`
**Replace with:** `_______________________________`

### [ ] 7. Salem Location - Google Maps Link
**Files to update:**
- `/app/about/page.tsx` - Line 234 (href attribute)
- `/app/contact/page.tsx` - Line 79 (conditional in LocationCard)
- `/app/locations/page.tsx` - Line 128 (href attribute)

**Current:** `https://maps.google.com/?q=456+Patty+Place+Salem+OR+97301`
**Replace with:** `_______________________________`

---

### [ ] 8. Business Email
**File to update:**
- `/app/contact/page.tsx` - Line 361

**Current:** `info@smashburgers.com`
**Replace with:** `_______________________________`
**Action:** Ensure this email account exists and is monitored

---

### [ ] 9. Social Media Links
**File to update:** `/components/layout/Footer.tsx`

#### Instagram Link
- **Line:** 60
- **Current:** `https://instagram.com`
- **Replace with:** `_______________________________`

#### Facebook Link
- **Line:** 82
- **Current:** `https://facebook.com`
- **Replace with:** `_______________________________`

#### Twitter/X Link
- **Line:** 102
- **Current:** `https://twitter.com`
- **Replace with:** `_______________________________`

**Alternative:** If you don't have social media, you can remove these links entirely

---

## ✅ VERIFY - Double Check These

### [ ] 10. Operating Hours
**Current:** Tuesday - Sunday: 11:00 AM - 8:00 PM (Closed Mondays)

**Files to check:**
- `/app/page.tsx` - Lines 74-75
- `/app/about/page.tsx` - Lines 208, 230
- `/app/contact/page.tsx` - Lines 319, 325
- `/app/locations/page.tsx` - Lines 58-61, 110-113

**Are these hours correct?** [ ] Yes [ ] No

**If different, update to:**
- Albany: `_______________________________`
- Salem: `_______________________________`

---

### [ ] 11. Menu Items & Prices
**File to check:** `/data/menu-items.json`

**Action:** Review all:
- [ ] Item names
- [ ] Descriptions
- [ ] Prices
- [ ] Image paths
- [ ] Availability

---

### [ ] 12. Copyright Year
**File:** `/components/layout/Footer.tsx` - Line 115
**File:** `/app/menu/page.tsx` - Line 119

**Current:** `© 2024 Smash Burgers. All Rights Reserved.`
**Action:** Update year if needed (currently 2024, may need to be 2025)

---

## 🔧 TECHNICAL CHECKS

### [ ] 13. Build Test
```bash
npm run build
```
**Result:** [ ] Success [ ] Failed

### [ ] 14. Local Preview
```bash
npm run start
# Visit http://localhost:3000
```
**Action:** Test all pages thoroughly

### [ ] 15. Mobile Responsiveness
Test on:
- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] Tablet
- [ ] Desktop (1920px+)

---

## 📝 FINAL STEPS

### [ ] 16. Create Git Repository
```bash
git init
git add .
git commit -m "Initial commit - production ready"
```

### [ ] 17. Push to GitHub
```bash
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### [ ] 18. Deploy
- [ ] Connected to Vercel/Netlify
- [ ] Deployment successful
- [ ] Production URL working

### [ ] 19. Post-Deployment Test
- [ ] All pages load
- [ ] All images load
- [ ] All links work
- [ ] Contact form works (if backend configured)
- [ ] Mobile responsive
- [ ] No console errors

### [ ] 20. SEO Setup
- [ ] Submit sitemap to Google Search Console
- [ ] Add analytics (optional)
- [ ] Configure custom domain (if applicable)

---

## Quick Find & Replace Commands

If you have the actual information, you can use these commands to update all files at once:

### Update Albany Address:
```bash
# Replace in all files
find app -type f -name "*.tsx" -exec sed -i '' 's/123 Burger Lane, Albany, OR 97321/YOUR_ACTUAL_ADDRESS/g' {} +
```

### Update Salem Address:
```bash
find app -type f -name "*.tsx" -exec sed -i '' 's/456 Patty Place, Salem, OR 97301/YOUR_ACTUAL_ADDRESS/g' {} +
```

### Update Albany Phone:
```bash
find app -type f -name "*.tsx" -exec sed -i '' 's/(541) 555-0123/YOUR_ACTUAL_PHONE/g' {} +
```

### Update Salem Phone:
```bash
find app -type f -name "*.tsx" -exec sed -i '' 's/(503) 555-0456/YOUR_ACTUAL_PHONE/g' {} +
```

**Note:** Test these commands carefully or use a code editor's "Find and Replace in Files" feature instead.

---

## Need Help?

If you're not comfortable editing code:
1. Share this checklist with your developer
2. Provide them with all the actual information
3. They can update everything in about 30 minutes

---

**Estimated Time to Complete:** 1-2 hours
**Last Updated:** November 25, 2025
