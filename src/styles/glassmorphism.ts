// Glassmorphism effects for Medusa Tattoo Website
// Based on design-tokens-complete.json specifications

import { designTokens } from '../design-tokens';

// Helper function to create CSS-in-JS glassmorphism effects
export const createGlassmorphism = (
  backgroundColor: string = 'rgba(34, 34, 34, 0.7)',
  blurAmount: string = '14px',
  borderColor: string = 'rgba(212, 175, 55, 0.1)',
  borderWidth: string = '1px',
) => {
  return {
    background: backgroundColor,
    backdropFilter: `blur(${blurAmount})`,
    WebkitBackdropFilter: `blur(${blurAmount})`, // Safari support
    border: `${borderWidth} solid ${borderColor}`,
  };
};

// Predefined glassmorphism styles
export const glassmorphism = {
  // Navigation bar glassmorphism
  navigation: {
    ...createGlassmorphism(
      designTokens.glassmorphism.navigation.default.background,
      '14px',
      designTokens.colors.semantic.borders.navigation,
    ),
    boxShadow: designTokens.shadows['gold-sm'],
  },

  // Card glassmorphism
  card: {
    ...createGlassmorphism(
      designTokens.glassmorphism.card.background,
      '10px',
      designTokens.colors.semantic.borders.default,
    ),
  },

  // Hero section overlay glassmorphism
  heroOverlay: {
    ...createGlassmorphism('rgba(34, 34, 34, 0.4)', '5px', 'transparent', '0px'),
  },

  // Trust badge glassmorphism
  trustBadge: {
    ...createGlassmorphism(
      'rgba(34, 34, 34, 0.6)',
      '8px',
      designTokens.colors.semantic.borders.default,
    ),
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:hover': {
      background: 'rgba(34, 34, 34, 0.8)',
      boxShadow: designTokens.shadows['gold-sm'],
      borderColor: designTokens.colors.semantic.borders.hover,
    },
  },

  // Modal glassmorphism
  modal: {
    ...createGlassmorphism(
      designTokens.glassmorphism.modal.background,
      '20px',
      designTokens.colors.semantic.borders.hover,
    ),
    boxShadow: designTokens.shadows['gold-md'],
  },
};

// Golden glow effects
export const goldenGlow = {
  subtle: {
    boxShadow: designTokens.shadows['ambient-sm'],
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  standard: {
    boxShadow: designTokens.shadows['ambient-md'],
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  strong: {
    boxShadow: designTokens.shadows['ambient-lg'],
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  hover: {
    '&:hover': {
      boxShadow: designTokens.shadows['ambient-md'],
    },
  },
  active: {
    '&:active': {
      boxShadow: designTokens.shadows['ambient-lg'],
    },
  },
};

// Button styles
export const buttonStyles = {
  primary: {
    backgroundColor: designTokens.colors.brand.gold,
    color: designTokens.colors.brand.background,
    padding: '12px 24px',
    borderRadius: designTokens.borderRadius.sm,
    fontWeight: designTokens.typography.fontWeight.semibold,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: designTokens.colors.semantic.accent.hover,
      boxShadow: designTokens.shadows['gold-md'],
    },
    '&:active': {
      backgroundColor: designTokens.colors.semantic.accent.active,
      transform: 'translateY(1px)',
    },
  },

  secondary: {
    backgroundColor: 'transparent',
    color: designTokens.colors.brand.white,
    padding: '10px 22px',
    borderRadius: designTokens.borderRadius.sm,
    fontWeight: designTokens.typography.fontWeight.medium,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    border: `2px solid ${designTokens.colors.brand.gold}`,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(212, 175, 55, 0.1)',
      boxShadow: designTokens.shadows['gold-sm'],
    },
    '&:active': {
      backgroundColor: 'rgba(212, 175, 55, 0.2)',
      transform: 'translateY(1px)',
    },
  },
};

export default {
  glassmorphism,
  goldenGlow,
  buttonStyles,
  createGlassmorphism,
};
