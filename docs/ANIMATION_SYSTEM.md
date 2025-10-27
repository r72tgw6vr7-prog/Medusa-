# Animation System Documentation

## Overview

The animation system for the Medusa Tattoo München website provides a comprehensive set of utilities for creating consistent, high-quality animations across the site. The system includes:

- **Micro-transitions**: Small, subtle animations for interactive elements (already implemented)
- **Framer Motion variants**: Pre-configured animation presets for page sections and components
- **CSS animations**: Pure CSS animations for simpler use cases
- **Animation hooks**: React hooks for scroll-triggered and delayed animations
- **Reusable components**: Wrapper components like `AnimatedSection` for quick implementation

## File Structure

```
src/lib/animations/
├── index.ts                  # Main export file
├── micro-transitions.ts      # Micro-transition utilities
├── variants.ts               # Framer Motion animation variants
├── hooks.ts                  # Animation-related React hooks
└── keyframes.css             # CSS animations and utility classes

src/components/organisms/
└── AnimatedSection.tsx       # Scroll-triggered section component
```

## Usage Guidelines

### When to Use What

1. **Micro-transitions** 
   - Use for hover, focus, and active states on interactive elements
   - Examples: buttons, links, cards, form elements

2. **Framer Motion Variants**
   - Use for scroll-triggered animations
   - Page transitions
   - Complex, multi-step animations
   - Staggered list or grid animations

3. **CSS Animations**
   - Use for simple, always-on animations
   - Loading states
   - Background effects
   - Simple hover effects that don't require JS

4. **Hooks**
   - Use when you need precise control over animations
   - Scroll-triggered animations with custom logic
   - Delayed animations
   - Responsive animations

### Framer Motion Variants

```jsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInUp}
>
  Content fades in and slides up
</motion.div>
```

Available variants:
- `fadeIn`: Simple fade-in animation
- `fadeInUp`, `fadeInDown`: Fade combined with vertical movement
- `slideInLeft`, `slideInRight`: Fade combined with horizontal movement
- `scaleIn`: Scale up from smaller size
- `staggerContainer` + `staggerItem`: For creating staggered list animations
- `goldGlow`: Gold shadow effect (branded)
- `heroImage`, `heroText`: For hero section elements
- `galleryItem`: For gallery/portfolio items
- `pageTransition`: For page transitions

### CSS Animations

```jsx
<div className="animate-fade-in-up">
  Simple CSS animation without JS
</div>
```

Available CSS classes:
- `animate-fade-in`: Simple fade-in effect
- `animate-fade-in-up`: Fade-in with upward movement
- `animate-slide-in-left`: Slide from left to right
- `animate-scale-in`: Scale up animation
- `animate-pulse-slow`: Slow pulsing opacity
- `animate-gold-glow`: Gold shadow effect
- `animate-chrome-glow`: Chrome shadow effect
- `animate-spinner`: Rotating spinner animation
- `animate-shimmer`: Shimmer effect for loading states

Modifier classes:
- `delay-100`, `delay-200`, etc.: Add animation delays
- `duration-300`, `duration-500`, etc.: Adjust animation duration
- `ease-out`, `ease-in`, `ease-bounce`: Change easing function

### Animation Hooks

```jsx
import { useAnimateOnScroll, useDelayedAnimation } from '@/lib/animations';

// Scroll-triggered animation
function MyComponent() {
  const { ref, initial, animate } = useAnimateOnScroll(0.2); // 20% visibility threshold
  
  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      variants={fadeInUp}
    >
      Animates when scrolled into view
    </motion.div>
  );
}

// Delayed animation
function DelayedComponent() {
  const { shouldAnimate } = useDelayedAnimation(1000); // 1 second delay
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
    >
      Appears after delay
    </motion.div>
  );
}
```

Available hooks:
- `useScrollAnimation`: Detect when element enters viewport
- `useAnimateOnScroll`: Get Framer Motion props for scroll animations
- `useDelayedAnimation`: Trigger animation after delay
- `useResponsiveAnimation`: Apply different animations based on screen size
- `useStaggeredAnimation`: Create staggered delays for lists

### AnimatedSection Component

```jsx
import { AnimatedSection } from '@/lib/animations';

<AnimatedSection className="py-16">
  <h2>Section Title</h2>
  <p>Content animates when scrolled into view</p>
</AnimatedSection>
```

Props:
- `children`: Content to animate
- `className`: Optional CSS class names
- `variant`: Animation variant (defaults to fadeInUp)
- `threshold`: Visibility threshold for triggering (0-1)

## Performance Considerations

1. **Use CSS when possible**: CSS animations are more performant than JS animations
2. **Reduce motion when appropriate**: All animations respect the user's `prefers-reduced-motion` setting
3. **Lazy-load off-screen animations**: Scroll-triggered animations only activate when needed
4. **Use hardware acceleration**: Animations use transform and opacity properties when possible
5. **Limit concurrent animations**: Avoid animating too many elements simultaneously

## Accessibility

The animation system is designed with accessibility in mind:

1. All animations respect the `prefers-reduced-motion` user preference
2. Focus states remain clearly visible during transitions
3. No animations that flash or pulse rapidly
4. Essential functionality works without animations

## Demo

An animation showcase is available at `/animation-showcase` that demonstrates all available animation options.

## Best Practices

1. **Be consistent**: Use the same animations for similar UI elements
2. **Be subtle**: Animations should enhance the experience, not distract from it
3. **Mind performance**: Be careful with heavy animations on mobile devices
4. **Provide context**: Use animations to provide visual relationships between elements
5. **Prioritize usability**: Never sacrifice usability for fancy animations