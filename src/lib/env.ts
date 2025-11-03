import { z } from 'zod';

// Environment variable schema
const envSchema = z.object({
  // Required for production
  VITE_SITE_URL: z.string().url().describe('Base URL for the website'),
  
  // Optional but recommended
  VITE_GA4_MEASUREMENT_ID: z.string()
    .startsWith('G-')
    .optional()
    .describe('Google Analytics 4 Measurement ID'),
    
  VITE_GOOGLE_MAPS_API_KEY: z.string()
    .optional()
    .describe('Google Maps API key for location services'),
    
  // Build-time variables
  NODE_ENV: z.enum(['development', 'production', 'test'])
    .default('development'),
    
  // Optional configuration
  VITE_CONTACT_EMAIL: z.string().email()
    .optional()
    .describe('Contact email for the studio'),
    
  VITE_PHONE_NUMBER: z.string()
    .optional()
    .describe('Studio phone number'),
    
  VITE_ADDRESS: z.string()
    .optional()
    .describe('Studio physical address'),
    
  VITE_BUSINESS_HOURS: z.string()
    .optional()
    .describe('Business hours in JSON format'),
    
  // Development
  VITE_DEBUG: z.string()
    .transform(val => val === 'true')
    .optional()
    .describe('Enable debug logging')
});

// Parse and validate environment variables
function parseEnv() {
  try {
    const parsed = envSchema.parse(import.meta.env);
    
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
      if (import.meta.env.NODE_ENV === 'production') {
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
  contact: !!env.VITE_CONTACT_EMAIL,
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
    'Analytics': features.analytics ? '✅' : '❌',
    'Maps': features.maps ? '✅' : '❌',
    'Contact Email': features.contact ? '✅' : '❌',
    'Environment': env.NODE_ENV
  });
}