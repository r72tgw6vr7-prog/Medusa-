/**
 * German Payment Integration Service
 * Supports: Stripe, PayPal, Klarna, SEPA, Sofortüberweisung, Giropay
 */

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'card' | 'bank_transfer' | 'digital_wallet' | 'buy_now_pay_later';
  provider: 'stripe' | 'paypal' | 'klarna' | 'sofort' | 'giropay' | 'sepa';
  fees: {
    percentage: number;
    fixed: number; // in cents
  };
  processingTime: string;
  popular: boolean;
  icon: string;
}

export interface PaymentRequest {
  amount: number; // in cents
  currency: string;
  description: string;
  customerEmail: string;
  customerName: string;
  bookingId: string;
  method: PaymentMethod;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  paymentId: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  redirectUrl?: string;
  error?: string;
  transactionFee?: number;
}

// German payment methods configuration
export const GERMAN_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'sepa',
    name: 'SEPA Lastschrift',
    type: 'bank_transfer',
    provider: 'stripe',
    fees: { percentage: 0.35, fixed: 0 },
    processingTime: '3-5 Werktage',
    popular: true,
    icon: '/icons/sepa.svg',
  },
  {
    id: 'klarna',
    name: 'Klarna - Kauf auf Rechnung',
    type: 'buy_now_pay_later',
    provider: 'klarna',
    fees: { percentage: 2.49, fixed: 30 },
    processingTime: 'Sofort',
    popular: true,
    icon: '/icons/klarna.svg',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    type: 'digital_wallet',
    provider: 'paypal',
    fees: { percentage: 2.49, fixed: 35 },
    processingTime: 'Sofort',
    popular: true,
    icon: '/icons/paypal.svg',
  },
  {
    id: 'card',
    name: 'Kreditkarte (Visa/Mastercard)',
    type: 'card',
    provider: 'stripe',
    fees: { percentage: 1.4, fixed: 25 },
    processingTime: 'Sofort',
    popular: false,
    icon: '/icons/cards.svg',
  },
  {
    id: 'sofort',
    name: 'Sofortüberweisung',
    type: 'bank_transfer',
    provider: 'sofort',
    fees: { percentage: 0.9, fixed: 25 },
    processingTime: 'Sofort',
    popular: true,
    icon: '/icons/sofort.svg',
  },
  {
    id: 'giropay',
    name: 'Giropay',
    type: 'bank_transfer',
    provider: 'giropay',
    fees: { percentage: 1.2, fixed: 10 },
    processingTime: 'Sofort',
    popular: false,
    icon: '/icons/giropay.svg',
  },
];

/**
 * Process payment based on selected method
 */
export const processPayment = async (request: PaymentRequest): Promise<PaymentResponse> => {
  try {
    switch (request.method.provider) {
      case 'stripe':
        return await processStripePayment(request);
      case 'paypal':
        return await processPayPalPayment(request);
      case 'klarna':
        return await processKlarnaPayment(request);
      case 'sofort':
        return await processSofortPayment(request);
      case 'giropay':
        return await processGiropayPayment(request);
      default:
        throw new Error(`Unsupported payment provider: ${request.method.provider}`);
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    return {
      success: false,
      paymentId: '',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Payment processing failed',
    };
  }
};

/**
 * Stripe Payment Processing (Cards, SEPA)
 */
async function processStripePayment(request: PaymentRequest): Promise<PaymentResponse> {
  const stripeKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY;

  if (!stripeKey) {
    throw new Error('Stripe configuration missing');
  }

  // In production, this would use Stripe SDK
  const response = await fetch('/api/payments/stripe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: request.amount,
      currency: request.currency,
      payment_method_types: [request.method.id === 'sepa' ? 'sepa_debit' : 'card'],
      customer_email: request.customerEmail,
      metadata: {
        booking_id: request.bookingId,
        customer_name: request.customerName,
        ...request.metadata,
      },
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    paymentId: data.payment_intent_id || '',
    status: data.status || 'failed',
    redirectUrl: data.redirect_url,
    error: data.error,
  };
}

/**
 * PayPal Payment Processing
 */
async function processPayPalPayment(request: PaymentRequest): Promise<PaymentResponse> {
  const response = await fetch('/api/payments/paypal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: (request.amount / 100).toFixed(2), // PayPal uses decimal amounts
      currency: request.currency,
      description: request.description,
      customer_email: request.customerEmail,
      booking_id: request.bookingId,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    paymentId: data.order_id || '',
    status: 'pending',
    redirectUrl: data.approval_url,
    error: data.error,
  };
}

/**
 * Klarna Payment Processing
 */
async function processKlarnaPayment(request: PaymentRequest): Promise<PaymentResponse> {
  const response = await fetch('/api/payments/klarna', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: request.amount,
      currency: request.currency,
      customer: {
        email: request.customerEmail,
        name: request.customerName,
      },
      order_lines: [
        {
          name: request.description,
          quantity: 1,
          unit_price: request.amount,
          total_amount: request.amount,
        },
      ],
      merchant_reference1: request.bookingId,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    paymentId: data.order_id || '',
    status: 'pending',
    redirectUrl: data.redirect_url,
    error: data.error,
  };
}

/**
 * Sofortüberweisung Payment Processing
 */
async function processSofortPayment(request: PaymentRequest): Promise<PaymentResponse> {
  // Sofort is typically integrated via Stripe or as standalone
  const response = await fetch('/api/payments/sofort', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: request.amount,
      currency: request.currency,
      customer_email: request.customerEmail,
      booking_id: request.bookingId,
      success_url: `${window.location.origin}/booking/success`,
      cancel_url: `${window.location.origin}/booking/cancel`,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    paymentId: data.transaction_id || '',
    status: 'pending',
    redirectUrl: data.payment_url,
    error: data.error,
  };
}

/**
 * Giropay Payment Processing
 */
async function processGiropayPayment(request: PaymentRequest): Promise<PaymentResponse> {
  const response = await fetch('/api/payments/giropay', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: request.amount,
      currency: request.currency,
      customer_email: request.customerEmail,
      booking_id: request.bookingId,
    }),
  });

  const data = await response.json();

  return {
    success: response.ok,
    paymentId: data.payment_id || '',
    status: 'pending',
    redirectUrl: data.redirect_url,
    error: data.error,
  };
}

/**
 * Calculate total cost including fees
 */
export const calculatePaymentCost = (
  amount: number,
  method: PaymentMethod,
): {
  subtotal: number;
  fee: number;
  total: number;
} => {
  const fee = Math.round(amount * (method.fees.percentage / 100) + method.fees.fixed);
  return {
    subtotal: amount,
    fee,
    total: amount + fee,
  };
};

/**
 * Get recommended payment method for amount
 */
export const getRecommendedPaymentMethod = (amount: number): PaymentMethod => {
  // For larger amounts (>200€), recommend SEPA (lowest fees)
  if (amount >= 20000) {
    return GERMAN_PAYMENT_METHODS.find((m) => m.id === 'sepa')!;
  }

  // For medium amounts, recommend Klarna (popular)
  if (amount >= 5000) {
    return GERMAN_PAYMENT_METHODS.find((m) => m.id === 'klarna')!;
  }

  // For smaller amounts, recommend PayPal
  return GERMAN_PAYMENT_METHODS.find((m) => m.id === 'paypal')!;
};

/**
 * Validate payment method availability
 */
export const validatePaymentMethod = (method: PaymentMethod): boolean => {
  const requiredEnvVars: Record<string, string[]> = {
    stripe: ['VITE_STRIPE_PUBLISHABLE_KEY'],
    paypal: ['VITE_PAYPAL_CLIENT_ID'],
    klarna: ['VITE_KLARNA_CLIENT_ID'],
    sofort: ['VITE_SOFORT_CONFIG_KEY'],
    giropay: ['VITE_GIROPAY_MERCHANT_ID'],
  };

  const required = requiredEnvVars[method.provider];
  if (!required) return false;

  return required.every((envVar) => {
    const value = import.meta.env[envVar];
    return value && value !== 'your_key_here';
  });
};
