export default async function handler(_req, res) {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        email: Boolean(process.env.VITE_SENDGRID_API_KEY || process.env.SENDGRID_API_KEY || process.env.VITE_MAILGUN_API_KEY || process.env.VITE_AWS_SES_ACCESS_KEY || process.env.VITE_SMTP_HOST),
        payments: Boolean(process.env.VITE_STRIPE_PUBLISHABLE_KEY || process.env.VITE_PAYPAL_CLIENT_ID),
        crm: Boolean(process.env.VITE_ZOHO_CLIENT_ID),
      },
      env: {
        site: process.env.VITE_SITE_URL || null,
      },
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).end(JSON.stringify(health));
  } catch (err) {
    console.error('Health error:', err);
    res.status(500).json({ status: 'unhealthy' });
  }
}
