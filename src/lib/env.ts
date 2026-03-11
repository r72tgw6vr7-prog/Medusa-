import { z } from 'zod';

// Environment variable schema
const envSchema = z.object({
  // Site URL (with sensible default)
  VITE_SITE_URL: z.string().url().default('https://www.muenchen-tattoo-studio.de').describe('Base URL for the website'),

  // Business information (with defaults so app doesn't crash)
  VITE_BUSINESS_NAME: z.string().default('Medusa Tattoo München').describe('Business name'),
  VITE_BUSINESS_PHONE: z.string().default('089 910994').describe('Business phone number'),
  VITE_BUSINESS_EMAIL: z.string().email().default('info@medusa-tattoo.de').describe('Business email'),
  VITE_BUSINESS_STREET: z.string().default('Altheimer Eck 11').describe('Street address'),
  VITE_BUSINESS_POSTAL: z.string().default('80331').describe('Postal code'),
  VITE_BUSINESS_CITY: z.string().default('München').describe('City'),
  VITE_BUSINESS_COUNTRY: z.string().default('DE').describe('Country code'),
  VITE_WHATSAPP: z.string().default('+4917612345678').describe('WhatsApp number'),
  VITE_OPENING_HOURS: z.string().default('Mo-Do 11:30-19:00, Fr-Sa 11:30-20:00').describe('Opening hours'),

  // Geographic coordinates (optional — map shows fallback without them)
  VITE_GEO_LAT: z.string().optional().describe('Latitude'),
  VITE_GEO_LNG: z.string().optional().describe('Longitude'),

  // Optional but recommended
  VITE_GA4_MEASUREMENT_ID: z
    .string()
    .startsWith('G-')
    .optional()
    .describe('Google Analytics 4 Measurement ID'),

  VITE_GOOGLE_MAPS_API_KEY: z
    .string()
    .optional()
    .describe('Google Maps API key for location services'),

  // Social media
  VITE_INSTAGRAM_URL: z.string().url().optional().describe('Instagram URL'),
  VITE_FACEBOOK_URL: z.string().url().optional().describe('Facebook URL'),

  // Business details
  VITE_PRICE_RANGE: z.string().optional().describe('Price range'),
  VITE_CURRENCIES_ACCEPTED: z.string().optional().describe('Accepted currencies'),
  VITE_PAYMENT_METHODS: z.string().optional().describe('Payment methods'),

  // Payment (not active)
  VITE_STRIPE_PUBLISHABLE_KEY: z.string().optional().describe('Stripe publishable key'),

  // Error monitoring (optional)
  VITE_SENTRY_DSN: z.string().optional().describe('Sentry DSN for error monitoring'),

  // Build-time variables
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // Contact form
  VITE_EMAIL_SERVICE_ID: z.string().optional().describe('Email service ID'),
  VITE_EMAIL_TEMPLATE_ID: z.string().optional().describe('Email template ID'),
  VITE_EMAIL_PUBLIC_KEY: z.string().optional().describe('Email public key'),

  // Non-sensitive selectors
  VITE_EMAIL_PROVIDER: z
    .enum(['sendgrid', 'mailgun', 'amazonses', 'smtp'])
    .optional()
    .describe('Selected email provider (non-sensitive selector)'),
  VITE_ZOHO_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .optional()
    .describe('Enable Zoho integration (requires backend proxy)'),

  // Development
  VITE_APP_ENV: z.string().optional().describe('App environment'),
  VITE_DEBUG: z
    .string()
    .transform((val) => val === 'true')
    .optional()
    .describe('Enable debug logging'),
});

// Parse and validate environment variables
function parseEnv() {
  // Handle both browser and Node.js environments
  const baseEnvSource =
    typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env : process.env;

  const mockedEnvRaw =
    typeof window !== 'undefined' ? ((window as unknown as { __MOCKED_ENV__?: Record<string, string> }).__MOCKED_ENV__ ?? undefined) : undefined;

  const mockedEnv = mockedEnvRaw
    ? Object.fromEntries(
        Object.entries(mockedEnvRaw).filter(
          ([key, value]) => !(key === 'VITE_GA4_MEASUREMENT_ID' && value === ''),
        ),
      )
    : undefined;

  if (typeof window !== 'undefined' && mockedEnv) {
    const w = window as unknown as {
      import?: { meta?: { env?: Record<string, unknown> } };
    };
    w.import = w.import || {};
    w.import.meta = w.import.meta || {};
    w.import.meta.env = { ...(w.import.meta.env || {}), ...mockedEnv };
  }

  const envSource = mockedEnv ? { ...baseEnvSource, ...mockedEnv } : baseEnvSource;

  const result = envSchema.safeParse(envSource);

  if (result.success) {
    const parsed = result.data;

    // Development warnings
    if (parsed.NODE_ENV !== 'production') {
      if (!parsed.VITE_GA4_MEASUREMENT_ID) {
        console.warn('⚠️ GA4_MEASUREMENT_ID not set - analytics disabled');
      }
      if (!parsed.VITE_GOOGLE_MAPS_API_KEY) {
        console.warn('⚠️ GOOGLE_MAPS_API_KEY not set - using no-key Google Maps embed URL');
      }
    }

    return parsed;
  }

  // Validation failed — log issues but don't crash
  console.error('❌ Environment variable validation failed:');
  result.error.issues.forEach((issue) => {
    console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
  });

  // Fall back to defaults so the app can still render
  return envSchema.parse({
    NODE_ENV: (envSource as Record<string, unknown>)?.NODE_ENV ?? 'development',
  });
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
  debug: isDebug,
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
  void env;
}
