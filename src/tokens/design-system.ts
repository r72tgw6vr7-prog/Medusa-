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
  },
  spacing: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '96px',
  },
  typography: {
    fontFamily: {
      display: '"Playfair Display", serif',
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    fontSize: {
      h1: 'clamp(40px, 8vw, 56px)',
      h2: 'clamp(32px, 5vw, 40px)',
      h3: 'clamp(24px, 3vw, 32px)',
      body: 'clamp(16px, 2vw, 18px)',
      small: '14px',
    },
    lineHeight: { tight: '1.2', normal: '1.5', relaxed: '1.8' },
    fontWeight: { light: 300, regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
  buttons: {
    primary: { bg: '#C9A961', bgHover: '#A68646', text: '#FFFFFF', padding: '16px 32px', height: '48px', borderRadius: '8px' },
    secondary: { bg: 'transparent', border: '2px solid #C9A961', text: '#C9A961', padding: '16px 32px', height: '48px', borderRadius: '8px' },
    tertiary: { bg: '#1A1A1A', border: '1px solid #3A3A3A', text: '#FFFFFF', padding: '16px 32px', height: '48px', borderRadius: '8px' },
  },
  breakpoints: { mobile: '640px', tablet: '768px', desktop: '1024px', wide: '1280px' },
  shadows: { sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' },
  borderRadius: { sm: '4px', md: '8px', lg: '16px', full: '9999px' },
  transitions: { fast: '150ms ease-out', normal: '300ms ease-out', slow: '500ms ease-out' },
};

export const generateCSSVariables = () => `
  :root {
    --color-primary: ${designTokens.colors.primary};
    --color-primary-dark: ${designTokens.colors.primaryDark};
    --color-charcoal: ${designTokens.colors.charcoal};
    --color-surface: ${designTokens.colors.surface};
    --color-text-primary: ${designTokens.colors.textPrimary};
    --color-text-secondary: ${designTokens.colors.textSecondary};
    --space-xs: ${designTokens.spacing.xs};
    --space-sm: ${designTokens.spacing.sm};
    --space-md: ${designTokens.spacing.md};
    --space-lg: ${designTokens.spacing.lg};
    --space-xl: ${designTokens.spacing.xl};
    --space-2xl: ${designTokens.spacing['2xl']};
    --space-3xl: ${designTokens.spacing['3xl']};
    --font-display: ${designTokens.typography.fontFamily.display};
    --font-body: ${designTokens.typography.fontFamily.body};
  }
`;
