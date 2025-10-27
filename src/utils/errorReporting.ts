// TODO: Re-enable error monitoring after deployment
// import * as Sentry from '@sentry/browser';
// import LogRocket from 'logrocket';

export function initErrorMonitoring() {
  // Error monitoring disabled until deployment
  console.info('Error monitoring disabled in development');
}

export function captureError(error: Error, context?: Record<string, any>) {
  // Error monitoring disabled until deployment
  console.error('Error:', error, context);
}
