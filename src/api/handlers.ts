/**
 * Complete Backend API Implementation
 * Ready for deployment - just needs environment variables
 */

import { sendEmail } from '../services/emailService';
import { initializeZohoCRM, createContactFromBooking, createBookingFromForm } from '../services/zohoCRMService';
import { processPayment, GERMAN_PAYMENT_METHODS } from '../services/paymentService';

// CORS headers for all responses
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.VITE_ALLOWED_ORIGINS || '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400'
};

/**
 * Handle CORS preflight requests
 */
export function handleCORS(req: Request): Response | null {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders
    });
  }
  return null;
}

/**
 * Add CORS headers to response
 */
export function addCORSHeaders(response: Response): Response {
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

/**
 * Validate request body
 */
function validateRequestBody(body: any, requiredFields: string[]): string | null {
  for (const field of requiredFields) {
    if (!body[field]) {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

/**
 * Generate unique booking ID
 */
function generateBookingId(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MEDUSA-${year}${month}${day}-${random}`;
}

/**
 * BOOKING API ENDPOINT - POST /api/booking
 */
export async function handleBookingSubmission(req: Request): Promise<Response> {
  // Handle CORS
  const corsResponse = handleCORS(req);
  if (corsResponse) return corsResponse;

  if (req.method !== 'POST') {
    return addCORSHeaders(new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    ));
  }

  try {
    const body = await req.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'artistId', 'serviceId', 'selectedDate'];
    const validationError = validateRequestBody(body, requiredFields);
    
    if (validationError) {
      return addCORSHeaders(new Response(
        JSON.stringify({ 
          success: false, 
          error: 'VALIDATION_ERROR',
          message: validationError 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return addCORSHeaders(new Response(
        JSON.stringify({ 
          success: false, 
          error: 'VALIDATION_ERROR',
          message: 'Invalid email format' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    // Generate booking ID
    const bookingId = generateBookingId();
    
    // Initialize ZOHO CRM
    const zohoCRM = initializeZohoCRM();
    let contactId = '';
    
    if (zohoCRM) {
      try {
        // Create or update contact
        const contact = createContactFromBooking(body);
        const contactResponse = await zohoCRM.upsertContact(contact);
        
        if (contactResponse.success) {
          contactId = contactResponse.data?.data?.[0]?.details?.id || 
                     contactResponse.data?.data?.[0]?.id || '';
        }
        
        // Create booking in CRM
        if (contactId) {
          const booking = createBookingFromForm(body, contactId);
          await zohoCRM.createBooking({
            ...booking,
            id: bookingId
          });
        }
      } catch (crmError) {
        console.error('CRM error (non-blocking):', crmError);
        // Continue processing even if CRM fails
      }
    }

    // Send confirmation email to customer
    await sendEmail({
      to: body.email,
      from: process.env.VITE_FROM_EMAIL || 'info@medusa-tattoo-muenchen.de',
      subject: body.language === 'EN' ? 'Booking Confirmation' : 'Buchungsbestätigung',
      template: 'booking-confirmation',
      data: {
        customerName: `${body.firstName} ${body.lastName}`,
        bookingId,
        artistName: body.artistName || 'Team Medusa',
        serviceName: body.serviceName || body.serviceId,
        preferredDate: body.selectedDate,
        preferredTime: body.selectedTime || 'Nach Vereinbarung'
      },
      language: body.language || 'DE'
    });

    // Send notification email to studio
    await sendEmail({
      to: process.env.VITE_BOOKING_EMAIL || 'bookings@medusa-tattoo-muenchen.de',
      from: process.env.VITE_FROM_EMAIL || 'info@medusa-tattoo-muenchen.de',
      subject: `Neue Buchungsanfrage: ${body.firstName} ${body.lastName}`,
      template: 'booking-notification',
      data: {
        customerName: `${body.firstName} ${body.lastName}`,
        customerEmail: body.email,
        customerPhone: body.phone,
        bookingId,
        artistName: body.artistName || body.artistId,
        serviceName: body.serviceName || body.serviceId,
        preferredDate: body.selectedDate,
        preferredTime: body.selectedTime || 'Nach Vereinbarung',
        message: body.details || body.message || 'Keine zusätzlichen Angaben'
      },
      language: 'DE'
    });

    // Return success response
    return addCORSHeaders(new Response(
      JSON.stringify({
        success: true,
        bookingId,
        message: body.language === 'EN' 
          ? 'Booking request successfully sent. You will receive a confirmation email.'
          : 'Buchungsanfrage erfolgreich gesendet. Sie erhalten eine Bestätigungs-E-Mail.',
        estimatedResponse: '24 hours',
        contactId
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));

  } catch (error) {
    console.error('Booking submission error:', error);
    
    return addCORSHeaders(new Response(
      JSON.stringify({
        success: false,
        error: 'SERVER_ERROR',
        message: 'Internal server error. Please try again later.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ));
  }
}

/**
 * CONTACT API ENDPOINT - POST /api/contact
 */
export async function handleContactSubmission(req: Request): Promise<Response> {
  // Handle CORS
  const corsResponse = handleCORS(req);
  if (corsResponse) return corsResponse;

  if (req.method !== 'POST') {
    return addCORSHeaders(new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    ));
  }

  try {
    const body = await req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'subject', 'message'];
    const validationError = validateRequestBody(body, requiredFields);
    
    if (validationError) {
      return addCORSHeaders(new Response(
        JSON.stringify({ 
          success: false, 
          error: 'VALIDATION_ERROR',
          message: validationError 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    // Send notification email to studio
    await sendEmail({
      to: process.env.VITE_CONTACT_EMAIL || 'info@medusa-tattoo-muenchen.de',
      from: process.env.VITE_FROM_EMAIL || 'info@medusa-tattoo-muenchen.de',
      subject: `Kontaktanfrage: ${body.subject}`,
      template: 'contact-notification',
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || 'Nicht angegeben',
        subject: body.subject,
        message: body.message
      },
      language: body.language || 'DE'
    });

    // Return success response
    return addCORSHeaders(new Response(
      JSON.stringify({
        success: true,
        message: body.language === 'EN'
          ? 'Your message has been sent successfully. We will contact you shortly.'
          : 'Ihre Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei Ihnen melden.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    ));

  } catch (error) {
    console.error('Contact submission error:', error);
    
    return addCORSHeaders(new Response(
      JSON.stringify({
        success: false,
        error: 'SERVER_ERROR',
        message: 'Internal server error. Please try again later.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ));
  }
}

/**
 * PAYMENT API ENDPOINT - POST /api/payment
 */
export async function handlePaymentProcessing(req: Request): Promise<Response> {
  // Handle CORS
  const corsResponse = handleCORS(req);
  if (corsResponse) return corsResponse;

  if (req.method !== 'POST') {
    return addCORSHeaders(new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    ));
  }

  try {
    const body = await req.json();
    
    // Validate required fields
    const requiredFields = ['amount', 'paymentMethodId', 'customerEmail', 'bookingId'];
    const validationError = validateRequestBody(body, requiredFields);
    
    if (validationError) {
      return addCORSHeaders(new Response(
        JSON.stringify({ 
          success: false, 
          error: 'VALIDATION_ERROR',
          message: validationError 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    // Find payment method
    const paymentMethod = GERMAN_PAYMENT_METHODS.find(m => m.id === body.paymentMethodId);
    if (!paymentMethod) {
      return addCORSHeaders(new Response(
        JSON.stringify({ 
          success: false, 
          error: 'INVALID_PAYMENT_METHOD',
          message: 'Selected payment method is not supported' 
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      ));
    }

    // Process payment
    const paymentResult = await processPayment({
      amount: body.amount,
      currency: 'EUR',
      description: `Medusa Tattoo Booking - ${body.bookingId}`,
      customerEmail: body.customerEmail,
      customerName: body.customerName || 'Customer',
      bookingId: body.bookingId,
      method: paymentMethod,
      metadata: body.metadata
    });

    if (paymentResult.success) {
      // Send payment confirmation email
      await sendEmail({
        to: body.customerEmail,
        from: process.env.VITE_FROM_EMAIL || 'info@medusa-tattoo-muenchen.de',
        subject: 'Zahlungsbestätigung - Medusa Tattoo München',
        template: 'payment-confirmation',
        data: {
          customerName: body.customerName || 'Customer',
          paymentId: paymentResult.paymentId,
          amount: (body.amount / 100).toFixed(2),
          bookingId: body.bookingId,
          paymentMethod: paymentMethod.name
        },
        language: body.language || 'DE'
      });

      // Update booking status in CRM
      const zohoCRM = initializeZohoCRM();
      if (zohoCRM && body.crmBookingId) {
        try {
          await zohoCRM.updateBookingStatus(
            body.crmBookingId,
            'Confirmed',
            `Payment received: ${paymentResult.paymentId}`
          );
        } catch (crmError) {
          console.error('CRM update error (non-blocking):', crmError);
        }
      }
    }

    return addCORSHeaders(new Response(
      JSON.stringify(paymentResult),
      { status: paymentResult.success ? 200 : 400, headers: { 'Content-Type': 'application/json' } }
    ));

  } catch (error) {
    console.error('Payment processing error:', error);
    
    return addCORSHeaders(new Response(
      JSON.stringify({
        success: false,
        error: 'SERVER_ERROR',
        message: 'Payment processing failed. Please try again later.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    ));
  }
}

/**
 * PAYMENT METHODS API ENDPOINT - GET /api/payment-methods
 */
export async function handlePaymentMethods(req: Request): Promise<Response> {
  // Handle CORS
  const corsResponse = handleCORS(req);
  if (corsResponse) return corsResponse;

  if (req.method !== 'GET') {
    return addCORSHeaders(new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    ));
  }

  // Filter available payment methods based on configuration
  const availableMethods = GERMAN_PAYMENT_METHODS.filter(method => {
    // Check if required environment variables are set
    const envVars: Record<string, string[]> = {
      stripe: ['VITE_STRIPE_PUBLISHABLE_KEY'],
      paypal: ['VITE_PAYPAL_CLIENT_ID'],
      klarna: ['VITE_KLARNA_CLIENT_ID'],
      sofort: ['VITE_SOFORT_CONFIG_KEY'],
      giropay: ['VITE_GIROPAY_MERCHANT_ID']
    };

    const required = envVars[method.provider];
    if (!required) return false;

    return required.every(envVar => {
      const value = process.env[envVar];
      return value && value !== 'your_key_here';
    });
  });

  return addCORSHeaders(new Response(
    JSON.stringify({
      success: true,
      data: availableMethods
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  ));
}

/**
 * HEALTH CHECK ENDPOINT - GET /api/health
 */
export async function handleHealthCheck(req: Request): Promise<Response> {
  const corsResponse = handleCORS(req);
  if (corsResponse) return corsResponse;

  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      email: !!process.env.VITE_SENDGRID_API_KEY || !!process.env.VITE_MAILGUN_API_KEY,
      payments: !!process.env.VITE_STRIPE_PUBLISHABLE_KEY || !!process.env.VITE_PAYPAL_CLIENT_ID,
      crm: !!process.env.VITE_ZOHO_CLIENT_ID
    }
  };

  return addCORSHeaders(new Response(
    JSON.stringify(health),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  ));
}