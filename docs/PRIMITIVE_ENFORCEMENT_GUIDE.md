# PRIMITIVE ENFORCEMENT GUIDE

## THE PROBLEM

**You built a world-class design system but your components aren't using it.**

### What's Broken:
- ❌ Components use random `<div>` wrappers with arbitrary padding
- ❌ Content doesn't snap to the 12-column grid
- ❌ Inconsistent spacing across sections
- ❌ No unified layout structure
- ❌ Responsive breakpoints handled inconsistently

### What Should Happen:
- ✅ ALL sections wrapped in `.primitive-section`
- ✅ ALL content wrapped in `.primitive-container`
- ✅ ALL grids use `.primitive-grid-12-column`
- ✅ ZERO hardcoded padding/margins outside primitives
- ✅ Perfect alignment across all breakpoints

---

## THE SOLUTION: PRIMITIVE ENFORCEMENT

### Rule #1: Section Wrapper (REQUIRED)

**Every page section MUST be wrapped:**

```tsx
// ❌ WRONG
<OurArtists onBookArtist={handleBook} />

// ✅ CORRECT
<section className="primitive-section primitive-section-dark">
  <div className="primitive-container">
    <OurArtists onBookArtist={handleBook} />
  </div>
</section>
```

**What this does:**
- `primitive-section` = 48px vertical padding, 100% width, flex column
- `primitive-section-dark` = #222222 background
- `primitive-container` = Max-width constraints (393px/768px/1200px), horizontal padding (24px/32px/48px)

---

### Rule #2: Grid Layout (REQUIRED for multi-column content)

**Any content with columns MUST use the grid:**

```tsx
// ❌ WRONG
<div className="grid grid-cols-3 gap-6">
  <ArtistCard />
  <ArtistCard />
  <ArtistCard />
</div>

// ✅ CORRECT
<div className="primitive-grid-12-column">
  <div className="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-4">
    <ArtistCard />
  </div>
  <div className="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-4">
    <ArtistCard />
  </div>
  <div className="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-4">
    <ArtistCard />
  </div>
</div>
```

**What this does:**
- Creates exact 12-column grid with mathematically correct column widths
- Mobile: 16px gap, Tablet/Desktop: 24px gap
- Responsive column spanning without breakpoint hacks

---

### Rule #3: Remove ALL Hardcoded Spacing

**NO custom padding/margins allowed in page components:**

```tsx
// ❌ WRONG - Custom spacing
<div className="py-20 px-6">
  <h1 className="mb-8">Title</h1>
  <p className="mt-4">Text</p>
</div>

// ✅ CORRECT - Primitives handle spacing
<section className="primitive-section primitive-section-dark">
  <div className="primitive-container">
    <h1>Title</h1>
    <p>Text</p>
  </div>
</section>
```

**Exception:** Only use spacing utilities INSIDE component content (not for layout)

---

## COMPONENT PATTERNS

### Pattern 1: Full-Width Hero

```tsx
<section className="primitive-section primitive-section-dark" style={{ padding: 0 }}>
  <HomepageHero />
</section>
```

**Use case:** Edge-to-edge content (hero images, carousels)

---

### Pattern 2: Standard Content Section

```tsx
<section className="primitive-section primitive-section-dark">
  <div className="primitive-container">
    <h2>Section Title</h2>
    <p>Section content</p>
  </div>
</section>
```

**Use case:** 90% of sections (artists, services, pricing, etc.)

---

### Pattern 3: Grid Content Section

```tsx
<section className="primitive-section primitive-section-dark">
  <div className="primitive-container">
    <div className="primitive-grid-12-column">
      {/* Mobile: 1 col, Tablet: 2 col, Desktop: 3 col */}
      <div className="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-4">
        <Card />
      </div>
      <div className="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-4">
        <Card />
      </div>
      <div className="grid-span-mobile-12 grid-span-tablet-6 grid-span-desktop-4">
        <Card />
      </div>
    </div>
  </div>
</section>
```

**Use case:** Artist grids, service cards, gallery tiles

---

### Pattern 4: Centered Hero Content

```tsx
<section className="primitive-section primitive-section-dark">
  <div className="primitive-container">
    <div className="primitive-grid-12-column">
      {/* Desktop: 8 columns centered (offset 2 on each side) */}
      <div className="grid-span-mobile-12 grid-start-3 grid-end-11 md:grid-span-desktop-8">
        <h1>Centered Hero Title</h1>
        <p>Centered subtitle</p>
      </div>
    </div>
  </div>
</section>
```

**Use case:** Hero sections, CTAs, testimonials

---

## MIGRATION CHECKLIST

### Step 1: Audit Current Components

Find all components using custom layouts:

```bash
# Search for hardcoded padding
grep -r "className.*py-" components/

# Search for custom grid implementations
grep -r "grid-cols-" components/

# Search for container divs
grep -r "max-w-" components/
```

### Step 2: Wrap in Primitives

For each component:

1. **Remove custom container divs** → Use `.primitive-container`
2. **Remove padding utilities** → Let `.primitive-section` handle it
3. **Convert grids** → Use `.primitive-grid-12-column` with span utilities
4. **Remove max-width classes** → Container handles breakpoints

### Step 3: Test Alignment

Visual check:

- ✅ All content centers at 393px/768px/1200px max-widths
- ✅ Consistent 24px/32px/48px horizontal padding
- ✅ Consistent 48px vertical section spacing
- ✅ Grid columns align perfectly across sections

---

## COMMON MISTAKES

### Mistake #1: Nesting Containers

```tsx
// ❌ WRONG - Double wrapping
<section className="primitive-section">
  <div className="primitive-container">
    <div className="max-w-6xl mx-auto px-8">
      <Content />
    </div>
  </div>
</section>

// ✅ CORRECT - Single container
<section className="primitive-section">
  <div className="primitive-container">
    <Content />
  </div>
</section>
```

### Mistake #2: Breaking Out of Grid

```tsx
// ❌ WRONG - Custom breakpoints
<div className="md:grid-cols-2 lg:grid-cols-3">

// ✅ CORRECT - Use grid span utilities
<div className="primitive-grid-12-column">
  <div className="grid-span-tablet-6 grid-span-desktop-4">
```

### Mistake #3: Hardcoded Responsive Padding

```tsx
// ❌ WRONG
<div className="px-6 md:px-12 lg:px-20">

// ✅ CORRECT
<div className="primitive-container">
  {/* Container handles responsive padding */}
```

---

## FILES TO FIX (PRIORITY ORDER)

### High Priority (User-Facing Pages)
1. ✅ `/components/pages/HomePage.tsx` - FIXED
2. ⚠️ `/components/OurArtists.tsx` - Needs primitive wrapping
3. ⚠️ `/components/ServicesWithTransparentPricing.tsx` - Needs grid conversion
4. ⚠️ `/components/ArtistsPage.tsx` - Needs primitive enforcement
5. ⚠️ `/components/ServicesPage.tsx` - Needs grid system
6. ⚠️ `/components/GalleryPage.tsx` - Needs grid alignment

### Medium Priority (Supporting Components)
7. `/components/ServiceMindMap.tsx`
8. `/components/ProcessTimeline.tsx`
9. `/components/RecentWorkGallery.tsx`
10. `/components/PartnersPress.tsx`

### Low Priority (Utility Pages)
11. `/components/ContactPage.tsx`
12. `/components/FAQPage.tsx`
13. `/components/AftercarePage.tsx`
14. `/components/LegalPage.tsx`

---

## DEBUGGING ALIGNMENT ISSUES

### Enable Grid Overlay (Development)

Add to any component:

```tsx
<div className="primitive-grid-12-column grid-debug">
  {/* Red overlay shows column boundaries */}
</div>
```

### Visual Checks

**Mobile (393px):**
- Container max-width: 393px
- Horizontal padding: 24px left/right
- Content width: 345px (393 - 48)
- Grid gap: 16px

**Tablet (768px):**
- Container max-width: 768px
- Horizontal padding: 32px left/right
- Content width: 704px (768 - 64)
- Grid gap: 24px

**Desktop (1200px):**
- Container max-width: 1200px
- Horizontal padding: 48px left/right
- Content width: 1104px (1200 - 96)
- Grid gap: 24px

---

## VALIDATION CHECKPOINT

After implementing primitives:

- [ ] ALL sections use `.primitive-section` wrapper
- [ ] ALL content uses `.primitive-container` wrapper
- [ ] ALL grids use `.primitive-grid-12-column` with span utilities
- [ ] ZERO hardcoded `max-w-*` classes outside primitives
- [ ] ZERO hardcoded `px-*` utilities on layout divs
- [ ] ZERO custom breakpoint overrides
- [ ] Content aligns perfectly across all pages
- [ ] Responsive behavior is consistent

---

## NEXT STEPS

1. **Fix OurArtists.tsx** - Remove custom padding, use primitives
2. **Fix ServicesWithTransparentPricing.tsx** - Convert to grid system
3. **Fix ArtistsPage.tsx** - Enforce section wrapping
4. **Fix ServicesPage.tsx** - Use 12-column grid
5. **Audit remaining components** - Check for violations

**Goal:** 100% primitive compliance across all components by end of day.
