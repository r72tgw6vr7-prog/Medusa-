import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LocaleRouteSync() {
  const { setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const persistedLanguage = window.localStorage.getItem('language');
    if (persistedLanguage === 'de' || persistedLanguage === 'en') return;

    setLanguage('de');
  }, [location.pathname, setLanguage]);

  return null;
}
