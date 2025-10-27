# Medusa Tattoo München - Design Tokens Guide

## Overview
This guide documents all design tokens used in the Medusa Tattoo München website. All tokens follow a strict 4-color palette and 8px grid system.

---

## 🎨 COLOR TOKENS

### Brand Colors (EXCLUSIVE - NO OTHER COLORS ALLOWED)

```css
--brand-background: #222222  /* Deep black - ONLY for backgrounds */
--brand-white: #FFFFFF       /* Pure white - body text */
--brand-gold: #D4AF37        /* Gold - accents, CTAs, highlights */
--brand-chrome: #C0C0C0      /* Chrome/silver - details, borders */
```

### Hover States
```css
--brand-gold-hover: #C19B26
--brand-chrome-hover: #A8A8A8
```

### Usage Rules
- ✅ **Background**: Only use `--brand-background` (#222222)
- ✅ **Body Text**: Only use `--brand-white` (#FFFFFF)
- ✅ **CTAs/Highlights**: Only use `--brand-gold` (#D4AF37)
- ✅ **Details/Borders**: Only use `--brand-chrome` (#C0C0C0)
- ❌ **NEVER**: Blue, green, purple, red, or any other colors

---

## 📐 SPACING TOKENS (8px Base System)

### Base Spacing Units
```css
--space-1: 4px    /* 1 × 4px - micro adjustments */
--space-2: 8px    /* 2 × 4px - BASE UNIT */
--space-3: 12px   /* 3 × 4px - small gaps */
--space-4: 16px   /* 4 × 4px - standard gaps */
--space-5: 20px   /* 5 × 4px */
--space-6: 24px   /* 6 × 4px - card padding */
--space-8: 32px   /* 8 × 4px - section spacing */
--space-10: 40px  /* 10 × 4px */
--space-12: 48px  /* 12 × 4px */
--space-16: 64px  /* 16 × 4px - large sections */
--space-20: 80px  /* 20 × 4px - hero sections */
--space-24: 96px  /* 24 × 4px - major sections */
```

### Responsive Spacing
```css
/* Mobile (320-767px) */
--section-padding-mobile: 24px
--component-gap-mobile: 16px
--card-gap-mobile: 12px

/* Tablet (768-1439px) */
--section-padding-tablet: 40px
--component-gap-tablet: 24px
--card-gap-tablet: 16px

/* Desktop (1440px+) */
--section-padding-desktop: 80px
--component-gap-desktop: 32px
--card-gap-desktop: 24px
```

### Usage Examples
```tsx
/* Section spacing */
<section style={{ padding: `var(--section-padding-mobile)` }}>

/* Component gap */
<div style={{ gap: `var(--component-gap-mobile)` }}>

/* Card padding */
<div style={{ padding: `var(--card-padding-mobile)` }}>
```

---

## 🔤 TYPOGRAPHY TOKENS

### Font Families
```css
--font-headline: "Playfair Display", serif  /* Headlines ONLY */
--font-body: "Inter", sans-serif            /* Body text ONLY */
```

### Modular Scale - Desktop (1440px+)
```css
--text-headline-xl-desktop: 4.5rem   /* 72px - Display headlines */
--text-headline-lg-desktop: 3rem     /* 48px - H1-H2 */
--text-headline-md-desktop: 2.25rem  /* 36px - H3 */
--text-body-large-desktop: 1.5rem    /* 24px - Large body */
--text-body-desktop: 1.25rem         /* 20px - Standard body */
--text-body-small-desktop: 1.125rem  /* 18px - Small body */
--text-label-desktop: 1rem           /* 16px - Labels */
--text-caption-desktop: 0.875rem     /* 14px - Captions */
```

### Modular Scale - Tablet (768-1439px)
```css
--text-headline-xl-tablet: 3.5rem    /* 56px */
--text-headline-lg-tablet: 2.5rem    /* 40px */
--text-headline-md-tablet: 2rem      /* 32px */
--text-body-large-tablet: 1.5rem     /* 24px */
--text-body-tablet: 1.25rem          /* 20px */
--text-body-small-tablet: 1.125rem   /* 18px */
--text-label-tablet: 0.875rem        /* 14px */
--text-caption-tablet: 0.75rem       /* 12px */
```

### Modular Scale - Mobile (320-767px)
```css
--text-headline-xl-mobile: 2.5rem    /* 40px */
--text-headline-lg-mobile: 2rem      /* 32px */
--text-headline-md-mobile: 1.5rem    /* 24px */
--text-body-large-mobile: 1.5rem     /* 24px */
--text-body-mobile: 1rem             /* 16px - MINIMUM */
--text-body-small-mobile: 1rem       /* 16px - MINIMUM */
--text-label-mobile: 1rem            /* 16px - MINIMUM */
--text-caption-mobile: 1rem          /* 16px - MINIMUM */
```

### Line Heights
```css
/* Headlines */
line-height: 1.1  /* Tight for impact */

/* Body Text */
line-height: 1.5  /* Readable spacing */

/* Buttons */
line-height: 1.0  /* Perfect vertical centering */
```

### Usage Examples
```tsx
/* Headline */
<h1 className="text-headline-xl font-headline text-brand-gold">
  Medusa Tattoo München
</h1>

/* Body text */
<p className="text-body font-body text-brand-white">
  Professional tattoo studio in Munich
</p>

/* Button */
<button className="text-body font-body" style={{ lineHeight: 1.0 }}>
  Book Now
</button>
```

---

## 🎭 EFFECTS TOKENS

### Gold Glow (ONLY ALLOWED SHADOW)
```css
--gold-glow-subtle: 0 0 10px rgba(212, 175, 55, 0.2)
--gold-glow: 0 0 20px rgba(212, 175, 55, 0.3)
--gold-glow-strong: 0 0 30px rgba(212, 175, 55, 0.4)
```

### Glassmorphic Navigation
```css
--nav-bg: rgba(34, 34, 34, 0.7)
--nav-blur: 14px
--nav-border: rgba(212, 175, 55, 0.1)
```

### Usage Examples
```tsx
/* Gold glow on hover */
<button style={{ 
  boxShadow: 'var(--gold-glow-subtle)' 
}}>

/* Glassmorphic card */
<div style={{ 
  background: 'var(--nav-bg)',
  backdropFilter: `blur(var(--nav-blur))`,
  border: `1px solid var(--nav-border)`
}}>
```

---

## 📏 BORDER RADIUS TOKENS

```css
--radius-xs: 4px      /* Subtle rounding */
--radius-sm: 8px      /* Standard buttons */
--radius-md: 12px     /* Cards */
--radius-lg: 16px     /* Large cards */
--radius-xl: 24px     /* Hero elements */
--radius-full: 9999px /* Pills/circles */
```

---

## 🎯 COMPONENT DIMENSION TOKENS

### Touch Targets (WCAG AA Compliance)
```css
--touch-target-min: 44px        /* Minimum touch target */
--touch-target-mobile: 48px     /* Mobile optimized */
--button-height-mobile: 48px    /* Standard mobile button */
--button-height-large: 52px     /* Large mobile button */
```

### Card Dimensions
```css
--card-width-sm: 240px
--card-width-md: 280px
--card-width-lg: 320px
--card-height-sm: 280px
--card-height-md: 320px
--card-height-lg: 380px
```

### Icon Sizes
```css
--icon-size-xs: 12px   /* Micro icons */
--icon-size-sm: 16px   /* Small icons */
--icon-size-md: 20px   /* Standard - DEFAULT */
--icon-size-lg: 24px   /* Large icons */
--icon-size-xl: 32px   /* Hero icons */
--icon-size-xxl: 48px  /* Feature icons */
```

---

## ⏱️ ANIMATION TOKENS

### Timing Functions
```css
--interaction-timing: cubic-bezier(0.4, 0, 0.2, 1)  /* Standard interactions */
--luxury-timing: cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* Smooth luxury feel */
--breathing-timing: cubic-bezier(0.37, 0, 0.63, 1)  /* Organic animations */
```

### Duration Standards
```css
transition: all 0.3s var(--luxury-timing)  /* Standard */
transition: all 0.2s ease  /* Quick feedback */
transition: all 0.6s var(--luxury-timing)  /* Slow reveal */
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile Portrait */
@media (max-width: 320px) { /* Ultra-small devices */ }
@media (min-width: 375px) { /* iPhone standard */ }

/* Tablet */
@media (min-width: 768px) { /* Tablet portrait */ }
@media (min-width: 1024px) { /* Tablet landscape */ }

/* Desktop */
@media (min-width: 1440px) { /* Desktop standard */ }
@media (min-width: 2000px) { /* Ultra-wide */ }
```

---

## ✅ TOKEN USAGE CHECKLIST

Before using any styling:
- [ ] Is the color from the 4-color palette?
- [ ] Is the spacing a multiple of 4px (preferably 8px)?
- [ ] Is the font either Playfair Display or Inter?
- [ ] Are touch targets ≥ 44px?
- [ ] Is the shadow a gold glow (not drop shadow)?
- [ ] Is the border radius from the defined set?
- [ ] Does the animation use luxury timing?

---

## 🚫 FORBIDDEN VALUES

**NEVER USE:**
- ❌ Colors outside the 4-color palette
- ❌ Spacing values not multiples of 4px
- ❌ Generic font families (Arial, Helvetica, sans-serif)
- ❌ Drop shadows (only gold glow allowed)
- ❌ Touch targets < 44px
- ❌ Arbitrary border radius values
- ❌ Linear timing functions (use cubic-bezier)

---

## 📖 IMPLEMENTATION EXAMPLES

### Perfect Button
```tsx
<button
  className="font-body text-brand-background bg-brand-gold"
  style={{
    height: 'var(--button-height-mobile)',
    minHeight: 'var(--button-height-mobile)',
    padding: '12px 24px', // V(12px) = H(24px) ÷ 2 - SYMMETRIC
    borderRadius: 'var(--radius-sm)',
    boxShadow: 'var(--gold-glow-subtle)',
    transition: 'all 0.3s var(--luxury-timing)',
    lineHeight: 1.0, // CRITICAL for vertical centering
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  Book Now
</button>
```

### Perfect Card
```tsx
<div
  className="bg-brand-background border-brand-gold"
  style={{
    padding: 'var(--card-padding-mobile)',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--brand-gold)',
    boxShadow: 'var(--gold-glow-subtle)',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.3s var(--luxury-timing)',
  }}
>
  {/* Card content */}
</div>
```

### Perfect Section
```tsx
<section
  style={{
    paddingTop: 'var(--section-padding-mobile)',
    paddingBottom: 'var(--section-padding-mobile)',
    paddingLeft: 'var(--spacing-6)',
    paddingRight: 'var(--spacing-6)',
  }}
>
  {/* Section content */}
</section>
```

---

## 🔍 TOKEN VALIDATION

Run this checklist on every component:
1. **Color Check**: Only 4 brand colors used?
2. **Spacing Check**: All values multiples of 4px?
3. **Typography Check**: Only Playfair + Inter?
4. **Touch Check**: All interactive elements ≥ 44px?
5. **Effect Check**: Only gold glow shadows?
6. **Radius Check**: Only defined border radii?
7. **Animation Check**: Using luxury timing?

---

## 📚 RESOURCES

- **Full Token Reference**: `/styles/globals.css`
- **Component Examples**: `/01-components-library/`
- **Page Templates**: `/02-pages-complete/`
- **Handoff Package**: `/handoff/design-tokens-complete.json`

---

**Last Updated**: January 2025
**Status**: Production Ready
**Maintainer**: Medusa Tattoo Design System Team
