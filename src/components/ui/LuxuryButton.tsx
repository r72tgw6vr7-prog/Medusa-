/**
 * LUXURY BUTTON COMPONENT
 * 
 * Default style: White/Surface background + Black text (60-30-10 principle)
 * Chrome variants reserved for dark backgrounds or metallic effects
 */
import { cn } from '@/lib/utils'
import { ButtonHTMLAttributes, forwardRef } from 'react'

interface LuxuryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'surface' | 'chrome-dark' | 'chrome-light' | 'metallic'
  size?: 'sm' | 'md' | 'lg'
}

export const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ variant = 'surface', size = 'md', className, children, ...props }, ref) => {
    const baseStyles = 'font-medium transition-all duration-300 focus-ring-universal rounded-lg'
    
    const variants = {
      // ✅ DEFAULT - White/Surface background + Black text
      surface: cn(
        'bg-white text-luxury-text-primary border border-luxury-border-light',
        'hover:bg-luxury-bg-surface hover:shadow-luxury-lg',
        'active:scale-[0.98]'
      ),
      
      // ✅ Chrome on dark backgrounds - 12.5:1 contrast
      'chrome-dark': cn(
        'bg-luxury-accent-chrome text-luxury-text-primary',
        'hover:bg-luxury-accent-chrome-hover hover:shadow-chrome-glow',
        'active:scale-[0.98]'
      ),
      
      // ✅ Chrome-safe on light backgrounds - 4.54:1 contrast
      'chrome-light': cn(
        'bg-luxury-accent-chrome-safe text-white',
        'hover:bg-luxury-accent-chrome-safe-hover hover:shadow-luxury-lg',
        'active:scale-[0.98]'
      ),
      
      // ✅ Metallic gradient - dark backgrounds only
      metallic: cn(
        'button-chrome-metallic text-luxury-text-primary',
        'hover:shadow-chrome-lift active:scale-[0.98]'
      ),
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }
    
    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

LuxuryButton.displayName = 'LuxuryButton'
