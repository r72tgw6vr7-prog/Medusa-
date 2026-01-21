export enum PaymentMethod {
  Cash = 'cash',
  Card = 'card',
  Paypal = 'paypal',
  Klarna = 'klarna',
}

export enum DesignRule {
  FreeWithTattoo = 'FREE_WITH_TATTOO',
  PaidStandalone = 'PAID_STANDALONE',
}

export interface TattooPackage {
  id: string;
  title: string;
  description: string;
  priceFrom: number;
  priceUnit: string;
  duration: string;
  features: string[];
  cta: string;
  // Business metadata fields for payment + design policy.
  paymentMethods: PaymentMethod[];
  whatsappEnabled: boolean;
  inclusions: string[];
  /** Business rule for design pricing tied to tattoo bookings. */
  designRule: DesignRule;
  designStandalonePrice?: string;
}

export interface PiercingService {
  id: string;
  title: string;
  description: string;
  priceFrom: number;
  priceUnit: string;
  duration: string;
  features: string[];
  cta: string;
  // Business metadata fields for payment + appointment requirements.
  paymentMethods: PaymentMethod[];
  appointmentRequired: boolean;
}

export interface KidsService {
  id: string;
  name: string;
  nameDE?: string;
  description: string;
  descriptionEN?: string;
  price: string;
  priceEN?: string;
  minAge: number;
  duration: string;
  paymentMethods: PaymentMethod[];
  appointmentRequired: boolean;
  inclusions: string[];
  inclusionsEN?: string[];
  features: string[];
  featuresEN?: string[];
  cta: string;
  ctaEN?: string;
}
