# Implementation Steps: 8 Artists with Dedicated Pages

## ✅ Step 1: Update team.json - COMPLETE
- Added all 8 artists (Loui, Angie, Aaron, Oliver, Sascha, Luz, Vivi, Debi)
- Added enhanced schema fields (slug, photoAlt, bilingual bio, certifications)
- Set Loui and Angie as `featured: true` (top row)

## 📝 Step 2: Replace Placeholder Bios
**Action Required:** Edit `/public/team.json` and replace all `[REPLACE WITH GERMAN/ENGLISH BIO]` placeholders with your actual bilingual bios.

## 🔧 Step 3: Update TeamGrid Component
**File:** `/src/components/pages/TeamGrid.tsx`

### Changes Needed:
1. Update `Artist` interface to support bilingual bios
2. Update `TeamMember` interface to match new schema
3. Ensure component handles 8 artists (currently shows all)

## 🎨 Step 4: Grid Layout - 2 Rows
**File:** `/src/components/pages/TeamGrid.css`

The grid already uses container queries:
- Mobile: 1 column
- Tablet (640px+): 2 columns
- Desktop (1024px+): 3 columns
- Wide (1280px+): 4 columns

**For 2 featured artists in top row:**
- Option A: Use CSS `order` property based on `featured` flag
- Option B: Sort artists array in TeamGrid.tsx (featured first)

## 🌐 Step 5: Create Individual Artist Pages

### Option A: Dynamic Route (Recommended)
Create `/src/pages/ArtistPage.tsx`:
```typescript
// Uses slug from URL: /artists/loui, /artists/angie, etc.
// Fetches artist data from team.json by slug
// Displays full bio, portfolio, booking button
```

### Option B: Static Pages
Create 8 separate files:
- `/src/pages/artists/Loui.tsx`
- `/src/pages/artists/Angie.tsx`
- etc.

## 📋 Detailed Implementation Checklist

### Phase 1: Data (CURRENT)
- [x] Update team.json with 8 artists
- [ ] Replace bio placeholders with real content
- [ ] Verify all photo paths are correct

### Phase 2: Component Updates
- [ ] Update TeamGrid.tsx Artist interface
- [ ] Add bio modal or link to artist page
- [ ] Implement featured artist sorting (top row)

### Phase 3: Individual Pages
- [ ] Create artist page route
- [ ] Create ArtistPage component
- [ ] Add routing in App.tsx
- [ ] Link artist cards to their pages

### Phase 4: Testing
- [ ] Verify all 8 cards display
- [ ] Test featured artists appear first
- [ ] Test individual artist pages
- [ ] Test bilingual bio display
- [ ] Test booking links

## 🚀 Quick Start Commands

1. **Replace bios in team.json** (manual edit)
2. **Test current display:**
   ```bash
   npm run dev
   # Navigate to homepage, check team section
   ```

## Next Immediate Action

**YOU NEED TO:** Paste your bilingual bios into `/public/team.json` to replace the `[REPLACE WITH...]` placeholders.

Then I can:
1. Update TeamGrid component to support new schema
2. Create individual artist pages
3. Implement featured artist sorting
