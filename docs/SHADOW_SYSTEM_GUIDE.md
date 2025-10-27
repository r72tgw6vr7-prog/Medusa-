# Medusa Shadow System Guide

This document provides a comprehensive overview of the shadow system used in the Medusa Tattoo Website project.

## Shadow Variables Overview

The project uses several CSS custom properties (variables) for shadows, defined across different files:

### 1. In `variables.css`

```css
/* Shadows */
--gold-glow-subtle: 0 0 10px rgba(212, 175, 55, 0.2);
--gold-glow: 0 0 20px rgba(212, 175, 55, 0.3);
--gold-glow-strong: 0 0 30px rgba(212, 175, 55, 0.4);
--shadow-gold-medium: 0 4px 20px rgba(212, 175, 55, 0.3);
```

### 2. In `utility-tokens.css`

```css
/* Brand-specific shadows */
--shadow-gold: 0 4px 12px rgba(212, 175, 55, 0.3); /* Accent elements */
--shadow-gold-hover: 0 6px 16px rgba(212, 175, 55, 0.4); /* Hover states */
--shadow-gold-active: 0 2px 8px rgba(212, 175, 55, 0.5); /* Active/pressed */

/* Regular shadows */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.12), 0 1px 3px rgba(0, 0, 0, 0.08);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.12), 0 4px 6px rgba(0, 0, 0, 0.08);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.12), 0 10px 10px rgba(0, 0, 0, 0.08);
```

### 3. In `design-tokens.ts` (JavaScript version)

```javascript
shadows: {
  // Elevation Shadows
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 2px 4px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1)',
  md: '0 4px 8px rgba(0, 0, 0, 0.05), 0 2px 4px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 16px rgba(0, 0, 0, 0.05), 0 4px 8px rgba(0, 0, 0, 0.1)',
  xl: '0 16px 32px rgba(0, 0, 0, 0.05), 0 8px 16px rgba(0, 0, 0, 0.1)',
  '2xl': '0 24px 48px rgba(0, 0, 0, 0.05), 0 12px 24px rgba(0, 0, 0, 0.1)',

  // Gold Accent Shadows
  'gold-sm': '0 2px 4px rgba(212, 175, 55, 0.1)',
  'gold-md': '0 4px 8px rgba(212, 175, 55, 0.15)',
  'gold-lg': '0 8px 16px rgba(212, 175, 55, 0.2)',
  'gold-xl': '0 16px 32px rgba(212, 175, 55, 0.25)',

  // Ambient Light
  'ambient-sm': '0 0 16px rgba(212, 175, 55, 0.1)',
  'ambient-md': '0 0 32px rgba(212, 175, 55, 0.15)',
  'ambient-lg': '0 0 48px rgba(212, 175, 55, 0.2)',
  'ambient-xl': '0 0 64px rgba(212, 175, 55, 0.25)',
}
```

## Usage Methods

There are three different ways to use these shadows in your components:

### 1. CSS Classes (from utility-tokens.css)

```html
<!-- Standard shadows -->
<div class="shadow-sm">Small shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>

<!-- Gold shadow -->
<div class="shadow-gold">Gold accented shadow</div>

<!-- Interactive shadows -->
<div class="shadow-hover">Hover to see effect</div>
```

### 2. CSS Variables (direct application)

```css
.my-element {
  box-shadow: var(--gold-glow);
}

.my-element:hover {
  box-shadow: var(--gold-glow-strong);
}
```

### 3. JavaScript Objects (from glassmorphism.ts)

```jsx
import { goldenGlow } from '../../styles/glassmorphism';

// In your component:
<div 
  className="my-element" 
  style={goldenGlow.subtle}
>
  Element with subtle gold glow
</div>

<div 
  className="my-element" 
  style={goldenGlow.strong}
>
  Element with strong gold glow
</div>
```

## Shadow Categories and Use Cases

### Standard Elevation Shadows

- **--shadow-sm / shadow-sm**: Subtle depth for buttons, cards borders (1-2px elevation)
- **--shadow-md / shadow-md**: Default shadow for cards, buttons, selectable items (4-6px elevation)
- **--shadow-lg / shadow-lg**: Medium shadow for modals, dropdowns, popovers (10-15px elevation)
- **--shadow-xl / shadow-xl**: Large shadow for hero elements, emphasized content (20-25px elevation)

### Gold-Specific Shadows

- **--shadow-gold / shadow-gold**: Brand-specific shadow for accent elements (4-12px gold-tinted)
- **--shadow-gold-hover**: Enhanced gold shadow for hover states (6-16px gold-tinted)
- **--shadow-gold-active**: Reduced gold shadow for pressed/active states (2-8px gold-tinted)

### Ambient Glow Effects

- **--gold-glow-subtle**: Very subtle gold glow for accent elements (0-10px gold ambient)
- **--gold-glow**: Standard gold glow for hover states or focus (0-20px gold ambient)
- **--gold-glow-strong**: Intense gold glow for active/selected elements (0-30px gold ambient)

## Tailwind Integration Note

The current Tailwind configuration doesn't have direct mappings for these shadow variables. When using Tailwind, you'll need to:

1. Apply shadows using inline styles with the CSS variables:
   ```jsx
   <div className="..." style={{ boxShadow: "var(--gold-glow)" }}>...</div>
   ```

2. Use the glassmorphism.ts utility:
   ```jsx
   <div className="..." style={goldenGlow.subtle}>...</div>
   ```

3. Add custom shadow utilities in your styles:
   ```css
   .shadow-gold-custom {
     box-shadow: var(--gold-glow);
   }
   ```

## Shadow Best Practices

1. **For interactive elements**:
   - Use `shadow-hover` class or implement hover/active shadow states manually
   - Default → Hover → Active state transitions should feel smooth

2. **For brand elements**:
   - Use gold shadows for brand-specific elements that need emphasis
   - Keep ambient gold glow subtle to avoid visual noise

3. **For structural components**:
   - Use standard shadows (sm, md, lg, xl) for layout and structure
   - Reserve gold shadows for interactive or branded accent elements

4. **For accessibility**:
   - Ensure sufficient contrast between elements when using shadows
   - Don't rely solely on shadows to indicate interactive states

## Example Implementation (ProcessTimeline)

```jsx
// Icon Container with conditional shadow based on active state
<motion.div
  className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 ${
    activeStep === index
      ? 'bg-[#D4AF37]/20 border-2 border-[#D4AF37]'
      : 'bg-[#222222] border border-[#C0C0C0]/30 group-hover:bg-[#D4AF37]/10 group-hover:border-[#D4AF37]/60'
  }`}
  style={
    activeStep === index 
      ? { ...goldenGlow.subtle }
      : {}
  }
>
  <IconComponent 
    size={32} 
    className={`transition-colors duration-500 ${
      activeStep === index ? 'text-[#D4AF37]' : 'text-[#C0C0C0] group-hover:text-[#D4AF37]'
    }`} 
  />
</motion.div>
```