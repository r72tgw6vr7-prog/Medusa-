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
