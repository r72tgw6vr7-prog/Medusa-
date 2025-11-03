import React from 'react';
import { env } from '../lib/env';

interface StructuredDataProps {
  type: 'organization' | 'local-business' | 'article' | 'service';
  data?: Record<string, any>;
}

// Base organization data
const baseOrganization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "TattooShop"],
  "name": "Medusa Tattoo München",
  "alternateName": "Medusa Tattoo Studio",
  "description": "Premium Tattoo Studio in München - Professionelle Tätowierungen, Custom Designs und erstklassige Kunstwerke von erfahrenen Künstlern.",
  "url": env.VITE_SITE_URL,
  "logo": `${env.VITE_SITE_URL}/images/medusa-logo.png`,
  "image": `${env.VITE_SITE_URL}/images/og-medusa-tattoo-munich.jpg`,
  "telephone": env.VITE_PHONE_NUMBER || "+49-89-12345678",
  "email": env.VITE_CONTACT_EMAIL || "info@medusa-tattoo.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": env.VITE_ADDRESS || "Musterstraße 123",
    "addressLocality": "München",
    "addressRegion": "Bayern",
    "postalCode": "80331",
    "addressCountry": "DE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "48.1374",
    "longitude": "11.5755"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
      "opens": "10:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification", 
      "dayOfWeek": ["Friday", "Saturday"],
      "opens": "10:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "12:00", 
      "closes": "18:00"
    }
  ],
  "priceRange": "€€€",
  "currenciesAccepted": "EUR",
  "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer"],
  "areaServed": {
    "@type": "City",
    "name": "München"
  },
  "serviceArea": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": "48.1374",
      "longitude": "11.5755"
    },
    "geoRadius": "50000"
  },
  "knowsAbout": [
    "Tattoo Art",
    "Custom Tattoo Design", 
    "Traditional Tattoos",
    "Realistic Tattoos",
    "Black & Grey Tattoos",
    "Color Tattoos",
    "Piercing"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Tattoo Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Custom Tattoo Design",
          "description": "Individuelle Tattoo-Designs nach Kundenwunsch"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Traditional Tattoos",
          "description": "Klassische Tattoo-Stile und Motive"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service", 
          "name": "Realistic Tattoos",
          "description": "Fotorealistische Tattoo-Kunstwerke"
        }
      }
    ]
  },
  "sameAs": [
    "https://www.instagram.com/medusa_tattoo_munich",
    "https://www.facebook.com/medusatattoomunch", 
    "https://www.google.com/maps/place/medusa+tattoo+munich"
  ]
};

const structuredDataTemplates = {
  organization: baseOrganization,
  
  'local-business': {
    ...baseOrganization,
    "@type": ["LocalBusiness", "TattooShop"],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5"
    }
  },
  
  article: (data: any) => ({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": data.image,
    "author": {
      "@type": "Organization",
      "name": "Medusa Tattoo München"
    },
    "publisher": {
      "@type": "Organization", 
      "name": "Medusa Tattoo München",
      "logo": {
        "@type": "ImageObject",
        "url": `${env.VITE_SITE_URL}/images/medusa-logo.png`
      }
    },
    "datePublished": data.datePublished,
    "dateModified": data.dateModified || data.datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": data.url
    }
  }),
  
  service: (data: any) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.name,
    "description": data.description,
    "provider": baseOrganization,
    "areaServed": {
      "@type": "City", 
      "name": "München"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": data.name,
      "itemListElement": data.offers || []
    }
  })
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
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 0)
      }}
    />
  );
}

// Convenience components for common use cases
export function OrganizationSchema() {
  return <StructuredData type="organization" />;
}

export function LocalBusinessSchema() {
  return <StructuredData type="local-business" />;
}

export function ArticleSchema(props: {
  title: string;
  description: string;
  image: string;
  url: string;
  datePublished: string;
  dateModified?: string;
}) {
  return <StructuredData type="article" data={props} />;
}

export function ServiceSchema(props: {
  name: string;
  description: string;
  offers?: any[];
}) {
  return <StructuredData type="service" data={props} />;
}