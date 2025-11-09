import React from 'react';
import { env } from '../lib/env';

interface StructuredDataProps {
  type: 'organization' | 'local-business' | 'article' | 'service' | 'person';
  data?: Record<string, any>;
}

// Base organization data from environment
const baseOrganization = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'TattooShop'],
  name: env.VITE_BUSINESS_NAME,
  alternateName: 'Medusa Tattoo Studio',
  description:
    'Premium Tattoo Studio in München - Professionelle Tätowierungen, Custom Designs und erstklassige Kunstwerke von erfahrenen Künstlern.',
  url: env.VITE_SITE_URL,
  logo: `${env.VITE_SITE_URL}/images/medusa-logo.png`,
  image: `${env.VITE_SITE_URL}/images/og-medusa-tattoo-munich.jpg`,
  telephone: env.VITE_BUSINESS_PHONE,
  email: env.VITE_BUSINESS_EMAIL,
  address: {
    '@type': 'PostalAddress',
    streetAddress: env.VITE_BUSINESS_STREET,
    addressLocality: env.VITE_BUSINESS_CITY,
    addressRegion: 'Bayern',
    postalCode: env.VITE_BUSINESS_POSTAL,
    addressCountry: env.VITE_BUSINESS_COUNTRY,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: env.VITE_GEO_LAT,
    longitude: env.VITE_GEO_LNG,
  },
  openingHours: env.VITE_OPENING_HOURS,
  priceRange: env.VITE_PRICE_RANGE || '€€€',
  currenciesAccepted: env.VITE_CURRENCIES_ACCEPTED || 'EUR',
  paymentAccepted: env.VITE_PAYMENT_METHODS?.split(',') || ['Cash', 'Credit Card', 'Bank Transfer'],
  areaServed: {
    '@type': 'City',
    name: env.VITE_BUSINESS_CITY,
  },
  serviceArea: {
    '@type': 'GeoCircle',
    geoMidpoint: {
      '@type': 'GeoCoordinates',
      latitude: env.VITE_GEO_LAT,
      longitude: env.VITE_GEO_LNG,
    },
    geoRadius: '50000',
  },
  knowsAbout: [
    'Tattoo Art',
    'Custom Tattoo Design',
    'Realism Tattoos',
    'Traditional Tattoos',
    'Black & Grey Tattoos',
    'Color Tattoos',
    'Piercing',
    'Cover-up Tattoos',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Tattoo & Piercing Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Tattoo Design München',
          description: 'Individuelle Tattoo-Designs nach Kundenwunsch',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Realism Tattoo München',
          description: 'Fotorealistische Tattoo-Kunstwerke',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Professional Piercing München',
          description: 'Professionelles Piercing mit höchsten Hygienestandards',
        },
      },
    ],
  },
  sameAs: [
    env.VITE_INSTAGRAM_URL,
    env.VITE_FACEBOOK_URL,
    `https://wa.me/${env.VITE_WHATSAPP?.replace(/[^+\d]/g, '')}`,
  ].filter(Boolean),
};

const structuredDataTemplates = {
  organization: baseOrganization,

  'local-business': {
    ...baseOrganization,
    '@type': ['LocalBusiness', 'TattooShop'],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
    },
  },

  article: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.title,
    description: data.description,
    image: data.image,
    author: {
      '@type': 'Organization',
      name: 'Medusa Tattoo München',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Medusa Tattoo München',
      logo: {
        '@type': 'ImageObject',
        url: `${env.VITE_SITE_URL}/images/medusa-logo.png`,
      },
    },
    datePublished: data.datePublished,
    dateModified: data.dateModified || data.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': data.url,
    },
  }),

  service: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.name,
    description: data.description,
    provider: baseOrganization,
    areaServed: {
      '@type': 'City',
      name: env.VITE_BUSINESS_CITY,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: data.name,
      itemListElement: data.offers || [],
    },
  }),

  person: (data: any) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    jobTitle: data.jobTitle || 'Tattoo Artist',
    description: data.description,
    image: data.image,
    worksFor: {
      '@type': 'Organization',
      name: env.VITE_BUSINESS_NAME,
    },
    knowsAbout: data.specialties || ['Tattoo Art', 'Custom Design'],
    url: data.portfolioUrl,
  }),
};

export default function StructuredData({ type, data = {} }: StructuredDataProps) {
  const getStructuredData = () => {
    const template = structuredDataTemplates[type];

    if (typeof template === 'function') {
      return template(data);
    }

    return { ...template, ...data };
  };

  const structuredData = getStructuredData();

  return (
    <script
      type='application/ld+json'
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 0),
      }}
    />
  );
}

// Convenience components for common use cases
export function OrganizationSchema() {
  return <StructuredData type='organization' />;
}

export function LocalBusinessSchema() {
  return <StructuredData type='local-business' />;
}

export function ArticleSchema(props: {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return <StructuredData type='article' data={props} />;
}

export function ServiceSchema(props: { name: string; description: string; offers?: any[] }) {
  return <StructuredData type='service' data={props} />;
}

export function PersonSchema(props: {
  name: string;
  jobTitle?: string;
  description: string;
  image?: string;
  specialties?: string[];
  portfolioUrl?: string;
}) {
  return <StructuredData type='person' data={props} />;
}
