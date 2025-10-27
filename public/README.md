# Medusa Tattoo München Assets

## Directory Structure
```
/public/
  /icons/
    favicon.ico          # Website favicon (32x32, 16x16)
    icon-144x144.png    # PWA icon for Microsoft Tile
    icon-192x192.png    # PWA icon for Apple Touch

  /images/
    /footer/
      address.svg       # Location icon (was: Icon.svg)
      hours.svg        # Clock icon (was: Icon_2.svg)
      phone.svg        # Phone icon (was: Icon_3.svg)
      email.svg        # Email icon (was: Icon_4.svg)
      link.svg         # External link icon (was: Icon_5.svg)
      rating.svg       # Star rating icon (was: Icon_6.svg)
      instagram.svg    # Instagram icon (was: Icon_10.svg)
      facebook.svg     # Facebook icon (was: Icon_11.svg)
      google.svg       # Google Reviews icon (was: Icon_12.svg)

    /hero/
      artwork.webp     # Main hero artwork (was: Medusa_tattoo_artwork.png)
      artwork@2x.webp  # Retina version of hero artwork
      /icons/
        icon-1.svg     # Hero section icon 1 (was: Container_1.svg)
        icon-2.svg     # Hero section icon 2 (was: Container_2.svg)
        icon-3.svg     # Hero section icon 3 (was: Container_3.svg)
        icon-4.svg     # Hero section icon 4 (was: Container_4.svg)
        icon-5.svg     # Hero section icon 5 (was: Container_5.svg)
        icon-6.svg     # Hero section icon 6 (was: Container_6.svg)
        icon-7.svg     # Hero section icon 7 (was: Container_7.svg)
        icon-8.svg     # Hero section icon 8 (was: Container_8.svg)
```

## Icon Specifications
- Footer icons: 20x20px SVG, #D4AF37 (brand gold)
- Hero icons: 24x24px SVG, #D4AF37 (brand gold)
- PWA icons: PNG with transparent background, #D4AF37 on #222222

## Image Specifications
- Hero artwork: WebP format
  - Standard: 800x600px
  - Retina (@2x): 1600x1200px
  - Quality: 85%
  - Format: WebP with fallback PNG

## Optimization
All assets are optimized using:
- SVGs: SVGO with custom config
- PNGs: ImageOptim
- WebP: cwebp with quality 85

## Usage Guidelines
1. Always use SVG for icons where possible
2. Include @2x versions for raster images
3. Provide WebP with PNG fallback for photos
4. Use semantic names (e.g., 'email.svg' not 'icon_4.svg')
5. Maintain consistent dimensions within each category
