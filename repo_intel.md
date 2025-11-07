# Repository Intelligence Report

## Stack Detection
- **Framework**: Vite (React)
- **Package Manager**: npm
- **Testing Tools**: Playwright for E2E tests
- **Styling**: Tailwind CSS with PostCSS

## CSS Architecture Issues
1. Fragmentation: Multiple CSS files with overlapping responsibilities
2. Import inconsistency: Some components not importing their CSS files
3. Recent refactoring: Consolidated files without preserving all styles

## Key Problem Areas
1. ArtistCard component: Missing CSS import
2. Design system consolidation: Incomplete migration
3. Visual regression: Components lost styling during consolidation
