# Medusa Design System Usage Guide

## Introduction

This document provides comprehensive guidance on how to use the Medusa design system properly in your components. Following these guidelines will ensure consistency across the entire application and make future maintenance easier.

## Table of Contents

1. [Design Tokens Overview](#design-tokens-overview)
2. [Color Usage](#color-usage)
3. [Typography](#typography)
4. [Spacing](#spacing)
5. [Shadows & Elevation](#shadows--elevation)
6. [Border Radius](#border-radius)
7. [Animation](#animation)
8. [Z-Index Management](#z-index-management)
9. [Component Usage Patterns](#component-usage-patterns)
10. [Migration Guide](#migration-guide)

## Design Tokens Overview

Design tokens are the foundation of our design system. They represent the smallest visual elements that can be used to build components and layouts, ensuring consistency throughout the application.

All our design tokens are implemented in Tailwind CSS through the `tailwind.config.mjs` file, making them easily accessible in your components through Tailwind classes.

## Color Usage

### Brand Colors

```jsx
// DO - Use Tailwind classes with our brand color tokens
<div className="bg-brand-background text-brand-white">
  <span className="text-brand-gold">Gold Accent</span>
</div>

// DON'T - Don't use inline hex values
<div style={{ backgroundColor: '#222222', color: '#FFFFFF' }}>
  <span style={{ color: '#D4AF37' }}>Gold Accent</span>
</div>
```

### Color Opacity Variants

For gold and chrome colors with opacity:

```jsx
// DO - Use predefined opacity variants
<div className="bg-brand-gold-30">30% opacity gold background</div>

// DON'T - Don't use inline rgba values
<div style={{ backgroundColor: 'rgba(212, 175, 55, 0.3)' }}>Incorrect approach</div>
```

### Text Colors

```jsx
// DO - Use text color tokens
<p className="text-text-primary">Primary text</p>
<p className="text-text-secondary">Secondary text</p>
<p className="text-text-tertiary">Tertiary text</p>

// DON'T - Avoid hard-coded colors or opacity
<p style={{ color: 'white' }}>Wrong approach</p>
<p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Wrong approach</p>
```

## Typography

### Font Families

```jsx
// DO - Use font family tokens
<h1 className="font-headline">Headline text using Playfair Display</h1>
<p className="font-body">Body text using Inter</p>

// DON'T - Directly specify font families
<h1 style={{ fontFamily: 'Playfair Display, serif' }}>Wrong approach</h1>
```

### Font Sizes

```jsx
// DO - Use the extracted font size tokens
<h1 className="text-[--text-headline-xl-desktop]">Main headline</h1>
<p className="text-[--text-body-desktop]">Body text</p>

// For responsive typography, use the predefined variables
<h1 className="text-[--text-headline-lg-desktop]">This will automatically adjust on different devices</h1>
```

## Spacing

We follow an 8px grid system for consistent spacing across the application.

```jsx
// DO - Use the spacing tokens
<div className="p-4">16px padding (4 * 4px)</div>
<div className="mt-8">32px top margin (8 * 4px)</div>
<div className="gap-2">8px gap (2 * 4px)</div>

// For layout sections
<section className="py-[--section-padding-desktop]">
  <div className="gap-[--component-gap-desktop]">
    <!-- Content here -->
  </div>
</section>

// DON'T - Use arbitrary values
<div style={{ padding: '17px' }}>Incorrect padding</div>
```

## Shadows & Elevation

```jsx
// DO - Use the shadow tokens
<div className="shadow-md">Default medium shadow</div>
<div className="shadow-gold">Gold-colored shadow</div>
<div className="shadow-gold-glow">Gold glow effect</div>

// For interactive elements
<button className="shadow-gold hover:shadow-gold-hover active:shadow-gold-active">
  Interactive button with changing shadow states
</button>

// DON'T - Create custom shadows inline
<div style={{ boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>Incorrect approach</div>
```

## Border Radius

```jsx
// DO - Use the border radius tokens
<div className="rounded-sm">Small radius (4px)</div>
<div className="rounded-md">Medium radius (8px)</div>
<div className="rounded-lg">Large radius (16px)</div>
<div className="rounded-xl">Extra large radius (24px)</div>
<div className="rounded-full">Full radius (circular/pill)</div>

// DON'T - Use arbitrary values
<div style={{ borderRadius: '5px' }}>Incorrect approach</div>
```

## Animation

```jsx
// DO - Use the predefined animations
<div className="animate-scroll-badges">Scrolling animation</div>
<div className="animate-modal-enter">Modal entrance animation</div>
<div className="animate-scroll-infinite">Infinite scroll animation</div>

// DON'T - Create custom animations inline
<div style={{ animation: 'scroll 20s linear infinite' }}>Incorrect approach</div>
```

## Z-Index Management

```jsx
// DO - Use z-index tokens
<div className="z-base">Base layer</div>
<div className="z-above">Above layer</div>
<div className="z-elevated">Elevated layer</div>
<div className="z-modal">Modal layer</div>

// DON'T - Use arbitrary z-index values
<div style={{ zIndex: 50 }}>Incorrect approach</div>
```

## Component Usage Patterns

### Glassmorphism Effect

```jsx
// DO - Use the glassmorphism utility classes
<div className="bg-brand-background/30 backdrop-blur-md border border-border-default">
  Glass effect container
</div>
```

### Gold Accent Elements

```jsx
// DO - Consistent gold accent styling
<button className="bg-brand-gold hover:bg-brand-gold-hover text-deep-black shadow-gold-glow-subtle hover:shadow-gold-glow">
  Gold Button
</button>
```

### Responsive Patterns

```jsx
// DO - Use responsive classes
<div className="p-4 md:p-6 lg:p-8">
  Responsive padding that increases with screen size
</div>

<h2 className="text-[--text-headline-md-desktop]">
  Heading that automatically adjusts based on breakpoints
</h2>
```

## Migration Guide

When migrating components to use the design system:

1. Replace all hard-coded colors with design token classes
2. Convert inline styles to Tailwind utility classes
3. Align all spacing to the 8px grid using spacing tokens
4. Use standard shadow and border-radius tokens
5. Implement responsive patterns with breakpoint utilities

### Example Migration

Before:
```jsx
<div style={{ 
  backgroundColor: '#222222', 
  color: '#FFFFFF',
  padding: '20px',
  margin: '15px',
  borderRadius: '10px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.1)'
}}>
  <h3 style={{ fontFamily: 'Playfair Display', fontSize: '24px', marginBottom: '16px' }}>
    Section Title
  </h3>
  <p style={{ fontFamily: 'Inter', fontSize: '16px' }}>Content goes here</p>
</div>
```

After:
```jsx
<div className="bg-brand-background text-text-primary p-5 m-4 rounded-md shadow-md">
  <h3 className="font-headline text-[--text-headline-md-desktop] mb-4">
    Section Title
  </h3>
  <p className="font-body text-[--text-body-desktop]">Content goes here</p>
</div>
```

---

By following this guide, we ensure a consistent look and feel across the application while making future updates easier to implement.