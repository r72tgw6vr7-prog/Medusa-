# Foundation Layer Import Update Guide

## Overview

We've implemented a standardized approach for importing from the foundation layer. This guide explains how to update your components to use the new import structure.

## Why This Change?

1. **Consistency**: Creates a unified way to import foundation components and tokens
2. **Maintainability**: Makes it easier to refactor the foundation layer in the future
3. **Readability**: Clearer imports that follow best practices for module organization

## How to Update Components

### Before

```tsx
// Direct import from SimpleMedusaProvider.tsx
import { useMedusaDesignSystem } from '../foundation/SimpleMedusaProvider';
// or
import { MedusaDesignSystemProvider } from './foundation/SimpleMedusaProvider';
```

### After

```tsx
// Import from foundation index
import { useMedusaDesignSystem } from '../foundation';
// or
import { MedusaDesignSystemProvider } from './foundation';
```

## Import Path Adjustment

When updating imports, make sure to adjust the relative path according to your component's location:

- For components in `/src/components/atoms/`: use `../../foundation`
- For components in `/src/components/molecules/`: use `../../foundation`
- For components in `/src/components/organisms/`: use `../../../foundation` or `../../foundation` depending on depth
- For components at the root: use `./foundation`

## Components Already Updated

The following components have already been updated to use the new import structure:

1. `SalonCarousel.tsx`
2. `ServiceHighlights.tsx`
3. `App.tsx`
4. `HomepageHero.tsx`

## Components That Need Updating

Run the following command to find components that still need updating:

```bash
grep -r "import.*SimpleMedusaProvider" --include="*.tsx" --include="*.ts" .
```

## Using Design Tokens

With this update, design tokens are now properly typed and accessible through the `useMedusaDesignSystem` hook:

```tsx
const { tokens, language } = useMedusaDesignSystem();

// Use tokens in your component
const primaryColor = tokens.colors.primary;
const spacing = tokens.spacing.md;
```

## Benefits of Using the Foundation Layer

1. **Unified Theming**: Consistent access to design tokens
2. **Language Support**: Easy access to language strings
3. **Theme Switching**: Support for theme changes
4. **Type Safety**: Full TypeScript support for all tokens and theme values