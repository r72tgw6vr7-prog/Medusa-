import { useLocation } from 'react-router-dom';
import Meta from '@/components/Meta';
import { useLanguage } from '@/contexts/LanguageContext';

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://www.muenchen-tattoo-studio.de';

const toEnglishPath = (basePath: string) => {
  if (basePath === '/') return '/en';
  return `/en${basePath}`;
};

type LocalizedMetaProps =
  | {
      pageKey: string;
      basePath: string;
      canonicalPath: string;
    }
  | {
      titleKey: string;
      descriptionKey: string;
      basePath?: string;
      canonicalPath?: string;
    };

const LocalizedMeta = (props: LocalizedMetaProps) => {
  const { language, t } = useLanguage();
  const location = useLocation();

  const title =
    'pageKey' in props ? t(`common.meta.${props.pageKey}.title`) : t(props.titleKey);
  const description =
    'pageKey' in props ? t(`common.meta.${props.pageKey}.description`) : t(props.descriptionKey);

  const canonicalPath =
    'pageKey' in props ? props.canonicalPath : props.canonicalPath ?? location.pathname;

  const hreflang = props.basePath
    ? {
        de: `${SITE_URL}${props.basePath}`,
        en: `${SITE_URL}${toEnglishPath(props.basePath)}`,
      }
    : undefined;

  return (
    <Meta
      title={title}
      description={description}
      canonicalPath={canonicalPath}
      hreflang={hreflang}
      locale={language === 'en' ? 'en_US' : 'de_DE'}
      alternateLocale={language === 'en' ? ['de_DE'] : ['en_US']}
    />
  );
};

export type { LocalizedMetaProps };
export default LocalizedMeta;
