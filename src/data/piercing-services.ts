import { PaymentMethod, type PiercingService } from '../types/services';

/**
 * Piercing service data extracted from UI components.
 * Includes payment methods and appointment requirement flags.
 */
export const PIERCING_SERVICES: PiercingService[] = [
  {
    id: 'ohr',
    title: 'Ohr | Ear',
    description: 'Lobe, Helix, Tragus, Conch, Rook, Daith, Industrial und mehr.',
    priceFrom: 35,
    priceUnit: '€ - 110€',
    duration: '15-30 Min',
    features: ['Titan-Schmuck inklusive', 'Sterile Einwegmaterialien', 'Nachsorgeberatung'],
    cta: 'Jetzt buchen',
    paymentMethods: [PaymentMethod.Card, PaymentMethod.Paypal, PaymentMethod.Klarna],
    appointmentRequired: false,
  },
  {
    id: 'mund',
    title: 'Mund | Mouth',
    description: 'Lippe, Grübchen, Dahlia, Lippenband, Zunge, Snake Eye.',
    priceFrom: 70,
    priceUnit: '€ - 150€',
    duration: '15-30 Min',
    features: ['Titan-Schmuck inklusive', 'Mundspülung inklusive', 'Pflegehinweise'],
    cta: 'Jetzt buchen',
    paymentMethods: [PaymentMethod.Card, PaymentMethod.Paypal, PaymentMethod.Klarna],
    appointmentRequired: false,
  },
  {
    id: 'gesicht',
    title: 'Gesicht | Face',
    description: 'Augenbraue, Bridge, Nase, Septum, Anti Eyebrow, Dermal Anchor.',
    priceFrom: 60,
    priceUnit: '€ - 150€',
    duration: '15-30 Min',
    features: ['Titan-Schmuck inklusive', 'Sterile Umgebung', 'Follow-up möglich'],
    cta: 'Jetzt buchen',
    paymentMethods: [PaymentMethod.Card, PaymentMethod.Paypal, PaymentMethod.Klarna],
    appointmentRequired: false,
  },
  {
    id: 'koerper',
    title: 'Körper | Body',
    description: 'Brustwarze, Bauchnabel, Surface, Dermal Anchor, Skindiver.',
    priceFrom: 80,
    priceUnit: '€ - 160€',
    duration: '20-45 Min',
    features: ['Titan-Schmuck inklusive', 'Anatomie-Check', 'Premium Nachsorge'],
    cta: 'Jetzt buchen',
    paymentMethods: [PaymentMethod.Card, PaymentMethod.Paypal, PaymentMethod.Klarna],
    appointmentRequired: false,
  },
  {
    id: 'intim',
    title: 'Intim | Intimate',
    description: 'Professionelle Intim-Piercings. Mindestalter 18 Jahre.',
    priceFrom: 90,
    priceUnit: '€ - 170€',
    duration: '30-45 Min',
    features: ['Titan-Schmuck inklusive', 'Private Atmosphäre', 'mind. 18 Jahre'],
    cta: 'Beratung anfragen',
    paymentMethods: [PaymentMethod.Card, PaymentMethod.Paypal, PaymentMethod.Klarna],
    appointmentRequired: true,
  },
];

export default PIERCING_SERVICES;
