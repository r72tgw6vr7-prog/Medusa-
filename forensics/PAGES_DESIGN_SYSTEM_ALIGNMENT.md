# Pages Design System Alignment Plan
**Date:** November 9, 2025  
**Status:** Ready for Implementation

---

## Overview

Align Contact, Booking, and Gallery pages with the established design system to ensure consistency across the application.

---

## Current Issues Summary

### **Contact Page:**
- ❌ Inconsistent gap usage (`gap-8`, `gap-16`)
- ❌ Non-standard grid fractions
- ❌ Mixed padding values
- ❌ Arbitrary border-radius values

### **Booking Page:**
- ❌ Arbitrary max-width (`max-w-6xl`)
- ❌ Inconsistent padding (`p-8`, `md:p-16`)
- ❌ Mixed gap values
- ❌ Non-standard breakpoints

### **Gallery Page:**
- ❌ Inconsistent grid columns
- ❌ Mixed gap values
- ❌ Non-standard breakpoints
- ❌ Arbitrary padding

---

## Design System Standards

### **Spacing Scale:**
```css
--spacing-0-5: 6px;    /* 0.375rem */
--spacing-1: 8px;      /* 0.5rem */
--spacing-1-5: 12px;   /* 0.75rem */
--spacing-2: 16px;     /* 1rem */
--spacing-2-5: 20px;   /* 1.25rem */
--spacing-3: 24px;     /* 1.5rem */
--spacing-4: 32px;     /* 2rem */
--spacing-5: 40px;     /* 2.5rem */
--spacing-6: 48px;     /* 3rem */
--spacing-8: 64px;     /* 4rem */
```

### **Container Widths:**
```css
--container-width-sm: 640px;
--container-width-md: 768px;
--container-width-lg: 1024px;
--container-width-xl: 1280px;
--container-width-2xl: 1536px;
```

### **Grid System:**
```css
/* 12-column grid */
grid-template-columns: repeat(12, 1fr);

/* Standard gaps */
gap: var(--spacing-3);  /* 24px - default */
gap: var(--spacing-4);  /* 32px - large sections */
```

### **Border Radius:**
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
```

### **Breakpoints:**
```css
--breakpoint-mobile: 640px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1024px;
--breakpoint-wide: 1280px;
```

---

## Implementation Plan

## Phase 1: Contact Page Fixes

### **1.1 Layout Structure**

**Current:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
  <div className="lg:col-span-7">Form</div>
  <div className="lg:col-span-5">Details</div>
</div>
```

**Fixed:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-12" style={{ gap: 'var(--spacing-4)' }}>
  <div className="lg:col-span-7">Form</div>
  <div className="lg:col-span-5">Details</div>
</div>
```

### **1.2 Form Section**

**Spacing:**
- Container padding: `var(--spacing-4)` (32px)
- Form group gap: `var(--spacing-3)` (24px)
- Input padding: `var(--spacing-2)` (16px)

**Grid:**
- Desktop: `col-span-7`
- Mobile: `col-span-12`

### **1.3 Details Section**

**Spacing:**
- Card gap: `var(--spacing-2)` (16px)
- Card padding: `var(--spacing-3)` (24px)
- Icon spacing: `var(--spacing-1-5)` (12px)

**Grid:**
- Desktop: `col-span-5`
- Mobile: `col-span-12`

---

## Phase 2: Booking Page Fixes

### **2.1 Container Layout**

**Current:**
```tsx
<div className="max-w-6xl mx-auto p-8 md:p-16">
```

**Fixed:**
```tsx
<div style={{
  maxWidth: 'var(--container-width-lg)',
  margin: '0 auto',
  padding: 'var(--section-padding)'
}}>
```

### **2.2 Form Layout**

**Spacing:**
- Mobile: `var(--spacing-3)` (24px)
- Tablet: `var(--spacing-4)` (32px)
- Desktop: `var(--spacing-5)` (40px)

**Grid:**
```tsx
<div style={{
  display: 'grid',
  gap: 'var(--spacing-4)',
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'
}}>
```

### **2.3 Form Groups**

**Spacing:**
- Group gap: `var(--spacing-3)` (24px)
- Label margin: `var(--spacing-1)` (8px)
- Input padding: `var(--spacing-2)` (16px)

---

## Phase 3: Gallery Page Fixes

### **3.1 Gallery Grid**

**Current:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Fixed:**
```tsx
<div className="gallery-grid" style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: 'var(--spacing-3)'
}}>
```

**Breakpoints:**
- Mobile: `repeat(1, 1fr)`
- Tablet: `repeat(2, 1fr)`
- Desktop: `repeat(3, 1fr)`
- Wide: `repeat(4, 1fr)`

### **3.2 Gallery Items**

**Spacing:**
- Aspect ratio: `1` (square)
- Border radius: `var(--radius-lg)` (12px)
- Padding: `0` (full bleed images)

### **3.3 Container**

**Width:**
```tsx
<div style={{
  maxWidth: 'var(--container-width-xl)',
  margin: '0 auto',
  padding: 'var(--container-padding)'
}}>
```

---

## CSS Variables to Add

### **Create: `/src/styles/design-tokens.css`**

```css
:root {
  /* Spacing */
  --spacing-0-5: 0.375rem;  /* 6px */
  --spacing-1: 0.5rem;      /* 8px */
  --spacing-1-5: 0.75rem;   /* 12px */
  --spacing-2: 1rem;        /* 16px */
  --spacing-2-5: 1.25rem;   /* 20px */
  --spacing-3: 1.5rem;      /* 24px */
  --spacing-4: 2rem;        /* 32px */
  --spacing-5: 2.5rem;      /* 40px */
  --spacing-6: 3rem;        /* 48px */
  --spacing-8: 4rem;        /* 64px */

  /* Container Widths */
  --container-width-sm: 640px;
  --container-width-md: 768px;
  --container-width-lg: 1024px;
  --container-width-xl: 1280px;
  --container-width-2xl: 1536px;

  /* Container Padding */
  --container-padding: var(--spacing-4);
  --container-padding-mobile: var(--spacing-3);

  /* Section Padding */
  --section-padding: var(--spacing-8) var(--spacing-4);
  --section-padding-mobile: var(--spacing-6) var(--spacing-3);

  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;

  /* Breakpoints (for use in JS) */
  --breakpoint-mobile: 640px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-wide: 1280px;
}
```

---

## Implementation Steps

### **Step 1: Design System Foundation**

1. ✅ Create `/src/styles/design-tokens.css`
2. ✅ Import in `main.tsx`
3. ✅ Verify variables available globally

### **Step 2: Contact Page**

1. ⏳ Update grid system to 12-column
2. ⏳ Replace hardcoded gaps with `var(--spacing-*)`
3. ⏳ Standardize padding values
4. ⏳ Fix border-radius values
5. ⏳ Test responsive behavior

### **Step 3: Booking Page**

1. ⏳ Update container max-width
2. ⏳ Replace padding with design system values
3. ⏳ Fix form grid system
4. ⏳ Standardize spacing
5. ⏳ Test responsive behavior

### **Step 4: Gallery Page**

1. ⏳ Update grid system
2. ⏳ Standardize gaps
3. ⏳ Fix container width
4. ⏳ Update item styling
5. ⏳ Test responsive behavior

### **Step 5: Quality Assurance**

1. ⏳ Verify all spacing uses design tokens
2. ⏳ Confirm responsive behavior at all breakpoints
3. ⏳ Check grid alignment across pages
4. ⏳ Validate padding/margin consistency
5. ⏳ Test container behavior at different widths

---

## Testing Checklist

### **Visual Consistency:**
- [ ] Spacing matches design system
- [ ] Grid alignment consistent
- [ ] Typography follows standards
- [ ] Colors match brand palette

### **Responsive Behavior:**
- [ ] Mobile (< 640px): Single column layout
- [ ] Tablet (640-1023px): 2-column layout
- [ ] Desktop (1024-1279px): 3-column layout
- [ ] Wide (≥ 1280px): 4-column layout

### **Technical Quality:**
- [ ] No hardcoded spacing values
- [ ] All CSS variables defined
- [ ] Proper container widths
- [ ] Standard border radius
- [ ] Consistent breakpoints

---

## Files to Modify

### **New Files:**
1. `/src/styles/design-tokens.css` - CSS variables

### **Modified Files:**
1. `/src/pages/ContactPage.tsx` - Layout & spacing fixes
2. `/src/pages/BookingPage.tsx` - Container & grid fixes
3. `/src/pages/GalleryPage.tsx` - Grid & spacing fixes
4. `/src/main.tsx` - Import design tokens

---

## Success Criteria

1. ✅ All pages use design system spacing
2. ✅ Consistent grid system across pages
3. ✅ Standard container widths
4. ✅ Proper responsive behavior
5. ✅ No hardcoded spacing values
6. ✅ Visual consistency maintained

---

## Next Actions

**Immediate:**
1. Create `design-tokens.css`
2. Audit Contact Page
3. Audit Booking Page
4. Audit Gallery Page
5. Implement fixes systematically

**Follow-up:**
1. Document design system usage
2. Create component style guide
3. Add design system tests
4. Update developer documentation
