# DUPLICATE FILE PREVENTION RULES

## ⚠️ CRITICAL: Prevent Duplicate Component Files

**Context:** Audit on 2026-01-22 found 2 duplicate files (Footer.tsx, ArtistCard.tsx) that wasted development effort. Stale files had 0 imports but weren't cleaned up after refactoring.

**Problem:** If you update a stale duplicate instead of the active file, changes won't appear in production.

---

## BEFORE Creating New Files

### Step 1: Search for Existing Files
```bash
# Search for any files with similar names
find src -name "*ComponentName*" -not -path "*/node_modules/*" -not -path "*/dist/*"

# Example: Creating a new "Pricing" component
find src -name "*Pricing*" -not -path "*/node_modules/*"
```

### Step 2: Check Import Usage
```bash
# Check which version is actively imported
rg "import.*ComponentName" src/ -n

# Count imports per file
rg "from.*ComponentName" src/ -c | sort -t: -k2 -rn
```

### Step 3: Decision Rules
- **If file exists with 5+ imports** → UPDATE existing file (don't create new)
- **If file exists with 0-2 imports** → CHECK if it's stale, consider replacing it
- **If multiple versions exist** → STOP, identify source of truth first
- **If no file exists** → OK to create new file

---

## BEFORE Updating Existing Files

### Step 1: Verify File is Active
```bash
# Check import count
rg "ComponentName" src/ -l | wc -l

# Check if file is in routes (for pages)
rg "ComponentName" src/App.tsx

# Check exports
rg "export.*ComponentName" src/components/*/index.ts
```

### Step 2: Import Count Guidelines
- **10+ imports** → Definitely active source of truth ✅
- **5-9 imports** → Likely active, verify usage ✅
- **1-4 imports** → Might be stale, check routes/exports ⚠️
- **0 imports** → STALE FILE, do not update ❌

### Step 3: Stale File Markers
❌ **DO NOT UPDATE** if file has:
- Zero external imports (only internal imports like CSS)
- Not exported in any index.ts
- Not referenced in App.tsx routes
- Older git commits only (no recent changes)
- Significantly smaller file size than similar component

---

## File Location Standards (Source of Truth)

### Pages
- **Route-level pages:** `src/pages/` ONLY
  - Example: `HomePage.tsx`, `GalleryPage.tsx`, `BookingPage.tsx`
  - These are lazy-loaded in App.tsx
  
- **Reusable page components:** `src/components/pages/`
  - Example: `Footer.tsx`, `TeamGrid.tsx`, `TattooServicesPage.tsx`
  - These are shared across multiple pages
  - **EXCEPTION:** Footer.tsx lives in `components/pages/` NOT `components/layout/`

### Components
- **UI Primitives:** `src/components/primitives/`
  - Example: `Section.tsx`, base components
  
- **UI Components:** `src/components/ui/`
  - Example: `Container.tsx`, `Card.tsx`, `Button.tsx`
  
- **Layout Components:** `src/components/layout/`
  - Example: `Header.tsx`, `Navigation.tsx`
  - **NOTE:** Footer.tsx is NOT here (it's in components/pages/)
  
- **Molecules:** `src/components/molecules/`
  - Example: `ReviewCard.tsx`, `ServiceCard.tsx`, `ContactInfoCard.tsx`
  - Specialized components that extend base components
  
- **Cards:** `src/components/cards/`
  - Example: `ArtistCard.tsx`, specialized entity cards
  - **NOTE:** NOT the same as molecules/Card/ directory

### Sections
- **Page sections:** `src/sections/`
  - Example: `GallerySection.tsx`, `ServicesSection.tsx`, `ArtistSection.tsx`

- **Component sections:** `src/components/sections/`
  - Example: `ArtistsSection.tsx` (specialized version)
  - Used when section is reusable component, not page-specific

---

## Duplicate Detection Rules

### ❌ FORBIDDEN: Same Component Name in Different Directories
```
❌ WRONG:
src/components/layout/Footer.tsx
src/components/pages/Footer.tsx      ← DUPLICATE!

❌ WRONG:
src/components/cards/ArtistCard.tsx
src/components/molecules/Card/ArtistCard.tsx  ← DUPLICATE!

✅ CORRECT:
src/components/ui/Card.tsx           ← Base component
src/components/molecules/ReviewCard.tsx  ← Specialized (different name)
src/components/molecules/ServiceCard.tsx ← Specialized (different name)
```

### ✅ ALLOWED: Specialized Variants with Descriptive Names
- `Card.tsx` → `ReviewCard.tsx`, `ServiceCard.tsx`, `PriceCard.tsx` ✅
- `Button.tsx` → `LuxuryButton.tsx`, `SubmitButton.tsx` ✅
- Generic name → Specific name (NOT Card2, CardV2, CardNew) ❌

---

## Source of Truth Identification

When multiple versions of a file exist, identify the source of truth:

### ✅ Active (Source of Truth) Markers
- High import count (10+ files importing it)
- Exported in index.ts files
- Used in routes (App.tsx)
- Recent git activity (commits in last 30 days)
- Larger file size (more features/complete implementation)

### ❌ Stale (Duplicate) Markers
- Low/zero external imports
- Not in any index.ts exports
- Not in routes
- Only old git commits (60+ days ago)
- Smaller file size (incomplete/abandoned)
- Only internal imports (e.g., just CSS imports)

---

## Workflow for Handling Duplicates

### If You Find Duplicates:

1. **STOP** - Do not make changes yet
2. **Identify** which version is source of truth using markers above
3. **Document** import counts for each version
4. **Verify** in routes/exports
5. **Delete** stale version after confirming 0 imports
6. **Update** only the active version

### Example Process:
```bash
# Found: Footer.tsx in two locations
# Step 1: Check imports
rg "Footer" src/ -l

# Step 2: Count imports per file
# pages/Footer.tsx: 13 imports
# layout/Footer.tsx: 0 imports

# Step 3: Verify routes
rg "Footer" src/App.tsx
# Result: No direct route, but exported from components/pages/index.ts

# Step 4: Decision
# ✅ ACTIVE: src/components/pages/Footer.tsx (13 imports)
# ❌ STALE: src/components/layout/Footer.tsx (0 imports)

# Step 5: Safe to delete layout/Footer.tsx
```

---

## Checklist Before File Creation

- [ ] Searched for existing files with similar names
- [ ] Checked import counts if similar files found
- [ ] Verified no active version exists in different directory
- [ ] Confirmed file location follows standards above
- [ ] If duplicate exists, identified source of truth

## Checklist Before File Update

- [ ] Verified file has 5+ imports OR is in routes
- [ ] Checked file is exported in relevant index.ts
- [ ] Confirmed no newer version exists elsewhere
- [ ] Verified recent git activity on this file

---

## Quick Reference: Known Active Files (2026-01-22 Audit)

| Component | Active Location | Import Count |
|-----------|----------------|--------------|
| Container | `src/components/ui/Container.tsx` | 23 |
| Footer | `src/components/pages/Footer.tsx` | 13 |
| ArtistCard | `src/components/cards/ArtistCard.tsx` | 3 |
| Card | `src/components/ui/Card.tsx` | 16 |
| Section | `src/components/primitives/Section.tsx` | 17 |
| GalleryPage | `src/pages/GalleryPage.tsx` | routed |
| PricingSection | `src/components/PricingSection.tsx` | 1 (locked) |

**Last Updated:** 2026-01-22 after duplicate file audit

---

## Deleted Duplicates (Do Not Recreate)

| File Path | Status | Reason |
|-----------|--------|--------|
| `src/components/layout/Footer.tsx` | ❌ Deleted | 0 imports, stale copy |
| `src/components/molecules/Card/ArtistCard.tsx` | ❌ Deleted | 0 imports, leftover from refactor |
| `src/components/molecules/Card/ArtistCard.css` | ❌ Deleted | Companion to deleted file |

**Note:** If you need these components, use the active versions listed above.
