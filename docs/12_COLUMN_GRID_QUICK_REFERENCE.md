# 12-COLUMN GRID - QUICK REFERENCE

**Sacred Rule:** NEVER change the 12-column count  
**Last Updated:** October 18, 2025

---

## QUICK SPECS

| Breakpoint | Container | Padding | Content | Gap | Columns | Column Width |
|------------|-----------|---------|---------|-----|---------|--------------|
| **Desktop (1200px)** | 1200px | 48px × 2 | 1104px | 24px | 12 | 70px |
| **Tablet (768px)** | 768px | 32px × 2 | 704px | 24px | 12 | 36.67px |
| **Mobile (393px)** | 393px | 24px × 2 | 345px | 16px | 12 | 14.08px |

---

## BASIC USAGE

```html
<!-- Step 1: Container -->
<div class="primitive-container">
  
  <!-- Step 2: Grid -->
  <div class="primitive-grid-12-column">
    
    <!-- Step 3: Span columns -->
    <div class="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-4">
      <!-- Your content here -->
    </div>
    
  </div>
</div>
```

---

## COMMON PATTERNS

### Full Width Content
```html
<div class="grid-span-mobile-12 grid-span-tablet-12 grid-span-desktop-12">
  <!-- Hero sections, full-width images -->
</div>
```

### 4 Cards Desktop, 2 Tablet, 1 Mobile
```html
<!-- Card 1 -->
<div class="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-3">
  <!-- 12 cols mobile, 6 cols tablet, 3 cols desktop -->
</div>

<!-- Card 2 -->
<div class="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-3">
  <!-- Repeat 4 times for 4 cards -->
</div>
```

### Content + Sidebar (8-4 Split)
```html
<!-- Main content -->
<div class="grid-span-mobile-12 grid-span-tablet-12 grid-span-desktop-8">
  <!-- 8 columns = 66.67% width -->
</div>

<!-- Sidebar -->
<div class="grid-span-mobile-12 grid-span-tablet-12 grid-span-desktop-4">
  <!-- 4 columns = 33.33% width -->
</div>
```

### Gallery Grid (4-3-2)
```html
<!-- Each gallery item -->
<div class="grid-span-mobile-6 grid-span-tablet-4 grid-span-desktop-3">
  <!-- Mobile: 2/row (6 cols), Tablet: 3/row (4 cols), Desktop: 4/row (3 cols) -->
</div>
```

---

## COLUMN SPAN REFERENCE

### Desktop Layouts (1200px)

| Columns | Width % | Cards/Row | Use Case |
|---------|---------|-----------|----------|
| 3 | 25% | 4 | Service cards, small items |
| 4 | 33.33% | 3 | Artist cards, medium items |
| 6 | 50% | 2 | Featured items, two-column |
| 8 | 66.67% | 1 | Main content area |
| 9 | 75% | 1 | Wide content |
| 10 | 83.33% | 1 | Centered hero content |
| 12 | 100% | 1 | Full width sections |

### Tablet Layouts (768px)

| Columns | Width % | Cards/Row | Use Case |
|---------|---------|-----------|----------|
| 6 | 50% | 2 | Two-column layout |
| 12 | 100% | 1 | Full width, stacked content |

### Mobile Layouts (393px)

| Columns | Width % | Cards/Row | Use Case |
|---------|---------|-----------|----------|
| 6 | 50% | 2 | Small cards, icons |
| 12 | 100% | 1 | Full width (most content) |

---

## CSS TOKENS

```css
/* Desktop (1200px) */
--grid-container-desktop: 1200px;
--grid-padding-desktop: 48px;
--grid-content-desktop: 1104px;
--grid-gap-desktop: 24px;
--grid-column-width-desktop: 70px;

/* Tablet (768px) */
--grid-container-tablet: 768px;
--grid-padding-tablet: 32px;
--grid-content-tablet: 704px;
--grid-gap-tablet: 24px;
--grid-column-width-tablet: 36.67px;

/* Mobile (393px) */
--grid-container-mobile: 393px;
--grid-padding-mobile: 24px;
--grid-content-mobile: 345px;
--grid-gap-mobile: 16px;
--grid-column-width-mobile: 14.08px;

/* Universal */
--grid-columns: 12; /* SACRED - NEVER CHANGE */
```

---

## UTILITY CLASSES

### Column Spanning
```css
/* Mobile */
.grid-span-mobile-1 through .grid-span-mobile-12

/* Tablet */
.grid-span-tablet-1 through .grid-span-tablet-12

/* Desktop */
.grid-span-desktop-1 through .grid-span-desktop-12
```

### Grid Positioning
```css
/* Start positions */
.grid-start-1 through .grid-start-12

/* End positions */
.grid-end-1 through .grid-end-13 (13 = end of column 12)
```

### Pre-built Layouts
```css
.grid-responsive-cards     /* Auto-responsive: 1→2→4 cards */
.grid-cards-4-desktop      /* 4 cards desktop, responsive */
.grid-content-sidebar      /* 8-4 split desktop, stacked mobile */
.grid-hero-centered        /* Centered hero content */
.grid-gallery              /* Gallery grid: 2→3→4 items */
.grid-footer               /* 5-column footer layout */
```

---

## MATHEMATICAL FORMULAS

### Calculate Column Width
```
Column Width = (Content Width - (Gaps × Gap Size)) ÷ 12

Desktop:
= (1104px - (11 × 24px)) ÷ 12
= (1104px - 264px) ÷ 12
= 840px ÷ 12
= 70px

Tablet:
= (704px - (11 × 24px)) ÷ 12
= (704px - 264px) ÷ 12
= 440px ÷ 12
= 36.67px

Mobile:
= (345px - (11 × 16px)) ÷ 12
= (345px - 176px) ÷ 12
= 169px ÷ 12
= 14.08px
```

### Calculate Total Width
```
Total Width = (Columns × Column Width) + (Gaps × Gap Size)

Desktop:
= (12 × 70px) + (11 × 24px)
= 840px + 264px
= 1104px ✓

Tablet:
= (12 × 36.67px) + (11 × 24px)
= 440px + 264px
= 704px ✓

Mobile:
= (12 × 14.08px) + (11 × 16px)
= 169px + 176px
= 345px ✓
```

---

## VALIDATION RULES

### ✓ ALWAYS
- Use 12 columns (SACRED NUMBER)
- Use container + grid components together
- Span columns divisible by 12 (1, 2, 3, 4, 6, 12)
- Use spacing tokens for gaps (16px, 24px)
- Center grid within container

### ❌ NEVER
- Change the 12-column count
- Nest grids inside grids
- Use fixed pixel widths on grid items
- Override grid-template-columns
- Use spans that don't divide evenly (5, 7, 8, 9, 10, 11)

---

## BREAKPOINT BEHAVIOR

### Mobile (393px)
```
Container: 393px max-width
Padding: 24px left/right
Content: 345px
Grid: 12 columns × 14.08px
Gap: 16px

Typical usage:
- Full width cards (12 columns)
- Two small cards (6 columns each)
```

### Tablet (768px)
```
Container: 768px max-width
Padding: 32px left/right
Content: 704px
Grid: 12 columns × 36.67px
Gap: 24px

Typical usage:
- Two cards/row (6 columns each)
- Full width content (12 columns)
```

### Desktop (1200px)
```
Container: 1200px max-width
Padding: 48px left/right
Content: 1104px
Grid: 12 columns × 70px
Gap: 24px

Typical usage:
- Four cards/row (3 columns each)
- Three cards/row (4 columns each)
- Two cards/row (6 columns each)
- Content + Sidebar (8 + 4 columns)
```

---

## TROUBLESHOOTING

### Problem: Content doesn't align to grid
**Solution:** Ensure parent uses `.primitive-grid-12-column` and child uses column span classes

### Problem: Cards are different widths
**Solution:** Check that all cards use the same column span class

### Problem: Grid looks broken on mobile
**Solution:** Verify mobile column spans add up to 12 or multiples of 12

### Problem: Too much/little space between items
**Solution:** Check gap values (16px mobile, 24px tablet/desktop)

### Problem: Content too narrow/wide
**Solution:** Verify container padding (24/32/48px) and content widths (345/704/1104px)

---

## CHEAT SHEET

```
12 columns = 100%    (full width)
6 columns = 50%      (half)
4 columns = 33.33%   (third)
3 columns = 25%      (quarter)
2 columns = 16.67%   (sixth)
1 column = 8.33%     (twelfth)

Desktop cards/row:
3 cols × 4 cards = 12 ✓
4 cols × 3 cards = 12 ✓
6 cols × 2 cards = 12 ✓

Tablet cards/row:
6 cols × 2 cards = 12 ✓
12 cols × 1 card = 12 ✓

Mobile cards/row:
6 cols × 2 cards = 12 ✓
12 cols × 1 card = 12 ✓
```

---

**Remember:** The 12-column grid is SACRED. Never change it.
