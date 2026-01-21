import { useTranslation as useReactI18nextTranslation } from 'react-i18next';
import type { Namespace } from '@/i18n';
import { getI18nInstance, getLocale, setLocale, splitTranslationKey } from '@/i18n';
import type { TranslationFunction, TranslationParams } from '@/i18n/types';

export function useTranslation(preloadNamespaces?: Namespace | Namespace[]) {
  const ns = preloadNamespaces
    ? Array.isArray(preloadNamespaces)
      ? preloadNamespaces
      : [preloadNamespaces]
    : undefined;

  const { i18n, t: rawT } = useReactI18nextTranslation(ns);

  const t: TranslationFunction = (fullKey: string, params?: TranslationParams) => {
    const { namespace, key } = splitTranslationKey(fullKey);

    // Fire-and-forget namespace load to keep bundles small
    if (!i18n.hasResourceBundle(i18n.language, namespace)) {
      void i18n.loadNamespaces([namespace]);
    }

    return rawT(key, { ns: namespace, ...(params || {}) });
  };

  return {
    t,
    locale: getLocale(),
    setLocale,
    i18n: getI18nInstance(),
  };
}
