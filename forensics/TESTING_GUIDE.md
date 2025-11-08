# 🧪 TESTING GUIDE - Container Width Changes

## 🌐 WHERE TO SEE THE IMPROVEMENTS

### Start Development Server
```bash
npm run dev
```
Expected: Opens at `http://localhost:3000` or `http://localhost:5173`

---

## 📍 PAGES TO CHECK (In Order)

### 1. **Homepage** - `http://localhost:3000/`
**What to look for:**
- Hero section content centered
- Service cards grid (should show 2 columns on desktop)
- Content not too narrow on large screens
- **Compare:** Should feel less cramped than before

### 2. **Artists Page** - `http://localhost:3000/artists`
**What to look for:**
- Artist cards grid (4 columns on wide desktop)
- Cards maintain aspect ratio ✅
- Images still positioned correctly (faces centered) ✅
- Grid gaps unchanged ✅
- **This is critical - cards MUST look identical to before**

### 3. **Services Page** - `http://localhost:3000/services`
**What to look for:**
- Service cards (2 cards side-by-side)
- Better spacing on desktop
- Content centered with breathing room

### 4. **Gallery Page** - `http://localhost:3000/gallery`
**What to look for:**
- Gallery grid unchanged
- Images maintain aspect ratios
- Grid columns still responsive

### 5. **Contact Page** - `http://localhost:3000/contact`
**What to look for:**
- Form centered at 1440px max
- Not too wide for readability
- Good on tablet/mobile

---

## 🖥️ DESKTOP TESTING (1920×1080)

### Visual Checks
1. **Open DevTools** (F12 or Cmd+Option+I)
2. **Inspect any container element**
3. **Look for:** `max-width: 1440px` in computed styles
4. **Measure:** Content should be 1440px wide (before was 1280px)

### What Should Look Better
- ✅ Less empty space on sides
- ✅ Content feels more balanced
- ✅ Cards have better proportions
- ✅ Text lines not too long (still readable)

### What Should Stay Same
- ✅ Artist card grid (4 columns)
- ✅ Service cards (2 columns)
- ✅ All spacing between elements
- ✅ Font sizes
- ✅ Colors and shadows

---

## 📱 RESPONSIVE TESTING

### Tablet (1024×768)
```bash
# In DevTools, toggle device toolbar (Cmd+Shift+M)
# Select: iPad or custom 1024×768
```
**Check:**
- [ ] Content full-width with padding
- [ ] Artist grid shows 3 columns (NOT 4)
- [ ] No horizontal scroll

### Mobile (375×667)
```bash
# Select: iPhone SE or custom 375×667
```
**Check:**
- [ ] Content full-width with small padding
- [ ] Artist grid shows 1 column
- [ ] Cards stack vertically
- [ ] No content overflow

### Mobile Landscape (812×375)
```bash
# Rotate device or set custom 812×375
```
**Check:**
- [ ] Content fits without scroll
- [ ] Navigation works
- [ ] Cards maintain proportions

---

## 🔍 QUICK VISUAL TEST

### Before/After Comparison

**Before (1280px):**
```
|←-- 320px empty -->|←----- 1280px content ----->|←-- 320px empty -->|
                    Too much empty space
```

**After (1440px):**
```
|←-- 240px empty -->|←----- 1440px content ----->|←-- 240px empty -->|
                    Better balanced
```

### How to Verify Width Change
1. Open browser DevTools (F12)
2. Navigate to any page
3. Inspect main container element
4. Look at "Computed" tab
5. Find `max-width` - should say **1440px**

---

## ⚠️ WHAT COULD GO WRONG

### If Artist Cards Look Broken
**Symptoms:**
- Cards stretched or squeezed
- Images cut off wrong
- Grid columns incorrect

**Fix:**
```bash
# Restore from backup
cp forensics/backups/pre-container-fix/ArtistCard.css src/components/molecules/Card/
cp forensics/backups/pre-container-fix/TeamGrid.css src/components/pages/
```

### If Content Looks Too Wide
**Symptoms:**
- Text lines too long to read comfortably
- Forms stretched too much

**Solution:**
- Use `<Container size="narrow">` for content-heavy sections
- We can adjust specific pages to use narrower containers

### If Grid Breaks
**This shouldn't happen** - we didn't touch grids!
But if it does:
```bash
# Full rollback
cp forensics/backups/pre-container-fix/*.css src/[appropriate-paths]/
```

---

## ✅ TESTING CHECKLIST

### Desktop (1920×1080)
- [ ] Homepage loads, looks centered
- [ ] Artists page: 4-column grid intact
- [ ] Artist cards: aspect ratio correct
- [ ] Artist images: faces centered (center 25%)
- [ ] Service cards: 2 columns, good spacing
- [ ] Gallery: grid unchanged
- [ ] No horizontal scroll

### Tablet (1024×768)
- [ ] Artists page: 3-column grid
- [ ] Content full-width with padding
- [ ] Touch targets large enough
- [ ] No layout breaks

### Mobile (375×667)
- [ ] Artists page: 1-column grid
- [ ] Cards stack vertically
- [ ] Content readable
- [ ] Navigation works

### Cross-Browser
- [ ] Chrome/Edge (primary)
- [ ] Firefox
- [ ] Safari (if on Mac)

---

## 📊 SUCCESS CRITERIA

**Container fix is successful if:**
1. ✅ Desktop content is 1440px wide (not 1280px)
2. ✅ Artist cards look **identical** to before
3. ✅ Grids still responsive (1/2/3/4 columns)
4. ✅ No layout breaks on any viewport
5. ✅ Mobile/tablet unchanged in behavior

**If all checks pass → Move to next task!**

---

## 🎯 NEXT TASK PREVIEW

After verifying containers are working:

**Task #2: Breakpoint Standardization** (2 hours)
- Align all breakpoints to Tailwind (640/768/1024/1280)
- Fix container query breakpoints
- Update TeamGrid media queries

**Won't touch:**
- Artist cards ✅
- Grid columns ✅
- Card dimensions ✅

---

## 💬 REPORT BACK

**After testing, tell me:**

1. **"Looks good"** → I'll proceed to next task
2. **"Artist cards broken"** → I'll restore from backup
3. **"Too wide"** → I'll adjust specific pages
4. **"Other issue: [describe]"** → I'll investigate

---

**Test URL:** http://localhost:3000  
**Key Pages:** `/artists`, `/services`, `/gallery`, `/`  
**Main Check:** Artist cards on `/artists` must look unchanged ✅
