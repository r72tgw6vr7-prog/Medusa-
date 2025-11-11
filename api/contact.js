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
    const { name, email, phone, subject, message, language = 'DE' } = req.body || {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: 'Missing required fields' });
      return;
    }
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: 'Invalid email format' });
      return;
    }

    const sendgridKey = process.env.SENDGRID_API_KEY || process.env.VITE_SENDGRID_API_KEY;
    const fromEmail = process.env.VITE_FROM_EMAIL || 'info@your-domain.com';
    const contactEmail = process.env.VITE_CONTACT_EMAIL || 'info@your-domain.com';

    if (sendgridKey) {
      const payload = {
        personalizations: [
          {
            to: [{ email: contactEmail }],
            subject: `${language === 'EN' ? 'New Contact Request' : 'Neue Kontaktanfrage'}: ${subject}`,
          },
        ],
        from: { email: fromEmail },
        content: [
          { type: 'text/plain', value: `From: ${name} <${email}>\nPhone: ${phone || '—'}\n\n${message}` },
          { type: 'text/html', value: `<p><strong>From:</strong> ${name} &lt;${email}&gt;</p><p><strong>Phone:</strong> ${phone || '—'}</p><p>${message.replace(/\n/g, '<br/>')}</p>` },
        ],
      };

      const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sendgridKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const txt = await resp.text().catch(() => '');
        console.error('SendGrid error:', resp.status, txt);
      }
    }

    res.status(200).json({
      success: true,
      message:
        language === 'EN'
          ? 'Your message has been sent successfully. We will contact you shortly.'
          : 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.',
    });
  } catch (err) {
    console.error('Contact API error:', err);
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'Internal server error' });
  }
}
