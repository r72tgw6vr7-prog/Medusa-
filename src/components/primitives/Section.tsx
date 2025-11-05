/**
 * Section Primitive Component
 * ============================
 * A design-system-compliant section/container component for page layout.
 *
 * Features:
 * - Automatic vertical spacing (py) on 8px grid
 * - Responsive spacing breakpoints
 * - Container width logic (max-w-7xl)
 * - Horizontal padding (px) with responsive values
 * - Spacing variants (sm, md, lg, xl)
 * - 100% spacing compliance (8px grid)
 *
 * Usage:
 * <Section spacing="lg" container="wide">
 *   <h2>Section Title</h2>
 *   <p>Section content...</p>
 * </Section>
 */

import React from 'react';

// ============================================
// Types
// ============================================

type SectionSpacing = 'none' | 'sm' | 'md' | 'lg' | 'xl';
type SectionContainer = 'none' | 'default' | 'wide' | 'narrow';
type SectionBackground = 'transparent' | 'dark' | 'darker' | 'gold-subtle';

interface SectionProps {
  children: React.ReactNode;
  spacing?: SectionSpacing;
  container?: SectionContainer;
  background?: SectionBackground;
  className?: string;
  id?: string;
  as?: 'section' | 'div' | 'article' | 'aside';
}

// ============================================
// Design System Tokens (8px grid compliant)
// ============================================

/**
 * Vertical spacing variants (responsive, mobile-first)
 * All values are multiples of 8px
 */
const SPACING_STYLES: Record<SectionSpacing, string> = {
  none: 'py-0',
  sm: 'py-32 md:py-48 lg:py-64', // 32/48/64 = 4×8 / 6×8 / 8×8
  md: 'py-48 md:py-64 lg:py-96', // 48/64/96 = 6×8 / 8×8 / 12×8
  lg: 'py-64 md:py-96 lg:py-128', // 64/96/128 = 8×8 / 12×8 / 16×8
  xl: 'py-96 md:py-128 lg:py-160', // 96/128/160 = 12×8 / 16×8 / 20×8
};

/**
 * Container width variants
 * max-w-7xl is the approved design system container
 */
const CONTAINER_STYLES: Record<SectionContainer, string> = {
  none: 'w-full',
  default: 'max-w-7xl mx-auto px-16 sm:px-32 lg:px-48', // 16/32/48 = 2×8 / 4×8 / 6×8
  wide: 'max-w-screen-xl mx-auto px-16 sm:px-32 lg:px-64', // 16/32/64 = 2×8 / 4×8 / 8×8
  narrow: 'max-w-5xl mx-auto px-16 sm:px-32 lg:px-48', // 16/32/48 = 2×8 / 4×8 / 6×8
};

/**
 * Background variants
 */
const BACKGROUND_STYLES: Record<SectionBackground, string> = {
  transparent: 'bg-transparent',
  dark: 'bg-[#1A1A1A]',
  darker: 'bg-black',
  'gold-subtle': 'bg-gradient-to-b from-[var(--brand-gold)]/5 to-transparent',
};

// ============================================
// Main Section Component
// ============================================

export const Section: React.FC<SectionProps> = ({
  children,
  spacing = 'md',
  container = 'default',
  background = 'transparent',
  className = '',
  id,
  as: Component = 'section',
}) => {
  const spacingClass = SPACING_STYLES[spacing];
  const containerClass = CONTAINER_STYLES[container];
  const backgroundClass = BACKGROUND_STYLES[background];

  return (
    <Component
      id={id}
      className={`
        ${backgroundClass}
        ${spacingClass}
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
    >
      <div className={containerClass}>{children}</div>
    </Component>
  );
};

// ============================================
// Export
// ============================================

export default Section;
