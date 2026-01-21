# Medusa Tattoo - Component Catalog Summary

**Generated:** January 18, 2026  
**Total Components:** 81  
**Stack:** React 18 + Vite 6 + Tailwind v4 + Framer Motion + React Router v6

---

## Quick Stats

- **Total Components:** 81
- **Atoms:** 2
- **Molecules:** 21
- **UI Primitives:** 9
- **Cards:** 2
- **Organisms:** 2
- **Sections:** 10
- **Pages:** 13
- **Layouts:** 1
- **Accessibility:** 2
- **SEO:** 2

---

## Critical Findings

### ✅ Most Used Components
1. **Card** - 15 usages (base UI component)
2. **button** - 11 usages (CTAs, forms)
3. **MainNavigation** - 8 usages (all pages)

### ⚠️ Unused Components (19)
- ContactInfoCard
- CookieConsentBanner
- FAQItem
- GDPRCompliance
- NewsletterForm
- PriceCard
- ProcessStepCard
- ReviewCard
- StatsBar
- TrustBadgeCarousel
- TrustBadgesBar
- TrustBadgesMarquee
- hero-parallax
- layout-grid
- ServicesPage (organism)
- FAQSection (SEO)
- LocationSection (SEO)
- cards/ArtistCard (duplicate)

### 🔄 Duplicate Components
- **ArtistCard** exists in TWO locations:
  - `src/components/cards/ArtistCard.tsx` (UNUSED - 0 usages)
  - `src/components/molecules/Card/ArtistCard.tsx` (USED - 2 usages)
  - **Action:** Remove `src/components/cards/ArtistCard.tsx`

---

## Design System Tokens

### Colors
- **Primary Background:** `#0a0a0a` (deep-black)
- **Chrome Accent:** `#C0C0C0` (use on dark only - 12.5:1 contrast)
- **Chrome Safe:** `#767676` (for light backgrounds - 4.54:1 contrast)
- **Text Primary:** `#FFFFFF` (on dark) / `#0a0a0a` (on light)

### Spacing (8px Grid)
- Base unit: 8px
- Tokens: `--space-1` (8px) through `--space-12` (96px)
- Ma utilities: `py-ma-xs`, `py-ma-sm`, `py-ma-md`, etc.

### Typography
- **Primary:** Inter
- **Heading:** Playfair Display
- **Weights:** 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

---

## Surface Components (14)

Components that create visual surfaces (cards/panels/sections):

### Cards (10)
1. **Card** - Primary CVA-based card (15 usages)
2. **ArtistCard** (molecules) - Artist card with image
3. **ServiceCards** - Large service cards with background images
4. **ServiceCard** - Compact service card with backdrop blur
5. **ReviewCard** - Uses Card component
6. **PriceCard** - Pricing card (UNUSED)
7. **ContactInfoCard** - Uses Card component (UNUSED)
8. **BeforeAfterCard** - Interactive slider card
9. **ArtistCard** (cards) - Luxury artist card (UNUSED)
10. **ArtistCardJapanese** - Japanese aesthetic card with wabi-sabi styling

### Modals (1)
- **ArtistBioModal** - Full-screen modal with chrome glow

### Sections (2)
- **Section** - Full-width section wrapper with background variants
- **JapanesePrinciples** - Section with principle cards

### Layout (1)
- **Footer** - Chrome background footer

---

## Motion (Framer Motion)

**9 components** use Framer Motion (11%):
- BladeAccordion
- hero-parallax (UNUSED)
- layout-grid (UNUSED)
- ServicesPageInteractive
- GallerySection
- ProcessTimeline
- PricingSection
- DatenschutzPage
- JapanesePrinciples

---

## Styling Methods

- **Tailwind:** 59 components (73%)
- **CSS Modules:** 8 components (10%)
- **CVA:** 2 components (2%)
- **Inline Styles:** 4 components (5%)
- **Mixed:** 8 components (10%)

---

## Pages & Routes

1. **HomePage** (`/`) - 10 sections, lazy loading
2. **DatenschutzPage** (`/datenschutz`) - Privacy policy
3. **NotFoundPage** (`*`) - 404
4. **ColorTestPage** (`/color-test`) - Design system testing
5. **GalleryPage** (`/gallery`) - Full gallery
6. **LegalPage** (`/legal`) - Terms & conditions
7. **FAQPageNew** (`/faq`) - 6-category FAQ
8. **ContactPage** (`/contact`) - Form + map
9. **AftercarePage** (`/aftercare`) - 6-phase timeline
10. **BookingPage** (`/booking`) - Multi-step wizard
11. **AGBPage** (`/agb`) - Terms
12. **ImpressumPage** (`/impressum`) - Legal imprint
13. **ArtistsPage** (`/artists`) - Artist showcase

---

## Verification Commands

```bash
# Search for all exports
grep -r "export (default )?(function|const|class)" src/components/**/*.tsx

# List sections
ls src/sections/*.tsx

# List pages
ls src/pages/*.tsx

# Search for Card usage
grep -r "import.*from.*components/ui/Card" src/
```

---

## Recommendations

1. **Remove unused components** (19 identified) - reduces bundle size
2. **Remove duplicate ArtistCard** in `src/components/cards/`
3. **Standardize on Card component** for all card-based UIs
4. **Audit TrustBadge/TrustSignal components** - multiple similar components unused
5. **Consider removing hero-parallax and layout-grid** if not planned for use

---

**Full Details:** See `COMPONENT_CATALOG.md` (human-readable) and `component-catalog.json` (machine-readable) in this directory.
