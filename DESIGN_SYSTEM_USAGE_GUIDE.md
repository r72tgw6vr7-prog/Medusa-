# Medusa Design System - Usage Guide

**Version:** 2.0  
**Last Updated:** November 11, 2025  
**Approach:** Hybrid CSS Variables + Tailwind CSS

---

## 📋 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Container Standards](#container-standards)
3. [Color System](#color-system)
4. [Typography](#typography)
5. [Spacing](#spacing)
6. [Components](#components)
7. [Best Practices](#best-practices)
8. [Migration Guide](#migration-guide)

---

## 🏗️ Architecture Overview

### Hybrid Approach

The Medusa design system uses a **hybrid architecture** combining the best of both worlds:

```
CSS Variables (Source of Truth)
        ↓
Tailwind Config (Maps to CSS vars)
        ↓
Component Usage (Tailwind utilities + CSS vars)
```

### Why Hybrid?

✅ **CSS Variables** provide:
- Runtime theming capability
- Single source of truth
- Easy debugging in DevTools
- Browser-native performance

✅ **Tailwind CSS** provides:
- Utility-first development speed
- Consistent spacing/sizing
- Responsive design utilities
- Tree-shaking & optimization

---

## 📐 Container Standards

### Standard Container Widths

**UNIFIED STANDARD:** All containers now use **1440px** maximum width on desktop.

```css
/* CSS Variables (design-system.css) */
--container-default: 1440px;  /* Standard container */
--container-narrow: 1024px;   /* Narrow container (text-heavy) */
--container-wide: 1440px;     /* Wide container (same as default) */
```

```javascript
// Tailwind Config (tailwind.config.mjs)
width: {
  'container': '1440px',        // Standard
  'container-narrow': '1024px', // Narrow
  'container-sm': '768px',      // Tablet breakpoint
}
```

### Usage Examples

#### Option 1: CSS Class (Recommended for consistency)

```tsx
// Automatic responsive padding + max-width
<div className="container">
  {/* Content automatically centered, max-width 1440px */}
</div>

// Narrow container for text-heavy content
<div className="container-narrow">
  {/* Max-width 1024px */}
</div>
```

#### Option 2: Tailwind Utilities (More control)

```tsx
// Full control over responsive behavior
<div className="w-full max-w-container mx-auto px-4 md:px-8 lg:px-12">
  {/* Custom responsive padding */}
</div>

// Narrow container with Tailwind
<div className="w-full max-w-container-narrow mx-auto px-6">
  {/* 1024px max-width */}
</div>
```

#### Option 3: Responsive Container (Legacy)

```tsx
// Legacy class with built-in responsive behavior
<div className="responsive-container">
  {/* 
    Mobile: 100% width, 16px padding
    Tablet: 768px max-width, 32px padding
    Desktop: 1440px max-width, 48px padding
  */}
</div>
```

### Responsive Breakpoints

```typescript
// Tailwind breakpoints (mobile-first)
sm:  640px   // Mobile landscape
md:  768px   // Tablet
lg:  1024px  // Desktop
xl:  1280px  // Wide desktop

// Container behavior at each breakpoint
Base (< 640px):   100% width, 16px padding
sm (640px+):      100% width, 24px padding
md (768px+):      768px max-width, 32px padding
lg (1024px+):     1440px max-width, 48px padding
```

---

## 🎨 Color System

### Brand Colors (Magenta Theme)

```css
/* CSS Variables */
--brand-primary: #4e2a3f;      /* Deep Magenta */
--brand-secondary: #442538;    /* Darker Magenta */
--brand-accent: #c9a9bd;       /* Light Magenta */
--brand-hover: #5d3249;        /* Hover Magenta */
--deep-black: #000000;         /* Backgrounds */
--base-white: #FFFFFF;         /* Text & Content */
--chrome-silver: #C0C0C0;      /* Accents */
```

### Usage in Components

```tsx
// ✅ RECOMMENDED: Tailwind utilities
<div className="bg-brand-primary text-base-white">
  Primary CTA
</div>

// ✅ GOOD: CSS variables for custom values
<div style={{ backgroundColor: 'var(--brand-primary)' }}>
  Custom styling
</div>

// ⚠️ ACCEPTABLE: Arbitrary values (use sparingly)
<div className="bg-[var(--brand-primary)]">
  When Tailwind class doesn't exist
</div>

// ❌ AVOID: Hardcoded hex values
<div className="bg-[#4e2a3f]">
  Breaks theming, hard to maintain
</div>
```

### Opacity Variants

```tsx
// Tailwind opacity utilities
<div className="bg-brand-primary/30">  {/* 30% opacity */}
<div className="text-base-white/80">   {/* 80% opacity */}
<div className="border-brand-accent/15"> {/* 15% opacity */}

// Predefined opacity variants
className="bg-brand-primary-30"  // rgba(78, 42, 63, 0.3)
className="bg-brand-primary-20"  // rgba(78, 42, 63, 0.2)
className="bg-brand-primary-10"  // rgba(78, 42, 63, 0.1)
```

---

## 📝 Typography

### Font Families

```tsx
// Tailwind utilities
className="font-playfair"  // Playfair Display (headlines)
className="font-inter"     // Inter (body text)
className="font-headline"  // Alias for Playfair
className="font-body"      // Alias for Inter

// CSS variables
font-family: var(--font-headline);
font-family: var(--font-body);
```

### Typography Scale

```tsx
// Headings
<h1 className="font-playfair text-5xl font-bold">
  Hero Title (48px)
</h1>

<h2 className="font-playfair text-4xl font-bold">
  Section Title (36px)
</h2>

<h3 className="font-playfair text-2xl">
  Card Title (24px)
</h3>

// Body text
<p className="font-inter text-lg">
  Large body text (18px)
</p>

<p className="font-inter text-base">
  Regular body text (16px)
</p>

<p className="font-inter text-sm">
  Small text (14px)
</p>

// Buttons
<button className="font-inter text-base font-semibold">
  Button Text
</button>
```

### Text Colors

```tsx
// Primary text
className="text-base-white"      // #FFFFFF
className="text-brand-primary"   // #4e2a3f

// Text with opacity
className="text-white/80"        // 80% white
className="text-white/70"        // 70% white
className="text-white/60"        // 60% white
```

---

## 📏 Spacing

### 8px Grid System

All spacing follows an 8px grid:

```tsx
// Tailwind spacing utilities (based on 8px grid)
space-2  → 8px   (0.5rem)
space-4  → 16px  (1rem)
space-6  → 24px  (1.5rem)
space-8  → 32px  (2rem)
space-12 → 48px  (3rem)
space-16 → 64px  (4rem)
space-20 → 80px  (5rem)

// Usage examples
className="p-6"      // padding: 24px
className="mt-8"     // margin-top: 32px
className="gap-4"    // gap: 16px
className="space-y-6" // vertical spacing: 24px
```

### Component Spacing Patterns

```tsx
// Card padding
<div className="p-6">  {/* 24px padding */}

// Section spacing
<section className="py-16 md:py-24">  {/* 64px mobile, 96px desktop */}

// Grid gaps
<div className="grid grid-cols-3 gap-6">  {/* 24px gap */}

// Stack spacing
<div className="space-y-4">  {/* 16px between children */}
```

---

## 🧩 Components

### Button Components

#### Primary CTA

```tsx
<button className="
  h-button px-6 rounded-lg
  bg-brand-primary text-base-white
  font-semibold
  shadow-gold-glow
  hover:bg-brand-hover hover:shadow-gold-glow-strong
  hover:-translate-y-0.5
  transition-all duration-300
  focus:outline-2 focus:outline-brand-primary
  min-h-12
">
  Book Appointment
</button>
```

#### Secondary Button

```tsx
<button className="
  h-button px-6 rounded-lg
  bg-transparent border-2 border-brand-accent
  text-brand-accent
  hover:bg-brand-accent/10 hover:border-brand-hover
  transition-all duration-300
  focus:outline-2 focus:outline-brand-accent
">
  Learn More
</button>
```

### Card Components

#### Service Card

```tsx
<div className="
  bg-brand-background/80 backdrop-blur-sm
  border border-brand-accent/15
  rounded-xl p-6
  hover:border-brand-accent/40
  hover:shadow-gold-glow
  transition-all duration-300
">
  <h3 className="font-playfair text-2xl text-base-white mb-4">
    Service Title
  </h3>
  <p className="text-white/80 mb-6">
    Service description
  </p>
  {/* CTA button */}
</div>
```

### Form Components

#### Input Field

```tsx
<input
  type="text"
  className="
    w-full h-input px-4 rounded-lg
    bg-brand-background/50
    border border-brand-accent/20
    text-base-white placeholder:text-white/40
    focus:border-brand-primary 
    focus:outline-none 
    focus:ring-2 focus:ring-brand-primary/40
    transition-all duration-200
  "
  placeholder="Your name"
/>
```

---

## ✅ Best Practices

### DO ✅

1. **Use Tailwind utilities first**
   ```tsx
   <div className="bg-brand-primary p-6 rounded-lg">
   ```

2. **Use CSS variables for custom values**
   ```tsx
   <div style={{ backgroundColor: 'var(--brand-primary)' }}>
   ```

3. **Follow 8px spacing grid**
   ```tsx
   <div className="p-6 mt-8 gap-4">  {/* 24px, 32px, 16px */}
   ```

4. **Use semantic color names**
   ```tsx
   className="bg-brand-primary"  // Not bg-[#4e2a3f]
   ```

5. **Maintain responsive design**
   ```tsx
   className="text-base md:text-lg lg:text-xl"
   ```

### DON'T ❌

1. **Don't hardcode colors**
   ```tsx
   ❌ className="bg-[#4e2a3f]"
   ✅ className="bg-brand-primary"
   ```

2. **Don't use arbitrary spacing**
   ```tsx
   ❌ className="p-[15px]"  // Not on 8px grid
   ✅ className="p-4"       // 16px, on grid
   ```

3. **Don't mix approaches unnecessarily**
   ```tsx
   ❌ <div className="p-6" style={{ padding: '24px' }}>
   ✅ <div className="p-6">
   ```

4. **Don't use inline styles for design tokens**
   ```tsx
   ❌ style={{ color: '#4e2a3f' }}
   ✅ className="text-brand-primary"
   ```

---

## 🔄 Migration Guide

### Migrating from CSS to Tailwind

#### Before (CSS Module)

```css
/* Component.module.css */
.card {
  background-color: var(--brand-primary);
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 0 20px rgba(125, 49, 93, 0.3);
}

.card:hover {
  box-shadow: 0 0 30px rgba(125, 49, 93, 0.4);
}
```

```tsx
import styles from './Component.module.css';

<div className={styles.card}>Content</div>
```

#### After (Tailwind)

```tsx
<div className="
  bg-brand-primary 
  p-6 
  rounded-xl 
  shadow-gold-glow
  hover:shadow-gold-glow-strong
  transition-shadow duration-300
">
  Content
</div>
```

### When to Keep CSS

Keep CSS modules/files for:
- Complex animations
- Component-specific logic
- Grid layouts with many breakpoints
- Legacy components (refactor gradually)

Use Tailwind for:
- Layout (flex, grid basics)
- Spacing (padding, margin, gap)
- Colors (backgrounds, text, borders)
- Typography (font, size, weight)
- Common utilities (rounded, shadow, opacity)

---

## 🎯 Quick Reference

### Container

```tsx
className="container"                    // 1440px max-width
className="container-narrow"             // 1024px max-width
className="w-full max-w-container mx-auto" // Custom approach
```

### Colors

```tsx
className="bg-brand-primary"             // Background
className="text-base-white"              // Text
className="border-brand-accent"          // Border
className="bg-brand-primary/30"          // With opacity
```

### Typography

```tsx
className="font-playfair text-4xl font-bold"  // Heading
className="font-inter text-base"              // Body
className="text-white/80"                     // Muted text
```

### Spacing

```tsx
className="p-6"        // Padding 24px
className="mt-8"       // Margin-top 32px
className="gap-4"      // Gap 16px
className="space-y-6"  // Vertical spacing 24px
```

### Effects

```tsx
className="shadow-gold-glow"              // Magenta glow
className="hover:shadow-gold-glow-strong" // Stronger on hover
className="rounded-xl"                    // Border radius 24px
```

---

## 📚 Additional Resources

- **Tailwind Config:** `tailwind.config.mjs`
- **CSS Variables:** `src/styles/design-system.css`
- **TypeScript Tokens:** `src/tokens/`
- **Handoff Docs:** `handoff/README.md`

---

**Questions?** Refer to the complete handoff package in `/handoff/`

*Last updated: November 11, 2025*
