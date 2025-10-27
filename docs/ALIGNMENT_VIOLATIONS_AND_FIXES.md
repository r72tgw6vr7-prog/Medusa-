# ALIGNMENT VIOLATIONS & SYSTEMATIC FIXES

## CRITICAL VIOLATIONS FOUND

### 1. MAX-WIDTH VIOLATIONS (Must be 1200px)

#### ❌ Components Using Wrong Container Widths:

**1200px violations** (CRITICAL - breaks grid alignment):
- `OurArtists.tsx`: ✅ FIXED - Removed max-w-7xl (1280px)
- `ArtistsPage.tsx`: max-w-7xl (1280px) - Line 435, 464
- `ServiceStyleTemplate.tsx`: max-w-7xl (1280px) - Line 310, 522
- `TrustSignals.tsx`: max-w-7xl (1280px) - Line 6
- `IAFrameTemplates.tsx`: max-w-7xl (1280px) - Line 464
- `StickyBookingCTA.tsx`: max-w-7xl (1280px) - Line 232
- `ArtistDetailPageWithStickyBooking.tsx`: max-w-7xl (1280px) - Line 291
- `ArtistFilterBar.demo.tsx`: max-w-7xl (1280px) - Lines 21, 40, 64, 91

**Other violations**:
- `ServicesPage.tsx`: max-w-4xl (1024px) + max-w-6xl (1152px) - Lines 601, 678
- `ServiceStyleTemplate.tsx`: max-w-4xl (1024px), max-w-6xl (1152px) - Lines 351, 436
- `PrototypeShowcase.tsx`: max-w-4xl (1024px) - Line 412
- `TrustSignals.tsx`: max-w-4xl (1024px) - Line 7
- `ArtistPortfolioGallery.tsx`: max-w-4xl (1024px) - Line 314

**CSS Violations**:
- `.services-transparent-pricing-container`: max-width 1440px (Line 5528 in globals.css)

---

### 2. CUSTOM PADDING VIOLATIONS (Must use primitives)

#### ❌ Hardcoded Responsive Padding:
- `ArtistsPage.tsx`: px-4 sm:px-8 (Lines 435, 464)
- `ServiceStyleTemplate.tsx`: px-4 sm:px-6 lg:px-8 (Lines 310, 351, 436, 522)
- `TrustSignals.tsx`: px-8 (Line 6)
- `ArtistDetailPageWithStickyBooking.tsx`: px-4 sm:px-6 lg:px-8 (Line 291)
- `OurArtists.tsx`: ✅ FIXED - Removed px-4 sm:px-6 lg:px-8

#### ❌ CSS Padding Violations:
- `.services-transparent-pricing-container`: padding 0 48px (mobile: 20px, tablet: 32px, desktop: 80px)
  - Should use primitive-container padding: 24px/32px/48px

---

### 3. CUSTOM GRID VIOLATIONS (Must use 12-column system)

#### ❌ Custom Grid Classes:
- `OurArtists.tsx`: ✅ PARTIALLY FIXED - Still using custom grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- `ArtistsPage.tsx`: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 (Line 466)
- `TrustSignals.tsx`: grid-cols-1 md:grid-cols-3 (Line 7)
- `.services-pricing-grid`: CSS grid-template-columns: repeat(3, 1fr) (Line 5537 in globals.css)

**Should use**:
- `.primitive-grid-12-column` with `.grid-span-mobile-12`, `.grid-span-tablet-6`, `.grid-span-desktop-4`

---

### 4. SPACING VIOLATIONS (Must be divisible by 8px)

#### ❌ Non-8px-divisible spacing:
- `OurArtists.tsx`: 
  - gap-4 lg:gap-8 → gap-4 = 16px ✅, gap-8 = 32px ✅
  - mb-16 lg:mb-20 → mb-20 = 80px (NOT divisible by 8!) ❌
- `ArtistsPage.tsx`:
  - gap-8 lg:gap-10 → gap-10 = 40px ✅, but inconsistent with system
- `.services-pricing-grid`: gap 32px (should be 24px for consistency)

**Fix**: All spacing must use 8/16/24/32/40/48/64/80/96px increments

---

### 5. CARD HEIGHT VIOLATIONS

#### ❌ Heights not divisible by 8px:
- `OurArtists.tsx`: h-[420px] → 420 ÷ 8 = 52.5 ❌ (should be 416px or 424px)
- `.service-pricing-card`: min-height 560px → 560 ÷ 8 = 70 ✅
- Artist cards in various components need audit

**Fix**: All card heights must be: 320px, 400px, 416px, 424px, 480px, etc.

---

## SYSTEMATIC FIX PLAN

### Phase 1: CRITICAL - Fix Container Widths (All 1200px)

**Priority Files:**
1. ✅ OurArtists.tsx - FIXED
2. ArtistsPage.tsx
3. ServicesWithTransparentPricing.tsx (CSS)
4. ServiceStyleTemplate.tsx
5. TrustSignals.tsx

**Action:**
- Remove all `max-w-7xl`, `max-w-6xl`, `max-w-5xl`, `max-w-4xl`
- Let `.primitive-container` handle max-width (1200px)
- Update `.services-transparent-pricing-container` in CSS to max-width: 1200px

---

### Phase 2: CRITICAL - Remove Custom Padding

**Priority Files:**
1. ✅ OurArtists.tsx - FIXED
2. ArtistsPage.tsx
3. ServiceStyleTemplate.tsx
4. TrustSignals.tsx
5. ServicesWithTransparentPricing.tsx (CSS)

**Action:**
- Remove all `px-4 sm:px-6 lg:px-8` patterns
- Let `.primitive-container` handle padding (24px/32px/48px)
- Update CSS padding to match primitive system

---

### Phase 3: HIGH PRIORITY - Convert Grids

**Priority Files:**
1. ✅ OurArtists.tsx - PARTIALLY FIXED (needs full 12-column conversion)
2. ArtistsPage.tsx
3. TrustSignals.tsx
4. ServicesWithTransparentPricing.tsx (CSS)

**Action:**
```tsx
// BEFORE:
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

// AFTER:
<div className="primitive-grid-12-column">
  <div className="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-4">
```

---

### Phase 4: MEDIUM PRIORITY - Fix Spacing

**All Files:**
- Audit all mb-*, mt-*, gap-*, py-*, pt-*, pb-* classes
- Replace non-8px-divisible values
- Standardize gaps: 16px mobile, 24px desktop

**Examples:**
- `mb-20` → `mb-16` or `mb-24`
- `gap-10` → `gap-8` or `gap-12` (32px or 48px)
- Custom `80px` padding → `64px` or `96px`

---

### Phase 5: LOW PRIORITY - Fix Card Heights

**Files:**
- OurArtists.tsx: h-[420px] → h-[416px] or h-[424px]
- All artist cards
- All service cards
- All gallery tiles

**Action:**
- Audit all fixed height values
- Round to nearest 8px divisible number
- Test visual impact

---

## IMPLEMENTATION CHECKLIST

### ✅ COMPLETED:
- [x] OurArtists.tsx - Container and padding removed
- [x] OurArtists.tsx - Wrapped in primitive-grid-12-column
- [x] Created PRIMITIVE_ENFORCEMENT_GUIDE.md
- [x] Created ALIGNMENT_PROBLEM_DIAGNOSIS.md
- [x] Created ALIGNMENT_VIOLATIONS_AND_FIXES.md

### ⚠️ IN PROGRESS:
- [ ] OurArtists.tsx - Full 12-column grid conversion (still using custom cols)
- [ ] OurArtists.tsx - Fix spacing violations (mb-20)
- [ ] OurArtists.tsx - Fix card height (420px → 416px)

### ❌ TODO - PHASE 1 (Container Width):
- [ ] ArtistsPage.tsx - Remove max-w-7xl
- [ ] ServiceStyleTemplate.tsx - Remove all max-w-* violations
- [ ] TrustSignals.tsx - Remove max-w-7xl, max-w-4xl
- [ ] globals.css - Update .services-transparent-pricing-container to 1200px
- [ ] StickyBookingCTA.tsx - Remove max-w-7xl
- [ ] IAFrameTemplates.tsx - Remove max-w-7xl

### ❌ TODO - PHASE 2 (Custom Padding):
- [ ] ArtistsPage.tsx - Remove custom padding
- [ ] ServiceStyleTemplate.tsx - Remove custom padding
- [ ] TrustSignals.tsx - Remove custom padding
- [ ] globals.css - Update .services-transparent-pricing-container padding

### ❌ TODO - PHASE 3 (Grid System):
- [ ] ArtistsPage.tsx - Convert to 12-column grid
- [ ] TrustSignals.tsx - Convert to 12-column grid
- [ ] globals.css - Update .services-pricing-grid to use primitives

### ❌ TODO - PHASE 4 (Spacing):
- [ ] Audit all components for non-8px-divisible spacing
- [ ] Replace lg:mb-20 with mb-16 or mb-24
- [ ] Standardize gaps across all grids

### ❌ TODO - PHASE 5 (Card Heights):
- [ ] OurArtists.tsx - 420px → 416px or 424px
- [ ] Audit all artist cards
- [ ] Audit all service cards

---

## VALIDATION SCRIPT

After each fix, run this validation:

### 1. Container Width Check:
```bash
# Should return ZERO results:
grep -r "max-w-7xl" components/
grep -r "max-w-6xl" components/
grep -r "max-w-5xl" components/
grep -r "max-w-4xl" components/
grep -r "max-width: 1440px" styles/
```

### 2. Padding Check:
```bash
# Should return ZERO results:
grep -r "px-4 sm:px-6 lg:px-8" components/
grep -r "px-4 sm:px-8" components/
```

### 3. Grid Check:
```bash
# Should return ZERO results (except in grid system itself):
grep -r "grid-cols-1 md:grid-cols-2" components/
grep -r "grid-cols-1 md:grid-cols-3" components/
grep -r "grid-cols-1 md:grid-cols-4" components/
```

### 4. Visual Check:
- [ ] All sections align vertically
- [ ] Content width consistent across all pages
- [ ] Horizontal padding consistent
- [ ] Grid columns line up across sections
- [ ] No horizontal overflow on any breakpoint

---

## EXPECTED OUTCOME

After all fixes:
- ✅ All containers: 1200px max-width
- ✅ All padding: 24px mobile, 32px tablet, 48px desktop
- ✅ All grids: 12-column system
- ✅ All spacing: Divisible by 8px
- ✅ All cards: Heights divisible by 8px
- ✅ Perfect vertical alignment across all pages
- ✅ Consistent composition and rhythm
- ✅ Zero custom layout code outside primitives
