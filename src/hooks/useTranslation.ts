import { useEffect, useMemo } from 'react';
import type { Locale, Namespace } from '@/i18n';
import { getI18nInstance } from '@/i18n';
import { useLanguage } from '@/contexts/LanguageContext';

export function useTranslation(preloadNamespaces?: Namespace | Namespace[]) {
  const { language, setLanguage, t } = useLanguage();
  const i18n = getI18nInstance();

  const nsList = useMemo(() => {
    if (!preloadNamespaces) return [];
    return Array.isArray(preloadNamespaces) ? preloadNamespaces : [preloadNamespaces];
  }, [preloadNamespaces]);

  useEffect(() => {
    if (nsList.length === 0) return;
    void i18n.loadNamespaces(nsList).catch(() => {});
  }, [i18n, language, nsList]);

  const setLocale = async (locale: Locale) => {
    setLanguage(locale);
  };

  return {
    t,
    locale: language as Locale,
    setLocale,
    i18n,
  };
}
