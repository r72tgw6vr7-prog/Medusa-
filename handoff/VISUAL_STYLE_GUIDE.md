# Medusa Tattoo München - Visual Style Guide

**Version:** 1.0.0  
**Last Updated:** October 9, 2025  
**Purpose:** Visual reference for designers and developers  
**Format:** PDF-Ready Documentation

---

## 📐 Table of Contents

1. [Brand Identity](#brand-identity)
2. [Color Palette](#color-palette)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Component Library](#component-library)
6. [Iconography](#iconography)
7. [Photography Guidelines](#photography-guidelines)
8. [Effects & Microinteractions](#effects--microinteractions)
9. [Do's and Don'ts](#dos-and-donts)

---

## 🎨 Brand Identity

### Brand Name

**Medusa Tattoo München**

### Tagline

*"Luxury Tattoo Artistry Since 1998"*

### Brand Personality

- **Luxury:** High-end, exclusive, premium
- **Cinematic:** Dramatic, artistic, visual storytelling
- **Minimalist:** Clean, focused, intentional
- **Professional:** Expert, trustworthy, established
- **Modern:** Contemporary, cutting-edge, innovative

### Design Philosophy

> "Every pixel must reflect the precision and artistry of our craft. We embrace strict minimalism with cinematic impact, where less is more, and every element serves a purpose."

---

## 🎨 Color Palette

### The Exclusive 4-Color System

**CRITICAL RULE:** Only these 4 colors may be used. No exceptions.

#### Primary Colors

<div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;">

**1. Background Black**
```
Hex: #222222
RGB: 34, 34, 34
Pantone: Black 6 C
CMYK: 0, 0, 0, 87
```
**Usage:** Backgrounds ONLY  
**Rule:** Never use for text or UI elements  
**CSS:** `--brand-background`

---

**2. Pure White**
```
Hex: #FFFFFF
RGB: 255, 255, 255
Pantone: White
CMYK: 0, 0, 0, 0
```
**Usage:** Body text, headlines, primary content  
**Rule:** Always pure white, never off-white  
**CSS:** `--brand-white`

---

**3. Antique Gold**
```
Hex: #D4AF37
RGB: 212, 175, 55
Pantone: 7501 C
CMYK: 0, 17, 74, 17
```
**Usage:** CTAs, accents, highlights, active states  
**Rule:** Primary brand accent  
**CSS:** `--brand-gold`

---

**4. Chrome Silver**
```
Hex: #C0C0C0
RGB: 192, 192, 192
Pantone: 877 C
CMYK: 0, 0, 0, 25
```
**Usage:** Details, borders, secondary elements  
**Rule:** Subtle supporting accent  
**CSS:** `--brand-chrome`

</div>

### Color Swatches

```
████████ #222222 - Background Black (ONLY for backgrounds)
████████ #FFFFFF - Pure White (text, content)
████████ #D4AF37 - Antique Gold (CTAs, accents)
████████ #C0C0C0 - Chrome Silver (details, borders)
```

### Semantic Color Applications

| Element | Color | Hex | Usage Example |
|---------|-------|-----|---------------|
| Page Background | Black | #222222 | `body { background: #222222; }` |
| Headings | White | #FFFFFF | `h1 { color: #FFFFFF; }` |
| Body Text | White | #FFFFFF | `p { color: #FFFFFF; }` |
| CTA Button BG | Gold | #D4AF37 | `button { background: #D4AF37; }` |
| CTA Button Text | Black | #222222 | `button { color: #222222; }` |
| Borders | Chrome | #C0C0C0 | `div { border: 1px solid rgba(192,192,192,0.3); }` |
| Links | White → Gold | #FFFFFF → #D4AF37 | On hover transition |
| Focus Outline | Gold | #D4AF37 | Keyboard navigation |

### Color Variations (Opacity)

**White Opacity Scale:**
- Primary Text: `rgba(255, 255, 255, 1.0)` - 100%
- Secondary Text: `rgba(255, 255, 255, 0.8)` - 80%
- Tertiary Text: `rgba(255, 255, 255, 0.6)` - 60%
- Disabled Text: `rgba(255, 255, 255, 0.4)` - 40%

**Gold Opacity Scale:**
- Solid: `rgba(212, 175, 55, 1.0)` - 100%
- Medium: `rgba(212, 175, 55, 0.4)` - 40%
- Subtle: `rgba(212, 175, 55, 0.15)` - 15%
- Ultra Subtle: `rgba(212, 175, 55, 0.05)` - 5%

**Chrome Opacity Scale:**
- Solid: `rgba(192, 192, 192, 1.0)` - 100%
- Border: `rgba(192, 192, 192, 0.3)` - 30%
- Subtle: `rgba(192, 192, 192, 0.15)` - 15%
- Background: `rgba(192, 192, 192, 0.05)` - 5%

### Interactive States

| State | Gold (#D4AF37) | Chrome (#C0C0C0) |
|-------|----------------|------------------|
| Default | #D4AF37 | #C0C0C0 |
| Hover | #C19B26 | #A8A8A8 |
| Active | #A8821A | #909090 |

### Forbidden Colors

**NEVER USE:**
- ❌ Blue (any shade)
- ❌ Green (any shade)
- ❌ Red (any shade)
- ❌ Purple (any shade)
- ❌ Orange (any shade)
- ❌ Off-white or cream (#F5F5F0, #EFEFEF, etc.)
- ❌ True black (#000000) - use #222222 instead
- ❌ Any color outside the 4-color palette

---

## ✍️ Typography System

### Font Families

#### Playfair Display (Headlines)

**Usage:** H1, H2, H3, H4, H5, H6, Display text

**Weights Available:**
- Regular: 400
- Medium: 500
- SemiBold: 600
- **Bold: 700** ← Primary weight for headlines
- ExtraBold: 800
- Black: 900

**Character:** Elegant, classic serif with high contrast. Luxury feel.

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

**Example:**
```
Playfair Display Bold 700
MEDUSA TATTOO MÜNCHEN
Luxury Artistry Since 1998
```

---

#### Inter (Body Text)

**Usage:** Body text, buttons, labels, navigation, captions

**Weights Available:**
- Light: 300
- **Regular: 400** ← Primary weight for body
- Medium: 500
- **SemiBold: 600** ← Buttons, labels
- Bold: 700
- ExtraBold: 800

**Character:** Modern, clean sans-serif. Exceptional readability.

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
```

**Example:**
```
Inter Regular 400
The finest luxury tattoo artistry in Munich. 
Our master artists bring your vision to life.
```

### Typography Scale

#### Desktop (1200px+)

| Element | Size | Weight | Line Height | Font | CSS Variable |
|---------|------|--------|-------------|------|-------------|
| **Display XL** | 72px | 700 | 1.1 | Playfair Display | `--text-headline-xl-desktop` |
| **H1 / H2** | 48px | 700 | 1.1 | Playfair Display | `--text-headline-lg-desktop` |
| **H3** | 36px | 600 | 1.1 | Playfair Display | `--text-headline-md-desktop` |
| **Body Large** | 24px | 400 | 1.4 | Inter | `--text-body-large-desktop` |
| **Body Standard** | 20px | 400 | 1.4 | Inter | `--text-body-desktop` |
| **Body Small** | 18px | 400 | 1.4 | Inter | `--text-body-small-desktop` |
| **Label** | 16px | 500 | 1.4 | Inter | `--text-label-desktop` |
| **Caption** | 14px | 400 | 1.4 | Inter | `--text-caption-desktop` |

#### Tablet (768px - 1199px)

| Element | Size | Calculation | Font |
|---------|------|-------------|------|
| **Display XL** | 56px | 72px × 0.78 | Playfair Display 700 |
| **H1 / H2** | 40px | 48px × 0.83 | Playfair Display 700 |
| **H3** | 32px | 36px × 0.83 | Playfair Display 600 |
| **Body Large** | 24px | 24px × 1.0 | Inter 400 |
| **Body Standard** | 20px | 20px × 1.0 | Inter 400 |
| **Body Small** | 18px | 18px × 1.0 | Inter 400 |

#### Mobile (320px - 767px)

| Element | Size | Calculation | Font |
|---------|------|-------------|------|
| **Display XL** | 40px | 72px × 0.56 | Playfair Display 700 |
| **H1 / H2** | 32px | 48px × 0.72 | Playfair Display 700 |
| **H3** | 24px | 36px × 0.72 | Playfair Display 600 |
| **Body Large** | 24px | max(24px × 0.89, 16px) | Inter 400 |
| **Body Standard** | 16px | max(20px × 0.89, 16px) | Inter 400 |
| **Body Small** | 16px | max(18px × 0.89, 16px) | Inter 400 |

**Note:** Mobile text never goes below 16px (accessibility requirement)

### Line Height Standards

- **Headlines (Playfair Display):** 1.1 (tight for visual impact)
- **Body Text (Inter):** 1.4 (optimal readability)

### Typography Examples

```css
/* Hero Headline - Display XL */
.hero-headline {
  font-family: "Playfair Display", serif;
  font-size: clamp(2.5rem, 4vw + 1rem, 4.5rem);  /* 40px → 72px */
  font-weight: 700;
  line-height: 1.1;
  color: #FFFFFF;
}

/* Section Heading - H2 */
.section-heading {
  font-family: "Playfair Display", serif;
  font-size: clamp(2rem, 2.5vw + 0.5rem, 3rem);  /* 32px → 48px */
  font-weight: 700;
  line-height: 1.1;
  color: #FFFFFF;
}

/* Body Text */
.body-text {
  font-family: "Inter", sans-serif;
  font-size: clamp(1rem, 1vw + 0.5rem, 1.25rem);  /* 16px → 20px */
  font-weight: 400;
  line-height: 1.4;
  color: #FFFFFF;
}

/* Button Text */
.button-text {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.02em;
}
```

---

## 📐 Spacing & Layout

### The 8-Point Grid System

**Foundation:** All spacing must be multiples of 8px

**Base Unit:** 8px = `--spacing-1`

### Spacing Scale

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `--spacing-quarter` | 0.125rem | 2px | Fine adjustments |
| `--spacing-half` | 0.25rem | 4px | Micro spacing |
| `--spacing-1` | 0.5rem | **8px** | Base unit |
| `--spacing-1p5` | 0.75rem | 12px | Tight spacing |
| `--spacing-2` | 1rem | **16px** | Component padding |
| `--spacing-2p5` | 1.25rem | 20px | Card padding mobile |
| `--spacing-3` | 1.5rem | **24px** | Medium gaps |
| `--spacing-4` | 2rem | **32px** | Large gaps |
| `--spacing-5` | 2.5rem | 40px | Section padding tablet |
| `--spacing-6` | 3rem | **48px** | Section gaps |
| `--spacing-8` | 4rem | **64px** | Major sections |
| `--spacing-10` | 5rem | **80px** | Primary section padding |
| `--spacing-12` | 6rem | 96px | Extra large spacing |
| `--spacing-16` | 8rem | 128px | Maximum spacing |

### Responsive Spacing

| Context | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| **Section Padding** | 80px | 40px | 24px |
| **Component Gap** | 32px | 24px | 16px |
| **Card Gap** | 24px | 16px | 12px |
| **Grid Gutter** | 16px | 16px | 16px |

### Grid System

**Desktop & Tablet:** 12-column grid  
**Mobile:** 4-column grid  
**Max Container Width:** 1200px  

**Gutters:**
- Desktop: 32px
- Tablet: 24px
- Mobile: 16px

### Breakpoints

```css
/* Mobile: 320px - 767px */
@media (max-width: 767px) { }

/* Tablet: 768px - 1199px */
@media (min-width: 768px) and (max-width: 1199px) { }

/* Desktop: 1200px+ */
@media (min-width: 1200px) { }
```

### Border Radius Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-xs` | 4px | Subtle rounding |
| `--radius-sm` | 8px | Standard buttons |
| `--radius-md` | 12px | Cards |
| `--radius-lg` | 16px | Large cards |
| `--radius-xl` | 24px | Hero elements |
| `--radius-full` | 9999px | Pills, circles |

---

## 🧩 Component Library

### 1. Primary CTA Button (Gold)

**Visual:**
```
┌──────────────────────────┐
│     BOOK NOW (Gold)      │  ← Gold background #D4AF37
│  Black text, gold glow   │  ← Black text #222222
└──────────────────────────┘  ← Soft gold glow
```

**Specifications:**
- Background: `#D4AF37`
- Text: `#222222` (Inter SemiBold 600)
- Min Height: 44px (desktop), 48px (mobile)
- Padding: 12px 24px
- Border Radius: 10px
- Shadow: `0 0 10px rgba(212, 175, 55, 0.2)`

**Hover State:**
- Background: `#C19B26` (darker gold)
- Shadow: `0 0 20px rgba(212, 175, 55, 0.3)` (stronger glow)
- Transform: `translateY(-1px)` (subtle lift)

**Focus State:**
- Outline: `2px solid #D4AF37`
- Outline Offset: 2px

---

### 2. Secondary Button (Chrome Outline)

**Visual:**
```
┌──────────────────────────┐
│   VIEW PORTFOLIO         │  ← Transparent background
│  Chrome border & text    │  ← Chrome border #C0C0C0
└──────────────────────────┘
```

**Specifications:**
- Background: `transparent`
- Text: `#C0C0C0` (Inter SemiBold 600)
- Border: `1px solid #C0C0C0`
- Min Height: 44px
- Padding: 12px 24px
- Border Radius: 10px

**Hover State:**
- Text: `#D4AF37` (gold)
- Border: `1px solid #D4AF37`
- Background: `rgba(212, 175, 55, 0.05)`
- Shadow: `0 0 10px rgba(212, 175, 55, 0.2)`

---

### 3. Premium Card Component

**Visual:**
```
╔══════════════════════════╗
║  ┌──────────────────┐   ║
║  │     [IMAGE]      │   ║  ← Image area
║  └──────────────────┘   ║
║                          ║
║  Card Title              ║  ← White text
║  Description text goes   ║  ← Secondary white
║  here with details...    ║
║                          ║
║  [Gold CTA Button]       ║
╚══════════════════════════╝
   Glassmorphic with
   gold border on hover
```

**Specifications:**
- Background: `linear-gradient(145deg, rgba(34,34,34,0.85), rgba(34,34,34,0.95))`
- Backdrop Filter: `blur(8px)`
- Border: `1px solid rgba(192, 192, 192, 0.15)`
- Border Radius: 12px
- Padding: 24px (desktop), 20px (tablet), 16px (mobile)

**Hover State:**
- Border: `1px solid rgba(212, 175, 55, 0.4)`
- Shadow: `0 0 20px rgba(212, 175, 55, 0.3), 0 8px 32px rgba(0, 0, 0, 0.3)`
- Transform: `translateY(-4px)`

---

### 4. Form Input Fields

**Visual:**
```
Label Text
┌────────────────────────────────┐
│ Enter your name...             │  ← Dark background
└────────────────────────────────┘  ← Chrome border
```

**Specifications:**
- Background: `rgba(34, 34, 34, 0.8)`
- Border: `1px solid rgba(192, 192, 192, 0.3)`
- Text: `#FFFFFF` (Inter 400, 16px minimum)
- Placeholder: `rgba(255, 255, 255, 0.4)`
- Border Radius: 8px
- Min Height: 44px
- Padding: 12px 16px

**Focus State:**
- Border: `2px solid #D4AF37`
- Shadow: `0 0 10px rgba(212, 175, 55, 0.2)`
- Outline: None

**Error State:**
- Border: `2px solid rgba(212, 175, 55, 0.6)`

---

### 5. Glassmorphic Navigation

**Visual:**
```
┌─────────────────────────────────────────────────────────┐
│  [LOGO]     Home   Artists   Gallery   Book   [LANG]   │
│  MEDUSA                                          [CTA]  │
└─────────────────────────────────────────────────────────┘
  Glassmorphic blur effect with subtle gold border
```

**Specifications:**
- Background: `rgba(34, 34, 34, 0.7)`
- Backdrop Filter: `blur(14px)`
- Border Bottom: `1px solid rgba(212, 175, 55, 0.1)`
- Height: 152px (desktop), 120px (tablet), 80px (mobile)
- Position: Sticky, top: 0
- Z-Index: 1000

**Link States:**
- Default: `#FFFFFF`
- Hover: `#D4AF37` with `rgba(212, 175, 55, 0.1)` background
- Active: `#D4AF37` with `2px` bottom border

---

### 6. Artist Card (Mobile Optimized)

**Visual:**
```
┌─────────────┐
│             │
│   [PHOTO]   │  163×163px square
│   3:4 crop  │
│             │
├─────────────┤
│ Artist Name │  Gold text, Playfair 20px
│ Specialty   │  Chrome text, Inter 14px
└─────────────┘
  163×217px total (3:4 aspect ratio)
```

**Specifications:**
- Total Size: 163×217px (mobile)
- Photo: 163×163px (top square)
- Content Area: 54px (bottom)
- Background: `linear-gradient(145deg, rgba(34,34,34,0.85), rgba(34,34,34,0.95))`
- Border: `1px solid rgba(192, 192, 192, 0.15)`
- Border Radius: 12px

---

## 🔍 Iconography

### Icon System

**Source:** Lucide React library or custom SVG

**Sizes:**
- Micro: 12px
- Small: 16px
- Medium: 20px (default)
- Large: 24px
- XL: 32px
- XXL: 48px

**Colors:**
- Primary icons: `var(--brand-white)`
- Accent icons: `var(--brand-gold)`
- Secondary icons: `var(--brand-chrome)`

**Rule:** Icons must ONLY use brand colors via CSS variables

### Common Icons

| Icon | Size | Color | Usage |
|------|------|-------|-------|
| WhatsApp | 24px | Gold | Contact button |
| Instagram | 24px | White | Social link |
| Phone | 20px | Gold | Contact info |
| Email | 20px | Gold | Contact info |
| Calendar | 24px | Gold | Booking |
| Star | 20px | Gold | Ratings |
| Check | 16px | Gold | Confirmations |
| Menu | 24px | White | Mobile menu |

---

## 📸 Photography Guidelines

### Style Requirements

**Cinematic Aesthetic:**
- Professional studio lighting
- High contrast with dramatic shadows
- Color grading applied (cinema-style)
- Consistent mood and tone

**Technical Specifications:**
- Format: WebP primary, JPG fallback
- Quality: 85-90% compression
- Color Profile: sRGB
- Retina: 2x resolution required

### Image Categories

#### Hero Images
- **Aspect Ratio:** 16:9 landscape
- **Size:** 1920×1080px minimum (@2x: 3840×2160px)
- **Quality:** 90-95% WebP
- **Style:** Dramatic, cinematic, high-impact

#### Artist Portraits
- **Aspect Ratio:** 3:4 portrait
- **Sizes:**
  - Desktop: 260×320px (@2x: 520×640px)
  - Tablet: 200×250px (@2x: 400×500px)
  - Mobile: 163×217px (@2x: 326×434px)
- **Lighting:** Consistent across all portraits
- **Background:** Standardized, professional
- **Cropping:** Identical framing for all

#### Portfolio Images
- **Aspect Ratio:** 1:1 square or 3:4 portrait
- **Thumbnail:** 400×400px
- **Lightbox:** 1200×1200px minimum
- **Quality:** 85% WebP
- **Alt Text:** Required with artist, style, category

#### Service Images
- **Aspect Ratio:** 1:1 square
- **Size:** 600×600px
- **Quality:** 85% WebP
- **Style:** Consistent across all services

---

## ✨ Effects & Microinteractions

### Gold Glow Effects

**MANDATORY:** Only gold glows permitted. NO drop shadows.

**Subtle Glow:**
```css
box-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
```
Usage: Subtle hover states, icons

**Standard Glow:**
```css
box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
```
Usage: CTA buttons, active states

**Strong Glow:**
```css
box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
```
Usage: Primary CTAs, emphasis

**Medium Shadow (with offset):**
```css
box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
```
Usage: Elevated cards, modals

### Glassmorphic Effect

```css
.glassmorphic {
  background: rgba(34, 34, 34, 0.7);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(212, 175, 55, 0.1);
}
```

### Transitions

**Standard:**
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

**Luxury:**
```css
transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

**Breathing:**
```css
animation: breathe 3s cubic-bezier(0.37, 0, 0.63, 1) infinite;
```

### Hover Patterns

**Button Hover:**
- Color shift (gold → darker gold)
- Gold glow intensifies
- Subtle lift: `translateY(-1px)`

**Card Hover:**
- Border changes to gold
- Gold glow appears
- Lift: `translateY(-4px)`

**Link Hover:**
- Color: White → Gold
- Underline appears with 4px offset

---

## ✅ Do's and Don'ts

### ✅ DO

- ✅ Use ONLY the 4 brand colors
- ✅ Use Playfair Display for ALL headlines
- ✅ Use Inter for ALL body text
- ✅ Follow the 8-point grid (8px increments)
- ✅ Use gold glow effects for emphasis
- ✅ Ensure 44px+ touch targets
- ✅ Provide visible focus indicators
- ✅ Use WebP format for photos
- ✅ Implement lazy loading for images
- ✅ Test on 320px, 768px, 1200px breakpoints
- ✅ Use CSS custom properties for tokens
- ✅ Maintain WCAG AA contrast ratios

### ❌ DON'T

- ❌ Use any color outside the 4-color palette
- ❌ Use #222222 for anything except backgrounds
- ❌ Use generic fonts (Arial, Helvetica, etc.)
- ❌ Use Cormorant Garamond or other serif fonts
- ❌ Use drop shadows or non-gold effects
- ❌ Create touch targets smaller than 44px
- ❌ Remove focus outlines for accessibility
- ❌ Use off-white (#F5F5F0) instead of pure white
- ❌ Break the 8-point grid system
- ❌ Use JPG as primary format (use WebP)
- ❌ Ignore mobile breakpoints
- ❌ Use blue, green, red, or purple

---

## 📊 Visual Examples

### Color Contrast Examples

**✅ CORRECT:**
```
White on Black (#FFFFFF on #222222)
Contrast Ratio: 12.63:1 ✅ AAA

Gold on Black (#D4AF37 on #222222)
Contrast Ratio: 6.4:1 ✅ AA

Chrome on Black (#C0C0C0 on #222222)
Contrast Ratio: 7.8:1 ✅ AA

Black on Gold (#222222 on #D4AF37)
Contrast Ratio: 6.4:1 ✅ AA (button text)
```

**❌ INCORRECT:**
```
Black on White background
(Should use Black background only)

Blue accent
(Not in brand palette)

Cream text (#F5F5F0)
(Must use pure white #FFFFFF)
```

### Typography Hierarchy Example

```
MEDUSA TATTOO MÜNCHEN
━━━━━━━━━━━━━━━━━━━━━
Playfair Display Bold 72px
#FFFFFF

Luxury Tattoo Artistry
───────────────────────
Playfair Display Bold 48px
#FFFFFF

Our Services
────────────
Playfair Display SemiBold 36px
#FFFFFF

Experience world-class tattoo artistry in the heart of Munich. 
Our master artists specialize in custom designs that transform 
your vision into timeless art.
────────────────────────────────────────────────────────────
Inter Regular 20px, Line-height 1.4
#FFFFFF
```

### Button Comparison

```
Primary CTA (Gold):
┌──────────────────┐
│   BOOK NOW       │  ← Gold BG, Black text, Gold glow
└──────────────────┘

Secondary (Chrome):
┌──────────────────┐
│   LEARN MORE     │  ← Transparent, Chrome border
└──────────────────┘

Text Link:
VIEW GALLERY →        ← White → Gold on hover
```

### Card Layout Example

```
┏━━━━━━━━━━━━━━━━━━━┓
┃ ┌───────────────┐ ┃
┃ │               │ ┃
┃ │  HERO IMAGE   │ ┃  ← 16:9 aspect ratio
┃ │               │ ┃
┃ └───────────────┘ ┃
┃                   ┃
┃ Custom Tattoos    ┃  ← Playfair 36px, White
┃                   ┃
┃ Transform your    ┃  ← Inter 20px, White 80%
┃ vision into art.  ┃
┃                   ┃
┃ ┌───────────────┐ ┃
┃ │  BOOK NOW     │ ┃  ← Gold button
┃ └───────────────┘ ┃
┗━━━━━━━━━━━━━━━━━━━┛
  Glassmorphic card
  with gold glow on hover
```

---

## 📋 Quick Reference

### Essential CSS

```css
/* Brand Colors */
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

/* Effects */
--gold-glow: 0 0 20px rgba(212, 175, 55, 0.3);

/* Transitions */
--luxury-timing: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### Component Checklist

When building components, verify:

- [ ] Uses only 4 brand colors
- [ ] Correct font families (Playfair/Inter)
- [ ] 8px spacing increments
- [ ] Gold glow effects only
- [ ] 44px+ touch targets
- [ ] Visible focus indicators
- [ ] WCAG AA contrast ratios
- [ ] Responsive 320px - 2000px

---

## 📄 Exporting for PDF

This document is formatted for conversion to PDF with the following settings:

**Page Setup:**
- Size: A4 or Letter
- Orientation: Portrait
- Margins: 1 inch (25mm)

**Typography:**
- Use embedded fonts for Playfair Display and Inter
- Ensure color swatches print accurately

**Color Profile:**
- RGB for screen
- CMYK values provided for print

**Output:**
- High quality (300 DPI)
- Include table of contents
- Bookmark major sections

---

**Version:** 1.0.0  
**Last Updated:** October 9, 2025  
**Maintained By:** Medusa Design System Team

**This document is proprietary to Medusa Tattoo München.**

---

**Build luxury. Build with precision. Build with Medusa.**
