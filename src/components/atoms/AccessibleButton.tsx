import { forwardRef, ButtonHTMLAttributes } from 'react';

interface AccessibleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'destructive' | 'chateau-green' | 'cinnabar';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, children, ...props }, ref) => {
    const baseClasses =
      'rounded font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';
    const variantClasses = {
      primary: 'bg-[#D4AF37] hover:bg-[#C19B26] text-[#222222] focus:ring-[#D4AF37]',
      secondary: 'bg-[#C0C0C0]/20 hover:bg-[#C0C0C0]/30 text-white focus:ring-[#C0C0C0]',
      destructive: 'bg-[#C0C0C0] hover:bg-[#A8A8A8] text-[#222222] focus:ring-[#C0C0C0]',
      'chateau-green':
        'bg-chateau-green hover:bg-chateau-green-dark text-white focus:ring-chateau-green',
      cinnabar: 'bg-cinnabar hover:bg-cinnabar-dark text-white focus:ring-cinnabar',
    };

    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    return (
      <button
        {...props}
        ref={ref}
        type={props.type || 'button'}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${props.className}`}
        disabled={props.disabled || isLoading}
        aria-busy={isLoading}
      >
        {isLoading ? 'Loading...' : children}
      </button>
    );
  },
);

AccessibleButton.displayName = 'AccessibleButton';
