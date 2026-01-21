import React, { createContext, useContext, useEffect, useMemo, useState, useCallback, useTransition, ReactNode } from 'react';
import { getI18nInstance, getLocale, setLocale, splitTranslationKey, NAMESPACES } from '@/i18n';

// Define supported languages
export type Language = 'de' | 'en';

// Interface for context
export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isChangingLanguage: boolean;
}

// Create the context
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Props for the provider
interface LanguageProviderProps {
  children: ReactNode;
}

/**
 * Language Provider Component
 * Manages language state and provides translation functionality
 */
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const i18n = getI18nInstance();
  const [language, setLanguageState] = useState<Language>(() => getLocale());
  const [isPending, startTransition] = useTransition();

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;
    
    // Preload all namespaces for the new language before switching
    const preloadPromises = NAMESPACES.map(ns => 
      i18n.loadNamespaces([ns]).catch(() => {})
    );
    
    // Use startTransition to mark the language change as non-urgent
    // This prevents the UI from flashing during the async operation
    Promise.all(preloadPromises).then(() => {
      startTransition(() => {
        void setLocale(lang);
      });
    });
  }, [language, i18n]);

  useEffect(() => {
    const handler = (_lng: string) => {
      setLanguageState((prev) => {
        const next = getLocale();
        return prev === next ? prev : next;
      });
    };

    i18n.on('languageChanged', handler);
    return () => {
      i18n.off('languageChanged', handler);
    };
  }, [i18n]);

  /**
   * Translation function to get string by key
   * Supports nested keys like 'nav.home'
   * Now depends on language state to re-render when language changes
   */
  const t = useMemo(() => {
    return (fullKey: string): string => {
      const { namespace, key } = splitTranslationKey(fullKey);

      // Check if namespace is loaded for CURRENT language (not just any language)
      if (!i18n.hasResourceBundle(language, namespace)) {
        // Synchronously trigger load - the useTransition in setLanguage handles the async waiting
        void i18n.loadNamespaces([namespace]);
      }

      return i18n.t(key, { ns: namespace });
    };
  }, [i18n, language]);

  // Context value - memoize to prevent unnecessary re-renders
  const contextValue: LanguageContextType = useMemo(() => ({
    language,
    setLanguage,
    t,
    isChangingLanguage: isPending,
  }), [language, setLanguage, t, isPending]);

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
};

/**
 * Custom hook to use language context
 * Throws error if used outside of LanguageProvider
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }

  return context;
};
