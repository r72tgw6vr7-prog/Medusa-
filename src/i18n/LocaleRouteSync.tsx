import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LocaleRouteSync() {
  const { setLanguage } = useLanguage();

  useEffect(() => {
    setLanguage('de');
  }, [setLanguage]);

  return null;
}
