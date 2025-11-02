// ==========================================
// MEDUSA TATTOO FOUNDATION LAYER
// ==========================================

// Export all foundation components and hooks
export * from './DesignSystem';
export * from './LayoutSystem';
export * from './NavigationCore';
export * from './ComplianceCore';

// Export comprehensive design system
export * from './MedusaDesignSystem';
export * from './MedusaComponents';

// Export production-ready design system
export * from './MedusaDesignSystemProvider';
export * from './MedusaUtilityComponents';

// Export style guide
export { default as MedusaStyleGuide } from './MedusaStyleGuide';

// Re-export key types for convenience
export type {
  DesignTokens,
  DeviceType,
  BreakpointState,
} from './DesignSystem';

export type {
  GridColumns,
  GridSpan,
  GridGap,
  AlignItems,
  JustifyContent,
} from './LayoutSystem';

export type {
  RouteId,
  RouteConfig,
  NavigationState,
} from './NavigationCore';

export type {
  CookieCategory,
  GDPRConsent,
  A11ySettings,
  SEOMetadata,
} from './ComplianceCore';

// Main Foundation Provider that combines all providers

import { DesignSystemProvider } from './DesignSystem';
import { NavigationProvider } from './NavigationCore';
import { ComplianceProvider } from './ComplianceCore';

interface FoundationProviderProps {
  children: React.ReactNode;
  initialLanguage?: 'DE' | 'EN';
  initialRoute?: RouteId;
}

export function FoundationProvider({ 
  children, 
  initialLanguage = 'DE',
  initialRoute = 'home' 
}: FoundationProviderProps) {
  return (
    <DesignSystemProvider initialLanguage={initialLanguage}>
      <ComplianceProvider>
        <NavigationProvider initialRoute={initialRoute}>
          {children}
        </NavigationProvider>
      </ComplianceProvider>
    </DesignSystemProvider>
  );
}

// Foundation Utilities
export const Foundation = {
  // Quick access to commonly used components
  Provider: FoundationProvider,
  
  // Design System
  DesignSystemProvider,
  useDesignSystem: () => import('./DesignSystem').then(m => m.useDesignSystem()),
  useResponsive: () => import('./DesignSystem').then(m => m.useResponsive()),
  
  // Layout System
  Grid: () => import('./LayoutSystem').then(m => m.Grid),
  Section: () => import('./LayoutSystem').then(m => m.Section),
  Flex: () => import('./LayoutSystem').then(m => m.Flex),
  useLayout: () => import('./LayoutSystem').then(m => m.useLayout()),
  
  // Navigation System
  NavigationProvider,
  useNavigation: () => import('./NavigationCore').then(m => m.useNavigation()),
  
  // Compliance System
  ComplianceProvider,
  useCompliance: () => import('./ComplianceCore').then(m => m.useCompliance()),
  
  // Utilities
  version: '1.0.0',
  environment: process.env.NODE_ENV || 'development',
};

// Version info
export const FOUNDATION_VERSION = '1.0.0';
export const DESIGN_SYSTEM_VERSION = '1.0.0';

// Development helpers
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

// Foundation Configuration
export const foundationConfig = {
  // Design System
  designSystem: {
    strictMode: true,
    debugMode: isDevelopment,
    colorMode: 'dark' as const,
    defaultLanguage: 'DE' as const,
  },
  
  // Layout System
  layout: {
    maxWidth: '1440px',
    gridColumns: 12,
    baseSpacing: '8px',
    breakpoints: {
      mobile: '0px',
      tablet: '768px',
      desktop: '1024px',
      wide: '1440px',
    },
  },
  
  // Navigation System
  navigation: {
    enableBreadcrumbs: true,
    enableHistory: true,
    enableDeepLinking: false, // Currently state-based, not URL-based
    mobileMenuBreakpoint: '1024px',
  },
  
  // Compliance System
  compliance: {
    gdpr: {
      enabled: true,
      consentVersion: '1.0',
      showBannerOnFirstVisit: true,
    },
    accessibility: {
      enabled: true,
      detectSystemPreferences: true,
      announcePageChanges: true,
    },
    seo: {
      enabled: true,
      updateDocumentHead: true,
      defaultTitle: 'Medusa Tattoo Salon München',
    },
  },
} as const;

// Foundation Hooks Collection
export const useFoundation = () => ({
  // Design System hooks
  designSystem: () => import('./DesignSystem').then(m => ({
    useDesignSystem: m.useDesignSystem,
    useResponsive: m.useResponsive,
  })),
  
  // Layout System hooks  
  layout: () => import('./LayoutSystem').then(m => ({
    useLayout: m.useLayout,
  })),
  
  // Navigation System hooks
  navigation: () => import('./NavigationCore').then(m => ({
    useNavigation: m.useNavigation,
  })),
  
  // Compliance System hooks
  compliance: () => import('./ComplianceCore').then(m => ({
    useCompliance: m.useCompliance,
  })),
});

// Type guards and utilities
export const isValidRoute = (route: string): route is RouteId => {
  const validRoutes: RouteId[] = [
    'home', 'services', 'artists', 'gallery', 'booking', 'contact',
    'about', 'aftercare', 'consultation', 'legal', 'faq', 'reviews',
    'account', 'login', 'register', 'error-404', 'error-500',
    'maintenance', 'ia-frames', 'responsive-frames'
  ];
  return validRoutes.includes(route as RouteId);
};

export const isValidLanguage = (lang: string): lang is 'DE' | 'EN' => {
  return lang === 'DE' || lang === 'EN';
};

export const isValidDevice = (device: string): device is DeviceType => {
  return device === 'mobile' || device === 'tablet' || device === 'desktop';
};

// Error boundaries for foundation components
export class FoundationErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Foundation Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-brand-background flex items-center justify-center p-8">
          <div className="text-center">
            <h1 className="text-brand-gold font-headline text-2xl mb-8">
              Foundation System Error
            </h1>
            <p className="text-brand-chrome mb-8">
              A critical error occurred in the foundation layer.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-luxury px-8 py-0 rounded-xl font-body font-bold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Foundation initialization helper
export const initializeFoundation = (config?: Partial<typeof foundationConfig>) => {
  const mergedConfig = { ...foundationConfig, ...config };
  
  // Apply global CSS custom properties
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    
    // Set foundation version
    root.setAttribute('data-foundation-version', FOUNDATION_VERSION);
    root.setAttribute('data-design-system-version', DESIGN_SYSTEM_VERSION);
    
    // Set configuration flags
    root.setAttribute('data-strict-mode', mergedConfig.designSystem.strictMode.toString());
    root.setAttribute('data-debug-mode', mergedConfig.designSystem.debugMode.toString());
    
    // Set breakpoints as CSS custom properties
    Object.entries(mergedConfig.layout.breakpoints).forEach(([key, value]) => {
      root.style.setProperty(`--breakpoint-${key}`, value);
    });
  }
  
  return mergedConfig;
};

// Foundation development tools
export const FoundationDevTools = isDevelopment ? {
  // Component tree inspector
  inspectComponentTree: () => {
    if (import.meta.env.DEV) {
      console.log('Foundation Component Tree:', {
        providers: ['DesignSystem', 'Navigation', 'Compliance'],
        hooks: ['useDesignSystem', 'useResponsive', 'useNavigation', 'useCompliance', 'useLayout'],
        components: ['Grid', 'Section', 'Flex', 'NavigationBar', 'GDPRBanner'],
      });
    }
  },
  
  // Current state snapshot
  takeSnapshot: () => {
    // This would be implemented to capture current foundation state
    if (import.meta.env.DEV) {
      console.log('Foundation State Snapshot taken');
    }
  },
  
  // Performance metrics
  getMetrics: () => {
    // This would be implemented to show performance data
    if (import.meta.env.DEV) {
      console.log('Foundation Performance Metrics');
    }
  },
} : undefined;