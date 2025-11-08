import { createContext, useContext, useEffect, useState } from 'react';

// ==========================================
// DESIGN SYSTEM FOUNDATION
// ==========================================

export interface DesignTokens {
  colors: {
    brand: {
      background: string;
      white: string;
      gold: string;
      chrome: string;
      goldHover: string;
      chromeHover: string;
    };
    interactive: {
      focus: string;
      hover: string;
      active: string;
      disabled: string;
    };
  };
  typography: {
    fonts: {
      headline: string;
      body: string;
    };
    sizes: {
      mobile: {
        headlineXl: string;
        headlineLg: string;
        headlineMd: string;
        bodyLarge: string;
        body: string;
        bodySmall: string;
      };
      tablet: {
        headlineXl: string;
        headlineLg: string;
        headlineMd: string;
        bodyLarge: string;
        body: string;
        bodySmall: string;
      };
      desktop: {
        headlineXl: string;
        headlineLg: string;
        headlineMd: string;
        bodyLarge: string;
        body: string;
        bodySmall: string;
      };
    };
  };
  spacing: {
    mobile: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      section: string;
      component: string;
    };
    tablet: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      section: string;
      component: string;
    };
    desktop: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      section: string;
      component: string;
    };
  };
  effects: {
    shadows: {
      goldGlow: string;
      goldGlowStrong: string;
      goldGlowSubtle: string;
      chromeGlow: string;
      chromeGlowSubtle: string;
    };
    transitions: {
      standard: string;
      luxury: string;
      breathing: string;
    };
    blur: {
      glassmorphic: string;
      navigation: string;
    };
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
    wide: string;
  };
  accessibility: {
    touchTarget: {
      minimum: string;
      mobile: string;
      large: string;
    };
    contrast: {
      aa: number;
      aaa: number;
    };
  };
}

// Design Tokens from CSS Variables
const designTokens: DesignTokens = {
  colors: {
    brand: {
      background: 'var(--brand-background)',
      white: 'var(--brand-white)',
      gold: 'var(--brand-gold)',
      chrome: 'var(--brand-chrome)',
      goldHover: 'var(--brand-gold-hover)',
      chromeHover: 'var(--brand-chrome-hover)',
    },
    interactive: {
      focus: 'var(--brand-gold)',
      hover: 'var(--brand-gold-hover)', 
      active: 'var(--brand-gold)',
      disabled: 'var(--brand-chrome)',
    },
  },
  typography: {
    fonts: {
      headline: 'var(--font-headline)',
      body: 'var(--font-body)',
    },
    sizes: {
      mobile: {
        headlineXl: 'var(--text-headline-xl-mobile)',
        headlineLg: 'var(--text-headline-lg-mobile)',
        headlineMd: 'var(--text-headline-md-mobile)',
        bodyLarge: 'var(--text-body-large-mobile)',
        body: 'var(--text-body-mobile)',
        bodySmall: 'var(--text-body-small-mobile)',
      },
      tablet: {
        headlineXl: 'var(--text-headline-xl-tablet)',
        headlineLg: 'var(--text-headline-lg-tablet)',
        headlineMd: 'var(--text-headline-md-tablet)',
        bodyLarge: 'var(--text-body-large-tablet)',
        body: 'var(--text-body-tablet)',
        bodySmall: 'var(--text-body-small-tablet)',
      },
      desktop: {
        headlineXl: 'var(--text-headline-xl-desktop)',
        headlineLg: 'var(--text-headline-lg-desktop)',
        headlineMd: 'var(--text-headline-md-desktop)',
        bodyLarge: 'var(--text-body-large-desktop)',
        body: 'var(--text-body-desktop)',
        bodySmall: 'var(--text-body-small-desktop)',
      },
    },
  },
  spacing: {
    mobile: {
      xs: 'var(--spacing-mobile-xs)',
      sm: 'var(--spacing-mobile-sm)',
      md: 'var(--spacing-mobile-md)',
      lg: 'var(--spacing-mobile-lg)',
      xl: 'var(--spacing-mobile-xl)',
      xxl: 'var(--spacing-mobile-2xl)',
      section: 'var(--section-gap-mobile)',
      component: 'var(--component-gap-mobile)',
    },
    tablet: {
      xs: 'var(--spacing-tablet-xs)',
      sm: 'var(--spacing-tablet-sm)',
      md: 'var(--spacing-tablet-md)',
      lg: 'var(--spacing-tablet-lg)',
      xl: 'var(--spacing-tablet-xl)',
      xxl: 'var(--spacing-tablet-2xl)',
      section: 'var(--section-gap-tablet)',
      component: 'var(--component-gap-tablet)',
    },
    desktop: {
      xs: '0.75rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
      xxl: '3rem',
      section: 'var(--spacing-section)',
      component: 'var(--grid-gutter)',
    },
  },
  effects: {
    shadows: {
      goldGlow: 'var(--gold-glow)',
      goldGlowStrong: 'var(--gold-glow-strong)',
      goldGlowSubtle: 'var(--gold-glow-subtle)',
      chromeGlow: '0 0 16px rgba(192, 192, 192, 0.4)',
      chromeGlowSubtle: '0 0 8px rgba(192, 192, 192, 0.2)',
    },
    transitions: {
      standard: 'var(--interaction-timing)',
      luxury: 'var(--luxury-timing)',
      breathing: 'var(--breathing-timing)',
    },
    blur: {
      glassmorphic: '20px',
      navigation: 'var(--nav-blur)',
    },
  },
  breakpoints: {
    mobile: '0px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px',
  },
  accessibility: {
    touchTarget: {
      minimum: 'var(--touch-target-min)',
      mobile: 'var(--touch-target-mobile)',
      large: 'var(--button-height-large)',
    },
    contrast: {
      aa: 4.5,
      aaa: 7,
    },
  },
};

// Device Detection and Responsive State
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type BreakpointState = {
  device: DeviceType;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  width: number;
  height: number;
};

interface DesignSystemContextValue {
  tokens: DesignTokens;
  breakpoint: BreakpointState;
  theme: 'dark'; // Single theme - luxury dark
  language: 'DE' | 'EN';
  setLanguage: (language: 'DE' | 'EN') => void;
  // Responsive utilities
  getSpacing: (size: keyof DesignTokens['spacing']['mobile']) => string;
  getTypography: (size: keyof DesignTokens['typography']['sizes']['mobile']) => string;
  // Component utilities
  generateComponentId: (base: string) => string;
  registerComponent: (id: string, type: string) => void;
}

const DesignSystemContext = createContext<DesignSystemContextValue | null>(null);

// Custom hook for accessing design system
export function useDesignSystem() {
  const context = useContext(DesignSystemContext);
  if (!context) {
    throw new Error('useDesignSystem must be used within a DesignSystemProvider');
  }
  return context;
}

// Custom hook for responsive behavior
export function useResponsive() {
  const { breakpoint, tokens } = useDesignSystem();
  
  return {
    ...breakpoint,
    spacing: tokens.spacing[breakpoint.device],
    typography: tokens.typography.sizes[breakpoint.device],
    // Responsive utilities
    showOnMobile: breakpoint.isMobile,
    showOnTablet: breakpoint.isTablet,
    showOnDesktop: breakpoint.isDesktop,
    // Conditional rendering helpers
    renderMobile: (content: React.ReactNode) => breakpoint.isMobile ? content : null,
    renderTablet: (content: React.ReactNode) => breakpoint.isTablet ? content : null,
    renderDesktop: (content: React.ReactNode) => breakpoint.isDesktop ? content : null,
  };
}

// Hook for accessing current breakpoint
function useBreakpoint(): BreakpointState {
  const [breakpoint, setBreakpoint] = useState<BreakpointState>(() => {
    if (typeof window === 'undefined') {
      return {
        device: 'mobile',
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        width: 393,
        height: 852,
      };
    }
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    let device: DeviceType = 'mobile';
    if (width >= 1024) device = 'desktop';
    else if (width >= 768) device = 'tablet';
    
    return {
      device,
      isMobile: device === 'mobile',
      isTablet: device === 'tablet',
      isDesktop: device === 'desktop',
      width,
      height,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      let device: DeviceType = 'mobile';
      if (width >= 1024) device = 'desktop';
      else if (width >= 768) device = 'tablet';
      
      setBreakpoint({
        device,
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop',
        width,
        height,
      });
    };

    // Debounce resize events
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize, { passive: true });
    
    // Initial call
    handleResize();
    
    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return breakpoint;
}

// Component registration system for debugging and analytics
const componentRegistry = new Map<string, { type: string; instances: number }>();

interface DesignSystemProviderProps {
  children: React.ReactNode;
  initialLanguage?: 'DE' | 'EN';
}

export function DesignSystemProvider({ 
  children, 
  initialLanguage = 'DE' 
}: DesignSystemProviderProps) {
  const [language, setLanguage] = useState<'DE' | 'EN'>(initialLanguage);
  const breakpoint = useBreakpoint();
  
  // Responsive utilities
  const _getSpacing = (size: keyof DesignTokens['spacing']['mobile']): string => {
    return designTokens.spacing[breakpoint.device][size];
  };
  
  const getTypography = (size: keyof DesignTokens['typography']['sizes']['mobile']): string => {
    return designTokens.typography.sizes[breakpoint.device][size];
  };
  
  // Component utilities
  const generateComponentId = (base: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5);
    return `${base}_${breakpoint.device}_${timestamp}_${random}`;
  };
  
  const registerComponent = (id: string, type: string): void => {
    const existing = componentRegistry.get(id);
    if (existing) {
      componentRegistry.set(id, { ...existing, instances: existing.instances + 1 });
    } else {
      componentRegistry.set(id, { type, instances: 1 });
    }
  };

  const contextValue: DesignSystemContextValue = {
    tokens: designTokens,
    breakpoint,
    theme: 'dark',
    language,
    setLanguage,
    getSpacing: _getSpacing,
    getTypography,
    generateComponentId,
    registerComponent,
  };

  // Apply CSS custom properties for dynamic values
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    
    // Update viewport-dependent values
    root.style.setProperty('--viewport-width', `${breakpoint.width}px`);
    root.style.setProperty('--viewport-height', `${breakpoint.height}px`);
    root.style.setProperty('--current-device', breakpoint.device);
    
    // Update language-dependent values if needed
    root.setAttribute('lang', language.toLowerCase());
    root.setAttribute('data-device', breakpoint.device);
    root.setAttribute('data-theme', 'dark');
  }, [breakpoint, language]);

  return (
    <DesignSystemContext.Provider value={contextValue}>
      {children}
    </DesignSystemContext.Provider>
  );
}

// Utility Components

// Responsive Container with auto-layout
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'wide' | 'full';
  padding?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function ResponsiveContainer({
  children,
  className = '',
  maxWidth = 'desktop',
  padding = true,
  as: Component = 'div',
}: ResponsiveContainerProps) {
  const { breakpoint, getSpacing } = useDesignSystem();
  
  const maxWidthClasses = {
    mobile: 'max-w-sm',
    tablet: 'max-w-4xl',
    desktop: 'style={{ maxWidth: "1433px" }}',
    wide: 'max-w-screen-2xl',
    full: 'max-w-none',
  };
  
  const containerClasses = [
    'w-full mx-auto',
    maxWidthClasses[maxWidth],
    padding && breakpoint.isMobile && 'px-5',
    padding && breakpoint.isTablet && 'px-8',
    padding && breakpoint.isDesktop && 'px-16',
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={containerClasses}>
      {children}
    </Component>
  );
}

// Typography Component with responsive behavior
interface TypographyProps {
  variant: 'headline-xl' | 'headline-lg' | 'headline-md' | 'body-large' | 'body' | 'body-small';
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  color?: 'gold' | 'white' | 'chrome';
}

export function Typography({
  variant,
  children,
  className = '',
  as,
  color = 'white',
}: TypographyProps) {
  const { tokens, breakpoint } = useDesignSystem();
  
  // Default element mapping
  const defaultElements = {
    'headline-xl': 'h1',
    'headline-lg': 'h2', 
    'headline-md': 'h3',
    'body-large': 'p',
    'body': 'p',
    'body-small': 'span',
  } as const;
  
  const Component = as || defaultElements[variant];
  
  const colorClasses = {
    gold: 'text-brand-gold',
    white: 'text-brand-white',
    chrome: 'text-brand-chrome',
  };
  
  const variantClasses = variant.startsWith('headline') 
    ? 'font-headline font-bold' 
    : 'font-body';
  
  const responsiveClass = `text-${variant.replace('-', '-')}`;
  
  const classes = [
    responsiveClass,
    variantClasses,
    colorClasses[color],
    className
  ].filter(Boolean).join(' ');

  return (
    <Component className={classes}>
      {children}
    </Component>
  );
}

// Spacing Component for consistent gaps
interface SpacingProps {
  size: keyof DesignTokens['spacing']['mobile'];
  direction?: 'vertical' | 'horizontal' | 'all';
  className?: string;
}

export function Spacing({ size, direction = 'vertical', className = '' }: SpacingProps) {
  const { getSpacing } = useDesignSystem();
  
  const spacingValue = getSpacing(size);
  
  const directionClasses = {
    vertical: 'my-0',
    horizontal: 'mx-0', 
    all: 'm-0',
  };
  
  const style = {
    vertical: { marginTop: spacingValue, marginBottom: spacingValue },
    horizontal: { marginLeft: spacingValue, marginRight: spacingValue },
    all: { margin: spacingValue },
  };
  
  return (
    <div 
      className={`${directionClasses[direction]} ${className}`}
      style={style[direction]}
      aria-hidden="true"
    />
  );
}

// Debug Component (development only)
export function DesignSystemDebug() {
  const { tokens, breakpoint, language } = useDesignSystem();
  
  if (process.env.NODE_ENV === 'production') return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-brand-background/95 backdrop-blur-lg border border-brand-gold/20 rounded-lg p-8 text-xs font-mono z-[9999]">
      <div className="text-brand-gold font-bold mb-0">Design System Debug</div>
      <div className="space-y-0 text-brand-chrome">
        <div>Device: {breakpoint.device}</div>
        <div>Viewport: {breakpoint.width}×{breakpoint.height}</div>
        <div>Language: {language}</div>
        <div>Components: {componentRegistry.size}</div>
      </div>
    </div>
  );
}