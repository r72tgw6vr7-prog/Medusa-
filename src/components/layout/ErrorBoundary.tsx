import React, { Component, ErrorInfo, ReactNode } from 'react';

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
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center p-32 text-center">
          <div className="bg-black/40 backdrop-blur-md p-24 rounded-xl border border-brand-gold/30 max-w-lg">
            <h2 className="text-2xl font-semibold text-brand-gold mb-16">Etwas ist schiefgelaufen</h2>
            <p className="text-white/90 mb-16">
              Wir haben ein Problem festgestellt. Bitte laden Sie die Seite neu oder kontaktieren Sie uns, wenn das Problem weiterhin besteht.
            </p>
            <button
              onClick={() => globalThis.location.reload()}
              className="px-16 py-8 bg-brand-gold text-deep-black font-semibold rounded-md hover:bg-brand-gold/90 transition-colors duration-300"
            >
              Seite neu laden
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-24 p-16 bg-red-900/40 rounded-md text-left">
                <p className="text-red-200 text-sm font-mono overflow-x-auto whitespace-pre-wrap">
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
