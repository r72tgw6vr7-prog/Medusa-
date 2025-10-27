# Micro-Transitions System Documentation

## Overview

The micro-transitions system provides standardized animations for interactive elements across the Medusa Tattoo website. This system ensures consistent behavior, improves user experience, and reduces development time by providing reusable transition patterns.

## Key Features

- **Standardized Durations**: Consistent timing for all animations (100ms, 200ms, 300ms, 500ms)
- **Consistent Easing Functions**: Smooth, bounce, linear, and more
- **Tailwind Integration**: Pre-built transition classes for Tailwind
- **CSS Utility Classes**: Direct CSS classes for use without JavaScript
- **Presets**: Common combinations for buttons, cards, links, and images
- **Accessibility**: Respects user's motion preferences
- **TypeScript Support**: Full typing for all transitions

## Usage

### 1. JavaScript/TypeScript Usage

Import the transitions and use them in your components:

```tsx
import { TRANSITION_PRESETS } from '@/lib/animations';

function MyButton() {
  return (
    <button className={`${TRANSITION_PRESETS.button} bg-brand-gold text-white px-4 py-2`}>
      Click Me
    </button>
  );
}
```

### 2. CSS Class Usage

Apply the CSS classes directly in your HTML/JSX:

```html
<button class="preset-button bg-brand-gold text-white px-4 py-2">
  Click Me
</button>
```

## Available Transitions

### Duration Constants

```typescript
TRANSITION_DURATIONS = {
  instant: 100,  // Quick feedback
  fast: 200,     // Most hover effects
  normal: 300,   // Standard transitions
  slow: 500      // Emphasis animations
}
```

### Easing Functions

```typescript
TRANSITION_EASINGS = {
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',  // Material Design standard
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  linear: 'linear',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)'
}
```

### Hover Effects

```typescript
TRANSITIONS.hover = {
  scale: 'transition-transform duration-200 ease-smooth hover:scale-105',
  scaleSubtle: 'transition-transform duration-200 ease-smooth hover:scale-102',
  goldGlow: 'transition-shadow duration-300 ease-smooth hover:shadow-gold-subtle',
  goldGlowMedium: 'transition-shadow duration-300 ease-smooth hover:shadow-gold-medium',
  goldGlowStrong: 'transition-shadow duration-300 ease-smooth hover:shadow-gold-strong',
  chromeGlow: 'transition-shadow duration-300 ease-smooth hover:shadow-chrome-subtle',
  chromeGlowMedium: 'transition-shadow duration-300 ease-smooth hover:shadow-chrome-medium',
  brightness: 'transition-all duration-200 ease-smooth hover:brightness-110',
  brightnessSubtle: 'transition-all duration-200 ease-smooth hover:brightness-105',
  opacity: 'transition-opacity duration-200 ease-smooth hover:opacity-90'
}
```

### Focus Effects

```typescript
TRANSITIONS.focus = {
  goldRing: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 transition-shadow duration-200',
  chromeRing: 'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-chrome focus-visible:ring-offset-2 transition-shadow duration-200',
  goldGlow: 'focus-visible:shadow-gold-subtle transition-shadow duration-200 ease-smooth',
  chromeGlow: 'focus-visible:shadow-chrome-subtle transition-shadow duration-200 ease-smooth'
}
```

### Active/Tap Effects

```typescript
TRANSITIONS.active = {
  scale: 'active:scale-95 transition-transform duration-100 ease-smooth',
  scaleSubtle: 'active:scale-98 transition-transform duration-100 ease-smooth',
  opacity: 'active:opacity-80 transition-opacity duration-100 ease-smooth'
}
```

### Color Transitions

```typescript
TRANSITIONS.color = {
  goldToChrome: 'transition-colors duration-300 ease-smooth text-brand-gold hover:text-brand-chrome',
  chromeToGold: 'transition-colors duration-300 ease-smooth text-brand-chrome hover:text-brand-gold',
  goldToChromeBackground: 'transition-colors duration-300 ease-smooth bg-brand-gold hover:bg-brand-chrome',
  chromeToDark: 'transition-colors duration-300 ease-smooth text-brand-chrome hover:text-brand-dark',
  darkToGold: 'transition-colors duration-300 ease-smooth text-brand-dark hover:text-brand-gold',
  bgDarkToLight: 'transition-colors duration-300 ease-smooth bg-brand-dark hover:bg-brand-light'
}
```

## Preset Combinations

### Buttons

```typescript
TRANSITION_PRESETS.button = "transition-transform duration-200 ease-smooth hover:scale-102 active:scale-95 transition-transform duration-100 ease-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 transition-shadow duration-200"
```

### Cards

```typescript
TRANSITION_PRESETS.card = "transition-shadow duration-300 ease-smooth hover:shadow-gold-subtle transition-transform duration-200 ease-smooth hover:scale-102"
```

### Links

```typescript
TRANSITION_PRESETS.link = "transition-colors duration-300 ease-smooth text-brand-chrome hover:text-brand-gold transition-all duration-200 ease-smooth hover:brightness-110"
```

### Images

```typescript
TRANSITION_PRESETS.image = "transition-all duration-200 ease-smooth hover:brightness-110 transition-transform duration-200 ease-smooth hover:scale-102"
```

## CSS Variables

The system provides CSS custom properties for use in your CSS:

```css
:root {
  --transition-duration-instant: 100ms;
  --transition-duration-fast: 200ms;
  --transition-duration-normal: 300ms;
  --transition-duration-slow: 500ms;
  
  --transition-easing-smooth: cubic-bezier(0.4, 0.0, 0.2, 1);
  --transition-easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  --transition-easing-linear: linear;
  --transition-easing-ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
  --transition-easing-ease-in: cubic-bezier(0.4, 0.0, 1, 1);
}
```

## Utility Functions

### combineTransitions

Combines multiple transition classes into a single string with duplicates removed:

```typescript
const customTransition = combineTransitions(
  TRANSITIONS.hover.goldGlow,
  TRANSITIONS.active.scale,
  TRANSITIONS.focus.goldRing
);
```

### createTransitionStyle

Creates a transition string for use in inline styles:

```typescript
const style = {
  transition: createTransitionStyle('transform', 'fast', 'bounce')
};
// Results in: "transform 200ms cubic-bezier(0.68, -0.55, 0.265, 1.55)"
```

### respectMotionPreferences

Returns classes to respect the user's motion preferences:

```tsx
<div className={`${TRANSITION_PRESETS.card} ${respectMotionPreferences()}`}>
  Card content
</div>
```

## Accessibility Considerations

- All transitions respect the user's `prefers-reduced-motion` settings
- Focus styles are properly applied using `:focus-visible`
- Animations are subtle and avoid causing vestibular issues
- Default durations are kept short to avoid irritation

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 120+ | ✅ Full | All transitions work as expected |
| Firefox 120+ | ✅ Full | All transitions work as expected |
| Safari 17+ | ✅ Full | All transitions work as expected |
| Edge | ✅ Full | All transitions work as expected |
| iOS Safari | ✅ Full | Touch feedback may vary |
| Chrome Mobile | ✅ Full | Touch feedback may vary |

## Performance Tips

1. **Prefer transform/opacity**: These properties are GPU-accelerated
2. **Avoid transitioning layout properties**: width, height, top, etc.
3. **Keep durations short**: Long animations can feel sluggish
4. **Use `will-change` sparingly**: Only for complex animations

## Demo

A comprehensive demo is available at `/micro-transitions` showcasing all transition types and presets.

## Testing

The micro-transitions system is thoroughly tested:

- **Unit Tests**: `src/lib/animations/__tests__/micro-transitions.test.ts`
  - Tests constants, utility functions, and type safety
  - Ensures the API works as expected

- **DOM Integration Tests**: `src/lib/animations/__tests__/micro-transitions-dom.test.tsx`
  - Tests the transitions when applied to actual DOM elements
  - Validates proper class application and effects

- **CSS Integration Tests**: `src/lib/animations/__tests__/micro-transitions-css.test.tsx`
  - Tests the CSS output of the micro-transitions system
  - Validates proper combination and transformation of transitions
  - Tests dynamic transition generation

Run all tests with:
```bash
npm test -- src/lib/animations/__tests__
```

Current test coverage: 73% statements, 68% lines

## Implementation Details

- File location: `src/lib/animations/micro-transitions.ts`
- CSS utilities: `src/styles/micro-transitions.css`
- Exports: All transitions and utilities are exported from `src/lib/animations/index.ts`
- Tests: `src/lib/animations/__tests__/`