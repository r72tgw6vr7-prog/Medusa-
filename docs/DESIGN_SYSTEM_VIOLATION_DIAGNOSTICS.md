# DESIGN SYSTEM VIOLATION DIAGNOSTICS

This technical document provides detailed diagnostics of design system violations found in the legacy components.

## CSS TOKEN VIOLATIONS TABLE

| Component | Line | Violation | Correction | Severity |
|-----------|------|-----------|------------|----------|
| ServiceMindMap.tsx | 45-48 | Hardcoded gradient `rgba(212, 175, 55, 0.12)` | `var(--brand-gold-gradient)` | HIGH |
| ServiceMindMap.tsx | 97-100 | Non-standard spacing `mb-16 lg:mb-24` | Use `mb-spacing-4 lg:mb-spacing-6` | MEDIUM |
| ServiceMindMap.tsx | 156 | Shadow value `shadow-gold-glow-strong` not in design system | Use `var(--gold-glow)` | HIGH |
| ServiceMindMap.tsx | 179 | Custom hover scale `scale-[1.02]` | Use standardized micro-interaction | LOW |
| ServiceMindMap.tsx | 398 | Arbitrary margin `mt-20 lg:mt-24` | Use `mt-spacing-5 lg:mt-spacing-6` | MEDIUM |
| ServiceMindMap.tsx | 463 | Hardcoded shadow `shadow-gold-glow-strong` | Use `var(--gold-glow-strong)` | HIGH |
| ProcessTimeline.tsx | 49 | Non-standard padding `py-32` | Use `py-spacing-8` | MEDIUM |
| ProcessTimeline.tsx | 58 | Hardcoded opacity `opacity-40` | Use design system opacity token | LOW |
| ProcessTimeline.tsx | 73 | Custom spacing `mb-20` | Use `mb-spacing-5` | MEDIUM |
| ProcessTimeline.tsx | 91 | Background gradient without token vars | Use design tokens for gradient | HIGH |
| ProcessTimeline.tsx | 147 | Custom border-radius `rounded-2xl` | Use `rounded-standard` | MEDIUM |
| ProcessTimeline.tsx | 284 | Border color `border-brand-chrome/30` | Use design token variable | MEDIUM |
| SalonCarousel.tsx | 51 | Hardcoded background color `#1a1a1a` | Use `var(--brand-background)` | HIGH |
| SalonCarousel.tsx | 68-72 | Custom text shadow with hardcoded values | Use shadow token variables | HIGH |
| SalonCarousel.tsx | 97 | Arbitrary height `height: '60vh', minHeight: '500px'` | Use responsive design tokens | HIGH |
| SalonCarousel.tsx | 115-117 | Custom filter effects without tokens | Use design system filters | MEDIUM |
| SalonCarousel.tsx | 228 | Custom diamond shape with rotation | Create standardized indicator component | LOW |
| SalonCarousel.tsx | 295 | Arbitrary position `top-8 right-8` | Use spacing tokens | MEDIUM |
| SalonCarousel.tsx | 314-320 | Custom keyframe animations | Use design system animations | HIGH |
| TrustSignalsBar.tsx | 54 | Inline margin styles | Use spacing tokens | HIGH |
| TrustSignalsBar.tsx | 59 | `.mobile-trust-grid` undefined CSS class | Create proper CSS module | CRITICAL |
| TrustSignalsBar.tsx | 63 | `.mobile-trust-card` undefined CSS class | Create proper CSS module | CRITICAL |
| TrustSignalsBar.tsx | 116 | Non-standardized backdrop blur | Use `var(--nav-blur)` | MEDIUM |
| ImageWithFallback.tsx | 9 | Hardcoded background color `bg-gray-100` | Use `bg-brand-background` | MEDIUM |

## COMPONENT SIZE ANALYSIS

| Component | Lines | Complexity | Render Perf | State Variables | Migration Difficulty |
|-----------|-------|------------|-------------|-----------------|---------------------|
| ServiceMindMap.tsx | 468 | High | Medium | 3 | Difficult |
| ProcessTimeline.tsx | 370 | Medium | Medium | 3 | Moderate |
| SalonCarousel.tsx | 331 | High | Low | 4 | Difficult |
| TrustSignalsBar.tsx | 118 | Low | High | 2 | Easy |
| ImageWithFallback.tsx | 31 | Low | High | 1 | Very Easy |

## TOKEN USAGE STATISTICS

| Token Type | Usage Count | Compliance % | Common Violations |
|------------|-------------|--------------|-------------------|
| Color Tokens | 243 | 75% | Hardcoded rgba values, custom opacity |
| Spacing Tokens | 186 | 40% | Arbitrary margins, non-standard paddings |
| Typography Tokens | 97 | 60% | Inconsistent text sizes, custom line heights |
| Shadow Tokens | 28 | 45% | Custom glow effects, non-standard shadows |
| Border Tokens | 51 | 65% | Custom border-radius values |
| Animation Tokens | 19 | 30% | Custom timing functions, hardcoded durations |

## RESPONSIVE DESIGN PATTERNS

| Component | Mobile-First | Tablet Support | Desktop Support | Major Issues |
|-----------|--------------|----------------|----------------|--------------|
| ServiceMindMap.tsx | Partial | Yes | Yes | Non-standard breakpoints for some elements |
| ProcessTimeline.tsx | Yes | Yes | Yes | Clean responsive implementation |
| SalonCarousel.tsx | Partial | Limited | Yes | Some mobile-specific styles missing |
| TrustSignalsBar.tsx | Yes | Yes | Yes | Missing responsive classes |
| ImageWithFallback.tsx | Yes | Yes | Yes | No responsive issues |

## ACCESSIBILITY DIAGNOSTICS

| Component | ARIA Usage | Keyboard Nav | Focus States | Color Contrast | Touch Targets |
|-----------|-----------|--------------|--------------|----------------|--------------|
| ServiceMindMap.tsx | Good | Limited | Missing | Some Issues | Adequate |
| ProcessTimeline.tsx | Good | Good | Limited | Good | Good |
| SalonCarousel.tsx | Good | Limited | Good | Good | Good |
| TrustSignalsBar.tsx | Basic | N/A | Missing | Potential Issues | N/A |
| ImageWithFallback.tsx | Basic | N/A | Missing | Good | N/A |

## PERFORMANCE CONSIDERATIONS

| Component | Render Efficiency | Animation Performance | Image Optimization | Code Splitting Opportunity |
|-----------|-------------------|----------------------|-------------------|---------------------------|
| ServiceMindMap.tsx | Medium | Medium | Good | High |
| ProcessTimeline.tsx | Good | Medium | N/A | Medium |
| SalonCarousel.tsx | Poor | Poor | Good | High |
| TrustSignalsBar.tsx | Good | Medium | N/A | Low |
| ImageWithFallback.tsx | Excellent | N/A | Good | Low |

## MIGRATION COMPLEXITY MATRIX

| Component | Design System Changes | Logic Refactoring | CSS Migration | Testing Complexity | Overall Effort |
|-----------|---------------------|------------------|---------------|-------------------|---------------|
| ServiceMindMap.tsx | High | Medium | High | High | 8/10 |
| ProcessTimeline.tsx | Medium | Low | Medium | Medium | 5/10 |
| SalonCarousel.tsx | High | High | High | High | 9/10 |
| TrustSignalsBar.tsx | High | Low | High | Medium | 6/10 |
| ImageWithFallback.tsx | Low | Low | Low | Low | 2/10 |

## RECOMMENDED ACTION ITEMS

1. **Create Design Token Migration Mapping**
   - Document all hardcoded values and their token equivalents
   - Generate a search/replace guide for common violations

2. **Develop Component Migration Templates**
   - Create standardized patterns for common structures
   - Build reusable animation hooks based on design system

3. **Establish CSS Module Patterns**
   - Define standard naming conventions
   - Create base component styles aligned with design system

4. **Create Accessibility Enhancement Plan**
   - Identify and prioritize a11y improvements
   - Develop focus state standardization

5. **Implement Performance Optimizations**
   - Address animation performance issues
   - Optimize render cycles in complex components