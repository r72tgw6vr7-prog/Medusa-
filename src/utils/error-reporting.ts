// TODO: Re-enable error monitoring after deployment
// import * as Sentry from '@sentry/browser';
// import LogRocket from 'logrocket';

export function initErrorMonitoring() {
  // Error monitoring disabled until deployment
  if (import.meta.env.DEV) {
    console.warn('Error monitoring disabled in development');
  }
}

export function captureError(error: Error, context?: Record<string, unknown>) {
  // Error monitoring disabled until deployment
  if (import.meta.env.DEV) {
    console.error('Error:', error, context);
  }
}
