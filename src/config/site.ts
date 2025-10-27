export const siteConfig = {
  name: 'MEDUSA TATTOO MÜNCHEN',
  description: 'Premium Tattoo & Piercing Studio in München',
  contact: {
    address: 'Altheimer Eck 11, 80331 München',
    phone: '+49 (0) 89 269 313',
    email: 'medusa@in-tattoo.de',
    hours: {
      weekdays: '12:00 - 20:00',
      saturday: '12:00 - 20:00',
      sunday: 'Closed',
    },
  },
  social: {
    instagram: 'https://instagram.com/medusatattoomuenchen',
    facebook: 'https://facebook.com/medusatattoomuenchen',
  },
  legal: {
    privacy: '/datenschutz',
    imprint: '/impressum',
    terms: '/agb',
  },
} as const;
