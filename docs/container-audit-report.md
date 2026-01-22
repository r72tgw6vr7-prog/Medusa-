# Container/Section Nesting Audit Report

**Generated:** 2026-01-22
**Auditor:** Claude Opus 4.5

---

## Executive Summary

| Metric | Value |
|--------|-------|
| Total Pages Scanned | 12 |
| Pages with Violations | 11 |
| Total Violations | 47 |
| CSS Class Violations | 26 |
| Box-in-Box Nesting | 12 |
| Wrong Breakpoints (`sm:` → `md:`) | 6 |
| Components Already Compliant | 3 (Footer, GallerySection, PricingSection) |

---

## Canonical Pattern Reference

**Correct:**
```tsx
<Section variant="default" spacing="normal">
  <Container size="default">
    {content}
  </Container>
</Section>
```

**Wrong Patterns:**
- CSS classes: `responsive-container`, `safe-area-padding`, `section-padding`
- Box-in-box: `<Container><Container>...</Container></Container>`
- Wrong breakpoints: `sm:px-6` (should be `md:px-6`)

---

## Pages Scanned (Priority 6)

### 1. GalleryPage (`/gallery`)

**File:** [src/pages/GalleryPage.tsx](src/pages/GalleryPage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 24 | CSS class | `<section className='section-padding'>` |
| 25 | CSS class | `<div className='responsive-container safe-area-padding'>` |
| 26 | Box-in-box (3 levels) | `<div className='mx-auto w-full max-w-276'>` |
| 37 | CSS class | `<section className='section-padding'>` |
| 38 | CSS class | `<div className='responsive-container safe-area-padding'>` |

**Summary:** 5 violations (2 section-padding, 2 responsive-container, 1 box-in-box)

---

### 2. ArtistsPage (`/artists`)

**File:** [src/pages/ArtistsPage.tsx](src/pages/ArtistsPage.tsx)

The page delegates to `TeamGrid` component.

**File:** [src/components/pages/TeamGrid.tsx](src/components/pages/TeamGrid.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 208 | CSS class | `className="section-padding"` |
| 211 | CSS class | `<div className="responsive-container safe-area-padding">` |
| 212 | Box-in-box (3 levels) | `<div className="mx-auto w-full max-w-7xl">` |

**Summary:** 3 violations (1 section-padding, 1 responsive-container, 1 box-in-box)

---

### 3. ContactPage (`/contact`)

**File:** [src/pages/ContactPage.tsx](src/pages/ContactPage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 85 | CSS class | `<div className='responsive-container safe-area-padding'>` |
| 96 | CSS class | `<div className='responsive-container safe-area-padding'>` |
| 123 | CSS class | `<div className='responsive-container safe-area-padding'>` |
| 152 | CSS class | `<div className='responsive-container safe-area-padding'>` |
| 190 | CSS class | `<div className='responsive-container safe-area-padding'>` |

**Summary:** 5 violations (5 responsive-container - no Section/Container used at all)

---

### 4. HomePage (`/`)

**File:** [src/pages/HomePage.tsx](src/pages/HomePage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| — | No direct violations | Uses `SectionTransitionWrapper` which delegates to child components |

**Note:** HomePage itself is clean but relies on child components (BladeAccordion, StudioCarousel, etc.) which may have their own patterns. The pattern used is acceptable for a composition page.

**Summary:** 0 direct violations (child components handle their own layout)

---

### 5. TattooServicesPage (`/services/tattoos`)

**File:** [src/components/pages/TattooServicesPage.tsx](src/components/pages/TattooServicesPage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 279 | CSS class | `<section className='section-padding'>` |
| 280 | CSS class | `<div className='responsive-container safe-area-padding'>` |
| 281 | Box-in-box (3 levels) | `<div className='mx-auto w-full max-w-container-main'>` |
| 289 | Wrong breakpoint | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| 357 | Manual container | `<div className='w-full max-w-container-packages mx-auto px-4 md:px-6 lg:px-12'>` |

**Summary:** 5 violations (1 section-padding, 1 responsive-container, 1 box-in-box, 1 wrong breakpoint, 1 manual container)

---

### 6. PiercingServicesPage (`/services/piercings`)

**File:** [src/components/pages/PiercingServicesPage.tsx](src/components/pages/PiercingServicesPage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 288 | CSS class | `<section className='section-padding'>` |
| 289 | CSS class | `<div className='responsive-container safe-area-padding'>` |
| 290 | Box-in-box (3 levels) | `<div className='mx-auto w-full max-w-container-main'>` |
| 306 | Wrong breakpoint | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| 373 | Manual container | `<div className='w-full px-6 lg:px-12'>` (no max-width, inconsistent padding) |

**Summary:** 5 violations (1 section-padding, 1 responsive-container, 1 box-in-box, 1 wrong breakpoint, 1 manual container)

---

## Additional Pages Scanned

### 7. AftercarePage (`/aftercare`)

**File:** [src/pages/AftercarePage.tsx](src/pages/AftercarePage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 56-58 | CSS class + box-in-box | `section-padding` + `responsive-container` + `mx-auto max-w-276` |
| 77-79 | CSS class + box-in-box | Same pattern |
| 163-165 | CSS class + box-in-box | Same pattern |
| 244-246 | CSS class + box-in-box | Same pattern |
| 295 | Wrong breakpoint | `py-16 px-8 sm:px-8 lg:px-8` |
| 296 | Manual container | `<div className='max-w-4xl mx-auto'>` |
| 332-334 | CSS class + box-in-box | Same pattern |

**Summary:** 12 violations (5 section-padding, 5 responsive-container, 5 box-in-box, 1 wrong breakpoint, 1 manual container)

---

### 8. BookingPage (`/booking`)

**File:** [src/pages/BookingPage.tsx](src/pages/BookingPage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 23 | CSS class | `<div className='responsive-container safe-area-padding'>` |
| 34-35 | CSS class + box-in-box | `responsive-container` + `max-w-4xl mx-auto` |

**Summary:** 3 violations (2 responsive-container, 1 box-in-box)

---

### 9. AGBPage (`/agb`)

**File:** [src/pages/AGBPage.tsx](src/pages/AGBPage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 12 | CSS class | `<section className='section-padding'>` |
| 13 | CSS class | `<div className='responsive-container safe-area-padding'>` |

**Summary:** 2 violations (1 section-padding, 1 responsive-container)

---

### 10. ImpressumPage (`/impressum`)

**File:** [src/pages/ImpressumPage.tsx](src/pages/ImpressumPage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 124 | CSS class | `<section className='section-padding'>` |
| 125 | CSS class | `<div className='responsive-container safe-area-padding'>` |

**Summary:** 2 violations (1 section-padding, 1 responsive-container)

---

### 11. DatenschutzPage (`/datenschutz`)

**File:** [src/pages/DatenschutzPage.tsx](src/pages/DatenschutzPage.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 166 | CSS class | `<section className='section-padding'>` |
| 167 | CSS class | `<div className='responsive-container safe-area-padding'>` |

**Summary:** 2 violations (1 section-padding, 1 responsive-container)

---

### 12. FAQPageNew (`/faq`)

**File:** [src/pages/FAQPageNew.tsx](src/pages/FAQPageNew.tsx)

| Line | Violation Type | Code |
|------|----------------|------|
| 102 | CSS class | `<section className='section-padding'>` |
| 103 | CSS class | `<div className='responsive-container safe-area-padding'>` |

**Summary:** 2 violations (1 section-padding, 1 responsive-container)

---

## Components Already Compliant ✅

| Component | File | Pattern Used |
|-----------|------|--------------|
| Footer | [src/components/pages/Footer.tsx](src/components/pages/Footer.tsx) | `<footer><Container>...</Container></footer>` |
| GallerySection | [src/sections/GallerySection.tsx](src/sections/GallerySection.tsx) | `<Section><Container>...</Container></Section>` |
| PricingSection | [src/components/PricingSection.tsx](src/components/PricingSection.tsx) | `<Container>...</Container>` |
| TrustSignalsSection | [src/sections/TrustSignalsSection.tsx](src/sections/TrustSignalsSection.tsx) | `<Section><Container>...</Container></Section>` |

---

## Other Components with Violations

| Component | File | Violation |
|-----------|------|-----------|
| MainNavigation | [src/components/molecules/MainNavigation.tsx:213](src/components/molecules/MainNavigation.tsx#L213) | `sm:px-8` (wrong breakpoint) |
| TestimonialsCarousel | [src/components/organisms/TestimonialsCarousel.tsx:55](src/components/organisms/TestimonialsCarousel.tsx#L55) | `responsive-container safe-area-padding` |
| ArtistSection | [src/sections/ArtistSection.tsx:35,53](src/sections/ArtistSection.tsx#L35) | `sm:px-6`, `sm:grid-cols-2` |
| ServicesPageInteractive | [src/components/pages/ServicesPageInteractive.tsx:234-235](src/components/pages/ServicesPageInteractive.tsx#L234) | `section-padding`, `responsive-container` |

---

## Container.tsx Documentation Bug

**File:** [src/components/ui/Container.tsx](src/components/ui/Container.tsx)

| Line | Issue |
|------|-------|
| 27 | Comment says `sm:px-6` but implementation uses `md:px-6` (correct) |

**Fix:** Update comment from `sm (tablet): sm:px-6` → `md (tablet): md:px-6`

---

## Violation Summary by Type

| Type | Count | Files Affected |
|------|-------|----------------|
| `responsive-container` class | 14 | 12 files |
| `safe-area-padding` class | 14 | 12 files |
| `section-padding` class | 12 | 10 files |
| Box-in-box nesting (3+ levels) | 12 | 8 files |
| Wrong breakpoint (`sm:` → `md:`) | 6 | 5 files |
| Manual container classes | 3 | 3 files |

---

## Recommended Fix Order

### Phase 1: Priority 6 Pages (Core Routes)
1. **GalleryPage** - Simplest structure, good starting point
2. **ArtistsPage/TeamGrid** - Single component delegation
3. **ContactPage** - Multiple sections, all use same pattern
4. **TattooServicesPage** - Complex with Swiper integration
5. **PiercingServicesPage** - Similar to TattooServicesPage

### Phase 2: Legal/Support Pages
6. **AGBPage**
7. **ImpressumPage**
8. **DatenschutzPage**
9. **FAQPageNew**

### Phase 3: Transactional Pages
10. **BookingPage**
11. **AftercarePage** (most complex - 6 sections)

### Phase 4: Cleanup
12. Fix MainNavigation breakpoint
13. Fix TestimonialsCarousel
14. Fix ArtistSection
15. Update Container.tsx comment
16. Delete CSS classes from `design-system.css` and `responsive-layout.css`

---

## CSS Classes to Delete After Migration

From `src/styles/design-system.css`:
```css
/* Lines 168-188 */
.responsive-container { ... }
/* Lines 198-207 */
.safe-area-padding { ... }
```

From `src/styles/responsive-layout.css`:
```css
/* Lines 6-16 */
.responsive-container { ... }
/* Lines 33-37 */
.safe-area-padding { ... }
```

From `src/styles/utility-classes.css`:
```css
/* Lines 74-120 */
.section-padding { ... }
.section-padding-lg { ... }
```

---

## Verification Checklist (Post-Fix)

For each fixed page:
- [ ] `npm run typecheck` passes
- [ ] No runtime errors in browser console
- [ ] 360px viewport: No horizontal scroll, content readable
- [ ] 768px viewport: Tablet padding correct
- [ ] 1024px viewport: Desktop layout unchanged
- [ ] 1920px viewport: Content centered, max-width applied

---

## Approval Required

**STOP** — Please review this audit report and approve before proceeding with fixes.

Reply with:
- ✅ **Approved** — Proceed with Phase 1 fixes
- ❌ **Rejected** — [Reason/modifications needed]
- 🔄 **Partial** — Fix specific pages only: [list pages]
