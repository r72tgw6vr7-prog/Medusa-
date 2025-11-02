export const designTokens = {
  colors: {
    primary: '#C9A961',
    primaryDark: '#A68646',
    primaryLight: '#E8D4B8',
    charcoal: '#1A1A1A',
    surface: '#2A2A2A',
    border: '#3A3A3A',
    textPrimary: '#FFFFFF',
    textSecondary: '#B3B3B3',
    textTertiary: '#808080',
    whatsapp: '#25D366',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    // Legacy brand colors for backward compatibility
    brandGold: '#d4af37',
    brandChrome: '#c0c0c0',
    brandBackground: '#222222',
    brandWhite: '#ffffff',
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '96px',
    // Extended spacing system
    quarter: '2px',
    half: '4px',
    1: '8px',
    '1p5': '12px',
    2: '16px',
    '2p5': '20px',
    3: '24px',
    4: '32px',
    5: '40px',
    6: '48px',
    8: '64px',
    10: '80px',
    12: '96px',
    15: '120px',
    16: '128px',
  },
  typography: {
    fontFamily: {
      display: '"Playfair Display", serif',
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      headline: '"Playfair Display", serif', // Legacy alias
    },
    fontSize: {
      h1: 'clamp(40px, 8vw, 56px)',
      h2: 'clamp(32px, 5vw, 40px)',
      h3: 'clamp(24px, 3vw, 32px)',
      body: 'clamp(16px, 2vw, 18px)',
      small: '14px',
      // Desktop scales
      headlineXl: '72px',
      headlineLg: '48px',
      headlineMd: '36px',
      bodyLarge: '24px',
      bodyDesktop: '20px',
      bodySmall: '18px',
      label: '16px',
      caption: '14px',
    },
    lineHeight: { tight: '1.2', normal: '1.5', relaxed: '1.8' },
    fontWeight: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  buttons: {
    primary: { 
      bg: '#C9A961', 
      bgHover: '#A68646', 
      text: '#FFFFFF', 
      padding: '16px 32px', 
      height: '48px', 
      borderRadius: '8px' 
    },
    secondary: { 
      bg: 'transparent', 
      border: '2px solid #C9A961', 
      text: '#C9A961', 
      padding: '16px 32px', 
      height: '48px', 
      borderRadius: '8px' 
    },
    tertiary: { 
      bg: '#1A1A1A', 
      border: '1px solid #3A3A3A', 
      text: '#FFFFFF', 
      padding: '16px 32px', 
      height: '48px', 
      borderRadius: '8px' 
    },
  },
  breakpoints: { 
    mobile: '640px', 
    tablet: '768px', 
    desktop: '1024px', 
    wide: '1280px' 
  },
  shadows: { 
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', 
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', 
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    // Gold glow shadows
    goldSubtle: '0 0 10px rgba(212, 175, 55, 0.2)',
    gold: '0 0 20px rgba(212, 175, 55, 0.3)',
    goldStrong: '0 0 30px rgba(212, 175, 55, 0.4)',
    goldMedium: '0 4px 20px rgba(212, 175, 55, 0.3)',
  },
  borderRadius: { 
    sm: '4px', 
    md: '8px', 
    lg: '16px',
    xl: '24px', 
    full: '9999px' 
  },
  transitions: { 
    fast: '150ms ease-out', 
    normal: '300ms ease-out', 
    slow: '500ms ease-out' 
  },
  zIndex: {
    base: 1,
    above: 10,
    elevated: 20,
    sticky: 100,
    dropdown: 200,
    modal: 1000,
    toast: 1100,
  },
};

export const generateCSSVariables = () => `
:root {
  /* Primary Color System */
  --color-primary: ${designTokens.colors.primary};
  --color-primary-dark: ${designTokens.colors.primaryDark};
  --color-primary-light: ${designTokens.colors.primaryLight};
  --color-charcoal: ${designTokens.colors.charcoal};
  --color-surface: ${designTokens.colors.surface};
  --color-border: ${designTokens.colors.border};
  --color-text-primary: ${designTokens.colors.textPrimary};
  --color-text-secondary: ${designTokens.colors.textSecondary};
  --color-text-tertiary: ${designTokens.colors.textTertiary};
  --color-success: ${designTokens.colors.success};
  --color-warning: ${designTokens.colors.warning};
  --color-error: ${designTokens.colors.error};
  
  /* Spacing System */
  --space-xs: ${designTokens.spacing.xs};
  --space-sm: ${designTokens.spacing.sm};
  --space-md: ${designTokens.spacing.md};
  --space-lg: ${designTokens.spacing.lg};
  --space-xl: ${designTokens.spacing.xl};
  --space-2xl: ${designTokens.spacing['2xl']};
  --space-3xl: ${designTokens.spacing['3xl']};
  
  /* Typography */
  --font-display: ${designTokens.typography.fontFamily.display};
  --font-body: ${designTokens.typography.fontFamily.body};
  
  /* Border Radius */
  --radius-sm: ${designTokens.borderRadius.sm};
  --radius-md: ${designTokens.borderRadius.md};
  --radius-lg: ${designTokens.borderRadius.lg};
  
  /* Shadows */
  --shadow-sm: ${designTokens.shadows.sm};
  --shadow-md: ${designTokens.shadows.md};
  --shadow-lg: ${designTokens.shadows.lg};
  
  /* Transitions */
  --transition-fast: ${designTokens.transitions.fast};
  --transition-normal: ${designTokens.transitions.normal};
  --transition-slow: ${designTokens.transitions.slow};
}
`;
