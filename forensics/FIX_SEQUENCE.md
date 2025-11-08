# 🔧 FIX SEQUENCE - Correct Order

## 🔴 CRITICAL PATH (Must Fix Before Launch)

Fix in **THIS EXACT ORDER** - each builds on the previous:

---

### **FIX #1: Container System** → 2 hours
**WHY FIRST:** Everything else depends on consistent container widths

**Files:**
- `/src/foundation/DesignSystem.tsx` (line 471)
- `/src/styles/design-system.css` (add desktop spacing tokens)

**What to do:**
1. Change `desktop: 'style={{ maxWidth: "1433px" }}'` → `desktop: 'max-w-[1280px]'`
2. Remove hardcoded spacing (lines 196-205), use CSS variables
3. Add missing `--spacing-desktop-*` tokens to design-system.css

**Test:** Check all pages use same max-width

---

### **FIX #2: Breakpoint Standardization** → 2 hours
**WHY SECOND:** Fixes responsive behavior across entire site

**Files:**
- `/src/styles/design-system.css` (lines 128-132, 241-260)
- `/src/components/pages/TeamGrid.css` (lines 321-337, 291-311)

**What to do:**
1. Align all breakpoints to Tailwind: 640px, 768px, 1024px, 1280px
2. Update container query breakpoints (900→1024, 1200→1280)
3. Fix TeamGrid media queries to match

**Test:** Resize browser - grids should change at exact Tailwind breakpoints

---

### **FIX #3: Hero Badges Position** → 1 hour
**WHY THIRD:** Quick win, prevents overlap on mobile

**Files:**
- `/src/sections/HeroSection.css` (lines 15-27, 164-202)

**What to do:**
1. Change `bottom: 15vh` → `bottom: max(120px, 15vh)`
2. Add viewport height guard for short screens
3. Update mobile/tablet responsive values

**Test:** Mobile landscape (812×375) - badges shouldn't overlap hero

---

### **FIX #4: Spacing Token Replacement** → 2 hours
**WHY FOURTH:** Now that containers/breakpoints are fixed, clean up spacing

**Files:**
- `/scripts/fix-magic-numbers.js` (create script)
- All CSS files with hardcoded spacing

**What to do:**
1. Create automated replacement script
2. Replace `gap: 8px` → `gap: var(--space-1)`
3. Replace `padding: 24px` → `padding: var(--space-3)`
4. Review and verify all changes

**Test:** Visual regression - spacing should look identical

---

### **FIX #5: PageHeader Component** → 3 hours
**WHY FIFTH:** Fixes 37 duplicate headers, adds visual variety

**Files:**
- `/src/components/ui/PageHeader.tsx` (create new)
- All page files with `text-center space-y-8 mb-16` pattern

**What to do:**
1. Create reusable PageHeader component with alignment options
2. Refactor FAQ, Contact, Services pages (examples)
3. Add alignment variations: some left, some center
4. Update 5-10 key pages

**Test:** Pages should have varied alignments, no duplicate code

---

### **FIX #6: Grid System Consolidation** → 2 hours
**WHY LAST:** Depends on breakpoints being fixed first

**Files:**
- `/src/styles/design-system.css` (keep container queries)
- `/src/components/pages/TeamGrid.css` (remove media query grids)

**What to do:**
1. Keep container query grid system (lines 228-260)
2. Remove duplicate media query grid in TeamGrid.css
3. Add fallback for Safari 15
4. Ensure grid-wrapper exists in components

**Test:** Artist grid should work identically, no visual changes

---

## ⏱️ TIMELINE

```
Day 1 Morning (4 hours):
├─ Fix #1: Containers        → 2h  ✓
└─ Fix #2: Breakpoints       → 2h  ✓

Day 1 Afternoon (3 hours):
├─ Fix #3: Hero badges       → 1h  ✓
└─ Fix #4: Spacing tokens    → 2h  ✓

Day 2 Morning (3 hours):
└─ Fix #5: PageHeader        → 3h  ✓

Day 2 Afternoon (2 hours):
└─ Fix #6: Grid system       → 2h  ✓

Testing (2 hours):
└─ All viewports + browsers

TOTAL: 14 hours (12h fixes + 2h testing)
```

---

## 🚫 WRONG ORDER (Don't Do This)

❌ **Starting with PageHeader** → Wastes time, containers still broken  
❌ **Fixing spacing first** → Will need to redo after container changes  
❌ **Doing grids before breakpoints** → Grid breakpoints won't work right  
❌ **Random order** → Each fix might break previous fixes

---

## ✅ WHY THIS ORDER WORKS

**#1 Containers** → Foundation for everything  
**#2 Breakpoints** → Makes responsive reliable  
**#3 Hero Badges** → Quick win, critical mobile fix  
**#4 Spacing** → Now safe to clean up with stable foundation  
**#5 PageHeader** → Visual improvement, depends on stable layout  
**#6 Grids** → Last because it depends on breakpoints being correct

**Each fix builds on the previous one. Don't skip or reorder.**

---

## 🎯 AFTER EACH FIX

### Must Do:
1. ✅ **Save file**
2. ✅ **Check browser** - does it still work?
3. ✅ **Test mobile/tablet** - any breaks?
4. ✅ **Git commit** - save progress
5. ✅ **Move to next fix**

### Don't Do:
- ❌ Fix multiple issues at once
- ❌ Skip testing between fixes
- ❌ Change order
- ❌ Work on random files

---

## 🔍 VERIFY AFTER ALL FIXES

### Desktop (1920×1080)
- [ ] All pages same max-width (1280px)
- [ ] Grid shows 4 columns
- [ ] Spacing looks even
- [ ] Headers vary (some left, some center)

### Tablet (1024×768)
- [ ] Grid shows 3 columns
- [ ] Breakpoint triggers at exactly 1024px
- [ ] No content overflow
- [ ] Padding looks consistent

### Mobile Portrait (375×667)
- [ ] Grid shows 1 column
- [ ] Hero badges visible
- [ ] All content readable
- [ ] Touch targets large enough

### Mobile Landscape (812×375)
- [ ] Hero badges DON'T overlap
- [ ] Content fits without scroll
- [ ] Navigation works

---

## 🚀 LAUNCH CHECKLIST

After completing all 6 fixes in order:

- [ ] Fix #1 complete + tested
- [ ] Fix #2 complete + tested
- [ ] Fix #3 complete + tested
- [ ] Fix #4 complete + tested
- [ ] Fix #5 complete + tested
- [ ] Fix #6 complete + tested
- [ ] Full viewport test suite
- [ ] Browser compatibility check
- [ ] Performance check (CLS < 0.1)
- [ ] Mobile landscape verified
- [ ] Git committed with clear messages
- [ ] Deploy to staging
- [ ] Final QA
- [ ] **LAUNCH** 🚀

---

## 💡 PRO TIPS

**Tip 1:** Do fixes on consecutive days, not spread out  
**Tip 2:** Take screenshots before each fix  
**Tip 3:** Test in Chrome first, Safari/Firefox after  
**Tip 4:** Keep a browser window open while coding  
**Tip 5:** Commit after each fix, not all at once

---

## 🆘 IF SOMETHING BREAKS

**After Fix #1-2:** Likely broke something major → Revert, try again  
**After Fix #3:** Only hero affected → Safe to debug  
**After Fix #4:** Visual spacing off → Check token values  
**After Fix #5:** Headers broken → Check PageHeader props  
**After Fix #6:** Grid broken → Ensure grid-wrapper exists

**Nuclear option:** `git checkout` the file and start that fix over

---

## 📊 PROGRESS TRACKER

```
Progress: [██░░░░░░░░] 0% → Start here

After Fix #1: [███░░░░░░░] 16% → Containers stable
After Fix #2: [█████░░░░░] 33% → Responsive reliable  
After Fix #3: [██████░░░░] 50% → Mobile safe
After Fix #4: [████████░░] 66% → Spacing clean
After Fix #5: [█████████░] 83% → Headers polished
After Fix #6: [██████████] 100% → READY TO LAUNCH ✅

Testing done: [██████████] VERIFIED → SHIP IT 🚀
```

---

**START WITH FIX #1. DON'T SKIP. DON'T REORDER. FOLLOW THE SEQUENCE.** ✅

---

**Current Status:** 📍 Not Started  
**Next Action:** Open `/src/foundation/DesignSystem.tsx` line 471  
**Time to Launch:** 14 hours from now
