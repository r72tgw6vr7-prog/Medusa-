import React, { forwardRef } from 'react';
import { cn } from '@/components/ui/utils';

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
 * - Chrome focus states
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
          'flex flex-col gap-2', // Reduced gap from 2 to 1.5
          fullWidth ? 'w-full' : 'w-auto',
          wrapperClassName,
        )}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-base lg:text-sm font-medium text-luxury-text-inverse/90',
              hideLabel && 'sr-only',
            )}
          >
            {label}
            {required && (
              <span className='ml-0 text-(--accent-chrome)' aria-hidden='true'>
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
              'flex h-12 w-full rounded-[24px] border border-white/10 bg-white/4 px-4 py-3 text-base text-luxury-text-inverse shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-luxury-text-inverse-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-chrome-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-luxury-bg-dark disabled:cursor-not-allowed disabled:opacity-50',
              'focus:outline-none focus:border-[rgba(var(--accent-chrome-rgb),0.7)] focus:shadow-[0_0_0_1px_rgba(var(--accent-chrome-rgb),0.38),0_12px_28px_rgba(0,0,0,0.24)]',
              'hover:border-[rgba(var(--accent-chrome-rgb),0.28)]',
              error &&
                'border-red-500 focus:border-red-400 focus:shadow-[0_0_0_1px_rgba(248,113,113,0.28),0_12px_28px_rgba(0,0,0,0.24)]',
              disabled && 'cursor-not-allowed opacity-50',
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
              'text-sm lg:text-xs mt-0', // Smaller text and tighter spacing
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
