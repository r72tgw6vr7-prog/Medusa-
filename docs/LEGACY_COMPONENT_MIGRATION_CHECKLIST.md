# LEGACY COMPONENT MIGRATION CHECKLIST

This document provides a structured checklist for migrating each legacy component to comply with the Medusa design system.

## MIGRATION PROCESS OVERVIEW

1. **Assessment**: Review component and understand its functionality
2. **Planning**: Define migration strategy and needed changes
3. **Implementation**: Create new component using design system
4. **Testing**: Verify functionality and design compliance
5. **Documentation**: Update component documentation

---

## COMPONENT: ImageWithFallback.tsx

### Assessment (MIGRATE)
- [x] Simple utility component with minimal styling
- [x] Well-structured with good TypeScript types
- [x] Used by multiple other components

### Required Changes
- [ ] Replace hardcoded background color with design token
- [ ] Add aria-live for accessibility
- [ ] Update error image to match brand style

### Migration Tasks
- [ ] Create new component in design system folder
- [ ] Apply design token variables for colors
- [ ] Add proper accessibility attributes
- [ ] Test with various image scenarios (loading, error, success)
- [ ] Update imports in all dependent components

### Testing Criteria
- [ ] Verify fallback behavior works correctly
- [ ] Confirm design token compliance
- [ ] Test across different image sizes
- [ ] Verify screen reader experience

---

## COMPONENT: ProcessTimeline.tsx

### Assessment (MIGRATE)
- [x] Well-structured timeline component
- [x] Good responsive behavior
- [x] Uses Intersection Observer appropriately

### Required Changes
- [ ] Replace non-standard spacing values with tokens
- [ ] Standardize color usage with design system variables
- [ ] Fix border-radius inconsistencies
- [ ] Enhance accessibility for interactive elements

### Migration Tasks
- [ ] Create new component in design system folder
- [ ] Apply consistent spacing tokens
- [ ] Extract animation logic to reusable hooks
- [ ] Update gradient and color values to use tokens
- [ ] Implement proper focus states
- [ ] Add reduced motion support

### Testing Criteria
- [ ] Verify mobile/tablet/desktop layouts
- [ ] Test animation performance
- [ ] Confirm keyboard navigation works
- [ ] Test with screen readers
- [ ] Verify reduced motion preference support

---

## COMPONENT: ServiceMindMap.tsx

### Assessment (REFACTOR)
- [x] Complex component with significant styling
- [x] Multiple animation effects
- [x] Important business functionality

### Required Changes
- [ ] Complete overhaul of color usage
- [ ] Standardize spacing system
- [ ] Extract complex animations
- [ ] Fix shadow inconsistencies
- [ ] Improve accessibility
- [ ] Optimize performance

### Migration Tasks
- [ ] Create new component structure
- [ ] Extract content data model
- [ ] Implement design token-based styling
- [ ] Create reusable animation patterns
- [ ] Enhance responsive behavior
- [ ] Implement proper focus management
- [ ] Add reduced motion support

### Testing Criteria
- [ ] Verify all interactive elements work
- [ ] Test responsive layouts
- [ ] Confirm animation performance
- [ ] Validate accessibility
- [ ] Verify design token compliance
- [ ] Test language switching

---

## COMPONENT: SalonCarousel.tsx

### Assessment (REFACTOR)
- [x] Complex carousel with custom animations
- [x] Heavy use of inline styles
- [x] Multiple custom effects

### Required Changes
- [ ] Replace all hardcoded styles
- [ ] Standardize animation effects
- [ ] Fix color usage
- [ ] Improve keyboard navigation
- [ ] Add reduced motion support
- [ ] Optimize performance

### Migration Tasks
- [ ] Create new component with proper structure
- [ ] Extract carousel logic to hooks
- [ ] Implement design token-based styling
- [ ] Standardize animation effects
- [ ] Enhance keyboard navigation
- [ ] Add proper focus management
- [ ] Implement reduced motion alternative

### Testing Criteria
- [ ] Verify carousel navigation
- [ ] Test keyboard accessibility
- [ ] Confirm animation performance
- [ ] Validate design token compliance
- [ ] Test responsive behavior
- [ ] Verify screen reader announcements

---

## COMPONENT: TrustSignalsBar.tsx

### Assessment (REPLACE)
- [x] Incomplete component missing CSS
- [x] Counter animation functionality
- [x] Simple structure but unclear styling

### Required Changes
- [ ] Complete rebuild with design system
- [ ] Create proper CSS module
- [ ] Standardize animation effects
- [ ] Fix accessibility issues
- [ ] Implement proper responsive behavior

### Migration Tasks
- [ ] Create new component from scratch
- [ ] Extract counter animation logic to hook
- [ ] Implement design token-based styling
- [ ] Create proper CSS module with BEM naming
- [ ] Add accessibility features for counters
- [ ] Implement proper responsive design

### Testing Criteria
- [ ] Verify counter animations
- [ ] Test responsive layouts
- [ ] Confirm design token compliance
- [ ] Validate accessibility
- [ ] Test performance on low-end devices

---

## DESIGN SYSTEM TOKEN MIGRATION REFERENCE

### Color Tokens
- `#222222` → `var(--brand-background)`
- `#FFFFFF` → `var(--brand-white)`
- `#D4AF37` → `var(--brand-gold)`
- `#C0C0C0` → `var(--brand-chrome)`
- `#C19B26` → `var(--brand-gold-hover)`
- `#A8A8A8` → `var(--brand-chrome-hover)`

### Shadow Tokens
- `0 0 20px rgba(212, 175, 55, 0.3)` → `var(--gold-glow)`
- `0 0 30px rgba(212, 175, 55, 0.4)` → `var(--gold-glow-strong)`
- `0 0 10px rgba(212, 175, 55, 0.2)` → `var(--gold-glow-subtle)`

### Font Tokens
- `"Playfair Display", serif` → `var(--font-headline)`
- `"Inter", sans-serif` → `var(--font-body)`

### Spacing Tokens (8px Grid System)
- `0.5rem (8px)` → `var(--spacing-1)`
- `1rem (16px)` → `var(--spacing-2)`
- `1.5rem (24px)` → `var(--spacing-3)`
- `2rem (32px)` → `var(--spacing-4)`
- `2.5rem (40px)` → `var(--spacing-5)`
- `3rem (48px)` → `var(--spacing-6)`
- `4rem (64px)` → `var(--spacing-8)`
- `6rem (96px)` → `var(--spacing-12)`
- `8rem (128px)` → `var(--spacing-16)`

### Animation Tokens
- `cubic-bezier(0.4, 0, 0.2, 1)` → `var(--interaction-timing)`
- `cubic-bezier(0.25, 0.46, 0.45, 0.94)` → `var(--luxury-timing)`
- `cubic-bezier(0.37, 0, 0.63, 1)` → `var(--breathing-timing)`

### Breakpoint Tokens
- `320px` → `var(--breakpoint-mobile)`
- `375px` → `var(--breakpoint-mobile-large)`
- `768px` → `var(--breakpoint-tablet)`
- `1200px` → `var(--breakpoint-desktop)`

---

## COMMON MIGRATION PATTERNS

### Text Elements
```jsx
// BEFORE
<h2 className="text-headline-lg font-headline text-brand-gold mb-6">
  {t.headline}
</h2>

// AFTER
<h2 className="headline-large gold mb-spacing-2">
  {t.headline}
</h2>
```

### Card Elements
```jsx
// BEFORE
<div className="relative h-[600px] rounded-3xl overflow-hidden transition-all duration-700 cursor-pointer">

// AFTER
<div className="medusa-card medusa-card-large">
```

### Animation Patterns
```jsx
// BEFORE
<motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 40 }}
  transition={{ duration: 0.8 }}
>

// AFTER
<motion.div
  variants={fadeInUpVariants}
  initial="hidden"
  animate={isVisible ? "visible" : "hidden"}
>
```

### Responsive Patterns
```jsx
// BEFORE
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

// AFTER
<div className="medusa-grid medusa-grid-responsive">
```

### Focus States
```jsx
// BEFORE
<button className="focus:outline-none focus:ring-2 focus:ring-gold">

// AFTER
<button className="focus-gold-glow">
```

---

## MIGRATION TRACKING

| Component | Status | Assigned To | PR Link | Notes |
|-----------|--------|-------------|---------|-------|
| ImageWithFallback.tsx | Not Started | | | |
| ProcessTimeline.tsx | Not Started | | | |
| ServiceMindMap.tsx | Not Started | | | |
| SalonCarousel.tsx | Not Started | | | |
| TrustSignalsBar.tsx | Not Started | | | |

---

## DEPENDENCIES AND PREREQUISITES

1. **Design System Implementation**
   - Complete design token definitions
   - Create utility classes for common patterns
   - Build base components for composition

2. **Animation System**
   - Define standard animation variants
   - Create animation hooks
   - Implement reduced motion alternatives

3. **Testing Environment**
   - Set up visual regression testing
   - Create accessibility testing workflow
   - Configure performance measurement

4. **Documentation**
   - Create component usage guidelines
   - Document migration patterns
   - Update Storybook examples

---

## COMPLETION CRITERIA

A component migration is considered complete when:

1. All design token violations are resolved
2. Component passes accessibility testing
3. Performance metrics meet or exceed legacy component
4. Visual appearance matches design specifications
5. Functionality is preserved or enhanced
6. Documentation is updated
7. Code review is completed
8. All tests pass

---

**Migration Start Date**: [TBD]  
**Target Completion Date**: [TBD]