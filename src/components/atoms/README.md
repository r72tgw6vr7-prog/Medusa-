# Atoms

In atomic design, atoms are the basic building blocks of the interface. They are the smallest components that cannot be broken down further while still maintaining their functionality.

## What belongs here?

- **Button**: Simple button components
- **Icon**: Icon components
- **Input**: Form input elements
- **Typography**: Text elements like headings, paragraphs
- **Label**: Form labels
- **Checkbox**: Checkboxes and radio buttons
- **Badge**: Simple badge components
- **Avatar**: User avatars
- **Divider**: Line separators

## Guidelines

1. **Single Responsibility**: Each atom should do one thing and do it well
2. **No Dependencies**: Atoms should not depend on other component types
3. **Highly Reusable**: Atoms should be designed for maximum reuse
4. **Stateless When Possible**: Prefer stateless/controlled components
5. **Accepts Props**: Should accept and forward appropriate props

## Structure

Each atom should follow this structure:

```
ButtonName/
├── ButtonName.tsx    # Component implementation
├── index.ts         # Export file
└── [optional files] # Tests, styles, etc.
```

## Export Pattern

Always use named exports in the index.ts file:

```typescript
// index.ts
export { ButtonName } from './ButtonName';
```