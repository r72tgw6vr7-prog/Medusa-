# PHASE 3: IMPLEMENTATION PLAN
**Date:** November 8, 2025  
**Goal:** Apply Services page design system to ALL other pages

---

## 🎯 OBJECTIVE

Take the **perfect** Services page design and replicate it across:
- ✅ Homepage
- ✅ About/Studio page
- ✅ Artists page
- ✅ Gallery page
- ✅ Contact page
- ✅ FAQ page
- ✅ Legal pages

---

## 📋 PRE-FLIGHT CHECKLIST

Before starting, ensure you have:

1. ✅ Read `DESIGN_SYSTEM_COMPLETE_ANALYSIS.md`
2. ✅ Reviewed `design-system-extraction.ts`
3. ✅ Identified target pages that need updates
4. ✅ Created backups of current pages (if needed)

---

## 🔧 IMPLEMENTATION STRATEGY

### Step 1: Audit Current Pages

For each page, document:
- Current spacing inconsistencies
- Typography mismatches
- Color deviations
- Layout issues

### Step 2: Create Page-Specific Token Mappings

Map Services page patterns to each page's unique needs:

```typescript
// Example: Homepage hero section
const heroTokens = {
  spacing: {
    sectionGap: MedusaDesignSystem.spacing.gap.lg,  // 64px
    titleToSubtitle: MedusaDesignSystem.spacing.margin.elementGap.default,  // 32px
  },
  typography: {
    title: MedusaDesignSystem.typography.fontSize.h1,
    subtitle: MedusaDesignSystem.typography.fontSize.body.large,
  },
  colors: {
    title: MedusaDesignSystem.colors.text.gold,
    subtitle: MedusaDesignSystem.colors.text.muted,
  }
};
```

### Step 3: Update Components Systematically

Priority order:
1. **Typography** - Fix font families, sizes, weights
2. **Spacing** - Apply 8px grid system
3. **Colors** - Match opacity and color usage
4. **Borders & Shadows** - Apply consistent styling
5. **Responsive** - Ensure proper breakpoint behavior

---

## 📝 PAGE-BY-PAGE BREAKDOWN

### Homepage

**Issues to Fix:**
- Inconsistent card spacing
- Typography hierarchy unclear
- Some sections misaligned

**Actions:**
1. Apply Services page card structure to all card components
2. Use consistent `gap-8` and `gap-16` throughout
3. Match heading sizes to Services page scale
4. Ensure all labels are uppercase with tracking

**Target Classes to Apply:**
```typescript
// Hero section
className: "text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]"

// Cards
className: "rounded-3xl border-2 border-white/10 p-8 gap-8"

// Section spacing
className: "flex flex-col gap-16"
```

---

### Artists Page

**Issues to Fix:**
- Artist card positioning inconsistent
- Spacing between cards varies
- Typography doesn't match Services

**Actions:**
1. Apply Services card padding: `px-8 py-10`
2. Use `gap-8` for grid (32px)
3. Match artist name font size to Services h3
4. Ensure responsive grid matches Services pattern

**Reference:**
```typescript
// Artist grid (same pattern as category cards)
className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"

// Artist card
className: "rounded-2xl border-2 border-white/10 px-8 py-10"
```

---

### Gallery Page

**Issues to Fix:**
- Image card spacing
- Filter button styling
- Category labels

**Actions:**
1. Match filter buttons to Services category card buttons
2. Apply consistent image card borders and radius
3. Use Services spacing for grid gaps

---

### Contact Page

**Issues to Fix:**
- Form field spacing
- Button styling
- Typography in form labels

**Actions:**
1. Apply Services button styling
2. Match input padding to card padding
3. Use consistent label typography (uppercase, tracking)

---

## 🎨 REUSABLE COMPONENT PATTERNS

### Pattern 1: Card Component

```typescript
// Base card structure from Services page
<div className="flex flex-col h-full rounded-3xl border-2 border-white/10 bg-[#222222] p-8 gap-8">
  {/* Header */}
  <div className="flex items-center justify-between">
    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand-gold)]/80">
      {badge}
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

  {/* CTA */}
  <Button className="w-full rounded-xl px-8 py-4 text-lg font-semibold">
    {cta}
  </Button>
</div>
```

### Pattern 2: Section Header

```typescript
// From Services page header
<div className="text-center space-y-8">
  <p className="text-sm uppercase tracking-[0.3em] text-white/50 font-semibold">
    {label}
  </p>
  <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]">
    {title}
  </h1>
  <p className="text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed">
    {subtitle}
  </p>
</div>
```

### Pattern 3: Grid Layout

```typescript
// Category card grid pattern
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// Service card grid pattern
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

### Pattern 4: Button Styling

```typescript
// Primary button (gold)
<Button 
  variant="gold"
  className="w-full rounded-xl px-8 py-4 text-lg font-semibold"
>
  {text}
</Button>

// Secondary button (outline gold)
<Button 
  variant="outlineGold"
  className="w-full rounded-xl px-8 py-4 text-lg font-semibold"
>
  {text}
</Button>
```

---

## 🚀 EXECUTION PLAN

### Week 1: Foundation
- [ ] Update shared components (Button, Card, etc.)
- [ ] Create reusable spacing utilities
- [ ] Update typography utilities

### Week 2: Major Pages
- [ ] Homepage redesign
- [ ] Artists page update
- [ ] Gallery page update

### Week 3: Secondary Pages
- [ ] Contact page
- [ ] FAQ page
- [ ] About page

### Week 4: Polish & QA
- [ ] Responsive testing
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Performance optimization

---

## ✅ QUALITY ASSURANCE CHECKLIST

For each updated page, verify:

### Spacing
- [ ] All gaps are 8px, 16px, 32px, or 64px
- [ ] Card padding matches Services page
- [ ] Section spacing is consistent (64px)
- [ ] No arbitrary spacing values

### Typography
- [ ] Headings use Playfair Display
- [ ] Body text uses Inter
- [ ] Font sizes match the scale
- [ ] Labels are uppercase with tracking
- [ ] Line heights are correct

### Colors
- [ ] Gold used for accents (#D4AF37)
- [ ] Text opacity follows hierarchy
- [ ] Borders are white/10 or gold
- [ ] Backgrounds are #222222 for cards

### Components
- [ ] 2px borders on all cards
- [ ] Correct border radius (24px, 16px, 12px)
- [ ] Icons are proper size
- [ ] Shadows match Services page

### Responsive
- [ ] Mobile-first implementation
- [ ] Breakpoints at 640px, 768px, 1024px
- [ ] Grid adjusts properly
- [ ] Typography scales correctly

### Animations
- [ ] Transitions are 200-300ms
- [ ] Hover states scale to 1.02
- [ ] Focus states have gold ring
- [ ] Page transitions use fade-in-up

---

## 📊 TRACKING PROGRESS

Create a tracking sheet:

| Page | Spacing | Typography | Colors | Components | Responsive | Status |
|------|---------|------------|--------|------------|------------|--------|
| Homepage | 🔴 | 🔴 | 🟡 | 🔴 | 🟡 | In Progress |
| Artists | 🟡 | 🔴 | 🟢 | 🟡 | 🟢 | Not Started |
| Gallery | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | Not Started |
| Contact | 🔴 | 🔴 | 🟡 | 🟡 | 🟡 | Not Started |
| FAQ | 🔴 | 🔴 | 🔴 | 🔴 | 🔴 | Not Started |

Legend: 🟢 Perfect | 🟡 Needs Work | 🔴 Not Started

---

## 🛠️ TOOLS & UTILITIES

### Create Spacing Utility

```typescript
// src/utils/spacing.ts
export const spacing = {
  xs: '8px',
  sm: '16px',
  md: '32px',
  lg: '64px',
  xl: '128px',
} as const;

export const useSpacing = (size: keyof typeof spacing) => spacing[size];
```

### Create Typography Utility

```typescript
// src/utils/typography.ts
export const getFontClass = (variant: 'h1' | 'h2' | 'h3' | 'body') => {
  const classes = {
    h1: 'font-headline text-5xl md:text-6xl lg:text-7xl font-bold',
    h2: 'font-headline text-3xl md:text-4xl font-bold',
    h3: 'font-headline text-2xl md:text-3xl font-bold',
    body: 'font-body text-base leading-7',
  };
  return classes[variant];
};
```

---

## 🎯 SUCCESS METRICS

After implementation, verify:

1. **Visual Consistency:** All pages look like they're part of the same design system
2. **Spacing Uniformity:** No random spacing values, everything on 8px grid
3. **Typography Hierarchy:** Clear visual hierarchy on all pages
4. **Component Reusability:** 90%+ of components use shared patterns
5. **Responsive Quality:** Perfect at all breakpoints (mobile, tablet, desktop)
6. **Performance:** No degradation in load times

---

## 📚 REFERENCE DOCUMENTS

- `DESIGN_SYSTEM_COMPLETE_ANALYSIS.md` - Full extraction
- `design-system-extraction.ts` - Token reference
- `src/styles/design-system.css` - CSS variables
- `tailwind.config.mjs` - Tailwind configuration

---

## 🆘 TROUBLESHOOTING

### Issue: Spacing looks off
**Solution:** Verify you're using the 8px grid (8, 16, 32, 64)

### Issue: Typography doesn't match
**Solution:** Check font family (Playfair for headings, Inter for body)

### Issue: Colors seem wrong
**Solution:** Use CSS variables (var(--brand-gold), not hardcoded hex)

### Issue: Responsive breaks
**Solution:** Follow Services page breakpoint pattern (sm:640px, md:768px, lg:1024px)

---

**Ready to start Phase 3? Begin with the Homepage!**
