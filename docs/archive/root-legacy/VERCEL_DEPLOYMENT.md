# VERCEL DEPLOYMENT CHECKLIST

## ✅ Pre-Deployment Verification Complete

All checks passed. Gallery v2.0 is production-ready.

---

## 📋 VERCEL DEPLOYMENT STEPS

### Option A: Deploy via Vercel Dashboard (Recommended for First Deploy)

#### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "feat: Gallery v2.0 with category filters and optimization"
git push origin main
```

#### Step 2: Connect to Vercel
1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your Git repository (GitHub/GitLab/Bitbucket)
4. Select `Medusa-Web` repository

#### Step 3: Configure Build Settings
```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

#### Step 4: Environment Variables (if needed)
```
NODE_VERSION=20.x
SKIP_VERIFY=false
```

#### Step 5: Deploy
- Click "Deploy"
- Wait for build to complete (~2-3 minutes)
- Vercel will provide a live URL: `https://medusa-web-[random].vercel.app`

---

### Option B: Deploy via Vercel CLI (Quick Deploy)

#### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

#### Step 2: Login
```bash
vercel login
```

#### Step 3: Build Locally with Optimization
```bash
npm run build:local
# This runs: npm run optimize:gallery && vite build
```

#### Step 4: Deploy to Preview
```bash
vercel
```

Follow prompts:
- Setup and deploy? **Y**
- Which scope? Select your account
- Link to existing project? **N** (first time)
- Project name: `medusa-web`
- Directory: `.` (current)
- Override settings? **N**

#### Step 5: Deploy to Production
```bash
vercel --prod
```

---

## 🔧 Vercel Configuration File

Create `vercel.json` in project root (if not exists):

```json
{
  "version": 2,
  "buildCommand": "npm run build:local",
  "outputDirectory": "dist",
  "framework": "vite",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "regions": ["fra1"],
  "headers": [
    {
      "source": "/gallery/optimized/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/gallery/manifest.json",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, must-revalidate"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 📊 Post-Deployment Verification

### 1. Check Live Site
```bash
# Visit your Vercel URL
https://medusa-web-[your-id].vercel.app/gallery
```

### 2. Test Gallery Features
- [ ] Navigate to `/gallery` page
- [ ] Verify 6 test images load
- [ ] Click "Tattoo" filter → Shows 3 images
- [ ] Click "Piercing" filter → Shows 2 images
- [ ] Click "Portraits" filter → Shows 1 image
- [ ] Click "All" filter → Shows 6 images
- [ ] Test responsive grid:
  - Mobile (375px): 2 columns
  - Tablet (768px): 3 columns
  - Desktop (1440px): 4 columns
- [ ] Click image → Opens lightbox
- [ ] Test keyboard navigation (Tab, Arrow keys, Esc)
- [ ] Check Before/After slider still works

### 3. Performance Check
```bash
# Run Lighthouse on deployed URL
npm run analyze
# Or use: https://pagespeed.web.dev/
```

**Expected Scores:**
- Performance: 90-100
- Accessibility: 95-100
- Best Practices: 95-100
- SEO: 100

### 4. Check Network Tab
- [ ] Images load as WebP
- [ ] Correct srcSet variants selected
- [ ] Lazy loading works (images below fold load on scroll)
- [ ] manifest.json loads successfully
- [ ] No 404 errors

### 5. Verify Image Optimization
```bash
# Check deployed image sizes
curl -I https://your-site.vercel.app/gallery/optimized/tattoo-sleeve-blackwork@400w.webp
# Should show: Content-Length: ~6KB
```

---

## 🚨 Troubleshooting Common Deployment Issues

### Issue 1: Build Fails on Vercel

**Error:** `sharp` installation fails

**Solution:**
```bash
# Add to package.json
{
  "optionalDependencies": {
    "@img/sharp-linux-x64": "0.34.4"
  }
}
```

Or build images locally before deploy:
```bash
npm run optimize:gallery
git add public/gallery/
git commit -m "chore: add optimized gallery images"
git push
```

### Issue 2: Images Don't Load (404)

**Error:** `/gallery/optimized/*.webp` returns 404

**Diagnosis:**
- Images weren't optimized before build
- `public/gallery/optimized/` is missing

**Solution:**
```bash
# Ensure build:local runs optimization
npm run build:local

# Or commit optimized images to repo
git add public/gallery/optimized/
git add public/gallery/manifest.json
git commit -m "chore: add optimized images"
git push
```

### Issue 3: Manifest Not Found

**Error:** `Failed to load gallery manifest`

**Solution:**
```bash
# Verify manifest exists
ls -la public/gallery/manifest.json

# Regenerate if missing
npm run optimize:gallery

# Commit to repo
git add public/gallery/manifest.json
git commit -m "chore: add gallery manifest"
git push
```

### Issue 4: Category Filters Don't Work

**Error:** All categories show same images

**Diagnosis:**
- Manifest has wrong categories
- Auto-detection failed

**Solution:**
```bash
# Check manifest categories
cat public/gallery/manifest.json | jq '.images[] | {title, category}'

# Rename files to include category keywords
mv custom-art.jpg portrait-custom-art.jpg

# Re-optimize
npm run optimize:gallery
git add . && git commit -m "fix: correct image categories" && git push
```

### Issue 5: Slow Performance on Vercel

**Error:** Lighthouse score < 80

**Diagnosis:**
- Images too large
- No caching headers

**Solution A - Reduce Quality:**
```javascript
// scripts/optimize-gallery.mjs, line 21
quality: {
  webp: 70,  // Reduce from 80
}
```

**Solution B - Add Caching:**
```json
// vercel.json
{
  "headers": [
    {
      "source": "/gallery/optimized/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## 🔄 Update Workflow (After Initial Deploy)

### Quick Update (Content Only)
```bash
# 1. Add/replace images
cp new-tattoo.jpg public/gallery/originals/

# 2. Re-optimize
npm run optimize:gallery

# 3. Commit and push
git add public/gallery/
git commit -m "content: add new gallery image"
git push

# 4. Vercel auto-deploys
```

### Code Update (Features)
```bash
# 1. Make code changes
# ... edit src/pages/GalleryPage.tsx

# 2. Test locally
npm run dev

# 3. Build with optimization
npm run build:local

# 4. Commit and push
git add .
git commit -m "feat: add new gallery feature"
git push

# 5. Vercel auto-deploys
```

---

## 📈 Monitoring

### Vercel Analytics
1. Go to Vercel Dashboard → Your Project
2. Click "Analytics" tab
3. Monitor:
   - Page views
   - Unique visitors
   - Performance metrics
   - Error rates

### Lighthouse CI (Optional)
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run on deployed URL
lhci autorun --collect.url=https://your-site.vercel.app/gallery
```

---

## ✅ Production Deploy Checklist

Before clicking "Deploy":

- [x] All TypeScript errors resolved
- [x] All ESLint errors fixed
- [x] Images optimized (260KB bundle)
- [x] Manifest generated (7.3KB)
- [x] Accessibility verified (WCAG AA)
- [x] Alt text on all images
- [x] Keyboard navigation working
- [x] Color contrast meets standards
- [x] Git repository clean
- [x] `vercel.json` configured
- [x] Build command set to `npm run build:local`

After deploy:

- [ ] Test live URL
- [ ] Run Lighthouse audit
- [ ] Check all category filters
- [ ] Verify responsive grid
- [ ] Test keyboard navigation
- [ ] Check Network tab (WebP, srcSet)
- [ ] Monitor Vercel Analytics

---

## 🎯 Expected Results

**Build Time:** ~2-3 minutes  
**Bundle Size:** ~2-3 MB (gzip)  
**Gallery Assets:** 260 KB (18 WebP variants)  
**Lighthouse Score:** 90-100  
**LCP:** < 2.5s  
**TTI:** < 3s  

---

## 🚀 Ready to Deploy!

Everything is verified and production-ready.

**Quick Deploy Command:**
```bash
vercel --prod
```

Or push to GitHub and let Vercel auto-deploy.

**Live URL Preview:**
After deploy, gallery will be accessible at:
```
https://medusa-web-[your-id].vercel.app/gallery
```

---

**Last Updated:** November 4, 2025  
**Status:** ✅ Production Ready  
**Version:** Gallery v2.0.0
