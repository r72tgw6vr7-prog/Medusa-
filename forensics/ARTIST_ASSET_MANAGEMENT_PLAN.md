# Artist Asset Management Plan
**Date:** November 9, 2025  
**Scope:** Image asset audit, schema design, and migration strategy

---

## Part 1: Current State Inventory

### ✅ **Existing Artist Photos Found:**

**Real Artists (from filesystem):**
- **Loui** (Loul) - `/assets/images/photos/artists/Loui/`
- **Angie** (Ange) - `/assets/images/photos/artists/Angie/`
- **Aaron** - `/assets/images/photos/artists/Aaron/`
- **Oli** (Oliver) - `/assets/images/photos/artists/Oli/`
- **Sascha** - `/assets/images/photos/artists/Sascha/`
- **Luz** - `/assets/images/photos/artists/Luz/`
- **Vivi** - `/assets/images/photos/artists/Vivi/`
- **Debi** - `/assets/images/photos/artists/Debi/`

### ❌ **Missing from Schema (AI-Generated Names):**
- Sophia
- Leo
- Max
- Emma

### ✅ **Studio/Carousel Images:**
Located in `/assets/images/photos/studio/` - **Working correctly**
- img3876.webp through img4288.webp (multiple studio shots)
- Optimized versions available in `/optimized/` subdirectory

### 📊 **Current vs. Proposed Structure:**

**Current:**
```
public/assets/images/photos/artists/
├── Loui/
│   ├── loui@1200w.webp
│   ├── loui@800w.webp
│   └── optimized/
├── Angie/
└── Aaron/
```

**Proposed (Standardized):**
```
public/images/artists/
├── loul.jpg (primary - lowercase slug)
├── ange.jpg
├── aaron.jpg
└── oliver.jpg
```

---

## Part 2: Enhanced Artist Data Schema

### **Schema Comparison:**

| Field | Current (team.json) | Proposed (artists-full.json) | Status |
|-------|---------------------|------------------------------|--------|
| id | ✅ | ✅ Enhanced (slug-based) | Upgrade |
| slug | ❌ | ✅ New | **Add** |
| name | ✅ | ✅ | Keep |
| role | ✅ | ✅ | Keep |
| category | ✅ | ✅ | Keep |
| photo | ✅ | ✅ Standardized path | **Update** |
| photoAlt | ❌ | ✅ New (a11y) | **Add** |
| specialties | ✅ | ✅ | Keep |
| experience | ✅ | ✅ | Keep |
| badges | ❌ | ✅ New | **Add** |
| bio (de/en) | ✅ (single) | ✅ Bilingual | **Upgrade** |
| portfolio | ❌ | ✅ New | **Add** |
| booking | ✅ (boolean) | ✅ Enhanced (whatsapp, calendar) | **Upgrade** |
| social | ✅ (instagram only) | ✅ Multi-platform | **Upgrade** |
| certifications | ❌ | ✅ New | **Add** |
| featured | ✅ | ✅ | Keep |

### **Key Enhancements:**

1. **Bilingual Bios** - Supports modal biography feature
2. **Portfolio Integration** - Featured works + total count
3. **Enhanced Booking** - WhatsApp, calendar links
4. **Accessibility** - photoAlt for screen readers
5. **Badges System** - Visual achievement indicators
6. **Certifications** - Professional credentials display

---

## Part 3: Real Artist Name Mapping

### **Actual Team Members (from filesystem):**

| Display Name | Slug | Photo Path | Status |
|--------------|------|------------|--------|
| Loui | loul | `/assets/images/photos/artists/Loui/loui@1200w.webp` | ✅ Exists |
| Angie | ange | `/assets/images/photos/artists/Angie/picture.webp` | ✅ Exists |
| Aaron | aaron | `/assets/images/photos/artists/Aaron/aaron.webp` | ✅ Exists |
| Oliver | oliver | `/assets/images/photos/artists/Oli/oliver.webp` | ✅ Exists |
| Sascha | sascha | `/assets/images/photos/artists/Sascha/Sascha@1200w.webp` | ✅ Exists |
| Luz | luz | `/assets/images/photos/artists/Luz/Luz.webp` | ✅ Exists |
| Vivi | vivi | `/assets/images/photos/artists/Vivi/` | ✅ Exists |
| Debi | debi | `/assets/images/photos/artists/Debi/` | ✅ Exists |

**Note:** The AI-generated names (Sophia, Leo, Max, Emma) in `artists-full.json` are placeholders. Replace with real team members or remove.

---

## Part 4: Migration Strategy

### **Phase 1: Update team.json with Real Artists**

Update `/public/team.json` to include all 8 real artists:

```json
{
  "team": [
    {
      "id": "loul-001",
      "slug": "loul",
      "name": "Loui",
      "role": "Tattoo Artist",
      "category": "tattoo",
      "photo": "/assets/images/photos/artists/Loui/loui@1200w.webp",
      "photoAlt": "Loui, Senior Tattoo Artist at Medusa München",
      "specialties": ["Black & Gray", "Realism", "Watercolor", "Portrait"],
      "experience": "10+ Jahre",
      "bio": {
        "de": "[German bio - 2-3 paragraphs]",
        "en": "[English bio - 2-3 paragraphs]"
      },
      "booking": {
        "available": true,
        "whatsapp": "+49-xxx-xxxx"
      },
      "social": {
        "instagram": "@loui_medusa"
      },
      "certifications": ["EU Hygiene Certificate", "REACH Certified"],
      "featured": true
    },
    // ... repeat for Angie, Aaron, Oliver, Sascha, Luz, Vivi, Debi
  ]
}
```

### **Phase 2: Create Standardized Directory (Optional)**

If you want to simplify paths:

```bash
# Create new standardized structure
mkdir -p public/images/artists
mkdir -p public/images/portfolio
mkdir -p public/images/studio

# Copy/symlink existing photos (example)
cp public/assets/images/photos/artists/Loui/loui@1200w.webp public/images/artists/loul.jpg
cp public/assets/images/photos/artists/Angie/picture.webp public/images/artists/ange.jpg
# ... etc
```

### **Phase 3: Update TeamGrid Component**

Modify `/src/components/pages/TeamGrid.tsx` to support new schema:

```typescript
// Add new fields to Artist interface
interface Artist {
  name: string;
  slug: string;  // NEW
  photo: string;
  photoAlt?: string;  // NEW
  role: string;
  roleIcon: string;
  specialties: string[];
  experience: string;
  bio?: { de: string; en: string };  // NEW - bilingual
  instagram: string;
  bookable: boolean;
  certifications?: string[];  // NEW
  featured?: boolean;  // NEW
}
```

---

## Part 5: Biography Content Guidelines

### **Length & Structure:**
- **2-3 paragraphs** per language
- **Paragraph 1:** Experience, specialization, signature style
- **Paragraph 2:** Background, training, notable achievements
- **Paragraph 3:** Role at Medusa, what makes them unique

### **Tone:**
- Professional but approachable
- Emphasize expertise and passion
- Highlight unique selling points
- Use active voice

### **Key Points to Include:**
- Years of experience
- Primary specializations
- Notable achievements/training
- What sets them apart
- Role/contribution at Medusa

### **Example Template:**

**German:**
```
[Name] ist ein [role] mit über [X] Jahren Erfahrung in [specialties]. 
[His/Her] Arbeiten zeichnen sich durch [unique quality] aus.

[Background/training details]. [Name] hat [notable achievement/experience].

Bei Medusa München [role at studio]. [What makes them special].
```

**English:**
```
[Name] is a [role] with over [X] years of experience in [specialties]. 
[His/Her] work is characterized by [unique quality].

[Background/training details]. [Name] has [notable achievement/experience].

At Medusa München, [role at studio]. [What makes them special].
```

---

## Part 6: Image Specifications

### **Artist Headshots:**
- **Format:** WebP primary, JPG fallback
- **Dimensions:** 
  - Desktop: 360x480px (3:4 ratio)
  - Tablet: 228x304px
  - Mobile: 163x217px
- **Quality:** 85% compressed
- **Naming:** `{slug}.jpg` (lowercase, no spaces)
- **Crop:** Shoulders-up portrait, centered
- **Background:** Consistent lighting/backdrop

### **Portfolio Images:**
- **Format:** WebP primary, JPG fallback
- **Dimensions:** Variable, maintain aspect ratio
- **Quality:** 80% compressed
- **Alt Text:** "{Artist Name} - {Style} Tattoo at Medusa München"

---

## Part 7: Next Steps Checklist

### **Immediate Actions:**
- [ ] Verify all 8 real artist names (Loui, Angie, Aaron, Oliver, Sascha, Luz, Vivi, Debi)
- [ ] Collect/write bilingual bios for each artist
- [ ] Gather certification details
- [ ] Collect WhatsApp/booking info

### **Data Updates:**
- [ ] Update `/public/team.json` with all 8 artists
- [ ] Add bilingual bio fields
- [ ] Add photoAlt for accessibility
- [ ] Add certifications array
- [ ] Add enhanced booking info

### **Component Updates:**
- [ ] Update `TeamGrid.tsx` Artist interface
- [ ] Add bio modal component (if needed)
- [ ] Update ArtistCard to show badges
- [ ] Add certification display

### **Asset Organization (Optional):**
- [ ] Create `/public/images/artists/` directory
- [ ] Copy/optimize artist photos
- [ ] Create portfolio subdirectories
- [ ] Generate missing placeholders

---

## Part 8: Helper Functions

### **Image Path Helper:**

```typescript
// src/utils/imageHelpers.ts
export const getArtistPhoto = (slug: string, size: 'full' | 'thumb' = 'full'): string => {
  const sizeMap = {
    full: '@1200w',
    thumb: '@400w'
  };
  return `/assets/images/photos/artists/${slug}/${slug}${sizeMap[size]}.webp`;
};

export const getArtistPhotoAlt = (name: string, role: string): string => {
  return `${name}, ${role} at Medusa München`;
};
```

---

## Summary

### **Current State:**
- ✅ 8 real artists with photos exist
- ✅ Studio carousel images working
- ❌ Only 4 artists in team.json
- ❌ Missing enhanced schema fields
- ❌ No bilingual bios

### **Deliverables Created:**
1. ✅ `artists-schema.json` - JSON schema definition
2. ✅ `artists-full.json` - Sample data for 8 artists (needs real names/bios)
3. ✅ This migration plan document

### **Next Phase:**
Replace placeholder data in `artists-full.json` with real artist information, then update `team.json` and `TeamGrid.tsx` component.
