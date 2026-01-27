import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

function getLocaleFromPathname(pathname: string) {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
}

export default function LocaleRouteSync() {
  const location = useLocation();
  const { setLanguage } = useLanguage();

  // Single unified effect: sync URL <-> language with guard flags
  useEffect(() => {
    setLanguage(getLocaleFromPathname(location.pathname));
  }, [location.pathname, setLanguage]);

  return null;
}
