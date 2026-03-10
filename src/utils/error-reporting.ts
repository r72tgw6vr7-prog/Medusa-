export function initErrorMonitoring() {
  if (import.meta.env.DEV) {
    console.warn('Error monitoring: development mode — logging to console');
  }

  // Catch uncaught errors
  window.addEventListener('error', (event) => {
    captureError(
      event.error instanceof Error ? event.error : new Error(event.message),
      { source: event.filename, line: event.lineno, col: event.colno },
    );
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    const error =
      event.reason instanceof Error
        ? event.reason
        : new Error(String(event.reason));
    captureError(error, { type: 'unhandledrejection' });
  });
}

export function captureError(error: Error, context?: Record<string, unknown>) {
  console.error('[Error Report]:', {
    message: error.message,
    stack: error.stack,
    url: window.location.href,
    timestamp: new Date().toISOString(),
    ...context,
  });
}
