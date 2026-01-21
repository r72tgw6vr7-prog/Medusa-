import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

function langFromPath(pathname: string): Language {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'de';
}

function stripEnPrefix(pathname: string) {
  if (pathname === '/en') return '/';
  if (pathname.startsWith('/en/')) return pathname.replace(/^\/en/, '');
  return pathname;
}

export default function LocaleRouteSync() {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const isNavigatingRef = useRef(false);
  const lastSyncedLocaleRef = useRef<Language | null>(null);

  // Single unified effect: sync URL <-> language with guard flags
  useEffect(() => {
    const fromUrl = langFromPath(location.pathname);

    // Case 1: URL changed externally (user typed URL, clicked link)
    // Update language state to match URL
    if (fromUrl !== language && !isNavigatingRef.current) {
      lastSyncedLocaleRef.current = fromUrl;
      setLanguage(fromUrl);
      return;
    }

    // Case 2: Language changed via context (language toggle button)
    // Update URL to match language
    if (fromUrl !== language && lastSyncedLocaleRef.current !== language) {
      isNavigatingRef.current = true;
      lastSyncedLocaleRef.current = language;
      const basePath = stripEnPrefix(location.pathname);
      const next = language === 'en' ? `/en${basePath === '/' ? '' : basePath}` : basePath;
      navigate(next, { replace: true });
      // Reset flag after navigation completes
      requestAnimationFrame(() => {
        isNavigatingRef.current = false;
      });
    }
  }, [language, location.pathname, navigate, setLanguage]);

  return null;
}
