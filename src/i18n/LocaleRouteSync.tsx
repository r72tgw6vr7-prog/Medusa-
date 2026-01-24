import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

function stripEnPrefix(pathname: string) {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.replace(/^\/en/, '');
  return pathname;
}

export default function LocaleRouteSync() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();
  const isNavigatingRef = useRef(false);
  const lastSyncedLocaleRef = useRef<Language | null>(null);

  // Single unified effect: sync URL <-> language with guard flags
  useEffect(() => {
    if (location.pathname === '/en' || location.pathname.startsWith('/en/')) {
      isNavigatingRef.current = true;
      lastSyncedLocaleRef.current = 'de';
      setLanguage('de');
      navigate(stripEnPrefix(location.pathname), { replace: true });
      requestAnimationFrame(() => {
        isNavigatingRef.current = false;
      });
    }
  }, [location.pathname, navigate, setLanguage]);

  return null;
}
