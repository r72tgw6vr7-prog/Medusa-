import { PaymentMethod, type KidsService } from '../types/services';

/**
 * Kids service catalog.
 */
export const KIDS_SERVICES: KidsService[] = [
  {
    id: 'ear-hole-magician',
    name: 'Ear Hole Magician',
    nameDE: 'Ohrloch-Zauberer',
    description: 'Sanftes Ohrlochstechen für Kinder',
    descriptionEN: 'Gentle ear piercing for children',
    price: '25€ pro Ohr',
    priceEN: '25€ per ear',
    minAge: 3,
    duration: '10-15 Min.',
    paymentMethods: [PaymentMethod.Card, PaymentMethod.Paypal, PaymentMethod.Klarna],
    appointmentRequired: false,
    inclusions: ['Titan-Erststecker', 'Pflegeanleitung', 'Follow-up Check inklusive'],
    inclusionsEN: ['Titanium starter studs', 'Aftercare instructions', 'Follow-up check included'],
    features: [
      'Speziell geschultes Personal',
      'Kindgerechte Atmosphäre',
      'Sichere Stechtechnik',
      'Hochwertige Materialien',
    ],
    featuresEN: [
      'Specially trained staff',
      'Child-friendly atmosphere',
      'Safe piercing technique',
      'High-quality materials',
    ],
    cta: 'Termin vereinbaren',
    ctaEN: 'Book Appointment',
  },
];

export default KIDS_SERVICES;
