import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// MEDUSA TATTOO DESIGN SYSTEM PROVIDER
// Comprehensive Design System following Brand Guidelines
// ==========================================

// Brand Design Tokens (from Brand tokens.json spec)
export interface BrandTokens {
  colors: {
    brand: {
      background: 'var(--brand-background)';
      white: 'var(--brand-white)';
      gold: 'var(--brand-gold)';
      chrome: 'var(--brand-chrome)';
      goldHover: 'var(--brand-gold-hover)';
      chromeHover: 'var(--brand-chrome-hover)';
    };
    interactive: {
      focus: 'var(--brand-gold)';
      hover: 'var(--brand-gold-hover)';
      active: 'var(--brand-gold)';
      disabled: 'var(--brand-chrome)';
    };
    semantic: {
      success: 'var(--brand-gold)';
      warning: 'var(--brand-chrome)';
      error: 'var(--brand-white)';
      info: 'var(--brand-chrome)';
    };
  };
  typography: {
    fontFamilies: {
      headline: '"Playfair Display", serif';
      body: '"Inter", sans-serif';
    };
    fontSizes: {
      mobile: {
        headlineXl: '2rem';        // 32px max
        headlineLg: '1.5rem';      // 24px
        headlineMd: '1.375rem';    // 22px
        bodyLarge: '1rem';         // 16px
        body: '0.875rem';          // 14px
        bodySmall: '0.75rem';      // 12px
      };
      tablet: {
        headlineXl: '2.5rem';      // 40px max
        headlineLg: '2rem';        // 32px
        headlineMd: '1.75rem';     // 28px
        bodyLarge: '1.125rem';     // 18px
        body: '1rem';              // 16px
        bodySmall: '0.875rem';     // 14px
      };
      desktop: {
        headlineXl: '4.5rem';      // 72px max
        headlineLg: '3rem';        // 48px
        headlineMd: '2.25rem';     // 36px
        bodyLarge: '1.5rem';       // 24px
        body: '1.25rem';           // 20px
        bodySmall: '1.125rem';     // 18px
      };
    };
    fontWeights: {
      normal: 400;
      medium: 500;
      semibold: 600;
      bold: 700;
    };
    lineHeights: {
      tight: 1.1;
      normal: 1.2;
      relaxed: 1.4;
      loose: 1.5;
    };
    letterSpacing: {
      tight: '-0.02em';
      normal: '0em';
      wide: '0.05em';
      wider: '0.1em';
    };
  };
  spacing: {
    base: '8px';  // 8px base spacing system
    mobile: {
      xs: '0.5rem';      // 8px
      sm: '0.75rem';     // 12px
      md: '1rem';        // 16px
      lg: '1.25rem';     // 20px
      xl: '1.5rem';      // 24px
      xxl: '2rem';       // 32px
      section: '2rem';   // 32px
      component: '1rem'; // 16px
    };
    tablet: {
      xs: '0.75rem';     // 12px
      sm: '1rem';        // 16px
      md: '1rem';        // 16px
      lg: '2rem';        // 32px
      xl: '2rem';        // 32px
      xxl: '2rem';       // 32px
      section: '2rem';   // 32px
      component: '1rem'; // 16px
    };
    desktop: {
      xs: '0.75rem';     // 12px
      sm: '1rem';        // 16px
      md: '1.5rem';      // 24px
      lg: '2rem';        // 32px
      xl: '2.5rem';      // 40px
      xxl: '3rem';       // 48px
      section: '3rem';   // 48px
      component: '1rem'; // 16px
    };
  };
  layout: {
    grid: {
      columns: 12;
      gutter: '1rem';    // 16px
      margin: {
        mobile: '20px';
        tablet: '32px';
        desktop: '64px';
      };
    };
    container: {
      mobile: '100%';
      tablet: '1024px';
      desktop: '1440px';
      wide: '1920px';
    };
    breakpoints: {
      mobile: '0px';
      tablet: '768px';
      desktop: '1024px';
      wide: '1440px';
    };
  };
  effects: {
    shadows: {
      goldGlow: '0 0 20px rgba(212, 175, 55, 0.3)';
      goldGlowStrong: '0 0 30px rgba(212, 175, 55, 0.4)';
      goldGlowSubtle: '0 0 10px rgba(212, 175, 55, 0.2)';
      chromeGlow: '0 0 16px rgba(192, 192, 192, 0.4)';
      chromeGlowSubtle: '0 0 8px rgba(192, 192, 192, 0.2)';
      card: '0 4px 24px rgba(0, 0, 0, 0.3)';
      elevation1: '0 2px 8px rgba(0, 0, 0, 0.2)';
      elevation2: '0 4px 16px rgba(0, 0, 0, 0.3)';
      elevation3: '0 8px 32px rgba(0, 0, 0, 0.4)';
    };
    blur: {
      glassmorphic: '20px';
      navigation: '14px';
      backdrop: '8px';
    };
    transitions: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)';
      luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      breathing: 'cubic-bezier(0.37, 0, 0.63, 1)';
      micro: 'cubic-bezier(0.4, 0, 0.2, 1)';
    };
    durations: {
      instant: '100ms';
      fast: '200ms';
      normal: '300ms';
      slow: '500ms';
      luxurious: '800ms';
    };
  };
  accessibility: {
    touchTargets: {
      minimum: '44px';   // WCAG 2.1 AA minimum
      mobile: '48px';    // Enhanced mobile
      large: '52px';     // Large buttons
    };
    contrast: {
      aa: 4.5;
      aaa: 7;
    };
    focusOutline: {
      width: '2px';
      offset: '2px';
      color: 'var(--brand-gold)';
    };
  };
  motion: {
    parallax: {
      main: 0.08;        // 8% movement
      background: 0.04;  // 4% movement
      subtle: 0.02;      // 2% movement
    };
    magnetic: {
      radius: '32px';
      intensity: 0.4;
    };
  };
}

// Device Detection Types
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
export type OrientationType = 'portrait' | 'landscape';

export interface BreakpointState {
  device: DeviceType;
  orientation: OrientationType;
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  hasHover: boolean;
  prefersReducedMotion: boolean;
  prefersHighContrast: boolean;
}

// Component Registration System
interface ComponentRegistration {
  id: string;
  type: string;
  device: DeviceType;
  timestamp: number;
  props?: Record<string, any>;
}

// Design System Context
interface MedusaDesignSystemContextValue {
  // Core tokens
  tokens: BrandTokens;
  
  // Device state
  breakpoint: BreakpointState;
  
  // Theme and language
  theme: 'dark';  // Single theme for Medusa
  language: 'DE' | 'EN';
  setLanguage: (language: 'DE' | 'EN') => void;
  
  // Responsive utilities
  getSpacing: (size: keyof BrandTokens['spacing']['mobile']) => string;
  getTypography: (size: keyof BrandTokens['typography']['fontSizes']['mobile']) => string;
  getFontSize: (variant: 'headline-xl' | 'headline-lg' | 'headline-md' | 'body-large' | 'body' | 'body-small') => string;
  
  // Layout utilities
  getContainerMaxWidth: () => string;
  getContainerPadding: () => string;
  getGridColumns: () => number;
  getGridGutter: () => string;
  
  // Component utilities
  generateComponentId: (base: string) => string;
  registerComponent: (registration: ComponentRegistration) => void;
  getComponentMetrics: () => ComponentRegistration[];
  
  // Motion utilities
  shouldReduceMotion: boolean;
  getTransition: (type: keyof BrandTokens['effects']['transitions'], duration?: keyof BrandTokens['effects']['durations']) => string;
  
  // Accessibility utilities
  announceToScreenReader: (message: string) => void;
  getTouchTargetSize: (size?: 'minimum' | 'mobile' | 'large') => string;
}

// Component registry for debugging
const componentRegistry = new Map<string, ComponentRegistration>();

// Brand tokens implementation
const brandTokens: BrandTokens = {
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
    semantic: {
      success: 'var(--brand-gold)',
      warning: 'var(--brand-chrome)',
      error: 'var(--brand-white)',
      info: 'var(--brand-chrome)',
    },
  },
  typography: {
    fontFamilies: {
      headline: '"Playfair Display", serif',
      body: '"Inter", sans-serif',
    },
    fontSizes: {
      mobile: {
        headlineXl: '2rem',
        headlineLg: '1.5rem',
        headlineMd: '1.375rem',
        bodyLarge: '1rem',
        body: '0.875rem',
        bodySmall: '0.75rem',
      },
      tablet: {
        headlineXl: '2.5rem',
        headlineLg: '2rem',
        headlineMd: '1.75rem',
        bodyLarge: '1.125rem',
        body: '1rem',
        bodySmall: '0.875rem',
      },
      desktop: {
        headlineXl: '4.5rem',
        headlineLg: '3rem',
        headlineMd: '2.25rem',
        bodyLarge: '1.5rem',
        body: '1.25rem',
        bodySmall: '1.125rem',
      },
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.1,
      normal: 1.2,
      relaxed: 1.4,
      loose: 1.5,
    },
    letterSpacing: {
      tight: '-0.02em',
      normal: '0em',
      wide: '0.05em',
      wider: '0.1em',
    },
  },
  spacing: {
    base: '8px',
    mobile: {
      xs: '0.5rem',
      sm: '0.75rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem',
      section: '2rem',
      component: '1rem',
    },
    tablet: {
      xs: '0.75rem',
      sm: '1rem',
      md: '1rem',
      lg: '2rem',
      xl: '2rem',
      xxl: '2rem',
      section: '2rem',
      component: '1rem',
    },
    desktop: {
      xs: '0.75rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '2.5rem',
      xxl: '3rem',
      section: '3rem',
      component: '1rem',
    },
  },
  layout: {
    grid: {
      columns: 12,
      gutter: '1rem',
      margin: {
        mobile: '20px',
        tablet: '32px',
        desktop: '64px',
      },
    },
    container: {
      mobile: '100%',
      tablet: '1024px',
      desktop: '1440px',
      wide: '1920px',
    },
    breakpoints: {
      mobile: '0px',
      tablet: '768px',
      desktop: '1024px',
      wide: '1440px',
    },
  },
  effects: {
    shadows: {
      goldGlow: '0 0 20px rgba(212, 175, 55, 0.3)',
      goldGlowStrong: '0 0 30px rgba(212, 175, 55, 0.4)',
      goldGlowSubtle: '0 0 10px rgba(212, 175, 55, 0.2)',
      chromeGlow: '0 0 16px rgba(192, 192, 192, 0.4)',
      chromeGlowSubtle: '0 0 8px rgba(192, 192, 192, 0.2)',
      card: '0 4px 24px rgba(0, 0, 0, 0.3)',
      elevation1: '0 2px 8px rgba(0, 0, 0, 0.2)',
      elevation2: '0 4px 16px rgba(0, 0, 0, 0.3)',
      elevation3: '0 8px 32px rgba(0, 0, 0, 0.4)',
    },
    blur: {
      glassmorphic: '20px',
      navigation: '14px',
      backdrop: '8px',
    },
    transitions: {
      standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
      luxury: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      breathing: 'cubic-bezier(0.37, 0, 0.63, 1)',
      micro: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    durations: {
      instant: '100ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
      luxurious: '800ms',
    },
  },
  accessibility: {
    touchTargets: {
      minimum: '44px',
      mobile: '48px',
      large: '52px',
    },
    contrast: {
      aa: 4.5,
      aaa: 7,
    },
    focusOutline: {
      width: '2px',
      offset: '2px',
      color: 'var(--brand-gold)',
    },
  },
  motion: {
    parallax: {
      main: 0.08,
      background: 0.04,
      subtle: 0.02,
    },
    magnetic: {
      radius: '32px',
      intensity: 0.4,
    },
  },
};

// Context creation
const MedusaDesignSystemContext = createContext<MedusaDesignSystemContextValue | null>(null);

// Custom hook for design system access
export function useMedusaDesignSystem() {
  const context = useContext(MedusaDesignSystemContext);
  if (!context) {
    throw new Error('useMedusaDesignSystem must be used within a MedusaDesignSystemProvider');
  }
  return context;
}

// Device detection hook
function useBreakpointDetection(): BreakpointState {
  const [breakpoint, setBreakpoint] = useState<BreakpointState>(() => {
    if (typeof window === 'undefined') {
      return {
        device: 'mobile',
        orientation: 'portrait',
        width: 393,
        height: 852,
        isMobile: true,
        isTablet: false,
        isDesktop: false,
        isTouch: true,
        hasHover: false,
        prefersReducedMotion: false,
        prefersHighContrast: false,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const orientation = width > height ? 'landscape' : 'portrait';
    
    let device: DeviceType = 'mobile';
    if (width >= 1024) device = 'desktop';
    else if (width >= 768) device = 'tablet';

    const hasHover = window.matchMedia('(hover: hover)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

    return {
      device,
      orientation,
      width,
      height,
      isMobile: device === 'mobile',
      isTablet: device === 'tablet',
      isDesktop: device === 'desktop',
      isTouch,
      hasHover,
      prefersReducedMotion,
      prefersHighContrast,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const orientation = width > height ? 'landscape' : 'portrait';
      
      let device: DeviceType = 'mobile';
      if (width >= 1024) device = 'desktop';
      else if (width >= 768) device = 'tablet';

      const hasHover = window.matchMedia('(hover: hover)').matches;
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;

      setBreakpoint({
        device,
        orientation,
        width,
        height,
        isMobile: device === 'mobile',
        isTablet: device === 'tablet',
        isDesktop: device === 'desktop',
        isTouch,
        hasHover,
        prefersReducedMotion,
        prefersHighContrast,
      });
    };

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateBreakpoint, 150);
    };

    // Media query listeners
    const mediaQueries = {
      hover: window.matchMedia('(hover: hover)'),
      pointer: window.matchMedia('(pointer: coarse)'),
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
    };

    // Initial update
    updateBreakpoint();

    // Event listeners
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', updateBreakpoint, { passive: true });
    
    Object.values(mediaQueries).forEach(mq => {
      mq.addEventListener('change', updateBreakpoint);
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateBreakpoint);
      Object.values(mediaQueries).forEach(mq => {
        mq.removeEventListener('change', updateBreakpoint);
      });
    };
  }, []);

  return breakpoint;
}

// Main provider component
interface MedusaDesignSystemProviderProps {
  children: React.ReactNode;
  initialLanguage?: 'DE' | 'EN';
  debugMode?: boolean;
}

export function MedusaDesignSystemProvider({ 
  children, 
  initialLanguage = 'DE',
  debugMode = false 
}: MedusaDesignSystemProviderProps) {
  const [language, setLanguage] = useState<'DE' | 'EN'>(initialLanguage);
  const breakpoint = useBreakpointDetection();

  // Responsive utilities
  const getSpacing = useCallback((size: keyof BrandTokens['spacing']['mobile']): string => {
    return brandTokens.spacing[breakpoint.device][size];
  }, [breakpoint.device]);

  const getTypography = useCallback((size: keyof BrandTokens['typography']['fontSizes']['mobile']): string => {
    return brandTokens.typography.fontSizes[breakpoint.device][size];
  }, [breakpoint.device]);

  const getFontSize = useCallback((variant: 'headline-xl' | 'headline-lg' | 'headline-md' | 'body-large' | 'body' | 'body-small'): string => {
    const mapping = {
      'headline-xl': 'headlineXl',
      'headline-lg': 'headlineLg', 
      'headline-md': 'headlineMd',
      'body-large': 'bodyLarge',
      'body': 'body',
      'body-small': 'bodySmall',
    } as const;
    
    return brandTokens.typography.fontSizes[breakpoint.device][mapping[variant]];
  }, [breakpoint.device]);

  // Layout utilities
  const getContainerMaxWidth = useCallback((): string => {
    return brandTokens.layout.container[breakpoint.device];
  }, [breakpoint.device]);

  const getContainerPadding = useCallback((): string => {
    return brandTokens.layout.grid.margin[breakpoint.device];
  }, [breakpoint.device]);

  const getGridColumns = useCallback((): number => {
    return brandTokens.layout.grid.columns;
  }, []);

  const getGridGutter = useCallback((): string => {
    return brandTokens.layout.grid.gutter;
  }, []);

  // Component utilities
  const generateComponentId = useCallback((base: string): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 5);
    return `medusa_${base}_${breakpoint.device}_${timestamp}_${random}`;
  }, [breakpoint.device]);

  const registerComponent = useCallback((registration: ComponentRegistration): void => {
    componentRegistry.set(registration.id, registration);
    
    if (debugMode) {
      console.log(`[Medusa DS] Component registered:`, registration);
    }
  }, [debugMode]);

  const getComponentMetrics = useCallback((): ComponentRegistration[] => {
    return Array.from(componentRegistry.values());
  }, []);

  // Motion utilities
  const getTransition = useCallback((
    type: keyof BrandTokens['effects']['transitions'], 
    duration: keyof BrandTokens['effects']['durations'] = 'normal'
  ): string => {
    const timing = brandTokens.effects.transitions[type];
    const time = brandTokens.effects.durations[duration];
    return `all ${time} ${timing}`;
  }, []);

  // Accessibility utilities
  const announceToScreenReader = useCallback((message: string): void => {
    if (typeof document === 'undefined') return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  }, []);

  const getTouchTargetSize = useCallback((size: 'minimum' | 'mobile' | 'large' = 'mobile'): string => {
    return brandTokens.accessibility.touchTargets[size];
  }, []);

  // Apply design tokens to CSS custom properties
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    
    // Device state
    root.setAttribute('data-device', breakpoint.device);
    root.setAttribute('data-orientation', breakpoint.orientation);
    root.setAttribute('data-has-hover', breakpoint.hasHover.toString());
    root.setAttribute('data-is-touch', breakpoint.isTouch.toString());
    root.setAttribute('data-language', language.toLowerCase());
    root.setAttribute('data-theme', 'dark');
    
    // Motion preferences
    root.setAttribute('data-reduced-motion', breakpoint.prefersReducedMotion.toString());
    root.setAttribute('data-high-contrast', breakpoint.prefersHighContrast.toString());
    
    // Viewport data
    root.style.setProperty('--viewport-width', `${breakpoint.width}px`);
    root.style.setProperty('--viewport-height', `${breakpoint.height}px`);
    root.style.setProperty('--current-device', breakpoint.device);
    
    // Container sizing
    root.style.setProperty('--container-max-width', getContainerMaxWidth());
    root.style.setProperty('--container-padding', getContainerPadding());
    
    // Touch targets based on device
    root.style.setProperty('--current-touch-target', getTouchTargetSize());
    
    if (debugMode) {
      console.log(`[Medusa DS] Updated CSS properties for ${breakpoint.device}`);
    }
  }, [breakpoint, language, debugMode, getContainerMaxWidth, getContainerPadding, getTouchTargetSize]);

  const contextValue: MedusaDesignSystemContextValue = useMemo(() => ({
    tokens: brandTokens,
    breakpoint,
    theme: 'dark',
    language,
    setLanguage,
    getSpacing,
    getTypography,
    getFontSize,
    getContainerMaxWidth,
    getContainerPadding,
    getGridColumns,
    getGridGutter,
    generateComponentId,
    registerComponent,
    getComponentMetrics,
    shouldReduceMotion: breakpoint.prefersReducedMotion,
    getTransition,
    announceToScreenReader,
    getTouchTargetSize,
  }), [
    breakpoint,
    language,
    getSpacing,
    getTypography,
    getFontSize,
    getContainerMaxWidth,
    getContainerPadding,
    getGridColumns,
    getGridGutter,
    generateComponentId,
    registerComponent,
    getComponentMetrics,
    getTransition,
    announceToScreenReader,
    getTouchTargetSize,
  ]);

  return (
    <MedusaDesignSystemContext.Provider value={contextValue}>
      {children}
      {debugMode && <DesignSystemDebugPanel />}
    </MedusaDesignSystemContext.Provider>
  );
}

// Responsive utilities hook
export function useMedusaResponsive() {
  const { breakpoint, tokens, getSpacing, getFontSize } = useMedusaDesignSystem();
  
  return {
    ...breakpoint,
    tokens,
    spacing: tokens.spacing[breakpoint.device],
    typography: tokens.typography.fontSizes[breakpoint.device],
    getSpacing,
    getFontSize,
    
    // Conditional rendering helpers
    renderMobile: (content: React.ReactNode) => breakpoint.isMobile ? content : null,
    renderTablet: (content: React.ReactNode) => breakpoint.isTablet ? content : null,
    renderDesktop: (content: React.ReactNode) => breakpoint.isDesktop ? content : null,
    renderTouch: (content: React.ReactNode) => breakpoint.isTouch ? content : null,
    renderHover: (content: React.ReactNode) => breakpoint.hasHover ? content : null,
    
    // Responsive class generators
    getResponsiveClass: (mobile: string, tablet?: string, desktop?: string) => [
      mobile,
      tablet && `md:${tablet}`,
      desktop && `lg:${desktop}`,
    ].filter(Boolean).join(' '),
    
    // Grid utilities
    getGridClass: (columns: number) => `grid-cols-${columns}`,
    getSpanClass: (span: number | 'full') => span === 'full' ? 'col-span-full' : `col-span-${span}`,
  };
}

// Debug panel component
function DesignSystemDebugPanel() {
  const { tokens, breakpoint, getComponentMetrics } = useMedusaDesignSystem();
  const [isExpanded, setIsExpanded] = useState(false);
  const metrics = getComponentMetrics();

  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-mono text-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-brand-background/95 backdrop-blur-lg border border-brand-gold/20 rounded-lg overflow-hidden"
      >
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-0 text-left text-brand-gold hover:bg-brand-gold/10 transition-colors transition duration-200 ease-out"
        >
          <div className="flex items-center justify-between">
            <span className="font-bold">Medusa Design System</span>
            <span className="text-brand-chrome">{isExpanded ? '▼' : '▲'}</span>
          </div>
        </button>
        
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            className="border-t border-brand-gold/20"
          >
            <div className="p-0 space-y-0 max-h-80 overflow-y-auto">
              {/* Device State */}
              <div>
                <div className="text-brand-gold font-bold mb-0">Device State</div>
                <div className="space-y-0 text-brand-chrome">
                  <div>Device: <span className="text-brand-white">{breakpoint.device}</span></div>
                  <div>Viewport: <span className="text-brand-white">{breakpoint.width}×{breakpoint.height}</span></div>
                  <div>Orientation: <span className="text-brand-white">{breakpoint.orientation}</span></div>
                  <div>Touch: <span className="text-brand-white">{breakpoint.isTouch ? 'Yes' : 'No'}</span></div>
                  <div>Hover: <span className="text-brand-white">{breakpoint.hasHover ? 'Yes' : 'No'}</span></div>
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <div className="text-brand-gold font-bold mb-0">Accessibility</div>
                <div className="space-y-0 text-brand-chrome">
                  <div>Reduced Motion: <span className="text-brand-white">{breakpoint.prefersReducedMotion ? 'Yes' : 'No'}</span></div>
                  <div>High Contrast: <span className="text-brand-white">{breakpoint.prefersHighContrast ? 'Yes' : 'No'}</span></div>
                </div>
              </div>

              {/* Typography Scale */}
              <div>
                <div className="text-brand-gold font-bold mb-0">Typography ({breakpoint.device})</div>
                <div className="space-y-0 text-brand-chrome">
                  <div>Headline XL: <span className="text-brand-white">{tokens.typography.fontSizes[breakpoint.device].headlineXl}</span></div>
                  <div>Body: <span className="text-brand-white">{tokens.typography.fontSizes[breakpoint.device].body}</span></div>
                </div>
              </div>

              {/* Spacing Scale */}
              <div>
                <div className="text-brand-gold font-bold mb-0">Spacing ({breakpoint.device})</div>
                <div className="space-y-0 text-brand-chrome">
                  <div>Section: <span className="text-brand-white">{tokens.spacing[breakpoint.device].section}</span></div>
                  <div>Component: <span className="text-brand-white">{tokens.spacing[breakpoint.device].component}</span></div>
                </div>
              </div>

              {/* Components */}
              <div>
                <div className="text-brand-gold font-bold mb-0">Components</div>
                <div className="text-brand-chrome">
                  Registered: <span className="text-brand-white">{metrics.length}</span>
                </div>
              </div>

              {/* Brand Compliance */}
              <div>
                <div className="text-brand-gold font-bold mb-0">Brand Compliance</div>
                <div className="grid grid-cols-4 gap-0">
                  <div className="w-4 h-4 bg-brand-background border border-brand-chrome flex flex-col h-full" title="Background var(--brand-background)"></div>
                  <div className="w-4 h-4 bg-brand-white border border-brand-chrome flex flex-col h-full" title="White var(--brand-white)"></div>
                  <div className="w-4 h-4 bg-brand-gold border border-brand-chrome flex flex-col h-full" title="Gold var(--brand-gold)"></div>
                  <div className="w-4 h-4 bg-brand-chrome border border-brand-chrome flex flex-col h-full" title="Chrome var(--brand-chrome)"></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

// Export additional utilities
export { brandTokens as MedusaBrandTokens };
export type { DeviceType, BreakpointState, ComponentRegistration };