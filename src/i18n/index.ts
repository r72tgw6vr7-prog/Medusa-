import i18next, { type BackendModule, type ReadCallback } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

export const SUPPORTED_LOCALES = ['de', 'en'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';

export const I18N_STORAGE_KEY = 'language';
export const I18N_CACHE_VERSION = '4';

export const NAMESPACES = [
  'common',
  'home',
  'booking',
  'contact',
  'services',
  'artists',
  'gallery',
  'errors',
  'validation',
] as const;

export type Namespace = (typeof NAMESPACES)[number];

type NamespaceLoaders = Record<Locale, Record<Namespace, () => Promise<{ default: Record<string, unknown> }>>>;

const namespaceLoaders: NamespaceLoaders = {
  de: {
    common: () => import('./locales/de/common.json'),
    home: () => import('./locales/de/home.json'),
    booking: () => import('./locales/de/booking.json'),
    contact: () => import('./locales/de/contact.json'),
    services: () => import('./locales/de/services.json'),
    artists: () => import('./locales/de/artists.json'),
    gallery: () => import('./locales/de/gallery.json'),
    errors: () => import('./locales/de/errors.json'),
    validation: () => import('./locales/de/validation.json'),
  },
  en: {
    common: () => import('./locales/en/common.json'),
    home: () => import('./locales/en/home.json'),
    booking: () => import('./locales/en/booking.json'),
    contact: () => import('./locales/en/contact.json'),
    services: () => import('./locales/en/services.json'),
    artists: () => import('./locales/en/artists.json'),
    gallery: () => import('./locales/en/gallery.json'),
    errors: () => import('./locales/en/errors.json'),
    validation: () => import('./locales/en/validation.json'),
  },
};

function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function normalizeLocale(input: string | null | undefined): Locale {
  if (!input) return DEFAULT_LOCALE;
  const base = input.toLowerCase().split('-')[0];
  return isLocale(base) ? base : DEFAULT_LOCALE;
}

function getCacheKey(locale: Locale, namespace: Namespace) {
  return `i18n_${I18N_CACHE_VERSION}_${locale}_${namespace}`;
}

function readCached(locale: Locale, namespace: Namespace): Record<string, unknown> | null {
  try {
    const raw = localStorage.getItem(getCacheKey(locale, namespace));
    if (!raw) return null;
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function writeCached(locale: Locale, namespace: Namespace, data: Record<string, unknown>) {
  try {
    localStorage.setItem(getCacheKey(locale, namespace), JSON.stringify(data));
  } catch {
    // ignore cache write failures
  }
}

const dynamicImportBackend: BackendModule = {
  type: 'backend',
  init: () => {},
  read: (language: string, namespace: string, callback: ReadCallback) => {
    const locale = normalizeLocale(language);
    if (!NAMESPACES.includes(namespace as Namespace)) {
      callback(new Error(`Unknown namespace: ${namespace}`), false);
      return;
    }

    const ns = namespace as Namespace;
    const cached = readCached(locale, ns);
    if (cached) {
      callback(null, cached);
      return;
    }

    const loader = namespaceLoaders[locale]?.[ns];
    if (!loader) {
      callback(new Error(`Missing loader for ${locale}/${ns}`), false);
      return;
    }

    loader()
      .then((m) => {
        const data = (m.default ?? {}) as Record<string, unknown>;
        writeCached(locale, ns, data);
        callback(null, data);
      })
      .catch((err) => {
        callback(err as Error, false);
      });
  },
};

let initPromise: Promise<void> | null = null;

export async function initI18n() {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    await i18next
      .use(dynamicImportBackend)
      .use(LanguageDetector)
      .use(initReactI18next)
      .init({
        supportedLngs: [...SUPPORTED_LOCALES],
        fallbackLng: DEFAULT_LOCALE,
        ns: [...NAMESPACES],
        defaultNS: 'common',
        load: 'languageOnly',
        interpolation: {
          escapeValue: false,
        },
        detection: {
          order: ['localStorage', 'navigator'],
          lookupLocalStorage: I18N_STORAGE_KEY,
          caches: ['localStorage'],
        },
        backend: {},
        react: {
          useSuspense: false,
        },
        returnNull: false,
        returnEmptyString: false,
        saveMissing: import.meta.env.DEV,
        parseMissingKeyHandler: (key) => {
          return import.meta.env.DEV ? `⚠️ ${key}` : key;
        },
      });

    // Keep compatibility with existing storage key usage
    i18next.on('languageChanged', (lng) => {
      const locale = normalizeLocale(lng);
      document.documentElement.lang = locale;
      try {
        localStorage.setItem(I18N_STORAGE_KEY, locale);
      } catch {
        // ignore
      }
    });

    // Ensure <html lang> is correct on first paint
    document.documentElement.lang = normalizeLocale(i18next.language);

    // Preload the minimum namespace used by navigation + layout
    await i18next.loadNamespaces(['common']);
  })();

  return initPromise;
}

export function getLocale(): Locale {
  return normalizeLocale(i18next.language);
}

export async function setLocale(locale: Locale) {
  await i18next.changeLanguage(locale);
}

export function getI18nInstance() {
  return i18next;
}

export function splitTranslationKey(fullKey: string): { namespace: Namespace; key: string } {
  const firstDot = fullKey.indexOf('.');
  if (firstDot <= 0) {
    return { namespace: 'common', key: fullKey };
  }

  const namespace = fullKey.slice(0, firstDot);
  const key = fullKey.slice(firstDot + 1);

  if (NAMESPACES.includes(namespace as Namespace)) {
    return { namespace: namespace as Namespace, key };
  }

  // Backward-compat for legacy keys like nav.home, hero.title, booking.labels.name
  const legacyRoot = fullKey.split('.')[0];
  if (legacyRoot === 'hero') return { namespace: 'home', key: fullKey };
  if (legacyRoot === 'nav' || legacyRoot === 'footer' || legacyRoot === 'meta' || legacyRoot === 'slider') {
    return { namespace: 'common', key: fullKey };
  }
  if (legacyRoot === 'booking') return { namespace: 'booking', key };
  if (legacyRoot === 'contact') return { namespace: 'contact', key };
  if (legacyRoot === 'gallery') return { namespace: 'gallery', key };
  if (legacyRoot === 'validation') return { namespace: 'validation', key };

  return { namespace: 'common', key: fullKey };
}
