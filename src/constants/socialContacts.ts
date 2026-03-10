export const SOCIAL_CONTACTS = [
  {
    id: 1,
    name: 'Instagram',
    icon: 'instagram',
    url: 'https://www.instagram.com/medusa.art.suite/?hl=de',
    ariaLabel: 'Visit our Instagram page',
    type: 'social',
  },
  {
    id: 2,
    name: 'Facebook',
    icon: 'facebook',
    url: 'https://www.facebook.com/MedusaTattooPiercingMuenchen/?locale=de_DE',
    ariaLabel: 'Visit our Facebook page',
    type: 'social',
  },
  {
    id: 3,
    name: 'Email',
    icon: 'email',
    url: 'mailto:info@medusa-tattoo.de',
    ariaLabel: 'Send us an email',
    type: 'contact',
  },
  {
    id: 4,
    name: 'Phone',
    icon: 'phone',
    url: 'tel:+4989269313',
    ariaLabel: 'Call us',
    type: 'contact',
  },
  {
    id: 5,
    name: 'WhatsApp',
    icon: 'whatsapp',
    url: 'https://wa.me/4917680196286',
    ariaLabel: 'Message us on WhatsApp',
    type: 'contact',
  },
] as const;

export type SocialContact = (typeof SOCIAL_CONTACTS)[number];
