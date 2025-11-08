# MEDUSA DESIGN SYSTEM - COMPLETE ANALYSIS
**Source:** Services Page (ServicesPageInteractive.tsx)  
**Date:** November 8, 2025  
**Status:** ✅ COMPLETE EXTRACTION

---

## 📋 EXECUTIVE SUMMARY

This document contains a **pixel-perfect extraction** of all design decisions from the Services page. Every spacing value, color, typography setting, and layout rule has been documented.

**Why the Services page?**
- ✅ Perfect spacing consistency
- ✅ Perfect typography hierarchy
- ✅ Perfect visual alignment
- ✅ Perfect component structure

---

## 1. SPACING GRID SYSTEM

### Base Unit: 8px
All spacing follows an **8px grid system** for visual consistency.

### Gap Values (Grid/Flex Layouts)

```css
--space-1:  8px   /* gap-8  in Tailwind (gap-2)  */
--space-2:  16px  /* gap-16 in Tailwind (gap-4)  */
--space-4:  32px  /* gap-32 in Tailwind (gap-8)  */
--space-8:  64px  /* gap-64 in Tailwind (gap-16) */
```

**Observed Usage:**
- Feature list items: `gap-8` (32px between items)
- Service card internal spacing: `gap-8` (32px vertical rhythm)
- Section spacing: `gap-16` (64px between major sections)

### Padding Values

#### Card Padding
```typescript
// Category Cards
padding: 'px-8 py-10'  // 32px horizontal, 40px vertical

// Service Cards
padding: 'p-8'  // 32px all around
```

#### Button Padding
```typescript
padding: 'px-8 py-4'  // 32px horizontal, 16px vertical
```

### Margin Values

#### Vertical Rhythm (space-y)
```css
space-y-8  /* 32px between stacked elements */
space-y-16 /* 64px between major sections */
```

#### Specific Measurements
```typescript
// Category card icon to content
marginBottom: 'mb-8'  // 32px

// Between sections
gap: 'gap-16'  // 64px
```

---

## 2. TYPOGRAPHY SYSTEM

### Font Families

```css
--font-family-heading: 'Playfair Display', serif
--font-family-body: 'Inter', -apple-system, sans-serif
```

**Rule:** Headings (h1, h2, h3) = Playfair Display | Everything else = Inter

### Font Sizes

#### Page Title (h1)
```typescript
className: 'text-5xl md:text-6xl lg:text-7xl'
// Mobile:  48px (3rem)
// Tablet:  60px (3.75rem)
// Desktop: 72px (4.5rem)
```

#### Section Title (h2)
```typescript
className: 'text-3xl md:text-4xl'
// Mobile:  30px (1.875rem)
// Tablet+: 36px (2.25rem)
```

#### Card Titles (h3)
```typescript
// Category cards
className: 'text-2xl'  // 24px

// Service cards
className: 'text-2xl md:text-3xl'
// Mobile:  24px
// Tablet+: 30px
```

#### Body Text
```typescript
// Large body (page subtitle)
className: 'text-lg'  // 18px

// Base body (card descriptions)
className: 'text-base'  // 16px

// Small text (feature lists)
className: 'text-sm'  // 14px

// Extra small (labels, badges)
className: 'text-xs'  // 12px
```

#### Special Elements
```typescript
// Price display
className: 'text-xl'  // 20px

// Button text
className: 'text-lg'  // 18px
```

### Font Weights

```typescript
400 = normal    // Body text default
500 = medium    // Not heavily used
600 = semibold  // Labels, section headers
700 = bold      // Main headings (h1, h2, h3)
```

### Line Heights

```typescript
leading-tight    = 1.25  // For large headings
leading-relaxed  = 1.625 // For body text
leading-7        = 1.75  // For descriptions (28px / 16px)
```

**Observed Pattern:**
- h1: No explicit line-height (defaults to tight ~1.1)
- h2, h3: No explicit line-height (defaults to ~1.2)
- Body text: `leading-relaxed` (1.625)
- Card descriptions: `leading-7` (1.75)

### Letter Spacing (tracking)

```typescript
tracking-[0.3em]  // Page subtitle label (widest)
tracking-[0.25em] // Section labels
tracking-[0.2em]  // Card badges and labels
```

**Rule:** ALL uppercase text has letter-spacing

### Text Transform

```typescript
uppercase // Used on ALL labels
none      // Default for headings and body
```

---

## 3. COLOR SYSTEM

### Brand Colors (Primary Palette)

```css
--brand-gold:       #D4AF37
--brand-gold-hover: #E5C158
--brand-white:      #FFFFFF
--deep-black:       #1A1A1A
```

### Surface Colors (Backgrounds)

```css
--surface-dark:   #222222  /* Primary background */
--surface-darker: #1A1A1A  /* Deeper contrast */
```

**Observed Usage:**
- Service cards: `bg-[#222222]`
- Category cards: No background (transparent)
- Page background: Transparent (inherits from body)

### Text Colors with Opacity

```typescript
text-white       // rgba(255, 255, 255, 1.0)   - Pure white
text-white/80    // rgba(255, 255, 255, 0.8)   - Secondary text
text-white/75    // rgba(255, 255, 255, 0.75)  - Tertiary text
text-white/70    // rgba(255, 255, 255, 0.7)   - Muted text
text-white/60    // rgba(255, 255, 255, 0.6)   - Subtle text
text-white/50    // rgba(255, 255, 255, 0.5)   - Faint text

text-[var(--brand-gold)]     // #D4AF37 - Accent text
text-[var(--brand-gold)]/80  // Gold at 80% opacity
```

**Usage Pattern:**
- Page title: Gold
- Section titles: Gold
- Card titles (category): Gold
- Card titles (service): White
- Descriptions: white/70 or white/75
- Labels: white/60 or white/50

### Border Colors

```typescript
border-white/10                  // Default cards
border-[var(--brand-gold)]       // Active/premium cards
hover:border-[var(--brand-gold)]/80  // Hover state
```

### Icon Background

```typescript
// Category card icons
backgroundColor: 'var(--brand-gold)'  // #D4AF37
iconColor: 'text-black'               // Black icon on gold
```

---

## 4. BORDERS & SHADOWS

### Border Width

```typescript
border-2  // ALL cards use 2px borders
```

### Border Radius

```typescript
rounded-3xl   // 24px - Service cards
rounded-2xl   // 16px - Category cards
rounded-xl    // 12px - Buttons
rounded-full  // 9999px - Icon containers
```

### Box Shadows

```typescript
// Default cards
shadow: none

// Premium service card (middle card)
shadow-[0_20px_60px_rgba(212,175,55,0.35)]

// Active category card
shadow-[0_0_32px_rgba(212,175,55,0.45)]
```

### Focus Rings

```typescript
focus-visible:ring-2                    // 2px ring
focus-visible:ring-[var(--brand-gold)]  // Gold color
focus-visible:ring-offset-4             // 4px offset
focus-visible:ring-offset-[var(--deep-black)]  // Offset color
```

---

## 5. RESPONSIVE BREAKPOINTS

### Grid Behavior

#### Category Cards
```typescript
// Mobile (< 640px)
grid-cols-1  // Single column

// Small (≥ 640px)
sm:grid-cols-2  // Two columns

// Large (≥ 1024px)
lg:grid-cols-4  // Four columns
```

#### Service Cards
```typescript
// Mobile & Tablet (< 768px)
grid-cols-1  // Single column

// Medium (≥ 768px)
md:grid-cols-3  // Three columns (no change at lg)
```

### Typography Scaling

```typescript
// h1 (Page title)
text-5xl md:text-6xl lg:text-7xl

// h2 (Section title)
text-3xl md:text-4xl

// h3 (Service card title)
text-2xl md:text-3xl

// Body text (category card subtitle)
text-sm md:text-base
```

### Breakpoint Values

```typescript
sm:  640px   // Small tablets
md:  768px   // Tablets
lg:  1024px  // Laptops
xl:  1280px  // Desktops
2xl: 1536px  // Large screens
```

---

## 6. LAYOUT & POSITIONING

### Container Configuration

```typescript
className: 'responsive-container safe-area-padding'
maxWidth: 'max-w-[1104px]'  // 1104px specific to Services page
margin: 'mx-auto'
width: 'w-full'
```

### Content Structure

```typescript
// Main content wrapper
className: 'mx-auto w-full max-w-[1104px] flex flex-col gap-16'
// gap-16 = 64px between major sections
```

### Flexbox Configurations

#### Category Card
```typescript
display: 'flex flex-col'
height: 'h-full'
justifyContent: 'default'  // Stretch to fill
```

#### Service Card
```typescript
display: 'flex flex-col'
height: 'h-full'
gap: 'gap-8'  // 32px internal spacing
```

#### Icon Row
```typescript
display: 'flex items-center justify-between'
marginBottom: 'mb-8'  // 32px
```

#### Price Row
```typescript
display: 'flex items-center'
gap: 'gap-8'  // 32px between icon and text
```

### Z-Index

```typescript
section: 'relative z-10'
```

### Navigation Offset

```typescript
className: 'nav-offset-spacer h-24 md:h-32'
// Mobile:  96px (6rem)
// Desktop: 128px (8rem)
```

---

## 7. VISUAL HIERARCHY

### Scaling

#### Category Cards
```typescript
// Default
scale-100

// Hover & Active
hover:scale-[1.02]
scale-[1.02]  // Active state
```

#### Service Cards
```typescript
// Default
scale-100

// Premium (middle card)
scale-[1.01]  // Slightly elevated
```

### Vertical Spacing Pattern

```typescript
// Page header
space-y-8  // 32px between label, title, subtitle

// Between major sections
gap-16  // 64px

// Section header
space-y-8  // 32px

// Category card content
space-y-8  // 32px between title and subtitle

// Service card content
gap-8  // 32px consistent vertical rhythm

// Feature list
space-y-8  // 32px between list items
```

---

## 8. COMPONENT ANATOMY

### Category Card Structure

```typescript
<button
  className="flex flex-col h-full rounded-2xl border-2 
             border-white/10 px-8 py-10 transition-transform duration-300"
>
  {/* Icon Row */}
  <div className="flex items-center justify-between mb-8">
    <div className="h-14 w-14 rounded-full bg-[var(--brand-gold)]">
      <Icon size={20} className="text-black" />
    </div>
    <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
      ab {price}
    </span>
  </div>

  {/* Content */}
  <div className="space-y-8 flex-1">
    <h3 className="font-headline text-2xl text-[var(--brand-gold)]">
      {title}
    </h3>
    <p className="text-sm md:text-base text-white/75 leading-relaxed font-body">
      {subtitle}
    </p>
  </div>
</button>
```

### Service Card Structure

```typescript
<div className="flex flex-col h-full">
  <div className="flex flex-col h-full rounded-3xl border-2 bg-[#222222]">
    <div className="flex flex-col gap-8 p-8 h-full">
      
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] 
                         text-[var(--brand-gold)]/80">
          {badge}
        </span>
        <span className="text-sm font-semibold uppercase tracking-[0.2em] 
                         text-white/60">
          {duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-headline text-2xl md:text-3xl text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-base leading-7 text-white/70 flex-1 font-body">
        {description}
      </p>

      {/* Price */}
      <div className="flex items-center gap-8 text-[var(--brand-gold)] 
                      font-semibold text-xl">
        <Euro size={18} />
        <span>{price}</span>
      </div>

      {/* Features */}
      <ul className="space-y-8 text-sm text-white/80 font-body">
        {features.map(feature => (
          <li className="flex items-center gap-8">
            <ChevronRight size={16} className="text-[var(--brand-gold)] shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Button className="w-full rounded-xl px-8 py-4 text-lg font-semibold">
        {cta}
      </Button>
    </div>
  </div>
</div>
```

---

## 9. ANIMATIONS

### Framer Motion Variants

```typescript
const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { 
    duration: 0.4, 
    ease: [0.25, 0.46, 0.45, 0.94]  // Custom cubic-bezier
  },
};

const containerVariants = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
};
```

### CSS Transitions

```typescript
// Card transitions
transition-transform duration-300

// All properties
transition-all duration-300

// Button transitions
transition-all duration-200
```

---

## 10. STATE MANAGEMENT

### Category Card States

```typescript
// Default
border-white/10
scale-100

// Hover
hover:border-[var(--brand-gold)]/80
hover:scale-[1.02]

// Active
border-[var(--brand-gold)]
scale-[1.02]
shadow-[0_0_32px_rgba(212,175,55,0.45)]

// Focus
focus-visible:ring-2
focus-visible:ring-[var(--brand-gold)]
focus-visible:ring-offset-4
```

### Service Card States

```typescript
// Default
border-white/10
scale-100

// Premium (middle card, index === 1)
border-[var(--brand-gold)]
scale-[1.01]
shadow-[0_20px_60px_rgba(212,175,55,0.35)]

// Hover
hover:border-[var(--brand-gold)]/70
```

### Button Variants

```typescript
// Gold (primary)
variant="gold"
bg-[var(--brand-gold)]
text-[var(--deep-black)]

// Outline Gold (secondary)
variant="outlineGold"
border border-[var(--brand-gold)]
text-[var(--brand-gold)]
bg-transparent
hover:bg-[var(--brand-gold)]/10
```

---

## 11. ACCESSIBILITY

### Focus Management

```typescript
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-[var(--brand-gold)]
focus-visible:ring-offset-4
focus-visible:ring-offset-[var(--deep-black)]
```

### ARIA Attributes

```typescript
// Category buttons (tabs)
role="tab"
aria-selected={isActive}
aria-controls={`panel-${category.id}`}
tabIndex={isActive ? 0 : -1}

// Service panel
role="tabpanel"
id={`panel-${activeCategory}`}
aria-labelledby={`tab-${activeCategory}`}
aria-live="polite"
```

### Touch Targets

```typescript
// Icon containers: 56px × 56px (h-14 w-14)
// Buttons: 48px+ height (px-8 py-4)
// All exceed WCAG 44px minimum
```

---

## 12. IMPLEMENTATION CHECKLIST

Use this checklist when applying design to other pages:

### ✅ Spacing
- [ ] All gaps use 8px, 16px, 32px, or 64px
- [ ] Card padding is 32px (p-8) or 32px/40px (px-8 py-10)
- [ ] Button padding is 32px/16px (px-8 py-4)
- [ ] Sections separated by 64px (gap-16)

### ✅ Typography
- [ ] Headings use Playfair Display
- [ ] Body text uses Inter
- [ ] Font sizes match the scale (12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px, 48px, 60px, 72px)
- [ ] All labels are uppercase with letter-spacing

### ✅ Colors
- [ ] Gold (#D4AF37) for accents and active states
- [ ] White with opacity for text hierarchy (100%, 80%, 75%, 70%, 60%, 50%)
- [ ] Dark surface (#222222) for cards
- [ ] Borders use white/10 or gold

### ✅ Components
- [ ] Cards use 2px borders
- [ ] Border radius: 24px (service), 16px (category), 12px (buttons)
- [ ] Icons in cards are 56px × 56px
- [ ] Premium cards have gold border and shadow

### ✅ Responsive
- [ ] Mobile-first approach
- [ ] Breakpoints at 640px (sm), 768px (md), 1024px (lg)
- [ ] Grid columns adjust appropriately
- [ ] Typography scales with breakpoints

### ✅ Animations
- [ ] Fade-in-up for new content (opacity 0→1, y 20→0)
- [ ] 0.4s duration with custom easing
- [ ] Hover scale: 1.02
- [ ] Transitions: 300ms for cards, 200ms for buttons

---

## 📊 QUICK REFERENCE TABLE

| Element | Spacing | Font | Color | Border |
|---------|---------|------|-------|--------|
| Page Title | mb-8 | 48-72px, Playfair, Bold | Gold | - |
| Section Title | mb-8 | 30-36px, Playfair, Bold | Gold | - |
| Category Card | p: 32/40px, gap: 32px | 24px, Playfair | Gold/White | 2px, white/10 |
| Service Card | p: 32px, gap: 32px | 24-30px, Playfair | White | 2px, white/10 |
| Body Text | - | 16px, Inter | white/70 | - |
| Button | 32/16px | 18px, Inter, Semibold | Gold/Black | 12px radius |
| Icons | - | 20px (category), 16-18px (service) | Black/Gold | - |

---

**END OF ANALYSIS**

This document is your blueprint for replicating the Services page design across all other pages.
