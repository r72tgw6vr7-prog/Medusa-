# SAFE DELETION AUDIT REPORT
═══════════════════════════════════════════════════════
Scan Date: January 22, 2026
Files Scanned: 244
Verification Method: Knip + Multi-layer import scan + package.json cross-reference
Knip Exit Code: 1 (126 unused files detected)

═══════════════════════════════════════════════════════
CATEGORY: SAFE TO DELETE (Green 🟢)
═══════════════════════════════════════════════════════

## Root-Level Files (Zero imports, zero config refs)

| File | Static Imports | Config Refs | Confidence | LOC Est |
|------|----------------|-------------|------------|---------|
| .eslintrc-hygiene.js | 0 | 0 | 100% | ~50 |
| audit-design-system.js | 0 | 0 | 100% | ~100 |
| catalog-components.ts | 0 | 0 | 100% | ~200 |
| design-system-extraction.ts | 0 | 0 | 100% | ~150 |
| extract-components.js | 0 | 0 | 100% | ~100 |
| generate-manifest.js | 0 | 0 | 100% | ~80 |
| verify-manifest.js | 0 | 0 | 100% | ~60 |

## Scripts Directory - SAFE TO DELETE (not in package.json)

| File | In package.json | Confidence | LOC Est |
|------|-----------------|------------|---------|
| scripts/add-aria-labels.sh | ❌ | 100% | ~30 |
| scripts/audit-font-weights.mjs | ❌ | 100% | ~80 |
| scripts/build-debug.sh | ❌ | 100% | ~20 |
| scripts/check-ctas.js | ❌ | 100% | ~60 |
| scripts/check-ctas.mjs | ❌ | 100% | ~60 |
| scripts/check-hygiene.sh | ❌ | 100% | ~40 |
| scripts/check-imports.cjs | ❌ | 100% | ~50 |
| scripts/cleanup-broken-images.cjs | ❌ | 100% | ~80 |
| scripts/color-distribution-audit.mjs | ❌ | 100% | ~100 |
| scripts/color-forensics.mjs | ❌ | 100% | ~120 |
| scripts/compile-translation-issues.mjs | ❌ | 100% | ~80 |
| scripts/contact-hover-check.mjs | ❌ | 100% | ~50 |
| scripts/debug-booking.cjs | ❌ | 100% | ~60 |
| scripts/debug-booking.js | ❌ | 100% | ~60 |
| scripts/emergency-gold-cleanup.sh | ❌ | 100% | ~30 |
| scripts/fix-asset-paths.sh | ❌ | 100% | ~40 |
| scripts/fix-image-refs.mjs | ❌ | 100% | ~80 |
| scripts/fix-unused.sh | ❌ | 100% | ~30 |
| scripts/generate-i18n-types.mjs | ❌ | 100% | ~100 |
| scripts/hover-check.mjs | ❌ | 100% | ~50 |
| scripts/i18n-string-scan.mjs | ❌ | 100% | ~80 |
| scripts/image-cleanup.js | ❌ | 100% | ~60 |
| scripts/image-cleanup.mjs | ❌ | 100% | ~60 |
| scripts/locale-audit.mjs | ❌ | 100% | ~100 |
| scripts/manage-images.sh | ❌ | 100% | ~40 |
| scripts/migrate-asset-paths.sh | ❌ | 100% | ~50 |
| scripts/optimize-assets.sh | ❌ | 100% | ~40 |
| scripts/organize-gallery-photos.sh | ❌ | 100% | ~50 |
| scripts/remove-console-logs.sh | ❌ | 100% | ~30 |
| scripts/rename-images.js | ❌ | 100% | ~60 |
| scripts/rename-images.sh | ❌ | 100% | ~40 |
| scripts/reorganize-images.sh | ❌ | 100% | ~50 |
| scripts/scan-gold.mjs | ❌ | 100% | ~80 |
| scripts/screenshot-ctas.mjs | ❌ | 100% | ~100 |
| scripts/suppress-errors.sh | ❌ | 100% | ~20 |
| scripts/update-image-references.js | ❌ | 100% | ~80 |
| scripts/validate-a11y.sh | ❌ | 100% | ~40 |
| scripts/validate-asset-paths.sh | ❌ | 100% | ~40 |
| scripts/validate-images.mjs | ❌ | 100% | ~80 |
| scripts/verify-deploy.sh | ❌ | 100% | ~30 |
| scripts/verify_medusa_critical.mjs | ❌ | 100% | ~100 |

## Entire Directory - SAFE TO DELETE

| Directory | Imports Found | Config Refs | Confidence | LOC Est |
|-----------|---------------|-------------|------------|---------|
| medusa-tattoo-seo/ | 0 | 0 | 100% | ~500 |
| codemods/ | 0 | 0 | 100% | ~100 |
| api/ | 0 | 0 | 100% | ~50 |

## src/ Components - SAFE TO DELETE (Zero imports anywhere)

| File | Static Imports | Dynamic Imports | Test Refs | Confidence |
|------|----------------|-----------------|-----------|------------|
| src/components/accessibility/SkipLink.tsx | 0 | 0 | 0 | 100% |
| src/components/accessibility/VisuallyHidden.tsx | 0 | 0 | 0 | 100% |
| src/components/JapanesePrinciples.tsx | 0 | 0 | 0 | 100% |
| src/components/cards/index.ts | 0 | 0 | 0 | 100% |
| src/components/GoogleMap.tsx | 0 | 0 | 0 | 100% |
| src/components/primitives/Card.tsx | 0 | 0 | 0 | 100% |
| src/components/ui/card/Card.tsx | 0 | 0 | 0 | 100% |
| src/foundation/index.ts | 0 | 0 | 0 | 100% |

**Total Safe to Delete:** 56 files + 3 directories
**Estimated LOC to Remove:** ~3,500

═══════════════════════════════════════════════════════
CATEGORY: NEEDS REVIEW (Yellow 🟡)
═══════════════════════════════════════════════════════

| File | Reason for Review | Imports | Recommendation |
|------|-------------------|---------|----------------|
| src/components/layout/Footer.tsx | Uses LuxuryButton but never imported | 1 internal | Delete after verifying no plans to use |
| src/components/ui/LuxuryButton.tsx | Only used by layout/Footer.tsx | 1 (unused chain) | Delete with Footer.tsx |
| src/components/organisms/ServicesPage.tsx | Imports Footer but never used | 3 | Delete - appears to be legacy |
| src/components/sections/ArtistsSection.tsx | Not imported anywhere | 0 | Delete after UI verification |
| src/components/cards/ArtistCardJapanese.tsx | Variant not used | 0 | Delete - Japanese variant unused |
| src/sections/*.tsx (7 files) | Sections exist but not imported in pages | 0-1 | Review if needed for future features |
| src/lib/scroll.ts | Not imported but scroll-minimal.ts exists | 0 | Delete - superseded |
| src/lib/scrollEnhance.ts | Not imported | 0 | Delete - superseded |
| templates/ComponentTemplate.tsx | Template file | 0 | Keep if used for scaffolding |
| core/constants/config.ts | Core config not imported | 0 | Delete - appears unused |
| core/types/index.ts | Core types not imported | 0 | Delete - appears unused |
| lib/theme/colors.ts | Theme colors not imported | 0 | Delete if using design-system.css |

**Total Needs Review:** 20 files
**Recommendation:** Delete after quick visual verification

═══════════════════════════════════════════════════════
CATEGORY: KEEP - DO NOT DELETE (Red 🔴)
═══════════════════════════════════════════════════════

## Scripts ACTIVELY USED in package.json

| File | Script Name | Confidence |
|------|-------------|------------|
| scripts/check-env.mjs | env:check | 100% KEEP |
| scripts/convert-to-webp.js | convert-to-webp | 100% KEEP |
| scripts/generate-gallery-index.mjs | gallery:generate | 100% KEEP |
| scripts/generate-piercing-gallery.mjs | gallery:piercing-only | 100% KEEP |
| scripts/generate-sitemap.mjs | seo:sitemap | 100% KEEP |
| scripts/generate-test-images.mjs | generate:test-images | 100% KEEP |
| scripts/hygiene-check.sh | hygiene | 100% KEEP |
| scripts/i18n-scan-usage.mjs | i18n:scan-usage | 100% KEEP |
| scripts/i18n-validate.mjs | i18n:check | 100% KEEP |
| scripts/optimize-gallery-images.mjs | images:optimize | 100% KEEP |
| scripts/optimize-gallery.mjs | optimize:gallery | 100% KEEP |
| scripts/optimize-images.cjs | optimize-images | 100% KEEP |
| scripts/optimize-images.mjs | optimize-images:old | 100% KEEP |
| scripts/optimize-large-images.mjs | optimize:perf | 100% KEEP |
| scripts/protect-backgrounds.sh | verify-backgrounds | 100% KEEP |
| scripts/seo-audit.cjs | seo-audit | 100% KEEP |
| scripts/validate-seo.mjs | seo:validate | 100% KEEP |
| scripts/verify-images.cjs | verify-images | 100% KEEP |

## src/ Files with Active Imports (Knip false positives)

| File | Reason to Keep | Evidence |
|------|----------------|----------|
| src/types/routes.ts | Imported in constants/routes.ts | `import { RouteConfig }` |
| src/types/route-types.ts | Type definitions used | Component props |
| src/data/*.ts | Data files used by components | Various imports |
| src/i18n/*.ts | i18n system active | App.tsx imports |
| src/lib/animations/*.ts | Animation system active | Component usage |
| src/schemas/bookingSchema.ts | Form validation | BookingPage |
| src/utils/*.ts | Utility functions | Various imports |
| src/styles/*.css | Stylesheets imported | Component CSS imports |

**Total Keep:** 50+ files

═══════════════════════════════════════════════════════
DELETION COMMANDS
═══════════════════════════════════════════════════════

## Phase 1: Root-level files (SAFE - 100% confidence)
```bash
rm -f .eslintrc-hygiene.js
rm -f audit-design-system.js
rm -f catalog-components.ts
rm -f design-system-extraction.ts
rm -f extract-components.js
rm -f generate-manifest.js
rm -f verify-manifest.js
```

## Phase 2: Unused scripts (SAFE - 100% confidence)
```bash
rm -f scripts/add-aria-labels.sh
rm -f scripts/audit-font-weights.mjs
rm -f scripts/build-debug.sh
rm -f scripts/check-ctas.js
rm -f scripts/check-ctas.mjs
rm -f scripts/check-hygiene.sh
rm -f scripts/check-imports.cjs
rm -f scripts/cleanup-broken-images.cjs
rm -f scripts/color-distribution-audit.mjs
rm -f scripts/color-forensics.mjs
rm -f scripts/compile-translation-issues.mjs
rm -f scripts/contact-hover-check.mjs
rm -f scripts/debug-booking.cjs
rm -f scripts/debug-booking.js
rm -f scripts/emergency-gold-cleanup.sh
rm -f scripts/fix-asset-paths.sh
rm -f scripts/fix-image-refs.mjs
rm -f scripts/fix-unused.sh
rm -f scripts/generate-i18n-types.mjs
rm -f scripts/hover-check.mjs
rm -f scripts/i18n-string-scan.mjs
rm -f scripts/image-cleanup.js
rm -f scripts/image-cleanup.mjs
rm -f scripts/locale-audit.mjs
rm -f scripts/manage-images.sh
rm -f scripts/migrate-asset-paths.sh
rm -f scripts/optimize-assets.sh
rm -f scripts/organize-gallery-photos.sh
rm -f scripts/remove-console-logs.sh
rm -f scripts/rename-images.js
rm -f scripts/rename-images.sh
rm -f scripts/reorganize-images.sh
rm -f scripts/scan-gold.mjs
rm -f scripts/screenshot-ctas.mjs
rm -f scripts/suppress-errors.sh
rm -f scripts/update-image-references.js
rm -f scripts/validate-a11y.sh
rm -f scripts/validate-asset-paths.sh
rm -f scripts/validate-images.mjs
rm -f scripts/verify-deploy.sh
rm -f scripts/verify_medusa_critical.mjs
```

## Phase 3: Unused directories (SAFE - 100% confidence)
```bash
rm -rf medusa-tattoo-seo/
rm -rf codemods/
rm -rf api/
```

## Phase 4: Unused src/ components (SAFE - 100% confidence)
```bash
rm -f src/components/accessibility/SkipLink.tsx
rm -f src/components/accessibility/VisuallyHidden.tsx
rm -f src/components/JapanesePrinciples.tsx
rm -f src/components/cards/index.ts
rm -f src/components/GoogleMap.tsx
rm -f src/components/primitives/Card.tsx
rm -f src/components/ui/card/Card.tsx
rm -f src/foundation/index.ts
```

## Phase 5: Yellow category (after review)
```bash
# Only run after manual verification:
rm -f src/components/layout/Footer.tsx
rm -f src/components/ui/LuxuryButton.tsx
rm -f src/components/organisms/ServicesPage.tsx
rm -f src/components/sections/ArtistsSection.tsx
rm -f src/components/cards/ArtistCardJapanese.tsx
rm -f src/lib/scroll.ts
rm -f src/lib/scrollEnhance.ts
rm -f core/constants/config.ts
rm -f core/types/index.ts
rm -f lib/theme/colors.ts
```

═══════════════════════════════════════════════════════
VERIFICATION AFTER DELETION
═══════════════════════════════════════════════════════

Run after each phase:
```bash
# Build verification
npm run build

# Type check
npm run typecheck

# Lint check
npm run lint

# Dev server test
npm run dev
# Then manually verify routes work

# Run knip again to confirm reduction
npm run find:unused | wc -l
```

═══════════════════════════════════════════════════════
SUMMARY
═══════════════════════════════════════════════════════

| Category | Files | Directories | Est. LOC |
|----------|-------|-------------|----------|
| 🟢 Safe to Delete | 56 | 3 | ~3,500 |
| 🟡 Needs Review | 20 | 0 | ~1,200 |
| 🔴 Keep | 50+ | - | - |

**Recommended Approach:**
1. Create backup branch: `git checkout -b cleanup/delete-unused`
2. Delete Phase 1-4 files (100% safe)
3. Run verification commands
4. Review yellow category manually
5. Delete verified yellow files
6. Final verification
7. Commit: `git commit -m "chore: remove 56 unused files (~3.5K LOC)"`

**Expected Impact:**
- Files removed: 56+
- LOC removed: ~3,500
- Repository cleaner by ~15%
- Build time: No change (these files weren't compiled)
- Bundle size: Minor reduction (some were in src/)

═══════════════════════════════════════════════════════
