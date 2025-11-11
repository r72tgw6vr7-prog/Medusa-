export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', process.env.VITE_ALLOWED_ORIGINS || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const {
      amount,
      paymentMethodId,
      customerEmail,
      customerName = 'Customer',
      bookingId,
      metadata = {}
    } = req.body || {};

    if (!amount || !paymentMethodId || !customerEmail || !bookingId) {
      res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: 'Missing required fields' });
      return;
    }

    const stripeKey = process.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_PUBLISHABLE_KEY;
    const paypalKey = process.env.VITE_PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID;

    if (!stripeKey && !paypalKey) {
      res.status(501).json({ success: false, error: 'PAYMENT_NOT_CONFIGURED', message: 'Configure Stripe or PayPal to enable payments' });
      return;
    }

    // Stub response (integration pending)
    res.status(200).json({
      success: true,
      paymentId: `pay_${Date.now()}`,
      provider: stripeKey ? 'stripe' : 'paypal',
      amount,
      customerEmail,
      customerName,
      bookingId,
      metadata,
      message: 'Payment processing stubbed for development. Configure provider for production.'
    });
  } catch (err) {
    console.error('Payment API error:', err);
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'Internal server error' });
  }
}
