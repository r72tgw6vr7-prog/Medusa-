import React, { forwardRef } from 'react';
import { cn } from '../utils';

type InputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface MedusaInputProps extends InputHTMLAttributes {
  /** Label for the input */
  label?: string;
  /** Helper text displayed below the input */
  helper?: string;
  /** Error message to display */
  error?: string | boolean;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
  /** Additional classes for the input wrapper */
  wrapperClassName?: string;
  /** Additional classes for the input element */
  className?: string;
  /** Whether to hide the label visually */
  hideLabel?: boolean;
  /** Whether the input takes full width */
  fullWidth?: boolean;
}

/**
 * MedusaInput Component
 *
 * A unified input component that follows Medusa's design system.
 * Features:
 * - Consistent styling across all screen sizes
 * - Proper touch targets (44px minimum height on mobile)
 * - Accessibility features
 * - Focus states with gold outline
 * - Error states
 * - Icon support
 * - Helper text and error message display
 */
export const MedusaInput = forwardRef<HTMLInputElement, MedusaInputProps>(
  (
    {
      label,
      helper,
      error,
      leftIcon,
      rightIcon,

      wrapperClassName,
      className,
      hideLabel = false,
      fullWidth = true,
      id,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Generate unique ID if not provided
    const inputId = id || `medusa-input-${Math.random().toString(36).substr(2, 9)}`;

    // Icon size constants from design system
    const iconSize = {
      width: '20px',
      height: '20px',
    };

    return (
      <div
        className={cn(
          'flex flex-col gap-1.5', // Reduced gap from 2 to 1.5
          fullWidth ? 'w-full' : 'w-auto',
          wrapperClassName,
        )}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-base lg:text-sm font-medium text-luxury-text-inverse/90', // Adjusted size and opacity
              hideLabel && 'sr-only',
            )}
          >
            {label}
            {required && (
              <span className='text-[var(--brand-gold)] ml-0' aria-hidden='true'>
                *
              </span>
            )}
          </label>
        )}

        {/* Input container */}
        <div className='relative'>
          {leftIcon && (
            <div
              className='absolute left-4 top-1/2 -translate-y-1/2 text-luxury-text-inverse/50'
              style={iconSize}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              "flex h-12 w-full rounded-lg border border-luxury-border-on-dark bg-luxury-bg-dark-elevated px-4 py-3 text-base text-luxury-text-inverse file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-luxury-text-inverse-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-luxury-accent-chrome focus-visible:ring-offset-2 focus-visible:ring-offset-luxury-bg-dark disabled:cursor-not-allowed disabled:opacity-50",
              // Focus states from design system
              'focus:outline-none focus:border-[var(--accent-chrome)]',
              'focus:shadow-[0_0_10px_rgba(192,192,192,0.2)]',
              // Hover state
              'hover:border-[var(--accent-chrome)]/50',

              // Error state
              error && 'border-red-500 focus:border-red-500 focus:shadow-[0_0_0_1px_#ef4444]',

              // Disabled state
              disabled && 'opacity-50 cursor-not-allowed',

              // Icon padding
              leftIcon && 'pl-12 md:pl-14',
              rightIcon && 'pr-12 md:pr-14',

              className,
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error || helper ? `${inputId}-description` : undefined}
            required={required}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div
              className='absolute right-4 top-1/2 -translate-y-1/2 text-luxury-text-inverse/50'
              style={iconSize}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error message or helper text */}
        {(error || helper) && (
          <p
            id={`${inputId}-description`}
            className={cn(
              'text-sm lg:text-xs mt-0.5', // Smaller text and tighter spacing
              error ? 'text-red-400' : 'text-luxury-text-inverse/50',
            )}
          >
            {error && typeof error === 'string' ? error : helper}
          </p>
        )}
      </div>
    );
  },
);

MedusaInput.displayName = 'MedusaInput';

export default MedusaInput;
