\*Last Updated:** October 2, 2025  
**Project Status:\*\* Design Phase - High-Risk Operations Restricted

---

## ⚠️ CRITICAL: Read Before ANY Prompt Execution

This project experienced critical failures from overly broad AI prompts. These guidelines are **mandatory** for all future AI-assisted work.

---

## STOP - Pre-Execution Checklist

Before executing ANY AI prompt, verify:

☐ Backup created (Figma version snapshot OR file duplicate)
☐ Success criteria documented
☐ Rollback plan written down
☐ Prompt reviewed by team
☐ Testing approach defined
☐ Validation method ready

If ANY box unchecked → DO NOT PROCEED

text

---

## Allowed vs. Forbidden Operations

### ✅ ALLOWED (Low-Risk):

**Data File Updates:**

- artists-de.json
- artists-en.json
- portfolio-core.json
- content-core.json

**Styling Updates (CSS/Design Tokens ONLY):**

- Color value changes in brand-tokens.json
- Typography settings (font-family changes)
- Spacing values (8px increments only)

**Requirements:**

- Must not alter component structure
- Must not touch navigation
- Must not change layouts
- Test in duplicate file first

---

### ❌ FORBIDDEN (High-Risk) Without Special Approval:

**Component Structure Changes:**

- Renaming components
- Moving components
- Deleting components
- Restructuring hierarchy

**Navigation/Routing:**

- Menu structure
- Link destinations
- Navigation logic
- Page routing

**Layout Changes:**

- Grid systems
- Page structures
- Component positioning
- Responsive layouts

**Behavioral Changes:**

- Interactions
- Animations (timing/type)
- State management
- User flows

---

## Prompt Structure Requirements

Every prompt MUST include all 6 sections:

# MEDUSA TATTOO SALON - BRAND COMPLIANCE MASTER GUIDE

## CORE MANDATE - ZERO TOLERANCE POLICY

### BACKGROUND COLOR RULE

- **ONLY** `#222222` for ALL backgrounds
- **NOWHERE ELSE** - this color appears ONLY as background
- **NO EXCEPTIONS** - any deviation requires immediate correction

### EXCLUSIVE COLOR PALETTE

```css
Background: #222222 (ONLY for backgrounds)
Body Text: #FFFFFF (pure white)
Accents:   #D4AF37 (gold for CTAs/highlights)
Details:   #C0C0C0 (chrome/silver for details)
```

**REMOVE ALL**: Blue, green, purple, red, or any off-brand colors from icons, borders, backgrounds

---

## TYPOGRAPHY SPECIFICATIONS

### Font Families (NO GENERICS)

- **Headlines**: `"Playfair Display", serif` ONLY
- **Body Text**: `"Inter", sans-serif` ONLY
- **NO fallbacks** - always specify exact fonts

### Responsive Font Sizes

```css
/* Headlines - Playfair Display */
Desktop (1200px+): 72px (h1), 48px (h2), 36px (h3)
Tablet (768px):    54px (h1), 36px (h2), 30px (h3)
Mobile (320px+):   42px (h1), 30px (h2), 24px (h3)

/* Body Text - Inter */
Large: 24px (hero/important)
Standard: 20px (regular body)
Small: 18px (captions/details)
```

### Golden Ratio Line Heights

- **Headlines**: 1.1 (tight for impact)
- **Body Text**: 1.4 (readable spacing)

---

## GRID & LAYOUT SYSTEM

### 12-Column Grid (Desktop)

- **Columns**: 12 equal columns
- **Gutters**: 32px between cards/sections
- **Max Width**: 1200px container
- **Breakpoints**: 320px, 375px, 768px, 1200px

### Vertical Spacing

- **Between sections**: 64-96px minimum
- **Major blocks**: 128px spacing
- **No claustrophobia** - generous white space
- **No floating elements** - everything snaps to grid

---

## NAVIGATION SPECIFICATIONS

### Glassmorphic Navigation

```css
Background: rgba(34,34,34,0.7)
Backdrop Filter: blur(14px)
Border: 1px solid rgba(212,175,55,0.1)
```

### Navigation Layout

- **Left**: Logo (MEDUSA in Playfair, gold)
- **Center/Right**: Menu items (Inter, white/gold states)
- **Far Right**: Language toggle + "Book Now" CTA
- **Sticky**: On scroll with glassmorphic effect

---

## MICROINTERACTIONS

### Gold Glow Effects (ONLY ALLOWED SHADOWS)

```css
Standard: 0 0 20px rgba(212, 175, 55, 0.3)
Strong:   0 0 30px rgba(212, 175, 55, 0.4)
Subtle:   0 0 10px rgba(212, 175, 55, 0.2)
```

### Transition Standards

- **Duration**: 0.3s
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **NO drop shadows** - gold glow ONLY
- **NO generic Builder.io effects**

---

## ACCESSIBILITY REQUIREMENTS

### WCAG AA Compliance

- **Contrast Ratios**: All text meets AA standards
- **Touch Targets**: 44px minimum for ALL interactive elements
- **Keyboard Navigation**: Full support with visible focus states
- **ARIA Labels**: All controls properly labeled
- **Skip Links**: Available for screen readers

### Focus States

- **Gold outline**: 2px solid #D4AF37
- **Gold glow**: Apply on focus
- **Visible indicators**: Never hidden

---

## RESPONSIVE BREAKPOINTS

### Test Points (MANDATORY)

```css
320px: Mobile portrait (minimum)
375px: Mobile standard
768px: Tablet portrait
1200px: Desktop standard
```

### Layout Behavior

- **NO chaos on resize** - elements maintain perfect positioning
- **NO floating elements** that break layout
- **NO layout jumps** during window resizing
- **Grid alignment maintained** at all breakpoints
- **Text remains readable** and properly spaced
- **Touch targets remain 44px+** on all screen sizes

---

## SECTION LAYOUT REQUIREMENTS

### Hero Section

- **Edge-to-edge**: Full viewport width
- **Cinematic**: High-impact imagery
- **Content**: Headline + value prop + gold CTA
- **Trust badges**: Immediately below (25+ years, stars, certs)

### Service Grid

- **Layout**: 3-4 desktop, 2 tablet, 1 mobile
- **Each card**: Photo + name + description + price + gold CTA
- **Consistent spacing**: 32px gutters

### Artist Grid

- **Portraits**: Identical lighting/crop
- **Content**: Name + role + genres (badges) + bio + book CTA
- **Highlight**: "Artist of the Month" chrome border

### Testimonials

- **Real reviews**: Anonymized with initials only
- **NO full names/photos** without written consent
- **Carousel format**: With proper navigation

---

## CTA REQUIREMENTS

### "Book Now" Buttons

- **Color**: Gold background (#D4AF37)
- **Text**: Black (#222222)
- **Style**: Bold and obvious
- **Placement**: At every key decision point
- **Hover**: Gold glow effect + color shift

### Button Specifications

```css
Background: #D4AF37
Color: #222222
Font: Inter, 500 weight
Min-height: 44px
Padding: 12px 24px
Border-radius: 10px
Transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
```

---

## IMAGERY STANDARDS

### Photo Requirements

- **Professional only**: Color-graded, high-resolution
- **Retina-ready**: 2x resolution minimum
- **Cinema-lit**: Professional lighting setup
- **Consistent crop**: Same ratios across grids
- **NO placeholders**: Real content or "coming soon"

### Image Formats

- **WebP**: Primary format for web
- **PNG**: Fallback for compatibility
- **NO JPEG**: Unless specifically required

---

## BOOKING FLOW SPECIFICATIONS

### Multi-Step Process

1. **Pick Artist**: Grid with photos
2. **Pick Service**: Clear options
3. **Pick Date/Time**: Calendar interface
4. **Details**: Form with validation
5. **Legal/Consent**: EN/DE, e-sign capability
6. **Aftercare**: PDF download

### Form Standards

- **Fields**: 44px+ height, left-aligned
- **Labels**: Above inputs (not placeholder)
- **Focus**: Gold outline on active field
- **Progress**: Visual indicator above form
- **Help**: WhatsApp sticky on every step

---

## GALLERY SPECIFICATIONS

### Grid Layout

- **Desktop**: 3 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column
- **Aspect Ratio**: Consistent across all images
- **Quality**: Professional only, no stretching

### Filter System

- **Categories**: Genres/artists
- **Active State**: Gold highlight
- **Smooth Transitions**: Between filtered states

### Special Features

- **3D View**: Gold-framed embed at bottom
- **Before/After**: Slider with gold/chrome controls

---

## LEGAL & COMPLIANCE

### GDPR Requirements

- **Multi-language**: EN/DE support
- **Clear notices**: Privacy policy visible
- **Downloadable**: PDF versions available
- **Consent**: Proper e-signature capability

### Content Requirements

- **Real content**: No lorem ipsum or placeholders
- **Professional copy**: Appropriate for luxury brand
- **Mark gaps**: "Coming soon" for future features

---

## QUALITY ASSURANCE CHECKLIST

### Before Every Release

- [ ] Background is ONLY #222222
- [ ] Only 4 brand colors used (no blue/green/purple/red)
- [ ] Typography uses Playfair + Inter only
- [ ] 12-column grid alignment perfect
- [ ] 44px+ touch targets throughout
- [ ] Gold glow effects only (no other shadows)
- [ ] WCAG AA contrast ratios met
- [ ] Keyboard navigation functional
- [ ] Tested on 320/375/768/1200px breakpoints
- [ ] No layout chaos during resize
- [ ] Professional imagery only
- [ ] Real content (no placeholders)
- [ ] Multi-language support working
- [ ] Book Now CTAs prominent and functional

### Device Testing Matrix

```
iPhone SE (320px): Layout integrity
iPhone 12 (375px): Touch target sizes
iPad (768px): Grid transitions
Desktop (1200px+): Full 12-column layout
```

---

## TECHNICAL IMPLEMENTATION

### CSS Architecture

- **Custom Properties**: Use CSS variables for all brand tokens
- **Utility Classes**: Create reusable components
- **Component System**: Modular, maintainable code
- **Performance**: Optimize for fast loading

### File Organization

```
/styles/globals.css - Brand tokens & base styles
/components/ - Reusable UI components
/guidelines/ - Documentation & standards
```

---

## BRAND VIOLATIONS - IMMEDIATE CORRECTION REQUIRED

### Common Issues to Avoid

❌ Using any color outside the 4-color palette
❌ Generic fonts or fallbacks
❌ Off-grid alignment or floating elements
❌ Touch targets under 44px
❌ Drop shadows or non-gold effects
❌ Layout chaos on resize
❌ Placeholder content or generic imagery
❌ Accessibility violations

### Reporting Issues

Any violation of these guidelines should be flagged immediately for correction. The luxury brand aesthetic and professional standards must be maintained throughout every aspect of the website.

---

**REMEMBER**: This is a LUXURY BRAND. Every pixel, every interaction, every piece of content must reflect the highest professional standards. No compromises, no exceptions.