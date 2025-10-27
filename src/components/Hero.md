# Hero Component

A full-viewport hero section for the Medusa Tattoo Salon website.

## Features

- Full viewport height section
- Responsive design for mobile, tablet, and desktop
- Dark gradient overlay on background image
- Trust badges with responsive display
- CTA buttons with hover effects
- Trust indicators at the bottom

## Usage

```jsx
import { Hero } from './components';

function HomePage() {
  return (
    <div>
      <Hero />
      {/* Other components */}
    </div>
  );
}
```

## Design Specifications

### Layout Structure
- Full viewport height section (min-h-screen)
- Background: Medusa artwork with dark overlay
- Content: Centered vertically and horizontally
- Max-width: 1433px container

### Responsive Behavior
- Mobile (< 768px): Stack everything vertically, 4 badges
- Tablet (768px - 1200px): 2-column CTA buttons, 6 badges
- Desktop (> 1200px): Full layout, 8 badges

### Design Tokens Used
- Colors: brand-gold, brand-background, white
- Spacing: Following 8px grid system
- Typography: font-serif for headline, standard fonts for body text

## Assets
- Background image: `/images/Medusa_tattoo_artwork.jpg`
- Trust badge icons: `/images/hero-icons/Container*.svg`
