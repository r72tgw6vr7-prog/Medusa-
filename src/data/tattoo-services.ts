import { DesignRule, PaymentMethod, type TattooPackage } from '../types/services';

/**
 * Tattoo package data extracted from UI components.
 * Includes business metadata for payment, WhatsApp, and design pricing rules.
 */
export const TATTOO_PACKAGES: TattooPackage[] = [
  {
    id: 'packet-s',
    title: 'Packet S',
    description: 'Small tattoos - symbols, letters, souvenirs. For customers with concrete ideas.',
    priceFrom: 80,
    priceUnit: '€ - 150€',
    duration: '30 minutes',
    features: ['Persönliche Beratung', 'Kleine Motive', 'Schnelle Umsetzung'],
    cta: 'Jetzt buchen',
    paymentMethods: [PaymentMethod.Cash],
    whatsappEnabled: true,
    inclusions: ['Aftercare Paket', 'Pflegeanleitung', 'GRATIS Design'],
    designRule: DesignRule.FreeWithTattoo,
    designStandalonePrice: '50€',
  },
  {
    id: 'packet-m',
    title: 'Packet M',
    description: 'Personalized projects, unique designs. Includes aftercare guide & products.',
    priceFrom: 160,
    priceUnit: '€ - 480€',
    duration: '1-3 hours',
    features: ['Einzigartiges Design', 'Aftercare Guide', 'Premium Produkte'],
    cta: 'Jetzt buchen',
    paymentMethods: [PaymentMethod.Cash],
    whatsappEnabled: true,
    inclusions: ['Aftercare Paket', 'Pflegeanleitung', 'GRATIS Design'],
    designRule: DesignRule.FreeWithTattoo,
    designStandalonePrice: '50€',
  },
  {
    id: 'packet-l',
    title: 'Packet L',
    description: 'Größere Projekte mit detaillierter Ausarbeitung. Includes aftercare guide & products.',
    priceFrom: 600,
    priceUnit: '€+',
    duration: '4-7 hours',
    features: ['Detailarbeit', 'Aftercare Guide', 'Premium Produkte'],
    cta: 'Jetzt buchen',
    paymentMethods: [PaymentMethod.Cash],
    whatsappEnabled: true,
    inclusions: ['Aftercare Paket', 'Pflegeanleitung', 'GRATIS Design'],
    designRule: DesignRule.FreeWithTattoo,
    designStandalonePrice: '50€',
  },
  {
    id: 'day-session',
    title: 'Complete Day Session',
    description: 'Ganztägige Session für umfangreiche Projekte und Sleeves.',
    priceFrom: 0,
    priceUnit: 'Auf Anfrage',
    duration: 'Ganztägig',
    features: ['Individuelle Planung', 'VIP Betreuung', 'Flexible Gestaltung'],
    cta: "Let's Talk",
    paymentMethods: [PaymentMethod.Cash],
    whatsappEnabled: true,
    inclusions: ['Aftercare Paket', 'Pflegeanleitung', 'GRATIS Design'],
    designRule: DesignRule.FreeWithTattoo,
    designStandalonePrice: '50€',
  },
];

export default TATTOO_PACKAGES;
