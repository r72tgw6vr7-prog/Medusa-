# Medusa Design System V2.0

A comprehensive, token-based design system for Medusa Tattoo München built with React and CSS custom properties.

## 🎨 Features

- **Token-Based Architecture**: Complete design tokens in JSON format
- **Mobile-First Responsive**: Breakpoints at 320px, 768px, 1024px+
- **WCAG AA Compliant**: 4.5:1 contrast ratios, 44px+ touch targets
- **Glassmorphism Effects**: Backdrop blur with luxury styling
- **TypeScript Support**: Full type safety and IntelliSense
- **Component Library**: Pre-built accessible React components
- **Dark/Light Themes**: Built-in theme switching capability

## 🚀 Quick Start

### 1. Installation

```bash
# The design system is already included in your project
# Just import the CSS file in your main entry point
```

### 2. Basic Setup

```tsx
import React from 'react';
import { MedusaDesignSystemProvider } from './foundation/MedusaDesignSystemV2';
import './styles/design-system.css';

function App() {
  return (
    <MedusaDesignSystemProvider initialLanguage="DE" initialTheme="dark">
      <div className="medusa-design-system">
        {/* Your app content */}
      </div>
    </MedusaDesignSystemProvider>
  );
}
```

### 3. Add Required Fonts

```html
<!-- Add to your index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
```

## 🎯 Design Tokens

### Color Palette

```json
{
  "primary": {
    "gold": "#D4AF37",      // Primary brand color
    "black": "#0A0A0A",     // Background color  
    "off-white": "#F5F5F0"  // Text color
  }
}
```

### Typography Scale

```json
{
  "fonts": {
    "heading": "Cormorant Garamond, serif",
    "body": "Inter, sans-serif"
  },
  "scale": {
    "mobile": {
      "headline-xl": "2rem",    // 32px
      "headline-lg": "1.75rem", // 28px
      "body-lg": "1rem",        // 16px
      "body-md": "0.875rem"     // 14px
    }
  }
}
```

### Spacing System (4px base unit)

```css
--medusa-space-1: 0.25rem;  /* 4px */
--medusa-space-2: 0.5rem;   /* 8px */
--medusa-space-4: 1rem;     /* 16px */
--medusa-space-8: 2rem;     /* 32px */
```

## 🧱 Components

### Typography

```tsx
import { Typography } from './foundation/MedusaDesignSystemV2';

<Typography.Headline level="xl">Main Title</Typography.Headline>
<Typography.Body size="lg">Body text content</Typography.Body>
<Typography.Caption>Small caption text</Typography.Caption>
```

### Buttons

```tsx
import { Button } from './foundation/MedusaDesignSystemV2';

<Button.Primary size="lg">Book Consultation</Button.Primary>
<Button.Secondary size="md">View Gallery</Button.Secondary>
<Button.Ghost size="sm">Learn More</Button.Ghost>
```

### Layout

```tsx
import { Layout } from './foundation/MedusaDesignSystemV2';

<Layout.Container size="lg">
  <Layout.Grid columns={3} gap="lg">
    <div>Column 1</div>
    <div>Column 2</div>
    <div>Column 3</div>
  </Layout.Grid>
</Layout.Container>
```

### Cards

```tsx
import { Card } from './foundation/MedusaDesignSystemV2';

<Card.Base variant="glass" interactive>
  <Card.Header>
    <Typography.Headline level="md">Service Title</Typography.Headline>
  </Card.Header>
  <Card.Content>
    <Typography.Body>Service description...</Typography.Body>
  </Card.Content>
  <Card.Footer>
    <Button.Primary>Book Now</Button.Primary>
  </Card.Footer>
</Card.Base>
```

### Forms

```tsx
import { Input } from './foundation/MedusaDesignSystemV2';

<Input.Text
  id="name"
  label="Full Name"
  placeholder="Enter your name"
  size="md"
  error="This field is required"
/>

<Input.Textarea
  id="message"
  label="Message"
  placeholder="Tell us about your vision..."
  rows={4}
  size="md"
/>
```

## 📱 Responsive Design

### Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

### Usage

```tsx
import { useResponsive } from './foundation/MedusaDesignSystemV2';

function MyComponent() {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
  return (
    <Layout.Grid 
      columns={isMobile ? 1 : isTablet ? 2 : 3} 
      gap="lg"
    >
      {/* Content adapts to screen size */}
    </Layout.Grid>
  );
}
```

## ♿ Accessibility

### WCAG AA Compliance

- **Contrast Ratios**: Minimum 4.5:1 maintained
- **Touch Targets**: 44px minimum on mobile
- **Focus States**: 2px gold outline with glow effect
- **Keyboard Navigation**: Full support for all interactive elements

### Screen Reader Support

```tsx
// Proper semantic markup
<Typography.Headline level="xl" role="heading" aria-level="1">
  Page Title
</Typography.Headline>

// ARIA labels for complex components
<Button.Primary aria-label="Book consultation appointment">
  Book Now
</Button.Primary>
```

## 🎨 Theming

### Theme Provider

```tsx
<MedusaDesignSystemProvider 
  initialLanguage="DE" 
  initialTheme="dark"
>
  {/* App content */}
</MedusaDesignSystemProvider>
```

### Theme Switching

```tsx
import { useMedusaDesignSystem } from './foundation/MedusaDesignSystemV2';

function ThemeToggle() {
  const { theme, setTheme } = useMedusaDesignSystem();
  
  return (
    <Button.Ghost 
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </Button.Ghost>
  );
}
```

## 🌍 Internationalization

### Language Support

```tsx
import { useMedusaDesignSystem } from './foundation/MedusaDesignSystemV2';

function LanguageToggle() {
  const { language, setLanguage } = useMedusaDesignSystem();
  
  return (
    <Button.Ghost 
      onClick={() => setLanguage(language === 'DE' ? 'EN' : 'DE')}
    >
      {language}
    </Button.Ghost>
  );
}
```

## 🎯 CSS Utilities

### Color Utilities

```css
.medusa-text-gold     /* Gold text */
.medusa-text-chrome   /* Chrome text */
.medusa-bg-gold       /* Gold background */
.medusa-bg-primary    /* Primary background */
```

### Spacing Utilities

```css
.medusa-p-4           /* Padding: 1rem */
.medusa-m-8           /* Margin: 2rem */
.medusa-gap-md        /* Grid/flex gap: 1rem */
```

### Shadow Utilities

```css
.medusa-shadow-gold-subtle   /* Subtle gold glow */
.medusa-shadow-gold-medium   /* Medium gold glow */
.medusa-shadow-gold-strong   /* Strong gold glow */
```

## 🔧 Advanced Usage

### Custom Components

```tsx
import { useTokens } from './foundation/MedusaDesignSystemV2';

function CustomComponent() {
  const tokens = useTokens();
  
  return (
    <div style={{
      backgroundColor: tokens.colors.primary.gold.value,
      padding: tokens.spacing.scale[4],
      borderRadius: tokens.spacing.scale[2]
    }}>
      Custom styled component
    </div>
  );
}
```

### Extending the Design System

```tsx
// Create your own components using the design tokens
const CustomCard = styled.div`
  background: var(--medusa-glass-bg);
  backdrop-filter: blur(var(--medusa-glass-blur));
  border: var(--medusa-glass-border);
  border-radius: var(--medusa-space-3);
  padding: var(--medusa-space-6);
`;
```

## 📋 Implementation Checklist

### Setup
- [ ] Import design system CSS
- [ ] Add MedusaDesignSystemProvider
- [ ] Include Cormorant Garamond and Inter fonts
- [ ] Configure initial language and theme

### Components
- [ ] Replace buttons with Button components
- [ ] Use Typography for all text elements
- [ ] Implement Card components for containers
- [ ] Use Layout components for structure

### Accessibility
- [ ] Test keyboard navigation
- [ ] Verify color contrast ratios
- [ ] Add proper ARIA labels
- [ ] Test with screen readers

### Responsive Design
- [ ] Test on mobile (320px-767px)
- [ ] Test on tablet (768px-1023px)
- [ ] Test on desktop (1024px+)
- [ ] Verify touch targets on mobile

## 🐛 Troubleshooting

### Common Issues

1. **Fonts not loading**: Ensure font imports are in `<head>`
2. **CSS not applying**: Check that design-system.css is imported
3. **Components not styled**: Wrap app with MedusaDesignSystemProvider
4. **Responsive not working**: Verify breakpoint CSS is included

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📚 Resources

- [Brand Tokens JSON](/brand-tokens.json)
- [Design System CSS](/styles/design-system.css)
- [Component Library](/foundation/MedusaDesignSystemV2.tsx)
- [Usage Examples](/foundation/DesignSystemUsageGuide.tsx)

## 🤝 Contributing

When extending the design system:

1. Follow the 4px spacing scale
2. Use only brand-approved colors
3. Maintain WCAG AA accessibility standards
4. Test on all supported breakpoints
5. Document new components and utilities

---

**Medusa Tattoo München Design System V2.0**  
*Luxury • Precision • Accessibility*