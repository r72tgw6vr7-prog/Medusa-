import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { X, Shield, Eye, Cookie, ExternalLink, Info } from 'lucide-react';
import { useDesignSystem } from './DesignSystem';

// ==========================================
// COMPLIANCE CORE - GDPR, A11Y, SEO
// ==========================================

// GDPR Types
export interface CookieCategory {
  id: string;
  name: {
    DE: string;
    EN: string;
  };
  description: {
    DE: string;
    EN: string;
  };
  required: boolean;
  cookies: CookieInfo[];
}

export interface CookieInfo {
  name: string;
  purpose: {
    DE: string;
    EN: string;
  };
  duration: string;
  provider: string;
}

export interface GDPRConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  timestamp: number;
  version: string;
}

// Accessibility Types
export interface A11ySettings {
  reduceMotion: boolean;
  highContrast: boolean;
  largeText: boolean;
  focusIndicators: boolean;
  screenReader: boolean;
}

// SEO Types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: 'summary' | 'summary_large_image';
  noIndex?: boolean;
  noFollow?: boolean;
}

// Compliance Context
interface ComplianceContextValue {
  // GDPR
  gdprConsent: GDPRConsent | null;
  showGDPRBanner: boolean;
  cookieCategories: CookieCategory[];
  acceptAllCookies: () => void;
  acceptNecessaryCookies: () => void;
  updateCookieConsent: (consent: Partial<GDPRConsent>) => void;
  dismissGDPRBanner: () => void;
  
  // Accessibility
  a11ySettings: A11ySettings;
  updateA11ySettings: (settings: Partial<A11ySettings>) => void;
  announceToScreenReader: (message: string) => void;
  
  // SEO
  updateSEOMetadata: (metadata: Partial<SEOMetadata>) => void;
  currentSEO: SEOMetadata;
  
  // Privacy
  exportUserData: () => Promise<Blob>;
  deleteUserData: () => Promise<void>;
}

const ComplianceContext = createContext<ComplianceContextValue | null>(null);

// Custom hook for compliance
export function useCompliance() {
  const context = useContext(ComplianceContext);
  if (!context) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }
  return context;
}

// Cookie Categories Configuration
const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: {
      DE: 'Notwendige Cookies',
      EN: 'Necessary Cookies',
    },
    description: {
      DE: 'Diese Cookies sind für die Grundfunktionen der Website erforderlich.',
      EN: 'These cookies are required for the basic functionality of the website.',
    },
    required: true,
    cookies: [
      {
        name: 'medusa_session',
        purpose: {
          DE: 'Sitzungs-ID für Buchungsvorgang',
          EN: 'Session ID for booking process',
        },
        duration: 'Session',
        provider: 'Medusa Tattoo',
      },
      {
        name: 'medusa_consent',
        purpose: {
          DE: 'Speichert Cookie-Einverständnis',
          EN: 'Stores cookie consent preferences',
        },
        duration: '1 Jahr',
        provider: 'Medusa Tattoo',
      },
    ],
  },
  {
    id: 'analytics',
    name: {
      DE: 'Analyse Cookies',
      EN: 'Analytics Cookies',
    },
    description: {
      DE: 'Helfen uns zu verstehen, wie Besucher mit der Website interagieren.',
      EN: 'Help us understand how visitors interact with the website.',
    },
    required: false,
    cookies: [
      {
        name: '_ga',
        purpose: {
          DE: 'Google Analytics - Benutzer unterscheiden',
          EN: 'Google Analytics - Distinguish users',
        },
        duration: '2 Jahre',
        provider: 'Google',
      },
    ],
  },
  {
    id: 'marketing',
    name: {
      DE: 'Marketing Cookies',
      EN: 'Marketing Cookies',
    },
    description: {
      DE: 'Werden verwendet, um Werbung für Sie relevanter zu machen.',
      EN: 'Used to make advertising more relevant to you.',
    },
    required: false,
    cookies: [],
  },
  {
    id: 'preferences',
    name: {
      DE: 'Präferenz Cookies',
      EN: 'Preference Cookies',
    },
    description: {
      DE: 'Ermöglichen es der Website, sich an Ihre Einstellungen zu erinnern.',
      EN: 'Allow the website to remember your preferences.',
    },
    required: false,
    cookies: [
      {
        name: 'medusa_language',
        purpose: {
          DE: 'Sprach-Präferenz speichern',
          EN: 'Store language preference',
        },
        duration: '1 Jahr',
        provider: 'Medusa Tattoo',
      },
    ],
  },
];

// Default SEO Metadata
const defaultSEO: SEOMetadata = {
  title: 'Medusa Tattoo Salon München - Luxuriöse Tattoo-Kunst',
  description: 'Professionelle Tattoo-Services in München. Erfahrene Künstler, höchste Sicherheitsstandards, individuelle Beratung.',
  keywords: ['Tattoo', 'München', 'Tattoo Studio', 'Tattoo Artist', 'Luxury Tattoo'],
  canonical: 'https://medusa-tattoo.de',
  ogTitle: 'Medusa Tattoo Salon München',
  ogDescription: 'Luxuriöse Tattoo-Kunst von erfahrenen Künstlern',
  twitterCard: 'summary_large_image',
};

// Compliance Provider
interface ComplianceProviderProps {
  children: React.ReactNode;
}

export function ComplianceProvider({ children }: ComplianceProviderProps) {
  const { language } = useDesignSystem();
  
  // GDPR State
  const [gdprConsent, setGDPRConsent] = useState<GDPRConsent | null>(null);
  const [showGDPRBanner, setShowGDPRBanner] = useState(false);
  
  // Accessibility State
  const [a11ySettings, setA11ySettings] = useState<A11ySettings>({
    reduceMotion: false,
    highContrast: false,
    largeText: false,
    focusIndicators: true,
    screenReader: false,
  });
  
  // SEO State
  const [currentSEO, setCurrentSEO] = useState<SEOMetadata>(defaultSEO);

  // Load saved preferences on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Load GDPR consent
    const savedConsent = localStorage.getItem('medusa_gdpr_consent');
    if (savedConsent) {
      try {
        const consent = JSON.parse(savedConsent) as GDPRConsent;
        setGDPRConsent(consent);
        setShowGDPRBanner(false);
      } catch (error) {
        console.warn('Failed to parse saved GDPR consent');
        setShowGDPRBanner(true);
      }
    } else {
      setShowGDPRBanner(true);
    }
    
    // Load accessibility settings
    const savedA11y = localStorage.getItem('medusa_a11y_settings');
    if (savedA11y) {
      try {
        const settings = JSON.parse(savedA11y) as A11ySettings;
        setA11ySettings(settings);
        applyA11ySettings(settings);
      } catch (error) {
        console.warn('Failed to parse saved accessibility settings');
      }
    }
    
    // Detect system preferences
    detectSystemPreferences();
  }, []);

  // Detect system accessibility preferences
  const detectSystemPreferences = () => {
    if (typeof window === 'undefined') return;
    
    const mediaQueries = {
      reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)'),
      highContrast: window.matchMedia('(prefers-contrast: high)'),
    };
    
    setA11ySettings(prev => ({
      ...prev,
      reduceMotion: mediaQueries.reduceMotion.matches,
      highContrast: mediaQueries.highContrast.matches,
    }));
    
    // Listen for changes
    Object.entries(mediaQueries).forEach(([key, mq]) => {
      mq.addEventListener('change', (e) => {
        setA11ySettings(prev => ({
          ...prev,
          [key]: e.matches,
        }));
      });
    });
  };

  // Apply accessibility settings to DOM
  const applyA11ySettings = (settings: A11ySettings) => {
    if (typeof document === 'undefined') return;
    
    const root = document.documentElement;
    
    // Apply CSS custom properties
    root.style.setProperty('--reduced-motion', settings.reduceMotion ? '1' : '0');
    root.style.setProperty('--high-contrast', settings.highContrast ? '1' : '0');
    root.style.setProperty('--large-text', settings.largeText ? '1' : '0');
    
    // Apply classes
    root.classList.toggle('reduced-motion', settings.reduceMotion);
    root.classList.toggle('high-contrast', settings.highContrast);
    root.classList.toggle('large-text', settings.largeText);
    root.classList.toggle('focus-indicators', settings.focusIndicators);
  };

  // GDPR Methods
  const acceptAllCookies = useCallback(() => {
    const consent: GDPRConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      timestamp: Date.now(),
      version: '1.0',
    };
    
    setGDPRConsent(consent);
    setShowGDPRBanner(false);
    localStorage.setItem('medusa_gdpr_consent', JSON.stringify(consent));
  }, []);

  const acceptNecessaryCookies = useCallback(() => {
    const consent: GDPRConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      timestamp: Date.now(),
      version: '1.0',
    };
    
    setGDPRConsent(consent);
    setShowGDPRBanner(false);
    localStorage.setItem('medusa_gdpr_consent', JSON.stringify(consent));
  }, []);

  const updateCookieConsent = useCallback((newConsent: Partial<GDPRConsent>) => {
    if (!gdprConsent) return;
    
    const updatedConsent = {
      ...gdprConsent,
      ...newConsent,
      timestamp: Date.now(),
    };
    
    setGDPRConsent(updatedConsent);
    localStorage.setItem('medusa_gdpr_consent', JSON.stringify(updatedConsent));
  }, [gdprConsent]);

  const dismissGDPRBanner = useCallback(() => {
    setShowGDPRBanner(false);
  }, []);

  // Accessibility Methods
  const updateA11ySettings = useCallback((newSettings: Partial<A11ySettings>) => {
    const updatedSettings = { ...a11ySettings, ...newSettings };
    setA11ySettings(updatedSettings);
    applyA11ySettings(updatedSettings);
    localStorage.setItem('medusa_a11y_settings', JSON.stringify(updatedSettings));
  }, [a11ySettings]);

  const announceToScreenReader = useCallback((message: string) => {
    if (typeof document === 'undefined') return;
    
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }, []);

  // SEO Methods
  const updateSEOMetadata = useCallback((metadata: Partial<SEOMetadata>) => {
    const updatedSEO = { ...currentSEO, ...metadata };
    setCurrentSEO(updatedSEO);
    
    // Update document head
    if (typeof document !== 'undefined') {
      document.title = updatedSEO.title;
      
      // Update meta tags
      const metaUpdates = [
        { name: 'description', content: updatedSEO.description },
        { name: 'keywords', content: updatedSEO.keywords.join(', ') },
        { property: 'og:title', content: updatedSEO.ogTitle || updatedSEO.title },
        { property: 'og:description', content: updatedSEO.ogDescription || updatedSEO.description },
        { name: 'twitter:card', content: updatedSEO.twitterCard || 'summary' },
      ];
      
      metaUpdates.forEach(({ name, property, content }) => {
        const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
        let meta = document.querySelector(selector) as HTMLMetaElement;
        
        if (!meta) {
          meta = document.createElement('meta');
          if (name) meta.name = name;
          if (property) meta.setAttribute('property', property);
          document.head.appendChild(meta);
        }
        
        meta.content = content;
      });
      
      // Update canonical link
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = updatedSEO.canonical;
    }
  }, [currentSEO]);

  // Privacy Methods
  const exportUserData = useCallback(async (): Promise<Blob> => {
    const userData = {
      gdprConsent,
      a11ySettings,
      exportDate: new Date().toISOString(),
      dataTypes: ['cookies', 'preferences', 'accessibility_settings'],
    };
    
    return new Blob([JSON.stringify(userData, null, 2)], {
      type: 'application/json',
    });
  }, [gdprConsent, a11ySettings]);

  const deleteUserData = useCallback(async (): Promise<void> => {
    localStorage.removeItem('medusa_gdpr_consent');
    localStorage.removeItem('medusa_a11y_settings');
    
    setGDPRConsent(null);
    setA11ySettings({
      reduceMotion: false,
      highContrast: false,
      largeText: false,
      focusIndicators: true,
      screenReader: false,
    });
    setShowGDPRBanner(true);
  }, []);

  const contextValue: ComplianceContextValue = {
    gdprConsent,
    showGDPRBanner,
    cookieCategories,
    acceptAllCookies,
    acceptNecessaryCookies,
    updateCookieConsent,
    dismissGDPRBanner,
    a11ySettings,
    updateA11ySettings,
    announceToScreenReader,
    updateSEOMetadata,
    currentSEO,
    exportUserData,
    deleteUserData,
  };

  return (
    <ComplianceContext.Provider value={contextValue}>
      {children}
    </ComplianceContext.Provider>
  );
}

// GDPR Cookie Banner
export function GDPRBanner() {
  const { language } = useDesignSystem();
  const { 
    showGDPRBanner, 
    acceptAllCookies, 
    acceptNecessaryCookies, 
    dismissGDPRBanner 
  } = useCompliance();
  
  const [showDetails, setShowDetails] = useState(false);

  const content = {
    DE: {
      title: 'Cookie-Einstellungen',
      description: 'Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Services zu optimieren.',
      acceptAll: 'Alle akzeptieren',
      acceptNecessary: 'Nur notwendige',
      showDetails: 'Details anzeigen',
      hideDetails: 'Details ausblenden',
      privacyPolicy: 'Datenschutzerklärung',
    },
    EN: {
      title: 'Cookie Settings',
      description: 'We use cookies to enhance your experience and optimize our services.',
      acceptAll: 'Accept All',
      acceptNecessary: 'Necessary Only',
      showDetails: 'Show Details',
      hideDetails: 'Hide Details',
      privacyPolicy: 'Privacy Policy',
    },
  };

  const t = content[language];

  if (!showGDPRBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[1001] p-8 bg-brand-background/95 backdrop-blur-lg border-t border-brand-gold/20">
      <div className="mx-auto" style={{ maxWidth: "1433px" }}>
        <div className="flex items-start justify-between" style={{ gap: "32px" }}>
          <div className="flex-1">
            <div className="flex items-center gap-0 mb-0">
              <Cookie size={20} className="text-brand-gold" />
              <h3 className="text-brand-gold font-headline font-bold">{t.title}</h3>
            </div>
            <p className="text-brand-chrome text-sm mb-8">{t.description}</p>
            
            {showDetails && (
              <div className="bg-brand-background/80 rounded-lg p-8 mb-8 border border-brand-chrome/20">
                <CookieDetails />
              </div>
            )}
            
            <div className="flex flex-wrap items-center gap-0">
              <button
                onClick={acceptAllCookies}
                className="btn-luxury px-8 py-0 rounded-xl font-body font-bold"
              >
                {t.acceptAll}
              </button>
              <button
                onClick={acceptNecessaryCookies}
                className="px-8 py-0 rounded-xl font-body border border-brand-chrome/30 text-brand-chrome hover:text-brand-gold hover:border-brand-gold transition-colors transition duration-200 ease-out"
              >
                {t.acceptNecessary}
              </button>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-brand-chrome hover:text-brand-gold text-sm transition-colors transition duration-200 ease-out"
              >
                {showDetails ? t.hideDetails : t.showDetails}
              </button>
              <a
                href="/legal/privacy"
                className="text-brand-chrome hover:text-brand-gold text-sm transition-colors flex items-center gap-0 transition duration-200 ease-out"
              >
                {t.privacyPolicy}
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
          
          <button
            onClick={dismissGDPRBanner}
            className="text-brand-chrome hover:text-brand-gold transition-colors p-0 transition duration-200 ease-out"
            aria-label="Close banner"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

// Cookie Details Component
function CookieDetails() {
  const { language } = useDesignSystem();
  const { cookieCategories, gdprConsent, updateCookieConsent } = useCompliance();

  const content = {
    DE: {
      manage: 'Cookie-Kategorien verwalten',
      required: 'Erforderlich',
      optional: 'Optional',
    },
    EN: {
      manage: 'Manage Cookie Categories',
      required: 'Required',
      optional: 'Optional',
    },
  };

  const t = content[language];

  return (
    <div className="space-y-8">
      <h4 className="text-brand-gold font-headline font-bold text-sm">{t.manage}</h4>
      {cookieCategories.map((category) => (
        <div key={category.id} className="border border-brand-chrome/20 rounded-lg p-0">
          <div className="flex items-center justify-between mb-0">
            <div className="flex items-center gap-0">
              <h5 className="text-brand-white font-body font-medium text-sm">
                {category.name[language]}
              </h5>
              <span className="text-xs px-0 py-0 rounded bg-brand-chrome/20 text-brand-chrome">
                {category.required ? t.required : t.optional}
              </span>
            </div>
            {!category.required && (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={gdprConsent?.[category.id as keyof GDPRConsent] || false}
                  onChange={(e) => updateCookieConsent({ [category.id]: e.target.checked })}
                  className="sr-only"
                />
                <div className="w-4 h-4 border border-brand-chrome/30 rounded bg-brand-background relative">
                  {gdprConsent?.[category.id as keyof GDPRConsent] && (
                    <div className="absolute inset-0 bg-brand-gold rounded"></div>
                  )}
                </div>
              </label>
            )}
          </div>
          <p className="text-brand-chrome text-xs">{category.description[language]}</p>
        </div>
      ))}
    </div>
  );
}

// Accessibility Panel
export function AccessibilityPanel() {
  const { language } = useDesignSystem();
  const { a11ySettings, updateA11ySettings } = useCompliance();
  const [isOpen, setIsOpen] = useState(false);

  const content = {
    DE: {
      title: 'Barrierefreiheit',
      reduceMotion: 'Animationen reduzieren',
      highContrast: 'Hoher Kontrast',
      largeText: 'Großer Text',
      focusIndicators: 'Fokus-Indikatoren',
    },
    EN: {
      title: 'Accessibility',
      reduceMotion: 'Reduce Motion',
      highContrast: 'High Contrast',
      largeText: 'Large Text',
      focusIndicators: 'Focus Indicators',
    },
  };

  const t = content[language];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-4 top-1/2 -translate-y-1/2 z-[1000] bg-brand-background/95 backdrop-blur-lg border border-brand-gold/20 rounded-lg p-0 text-brand-gold hover:bg-brand-gold/10 transition-colors transition duration-200 ease-out"
        aria-label={t.title}
      >
        <Eye size={20} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[1002] bg-brand-background/80 backdrop-blur-lg flex items-center justify-center p-8">
          <div className="bg-brand-background border border-brand-gold/20 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-brand-gold font-headline font-bold text-lg">{t.title}</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-chrome hover:text-brand-gold transition-colors transition duration-200 ease-out"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              {[
                { key: 'reduceMotion', label: t.reduceMotion },
                { key: 'highContrast', label: t.highContrast },
                { key: 'largeText', label: t.largeText },
                { key: 'focusIndicators', label: t.focusIndicators },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center justify-between">
                  <span className="text-brand-white font-body">{label}</span>
                  <input
                    type="checkbox"
                    checked={a11ySettings[key as keyof A11ySettings]}
                    onChange={(e) => updateA11ySettings({ [key]: e.target.checked })}
                    className="w-5 h-5 text-brand-gold bg-brand-background border-brand-chrome/30 rounded focus:ring-brand-gold"
                  />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// SEO Head Component
interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  noIndex?: boolean;
}

export function SEOHead({ 
  title, 
  description, 
  keywords, 
  canonical, 
  noIndex 
}: SEOHeadProps) {
  const { updateSEOMetadata } = useCompliance();

  useEffect(() => {
    updateSEOMetadata({
      ...(title && { title }),
      ...(description && { description }),
      ...(keywords && { keywords }),
      ...(canonical && { canonical }),
      ...(noIndex !== undefined && { noIndex }),
    });
  }, [title, description, keywords, canonical, noIndex, updateSEOMetadata]);

  return null;
}