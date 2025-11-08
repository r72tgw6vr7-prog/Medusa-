# MEDUSA DESIGN TOKENS - QUICK REFERENCE
**Extracted from:** Services Page  
**Date:** November 8, 2025

---

## 🎯 THE GOLDEN RULES

1. **Spacing:** Use 8px, 16px, 32px, or 64px ONLY
2. **Typography:** Playfair for headings, Inter for body
3. **Colors:** Gold (#D4AF37) for accents, white with opacity for text
4. **Borders:** 2px width, 16px or 24px radius
5. **Responsive:** Mobile-first, breakpoints at 640px, 768px, 1024px

---

## 📏 SPACING (8px Grid)

```css
gap-2  = 8px   /* Tight spacing */
gap-4  = 16px  /* Small gaps */
gap-8  = 32px  /* Default spacing ⭐ MOST USED */
gap-16 = 64px  /* Section spacing */

p-8    = 32px  /* Card padding ⭐ */
px-8   = 32px  /* Horizontal padding */
py-10  = 40px  /* Vertical padding (category cards) */
py-4   = 16px  /* Button vertical padding */
```

---

## 📝 TYPOGRAPHY

### Font Families
```css
font-headline  = 'Playfair Display', serif  /* h1, h2, h3 */
font-body      = 'Inter', sans-serif        /* Everything else */
```

### Font Sizes
```css
text-xs   = 12px  /* Labels, badges */
text-sm   = 14px  /* Small text, feature lists */
text-base = 16px  /* Body text ⭐ */
text-lg   = 18px  /* Subtitles, buttons */
text-xl   = 20px  /* Prices */
text-2xl  = 24px  /* Card titles */
text-3xl  = 30px  /* Section titles (mobile) */
text-4xl  = 36px  /* Section titles (desktop) */
text-5xl  = 48px  /* Page title (mobile) */
text-6xl  = 60px  /* Page title (tablet) */
text-7xl  = 72px  /* Page title (desktop) */
```

### Font Weights
```css
font-normal    = 400  /* Body text */
font-medium    = 500  /* Rarely used */
font-semibold  = 600  /* Labels */
font-bold      = 700  /* Headings ⭐ */
```

### Letter Spacing
```css
tracking-[0.2em]  /* Card badges */
tracking-[0.25em] /* Section labels */
tracking-[0.3em]  /* Page subtitle */
```

**Rule:** All uppercase text needs letter-spacing

---

## 🎨 COLORS

### Brand Colors
```css
#D4AF37  /* Gold - Primary accent ⭐ */
#E5C158  /* Gold hover */
#FFFFFF  /* White */
#1A1A1A  /* Deep black */
#222222  /* Surface dark */
```

### Text Opacity
```css
text-white      /* 100% - Main text */
text-white/80   /* 80% - Secondary */
text-white/75   /* 75% - Tertiary */
text-white/70   /* 70% - Muted ⭐ */
text-white/60   /* 60% - Subtle */
text-white/50   /* 50% - Faint */
```

### Usage Pattern
```
Page titles:        Gold
Section titles:     Gold
Card titles (cat):  Gold
Card titles (svc):  White
Descriptions:       white/70
Labels:             white/60 or white/50
```

---

## 🎴 COMPONENT CLASSES

### Category Card
```typescript
"flex flex-col h-full rounded-2xl border-2 border-white/10 px-8 py-10"
```

### Service Card
```typescript
"flex flex-col h-full rounded-3xl border-2 border-white/10 bg-[#222222] p-8 gap-8"
```

### Button
```typescript
"w-full rounded-xl px-8 py-4 text-lg font-semibold"
```

### Page Header
```typescript
// Label
"text-sm uppercase tracking-[0.3em] text-white/50 font-semibold"

// Title
"font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]"

// Subtitle
"text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed"
```

### Section Header
```typescript
// Label
"text-sm uppercase tracking-[0.25em] text-white/60"

// Title
"font-headline text-3xl md:text-4xl text-[var(--brand-gold)]"

// Subtitle
"text-base text-white/70 max-w-2xl mx-auto font-body leading-relaxed"
```

---

## 📱 RESPONSIVE GRIDS

### Category Cards Pattern
```typescript
"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
```

### Service Cards Pattern
```typescript
"grid grid-cols-1 md:grid-cols-3 gap-8"
```

---

## 🎭 STATES

### Hover
```css
hover:scale-[1.02]                 /* Cards */
hover:border-[var(--brand-gold)]/80 /* Borders */
```

### Active/Premium
```css
border-[var(--brand-gold)]
scale-[1.02]
shadow-[0_0_32px_rgba(212,175,55,0.45)]
```

### Focus
```css
focus-visible:ring-2
focus-visible:ring-[var(--brand-gold)]
focus-visible:ring-offset-4
```

---

## ⚡ TRANSITIONS

```css
transition-transform duration-300  /* Cards */
transition-all duration-300        /* Card states */
transition-all duration-200        /* Buttons */
```

---

## 📐 BORDERS & RADIUS

```css
border-2      /* All cards */

rounded-3xl   /* 24px - Service cards */
rounded-2xl   /* 16px - Category cards */
rounded-xl    /* 12px - Buttons */
rounded-full  /* 9999px - Icon containers */
```

---

## 🎯 COPY-PASTE SNIPPETS

### Full Card Component
```tsx
<div className="flex flex-col h-full rounded-3xl border-2 border-white/10 bg-[#222222] p-8 gap-8">
  <div className="flex items-center justify-between">
    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]/80">
      Badge
    </span>
  </div>
  <h3 className="font-headline text-2xl md:text-3xl text-white">
    Title
  </h3>
  <p className="text-base leading-7 text-white/70 flex-1 font-body">
    Description
  </p>
  <Button variant="gold" className="w-full rounded-xl px-8 py-4 text-lg font-semibold">
    CTA
  </Button>
</div>
```

### Full Page Header
```tsx
<div className="text-center space-y-8">
  <p className="text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
    Label
  </p>
  <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]">
    Page Title
  </h1>
  <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed">
    Subtitle text
  </p>
</div>
```

---

## ✅ PRE-FLIGHT CHECKLIST

Before applying design to any page:

- [ ] Using 8px grid for spacing?
- [ ] Playfair for headings, Inter for body?
- [ ] All labels uppercase with tracking?
- [ ] Text opacity correct (70% for descriptions)?
- [ ] Cards have 2px borders?
- [ ] Border radius matches (24px or 16px)?
- [ ] Responsive grid configured?
- [ ] Transitions added (200-300ms)?

---

**Quick Tip:** When in doubt, copy the exact classes from ServicesPageInteractive.tsx!

**Full Documentation:**
- `DESIGN_SYSTEM_COMPLETE_ANALYSIS.md` - Deep dive
- `design-system-extraction.ts` - Token reference
- `PHASE3_IMPLEMENTATION_PLAN.md` - Action plan
