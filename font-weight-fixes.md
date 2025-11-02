# Font Weight Consistency Fixes

## Summary
- Total Issues: 62
- Files Affected: 21

## Design Token Reference
```css
:root {
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;
}
```

## Issues and Fixes

### src/components/Button.tsx

**Issue 1** (Line 84): Hardcoded fontWeight: 600

```
fontWeight: 600,
```

**Fix:**
```
fontWeight: designTokens.typography.fontWeight.semibold /* 600 */
```

---

### src/components/Card.tsx

**Issue 1** (Line 137): Hardcoded fontWeight: 600

```
fontWeight: 600,
```

**Fix:**
```
fontWeight: designTokens.typography.fontWeight.semibold /* 600 */
```

---

### src/components/TeamGrid.css

**Issue 1** (Line 18): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 2** (Line 96): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 3** (Line 202): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

---

### src/components/booking/BookingModalMobile.css

**Issue 1** (Line 85): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 2** (Line 169): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

**Issue 3** (Line 187): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 4** (Line 285): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 5** (Line 373): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

**Issue 6** (Line 379): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

**Issue 7** (Line 448): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 8** (Line 474): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

**Issue 9** (Line 535): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

---

### src/components/molecules/LanguageToggle.tsx

**Issue 1** (Line 62): Hardcoded fontWeight: 600

```
fontWeight: 600,
```

**Fix:**
```
fontWeight: designTokens.typography.fontWeight.semibold /* 600 */
```

**Issue 2** (Line 87): Hardcoded fontWeight: 600

```
fontWeight: 600,
```

**Fix:**
```
fontWeight: designTokens.typography.fontWeight.semibold /* 600 */
```

---

### src/components/molecules/NavigationStyles.css

**Issue 1** (Line 49): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 2** (Line 111): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 3** (Line 360): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

---

### src/components/molecules/TrustBadgesMarquee.tsx

**Issue 1** (Line 60): Hardcoded fontWeight: 500

```
fontWeight: 500,
```

**Fix:**
```
fontWeight: designTokens.typography.fontWeight.medium /* 500 */
```

---

### src/components/molecules/TrustSignals.tsx

**Issue 1** (Line 83): Hardcoded fontWeight: 700

```
fontWeight: 700,
```

**Fix:**
```
fontWeight: designTokens.typography.fontWeight.bold /* 700 */
```

**Issue 2** (Line 150): Hardcoded fontWeight: 700

```
fontWeight: 700,
```

**Fix:**
```
fontWeight: designTokens.typography.fontWeight.bold /* 700 */
```

**Issue 3** (Line 217): Hardcoded fontWeight: 700

```
fontWeight: 700,
```

**Fix:**
```
fontWeight: designTokens.typography.fontWeight.bold /* 700 */
```

---

### src/pages/ArtistsPage.css

**Issue 1** (Line 31): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

---

### src/sections/HeroSection.css

**Issue 1** (Line 145): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

---

### src/styles/PricingSection.css

**Issue 1** (Line 96): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

---

### src/styles/button-form-standardization.css

**Issue 1** (Line 16): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 2** (Line 254): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

---

### src/styles/global.css

**Issue 1** (Line 29): Hardcoded font-weight: 400

```
font-weight: 400;
```

**Fix:**
```
font-weight: var(--font-weight-normal); /* 400 */
```

**Issue 2** (Line 42): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

**Issue 3** (Line 112): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

**Issue 4** (Line 218): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 5** (Line 287): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

---

### src/styles/globals.css

**Issue 1** (Line 143): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

**Issue 2** (Line 151): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

**Issue 3** (Line 159): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

**Issue 4** (Line 167): Hardcoded font-weight: 400

```
font-weight: 400;
```

**Fix:**
```
font-weight: var(--font-weight-normal); /* 400 */
```

**Issue 5** (Line 175): Hardcoded font-weight: 400

```
font-weight: 400;
```

**Fix:**
```
font-weight: var(--font-weight-normal); /* 400 */
```

**Issue 6** (Line 242): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 7** (Line 261): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 8** (Line 336): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

---

### src/styles/hero-utilities.css

**Issue 1** (Line 124): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

---

### src/styles/hero.css

**Issue 1** (Line 49): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

---

### src/styles/page-title-spacing.css

**Issue 1** (Line 6): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

---

### src/styles/page-title.css

**Issue 1** (Line 7): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

---

### src/styles/pixel-perfect-responsive.css

**Issue 1** (Line 167): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

---

### src/styles/responsive-layout.css

**Issue 1** (Line 390): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

**Issue 2** (Line 420): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

---

### src/styles/typography-standardization.css

**Issue 1** (Line 13): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

**Issue 2** (Line 27): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 3** (Line 39): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 4** (Line 50): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 5** (Line 60): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 6** (Line 70): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 7** (Line 125): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

**Issue 8** (Line 132): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 9** (Line 229): Hardcoded font-weight: 300

```
font-weight: 300;
```

**Fix:**
```
font-weight: var(--font-weight-light); /* 300 */
```

**Issue 10** (Line 232): Hardcoded font-weight: 400

```
font-weight: 400;
```

**Fix:**
```
font-weight: var(--font-weight-normal); /* 400 */
```

**Issue 11** (Line 235): Hardcoded font-weight: 500

```
font-weight: 500;
```

**Fix:**
```
font-weight: var(--font-weight-medium); /* 500 */
```

**Issue 12** (Line 238): Hardcoded font-weight: 600

```
font-weight: 600;
```

**Fix:**
```
font-weight: var(--font-weight-semibold); /* 600 */
```

**Issue 13** (Line 241): Hardcoded font-weight: 700

```
font-weight: 700;
```

**Fix:**
```
font-weight: var(--font-weight-bold); /* 700 */
```

**Issue 14** (Line 244): Hardcoded font-weight: 800

```
font-weight: 800;
```

**Fix:**
```
font-weight: var(--font-weight-extrabold); /* 800 */
```

---

