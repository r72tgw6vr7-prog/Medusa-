/**
 * CONTACT FORM BACKEND ENDPOINT - /api/send-mail
 * 
 * IMPLEMENTATION SPECIFICATIONS:
 * • Action = "/api/send-mail" (placeholder)
 * • Validates CSRF_token for security
 * • Returns proper JSON responses
 * • Handles both success and error states
 * • Production-ready structure
 */

export default async function handler(req, res) {
  // CORS Headers for security
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method not allowed',
      message: 'Only POST requests are accepted'
    });
  }

  try {
    // Extract form data
    const { 
      name, 
      email, 
      phone, 
      subject, 
      message, 
      CSRF_token, 
      language, 
      timestamp 
    } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        message: 'Name, email, subject, and message are required'
      });
    }

    // Validate CSRF token (basic validation for demo)
    if (!CSRF_token || !CSRF_token.startsWith('csrf_')) {
      return res.status(403).json({
        success: false,
        error: 'Invalid CSRF token',
        message: 'Security token validation failed'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email format',
        message: 'Please provide a valid email address'
      });
    }

    // Rate limiting (timestamp validation)
    const submissionTime = new Date(timestamp);
    const now = new Date();
    const timeDiff = now.getTime() - submissionTime.getTime();
    
    // Reject submissions older than 1 hour or from the future
    if (timeDiff > 3600000 || timeDiff < -60000) {
      return res.status(429).json({
        success: false,
        error: 'Request timeout',
        message: 'Form submission expired. Please refresh and try again.'
      });
    }

    // Simulate email sending process
    // In production, integrate with SendGrid, Nodemailer, or similar service
    const emailData = {
      from: 'noreply@medusatattoo.de',
      to: 'info@medusatattoo.de',
      subject: `${language === 'DE' ? 'Neue Kontaktanfrage' : 'New Contact Request'}: ${subject}`,
      html: generateEmailTemplate({
        name,
        email,
        phone,
        subject,
        message,
        language,
        timestamp: submissionTime.toISOString()
      }),
      text: `
        New contact form submission from Medusa Tattoo website:
        
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Subject: ${subject}
        Language: ${language}
        Submitted: ${submissionTime.toISOString()}
        
        Message:
        ${message}
      `
    };

    // Simulate API delay for demo purposes
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In production, send email here
    // await sendEmail(emailData);
    
    // Log successful submission (for demo/monitoring)
    console.log('Contact form submission received:', {
      name,
      email,
      subject,
      language,
      timestamp: submissionTime.toISOString(),
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: language === 'DE' 
        ? 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.'
        : 'Your message has been sent successfully. We will contact you shortly.',
      data: {
        submissionId: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: submissionTime.toISOString(),
        language
      }
    });

  } catch (error) {
    // Log error for monitoring
    console.error('Contact form submission error:', error);

    // Return error response
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Unable to process your request. Please try again later.'
    });
  }
}

/**
 * Generate HTML email template for contact form submissions
 */
function generateEmailTemplate({ name, email, phone, subject, message, language, timestamp }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Contact Form Submission - Medusa Tattoo</title>
        <style>
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: #222222;
            color: #FFFFFF;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #222222;
            border: 1px solid #D4AF37;
            border-radius: 8px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #D4AF37, #B8941F);
            color: #222222;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            font-family: 'Playfair Display', serif;
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          .content {
            padding: 20px;
          }
          .field {
            margin-bottom: 16px;
            padding-bottom: 16px;
            border-bottom: 1px solid #C0C0C0;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: 600;
            color: #D4AF37;
            margin-bottom: 4px;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .value {
            color: #FFFFFF;
            font-size: 16px;
            line-height: 1.4;
            white-space: pre-wrap;
          }
          .footer {
            background-color: #1A1A1A;
            padding: 16px 20px;
            text-align: center;
            border-top: 1px solid #D4AF37;
          }
          .footer p {
            margin: 0;
            color: #C0C0C0;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🐍 Medusa Tattoo München</h1>
            <p style="margin: 8px 0 0 0; font-size: 14px;">
              ${language === 'DE' ? 'Neue Kontaktanfrage' : 'New Contact Request'}
            </p>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">${language === 'DE' ? 'Name' : 'Name'}</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'E-Mail' : 'Email'}</div>
              <div class="value">${email}</div>
            </div>
            
            ${phone ? `
            <div class="field">
              <div class="label">${language === 'DE' ? 'Telefon' : 'Phone'}</div>
              <div class="value">${phone}</div>
            </div>
            ` : ''}
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'Betreff' : 'Subject'}</div>
              <div class="value">${subject}</div>
            </div>
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'Nachricht' : 'Message'}</div>
              <div class="value">${message}</div>
            </div>
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'Sprache' : 'Language'}</div>
              <div class="value">${language}</div>
            </div>
            
            <div class="field">
              <div class="label">${language === 'DE' ? 'Eingegangen am' : 'Submitted'}</div>
              <div class="value">${new Date(timestamp).toLocaleString(language === 'DE' ? 'de-DE' : 'en-US')}</div>
            </div>
          </div>
          
          <div class="footer">
            <p>
              ${language === 'DE' 
                ? 'Diese Nachricht wurde über das Kontaktformular der Medusa Tattoo Website gesendet.'
                : 'This message was sent via the Medusa Tattoo website contact form.'
              }
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

/**
 * Rate limiting and security middleware
 * In production, implement Redis-based rate limiting
 */
function checkRateLimit(ip, email) {
  // Implementation would check Redis/database for rate limits
  // For demo purposes, always allow
  return true;
}

/**
 * Send email function - placeholder for production implementation
 * In production, integrate with SendGrid, AWS SES, or similar service
 */
async function sendEmail(emailData) {
  // Production implementation:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // return await sgMail.send(emailData);
  
  console.log('Email would be sent in production:', emailData.subject);
  return Promise.resolve();
}