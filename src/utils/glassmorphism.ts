/**
 * Glassmorphism Utilities for Medusa Tattoo Website
 *
 * Provides standardized glassmorphism effects throughout the site
 * for consistent look and feel.
 *
 * Based on the brand specification requiring:
 * - Navigation: 45% → 65% opacity with 24px blur
 * - Trust Badges: 60% opacity with 10px blur
 * - Service Cards: 70% opacity with 16px blur
 * - Modal overlays: 85-90% opacity with blur
 */

/**
 * Creates a set of glassmorphism CSS properties with consistent patterns
 *
 * @param backgroundColor - RGB background color (default: rgb(var(--color-surface-darker-rgb) / 0.7))
 * @param blurAmount - CSS blur value (default: 14px)
 * @param borderColor - RGB border color (default: rgb(var(--color-accent-silver-rgb) / 0.1))
 * @param borderWidth - Border width (default: 1px)
 * @returns Object with CSS-in-JS compatible glassmorphism properties
 */
export const createGlassmorphismEffect = (
  backgroundColor: string = 'rgb(var(--color-surface-darker-rgb) / 0.7)',
  blurAmount: string = '14px',
  borderColor: string = 'rgb(var(--color-accent-silver-rgb) / 0.1)',
  borderWidth: string = '1px',
) => {
  return {
    background: backgroundColor,
    backdropFilter: `blur(${blurAmount})`,
    WebkitBackdropFilter: `blur(${blurAmount})`, // Safari support
    border: `${borderWidth} solid ${borderColor}`,
  };
};

/**
 * Utility function to generate Tailwind CSS class strings for glassmorphism effects
 *
 * @param variant - Which glassmorphism variant to use
 * @param customBorder - Optional custom border class (default: undefined)
 * @param includeTransition - Whether to include transition effects (default: true)
 * @returns String of Tailwind CSS classes
 */
export const getGlassmorphismClasses = (
  variant: 'navigation' | 'trustBadge' | 'card' | 'modal' | 'service' | 'stats',
  customBorder?: string,
  includeTransition: boolean = true,
): string => {
  // Base classes all variants share
  const baseClasses = 'backdrop-blur-md';

  // Border class - either custom or default based on variant
  const borderClass = customBorder || getBorderClassForVariant(variant);

  // Transition class if enabled
  const transitionClass = includeTransition ? 'transition duration-300 ease-in-out' : '';

  // Background opacity class based on variant
  const bgClass = getBackgroundClassForVariant(variant);

  return `${bgClass} ${baseClasses} ${borderClass} ${transitionClass}`.trim();
};

/**
 * Returns the appropriate background opacity Tailwind class for each variant
 */
function getBackgroundClassForVariant(variant: string): string {
  switch (variant) {
    case 'navigation':
      return 'bg-[rgba(var(--color-surface-darker-rgb),0.45)]'; // Default non-scrolled state
    case 'navigation-scrolled':
      return 'bg-[rgba(var(--color-surface-darker-rgb),0.65)]'; // Scrolled state
    case 'trustBadge':
      return 'bg-[rgba(var(--color-surface-darker-rgb),0.6)]';
    case 'card':
    case 'service':
      return 'bg-[rgba(var(--color-surface-darker-rgb),0.7)]';
    case 'stats':
      return 'bg-[rgba(var(--color-surface-darker-rgb),0.85)]';
    case 'modal':
      return 'bg-[rgba(var(--color-surface-darker-rgb),0.9)]';
    default:
      return 'bg-[rgba(var(--color-surface-darker-rgb),0.7)]';
  }
}

/**
 * Returns the appropriate border Tailwind class for each variant
 */
function getBorderClassForVariant(variant: string): string {
  switch (variant) {
    case 'navigation':
      return 'border border-[rgba(var(--color-accent-silver-rgb),0.1)]';
    case 'navigation-scrolled':
      return 'border border-[rgba(var(--color-accent-silver-rgb),0.15)]';
    case 'trustBadge':
      return 'border border-[rgba(var(--color-accent-silver-rgb),0.2)]';
    case 'card':
    case 'service':
      return 'border border-[rgba(var(--color-accent-silver-rgb),0.15)]';
    case 'stats':
      return 'border border-[rgba(var(--color-accent-silver-rgb),0.2)]';
    case 'modal':
      return 'border border-[rgba(var(--color-accent-silver-rgb),0.25)]';
    default:
      return 'border border-[rgba(var(--color-accent-silver-rgb),0.15)]';
  }
}

/**
 * Returns the appropriate backdrop-blur Tailwind class for each variant
 */
export function getBlurClassForVariant(variant: string): string {
  switch (variant) {
    case 'navigation':
    case 'navigation-scrolled':
    case 'modal':
      return 'backdrop-blur-xl'; // 24px
    case 'card':
    case 'service':
    case 'stats':
      return 'backdrop-blur-lg'; // 16px
    case 'trustBadge':
      return 'backdrop-blur-md'; // 10px
    default:
      return 'backdrop-blur-md'; // Default 10px
  }
}

/**
 * Generates React inline style object for glassmorphism effects
 * Useful when Tailwind classes aren't sufficient
 *
 * @param variant - Which glassmorphism variant to use
 * @returns React inline style object with glassmorphism effects
 */
export const getGlassmorphismStyles = (
  variant:
    | 'navigation'
    | 'navigation-scrolled'
    | 'trustBadge'
    | 'card'
    | 'service'
    | 'stats'
    | 'modal',
): React.CSSProperties => {
  switch (variant) {
    case 'navigation':
      return {
        background: 'rgba(var(--color-surface-darker-rgb), 0.45)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(var(--color-accent-silver-rgb), 0.1)',
      };
    case 'navigation-scrolled':
      return {
        background: 'rgba(var(--color-surface-darker-rgb), 0.65)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: '1px solid rgba(var(--color-accent-silver-rgb), 0.15)',
      };
    case 'trustBadge':
      return {
        background: 'rgba(var(--color-surface-darker-rgb), 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(var(--color-accent-silver-rgb), 0.2)',
      };
    case 'card':
    case 'service':
      return {
        background: 'rgba(var(--color-surface-darker-rgb), 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(var(--color-accent-silver-rgb), 0.15)',
      };
    case 'stats':
      return {
        background: 'rgba(var(--color-surface-darker-rgb), 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(var(--color-accent-silver-rgb), 0.2)',
      };
    case 'modal':
      return {
        background: 'rgba(var(--color-surface-darker-rgb), 0.9)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(var(--color-accent-silver-rgb), 0.25)',
      };
    default:
      return {
        background: 'rgba(var(--color-surface-darker-rgb), 0.7)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(var(--color-accent-silver-rgb), 0.1)',
      };
  }
};

// Predefined glow effects to combine with glassmorphism
export const chromeGlowEffect = {
  subtle: {
    boxShadow: '0 0 10px rgba(var(--color-accent-silver-rgb), 0.2)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  standard: {
    boxShadow: '0 0 20px rgba(var(--color-accent-silver-rgb), 0.3)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  strong: {
    boxShadow: '0 0 30px rgba(var(--color-accent-silver-rgb), 0.4)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
};

// Export all utilities
export default {
  createGlassmorphismEffect,
  getGlassmorphismClasses,
  getBlurClassForVariant,
  getGlassmorphismStyles,
  chromeGlowEffect,
};
