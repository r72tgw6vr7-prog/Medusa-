import { useEffect } from 'react';

interface MetaProps {
  title: string;
  description: string;
  canonicalPath: string; // starts with '/'
  ogImage?: string;
}

const BASE_URL = 'https://www.muenchen-tattoo-studio.de';
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

export default function Meta({ title, description, canonicalPath, ogImage }: MetaProps) {
  useEffect(() => {
    const url = `${BASE_URL}${canonicalPath}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    // Title & description
    document.title = title;
    upsertMetaTag('name', 'description', description);

    // Canonical
    upsertLink('canonical', url);

    // Open Graph
    upsertMetaTag('property', 'og:type', 'website');
    upsertMetaTag('property', 'og:url', url);
    upsertMetaTag('property', 'og:site_name', 'Medusa Tattoo München');
    upsertMetaTag('property', 'og:title', title);
    upsertMetaTag('property', 'og:description', description);
    upsertMetaTag('property', 'og:image', `${BASE_URL}${image}`);
    upsertMetaTag('property', 'og:image:width', '1200');
    upsertMetaTag('property', 'og:image:height', '630');
    upsertMetaTag('property', 'og:locale', 'de_DE');

    // Twitter
    upsertMetaTag('name', 'twitter:card', 'summary_large_image');
    upsertMetaTag('name', 'twitter:url', url);
    upsertMetaTag('name', 'twitter:title', title);
    upsertMetaTag('name', 'twitter:description', description);
    upsertMetaTag('name', 'twitter:image', `${BASE_URL}${image}`);
  }, [title, description, canonicalPath, ogImage]);

  return null;
}
