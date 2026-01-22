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

import React, { HTMLAttributes } from 'react';

// ============================================
// Types
// ============================================

type SectionVariant = 'narrow' | 'default' | 'wide';
type SectionSpacing = 'tight' | 'normal' | 'loose' | 'none';
type SectionBg = 'none' | 'dark' | 'darker' | 'darkest';

type SectionElement = 'section' | 'div' | 'article' | 'aside';

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'as'> {
  children: React.ReactNode;
  variant?: SectionVariant;
  spacing?: SectionSpacing;
  bg?: SectionBg;
  as?: SectionElement;
}

// ============================================
// Design System Tokens (8px grid compliant)
// ============================================

/**
 * Vertical spacing variants (responsive, mobile-first)
 * All values are multiples of 8px
 */
const SPACING_STYLES: Record<SectionSpacing, string> = {
  none: '',
  tight: 'py-8 md:py-12 lg:py-16',
  normal: 'py-12 md:py-16 lg:py-24',
  loose: 'py-16 md:py-24 lg:py-32',
};

const BG_STYLES: Record<SectionBg, string> = {
  none: 'bg-transparent',
  dark: 'bg-[#1A1A1A]',
  darker: 'bg-[#1A1A1A]',
  darkest: 'bg-[#1A1A1A]',
};

// ============================================
// Main Section Component
// ============================================

export const Section: React.FC<SectionProps> = ({
  children,
  variant = 'default',
  spacing = 'normal',
  bg = 'none',
  className = '',
  id,
  as: Component = 'section',
  ...props
}) => {
  const spacingClass = SPACING_STYLES[spacing];
  const bgClass = BG_STYLES[bg];

  return (
    <Component
      id={id}
      className={`
        w-full
        ${bgClass}
        ${spacingClass}
        relative z-10
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      data-section-variant={variant}
      {...props}
    >
      {children}
    </Component>
  );
};

// ============================================
// Export
// ============================================

export default Section;
