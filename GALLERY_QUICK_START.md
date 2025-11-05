# Gallery Enhancement v2.0 - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Add Your Images
```bash
# Create directory
mkdir -p public/gallery/originals

# Add images with descriptive names:
# tattoo-sleeve-color.jpg
# piercing-nose-gold.jpg
# portrait-custom-realism.jpg
```

### 2. Optimize
```bash
npm run optimize:gallery
```

### 3. Test
```bash
npm run dev
# Go to: http://localhost:5173/gallery
```

---

## ✅ What's New

### Category Filters (NEW)
Four buttons above the gallery:
- **Alle** (All - default)
- **Tattoo**
- **Piercing**
- **Portraits**

### Grid Layout (UPDATED)
- Mobile: **2 columns**, 16px gap
- Tablet: **3 columns**, 24px gap
- Desktop: **4 columns**, 24px gap

### Optimization (ENHANCED)
- Input: `public/gallery/originals/`
- Output: `public/gallery/optimized/`
- Generates: 400w, 800w, 1200w WebP variants
- Creates: `manifest.json` with metadata

---

## 📂 Directory Structure

```
public/gallery/
├── originals/                    ← YOUR IMAGES HERE
│   ├── tattoo-sleeve-1.jpg
│   ├── piercing-nose-gold.jpg
│   └── portrait-custom-1.jpg
├── optimized/                    ← AUTO-GENERATED
│   ├── tattoo-sleeve-1@400w.webp
│   ├── tattoo-sleeve-1@800w.webp
│   └── tattoo-sleeve-1@1200w.webp
└── manifest.json                 ← AUTO-GENERATED
```

---

## 🎨 Design Tokens Used

### Grid Spacing
```css
gap-4      /* 16px - mobile */
gap-6      /* 24px - tablet/desktop */
```

### Filter Buttons
```css
Active:   bg-brand-gold shadow-gold-glow
Inactive: bg-white/10 hover:bg-white/20
```

### Grid Columns
```css
grid-cols-2           /* Mobile */
md:grid-cols-3        /* Tablet */
lg:grid-cols-4        /* Desktop */
```

---

## 🧪 Quick Test Checklist

### Filters
- [ ] Click "Tattoo" → shows only tattoos
- [ ] Click "Piercing" → shows only piercings
- [ ] Click "Portraits" → shows only portraits
- [ ] Active button has gold background

### Grid
- [ ] Mobile: 2 columns with 16px gaps
- [ ] Tablet: 3 columns with 24px gaps
- [ ] Desktop: 4 columns with 24px gaps
- [ ] All rows have equal height

### Images
- [ ] Lazy loading works (check Network tab)
- [ ] WebP format loads
- [ ] Hover shows gold glow
- [ ] Error fallback works

### Before/After Slider
- [ ] Still appears at top
- [ ] Draggable with mouse/touch
- [ ] Keyboard arrows work

---

## 📋 Commands

```bash
# Optimize images
npm run optimize:gallery

# Dev server
npm run dev

# Build (with optimization)
npm run build:local

# Build (without optimization)
npm run build
```

---

## 🐛 Common Issues

**No images showing?**
```bash
# 1. Check originals directory
ls public/gallery/originals/

# 2. Run optimization
npm run optimize:gallery

# 3. Check optimized directory
ls public/gallery/optimized/

# 4. Verify manifest exists
cat public/gallery/manifest.json
```

**Filters not working?**
- Check filenames include keywords: `tattoo-`, `piercing-`, `portrait-`
- Clear browser cache: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Check console for errors

**Grid layout broken?**
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart dev server
npm run dev
```

---

## 📱 Responsive Testing

### Test URLs
```
Mobile:  http://localhost:5173/gallery?viewportWidth=375
Tablet:  http://localhost:5173/gallery?viewportWidth=768
Desktop: http://localhost:5173/gallery?viewportWidth=1280
```

### Chrome DevTools
1. Open DevTools (F12)
2. Click device toolbar icon (Cmd+Shift+M)
3. Select device:
   - iPhone SE (375px)
   - iPad (768px)
   - Desktop (1280px)

---

## ✨ Files Modified

1. ✅ `src/pages/GalleryPage.tsx` - Added filters + 4-col grid
2. ✅ `scripts/optimize-gallery.mjs` - Enhanced with manifest v2
3. ✅ `src/utils/galleryManifestLoader.ts` - NEW utility
4. ✅ `src/utils/galleryUtils.ts` - Added 'portraits' category
5. ✅ `package.json` - Updated scripts

---

## 🎯 Performance Targets

| Metric | Target | How to Check |
|--------|--------|--------------|
| Image size | <500 KB | Check optimized/ folder |
| LCP | <2.5s | Lighthouse audit |
| Total page weight | <5 MB | Network tab |
| Lighthouse Score | 90+ | DevTools → Lighthouse |

---

## 📖 Full Documentation

See **GALLERY_V2_COMPLETE.md** for:
- Complete implementation details
- Manifest.json structure
- Category auto-detection logic
- Migration guide
- Troubleshooting

---

**Status**: ✅ READY TO TEST  
**Version**: 2.0.0  
**Last Updated**: November 4, 2025
