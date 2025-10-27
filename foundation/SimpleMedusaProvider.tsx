import { createContext, useContext, useState, useCallback } from 'react';

// ==========================================
// SIMPLE MEDUSA DESIGN SYSTEM PROVIDER
// Lightweight Version for Production Performance
// ==========================================

// SIMPLIFIED BRAND TOKENS
export const medusaBrandTokens = {
  colors: {
    brand: {
      background: 'var(--brand-background)',
      white: 'var(--brand-white)',
      gold: 'var(--brand-gold)',
      chrome: 'var(--brand-chrome)',
      goldHover: 'var(--brand-gold-hover)',
      chromeHover: 'var(--brand-chrome-hover)',
    },
  },
  typography: {
    fonts: {
      headline: '"Playfair Display", serif',
      body: '"Inter", sans-serif',
    },
  },
};

// SIMPLIFIED DEVICE DETECTION
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

interface SimpleDeviceCapabilities {
  device: DeviceType;
  width: number;
  height: number;
  prefersReducedMotion: boolean;
}

// SIMPLIFIED CONTEXT
interface SimpleMedusaContextValue {
  tokens: typeof medusaBrandTokens;
  device: SimpleDeviceCapabilities;
  language: 'DE' | 'EN';
  setLanguage: (language: 'DE' | 'EN') => void;
  announceToScreenReader: (message: string) => void;
}

const SimpleMedusaContext = createContext<SimpleMedusaContextValue | null>(null);

// SIMPLE PROVIDER
interface SimpleMedusaProviderProps {
  children: React.ReactNode;
  initialLanguage?: 'DE' | 'EN';
}

export function SimpleMedusaProvider({ 
  children, 
  initialLanguage = 'DE' 
}: SimpleMedusaProviderProps) {
  const [language, setLanguage] = useState<'DE' | 'EN'>(initialLanguage);
  
  // Simple device detection
  const [device] = useState<SimpleDeviceCapabilities>(() => {
    if (typeof window === 'undefined') {
      return {
        device: 'mobile',
        width: 393,
        height: 852,
        prefersReducedMotion: false,
      };
    }

    const width = window.innerWidth;
    let deviceType: DeviceType = 'mobile';
    if (width >= 1200) deviceType = 'desktop';
    else if (width >= 768) deviceType = 'tablet';

    return {
      device: deviceType,
      width: window.innerWidth,
      height: window.innerHeight,
      prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    };
  });

  // Simple screen reader announcements
  const announceToScreenReader = useCallback((message: string) => {
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

  const contextValue: SimpleMedusaContextValue = {
    tokens: medusaBrandTokens,
    device,
    language,
    setLanguage,
    announceToScreenReader,
  };

  return (
    <SimpleMedusaContext.Provider value={contextValue}>
      {children}
    </SimpleMedusaContext.Provider>
  );
}

// SIMPLE HOOKS
export function useSimpleMedusaDesignSystem() {
  const context = useContext(SimpleMedusaContext);
  if (!context) {
    throw new Error('useSimpleMedusaDesignSystem must be used within SimpleMedusaProvider');
  }
  return context;
}

export function useSimpleMedusaResponsive() {
  const { device } = useSimpleMedusaDesignSystem();
  
  return {
    device: device.device,
    width: device.width,
    height: device.height,
    isMobile: device.device === 'mobile',
    isTablet: device.device === 'tablet',
    isDesktop: device.device === 'desktop',
    prefersReducedMotion: device.prefersReducedMotion,
  };
}

// Compatibility exports for existing code
export { SimpleMedusaProvider as MedusaDesignSystemProvider };
export { useSimpleMedusaDesignSystem as useMedusaDesignSystem };
export { useSimpleMedusaResponsive as useMedusaResponsive };