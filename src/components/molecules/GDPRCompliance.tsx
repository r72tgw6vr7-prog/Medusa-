import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { PageType } from '@/types/page-types';
import { CookieConsentBanner } from './CookieConsentBanner';

const pageRouteMap: Record<PageType, string> = {
  home: '/',
  services: '/services',
  artists: '/artists',
  gallery: '/gallery',
  booking: '/booking',
  contact: '/contact',
  aftercare: '/aftercare',
  legal: '/legal',
  faq: '/faq',
  'design-system-demo': '/design-system-demo',
  impressum: '/impressum',
  datenschutz: '/datenschutz',
};

export const GDPRCompliance: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (page: PageType) => {
      navigate(pageRouteMap[page] ?? '/');
    },
    [navigate],
  );

  return <CookieConsentBanner onNavigate={handleNavigate} />;
};

export default GDPRCompliance;
