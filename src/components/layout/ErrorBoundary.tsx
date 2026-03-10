import React, { Component, ErrorInfo, ReactNode } from 'react';
import { getI18nInstance } from '@/i18n';
import { captureError } from '@/utils/error-reporting';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component that catches JavaScript errors in its child component tree
 * and displays a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    captureError(error, { componentStack: errorInfo.componentStack ?? undefined });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const i18n = getI18nInstance();
      const t = (key: string) => i18n.t(key, { ns: 'errors' });

      return (
        <div className='flex flex-col items-center justify-center p-32 text-center'>
          <div className='bg-luxury-bg-dark/40 backdrop-blur-md p-24 rounded-xl border border-brand-accent/30 max-w-lg'>
            <h2 className='text-2xl font-semibold text-brand-accent mb-16'>
              {t('boundary.title')}
            </h2>
            <p className='text-luxury-text-inverse/90 mb-16'>
              {t('boundary.message')}
            </p>
            <button
              onClick={() => globalThis.location.reload()}
              className='px-16 py-8 bg-brand-accent text-luxury-text-primary font-semibold rounded-md hover:bg-brand-accent/90 transition-colors duration-300'
            >
              {t('boundary.reload')}
            </button>

            {import.meta.env.DEV && this.state.error && (
              <div className='mt-24 p-16 bg-red-900/40 rounded-md text-left'>
                <p className='text-red-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap'>
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
