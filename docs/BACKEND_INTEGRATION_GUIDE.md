# Medusa Tattoo München - Backend Integration Guide

Quick-start guide for implementing the backend API endpoints needed for the booking and contact forms.

---

## 🎯 OVERVIEW

The frontend is **100% complete**. You need to implement **3 API endpoints** to make booking and contact forms functional.

**Estimated Time**: 6-8 hours
**Technology**: Your choice (Node.js/Express recommended)
**Email Service**: SendGrid (recommended) or Mailgun

---

## 📋 REQUIRED ENDPOINTS

### 1. Booking Form Submission
**Endpoint**: `POST /api/booking`
**Purpose**: Handle tattoo appointment booking requests

### 2. Contact Form Submission
**Endpoint**: `POST /api/contact`
**Purpose**: Handle general inquiries

### 3. Email Sender (Utility)
**Function**: `sendEmail(to, template, data)`
**Purpose**: Send confirmation/notification emails

---

## 📨 ENDPOINT 1: Booking Submission

### Request Format
```json
POST /api/booking
Content-Type: application/json

{
  "artistId": "aaron",
  "serviceId": "custom-tattoo",
  "serviceType": "tattoo",
  "tattooSize": "medium",
  "selectedDate": "2025-02-15",
  "selectedTime": "14:00",
  "firstName": "Max",
  "lastName": "Mustermann",
  "email": "max@example.com",
  "phone": "+49 89 1234567",
  "details": "I want a traditional rose on my forearm",
  "healthConsent": true,
  "privacyConsent": true,
  "gdprConsent": {
    "necessary": true,
    "analytics": false,
    "marketing": false,
    "dataProcessing": true,
    "thirdPartySharing": false
  },
  "language": "DE"
}
```

### Response Format (Success)
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "bookingId": "MEDUSA-2025-001234",
  "message": "Buchungsanfrage erfolgreich gesendet. Sie erhalten eine Bestätigungs-E-Mail.",
  "estimatedResponse": "24 hours"
}
```

### Response Format (Error)
```json
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "E-Mail-Adresse ist ungültig",
  "fields": {
    "email": "Invalid email format"
  }
}
```

### Implementation Example (Node.js + Express)

```javascript
// /api/booking.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendEmail } = require('./send-mail');

const router = express.Router();

// Validation rules
const bookingValidation = [
  body('firstName').trim().notEmpty().withMessage('Vorname ist erforderlich'),
  body('lastName').trim().notEmpty().withMessage('Nachname ist erforderlich'),
  body('email').isEmail().withMessage('Ungültige E-Mail-Adresse'),
  body('phone').trim().notEmpty().withMessage('Telefonnummer ist erforderlich'),
  body('selectedDate').isISO8601().withMessage('Ungültiges Datum'),
  body('selectedTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Ungültige Uhrzeit'),
  body('healthConsent').equals('true').withMessage('Gesundheitserklärung muss akzeptiert werden'),
  body('privacyConsent').equals('true').withMessage('Datenschutzerklärung muss akzeptiert werden'),
];

router.post('/booking', bookingValidation, async (req, res) => {
  try {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Formular enthält Fehler',
        fields: errors.mapped(),
      });
    }

    const bookingData = req.body;
    
    // Generate booking ID
    const bookingId = generateBookingId();
    
    // Send confirmation email to client
    await sendEmail({
      to: bookingData.email,
      template: 'booking-confirmation',
      subject: bookingData.language === 'DE' 
        ? 'Buchungsbestätigung - Medusa Tattoo München'
        : 'Booking Confirmation - Medusa Tattoo München',
      data: {
        ...bookingData,
        bookingId,
      },
    });
    
    // Send notification email to studio
    await sendEmail({
      to: process.env.BOOKING_EMAIL || 'bookings@medusa-tattoo-muenchen.de',
      template: 'booking-notification',
      subject: `Neue Buchungsanfrage: ${bookingData.firstName} ${bookingData.lastName}`,
      data: {
        ...bookingData,
        bookingId,
      },
    });
    
    // Optional: Save to database
    // await saveBookingToDatabase(bookingData, bookingId);
    
    // Return success response
    res.status(200).json({
      success: true,
      bookingId,
      message: bookingData.language === 'DE'
        ? 'Buchungsanfrage erfolgreich gesendet. Sie erhalten eine Bestätigungs-E-Mail.'
        : 'Booking request successfully sent. You will receive a confirmation email.',
      estimatedResponse: '24 hours',
    });
    
  } catch (error) {
    console.error('Booking error:', error);
    
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    });
  }
});

function generateBookingId() {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `MEDUSA-${year}-${random}`;
}

module.exports = router;
```

---

## 📧 ENDPOINT 2: Contact Form Submission

### Request Format
```json
POST /api/contact
Content-Type: application/json

{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "subject": "Frage zu Preisen",
  "message": "Hallo, ich hätte gerne Informationen über...",
  "language": "DE"
}
```

### Response Format (Success)
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "message": "Nachricht erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden."
}
```

### Implementation Example

```javascript
// /api/contact.js

const express = require('express');
const { body, validationResult } = require('express-validator');
const { sendEmail } = require('./send-mail');

const router = express.Router();

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name ist erforderlich'),
  body('email').isEmail().withMessage('Ungültige E-Mail-Adresse'),
  body('subject').trim().notEmpty().withMessage('Betreff ist erforderlich'),
  body('message').trim().notEmpty().withMessage('Nachricht ist erforderlich'),
];

router.post('/contact', contactValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: 'VALIDATION_ERROR',
        message: 'Formular enthält Fehler',
        fields: errors.mapped(),
      });
    }

    const { name, email, subject, message, language } = req.body;
    
    // Send auto-reply to sender
    await sendEmail({
      to: email,
      template: 'contact-auto-reply',
      subject: language === 'DE'
        ? 'Danke für Ihre Nachricht - Medusa Tattoo München'
        : 'Thank you for your message - Medusa Tattoo München',
      data: { name, subject, message },
    });
    
    // Send notification to studio
    await sendEmail({
      to: process.env.CONTACT_EMAIL || 'info@medusa-tattoo-muenchen.de',
      template: 'contact-notification',
      subject: `Neue Kontaktanfrage: ${subject}`,
      data: { name, email, subject, message },
    });
    
    res.status(200).json({
      success: true,
      message: language === 'DE'
        ? 'Nachricht erfolgreich gesendet. Wir melden uns innerhalb von 24 Stunden.'
        : 'Message successfully sent. We will respond within 24 hours.',
    });
    
  } catch (error) {
    console.error('Contact error:', error);
    
    res.status(500).json({
      success: false,
      error: 'SERVER_ERROR',
      message: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
    });
  }
});

module.exports = router;
```

---

## 📬 EMAIL SERVICE: SendGrid Implementation

### Installation

```bash
npm install @sendgrid/mail dotenv
```

### Implementation

```javascript
// /api/send-mail.js

const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Email templates
const templates = {
  'booking-confirmation': {
    de: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4AF37;">Buchungsbestätigung</h1>
        <p>Liebe/r {{firstName}} {{lastName}},</p>
        <p>Vielen Dank für Ihre Buchungsanfrage bei Medusa Tattoo München.</p>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-left: 4px solid #D4AF37;">
          <h2 style="margin-top: 0;">Buchungsdetails</h2>
          <p><strong>Buchungs-ID:</strong> {{bookingId}}</p>
          <p><strong>Künstler:</strong> {{artistId}}</p>
          <p><strong>Service:</strong> {{serviceId}}</p>
          <p><strong>Datum:</strong> {{selectedDate}}</p>
          <p><strong>Uhrzeit:</strong> {{selectedTime}}</p>
        </div>
        
        <p>Wir werden Ihre Anfrage prüfen und uns innerhalb von 24 Stunden bei Ihnen melden, um den Termin zu bestätigen.</p>
        
        <p>Bei Fragen erreichen Sie uns unter:<br>
        📧 info@medusa-tattoo-muenchen.de<br>
        📱 +49 89 1234567</p>
        
        <p>Mit freundlichen Grüßen<br>
        Ihr Medusa Tattoo Team</p>
      </div>
    `,
    en: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4AF37;">Booking Confirmation</h1>
        <p>Dear {{firstName}} {{lastName}},</p>
        <p>Thank you for your booking request at Medusa Tattoo München.</p>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-left: 4px solid #D4AF37;">
          <h2 style="margin-top: 0;">Booking Details</h2>
          <p><strong>Booking ID:</strong> {{bookingId}}</p>
          <p><strong>Artist:</strong> {{artistId}}</p>
          <p><strong>Service:</strong> {{serviceId}}</p>
          <p><strong>Date:</strong> {{selectedDate}}</p>
          <p><strong>Time:</strong> {{selectedTime}}</p>
        </div>
        
        <p>We will review your request and contact you within 24 hours to confirm your appointment.</p>
        
        <p>If you have any questions, please contact us:<br>
        📧 info@medusa-tattoo-muenchen.de<br>
        📱 +49 89 1234567</p>
        
        <p>Best regards<br>
        Your Medusa Tattoo Team</p>
      </div>
    `,
  },
  
  'booking-notification': `
    <div style="font-family: Arial, sans-serif;">
      <h1>Neue Buchungsanfrage</h1>
      <p><strong>Buchungs-ID:</strong> {{bookingId}}</p>
      <p><strong>Name:</strong> {{firstName}} {{lastName}}</p>
      <p><strong>E-Mail:</strong> {{email}}</p>
      <p><strong>Telefon:</strong> {{phone}}</p>
      <p><strong>Künstler:</strong> {{artistId}}</p>
      <p><strong>Service:</strong> {{serviceId}}</p>
      <p><strong>Datum:</strong> {{selectedDate}} um {{selectedTime}}</p>
      <p><strong>Details:</strong> {{details}}</p>
    </div>
  `,
  
  'contact-auto-reply': {
    de: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4AF37;">Danke für Ihre Nachricht</h1>
        <p>Liebe/r {{name}},</p>
        <p>Vielen Dank für Ihre Nachricht. Wir haben Ihre Anfrage erhalten und werden uns innerhalb von 24 Stunden bei Ihnen melden.</p>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-left: 4px solid #D4AF37;">
          <p><strong>Ihre Nachricht:</strong></p>
          <p>{{message}}</p>
        </div>
        
        <p>Mit freundlichen Grüßen<br>
        Ihr Medusa Tattoo Team</p>
      </div>
    `,
    en: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #D4AF37;">Thank You For Your Message</h1>
        <p>Dear {{name}},</p>
        <p>Thank you for your message. We have received your inquiry and will respond within 24 hours.</p>
        
        <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-left: 4px solid #D4AF37;">
          <p><strong>Your Message:</strong></p>
          <p>{{message}}</p>
        </div>
        
        <p>Best regards<br>
        Your Medusa Tattoo Team</p>
      </div>
    `,
  },
  
  'contact-notification': `
    <div style="font-family: Arial, sans-serif;">
      <h1>Neue Kontaktanfrage</h1>
      <p><strong>Name:</strong> {{name}}</p>
      <p><strong>E-Mail:</strong> {{email}}</p>
      <p><strong>Betreff:</strong> {{subject}}</p>
      <p><strong>Nachricht:</strong></p>
      <p>{{message}}</p>
    </div>
  `,
};

async function sendEmail({ to, template, subject, data }) {
  try {
    // Get template
    let htmlContent = templates[template];
    
    // Handle multilingual templates
    if (typeof htmlContent === 'object') {
      const lang = data.language?.toLowerCase() || 'de';
      htmlContent = htmlContent[lang] || htmlContent.de;
    }
    
    // Replace placeholders with actual data
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      htmlContent = htmlContent.replace(regex, data[key] || '');
    });
    
    // Send email
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'no-reply@medusa-tattoo-muenchen.de',
      subject,
      html: htmlContent,
    });
    
    console.log(`✓ Email sent to ${to}: ${subject}`);
    return { success: true };
    
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
}

module.exports = { sendEmail };
```

---

## 🔒 SECURITY CONSIDERATIONS

### 1. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 requests per window
  message: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.',
});

router.post('/booking', bookingLimiter, bookingValidation, async (req, res) => {
  // ...
});
```

### 2. Input Sanitization
```javascript
const { sanitizeBody } = require('express-validator');

router.post('/contact', [
  sanitizeBody('name').trim().escape(),
  sanitizeBody('message').trim().escape(),
  // ... other validations
], async (req, res) => {
  // ...
});
```

### 3. CORS Configuration
```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [
    'https://medusa-tattoo-muenchen.de',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST'],
  credentials: true,
}));
```

### 4. Environment Variables
```bash
# .env (NEVER commit this file)
SENDGRID_API_KEY=SG_EXAMPLE_KEY
SENDGRID_FROM_EMAIL=no-reply@medusa-tattoo-muenchen.de
CONTACT_EMAIL=info@medusa-tattoo-muenchen.de
BOOKING_EMAIL=bookings@medusa-tattoo-muenchen.de
ALLOWED_ORIGINS=https://medusa-tattoo-muenchen.de,http://localhost:5173
```

---

## 🧪 TESTING

### Manual Testing with cURL

```bash
# Test booking endpoint
curl -X POST http://localhost:3000/api/booking \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Max",
    "lastName": "Test",
    "email": "test@example.com",
    "phone": "+49 89 1234567",
    "selectedDate": "2025-02-15",
    "selectedTime": "14:00",
    "healthConsent": true,
    "privacyConsent": true,
    "language": "DE"
  }'

# Test contact endpoint
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Max Test",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "Test message",
    "language": "DE"
  }'
```

### Automated Testing (Optional)

```javascript
// test/booking.test.js
const request = require('supertest');
const app = require('../app');

describe('POST /api/booking', () => {
  test('should create booking with valid data', async () => {
    const response = await request(app)
      .post('/api/booking')
      .send({
        firstName: 'Max',
        lastName: 'Test',
        email: 'test@example.com',
        phone: '+49 89 1234567',
        selectedDate: '2025-02-15',
        selectedTime: '14:00',
        healthConsent: true,
        privacyConsent: true,
        language: 'DE',
      });
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.bookingId).toBeDefined();
  });
  
  test('should reject booking with missing email', async () => {
    const response = await request(app)
      .post('/api/booking')
      .send({
        firstName: 'Max',
        lastName: 'Test',
        // email missing
      });
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});
```

---

## 📦 DEPLOYMENT

### Vercel (Recommended)

```javascript
// /api/booking.js (Vercel Serverless)
const { bookingHandler } = require('../handlers/booking');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    return bookingHandler(req, res);
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
};
```

### Environment Variables (Vercel Dashboard)
```
SENDGRID_API_KEY=SG_EXAMPLE_KEY
CONTACT_EMAIL=info@medusa-tattoo-muenchen.de
BOOKING_EMAIL=bookings@medusa-tattoo-muenchen.de
```

---

## ✅ INTEGRATION CHECKLIST

- [ ] SendGrid account created
- [ ] API key obtained and added to `.env`
- [ ] Booking endpoint implemented and tested
- [ ] Contact endpoint implemented and tested
- [ ] Email service tested (send to real email)
- [ ] Email templates reviewed (DE + EN)
- [ ] Rate limiting configured
- [ ] Input validation working
- [ ] Error handling tested
- [ ] CORS configured correctly
- [ ] Deployed to staging
- [ ] Frontend connected and tested
- [ ] Production deployment
- [ ] Monitor email delivery logs

---

## 📞 SUPPORT

**Questions?** Check:
- SendGrid Docs: https://docs.sendgrid.com
- Express Validator: https://express-validator.github.io
- Node.js Best Practices: https://github.com/goldbergyoni/nodebestpractices

**Need Help?**
Contact the frontend team with `/DEVELOPER_HANDOFF_FINAL_CHECKLIST.md` reference.

---

**Last Updated**: January 2025
**Status**: Ready for Implementation
**Estimated Time**: 6-8 hours
