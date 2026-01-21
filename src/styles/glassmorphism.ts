// Glassmorphism effects for Medusa Tattoo Website

// Helper function to create CSS-in-JS glassmorphism effects
export const createGlassmorphism = (
  backgroundColor: string = 'rgba(var(--color-surface-darker-rgb), 0.7)',
  blurAmount: string = '14px',
  borderColor: string = 'rgba(var(--color-accent-silver-rgb), 0.1)',
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
      'rgba(var(--color-surface-darker-rgb), 0.45)',
      '14px',
      'rgba(var(--brand-accent-rgb), 0.10)',
    ),
    boxShadow: 'var(--shadow-chrome-sm)',
  },

  // Card glassmorphism
  card: {
    ...createGlassmorphism(
      'rgba(var(--color-surface-darker-rgb), 0.70)',
      '10px',
      'rgba(var(--brand-accent-rgb), 0.15)',
    ),
  },

  // Hero section overlay glassmorphism
  heroOverlay: {
    ...createGlassmorphism('rgba(var(--color-surface-darker-rgb), 0.4)', '5px', 'transparent', '0px'),
  },

  // Trust badge glassmorphism
  trustBadge: {
    ...createGlassmorphism(
      'rgba(var(--color-surface-darker-rgb), 0.6)',
      '8px',
      'rgba(var(--brand-accent-rgb), 0.15)',
    ),
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    '&:hover': {
      background: 'rgba(var(--color-surface-darker-rgb), 0.8)',
      boxShadow: 'var(--shadow-chrome-sm)',
      borderColor: 'rgba(var(--brand-accent-rgb), 0.20)',
    },
  },

  // Modal glassmorphism
  modal: {
    ...createGlassmorphism(
      'rgba(var(--color-surface-darker-rgb), 0.90)',
      '20px',
      'rgba(var(--brand-accent-rgb), 0.20)',
    ),
    boxShadow: 'var(--shadow-chrome-md)',
  },
};

// Golden glow effects
export const goldenGlow = {
  subtle: {
    boxShadow: 'var(--shadow-chrome-sm)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  standard: {
    boxShadow: 'var(--shadow-chrome-md)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  strong: {
    boxShadow: 'var(--shadow-chrome-lg)',
    transition: 'box-shadow 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  hover: {
    '&:hover': {
      boxShadow: 'var(--shadow-chrome-md)',
    },
  },
  active: {
    '&:active': {
      boxShadow: 'var(--shadow-chrome-lg)',
    },
  },
};

// Button styles
export const buttonStyles = {
  primary: {
    backgroundColor: 'var(--brand-accent)',
    color: 'var(--deep-black)',
    padding: '12px 24px',
    borderRadius: 'var(--radius-md)',
    fontWeight: 600,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    border: 'none',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'var(--brand-accent)',
      boxShadow: 'var(--shadow-chrome-md)',
    },
    '&:active': {
      backgroundColor: 'var(--brand-accent)',
      transform: 'translateY(1px)',
    },
  },

  secondary: {
    backgroundColor: 'transparent',
    color: 'var(--base-white)',
    padding: '10px 22px',
    borderRadius: 'var(--radius-md)',
    fontWeight: 500,
    transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    border: '2px solid var(--brand-accent)',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(var(--color-accent-silver-rgb), 0.1)',
      boxShadow: 'var(--shadow-chrome-sm)',
    },
    '&:active': {
      backgroundColor: 'rgba(var(--color-accent-silver-rgb), 0.2)',
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
