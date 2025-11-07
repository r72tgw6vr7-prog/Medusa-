# CSS Restoration Plan

This document outlines the necessary steps to restore the CSS architecture while preserving the visual appearance of the website.

## Current Situation

The CSS architecture refactoring caused visual regressions because several important component-specific CSS files were removed or not properly integrated into the new design system. The primary issues include:

1. Missing CSS imports in component files
2. Conflicting selector specificity
3. Loss of component-specific styling
4. Variables not properly migrated

## Restoration Approach

### 1. Immediate Fix (Completed)

- Added missing `import './ArtistCard.css'` statement to ArtistCard.tsx
- This restores the proper styling for the artist cards which were particularly affected

### 2. Migration Plan for Long-Term Architecture

To successfully migrate to the consolidated architecture while preserving the visual design:

1. **Preserve Component-Specific CSS**
   - Keep component-specific CSS files co-located with their components
   - Ensure all component TSX files properly import their CSS
   - Prioritize component-specific CSS over global CSS through proper specificity

2. **Transition Variable System Gradually**
   - Keep all variables from the pre-refactor version in design-system.css
   - Duplicate variables are acceptable during transition
   - Ensure common variables are in sync between old and new system

3. **Restore Critical Files**
   - From the `css-pre-refactor-LOCK` tag:
     - system.css (as a reference)
     - ArtistCard.css
     - ServiceCards.css and .module.css
     - Other component-specific CSS identified in testing

4. **Testing Approach**
   - Create a reference visual snapshot of each component
   - Compare component-by-component visuals after each change
   - Use color highlighting for regression testing

## Required Files to Preserve

The following files must be preserved from the pre-refactor snapshot:

1. **Component CSS**
   - src/components/molecules/Card/ArtistCard.css
   - src/components/molecules/Card/ServiceCards.css
   - src/components/molecules/Card/ServiceCards.module.css
   - src/components/organisms/OurArtists.css
   - src/components/pages/TeamGrid.css
   - src/components/molecules/MainNavigation.css
   - src/components/booking/BookingModalMobile.css

2. **Global CSS**
   - src/styles/system.css (as reference)
   - src/index.css (modified to import design-system.css)

## Current Branching Strategy

- **css-restore**: Current working branch with visual appearance restored
- **css-architecture-refactor-backup**: Backup of the refactored architecture
- **css-architecture-refactor**: Original refactor branch with visual regressions
- **pre-refactor-state**: Tag pointing to the state before refactoring

## Recommended Next Steps

1. Commit the fixed ArtistCard.css import to css-restore branch
2. Create a new branch from css-restore for the refactoring work
3. Merge in specific portions of the architecture improvements from css-architecture-refactor
4. Test each component visually after each change
5. Complete the migration with all visual aspects preserved

The primary goal is to preserve the visual design while achieving the architecture improvements from the consolidation plan.
