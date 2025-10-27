# Interactive Component States

## Button States (WCAG Required)

### 1. Base Button
```css
.btn {
  /* Default state */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px; /* WCAG touch target */
  padding: 8px 24px;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
  
  /* Prevent double-tap on mobile */
  touch-action: manipulation;
  
  /* Ensure text remains visible during animation */
  backface-visibility: hidden;
  transform: translateZ(0);
}

/* Hover state */
.btn:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px) scale(1.02);
}

/* Focus state (keyboard navigation) */
.btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
  outline-offset: var(--focus-ring-offset);
}

/* Active/Pressed state */
.btn:active {
  transform: translateY(0) scale(0.98);
  box-shadow: var(--shadow-sm);
}

/* Disabled state */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  box-shadow: none;
}

/* Loading state */
.btn[data-loading=true] {
  cursor: wait;
  opacity: 0.8;
}

/* Success state */
.btn[data-state=success] {
  background-color: var(--color-success);
  transform: none;
}

/* Error state */
.btn[data-state=error] {
  background-color: var(--color-error);
  animation: shake 0.4s ease-in-out;
}
```

### 2. Button Variants

#### Primary Button
```css
.btn-primary {
  background: var(--brand-gold);
  color: var(--brand-background);
}

.btn-primary:hover {
  background: var(--brand-gold-hover);
}

.btn-primary:active {
  background: var(--brand-gold-active);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  border: 2px solid var(--brand-gold);
  color: var(--brand-gold);
}

.btn-secondary:hover {
  background: var(--brand-gold);
  color: var(--brand-background);
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--brand-chrome);
  box-shadow: none;
}

.btn-ghost:hover {
  color: var(--brand-gold);
  background: rgba(212, 175, 55, 0.1);
}
```

## Accessibility Requirements

### 1. Visual States
- [ ] Default state is visually distinct
- [ ] Hover state provides clear feedback
- [ ] Focus state has visible indicator (3:1 contrast)
- [ ] Active/pressed state shows interaction
- [ ] Disabled state is visually muted
- [ ] Loading state indicates processing
- [ ] Error state is clearly visible

### 2. Keyboard Navigation
- [ ] Focusable with Tab key
- [ ] Focus visible at all times
- [ ] Enter/Space triggers click
- [ ] No focus trap in modals
- [ ] Skip links for navigation

### 3. Screen Readers
- [ ] Proper ARIA roles
- [ ] State changes announced
- [ ] Loading state communicated
- [ ] Error messages read out
- [ ] Icon buttons labeled

### 4. Touch & Motion
- [ ] 44×44px minimum touch target
- [ ] No animation if reduced motion
- [ ] Sufficient touch spacing
- [ ] Gesture alternatives

### 5. Color & Contrast
- [ ] 4.5:1 text contrast (WCAG AA)
- [ ] 3:1 for large text
- [ ] Non-color indicators
- [ ] High contrast mode support

## Implementation Example

```tsx
import { cn } from '@/lib/utils';
import { useResponsive } from '@/hooks/useMediaQuery';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  state?: 'success' | 'error';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading,
  state,
  className,
  children,
  ...props
}, ref) => {
  // Responsive padding based on screen size
  const padding = useResponsive('16px', '24px', '32px');
  
  return (
    <button
      ref={ref}
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        className
      )}
      data-loading={loading}
      data-state={state}
      disabled={loading || props.disabled}
      style={{ padding }}
      {...props}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
});

Button.displayName = 'Button';
```

## Testing Checklist

### Visual Testing
- [ ] Test all states in Storybook
- [ ] Verify animations
- [ ] Check responsive behavior
- [ ] Test with system themes

### Accessibility Testing
- [ ] Run axe DevTools
- [ ] Test with VoiceOver
- [ ] Verify keyboard nav
- [ ] Check color contrast

### Browser Testing
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test on iOS
- [ ] Test on Android

### Performance Testing
- [ ] Measure paint times
- [ ] Check re-renders
- [ ] Verify bundle size
- [ ] Test with slow network
