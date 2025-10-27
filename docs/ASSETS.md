# Medusa Asset Inventory

## Footer Icons
| Filename | Purpose | Dimensions | Usage |
|----------|---------|------------|--------|
| address.svg | Location pin | 24×24 | Studio address |
| hours.svg | Clock icon | 24×24 | Opening hours |
| phone.svg | Phone icon | 24×24 | Contact number |
| email.svg | Email icon | 24×24 | Contact email |
| link.svg | External link | 16×16 | External URLs |
| rating.svg | Star icon | 24×24 | Google rating |
| instagram.svg | Instagram logo | 24×24 | Social link |
| facebook.svg | Facebook logo | 24×24 | Social link |
| google.svg | Google logo | 24×24 | Reviews link |

## Hero Section
| Filename | Purpose | Format | Dimensions |
|----------|---------|--------|------------|
| artwork.webp | Hero background | WebP | 1600×1200 |
| artwork@2x.webp | Retina version | WebP | 3200×2400 |

### Hero Icons
| Filename | Purpose | Dimensions | Usage |
|----------|---------|------------|--------|
| icon-1.svg | Service icon | 48×48 | Tattoo art |
| icon-2.svg | Service icon | 48×48 | Piercing |
| icon-3.svg | Service icon | 48×48 | Custom design |
| icon-4.svg | Service icon | 48×48 | Touch-up |
| icon-5.svg | Service icon | 48×48 | Consultation |
| icon-6.svg | Service icon | 48×48 | Aftercare |
| icon-7.svg | Service icon | 48×48 | Experience |
| icon-8.svg | Service icon | 48×48 | Awards |

## PWA Icons
| Filename | Purpose | Format | Dimensions |
|----------|---------|--------|------------|
| favicon.ico | Browser icon | ICO | 32×32, 16×16 |
| icon-144x144.png | MS Tile | PNG | 144×144 |
| icon-192x192.png | Apple Touch | PNG | 192×192 |

## Usage Guidelines

### 1. Import Pattern
```tsx
// For SVG icons
import Icon from '@/public/icons/footer/phone.svg';
<img src={Icon} alt="Phone" width={24} height={24} />

// For responsive images
<picture>
  <source
    srcSet="/images/hero/artwork@2x.webp 2x, /images/hero/artwork.webp 1x"
    type="image/webp"
  />
  <img
    src="/images/hero/artwork.png"
    alt="Medusa Tattoo Artwork"
    width={1600}
    height={1200}
    loading="eager"
    priority
  />
</picture>
```

### 2. Optimization Guidelines
- SVGs: Optimize with SVGO
- Images: Convert to WebP with quality 85
- Icons: Keep under 5KB each
- Responsive images: Provide @2x versions
- Lazy load all images except hero

### 3. Accessibility Requirements
- All icons must have aria-label or alt text
- Decorative icons use aria-hidden="true"
- Interactive icons need role="button"
- Minimum touch target: 44×44px
- Color contrast: 4.5:1 (WCAG AA)

### 4. File Organization
```
/public/
  /icons/
    /footer/      # Footer icons
    /hero/        # Hero section icons
  /images/
    /hero/        # Hero images and @2x versions
    /artists/     # Artist photos
    /gallery/     # Portfolio images
```

### 5. Naming Convention
- Use kebab-case for filenames
- Prefix with component name
- Append @2x for retina
- Use semantic names (e.g., phone.svg not icon-3.svg)
