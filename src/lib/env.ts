import { z } from 'zod';

// Environment variable schema
const envSchema = z.object({
  // Required for production
  VITE_SITE_URL: z.string().url().describe('Base URL for the website'),
  
  // Business information (for LocalBusiness schema)
  VITE_BUSINESS_NAME: z.string().describe('Business name'),
  VITE_BUSINESS_PHONE: z.string().describe('Business phone number'),
  VITE_BUSINESS_EMAIL: z.string().email().describe('Business email'),
  VITE_BUSINESS_STREET: z.string().describe('Street address'),
  VITE_BUSINESS_POSTAL: z.string().describe('Postal code'),
  VITE_BUSINESS_CITY: z.string().describe('City'),
  VITE_BUSINESS_COUNTRY: z.string().describe('Country code'),
  VITE_WHATSAPP: z.string().describe('WhatsApp number'),
  VITE_OPENING_HOURS: z.string().describe('Opening hours'),
  
  // Geographic coordinates
  VITE_GEO_LAT: z.string().describe('Latitude'),
  VITE_GEO_LNG: z.string().describe('Longitude'),
  
  // Optional but recommended
  VITE_GA4_MEASUREMENT_ID: z.string()
    .startsWith('G-')
    .optional()
    .describe('Google Analytics 4 Measurement ID'),
    
  VITE_GOOGLE_MAPS_API_KEY: z.string()
    .optional()
    .describe('Google Maps API key for location services'),
    
  // Social media
  VITE_INSTAGRAM_URL: z.string().url().optional().describe('Instagram URL'),
  VITE_FACEBOOK_URL: z.string().url().optional().describe('Facebook URL'),
  
  // Business details
  VITE_PRICE_RANGE: z.string().optional().describe('Price range'),
  VITE_CURRENCIES_ACCEPTED: z.string().optional().describe('Accepted currencies'),
  VITE_PAYMENT_METHODS: z.string().optional().describe('Payment methods'),
    
  // Build-time variables
  NODE_ENV: z.enum(['development', 'production', 'test'])
    .default('development'),
    
  // Contact form
  VITE_EMAIL_SERVICE_ID: z.string().optional().describe('Email service ID'),
  VITE_EMAIL_TEMPLATE_ID: z.string().optional().describe('Email template ID'),
  VITE_EMAIL_PUBLIC_KEY: z.string().optional().describe('Email public key'),
    
  // Development
  VITE_APP_ENV: z.string().optional().describe('App environment'),
  VITE_DEBUG: z.string()
    .transform(val => val === 'true')
    .optional()
    .describe('Enable debug logging')
});

// Parse and validate environment variables
function parseEnv() {
  // Handle both browser and Node.js environments
  const envSource = typeof import.meta !== 'undefined' && import.meta.env 
    ? import.meta.env 
    : process.env;
    
  try {
    const parsed = envSchema.parse(envSource);
    
    // Development warnings
    if (parsed.NODE_ENV === 'production') {
      if (!parsed.VITE_GA4_MEASUREMENT_ID) {
        console.warn('⚠️ GA4_MEASUREMENT_ID not set - analytics disabled');
      }
      if (!parsed.VITE_GOOGLE_MAPS_API_KEY) {
        console.warn('⚠️ GOOGLE_MAPS_API_KEY not set - maps will show fallback');
      }
    }
    
    return parsed;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment variable validation failed:');
      error.issues.forEach(issue => {
        console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
      });
      
      // In production, fail hard
      if (envSource?.NODE_ENV === 'production') {
        throw new Error('Invalid environment configuration');
      }
    }
    throw error;
  }
}

// Export validated environment
export const env = parseEnv();

// Type-safe environment interface
export type Env = z.infer<typeof envSchema>;

// Utility functions
export const isDevelopment = env.NODE_ENV === 'development';
export const isProduction = env.NODE_ENV === 'production';
export const isDebug = env.VITE_DEBUG || isDevelopment;

// Feature flags based on env
export const features = {
  analytics: !!env.VITE_GA4_MEASUREMENT_ID,
  maps: !!env.VITE_GOOGLE_MAPS_API_KEY,
  contact: !!env.VITE_BUSINESS_EMAIL,
  whatsapp: !!env.VITE_WHATSAPP,
  social: !!(env.VITE_INSTAGRAM_URL || env.VITE_FACEBOOK_URL),
  debug: isDebug
} as const;

// Validation helper for components
export function requireEnv<K extends keyof Env>(key: K): NonNullable<Env[K]> {
  const value = env[key];
  if (!value) {
    throw new Error(`Required environment variable ${key} is not set`);
  }
  return value as NonNullable<Env[K]>;
}

// Development helper to show env status
if (isDevelopment) {
  console.table({
    'Site URL': env.VITE_SITE_URL,
    'Business Name': env.VITE_BUSINESS_NAME,
    'Analytics': features.analytics ? '✅' : '❌',
    'Maps': features.maps ? '✅' : '❌',
    'WhatsApp': features.whatsapp ? '✅' : '❌',
    'Social Media': features.social ? '✅' : '❌',
    'Environment': env.NODE_ENV
  });
}