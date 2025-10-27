# Medusa Tattoo München - Developer Handoff Package

**Version:** 1.0.0  
**Last Updated:** October 9, 2025  
**Project Status:** Production-Ready Design System

---

## 📦 Package Contents

This comprehensive developer handoff package includes everything needed to implement the Medusa Tattoo München website with pixel-perfect accuracy and brand compliance.

### Package Files

```
/handoff/
├── design-tokens-complete.json       # Complete design token system
├── component-states.json              # Component states & interactions
├── asset-manifest.json                # Asset export specifications
├── DEVELOPER_HANDOFF_PACKAGE.md       # This document
└── VISUAL_STYLE_GUIDE.md             # Visual reference guide (PDF-ready)
```

---

## 🎨 Design System Overview

### Brand Philosophy

**Medusa Tattoo München** is a luxury tattoo salon requiring strict adherence to minimalist design principles with cinematic photography, golden ratio layouts, and WCAG AA accessibility standards.

### Core Principles

1. **Zero Tolerance Color Policy**: Only 4 colors permitted
2. **Typography Hierarchy**: Playfair Display + Inter only
3. **8-Point Grid System**: All spacing in 8px increments
4. **Golden Ratio Layouts**: 1.618 proportional scaling
5. **WCAG AA Compliance**: Mandatory accessibility standards
6. **Glassmorphic UI**: Modern, luxury aesthetic

---

## 🎯 Quick Start Guide

### 1. Design Token Integration

All design tokens are defined in `/handoff/design-tokens-complete.json`:

```json
{
  "colors": {
    "brand": {
      "background": "#222222",  // ONLY for backgrounds
      "white": "#FFFFFF",       // Body text
      "gold": "#D4AF37",        // CTAs & accents
      "chrome": "#C0C0C0"       // Details & borders
    }
  }
}
```

**Critical CSS Variables:**

```css
:root {
  /* Brand Colors - EXCLUSIVE PALETTE */
  --brand-background: #222222;
  --brand-white: #FFFFFF;
  --brand-gold: #D4AF37;
  --brand-chrome: #C0C0C0;
  
  /* Typography */
  --font-headline: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  
  /* Spacing (8pt grid) */
  --spacing-1: 8px;
  --spacing-2: 16px;
  --spacing-3: 24px;
  --spacing-4: 32px;
  --spacing-8: 64px;
  --spacing-10: 80px;
  
  /* Effects - GOLD GLOW ONLY */
  --gold-glow: 0 0 20px rgba(212, 175, 55, 0.3);
  --gold-glow-strong: 0 0 30px rgba(212, 175, 55, 0.4);
  --gold-glow-subtle: 0 0 10px rgba(212, 175, 55, 0.2);
}
```

### 2. Typography Implementation

**Import Fonts:**

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**Typography Scale:**

| Element | Desktop | Tablet | Mobile | Font | Weight |
|---------|---------|--------|--------|------|--------|
| Display XL | 72px | 56px | 40px | Playfair Display | 700 |
| Headline LG (H1/H2) | 48px | 40px | 32px | Playfair Display | 700 |
| Headline MD (H3) | 36px | 32px | 24px | Playfair Display | 600 |
| Body Large | 24px | 24px | 24px | Inter | 400 |
| Body Standard | 20px | 20px | 16px | Inter | 400 |
| Body Small | 18px | 18px | 16px | Inter | 400 |

**Line Heights:**

- Headlines: `1.1` (tight for impact)
- Body Text: `1.4` (optimal readability)

---

## 📐 Layout System

### Breakpoints

```css
/* Mobile: 320px - 767px */
@media (max-width: 767px) { }

/* Tablet: 768px - 1199px */
@media (min-width: 768px) and (max-width: 1199px) { }

/* Desktop: 1200px+ */
@media (min-width: 1200px) { }
```

### Grid System

- **Desktop/Tablet:** 12-column grid
- **Mobile:** 4-column grid
- **Max Container Width:** 1200px
- **Gutters:** 32px (desktop), 24px (tablet), 16px (mobile)

### Spacing Scale (8pt Grid)

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-1` | 8px | Base unit |
| `--spacing-2` | 16px | Component padding |
| `--spacing-3` | 24px | Medium gaps |
| `--spacing-4` | 32px | Large gaps |
| `--spacing-6` | 48px | Section gaps |
| `--spacing-8` | 64px | Major sections |
| `--spacing-10` | 80px | Primary section padding |

**Responsive Section Padding:**

```css
.section {
  padding: var(--spacing-10);  /* Desktop: 80px */
}

@media (max-width: 1199px) {
  .section {
    padding: var(--spacing-5);  /* Tablet: 40px */
  }
}

@media (max-width: 767px) {
  .section {
    padding: var(--spacing-3);  /* Mobile: 24px */
  }
}
```

---

## 🎨 Color Usage Guide

### ⚠️ CRITICAL: Zero Tolerance Color Policy

**ONLY these 4 colors are permitted:**

| Color | Hex | Usage | CSS Variable |
|-------|-----|-------|-------------|
| Background | `#222222` | **ONLY** for backgrounds | `--brand-background` |
| White | `#FFFFFF` | Body text, headings | `--brand-white` |
| Gold | `#D4AF37` | CTAs, accents, highlights | `--brand-gold` |
| Chrome | `#C0C0C0` | Details, borders, secondary | `--brand-chrome` |

**FORBIDDEN COLORS:**

❌ Blue, Green, Purple, Red, or ANY color outside the 4-color palette  
❌ Using `#222222` for anything except backgrounds  
❌ Off-white or cream colors (must be pure `#FFFFFF`)

### Color Application Examples

```css
/* ✅ CORRECT */
.page {
  background: var(--brand-background);  /* #222222 */
}

.heading {
  color: var(--brand-white);  /* #FFFFFF */
}

.cta-button {
  background: var(--brand-gold);  /* #D4AF37 */
  color: var(--brand-background);  /* #222222 */
}

.border {
  border: 1px solid var(--brand-chrome);  /* #C0C0C0 */
}

/* ❌ WRONG */
.element {
  color: #222222;  /* FORBIDDEN: Background color used for text */
  background: blue;  /* FORBIDDEN: Non-brand color */
}
```

### Semantic Color Tokens

```css
/* Text Colors */
--text-primary: #FFFFFF;
--text-secondary: rgba(255, 255, 255, 0.8);
--text-tertiary: rgba(255, 255, 255, 0.6);

/* Accent Colors */
--accent-primary: #D4AF37;
--accent-hover: #C19B26;
--accent-active: #A8821A;

/* Borders */
--border-default: rgba(192, 192, 192, 0.15);
--border-hover: rgba(212, 175, 55, 0.4);
--border-focus: #D4AF37;
```

---

## ✨ Effects & Microinteractions

### Gold Glow Effects (ONLY Permitted Shadows)

**MANDATORY:** Only gold glows are allowed. NO drop shadows, NO generic shadows.

```css
/* Subtle Glow */
box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);

/* Standard Glow */
box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);

/* Strong Glow */
box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);

/* Medium Shadow (with offset) */
box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
```

### Glassmorphic Effect

```css
.glassmorphic-nav {
  background: rgba(34, 34, 34, 0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(212, 175, 55, 0.1);
}
```

### Transition Standards

```css
/* Standard Interaction */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

/* Luxury Timing */
transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* Breathing Animation */
animation: breathe 3s cubic-bezier(0.37, 0, 0.63, 1) infinite;
```

---

## 🔘 Component Specifications

### Primary CTA Button (Gold)

**Default State:**

```css
.cta-primary {
  background: var(--brand-gold);
  color: var(--brand-background);
  min-height: 44px;  /* WCAG requirement */
  padding: 12px 24px;
  border-radius: 10px;
  border: none;
  font-family: var(--font-body);
  font-weight: 600;
  box-shadow: var(--gold-glow-subtle);
  cursor: pointer;
  transition: all 0.3s var(--interaction-timing);
}
```

**Hover State:**

```css
.cta-primary:hover {
  background: var(--accent-hover);  /* #C19B26 */
  box-shadow: var(--gold-glow);
  transform: translateY(-1px);
}
```

**Focus State (Keyboard Navigation):**

```css
.cta-primary:focus {
  outline: 2px solid var(--brand-gold);
  outline-offset: 2px;
  box-shadow: var(--gold-glow);
}
```

**Mobile Touch Targets:**

```css
@media (max-width: 767px) {
  .cta-primary {
    min-height: 48px;  /* Larger for touch */
    padding: 14px 24px;
  }
}
```

### Secondary Button (Chrome Outline)

```css
.cta-secondary {
  background: transparent;
  color: var(--brand-chrome);
  border: 1px solid var(--brand-chrome);
  min-height: 44px;
  padding: 12px 24px;
  border-radius: 10px;
  font-family: var(--font-body);
  font-weight: 600;
}

.cta-secondary:hover {
  color: var(--brand-gold);
  border-color: var(--brand-gold);
  background: rgba(212, 175, 55, 0.05);
  box-shadow: var(--gold-glow-subtle);
}
```

### Card Component

```css
.luxury-card {
  background: linear-gradient(145deg, rgba(34, 34, 34, 0.85), rgba(34, 34, 34, 0.95));
  backdrop-filter: blur(8px);
  border: 1px solid rgba(192, 192, 192, 0.15);
  border-radius: 12px;
  padding: var(--spacing-3);  /* 24px */
  transition: all 0.4s var(--luxury-timing);
}

.luxury-card:hover {
  border-color: rgba(212, 175, 55, 0.4);
  box-shadow: 
    var(--gold-glow),
    0 8px 32px rgba(0, 0, 0, 0.3);
  transform: translateY(-4px);
}
```

### Form Inputs

```css
.input-field {
  background: rgba(34, 34, 34, 0.8);
  border: 1px solid rgba(192, 192, 192, 0.3);
  color: var(--brand-white);
  border-radius: 8px;
  min-height: 44px;
  padding: 12px 16px;
  font-family: var(--font-body);
  font-size: 16px;  /* Prevents zoom on mobile */
}

.input-field:focus {
  border: 2px solid var(--brand-gold);
  outline: none;
  box-shadow: var(--gold-glow-subtle);
}

.input-field::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
```

### Navigation Bar

```css
.glassmorphic-nav {
  background: rgba(34, 34, 34, 0.7);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(212, 175, 55, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  height: 152px;  /* Desktop */
}

@media (max-width: 1199px) {
  .glassmorphic-nav {
    height: 120px;  /* Tablet */
  }
}

@media (max-width: 767px) {
  .glassmorphic-nav {
    height: 80px;  /* Mobile */
  }
}
```

---

## ♿ Accessibility Requirements

### WCAG AA Compliance (Mandatory)

#### Contrast Ratios

| Combination | Ratio | Standard |
|-------------|-------|----------|
| White on Dark (#FFFFFF on #222222) | 12.63:1 | ✅ AAA |
| Gold on Dark (#D4AF37 on #222222) | 6.4:1 | ✅ AA |
| Chrome on Dark (#C0C0C0 on #222222) | 7.8:1 | ✅ AA |

#### Touch Target Sizes

```css
/* Desktop: 44px minimum (WCAG) */
.interactive {
  min-height: 44px;
  min-width: 44px;
}

/* Mobile: 48px recommended */
@media (max-width: 767px) {
  .interactive {
    min-height: 48px;
  }
}
```

#### Focus States

**MANDATORY:** All interactive elements must have visible focus indicators for keyboard navigation.

```css
*:focus {
  outline: 2px solid var(--brand-gold);
  outline-offset: 2px;
  box-shadow: var(--gold-glow-subtle);
}

/* Never remove focus outlines */
*:focus:not(:focus-visible) {
  /* Only hide for mouse users, keep for keyboard */
}
```

#### Screen Reader Support

```html
<!-- Skip Links -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<!-- ARIA Labels -->
<button aria-label="Close dialog">
  <svg aria-hidden="true"><!-- Icon --></svg>
</button>

<!-- Alt Text -->
<img src="artist.webp" alt="Portrait of tattoo artist Sarah, specialist in blackwork">
```

#### Keyboard Navigation

- ✅ All interactive elements reachable via Tab
- ✅ Logical tab order
- ✅ Escape closes modals/dialogs
- ✅ Enter activates buttons/links
- ✅ Arrow keys for carousels/galleries

---

## 📱 Responsive Design

### Mobile-First Approach

Start with mobile (320px) and scale up to desktop (1200px+).

### Breakpoint Testing Matrix

| Device | Width | Test Points |
|--------|-------|-------------|
| Mobile Portrait | 320px | iPhone SE |
| Mobile Standard | 375px | iPhone 12 |
| Mobile Large | 414px | iPhone 12 Pro Max |
| Tablet Portrait | 768px | iPad |
| Tablet Landscape | 1024px | iPad Pro |
| Desktop | 1200px | Standard desktop |
| Large Desktop | 1440px | MacBook Pro 15" |
| Extra Large | 1920px | Full HD |

### Responsive Typography

Use CSS clamp() for fluid typography:

```css
h1 {
  font-size: clamp(2rem, 4vw + 1rem, 4.5rem);
  /* Mobile: 32px → Desktop: 72px */
}

h2 {
  font-size: clamp(1.5rem, 2.5vw + 0.5rem, 3rem);
  /* Mobile: 24px → Desktop: 48px */
}

p {
  font-size: clamp(1rem, 1vw + 0.5rem, 1.25rem);
  /* Mobile: 16px → Desktop: 20px */
}
```

### Responsive Spacing

```css
.section {
  padding: clamp(1.5rem, 5vw, 5rem);
  /* Mobile: 24px → Desktop: 80px */
}

.grid {
  gap: clamp(1rem, 2vw, 2rem);
  /* Mobile: 16px → Desktop: 32px */
}
```

### Grid Layout

```css
/* Mobile: 1 column */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

/* Tablet: 2-3 columns */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }
}

/* Desktop: 3-4 columns */
@media (min-width: 1200px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}
```

---

## 🖼️ Asset Guidelines

### Image Formats

| Type | Format | Quality | Usage |
|------|--------|---------|-------|
| Photos | WebP | 85-90% | Primary format |
| Photos (fallback) | JPG | 85% | Browser support |
| Icons/Logos | SVG | - | Scalable graphics |
| Transparency | PNG | - | When needed |

### Optimization Requirements

#### Hero Images

- **Format:** WebP 90-95% quality
- **Dimensions:** 1920×1080px minimum (16:9)
- **Retina:** Provide @2x versions (3840×2160px)
- **Color Grading:** Cinema-style color correction
- **Lazy Loading:** Yes, except above-the-fold

#### Artist Photos

- **Format:** WebP 85% quality
- **Aspect Ratio:** 3:4 portrait
- **Desktop:** 260×320px (@2x: 520×640px)
- **Tablet:** 200×250px (@2x: 400×500px)
- **Mobile:** 163×217px (@2x: 326×434px)
- **Lighting:** Consistent professional lighting
- **Background:** Standardized across all photos

#### Portfolio Images

- **Format:** WebP 85-90% quality
- **Thumbnail:** 400×400px
- **Lightbox:** 1200×1200px minimum
- **Aspect Ratio:** 1:1 (square) or 3:4 (portrait)
- **Metadata:** Artist, style, category, alt text

#### SVG Icons

- **Colors:** Use CSS variables for brand colors
- **Size:** 16px, 20px, 24px, 32px
- **Optimization:** Minified, optimized paths
- **Accessibility:** Include `aria-hidden="true"` for decorative

### Image Implementation

```html
<!-- Responsive Image with WebP -->
<picture>
  <source 
    srcset="image-320.webp 320w, image-768.webp 768w, image-1200.webp 1200w" 
    type="image/webp"
  >
  <source 
    srcset="image-320.jpg 320w, image-768.jpg 768w, image-1200.jpg 1200w" 
    type="image/jpeg"
  >
  <img 
    src="image-768.jpg" 
    alt="Descriptive alt text"
    loading="lazy"
    width="768"
    height="512"
  >
</picture>
```

---

## 🔧 Technical Implementation

### CSS Architecture

```
/styles/
├── globals.css              # Design tokens & base styles
├── responsive-2025.css      # Responsive system
├── design-system.css        # Component styles
└── [component].css          # Component-specific styles
```

### CSS Custom Properties

All design tokens are implemented as CSS custom properties:

```css
:root {
  /* Colors */
  --brand-background: #222222;
  --brand-white: #FFFFFF;
  --brand-gold: #D4AF37;
  --brand-chrome: #C0C0C0;
  
  /* Typography */
  --font-headline: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
  
  /* Spacing */
  --spacing-1: 0.5rem;   /* 8px */
  --spacing-2: 1rem;     /* 16px */
  --spacing-3: 1.5rem;   /* 24px */
  --spacing-4: 2rem;     /* 32px */
  --spacing-6: 3rem;     /* 48px */
  --spacing-8: 4rem;     /* 64px */
  --spacing-10: 5rem;    /* 80px */
  
  /* Effects */
  --gold-glow: 0 0 20px rgba(212, 175, 55, 0.3);
  --gold-glow-strong: 0 0 30px rgba(212, 175, 55, 0.4);
  --gold-glow-subtle: 0 0 10px rgba(212, 175, 55, 0.2);
  
  /* Timing */
  --interaction-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --luxury-timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
```

### React Component Structure

```tsx
// Example: PremiumButton Component

import React from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const PremiumButton: React.FC<ButtonProps> = ({ 
  variant, 
  children, 
  onClick,
  className = '' 
}) => {
  const baseStyles = `
    min-h-[44px] px-6 py-3 rounded-[10px] 
    font-[family-name:Inter] font-semibold
    transition-all duration-300
    focus:outline-2 focus:outline-[var(--brand-gold)] focus:outline-offset-2
  `;
  
  const variantStyles = {
    primary: `
      bg-[var(--brand-gold)] text-[var(--brand-background)]
      shadow-[var(--gold-glow-subtle)]
      hover:bg-[var(--accent-hover)] hover:shadow-[var(--gold-glow)]
      hover:-translate-y-0.5
    `,
    secondary: `
      bg-transparent text-[var(--brand-chrome)]
      border border-[var(--brand-chrome)]
      hover:text-[var(--brand-gold)] hover:border-[var(--brand-gold)]
      hover:bg-[rgba(212,175,55,0.05)] hover:shadow-[var(--gold-glow-subtle)]
    `
  };
  
  return (
    <button 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

---

## 📋 Implementation Checklist

### Phase 1: Foundation

- [ ] Set up CSS custom properties from `design-tokens-complete.json`
- [ ] Import Google Fonts (Playfair Display + Inter)
- [ ] Implement 8-point grid system
- [ ] Set up responsive breakpoints
- [ ] Create base typography styles
- [ ] Implement color palette (verify 4-color compliance)

### Phase 2: Components

- [ ] Build primary CTA button with all states
- [ ] Build secondary button with all states
- [ ] Create card components with glassmorphic effect
- [ ] Implement form inputs with focus states
- [ ] Build navigation bar with glassmorphic design
- [ ] Create modal/dialog components

### Phase 3: Accessibility

- [ ] Verify all contrast ratios meet WCAG AA
- [ ] Ensure all touch targets ≥ 44px (48px mobile)
- [ ] Implement visible focus indicators
- [ ] Add keyboard navigation support
- [ ] Add ARIA labels to interactive elements
- [ ] Test with screen readers

### Phase 4: Responsive

- [ ] Test on 320px (mobile minimum)
- [ ] Test on 375px (iPhone standard)
- [ ] Test on 768px (tablet)
- [ ] Test on 1200px (desktop)
- [ ] Test on 1920px (large desktop)
- [ ] Verify no layout breakage on resize

### Phase 5: Assets

- [ ] Convert all photos to WebP
- [ ] Generate @2x retina versions
- [ ] Optimize all images (compression)
- [ ] Create all SVG icons with brand colors
- [ ] Generate favicon set
- [ ] Implement lazy loading

### Phase 6: Quality Assurance

- [ ] Verify ONLY 4 brand colors used
- [ ] Verify ONLY Playfair Display + Inter fonts
- [ ] Verify ONLY gold glow effects (no other shadows)
- [ ] Test keyboard navigation (Tab through all elements)
- [ ] Test screen reader compatibility
- [ ] Run Lighthouse audit (aim for 90+ accessibility score)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)

---

## 🚫 Common Violations to Avoid

### Critical Errors

❌ **Using non-brand colors**
```css
/* WRONG */
.element {
  color: blue;
  background: #0A0A0A;  /* Should be #222222 */
}

/* CORRECT */
.element {
  color: var(--brand-gold);
  background: var(--brand-background);
}
```

❌ **Using #222222 for non-background elements**
```css
/* WRONG */
.text {
  color: #222222;  /* Background color used for text */
}

/* CORRECT */
.text {
  color: var(--brand-white);
}

.button {
  background: var(--brand-gold);
  color: var(--brand-background);  /* OK: Gold button needs dark text */
}
```

❌ **Using generic fonts or wrong fonts**
```css
/* WRONG */
h1 {
  font-family: Arial, sans-serif;
  font-family: "Cormorant Garamond", serif;
}

/* CORRECT */
h1 {
  font-family: var(--font-headline);  /* Playfair Display */
}

p {
  font-family: var(--font-body);  /* Inter */
}
```

❌ **Using drop shadows instead of gold glow**
```css
/* WRONG */
.card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

/* CORRECT */
.card {
  box-shadow: var(--gold-glow);
}
```

❌ **Touch targets too small**
```css
/* WRONG */
.button {
  min-height: 36px;  /* Too small */
}

/* CORRECT */
.button {
  min-height: 44px;  /* Desktop WCAG minimum */
}

@media (max-width: 767px) {
  .button {
    min-height: 48px;  /* Mobile recommended */
  }
}
```

❌ **No focus indicators**
```css
/* WRONG */
*:focus {
  outline: none;  /* Accessibility violation */
}

/* CORRECT */
*:focus {
  outline: 2px solid var(--brand-gold);
  outline-offset: 2px;
}
```

---

## 📞 Support & Questions

### Documentation References

- **Design Tokens:** `/handoff/design-tokens-complete.json`
- **Component States:** `/handoff/component-states.json`
- **Asset Specifications:** `/handoff/asset-manifest.json`
- **Brand Guidelines:** `/guidelines/Guidelines.md`

### Validation Tools

- **Color Contrast Checker:** [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- **Accessibility Testing:** [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- **Performance Testing:** Chrome Lighthouse
- **Screen Reader Testing:** NVDA (Windows), VoiceOver (Mac)

---

## 🎯 Success Criteria

A successful implementation will:

✅ Use **ONLY** the 4 brand colors (#222222, #FFFFFF, #D4AF37, #C0C0C0)  
✅ Use **ONLY** Playfair Display and Inter fonts  
✅ Follow the 8-point grid system for ALL spacing  
✅ Use **ONLY** gold glow effects (no other shadows)  
✅ Meet WCAG AA contrast ratios for all text  
✅ Provide 44px+ touch targets (48px on mobile)  
✅ Support full keyboard navigation  
✅ Scale perfectly from 320px to 2000px  
✅ Load quickly with optimized WebP images  
✅ Score 90+ on Lighthouse accessibility audit

---

## 📄 License & Usage

This design system and handoff package is proprietary to **Medusa Tattoo München**. All design tokens, components, and specifications are confidential and for authorized implementation only.

**Version:** 1.0.0  
**Last Updated:** October 9, 2025  
**Maintained By:** Medusa Design System Team

---

**Ready to build luxury. Build with precision. Build with Medusa.**
