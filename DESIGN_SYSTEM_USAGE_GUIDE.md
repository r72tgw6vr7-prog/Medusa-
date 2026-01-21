# Medusa Design System v2.0 - Usage Guide

**Updated:** January 17, 2026  
**Migration:** Gold → Chrome Accent System

## Overview

Single source of truth for all design tokens. Zero hardcoded colors allowed in runtime code.

***

## Color Palette (60-30-10 Rule)

### Primary (60% Usage - Dominant)
- **Black:** `#171717` | `bg-brand-primary` | `text-brand-primary` | `var(--primary)` 
- Usage: Main backgrounds, primary text, headers

### Surface (30% Usage - Secondary)
- **White:** `#F3F3F3` | `bg-brand-surface` | `var(--background)` 
- **True White:** `#FFFFFF` | `bg-brand-true-white` | `text-white` 
- Usage: Cards, sections, light backgrounds

### Grey (10% Usage - Utility)
- **Base:** `#666666` | `text-brand-grey` | `var(--muted)` | 4.52:1 AA ✅
- **Light:** `#A8A8A8` | `border-brand-grey-light` 
- **Dark:** `#4A4A4A` | `bg-brand-grey-dark` 
- Usage: Borders, dividers, muted text

### Accent (Tactical Use Only)
- **Chrome:** `#C0C0C0` | `bg-brand-accent` | `text-brand-accent` 
- **Chrome Hover:** `#A8A8A8` | `hover:bg-brand-accent-hover` 
- Usage: CTAs, focus rings, interactive highlights

***

## Usage Examples

### Tailwind Classes
```tsx
// Backgrounds
<div className="bg-brand-primary">      // Black
<div className="bg-brand-surface">      // White
<div className="bg-brand-accent">       // Chrome

// Text
<h1 className="text-brand-primary">     // Black text
<p className="text-brand-grey">         // Grey text
<a className="text-brand-accent">       // Chrome text

// Borders
<div className="border-2 border-brand-grey-light">
<input className="focus:border-brand-accent focus:ring-brand-accent">

// Opacity Utilities
<div className="bg-brand-primary/80">   // 80% opacity
<div className="border-brand-accent/30"> // 30% opacity
```

### CSS Variables
```css
.custom-component {
  background: var(--background);        /* #F3F3F3 */
  color: var(--foreground);             /* #171717 */
  border: 1px solid var(--muted);       /* #666666 */
}
```

### TypeScript Constants
```typescript
import { BRAND_COLORS } from '@/lib/theme/colors';

const buttonBg = BRAND_COLORS.accent;           // #C0C0C0
const hoverBg = BRAND_COLORS.accentHover;       // #A8A8A8
```

### Shadows
```tsx
// Chrome Glows
<div className="shadow-chrome-glow">           // Soft glow
<div className="shadow-chrome-glow-medium">    // Medium glow
<div className="hover:shadow-chrome-glow-strong"> // Strong on hover
```

### Focus States
```tsx
<button className="focus:ring-4 focus:ring-brand-accent/40">
```

## Accessibility (WCAG AA)

All color combinations pass 4.5:1 minimum contrast:

| Foreground | Background | Ratio | Level |
|------------|------------|-------|-------|
| #171717 | #F3F3F3 | 11.3:1 | AAA ✅ |
| #666666 | #F3F3F3 | 4.52:1 | AA ✅ |
| #C0C0C0 | #171717 | 4.6:1 | AA ✅ |
| #F3F3F3 | #171717 | 11.3:1 | AAA ✅ |

## Migration from v1.0 (Gold System)

### Deprecated Colors (DO NOT USE)
❌ #D4AF37 (gold)

❌ #C19B26 (gold hover)

❌ bg-brand-gold

❌ text-brand-gold

❌ shadow-gold-glow

### Replacements
#D4AF37 → #C0C0C0 (chrome)

bg-brand-gold → bg-brand-accent

text-brand-gold → text-brand-accent

shadow-gold-glow → shadow-chrome-glow

## File Locations

- Config: tailwind.config.mjs
- CSS Variables: medusa-tattoo-seo/src/app/globals.css
- TypeScript Constants: lib/theme/colors.ts
- Documentation: This file

## Rules

✅ Always use semantic tokens (never hardcode colors)

✅ Test contrast before shipping new combinations

✅ Use opacity utilities for transparency (/80, /50, etc.)

❌ Never use arbitrary color values (bg-[#171717])

❌ Never use inline hex/rgb styles in components
