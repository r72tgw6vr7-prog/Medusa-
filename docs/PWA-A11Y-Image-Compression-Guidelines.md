# PWA & A11Y FINAL SWEEP - IMAGE COMPRESSION GUIDELINES

## 🎯 IMAGE COMPRESSION REQUIREMENTS

### **COMPRESSION TARGETS**
- **Desktop**: ≤200 KB per image
- **Tablet**: ≤120 KB per image  
- **Mobile**: ≤100 KB per image

### **RESPONSIVE IMAGE DELIVERY**
```html
<!-- Example responsive image implementation -->
<picture>
  <source media="(min-width: 1024px)" srcset="hero-desktop.webp" />
  <source media="(min-width: 768px)" srcset="hero-tablet.webp" />
  <source media="(max-width: 767px)" srcset="hero-mobile.webp" />
  <img src="hero-fallback.jpg" alt="Medusa Tattoo Studio interior" loading="lazy" />
</picture>
```

## 📷 IMAGES REQUIRING COMPRESSION

### **HERO IMAGES**
- `/public/images/hero/hero-desktop.jpg` → Target: 180 KB
- `/public/images/hero/hero-tablet.jpg` → Target: 110 KB
- `/public/images/hero/hero-mobile.jpg` → Target: 90 KB

### **GALLERY IMAGES**
- All gallery thumbnails → Target: 80 KB mobile, 120 KB desktop
- Gallery lightbox images → Target: 150 KB mobile, 200 KB desktop

### **ARTIST PORTRAITS**
- `/public/images/team/AAron.jpg` → Target: 60 KB mobile, 100 KB desktop
- `/public/images/team/ANGIE.jpg` → Target: 60 KB mobile, 100 KB desktop
- `/public/images/team/Debi.jpg` → Target: 60 KB mobile, 100 KB desktop
- `/public/images/team/Eli-luquez.jpg` → Target: 60 KB mobile, 100 KB desktop
- `/public/images/team/Loui.jpg` → Target: 60 KB mobile, 100 KB desktop
- `/public/images/team/Oli.jpg` → Target: 60 KB mobile, 100 KB desktop
- `/public/images/team/Sasha.jpg` → Target: 60 KB mobile, 100 KB desktop
- `/public/images/team/Vive.jpg` → Target: 60 KB mobile, 100 KB desktop

### **SERVICE IMAGES**
- Service showcase images → Target: 70 KB mobile, 120 KB desktop
- Before/after comparison images → Target: 80 KB mobile, 150 KB desktop

## 🔧 COMPRESSION WORKFLOW

### **BATCH EXPORT PLUGIN SETTINGS**
```javascript
// Figma batch export settings
{
  format: "WebP",
  quality: 85,
  progressive: true,
  sizes: [
    { suffix: "-mobile", width: 375, quality: 80 },
    { suffix: "-tablet", width: 768, quality: 85 },
    { suffix: "-desktop", width: 1440, quality: 90 }
  ]
}
```

### **OPTIMIZATION TOOLS**
1. **Primary**: Figma Batch Export Plugin
2. **Secondary**: ImageOptim (macOS) / TinyPNG (web)
3. **Fallback**: Sharp CLI for batch processing

```bash
# Sharp CLI batch optimization
sharp input/*.jpg -o output/ --webp --quality 85 --progressive
```

## 📱 RESPONSIVE BREAKPOINTS

### **IMAGE BREAKPOINTS**
- **Mobile**: 320px - 767px (100 KB max)
- **Tablet**: 768px - 1023px (120 KB max)
- **Desktop**: 1024px+ (200 KB max)

### **LOADING STRATEGY**
```javascript
// Lazy loading with Intersection Observer
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});
```

## 🎨 IMAGE FORMATS

### **FORMAT PRIORITY**
1. **WebP** (primary) - Best compression, wide support
2. **AVIF** (future) - Next-gen format for compatible browsers
3. **JPEG** (fallback) - Universal compatibility

### **FORMAT SELECTION LOGIC**
```javascript
// Progressive enhancement approach
function getImageFormat() {
  if (supportsWebP()) return 'webp';
  if (supportsAVIF()) return 'avif';
  return 'jpg';
}
```

## 📊 COMPRESSION VALIDATION

### **FILE SIZE AUDIT**
```bash
# Check file sizes
find ./public/images -name "*.webp" -exec ls -lh {} \; | awk '{print $5, $9}'
```

### **QUALITY VALIDATION CHECKLIST**
- [ ] No visible artifacts at 100% zoom
- [ ] Crisp text and sharp edges maintained
- [ ] Color accuracy preserved
- [ ] Professional presentation standard met

## 🚀 PERFORMANCE TARGETS

### **LIGHTHOUSE METRICS**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **IMAGE LOADING METRICS**
- Hero image load: < 1.5s on 3G
- Gallery thumbnails: < 0.8s on 3G
- Artist portraits: < 0.6s on 3G

## 🔍 QUALITY ASSURANCE

### **TESTING MATRIX**
| Device | Connection | Hero Load | Gallery Load | Artist Load |
|--------|------------|-----------|--------------|-------------|
| iPhone 12 | 3G | < 1.5s | < 0.8s | < 0.6s |
| iPad Pro | WiFi | < 0.8s | < 0.4s | < 0.3s |
| Desktop | Fiber | < 0.5s | < 0.2s | < 0.2s |

### **VISUAL QUALITY STANDARDS**
- **Sharpness**: Text readable at native resolution
- **Color**: Accurate brand colors maintained
- **Contrast**: WCAG AA compliance preserved
- **Details**: Fine tattoo details visible

## 💾 BACKUP & ROLLBACK

### **RAW IMAGE STORAGE**
```
/assets/raw/
├── hero/
├── gallery/
├── team/
└── services/
```

### **VERSION CONTROL**
- Original files: `image-name-original.jpg`
- Compressed files: `image-name-compressed.webp`
- Backup date: `YYYY-MM-DD-backup`

## 🛠️ IMPLEMENTATION STATUS

### **COMPLETED** ✅
- [x] PWA manifest configuration
- [x] Theme color meta tags (#222222)
- [x] ARIA labels for booking buttons
- [x] ARIA labels for contact form
- [x] Responsive image structure

### **PENDING** ⏳
- [ ] Batch export plugin execution
- [ ] Image compression validation
- [ ] Performance testing
- [ ] Lighthouse audit completion

## 📋 FINAL VALIDATION

### **LIGHTHOUSE PWA CHECKLIST**
- [ ] Installable PWA
- [ ] Service worker registered
- [ ] Manifest includes maskable icon
- [ ] Theme color matches brand (#222222)
- [ ] All images under size limits
- [ ] WCAG AA compliance maintained

### **STARK A11Y VALIDATION**
- [ ] Zero AA failures reported
- [ ] Focus rings 2px minimum
- [ ] Contrast ratios validated
- [ ] Touch targets 44px minimum
- [ ] ARIA labels comprehensive

## 🚀 DEPLOYMENT NOTES

### **CDN OPTIMIZATION**
- Enable Brotli compression
- Set proper cache headers
- Use progressive JPEG fallbacks
- Implement WebP serving logic

### **MONITORING**
- Real User Monitoring (RUM) for image load times
- Lighthouse CI integration
- Automated accessibility testing
- Performance budget alerts

---

**CRITICAL**: All images must pass both compression targets AND visual quality standards before production deployment.