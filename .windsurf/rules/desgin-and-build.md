---
trigger: manual
---

# MEDUSA TATTOO SALON - WINDSURF AI RULES
# Zero-tolerance luxury brand with strict compliance requirements

## CRITICAL BRAND CONSTRAINTS - NEVER VIOLATE

### Color Palette (ONLY 4 COLORS ALLOWED)
- Background: #1A1A1A (or #222222 for specific sections) ONLY
- Text Primary: #FFFFFF (white)
- Accent/CTA: #D4AF37 (gold)
- Secondary/Details: #C0C0C0 (chrome/silver)
- FORBIDDEN: Any blue, green, red, purple, or non-brand colors

### Typography (ONLY 2 FONT FAMILIES)
- Headings: Playfair Display ONLY (font-semibold/font-medium)
- Body: Inter ONLY (font-normal)
- FORBIDDEN: Arial, Helvetica, Comic Sans, or any other fonts

### Spacing System (8px Base Grid)
- ONLY use multiples of 8px: 8, 16, 24, 32, 48, 64, 96
- Mobile padding: 24px
- Tablet padding: 32px
- Desktop padding: 48px
- FORBIDDEN: 7px, 13px, 20px, 28px, or any non-8px values

### Container Widths (12-Column Grid System)
- Desktop: max-w-[1104px] (content) in 1200px container
- Tablet: max-w-[704px] (content) in 768px container
- Mobile: max-w-[345px] (content) in 393px container
- FORBIDDEN: max-w-7xl, max-w-6xl, max-w-5xl, arbitrary widths

### Shadows (ONLY Gold/Chrome Glows)
- Gold glow: box-shadow: 0 0 20px rgba(212,175,55,0.3)
- Chrome glow: box-shadow: 0 0 16px rgba(192,192,192,0.4)
- FORBIDDEN: Black shadows, drop shadows, elevation shadows

### Border Radius (4px Base Grid)
- Buttons/Inputs: 8px (rounded-lg)
- Cards: 12px (rounded-xl) - documented exception
- Large sections: 16px/24px/32px
- FORBIDDEN: 6px, 10px, 14px, or arbitrary values

### Touch Targets
- Minimum size: 44×44px (WCAG AA compliance)
- All interactive elements MUST meet this requirement

### Accessibility
- WCAG AA compliance MANDATORY
- Focus states: 2px gold outline with 4px offset
- Keyboard navigation fully functional
- Screen reader support required

## COMPONENT DEVELOPMENT RULES

### File Structure (Atomic Design)
- Use existing components from components/ folder
- DO NOT recreate components that already exist
- Check OurArtists.tsx, BookingFlow.tsx, ComprehensiveFooter.tsx first

### TypeScript Requirements
- All components must be fully typed
- Use interfaces for props
- Avoid `any` type - use specific types

### Responsive Approach
- Mobile-first ALWAYS
- Breakpoints: 393px (mobile), 768px (tablet), 1200px (desktop)
- Test on all three breakpoints

### Booking System Integration
- Use `const { openBooking } = useApp()` for booking actions
- Call `openBooking({ service: 'id' })` or `openBooking({ artist: 'id' })`
- DO NOT create duplicate booking flows

### Performance
- Lazy-load images with `loading="lazy"`
- Use WebP with JPEG fallback via `<picture>` element
- Optimize bundle sizes

## FORBIDDEN ACTIONS

❌ NEVER change the 4-color palette
❌ NEVER add unauthorized fonts
❌ NEVER use spacing that's not divisible by 8px
❌ NEVER use black shadows or generic shadows
❌ NEVER break the 12-column grid system
❌ NEVER create touch targets smaller than 44px
❌ NEVER modify existing production-ready components without explicit permission
❌ NEVER remove accessibility features
❌ NEVER compromise mobile-first approach

## COMPONENT PROMPT TEMPLATE (REQUIRED)

When creating new components, ALWAYS follow this structure:

