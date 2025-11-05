import React, { createContext, useContext, useEffect, useState } from 'react';

interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
  hasConsented: boolean;
}

interface ConsentContextValue {
  consent: ConsentState;
  updateConsent: (newConsent: Partial<ConsentState>) => void;
  showBanner: boolean;
  acceptAll: () => void;
  acceptNecessary: () => void;
  openSettings: () => void;
  closeSettings: () => void;
  settingsOpen: boolean;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

const CONSENT_STORAGE_KEY = 'medusa-cookie-consent';

const defaultConsent: ConsentState = {
  analytics: false,
  marketing: false,
  functional: true, // Always true for necessary cookies
  hasConsented: false
};

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState>(defaultConsent);
  const [showBanner, setShowBanner] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      try {
        const parsedConsent = JSON.parse(stored);
        setConsent(parsedConsent);
        
        // Initialize GA4 if analytics consent given
        if (parsedConsent.analytics) {
          initializeAnalytics();
        }
      } catch (error) {
        console.warn('Failed to parse stored consent:', error);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = (newConsent: Partial<ConsentState>) => {
    const updatedConsent = { ...consent, ...newConsent, hasConsented: true };
    setConsent(updatedConsent);
    localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(updatedConsent));
    setShowBanner(false);
    
    // Initialize/cleanup analytics based on consent
    if (updatedConsent.analytics && !consent.analytics) {
      initializeAnalytics();
    } else if (!updatedConsent.analytics && consent.analytics) {
      disableAnalytics();
    }
  };

  const acceptAll = () => {
    updateConsent({
      analytics: true,
      marketing: true,
      functional: true
    });
  };

  const acceptNecessary = () => {
    updateConsent({
      analytics: false,
      marketing: false,
      functional: true
    });
  };

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  return (
    <ConsentContext.Provider value={{
      consent,
      updateConsent,
      showBanner,
      acceptAll,
      acceptNecessary,
      openSettings,
      closeSettings,
      settingsOpen
    }}>
      {children}
      {showBanner && <CookieBanner />}
      {settingsOpen && <CookieSettings />}
    </ConsentContext.Provider>
  );
}

export function useConsent() {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
}

// Initialize GA4 only after consent
function initializeAnalytics() {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID;
  if (!measurementId) return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer.push(args);
  }
  window.gtag = gtag;

  gtag('consent', 'default', {
    'analytics_storage': 'granted',
    'ad_storage': 'denied'
  });

  gtag('config', measurementId, {
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure'
  });

  console.log('✅ GA4 Analytics initialized with consent');
}

function disableAnalytics() {
  // Update consent
  if (window.gtag) {
    window.gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
  }
  
  // Remove GA cookies
  document.cookie.split(";").forEach(cookie => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    if (name.trim().startsWith('_ga')) {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    }
  });

  console.log('🚫 GA4 Analytics disabled');
}

// Cookie Banner Component
function CookieBanner() {
  const { acceptAll, acceptNecessary, openSettings } = useConsent();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-700 p-8 z-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="flex-1">
            <p className="text-white text-sm">
              Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und anonyme Nutzungsstatistiken zu sammeln. 
              <button 
                onClick={openSettings}
                className="text-accent-gold hover:text-accent-gold-light underline ml-0 transition duration-200 ease-out"
              >
                Einstellungen anpassen
              </button>
            </p>
          </div>
          <div className="flex gap-0">
            <button
              onClick={acceptNecessary}
              className="px-8 py-0 text-sm border border-neutral-600 text-white hover:bg-neutral-800 rounded transition duration-200 ease-out"
            >
              Nur Notwendige
            </button>
            <button
              onClick={acceptAll}
              className="px-8 py-0 text-sm bg-accent-gold text-black hover:bg-accent-gold-light rounded font-medium transition duration-200 ease-out"
            >
              Alle Akzeptieren
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Cookie Settings Modal
function CookieSettings() {
  const { consent, updateConsent, closeSettings } = useConsent();
  const [tempConsent, setTempConsent] = useState(consent);

  const handleSave = () => {
    updateConsent(tempConsent);
    closeSettings();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-8 z-50">
      <div className="bg-neutral-900 rounded-lg max-w-md w-full p-8">
        <h2 className="text-xl font-semibold text-white mb-8">Cookie-Einstellungen</h2>
        
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Notwendige Cookies</h3>
              <p className="text-neutral-400 text-sm">Erforderlich für die Grundfunktionen der Website</p>
            </div>
            <input 
              type="checkbox" 
              checked={true} 
              disabled 
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Analytics Cookies</h3>
              <p className="text-neutral-400 text-sm">Helfen uns, die Website-Nutzung zu verstehen</p>
            </div>
            <input 
              type="checkbox" 
              checked={tempConsent.analytics}
              onChange={(e) => setTempConsent(prev => ({ ...prev, analytics: e.target.checked }))}
              className="w-5 h-5"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-medium">Marketing Cookies</h3>
              <p className="text-neutral-400 text-sm">Für personalisierte Werbung (derzeit nicht verwendet)</p>
            </div>
            <input 
              type="checkbox" 
              checked={tempConsent.marketing}
              onChange={(e) => setTempConsent(prev => ({ ...prev, marketing: e.target.checked }))}
              className="w-5 h-5"
            />
          </div>
        </div>

        <div className="flex gap-0 mt-8">
          <button
            onClick={closeSettings}
            className="flex-1 px-8 py-0 border border-neutral-600 text-white hover:bg-neutral-800 rounded transition duration-200 ease-out"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-8 py-0 bg-accent-gold text-black hover:bg-accent-gold-light rounded font-medium transition duration-200 ease-out"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
}

// Extend window type for gtag
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}