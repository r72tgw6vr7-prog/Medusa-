# Image Asset Audit & Organization Plan
**Date:** November 9, 2025  
**Status:** Audit Complete - Ready for Migration

---

## Part 1: Current State Inventory

### ✅ **Artist Photos - ALL 8 EXIST**

| Artist | Directory | Primary Photo | Responsive Versions | Status |
|--------|-----------|---------------|---------------------|--------|
| **Loui** | `/assets/images/photos/artists/Loui/` | `Loui@1200w.webp` | @400w, @800w (jpg/webp) | ✅ Complete |
| **Angie** | `/assets/images/photos/artists/Angie/` | `picture.webp` | Multiple sizes | ✅ Complete |
| **Aaron** | `/assets/images/photos/artists/Aaron/` | `aaron.webp` | Multiple sizes | ✅ Complete |
| **Oliver** | `/assets/images/photos/artists/Oli/` | `oliver.webp` | Multiple sizes | ✅ Complete |
| **Sascha** | `/assets/images/photos/artists/Sascha/` | `Sascha@1200w.webp` | @400w, @800w | ✅ Complete |
| **Luz** | `/assets/images/photos/artists/Luz/` | `Luz.webp` | @400w, @800w | ✅ Complete |
| **Vivi** | `/assets/images/photos/artists/Vivi/` | `IMG_3149.webp` | @400w, @800w + portfolio | ✅ Complete |
| **Debi** | `/assets/images/photos/artists/Debi/` | `debi.webp` | Multiple sizes | ✅ Complete |

**Key Finding:** All 8 artist headshots exist with responsive versions!

### ✅ **Studio/Carousel Images - WORKING**

Located in `/assets/images/photos/studio/`:
- `img3876.webp` → salonMainLevel
- `img3914.webp` → salonUpperLevel
- `img3947.webp` → salonTreatmentRoom
- `img3969.webp` → salonEnvironment1
- `img3994.webp` → salonEnvironment2
- Additional: img4031, img4070, img4096, img4120, img4158, img4197, img4248, img4288

**Optimized versions:** `/studio/optimized/` (640w, 1024w, 1920w, 2560w)

**Status:** ✅ Currently used in `SalonCarousel.tsx` and working correctly

### ✅ **Portfolio/Gallery Images**

- **Debi portfolio:** `/assets/images/photos/gallery/tattoos/debi/test.jpg` + `.webp`
- **Vivi portfolio:** Extensive collection in `/Vivi/Fotoalbum Medusa (Vivi)/` (~50+ images)
  - Multiple page images (page0.webp through page0(9).webp)
  - Responsive versions (@400w, @800w)

### ✅ **Background Images**

Located in `/assets/images/photos/backgrounds/`:
- `tattoo-card-bg.webp`
- `piercing-card-bg.webp`
- `process-timeline-bg.webp`

### ✅ **Hero Images**

- `/assets/images/photos/hero/medusatattooartwork.webp`

### ✅ **Icons**

Located in `/assets/images/icons/`:
- Favicon variants (16x16, 32x32, 144x144, 192x192)
- Diamond.png/webp

### ❌ **Orphaned/Root Level Files**

- `/public/texture.webp`
- `/public/path to art peacer.jpg` (spaces in filename!)
- `/public/Bauchnabel echt gold vitrine_(3).jpg`
- `/public/Diamond.png`

---

## Part 2: Current vs. Proposed Structure

### **Current Structure:**
```
public/
├── assets/images/photos/
│   ├── artists/
│   │   ├── Loui/          ← Capital letters
│   │   │   ├── Loui@1200w.webp
│   │   │   ├── Loui@800w.webp
│   │   │   └── optimized/
│   │   ├── Angie/
│   │   │   └── picture.webp  ← Non-standard name
│   │   └── [...]
│   ├── studio/
│   │   ├── img3876.webp   ← Generic names
│   │   └── optimized/
│   ├── gallery/tattoos/
│   └── backgrounds/
└── [orphaned files]
```

### **Proposed Standardized Structure:**
```
public/
├── images/                    ← NEW simplified path
│   ├── artists/               ← Artist headshots
│   │   ├── loui.webp         ← lowercase, consistent naming
│   │   ├── loui@400w.webp
│   │   ├── loui@800w.webp
│   │   ├── loui@1200w.webp
│   │   ├── angie.webp
│   │   ├── aaron.webp
│   │   ├── oliver.webp
│   │   ├── sascha.webp
│   │   ├── luz.webp
│   │   ├── vivi.webp
│   │   └── debi.webp
│   │
│   ├── portfolio/             ← Artist portfolio work
│   │   ├── loui/
│   │   │   ├── work-1.webp
│   │   │   └── work-2.webp
│   │   ├── debi/
│   │   │   └── test.webp
│   │   └── vivi/
│   │       └── [50+ images]
│   │
│   ├── studio/                ← Salon carousel photos
│   │   ├── main-level.webp   ← Descriptive names
│   │   ├── upper-level.webp
│   │   ├── treatment-room.webp
│   │   ├── environment-1.webp
│   │   ├── environment-2.webp
│   │   └── optimized/
│   │
│   ├── backgrounds/
│   │   ├── tattoo-card.webp
│   │   ├── piercing-card.webp
│   │   └── process-timeline.webp
│   │
│   └── hero/
│       └── medusa-artwork.webp
│
└── assets/                    ← Keep for backwards compatibility
    └── images/ [symlink to /images/]
```

---

## Part 3: Image Path Mapping

### **Artist Photos - Current → Proposed:**

| Artist | Current Path | Proposed Path | Action |
|--------|-------------|---------------|--------|
| Loui | `/assets/images/photos/artists/Loui/Loui@1200w.webp` | `/images/artists/loui.webp` | Copy + Rename |
| Angie | `/assets/images/photos/artists/Angie/picture.webp` | `/images/artists/angie.webp` | Copy + Rename |
| Aaron | `/assets/images/photos/artists/Aaron/aaron.webp` | `/images/artists/aaron.webp` | Copy |
| Oliver | `/assets/images/photos/artists/Oli/oliver.webp` | `/images/artists/oliver.webp` | Copy |
| Sascha | `/assets/images/photos/artists/Sascha/Sascha@1200w.webp` | `/images/artists/sascha.webp` | Copy + Lowercase |
| Luz | `/assets/images/photos/artists/Luz/Luz.webp` | `/images/artists/luz.webp` | Copy + Lowercase |
| Vivi | `/assets/images/photos/artists/Vivi/IMG_3149.webp` | `/images/artists/vivi.webp` | Copy + Rename |
| Debi | `/assets/images/photos/artists/Debi/debi.webp` | `/images/artists/debi.webp` | Copy |

### **Studio Photos - Current → Proposed:**

| Current | Proposed | Used In |
|---------|----------|---------|
| `img3876.webp` | `main-level.webp` | SalonCarousel (salonMainLevel) |
| `img3914.webp` | `upper-level.webp` | SalonCarousel (salonUpperLevel) |
| `img3947.webp` | `treatment-room.webp` | SalonCarousel (salonTreatmentRoom) |
| `img3969.webp` | `environment-1.webp` | SalonCarousel (salonEnvironment1) |
| `img3994.webp` | `environment-2.webp` | SalonCarousel (salonEnvironment2) |

---

## Part 4: Migration Plan

### **Phase 1: Create New Directory Structure**

```bash
# Create new standardized directories
mkdir -p public/images/artists
mkdir -p public/images/portfolio/{loui,angie,aaron,oliver,sascha,luz,vivi,debi}
mkdir -p public/images/studio/optimized
mkdir -p public/images/backgrounds
mkdir -p public/images/hero
```

### **Phase 2: Copy Artist Photos**

```bash
# Copy and rename artist photos to standardized paths
cp public/assets/images/photos/artists/Loui/Loui@1200w.webp public/images/artists/loui.webp
cp public/assets/images/photos/artists/Loui/Loui@800w.webp public/images/artists/loui@800w.webp
cp public/assets/images/photos/artists/Loui/Loui@400w.webp public/images/artists/loui@400w.webp

cp public/assets/images/photos/artists/Angie/picture.webp public/images/artists/angie.webp
cp public/assets/images/photos/artists/Aaron/aaron.webp public/images/artists/aaron.webp
cp public/assets/images/photos/artists/Oli/oliver.webp public/images/artists/oliver.webp

cp public/assets/images/photos/artists/Sascha/Sascha@1200w.webp public/images/artists/sascha.webp
cp public/assets/images/photos/artists/Sascha/Sascha@800w.webp public/images/artists/sascha@800w.webp

cp public/assets/images/photos/artists/Luz/Luz.webp public/images/artists/luz.webp
cp public/assets/images/photos/artists/Luz/Luz@800w.webp public/images/artists/luz@800w.webp

cp public/assets/images/photos/artists/Vivi/IMG_3149.webp public/images/artists/vivi.webp
cp public/assets/images/photos/artists/Vivi/IMG_3149@800w.webp public/images/artists/vivi@800w.webp

cp public/assets/images/photos/artists/Debi/debi.webp public/images/artists/debi.webp
```

### **Phase 3: Copy Studio Photos**

```bash
# Copy and rename studio photos
cp public/assets/images/photos/studio/img3876.webp public/images/studio/main-level.webp
cp public/assets/images/photos/studio/img3914.webp public/images/studio/upper-level.webp
cp public/assets/images/photos/studio/img3947.webp public/images/studio/treatment-room.webp
cp public/assets/images/photos/studio/img3969.webp public/images/studio/environment-1.webp
cp public/assets/images/photos/studio/img3994.webp public/images/studio/environment-2.webp

# Copy optimized versions
cp -r public/assets/images/photos/studio/optimized/* public/images/studio/optimized/
```

### **Phase 4: Copy Portfolio & Other Assets**

```bash
# Copy portfolio images
cp public/assets/images/photos/gallery/tattoos/debi/* public/images/portfolio/debi/
cp -r public/assets/images/photos/artists/Vivi/Fotoalbum\ Medusa\ \(Vivi\)/* public/images/portfolio/vivi/

# Copy backgrounds
cp public/assets/images/photos/backgrounds/* public/images/backgrounds/

# Copy hero
cp public/assets/images/photos/hero/medusatattooartwork.webp public/images/hero/medusa-artwork.webp
```

### **Phase 5: Create Backwards Compatibility Symlink (Optional)**

```bash
# Create symlink for backwards compatibility
ln -s ../images public/assets/images-new
```

---

## Part 5: Code Updates Required

### **Files to Update:**

1. **`/public/team.json`** - Update photo paths
2. **`/src/components/organisms/SalonCarousel.tsx`** - Update imports
3. **`/src/components/pages/TeamGrid.tsx`** - Update default fallback paths
4. **Any other components** referencing `/assets/images/photos/`

### **1. Update team.json:**

```json
{
  "team": [
    {
      "photo": "/images/artists/loui.webp",  // ← Changed
      ...
    }
  ]
}
```

### **2. Update SalonCarousel.tsx:**

```typescript
// OLD:
import salonMainLevel from '/assets/images/photos/studio/img3876.webp';
import salonUpperLevel from '/assets/images/photos/studio/img3914.webp';

// NEW:
import salonMainLevel from '/images/studio/main-level.webp';
import salonUpperLevel from '/images/studio/upper-level.webp';
```

### **3. Create Image Helper Utility:**

```typescript
// src/utils/imageHelpers.ts
export const getArtistPhoto = (slug: string, size?: 'full' | '800w' | '400w'): string => {
  const sizeMap = {
    full: '',
    '800w': '@800w',
    '400w': '@400w'
  };
  const suffix = size && size !== 'full' ? sizeMap[size] : '';
  return `/images/artists/${slug}${suffix}.webp`;
};

export const getStudioPhoto = (name: string): string => {
  return `/images/studio/${name}.webp`;
};

export const getPortfolioImages = (artistSlug: string): string[] => {
  // Dynamic import logic or static mapping
  return [`/images/portfolio/${artistSlug}/work-1.webp`];
};
```

---

## Part 6: Image Specifications

### **Artist Headshots:**
- **Format:** WebP primary (85% quality)
- **Dimensions:** 
  - Full: 1200w (current standard)
  - Tablet: 800w
  - Mobile: 400w
- **Aspect Ratio:** 3:4 (portrait)
- **File Naming:** `{slug}.webp`, `{slug}@800w.webp`, `{slug}@400w.webp`
- **Alt Text Pattern:** `"{Name}, {Role} at Medusa München"`

### **Studio Photos:**
- **Format:** WebP (80% quality)
- **Dimensions:** Variable, maintain aspect ratio
- **Responsive:** 640w, 1024w, 1920w, 2560w in `/optimized/`
- **File Naming:** Descriptive (`main-level.webp`, not `img3876.webp`)

### **Portfolio Images:**
- **Format:** WebP (80% quality)
- **Organization:** By artist slug `/portfolio/{slug}/`
- **Naming:** Sequential or descriptive

---

## Part 7: Migration Checklist

### **Pre-Migration:**
- [x] Audit complete - all 8 artist photos exist
- [x] Studio carousel images identified
- [x] Portfolio images catalogued
- [ ] Backup current `/public/assets/` directory

### **Migration:**
- [ ] Create new directory structure
- [ ] Copy artist photos with standardized names
- [ ] Copy studio photos with descriptive names
- [ ] Copy portfolio images
- [ ] Copy background/hero images
- [ ] Clean up orphaned root-level files

### **Code Updates:**
- [ ] Update `/public/team.json` photo paths
- [ ] Update `SalonCarousel.tsx` imports
- [ ] Create `imageHelpers.ts` utility
- [ ] Update any hardcoded image paths
- [ ] Test all image loading

### **Verification:**
- [ ] All 8 artist cards display photos
- [ ] Salon carousel works
- [ ] Portfolio images accessible
- [ ] No broken image links
- [ ] Responsive versions load correctly

### **Cleanup (Optional):**
- [ ] Remove old `/assets/images/photos/` directory
- [ ] Remove orphaned root files
- [ ] Update .gitignore if needed

---

## Part 8: Key Findings & Recommendations

### ✅ **Good News:**
1. **All 8 artist photos exist** with responsive versions
2. **Studio carousel images working** and well-organized
3. **Extensive portfolio content** available (especially Vivi)
4. **Consistent responsive sizing** (@400w, @800w, @1200w)

### ⚠️ **Issues to Address:**
1. **Inconsistent naming:** "picture.webp" for Angie, "IMG_3149" for Vivi
2. **Capital letters:** Some directories use capitals (Loui, Angie)
3. **Generic names:** Studio photos use "img3876" instead of descriptive names
4. **Orphaned files:** Root-level files with spaces in names
5. **Deep nesting:** `/assets/images/photos/artists/` is verbose

### 🎯 **Recommendations:**
1. **Implement standardized structure** - Shorter paths, consistent naming
2. **Use descriptive names** - "main-level.webp" not "img3876.webp"
3. **Lowercase slugs** - "loui.webp" not "Loui@1200w.webp"
4. **Create helper utilities** - Centralize image path logic
5. **Maintain backwards compatibility** - Symlinks or dual paths during transition

---

## Summary

**Status:** ✅ All required images exist and are accessible

**Next Action:** Execute migration plan to standardize structure

**Estimated Effort:** 2-3 hours (mostly file operations + code updates)

**Risk Level:** Low (all source images exist, can keep old structure as backup)

**Benefits:**
- Cleaner, more maintainable structure
- Easier to find and update images
- Consistent naming conventions
- Shorter import paths
- Better developer experience
