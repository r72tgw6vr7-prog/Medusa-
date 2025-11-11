export default async function handler(req, res) {
  // CORS headers
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
      name,
      email,
      phone,
      date,
      time,
      guests = 1,
      specialRequests = ''
    } = req.body || {};

    // Validate required fields
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !phone || !date || !time) {
      res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: 'Missing required fields' });
      return;
    }
    if (!emailRegex.test(email)) {
      res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: 'Invalid email format' });
      return;
    }

    // Basic date/time sanity check
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selectedDate.getTime()) || selectedDate < today) {
      res.status(400).json({ success: false, error: 'VALIDATION_ERROR', message: 'Please select a future date' });
      return;
    }

    // Generate booking ID
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const bookingId = `MEDUSA-${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Optional: notify studio and customer via SendGrid if configured
    const sendgridKey = process.env.VITE_SENDGRID_API_KEY;
    const fromEmail = process.env.VITE_FROM_EMAIL || 'info@your-domain.com';
    const studioEmail = process.env.VITE_BOOKING_EMAIL || 'bookings@your-domain.com';

    if (sendgridKey) {
      const sendEmail = async (payload) => {
        const resp = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sendgridKey}`,
          },
          body: JSON.stringify(payload),
        });
        if (!resp.ok) {
          const txt = await resp.text().catch(() => '');
          console.error('SendGrid error:', resp.status, txt);
        }
      };

      // Studio notification
      await sendEmail({
        personalizations: [{ to: [{ email: studioEmail }], subject: `Neue Buchungsanfrage - ${name}` }],
        from: { email: fromEmail },
        content: [
          { type: 'text/plain', value: `Booking ID: ${bookingId}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nRequests: ${specialRequests}` },
          { type: 'text/html', value: `<p><strong>Booking ID:</strong> ${bookingId}</p><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Date:</strong> ${date}</p><p><strong>Time:</strong> ${time}</p><p><strong>Guests:</strong> ${guests}</p><p><strong>Requests:</strong> ${specialRequests || '—'}</p>` },
        ],
      });

      // Customer confirmation
      await sendEmail({
        personalizations: [{ to: [{ email }], subject: 'Buchungsbestätigung' }],
        from: { email: fromEmail },
        content: [
          { type: 'text/plain', value: `Ihre Buchungsanfrage ist eingegangen.\nBuchungs-ID: ${bookingId}\nTermin: ${date} ${time}` },
          { type: 'text/html', value: `<p>Ihre Buchungsanfrage ist eingegangen.</p><p><strong>Buchungs-ID:</strong> ${bookingId}</p><p><strong>Termin:</strong> ${date} ${time}</p>` },
        ],
      });
    }

    res.status(200).json({
      success: true,
      bookingId,
      message: 'Buchungsanfrage erfolgreich gesendet',
      estimatedResponse: '24 hours',
    });
  } catch (err) {
    console.error('Booking API error:', err);
    res.status(500).json({ success: false, error: 'SERVER_ERROR', message: 'Internal server error' });
  }
}
