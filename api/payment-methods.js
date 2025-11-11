export default async function handler(_req, res) {
  try {
    const methods = [
      { id: 'stripe', provider: 'stripe', name: 'Credit/Debit Card (Stripe)' },
      { id: 'sepa', provider: 'stripe', name: 'SEPA Direct Debit (Stripe)' },
      { id: 'paypal', provider: 'paypal', name: 'PayPal' },
      { id: 'klarna', provider: 'klarna', name: 'Klarna' },
      { id: 'sofort', provider: 'sofort', name: 'Sofort' },
      { id: 'giropay', provider: 'giropay', name: 'Giropay' }
    ];

    const requiredEnv = {
      stripe: ['VITE_STRIPE_PUBLISHABLE_KEY'],
      paypal: ['VITE_PAYPAL_CLIENT_ID'],
      klarna: ['VITE_KLARNA_CLIENT_ID'],
      sofort: ['VITE_SOFORT_CONFIG_KEY'],
      giropay: ['VITE_GIROPAY_MERCHANT_ID']
    };

    const available = methods.filter((m) => {
      const reqs = requiredEnv[m.provider] || [];
      return reqs.every((k) => process.env[k] && process.env[k] !== 'your_key_here');
    });

    res.status(200).json({ success: true, data: available });
  } catch (err) {
    console.error('Payment methods error:', err);
    res.status(500).json({ success: false, error: 'SERVER_ERROR' });
  }
}
