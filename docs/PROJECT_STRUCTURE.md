# Medusa Web Project - Code Organization Guide

## Project Overview

This project has been organized following the Atomic Design methodology, providing a clear structure for components and making the codebase more maintainable.

## Directory Structure

```
src/
├── components/          # Component library (atomic design)
│   ├── atoms/          # Basic building blocks (Button, Icon, Input, etc.)
│   ├── molecules/      # Simple combinations of atoms (FormGroup, MenuItem, etc.)
│   ├── organisms/      # Complex UI components (Header, Footer, Form, etc.)
│   └── templates/      # Page layouts without specific content
├── sections/           # Major page sections (HeroSection, ProcessTimeline, etc.)
├── pages/              # Page components
├── styles/             # Global styles and design tokens
│   ├── design-tokens.ts # Design system tokens
│   ├── glassmorphism.ts # Glassmorphism utilities
│   ├── animations.ts    # Animation utilities
│   └── global.css       # Global CSS
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
├── foundation/         # Core providers and context
└── archive/            # Legacy code (archived instead of deleted)
```

## Component Guidelines

### Atomic Design Pattern

1. **Atoms** - Basic UI elements (buttons, inputs, icons)
   - Cannot be broken down further
   - Highly reusable across the application
   - Located in `/components/atoms/`

2. **Molecules** - Simple combinations of atoms
   - Form groups, navigation items, cards
   - Serve a single purpose
   - Located in `/components/molecules/`

3. **Organisms** - Complex UI components
   - Forms, headers, footers, navigation bars
   - Composed of molecules and atoms
   - Located in `/components/organisms/`

4. **Templates** - Page layouts without specific content
   - Define content structure and placement
   - Located in `/components/templates/`

5. **Pages** - Complete pages with actual content
   - Specific instances of templates
   - Located in `/pages/`

6. **Sections** - Major sections of pages
   - Hero sections, contact sections, etc.
   - Located in `/sections/`

### Component Organization

Each component should be in its own directory with the following structure:

```
ComponentName/
├── ComponentName.tsx    # Component implementation
├── index.ts             # Export file
└── [additional files]   # Tests, styles, etc.
```

## Style Guidelines

1. **Design Tokens** - Use tokens from `styles/design-tokens.ts`
2. **Glassmorphism** - Use utilities from `styles/glassmorphism.ts`
3. **Animations** - Use animation patterns from `styles/animations.ts`
4. **Global Styles** - Common styles in `styles/global.css`

## Development Process

1. **Follow Atomic Design**: Place new components in the appropriate directory
2. **Use Index Exports**: Always export components through index.ts files
3. **Component Props**: Use TypeScript interfaces for component props
4. **Documentation**: Add JSDoc comments for complex components
5. **Testing**: Create tests for components when applicable

## Additional Information

For more detailed information, refer to:
- `ORGANIZATION_REPORT.md` - Details on the project reorganization
- `/components/README.md` - Component structure documentation
- `/sections/README.md` - Section components documentation