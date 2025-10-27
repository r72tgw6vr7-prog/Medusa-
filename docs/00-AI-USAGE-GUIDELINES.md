# AI USAGE GUIDELINES - MEDUSA TATTOO SALON

## OVERVIEW

This document establishes clear boundaries for AI modifications to the Medusa Tattoo Salon project. The project represents a luxury brand with strict compliance requirements, and any AI changes must preserve the brand integrity and professional standards.

---

## ✅ ALLOWED AI MODIFICATIONS

### Component Development
- **Create new components** following the atomic design structure
- **Implement responsive layouts** using mobile-first approach
- **Add accessibility features** that meet WCAG AA standards
- **Optimize performance** with lazy loading and code splitting
- **Enhance user interactions** using approved micro-interactions

### Code Quality Improvements
- **TypeScript improvements** - Add types, interfaces, better error handling
- **Performance optimization** - Bundle optimization, loading improvements
- **Code organization** - Refactor components following naming conventions
- **Testing additions** - Unit tests, integration tests, accessibility tests
- **Documentation creation** - Component documentation, usage examples

### Feature Additions
- **Booking system enhancements** - Improve the 8-step booking flow
- **Form validation** - Enhanced user input validation and feedback
- **Animation improvements** - Luxury micro-interactions within brand guidelines
- **Mobile optimizations** - Enhanced mobile user experience
- **SEO improvements** - Meta tags, structured data, performance

### Content Updates
- **Text content** - Update copy, add translations, improve readability
- **Image optimization** - Compress images, add alt text, improve loading
- **Accessibility content** - ARIA labels, screen reader improvements
- **Documentation** - Technical documentation, component guides

---

## 🚫 FORBIDDEN AI MODIFICATIONS

### Brand Identity (ZERO TOLERANCE)
- **❌ NEVER change colors** outside the 4-color palette (#222222, #FFFFFF, #D4AF37, #C0C0C0)
- **❌ NEVER modify typography** - Must use only Playfair Display and Inter
- **❌ NEVER add unauthorized shadows** - Only gold glow effects allowed
- **❌ NEVER break the 12-column grid** system or 8px spacing increments
- **❌ NEVER compromise mobile-first** approach or responsive breakpoints

### Design System Violations
- **❌ NO generic fallback fonts** - Exact font families required
- **❌ NO arbitrary spacing** - Must use defined spacing tokens only
- **❌ NO non-brand colors** - Blue, green, purple, red are forbidden
- **❌ NO layout chaos** - Elements must maintain grid alignment
- **❌ NO touch target violations** - 44px minimum size mandatory

### Architecture Changes
- **❌ NEVER delete core files** without explicit permission
- **❌ NEVER modify protected files** in `/components/figma/`
- **❌ NEVER change the entry point** structure in App.tsx
- **❌ NEVER remove error boundaries** or accessibility features
- **❌ NEVER compromise lazy loading** or performance optimizations

### Legal & Compliance
- **❌ NEVER modify GDPR compliance** features without legal review
- **❌ NEVER remove accessibility** features or WCAG compliance
- **❌ NEVER change privacy policy** or legal content
- **❌ NEVER modify cookie consent** functionality
- **❌ NEVER add tracking** without privacy compliance

---

## 🎯 SPECIFIC MODIFICATION GUIDELINES

### Working with Existing Components

#### ✅ ALLOWED
```typescript
// Adding new props to existing components
interface ExistingComponentProps {
  existingProp: string;
  newProp?: boolean; // ✅ Adding optional props is allowed
}

// Enhancing functionality while preserving design
const EnhancedComponent = ({ ...props }) => {
  // ✅ Add logic, accessibility, performance improvements
  return <ExistingComponent {...props} />;
};

// Improving TypeScript types
interface BetterTypedProps extends ExistingProps {
  // ✅ Better typing is encouraged
}
```

#### ❌ FORBIDDEN
```typescript
// ❌ NEVER change brand colors
const ForbiddenComponent = () => (
  <div style={{ color: 'blue' }}> {/* ❌ FORBIDDEN */}
    Content
  </div>
);

// ❌ NEVER modify core design tokens
const BadStyling = {
  fontFamily: 'Arial', // ❌ FORBIDDEN - Must use Playfair/Inter
  backgroundColor: '#ff0000', // ❌ FORBIDDEN - Not brand color
  padding: '13px' // ❌ FORBIDDEN - Not 8px increment
};
```

### Creating New Components

#### ✅ ALLOWED PATTERN
```typescript
// ✅ CORRECT: New component following brand guidelines
const NewLuxuryComponent: React.FC<ComponentProps> = ({ ...props }) => {
  return (
    <div className="bg-brand-background border border-brand-gold">
      <h2 className="font-headline text-headline-lg text-brand-gold">
        {/* ✅ Using exact brand tokens */}
      </h2>
      <p className="font-body text-body text-brand-white">
        {/* ✅ Following typography system */}
      </p>
      <button className="btn-cta touch-target">
        {/* ✅ Meeting accessibility requirements */}
      </button>
    </div>
  );
};
```

#### ❌ FORBIDDEN PATTERN
```typescript
// ❌ FORBIDDEN: Violating brand guidelines
const BadComponent = () => (
  <div style={{ 
    backgroundColor: 'lightblue', // ❌ Non-brand color
    fontFamily: 'Comic Sans', // ❌ Wrong font
    padding: '7px' // ❌ Non-8px increment
  }}>
    <button style={{ height: '30px' }}> {/* ❌ Under 44px touch target */}
      Bad Button
    </button>
  </div>
);
```

---

## 📋 PRE-MODIFICATION CHECKLIST

Before making ANY changes, verify:

### Brand Compliance Check
- [ ] **Colors**: Only using approved 4-color palette
- [ ] **Typography**: Only Playfair Display and Inter fonts
- [ ] **Spacing**: Following 8px increment system
- [ ] **Shadows**: Only gold glow effects, no other shadows
- [ ] **Grid**: Maintaining 12-column grid alignment

### Technical Compliance Check
- [ ] **Responsive**: Mobile-first approach maintained
- [ ] **Accessibility**: WCAG AA standards preserved
- [ ] **Touch Targets**: All interactive elements 44px+ minimum
- [ ] **Performance**: Lazy loading and optimization intact
- [ ] **TypeScript**: Proper typing and error handling

### Component Structure Check
- [ ] **Naming**: Following atomic design conventions
- [ ] **Organization**: Proper folder structure maintained
- [ ] **Dependencies**: No unauthorized dependencies added
- [ ] **Testing**: Component functionality verified
- [ ] **Documentation**: Usage examples provided

---

## 🔧 MODIFICATION WORKFLOWS

### Adding New Features

1. **Review brand guidelines** in `Guidelines.md`
2. **Check design tokens** in `/00-DESIGN-TOKENS.md`
3. **Follow atomic design** structure in `/01-components-library/`
4. **Test on all breakpoints** (320px, 375px, 768px, 1200px)
5. **Verify accessibility** with screen readers and keyboard navigation
6. **Document the component** with usage examples

### Enhancing Existing Components

1. **Use the view_tool** to read existing component code first
2. **Preserve all brand-compliant styling** and structure
3. **Only modify functionality/logic** unless explicitly requested
4. **Test backward compatibility** with existing implementations
5. **Update TypeScript types** if needed
6. **Document changes** made

### Bug Fixes and Optimizations

1. **Identify root cause** without modifying design
2. **Fix functionality** while preserving visual design
3. **Optimize performance** without changing appearance
4. **Test edge cases** thoroughly
5. **Verify no regression** in brand compliance

---

## 🚨 EMERGENCY PROCEDURES

### If Brand Violations Are Detected

1. **STOP immediately** - Do not proceed with modifications
2. **Document the violation** - What was changed and why it's problematic
3. **Revert to last known good state** if possible
4. **Consult brand guidelines** for correct implementation
5. **Re-implement following** exact brand specifications

### If Technical Issues Arise

1. **Preserve brand compliance** first and foremost
2. **Use error boundaries** to contain issues
3. **Implement fallback components** maintaining brand design
4. **Document the issue** for future resolution
5. **Test thoroughly** before considering complete

### If Accessibility Problems Occur

1. **Maintain WCAG AA compliance** at all times
2. **Preserve touch target sizes** (44px minimum)
3. **Keep keyboard navigation** functional
4. **Maintain color contrast** ratios
5. **Test with screen readers** before completion

---

## 📚 REQUIRED READING

Before making any modifications, review these essential documents:

1. **`Guidelines.md`** - Complete brand mandate and constraints
2. **`/00-DESIGN-TOKENS.md`** - All approved design values
3. **`DESIGN_SYSTEM_README.md`** - Design system architecture
4. **`COMPONENT_ORGANIZATION_SUMMARY.md`** - Component structure
5. **Component-specific `.md` files** for complex components

---

## ✨ BEST PRACTICES FOR AI MODIFICATIONS

### Code Quality
- **Write clean, readable code** with clear variable names
- **Add TypeScript types** for all props and functions
- **Include error handling** for all user interactions
- **Optimize for performance** with lazy loading and memoization
- **Document complex logic** with clear comments

### User Experience
- **Prioritize accessibility** in all implementations
- **Ensure mobile-first design** works perfectly
- **Test on real devices** when possible
- **Optimize loading states** and error states
- **Provide clear user feedback** for all actions

### Maintainability
- **Follow atomic design principles** for component organization
- **Use consistent naming conventions** across the project
- **Keep components focused** on single responsibilities
- **Provide usage examples** for complex components
- **Update documentation** when adding new features

---

## 🔍 TESTING REQUIREMENTS

### Before Completing Any Modification

#### Visual Testing
- [ ] **Mobile (320px)**: Layout integrity maintained
- [ ] **Mobile (375px)**: Touch targets 44px+ verified
- [ ] **Tablet (768px)**: Grid transitions work correctly
- [ ] **Desktop (1200px+)**: Full 12-column layout functional

#### Brand Compliance Testing
- [ ] **Color palette**: Only 4 approved colors used
- [ ] **Typography**: Only Playfair Display and Inter fonts
- [ ] **Spacing**: All elements use 8px increment spacing
- [ ] **Shadows**: Only gold glow effects present
- [ ] **Grid alignment**: All elements snap to 12-column grid

#### Functional Testing
- [ ] **Accessibility**: Screen reader and keyboard navigation
- [ ] **Performance**: Loading times and bundle sizes
- [ ] **Error handling**: Error boundaries and fallback states
- [ ] **Mobile interactions**: Touch gestures and sticky elements
- [ ] **Cross-browser**: Chrome, Firefox, Safari, Edge compatibility

---

## 📞 ESCALATION PROCEDURES

### When in Doubt
- **Preserve existing functionality** - Don't break what works
- **Follow brand guidelines** strictly - When unsure, choose brand compliance
- **Document questions** - Note any uncertainties for review
- **Test thoroughly** - Better to over-test than under-test
- **Ask for clarification** - Request specific guidance when needed

### Critical Issues
- **Security vulnerabilities** - Address immediately while preserving brand
- **Accessibility violations** - Fix with highest priority
- **Performance degradation** - Optimize without changing design
- **Legal compliance issues** - Handle with extreme caution
- **Brand violations** - Correct immediately, no exceptions

---

**REMEMBER**: Medusa Tattoo Salon is a luxury brand with zero tolerance for brand guideline violations. When in doubt, preserve the existing brand-compliant implementation and ask for specific guidance.

**Last Updated**: October 2025  
**Status**: Mandatory compliance for all AI modifications  
**Enforcement**: Zero tolerance policy for brand violations