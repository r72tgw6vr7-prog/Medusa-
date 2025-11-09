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
              'text-[15px] font-medium text-white/90', // Adjusted size and opacity
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
              className='absolute left-4 top-1/2 -translate-y-1/2 text-white/50'
              style={iconSize}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              // Base styles from design system - adjusted for compactness
              'w-full bg-[rgba(34,34,34,0.8)] rounded-md',
              'text-base leading-snug font-body font-normal',
              'text-white placeholder:text-white/40 placeholder:text-sm',
              'border border-[rgba(192,192,192,0.3)]',

              // Mobile-first responsive sizing - more compact
              'min-h-[42px] px-4 py-2.5',
              'md:min-h-[40px] md:py-2',

              // Focus states from design system
              'focus:outline-none focus:border-[var(--brand-gold)]',
              'focus:shadow-[0_0_10px_rgba(212,175,55,0.2)]',

              // Hover state
              'hover:border-[var(--brand-gold)]/50',

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
              className='absolute right-4 top-1/2 -translate-y-1/2 text-white/50'
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
              'text-xs mt-0.5', // Smaller text and tighter spacing
              error ? 'text-red-400' : 'text-white/50',
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
