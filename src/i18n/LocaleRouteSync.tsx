import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LocaleRouteSync() {
  const { setLanguage } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    // URL path is the single source of truth for locale.
    // /en and /en/* → English (these redirect in App.tsx, but guard here too).
    // Everything else → German, always. localStorage is never allowed to
    // override a German URL with an English locale.
    const isEnglishPath =
      location.pathname === '/en' || location.pathname.startsWith('/en/');
    setLanguage(isEnglishPath ? 'en' : 'de');
  }, [location.pathname, setLanguage]);

  return null;
}
