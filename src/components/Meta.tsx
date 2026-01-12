import { useEffect } from 'react';

interface MetaProps {
  title: string;
  description: string;
  canonicalPath: string; // starts with '/'
  ogImage?: string;
  ogType?: 'website' | 'article' | 'business.business';
  twitterCard?: 'summary' | 'summary_large_image';
  keywords?: string[];
  author?: string;
  robots?: string;
  hreflang?: { [lang: string]: string };
  alternateLocale?: string[];
}

const BASE_URL = import.meta.env.VITE_SITE_URL || 'https://www.muenchen-tattoo-studio.de';
const DEFAULT_OG_IMAGE = '/images/og-medusa-tattoo-munich.jpg';

function upsertMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  let link = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export default function Meta({
  title,
  description,
  canonicalPath,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  keywords,
  author,
  robots = 'index,follow',
  hreflang,
  alternateLocale,
}: MetaProps) {
  useEffect(() => {
    const url = `${BASE_URL}${canonicalPath}`;
    const image = ogImage || DEFAULT_OG_IMAGE;
    const fullImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`;

    // Title & description
    document.title = title;
    upsertMetaTag('name', 'description', description);

    // SEO fundamentals
    upsertMetaTag('name', 'robots', robots);
    if (keywords) {
      upsertMetaTag('name', 'keywords', keywords.join(', '));
    }
    if (author) {
      upsertMetaTag('name', 'author', author);
    }

    // Canonical
    upsertLink('canonical', url);

    // Hreflang alternate links
    if (hreflang) {
      Object.entries(hreflang).forEach(([lang, href]) => {
        upsertLink(`alternate hreflang="${lang}"`, href);
      });
    }

    // Open Graph
    upsertMetaTag('property', 'og:type', ogType);
    upsertMetaTag('property', 'og:url', url);
    upsertMetaTag('property', 'og:site_name', 'Medusa Tattoo München');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:image', fullImageUrl);
    upsertMetaTag('property', 'og:image:width', '1200');
    upsertMetaTag('property', 'og:image:height', '630');
    upsertMetaTag('property', 'og:locale', 'de_DE');

    // Alternate locales
    if (alternateLocale) {
      alternateLocale.forEach((locale) => {
        upsertMetaTag('property', 'og:locale:alternate', locale);
      });
    }

    // Twitter
    upsertMetaTag('name', 'twitter:card', twitterCard);
    upsertMetaTag('name', 'twitter:url', url);
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', fullImageUrl);
    upsertMetaTag('name', 'twitter:site', '@medusa_tattoo_munich');

    // Additional structured markup
    upsertMetaTag('name', 'application-name', 'Medusa Tattoo München');
    upsertMetaTag('name', 'theme-color', 'rgb(212 175 55)'); // Gold theme
  }, [
    title,
    description,
    canonicalPath,
    ogImage,
    ogType,
    twitterCard,
    keywords,
    author,
    robots,
    hreflang,
    alternateLocale,
  ]);

  return null;
}
