# ✅ CRITICAL FIXES CHECKLIST - Pre-Launch Priority

**Target:** Fix 6 critical issues blocking 85% → 95% production readiness  
**Estimated Time:** 8-12 hours  
**Impact:** Resolves layout breaks, standardizes container system, fixes responsive issues

---

## 🔴 CRITICAL FIX #1: Container System Standardization
**Priority:** HIGHEST  
**Files Affected:** 3  
**Estimated Time:** 2 hours

### Current Problem
Three different container max-widths operating simultaneously:
- DesignSystem.tsx ResponsiveContainer: `"1433px"`
- Container.tsx: `max-w-[1280px]`
- design-system.css: `--container-default: 1280px`

### Fix Steps

#### Step 1.1: Fix DesignSystem.tsx ResponsiveContainer
```tsx
// File: /src/foundation/DesignSystem.tsx
// Line 471 - BEFORE:
desktop: 'style={{ maxWidth: "1433px" }}'

// AFTER:
desktop: 'max-w-[1280px]'
```

#### Step 1.2: Remove hardcoded desktop spacing
```tsx
// File: /src/foundation/DesignSystem.tsx
// Lines 196-205 - BEFORE:
desktop: {
  xs: '0.75rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '2.5rem',
  xxl: '3rem',
  section: 'var(--spacing-section)',
  component: 'var(--grid-gutter)',
},

// AFTER:
desktop: {
  xs: 'var(--spacing-desktop-xs)',
  sm: 'var(--spacing-desktop-sm)',
  md: 'var(--spacing-desktop-md)',
  lg: 'var(--spacing-desktop-lg)',
  xl: 'var(--spacing-desktop-xl)',
  xxl: 'var(--spacing-desktop-2xl)',
  section: 'var(--spacing-section)',
  component: 'var(--grid-gutter)',
},
```

#### Step 1.3: Add missing CSS variables
```css
/* File: /src/styles/design-system.css */
/* Add after line 66: */

/* Desktop spacing tokens */
--spacing-desktop-xs: 12px;   /* 0.75rem */
--spacing-desktop-sm: 16px;   /* 1rem */
--spacing-desktop-md: 24px;   /* 1.5rem */
--spacing-desktop-lg: 32px;   /* 2rem */
--spacing-desktop-xl: 40px;   /* 2.5rem */
--spacing-desktop-2xl: 48px;  /* 3rem */
```

### Verification
```bash
# Run these checks:
grep -r "1433px" src/
grep -r "max-w-\[1280px\]" src/
grep -r "container-default" src/
# All should resolve to 1280px
```

---

## 🔴 CRITICAL FIX #2: Breakpoint Standardization
**Priority:** HIGHEST  
**Files Affected:** 5+  
**Estimated Time:** 2 hours

### Current Problem
Conflicting breakpoint definitions across files:
- Design system: 768px, 1024px
- TeamGrid: 576px, 768px, 1024px
- Container queries: 640px, 900px, 1200px

### Fix Steps

#### Step 2.1: Enforce Tailwind breakpoints
```css
/* File: /src/styles/design-system.css */
/* Lines 128-132 - REPLACE: */
--breakpoint-mobile: 480px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1280px;

/* WITH Tailwind standard: */
--breakpoint-sm: 640px;    /* Tailwind sm */
--breakpoint-md: 768px;    /* Tailwind md */
--breakpoint-lg: 1024px;   /* Tailwind lg */
--breakpoint-xl: 1280px;   /* Tailwind xl */
--breakpoint-2xl: 1536px;  /* Tailwind 2xl */

/* Legacy aliases for backward compatibility */
--breakpoint-mobile: var(--breakpoint-sm);
--breakpoint-tablet: var(--breakpoint-md);
--breakpoint-desktop: var(--breakpoint-lg);
--breakpoint-wide: var(--breakpoint-xl);
```

#### Step 2.2: Fix TeamGrid breakpoints
```css
/* File: /src/components/pages/TeamGrid.css */
/* Lines 321-337 - REPLACE: */
@media (max-width: 576px) { ... }

/* WITH: */
@media (max-width: 639px) { /* Tailwind sm-1 */ }

/* Lines 291-303 - REPLACE: */
@media (min-width: 768px) { ... }
@media (min-width: 1024px) { ... }

/* Keep these - they match Tailwind */
```

#### Step 2.3: Align container query breakpoints
```css
/* File: /src/styles/design-system.css */
/* Lines 241-260 - UPDATE: */
@container grid-wrapper (min-width: 640px) {  /* was 640px ✓ */
  .team-grid { grid-template-columns: repeat(2, 1fr); }
}

@container grid-wrapper (min-width: 1024px) {  /* was 900px → 1024px */
  .team-grid { grid-template-columns: repeat(3, 1fr); }
}

@container grid-wrapper (min-width: 1280px) {  /* was 1200px → 1280px */
  .team-grid { grid-template-columns: repeat(4, 1fr); }
}
```

### Verification
```bash
# Audit all breakpoints:
grep -r "@media (min-width:" src/ | grep -v "640px\|768px\|1024px\|1280px"
grep -r "@container.*min-width:" src/ | grep -v "640px\|1024px\|1280px"
# Should return no results
```

---

## 🔴 CRITICAL FIX #3: Hero Badges Positioning
**Priority:** HIGH  
**Files Affected:** 1  
**Estimated Time:** 1 hour

### Current Problem
Trust badges use viewport height positioning that breaks on short screens:
```css
bottom: 15vh;  /* mobile: 10vh, tablet: 12vh */
```

### Fix Steps

#### Step 3.1: Add minimum pixel fallback
```css
/* File: /src/sections/HeroSection.css */
/* Lines 15-27 - ENHANCE: */
.trust-badges-wrapper {
  position: absolute;
  bottom: max(120px, 15vh);  /* Minimum 120px OR 15vh, whichever larger */
  left: 0;
  right: 0;
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-4);
  z-index: calc(var(--z-base) + 29);
  display: flex;
  justify-content: center;
  overflow: visible;
}
```

#### Step 3.2: Update mobile responsive
```css
/* Lines 164-169 - UPDATE: */
@media (max-width: 768px) {
  .trust-badges-wrapper {
    padding: 0 20px;
    bottom: max(100px, 12vh);  /* min 100px on tablet */
  }
}

/* Lines 197-202 - UPDATE: */
@media (max-width: 480px) {
  .trust-badges-wrapper {
    padding: 0 16px;
    bottom: max(80px, 10vh);  /* min 80px on mobile */
  }
}
```

#### Step 3.3: Add viewport height guard
```css
/* Add at end of HeroSection.css: */

/* Guard for very short viewports */
@media (max-height: 600px) {
  .trust-badges-wrapper {
    bottom: 60px;  /* Fixed position on short screens */
    position: fixed;  /* Switch to fixed on scroll */
  }
}
```

### Verification
```bash
# Test viewports:
# - Desktop: 1920×1080 ✓
# - Tablet landscape: 1024×768 ✓
# - Mobile landscape: 812×375 (iPhone X) ← Critical test
# - Short screen: 1024×600 (netbook) ← Critical test
```

---

## 🔴 CRITICAL FIX #4: Text-Center Overuse
**Priority:** HIGH  
**Files Affected:** 15+  
**Estimated Time:** 3 hours

### Current Problem
37+ page headers use identical centering pattern with no variation

### Fix Steps

#### Step 4.1: Create PageHeader component
```tsx
// File: /src/components/ui/PageHeader.tsx (NEW FILE)
import React from 'react';

export interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

const maxWidthMap = {
  sm: 'max-w-xl',   // 576px
  md: 'max-w-2xl',  // 672px
  lg: 'max-w-3xl',  // 768px
  xl: 'max-w-4xl',  // 896px
  full: 'max-w-full'
};

const alignmentMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  alignment = 'center',
  maxWidth = 'md',
  className = ''
}) => {
  const alignClass = alignmentMap[alignment];
  const maxWClass = maxWidthMap[maxWidth];
  const marginClass = alignment === 'center' ? 'mx-auto' : '';

  return (
    <div className={`space-y-8 mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
          {eyebrow}
        </p>
      )}
      <h1 className='font-headline text-5xl md:text-6xl lg:text-7xl text-(--brand-gold)'>
        {title}
      </h1>
      {subtitle && (
        <p className={`text-lg text-[#C0C0C0] font-body leading-relaxed ${maxWClass} ${marginClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
```

#### Step 4.2: Refactor FAQ page (example)
```tsx
// File: /src/pages/FAQPageNew.tsx
// Lines 105-115 - REPLACE:
<div className='text-center space-y-8 mb-16'>
  <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
    Medusa München
  </p>
  <h1 className='font-headline text-5xl md:text-6xl lg:text-7xl text-(--brand-gold)'>
    Häufige Fragen (FAQ)
  </h1>
  <p className='text-lg text-[#C0C0C0] max-w-2xl mx-auto font-body leading-relaxed'>
    Alles, was Sie zur Buchung, Pflege und zu unseren Künstlern wissen müssen.
  </p>
</div>

// WITH:
import { PageHeader } from '@/components/ui/PageHeader';

<PageHeader
  eyebrow="Medusa München"
  title="Häufige Fragen (FAQ)"
  subtitle="Alles, was Sie zur Buchung, Pflege und zu unseren Künstlern wissen müssen."
  alignment="center"
  maxWidth="md"
/>
```

#### Step 4.3: Add alignment variants
Update 5-10 pages to use different alignments:
- Services page: `alignment="left"`
- Artists page: `alignment="center"` (keep)
- Contact page: `alignment="left"`
- Gallery page: `alignment="center"` (keep)
- Aftercare page: `alignment="left"`

### Verification
```bash
# Count remaining duplicates:
grep -r "text-center space-y-8 mb-16" src/pages/ | wc -l
# Should reduce from 37 to <10
```

---

## 🔴 CRITICAL FIX #5: Spacing Magic Numbers
**Priority:** MEDIUM-HIGH  
**Files Affected:** 10+  
**Estimated Time:** 2 hours

### Current Problem
40+ instances of hardcoded spacing values instead of design tokens

### Fix Steps

#### Step 5.1: Create replacement script
```javascript
// File: /scripts/fix-magic-numbers.js (NEW)
const fs = require('fs');
const glob = require('glob');

const replacements = {
  'gap: 8px': 'gap: var(--space-1)',
  'gap: 16px': 'gap: var(--space-2)',
  'gap: 24px': 'gap: var(--space-3)',
  'gap: 32px': 'gap: var(--space-4)',
  'padding: 24px': 'padding: var(--space-3)',
  'margin-bottom: 64px': 'margin-bottom: var(--space-8)',
  'padding: 0 16px': 'padding: 0 var(--space-2)',
  'padding: 0 20px': 'padding: 0 var(--space-2-5)',
};

glob('src/**/*.css', (err, files) => {
  files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;
    
    Object.entries(replacements).forEach(([old, new]) => {
      if (content.includes(old)) {
        content = content.replace(new RegExp(old, 'g'), new);
        modified = true;
      }
    });
    
    if (modified) {
      fs.writeFileSync(file, content);
      console.log(`✅ Fixed: ${file}`);
    }
  });
});
```

#### Step 5.2: Run automated replacement
```bash
# Install dependencies if needed
npm install glob

# Run script
node scripts/fix-magic-numbers.js

# Review changes
git diff src/**/*.css
```

#### Step 5.3: Manual review high-priority files
- `/src/sections/HeroSection.css`
- `/src/components/pages/TeamGrid.css`
- `/src/styles/gallery-grid.css`
- `/src/components/molecules/Card/ServiceCards.module.css`

### Verification
```bash
# Audit remaining magic numbers:
grep -rE "(gap|padding|margin).*: [0-9]+px" src/**/*.css | grep -v "var(--"
# Review each match for legitimacy
```

---

## 🔴 CRITICAL FIX #6: Grid System Consolidation
**Priority:** MEDIUM-HIGH  
**Files Affected:** 3  
**Estimated Time:** 2 hours

### Current Problem
TeamGrid has TWO grid systems (container queries + media queries) causing conflicts

### Fix Steps

#### Step 6.1: Choose container queries as primary
Container queries are preferred for:
- Component-based responsive behavior
- Better isolation
- Future-proof (CSS standard)

#### Step 6.2: Remove media query grid from TeamGrid.css
```css
/* File: /src/components/pages/TeamGrid.css */
/* Lines 36-41 - REMOVE: */
.team-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  padding: 0 16px;
}

/* Lines 283-311 - REMOVE all @media rules for .team-grid */

/* Keep only: */
.team-card { /* styles */ }
.team-card-content { /* styles */ }
/* etc. */
```

#### Step 6.3: Ensure grid-wrapper exists
```tsx
// File: /src/pages/ArtistsPage.tsx or wherever TeamGrid is used
// Ensure structure:
<div className="grid-wrapper">
  <div className="team-grid">
    {/* cards */}
  </div>
</div>
```

#### Step 6.4: Add fallback for older browsers
```css
/* File: /src/styles/design-system.css */
/* After line 232, add: */

/* Fallback for browsers without container query support */
@supports not (container-type: inline-size) {
  .team-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-2);
  }
  
  @media (min-width: 640px) {
    .team-grid { grid-template-columns: repeat(2, 1fr); }
  }
  
  @media (min-width: 1024px) {
    .team-grid { grid-template-columns: repeat(3, 1fr); }
  }
  
  @media (min-width: 1280px) {
    .team-grid { grid-template-columns: repeat(4, 1fr); }
  }
}
```

### Verification
```bash
# Test in browsers:
# - Chrome 105+ (container query support) ✓
# - Safari 16+ (container query support) ✓
# - Firefox 110+ (container query support) ✓
# - Safari 15 (fallback to media queries) ✓
```

---

## ✅ POST-FIX VERIFICATION CHECKLIST

### Visual Regression Tests
- [ ] Homepage: Container width consistent across sections
- [ ] Artists page: Grid responsive at all breakpoints (640/1024/1280)
- [ ] Gallery page: Images align properly
- [ ] Hero section: Trust badges don't overlap on mobile landscape
- [ ] All pages: Headers use PageHeader component (or have valid centering)
- [ ] Spacing: No visual jumps between components

### Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari 16+ (macOS/iOS)
- [ ] Safari 15 (fallback behavior)
- [ ] Edge (latest)

### Viewport Testing
- [ ] Mobile portrait: 375×667 (iPhone SE)
- [ ] Mobile landscape: 667×375 (iPhone SE)
- [ ] Mobile landscape short: 812×375 (iPhone X)
- [ ] Tablet portrait: 768×1024 (iPad)
- [ ] Tablet landscape: 1024×768 (iPad)
- [ ] Desktop: 1280×800
- [ ] Desktop: 1920×1080
- [ ] Wide: 2560×1440

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings in changed files
- [ ] All imports resolve correctly
- [ ] CSS validates (no syntax errors)

### Performance
- [ ] No layout shift (CLS) issues
- [ ] Container queries don't cause reflow loops
- [ ] PageHeader component memoized if needed

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] All 6 critical fixes completed
- [ ] Visual regression tests pass
- [ ] Browser compatibility confirmed
- [ ] Performance metrics checked
- [ ] Git commits clean and descriptive

### Deployment
- [ ] Create feature branch: `fix/critical-design-issues`
- [ ] Commit fixes with descriptive messages
- [ ] Create PR with before/after screenshots
- [ ] Request design team review
- [ ] Merge to staging for QA
- [ ] Deploy to production

### Post-Deployment
- [ ] Monitor error logs for layout issues
- [ ] Check analytics for bounce rate changes
- [ ] Gather user feedback on new PageHeader variations
- [ ] Document patterns in design system guide

---

## 📊 EXPECTED IMPACT

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Production Readiness | 85% | 95% | +10% |
| Container Consistency | 60% | 100% | +40% |
| Spacing Token Usage | 60% | 90% | +30% |
| Breakpoint Alignment | 70% | 100% | +30% |
| Layout Predictability | 70% | 95% | +25% |
| Page Header Variety | 0% | 40% | +40% |

**Overall Design System Health: 66% → 92%**

---

## 📝 NOTES

- Keep original files backed up in `/forensics/backups/` before changes
- Test each fix independently before moving to next
- Document any edge cases discovered during fixes
- Update Storybook components if applicable
- Consider adding Playwright visual regression tests post-fix

---

**Checklist Version:** 1.0  
**Last Updated:** November 8, 2025  
**Estimated Total Time:** 12 hours  
**Risk Level:** Low (mostly CSS/markup changes, no logic changes)
