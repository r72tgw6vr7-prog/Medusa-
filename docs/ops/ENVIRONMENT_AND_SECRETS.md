# Environment And Secrets

## Source of truth

- Local development secrets: `.env.local`
- Shared examples: `.env.example`
- Production and preview secrets: Vercel project environment variables

## Rules

- Never hardcode secrets into source files
- Never remove or rename a production secret without checking the consuming code
- If a secret name changes, update code, environment config, and docs together
- Public `VITE_*` values may be exposed to the client bundle, but they still belong in environment configuration

## Current production-critical client variables

- `VITE_WEB3FORMS_KEY`
- `VITE_GOOGLE_MAPS_API_KEY` if Google Maps Embed API is required
- `VITE_GA4_MEASUREMENT_ID` if analytics is enabled

## Maps behavior note

- The shared map component is used on both home and contact pages.
- If `VITE_GOOGLE_MAPS_API_KEY` is missing, the app falls back to a no-key Google Maps embed URL.
- If map loading fails, the app shows the built-in map fallback panel.

## Verification after env changes

1. Build locally with the expected variable set
2. Verify the related route renders
3. Verify the form or integration actually uses the configured variable
4. Redeploy `main`
5. Re-check the live domain
