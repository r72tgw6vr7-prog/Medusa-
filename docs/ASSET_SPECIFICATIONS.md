# Medusa Tattoo München - Asset Specifications

Complete specifications for all images, media, and assets used in the Medusa Tattoo München website.

---

## 📸 TEAM PHOTOS (Artist Portraits)

### Requirements
**Format**: WebP (primary) + PNG (fallback)
**Dimensions**: 800×800px (1:1 square)
**File Size**: < 200KB per image
**Color Profile**: sRGB
**Quantity**: 8 artists

### Technical Specs
```
Resolution: 72 DPI (web optimized)
Color Space: sRGB IEC61966-2.1
Compression: WebP quality 85, PNG optimized
Naming: [artist-first-name].jpg (lowercase, no spaces)
```

### Photography Guidelines
- **Lighting**: Professional studio lighting, consistent across all photos
- **Background**: Neutral dark background (#222222 or similar)
- **Crop**: Head and shoulders, centered
- **Expression**: Confident, professional, welcoming
- **Styling**: Reflect artist's personality, tattoos visible
- **Consistency**: Same photographer, same setup for all 8 photos

### File Naming Convention
```
/public/images/team/
  ├── aaron.webp (primary)
  ├── aaron.png (fallback)
  ├── angie.webp
  ├── angie.png
  ├── debi.webp
  ├── debi.png
  ├── eli.webp
  ├── eli.png
  ├── loui.webp
  ├── loui.png
  ├── oli.webp
  ├── oli.png
  ├── sasha.webp
  ├── sasha.png
  ├── vive.webp
  └── vive.png
```

### Alt Text Template
```
"[Artist Name], [Specialty] tattoo artist at Medusa Tattoo München"

Examples:
- "Aaron, Traditional tattoo artist at Medusa Tattoo München"
- "Angie, Realism tattoo artist at Medusa Tattoo München"
```

---

## 🎨 GALLERY IMAGES (Client Work)

### Requirements
**Format**: WebP (primary) + JPEG (fallback)
**Dimensions**: 1200×1200px (1:1 square preferred)
**File Size**: < 300KB per image
**Color Profile**: sRGB
**Quantity**: 40-60 images minimum

### Technical Specs
```
Resolution: 72 DPI (web optimized)
Color Space: sRGB IEC61966-2.1
Compression: WebP quality 85, JPEG quality 90
Naming: [style]-[artist]-[number].jpg
```

### Responsive Variants (Optional but Recommended)
```
Thumbnail: 400×400px (< 50KB)
Medium: 800×800px (< 150KB)
Large: 1200×1200px (< 300KB)
2x Retina: 2400×2400px (< 500KB)
```

### File Naming Convention
```
/public/images/gallery/
  ├── traditional-aaron-001.webp
  ├── traditional-aaron-001.jpg
  ├── realism-angie-001.webp
  ├── realism-angie-001.jpg
  ├── geometric-eli-001.webp
  ├── geometric-eli-001.jpg
  └── ...
```

### Metadata Requirements
```json
{
  "filename": "traditional-aaron-001.webp",
  "artist": "aaron",
  "artistName": "Aaron",
  "style": "traditional",
  "styleName": "Traditional",
  "year": 2024,
  "description": "Traditional rose and dagger sleeve",
  "alt": "Traditional style tattoo featuring a rose and dagger by Aaron at Medusa Tattoo München",
  "tags": ["traditional", "rose", "dagger", "sleeve", "color"]
}
```

### Photography Guidelines
- **Quality**: Professional photography only
- **Focus**: Tattoo clearly visible, well-lit
- **Background**: Neutral or tattoo-focused (blur background)
- **Editing**: Color-corrected, no heavy filters
- **Privacy**: Client consent obtained, face anonymized if needed
- **Diversity**: Show range of styles, sizes, placements

### Categories to Cover
```
Traditional (10-15 images)
Neo-Traditional (8-12 images)
Realism (10-15 images)
Geometric (8-12 images)
Minimal/Linework (6-10 images)
Black & Grey (10-15 images)
Color (10-15 images)
```

---

## 🏆 HERO IMAGES (Page Headers)

### Homepage Hero
**Format**: WebP + JPEG
**Dimensions**: 1920×1080px (16:9)
**File Size**: < 400KB
**Color Profile**: sRGB

```
/public/images/hero/
  ├── home-hero.webp
  ├── home-hero.jpg
  ├── home-hero-mobile.webp (750×1334px for mobile)
  └── home-hero-mobile.jpg
```

### Services Hero
**Format**: WebP + JPEG
**Dimensions**: 1920×1080px
**File Size**: < 400KB

### Artists Hero
**Format**: WebP + JPEG
**Dimensions**: 1920×1080px
**File Size**: < 400KB

### Gallery Hero
**Format**: WebP + JPEG
**Dimensions**: 1920×1080px
**File Size**: < 400KB

### Alt Text Template
```
"Medusa Tattoo München studio interior with professional tattoo setup and luxury ambiance"
```

---

## 🖼️ STUDIO PHOTOS

### Team Photo (Full Team)
**Format**: WebP + JPEG
**Dimensions**: 1920×1200px (16:10)
**File Size**: < 500KB
**Location**: `/public/images/team/medusa-team-full.webp`

**Requirements**:
- Professional group photo
- All 8 artists present
- Studio environment
- Natural, confident poses
- Consistent lighting

### Studio Interior
**Format**: WebP + JPEG
**Dimensions**: 1920×1080px
**File Size**: < 400KB
**Quantity**: 4-6 photos

```
/public/images/studio/
  ├── studio-interior-001.webp
  ├── studio-interior-002.webp
  ├── studio-workspace-001.webp
  ├── studio-reception-001.webp
  └── ...
```

**Alt Text Examples**:
```
"Luxury tattoo workspace at Medusa Tattoo München with professional equipment"
"Reception area at Medusa Tattoo München studio in Munich"
```

---

## 🎭 LOGOS & BRANDING

### Primary Logo
**Format**: SVG (vector) + PNG (raster fallback)
**Variants**:
- Full logo (text + mark)
- Logo mark only (icon)
- Horizontal lockup
- Vertical lockup

```
/public/images/branding/
  ├── medusa-logo-full.svg
  ├── medusa-logo-mark.svg
  ├── medusa-logo-horizontal.svg
  ├── medusa-logo-vertical.svg
  ├── medusa-logo-full.png (2000×2000px)
  └── medusa-logo-mark.png (1000×1000px)
```

### Logo Color Variants
- Gold on dark: Primary (#D4AF37 on #222222)
- White on dark: Alternative (#FFFFFF on #222222)
- Dark on light: For print (#222222 on white)

### Logo Spacing
- Minimum clear space: 2× logo height on all sides
- Minimum size: 120px width (digital), 1 inch (print)

---

## 🔖 FAVICON & APP ICONS

### Requirements
**Format**: PNG (with transparency)
**Color Profile**: sRGB

### Sizes Needed
```
/public/
  ├── favicon.ico (16×16, 32×32, 48×48 multi-size)
  ├── favicon-16x16.png
  ├── favicon-32x32.png
  ├── apple-touch-icon.png (180×180)
  ├── android-chrome-192x192.png
  ├── android-chrome-512x512.png
  ├── mstile-150x150.png (Microsoft)
  └── safari-pinned-tab.svg (monochrome SVG)
```

### Design Guidelines
- Simple, recognizable mark (Medusa logo mark)
- Gold (#D4AF37) on dark background
- Sufficient contrast for small sizes
- Test at 16×16px for clarity

---

## 🎬 VIDEO ASSETS (Optional)

### Studio Tour Video
**Format**: MP4 (H.264)
**Dimensions**: 1920×1080px (1080p)
**Duration**: 60-90 seconds
**File Size**: < 10MB
**Location**: `/public/videos/studio-tour.mp4`

### Artist Process Videos
**Format**: MP4 (H.264)
**Dimensions**: 1080×1920px (9:16 vertical for mobile)
**Duration**: 15-30 seconds each
**File Size**: < 5MB each

---

## 📄 DOCUMENT ASSETS

### Aftercare PDF
**Format**: PDF
**Size**: A4 (210×297mm)
**File Size**: < 500KB
**Languages**: DE + EN

```
/public/documents/
  ├── medusa-aftercare-de.pdf
  └── medusa-aftercare-en.pdf
```

### Price List PDF (Optional)
**Format**: PDF
**Size**: A4
**File Size**: < 300KB

---

## 🎨 DESIGN ASSETS

### Texture Overlays (Optional)
**Format**: PNG with transparency
**Dimensions**: 2000×2000px (tileable)
**File Size**: < 100KB

```
/public/images/textures/
  ├── gold-grain.png
  ├── subtle-noise.png
  └── vignette-overlay.png
```

---

## 📊 OPTIMIZATION SCRIPT

### Automated Image Optimization

```javascript
// /scripts/optimize-images.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const directories = [
    './public/images/team',
    './public/images/gallery',
    './public/images/hero',
  ];

  for (const dir of directories) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      if (file.endsWith('.jpg') || file.endsWith('.png')) {
        const input = path.join(dir, file);
        const outputWebP = input.replace(/\.(jpg|png)$/, '.webp');
        
        // Convert to WebP
        await sharp(input)
          .webp({ quality: 85 })
          .toFile(outputWebP);
        
        console.log(`✓ Converted ${file} to WebP`);
        
        // Create responsive variants
        await createResponsiveVariants(input);
      }
    }
  }
}

async function createResponsiveVariants(input) {
  const sizes = [400, 800, 1200, 2400];
  
  for (const size of sizes) {
    const output = input.replace(/\.(jpg|png|webp)$/, `@${size}w.webp`);
    
    await sharp(input)
      .resize(size, size, { fit: 'cover' })
      .webp({ quality: 85 })
      .toFile(output);
  }
}

optimizeImages().then(() => {
  console.log('✓ All images optimized');
});
```

### Running the Script

```bash
# Install dependencies
npm install sharp

# Run optimization
node scripts/optimize-images.js
```

---

## ✅ ASSET DELIVERY CHECKLIST

### Before Handoff
- [ ] All team photos: 8 artists, 800×800px, WebP + PNG
- [ ] Gallery images: 40+ images, categorized by style
- [ ] Hero images: Homepage, Services, Artists, Gallery
- [ ] Team photo: Full team, professional quality
- [ ] Logos: SVG + PNG variants (light, dark, horizontal, vertical)
- [ ] Favicons: All sizes (16×16 to 512×512)
- [ ] Aftercare PDF: DE + EN versions
- [ ] All images optimized: < target file sizes
- [ ] All images have proper alt text
- [ ] Metadata JSON created for gallery images

### File Organization
```
/public/
  ├── images/
  │   ├── team/ (Team photos)
  │   ├── gallery/ (Client work)
  │   ├── hero/ (Page headers)
  │   ├── studio/ (Studio photos)
  │   └── branding/ (Logos)
  ├── videos/ (Optional)
  ├── documents/ (PDFs)
  ├── favicon.ico
  ├── apple-touch-icon.png
  └── android-chrome-*.png
```

---

## 📖 USAGE IN CODE

### Team Photos
```tsx
import aaronPhoto from '/images/team/aaron.webp';

<img 
  src={aaronPhoto}
  alt="Aaron, Traditional tattoo artist at Medusa Tattoo München"
  width={800}
  height={800}
  loading="lazy"
/>
```

### Gallery Images with Srcset
```tsx
<img
  src="/images/gallery/traditional-aaron-001.webp"
  srcset="
    /images/gallery/traditional-aaron-001@400w.webp 400w,
    /images/gallery/traditional-aaron-001@800w.webp 800w,
    /images/gallery/traditional-aaron-001@1200w.webp 1200w,
    /images/gallery/traditional-aaron-001@2400w.webp 2400w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="Traditional style rose and dagger tattoo by Aaron"
  loading="lazy"
/>
```

### Logo
```tsx
import medusaLogo from '/images/branding/medusa-logo-full.svg';

<img 
  src={medusaLogo} 
  alt="Medusa Tattoo München logo" 
  width={200} 
  height={50}
/>
```

---

## 🎯 PERFORMANCE TARGETS

- **Team Photos**: < 200KB each (8 photos = < 1.6MB total)
- **Gallery Page**: First 12 images < 3.6MB total
- **Hero Images**: < 400KB each
- **Logo**: SVG < 10KB
- **Total Page Weight**: < 5MB (including all assets)

### Lazy Loading Strategy
```tsx
// Above the fold (load immediately)
- Hero image
- Logo
- First 6 gallery images

// Below the fold (lazy load)
- Team photos
- Additional gallery images
- Studio photos
```

---

## 📞 ASSET DELIVERY CONTACTS

**Photography**: [Photographer Name/Studio]
**Graphic Design**: [Designer Name]
**Asset Manager**: [Name]
**Delivery Method**: Dropbox/Google Drive link
**Deadline**: [Date]

---

**Last Updated**: January 2025
**Version**: 1.0
**Status**: Awaiting Asset Delivery
