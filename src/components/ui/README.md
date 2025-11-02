# UI Components

A collection of reusable, accessible, and customizable UI components built with React and TypeScript.

## Getting Started

### Installation

This package requires the following peer dependencies:

```bash
npm install clsx tailwind-merge @radix-ui/react-slot
```

### Usage

Import components from the UI library:

```tsx
import { Button, Input, Label } from '@/components/ui';
```

## Components

### Button

A customizable button component with support for icons, loading states, and more.

```tsx
<Button 
  variant="primary"
  size="md"
  loading={isLoading}
  disabled={isDisabled}
>
  Click me
</Button>
```

### Common Props

All components accept these common props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `React.ElementType` | - | Render as a different HTML element or React component |
| `className` | `string` | - | Additional CSS classes |
| `size` | `'sm' | 'md' | 'lg'` | `'md'` | Size of the component |
| `variant` | `'primary' | 'secondary' | 'ghost' | 'link' | 'outline' | 'destructive'` | `'primary'` | Visual style variant |
| `disabled` | `boolean` | `false` | Whether the component is disabled |
| `loading` | `boolean` | `false` | Whether the component is in a loading state |

## Theming

Customize the look and feel by overriding the default Tailwind CSS classes in your project's `tailwind.config.js`.

## Accessibility

All components follow WAI-ARIA design patterns and include proper keyboard navigation and screen reader support.

## Development

1. Create a new component directory under `/src/components/ui/`
2. Follow the component structure and patterns from existing components
3. Export the component in `/src/components/ui/index.ts`
4. Add documentation and examples

## License

MIT
