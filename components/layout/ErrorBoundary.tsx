import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback || (
        <div className="p-8 bg-[#222222] text-white border border-[#D4AF37] rounded-md">
          <h2 className="text-[#D4AF37] text-xl mb-0">Something went wrong.</h2>
          <p className="mb-8">The component could not be rendered.</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-8 py-0 bg-[#D4AF37] text-[#222222] rounded-md hover:bg-[#C19B26] transition-colors transition duration-200 ease-out"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}