# CSS Conflicts and Issues

## Missing Imports
1. **ArtistCard.css** - File exists but not imported in ArtistCard.tsx
2. **BookingModalMobile.css** - File exists but not imported in BookingModalMobile.tsx

## Duplicate Styling
1. **ServiceCards.css + ServiceCards.module.css** - Both exist and contain overlapping styles

## Consolidated Files with Missing Styles
1. **design-system.css** - Missing critical variables from old system.css
2. **grid system** - Container queries not properly migrated

## Required CSS Variable Restoration
```css
/* Critical variables that must be maintained */
--color-brand-gold: #D4AF37;
--color-brand-gold-hover: #C9A961;
--color-brand-gold-dark: #A68646;
--color-brand-gold-light: #E8D4B8;
--color-surface-dark: #222222;
--color-surface-darker: #1A1A1A;
--color-surface-medium: #2A2A2A;
--color-surface-light: #3A3A3A;
--color-text-primary: #FFFFFF;
--color-text-secondary: rgba(255, 255, 255, 0.8);
--color-text-tertiary: rgba(255, 255, 255, 0.6);
--color-accent-silver: #C0C0C0;
--color-accent-grey: #A8A8A8;
```
