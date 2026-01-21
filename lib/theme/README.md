# Theme Constants

TypeScript constants for design system tokens.

## Usage

```typescript
import { BRAND_COLORS, getBrandColor } from '@/lib/theme/colors';

// Direct access
const primaryColor = BRAND_COLORS.primary;           // '#171717'
const accentColor = BRAND_COLORS.accent;             // '#C0C0C0'
const greyBase = BRAND_COLORS.grey.base;             // '#666666'

// Path access (for dynamic scenarios)
const color = getBrandColor('grey.light');           // '#A8A8A8'
```

## Chrome Accent Usage Rules

✅ Allowed:
- Primary CTA buttons
- Form input focus rings
- Navigation hover/active states
- Icon highlights
- Link underlines

❌ Not allowed:
- Body text (use grey or primary)
- Large background areas (use surface)
- Decorative borders (use grey instead)

## Type Safety

```typescript
import type { BrandColor } from '@/lib/theme/colors';

const myColors: BrandColor = {
  primary: '#171717',
  surface: '#F3F3F3',
  // ... type-checked structure
};
```
