# MEDUSA DESIGN TOKENS - BRAND SPECIFICATION

## OVERVIEW

This document contains the complete design token specification for Medusa Tattoo Salon. These tokens are the foundation of our luxury brand identity and must be followed exactly. **NO MODIFICATIONS ALLOWED** - these are read-only reference values.

---

## COLOR PALETTE - EXCLUSIVE 4-COLOR SYSTEM

### Core Brand Colors (MANDATORY)

```css
/* PRIMARY BACKGROUND - EXCLUSIVE USE */
--brand-background: #222222  /* ONLY for backgrounds, never elsewhere */

/* PRIMARY TEXT & CONTENT */
--brand-white: #FFFFFF       /* Pure white for body text and content */

/* ACCENT & CTA */
--brand-gold: #D4AF37        /* Gold for CTAs, highlights, and accents */

/* DETAILS & SECONDARY */
--brand-chrome: #C0C0C0      /* Chrome/silver for details and secondary elements */
```

### Interactive States

```css
/* HOVER STATES */
--brand-gold-hover: #C19B26      /* Darker gold for hover effects */
--brand-chrome-hover: #A8A8A8    /* Darker chrome for hover effects */
```

### Shadow & Glow Effects (GOLD ONLY)

```css
/* OFFICIAL GLOW TOKENS - NO OTHER SHADOWS ALLOWED */
--gold-glow: 0 0 20px rgba(212, 175, 55, 0.3)         /* Standard glow */
--gold-glow-strong: 0 0 30px rgba(212, 175, 55, 0.4)  /* Enhanced glow */
--gold-glow-subtle: 0 0 10px rgba(212, 175, 55, 0.2)  /* Subtle glow */
```

### FORBIDDEN COLORS
❌ **NEVER USE**: Blue, green, purple, red, orange, or any colors outside the 4-color system  
❌ **NO EXCEPTIONS**: Any color not listed above requires immediate correction

---

## TYPOGRAPHY SYSTEM

### Font Families (EXACT SPECIFICATION)

```css
/* HEADLINES ONLY */
--font-headline: "Playfair Display", serif  /* NO fallbacks, exact font required */

/* BODY TEXT ONLY */
--font-body: "Inter", sans-serif            /* NO fallbacks, exact font required */
```

### Mobile-First Responsive Typography

#### Mobile (320px - 767px)
```css
/* Headlines */
--text-headline-xl-mobile: 2rem      /* 32px - Maximum headline size */
--text-headline-lg-mobile: 1.5rem    /* 24px - Section titles */
--text-headline-md-mobile: 1.375rem  /* 22px - Subsection titles */

/* Body Text */
--text-body-large-mobile: 1rem       /* 16px - Important body text */
--text-body-mobile: 0.875rem         /* 14px - Standard body text */
--text-body-small-mobile: 0.75rem    /* 12px - Small text and captions */
```

#### Tablet (768px - 1023px)
```css
/* Headlines */
--text-headline-xl-tablet: 2.5rem    /* 40px */
--text-headline-lg-tablet: 2rem      /* 32px */
--text-headline-md-tablet: 1.75rem   /* 28px */

/* Body Text */
--text-body-large-tablet: 1.125rem   /* 18px */
--text-body-tablet: 1rem             /* 16px */
--text-body-small-tablet: 0.875rem   /* 14px */
```

#### Desktop (1200px+)
```css
/* Headlines */
--text-headline-xl-desktop: 4.5rem   /* 72px - Hero headlines */
--text-headline-lg-desktop: 3rem     /* 48px - Section headlines */
--text-headline-md-desktop: 2.25rem  /* 36px - Subsection headlines */

/* Body Text */
--text-body-large-desktop: 1.5rem    /* 24px - Important body text */
--text-body-desktop: 1.25rem         /* 20px - Standard body text */
--text-body-small-desktop: 1.125rem  /* 18px - Small text */
```

### Line Heights (GOLDEN RATIO)

```css
/* Headlines - Tight for impact */
--line-height-headline: 1.1

/* Body Text - Readable spacing */
--line-height-body: 1.4
```

---

## SPACING SYSTEM - 8PX TOKEN BASED

### Base Spacing Scale

```css
/* 8PX INCREMENT SYSTEM - EXACT COMPLIANCE */
--spacing-1: 0.5rem     /* 8px = 1 × 8px */
--spacing-2: 1rem       /* 16px = 2 × 8px */
--spacing-3: 1.5rem     /* 24px = 3 × 8px */
--spacing-4: 2rem       /* 32px = 4 × 8px */
--spacing-5: 2.5rem     /* 40px = 5 × 8px */
--spacing-6: 3rem       /* 48px = 6 × 8px */
--spacing-8: 4rem       /* 64px = 8 × 8px */
--spacing-12: 6rem      /* 96px = 12 × 8px */
--spacing-16: 8rem      /* 128px = 16 × 8px */
```

### Mobile Spacing (320px - 767px)

```css
/* Mobile-Optimized Gaps - MAXIMUM 32PX */
--section-gap-mobile: 2rem        /* 32px - Main section gaps */
--component-gap-mobile: 1rem      /* 16px - Component gaps */
--card-gap-mobile: 1rem           /* 16px - Card spacing */
--mobile-section-padding: 20px    /* Side padding */
```

### Tablet Spacing (768px - 1023px)

```css
--section-gap-tablet: 2rem        /* 32px */
--component-gap-tablet: 1rem      /* 16px */
--card-gap-tablet: 1rem           /* 16px */
```

### Desktop Spacing (1200px+)

```css
--grid-columns: 12                /* 12-column grid system */
--grid-gutter: 1rem               /* 16px inner-padding */
--spacing-vertical-sm: 3rem       /* 48px section gaps */
--spacing-vertical-md: 3rem       /* 48px section gaps */
--spacing-section: 3rem           /* 48px between major sections */
```

---

## GRID SYSTEM

### 12-Column Grid Foundation

```css
/* EXACT GRID SPECIFICATIONS */
--grid-columns: 12
--grid-gutter: 32px               /* 32px gutters between cards/sections */
--grid-max-width: 1200px         /* Container max width */
```

### Responsive Breakpoints

```css
/* MANDATORY BREAKPOINTS */
--breakpoint-mobile: 320px        /* Minimum mobile */
--breakpoint-mobile-large: 375px  /* Standard mobile */
--breakpoint-tablet: 768px        /* Tablet portrait */
--breakpoint-desktop: 1200px      /* Desktop standard */
```

---

## COMPONENT DIMENSIONS

### Touch Targets (WCAG AA COMPLIANCE)

```css
/* MINIMUM TOUCH TARGETS */
--touch-target-mobile: 48px       /* Mobile touch target (enhanced) */
--touch-target-min: 44px          /* Minimum WCAG standard */
--button-height-mobile: 48px      /* Standard mobile button */
--button-height-large: 52px       /* Large mobile button */
```

### Mobile Artist Grid Specifications

```css
/* EXACT MOBILE ARTIST CARD DIMENSIONS */
--mobile-artist-card-width: 170px    /* Exact width */
--mobile-artist-card-height: 220px   /* Exact height */
--mobile-artist-grid-gap: 16px       /* Gap between cards */

/* TABLET ARTIST CARD DIMENSIONS */
--tablet-artist-card-width: 200px    /* Tablet width */
--tablet-artist-card-height: 250px   /* Tablet height */

/* DESKTOP ARTIST CARD DIMENSIONS */
--desktop-artist-card-width: 260px   /* Desktop width */
--desktop-artist-card-height: 320px  /* Desktop height */
```

### Mobile Grid Systems

```css
/* MOBILE GRID SPECIFICATIONS */
--mobile-grid-gap: 12px           /* Tight grid gaps */
--mobile-card-padding: 16px       /* Card internal padding */
```

---

## GLASSMORPHIC NAVIGATION

### Background & Effects

```css
/* GLASSMORPHIC NAVIGATION VALUES */
--nav-bg: rgba(34, 34, 34, 0.7)       /* Semi-transparent background */
--nav-blur: 14px                       /* Backdrop blur amount */
--nav-border: rgba(212, 175, 55, 0.1)  /* Subtle gold border */
```

---

## ANIMATION & TIMING

### Luxury Micro-Interactions

```css
/* PREMIUM TIMING SYSTEM */
--interaction-timing: cubic-bezier(0.4, 0, 0.2, 1)      /* Standard timing */
--luxury-timing: cubic-bezier(0.25, 0.46, 0.45, 0.94)  /* Luxury easing */
--breathing-timing: cubic-bezier(0.37, 0, 0.63, 1)      /* Organic easing */
```

### Magnetic & Parallax Effects

```css
/* PREMIUM INTERACTION SYSTEM */
--magnetic-glow-radius: 32px      /* Magnetic cursor effect radius */
--magnetic-glow-intensity: 0.4    /* Magnetic glow intensity */
--parallax-main: 0.08             /* 8% movement for main elements */
--parallax-bg: 0.04               /* 4% movement for background elements */
```

---

## COMPONENT-SPECIFIC TOKENS

### Trust Signals

```css
/* MOBILE TRUST CARD SPECIFICATIONS */
--trust-card-height-mobile: 120px    /* Exact height for mobile */
--trust-card-height-tablet: 140px    /* Tablet height */
--trust-card-height-desktop: 160px   /* Desktop height */
```

### Service Cards

```css
/* MOBILE SERVICE CARD SPECIFICATIONS */
--service-card-min-height-mobile: 140px   /* Minimum height */
--service-card-min-height-tablet: 160px   /* Tablet minimum */
--service-card-min-height-desktop: 180px  /* Desktop minimum */
```

### Style Selection Cards

```css
/* MOBILE STYLE CARD SPECIFICATIONS */
--style-card-width-mobile: 120px     /* Exact width */
--style-card-height-mobile: 100px    /* Exact height */
--style-card-width-tablet: 140px     /* Tablet width */
--style-card-height-tablet: 120px    /* Tablet height */
--style-card-width-desktop: 160px    /* Desktop width */
--style-card-height-desktop: 140px   /* Desktop height */
```

---

## ACCESSIBILITY TOKENS

### High Contrast Support

```css
/* HIGH CONTRAST MODE OVERRIDES */
--high-contrast-border: 2px solid var(--brand-gold)
--high-contrast-outline: 2px solid var(--brand-white)
--high-contrast-outline-offset: 2px
```

### Focus States

```css
/* FOCUS INDICATORS */
--focus-outline: 2px solid var(--brand-gold)
--focus-outline-offset: 2px
--focus-shadow: var(--gold-glow-subtle)
```

---

## USAGE GUIDELINES

### ✅ CORRECT USAGE

1. **Always use exact CSS variable names** - No modifications or custom values
2. **Follow mobile-first approach** - Start with mobile tokens, scale up
3. **Maintain brand color exclusivity** - Only use the 4 approved colors
4. **Respect spacing increments** - Use only 8px-based spacing values
5. **Apply gold glow effects only** - No other shadow types allowed

### ❌ FORBIDDEN PRACTICES

1. **Custom color values** - Never use colors outside the 4-color system
2. **Generic font fallbacks** - Must use exact Playfair Display and Inter
3. **Arbitrary spacing** - Only use defined spacing tokens
4. **Non-gold shadows** - Any shadow effect must use gold glow tokens
5. **Breaking mobile-first hierarchy** - Always start mobile, scale up

---

## IMPLEMENTATION REFERENCE

### CSS Variable Usage

```css
/* CORRECT IMPLEMENTATION */
.luxury-card {
  background-color: var(--brand-background);
  color: var(--brand-white);
  border: 1px solid var(--brand-gold);
  padding: var(--spacing-4);
  font-family: var(--font-body);
  font-size: var(--text-body-mobile);
  box-shadow: var(--gold-glow-subtle);
}

/* RESPONSIVE SCALING */
@media (min-width: 768px) {
  .luxury-card {
    font-size: var(--text-body-tablet);
    padding: var(--spacing-6);
  }
}

@media (min-width: 1200px) {
  .luxury-card {
    font-size: var(--text-body-desktop);
    padding: var(--spacing-8);
  }
}
```

---

## TOKEN VALIDATION CHECKLIST

Before implementing any design:

- [ ] Colors are from approved 4-color palette only
- [ ] Typography uses Playfair Display or Inter only
- [ ] Spacing follows 8px increment system
- [ ] Touch targets meet 44px minimum
- [ ] Shadows use gold glow tokens only
- [ ] Mobile-first responsive approach
- [ ] Accessibility standards maintained
- [ ] Brand consistency preserved

---

**CRITICAL REMINDER**: These design tokens are the foundation of Medusa's luxury brand identity. Any deviation compromises the brand integrity and must be corrected immediately.

**Last Updated**: October 2025  
**Status**: Read-only specification - NO MODIFICATIONS ALLOWED