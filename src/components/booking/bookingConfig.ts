import { Crown, Star, Shield, Award } from 'lucide-react';

export type ServiceConfig = {
  id: 'tattoo' | 'piercing';
  titleKey: string;
  priceKey: string;
  featureKeys: { icon: React.ElementType; key: string }[];
};

export type BookingStep = 'details' | 'personal' | 'payment' | 'confirmation' | 'error';

export type BookingFormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  message: string;
  gdprConsent: boolean;
};

// Specific service options for the dropdown
export const SPECIFIC_PIERCING_SERVICES = [
  { id: 'ohr', label: 'Ohr-Piercing' },
  { id: 'mund', label: 'Mund-Piercing' },
  { id: 'gesicht', label: 'Gesicht-Piercing' },
  { id: 'koerper', label: 'Körper-Piercing' },
  { id: 'intim', label: 'Intim-Piercing' },
  { id: 'ohrlochzauberer', label: 'Ohrlochzauberer (Kinder)' },
] as const;

export const SPECIFIC_TATTOO_SERVICES = [
  { id: 'small', label: 'Klein (bis 5cm)' },
  { id: 'medium', label: 'Mittel (5-15cm)' },
  { id: 'large', label: 'Groß (15cm+)' },
  { id: 'coverup', label: 'Cover-Up' },
  { id: 'custom', label: 'Custom Design' },
] as const;

// Map specific service IDs to human-readable labels
export const getSpecificServiceLabel = (serviceId: string): string => {
  const piercing = SPECIFIC_PIERCING_SERVICES.find(s => s.id === serviceId);
  if (piercing) return piercing.label;

  const tattoo = SPECIFIC_TATTOO_SERVICES.find(s => s.id === serviceId);
  if (tattoo) return tattoo.label;

  return serviceId;
};

export type PaymentMethod = 'cash' | 'card' | 'bank_transfer' | null;

export type BookingResult = {
  bookingNumber: string;
  serviceName: string;
  date: string;
};

export const SERVICE_CONFIG: ServiceConfig[] = [
  {
    id: 'tattoo',
    titleKey: 'booking.services.tattoo.title',
    priceKey: 'booking.services.tattoo.price',
    featureKeys: [
      { icon: Crown, key: 'booking.services.tattoo.features.custom' },
      { icon: Star, key: 'booking.services.tattoo.features.experienced' },
      { icon: Shield, key: 'booking.services.tattoo.features.hygiene' },
      { icon: Award, key: 'booking.services.tattoo.features.consultation' },
    ],
  },
  {
    id: 'piercing',
    titleKey: 'booking.services.piercing.title',
    priceKey: 'booking.services.piercing.price',
    featureKeys: [
      { icon: Crown, key: 'booking.services.piercing.features.consultation' },
      { icon: Star, key: 'booking.services.piercing.features.quality' },
      { icon: Shield, key: 'booking.services.piercing.features.sterile' },
      { icon: Award, key: 'booking.services.piercing.features.aftercare' },
    ],
  },
];

export const INITIAL_FORM_DATA: BookingFormData = {
  name: '',
  email: '',
  phone: '',
  date: '',
  message: '',
  gdprConsent: false,
};
