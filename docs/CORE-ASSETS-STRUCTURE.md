# Core Assets Structure Documentation

This document outlines the organization of core website assets that are essential for the website's structure and functionality.

## Directory Structure

```
website-core-assets/
├── branding/
│   ├── logos/        # Main brand logos
│   └── partners/     # Partner company logos (SVG format)
├── ui/
│   ├── icons/
│   │   ├── app/     # Favicons and app icons (16x16 to 192x192)
│   │   ├── footer/  # Footer section icons
│   │   └── hero/    # Hero section icons
│   └── elements/    # Generic UI elements (placeholders, containers)
├── layouts/
│   ├── cards/       # Service card backgrounds
│   ├── sections/    # Section-specific layouts
│   ├── forms/       # Form-related layouts
│   └── studio-carousel/ # Studio showcase carousel images
└── backgrounds/
    ├── hero/        # Hero section backgrounds
    └── sections/    # Section background textures

## Asset Categories

### 1. Branding Assets
- Partner logos (SVG format)
  - bounce-logo.svg
  - bqla-logo.svg
  - iamrobot-logo.svg
  - nannybag-logo.svg
  - partner3-logo.svg
  - tum-logo.svg

### 2. UI Elements
#### Icons
- App Icons
  - Favicons (16x16, 32x32)
  - App icons (144x144, 192x192)
- Footer Icons (12 SVG files)
- Hero Icons (7 SVG files)
- Service Badge Icons
  - Piercing badge (multiple resolutions)
  - Tattoo badge (multiple resolutions)
  
#### Generic Elements
- Placeholder images
- Container templates
- Studio interior placeholders

### 3. Layout Assets
#### Cards
- Piercing card backgrounds
- Tattoo card backgrounds
- Multiple responsive sizes (400w, 800w, 1200w)

#### Studio Carousel
- 12 high-quality studio images
- Multiple resolutions per image (400w to 2400w)

#### Sections
- Studio interior images
- Process timeline backgrounds
- Various responsive sizes

### 4. Background Assets
#### Hero Section
- Medusa tattoo artwork
- General artwork (with 2x variant)

#### Section Backgrounds
- Contact form background textures
- Multiple resolutions (400w to 2400w)

## Image Format Standards
- SVG: Used for logos, icons, and vector graphics
- WebP: Primary format for photographs and complex images
- PNG: Used for icons and images requiring transparency
- JPG: Fallback format for older browsers

## Responsive Image Sets
Most photographic assets include multiple resolutions:
- 400w: Mobile devices
- 800w: Tablet devices
- 1200w: Desktop displays
- 2400w: High-resolution displays

## Usage Guidelines
1. Always use the appropriate resolution for the target device
2. Prefer WebP format with JPG fallback for photos
3. Use SVG for all icons and logos where possible
4. Maintain the directory structure when adding new assets