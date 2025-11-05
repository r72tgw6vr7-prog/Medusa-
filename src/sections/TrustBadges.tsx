import React from 'react';

export interface TrustBadgeItem {
  svg: React.ReactNode;
  text: string;
  altText: string;
  id: string;
}

export const TRUST_BADGES: TrustBadgeItem[] = [
  {
    svg: (
      <img
        src='/assets/images/svg/Container_2.svg'
        alt='Auszeichnung Symbol'
        className='w-full h-full object-contain'
      />
    ),
    text: 'Preisgekrönt 2024',
    altText: 'Auszeichnung für hervorragende Tattoo-Kunst',
    id: 'award-badge',
  },
  {
    svg: (
      <img
        src='/assets/images/svg/Container_3.svg'
        alt='Sterile Ausrüstung Symbol'
        className='w-full h-full object-contain'
      />
    ),
    text: 'Sterile Ausrüstung',
    altText: '100% sterile und hygienische Ausrüstung',
    id: 'sterile-badge',
  },
  {
    svg: (
      <img
        src='/assets/images/svg/Container_4.svg'
        alt='Erfahrung Symbol'
        className='w-full h-full object-contain'
      />
    ),
    text: '27 Jahre Erfahrung',
    altText: '27 Jahre professionelle Tattoo-Erfahrung',
    id: 'experience-badge',
  },
  {
    svg: (
      <img
        src='/assets/images/svg/Container.svg'
        alt='EU Zertifizierung Symbol'
        className='w-full h-full object-contain'
      />
    ),
    text: 'EU Zertifiziert',
    altText: 'Nach EU-Standard zertifiziertes Studio',
    id: 'certification-badge',
  },
];
