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
    const { email, consent = false } = req.body || {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: 'Invalid email' });
      return;
    }
    if (!consent) {
      res.status(400).json({ success: false, error: 'CONSENT_REQUIRED', message: 'Marketing consent required' });
      return;
    }

    // Integrate with provider here (Mailchimp/Campaign Monitor/etc.). For now, log.
    console.log('Newsletter subscription:', { email, consent });

    res.status(200).json({ success: true, message: 'Subscribed' });
  } catch (err) {
    console.error('Newsletter API error:', err);
    res.status(500).json({ success: false, error: 'SERVER_ERROR' });
  }
}
