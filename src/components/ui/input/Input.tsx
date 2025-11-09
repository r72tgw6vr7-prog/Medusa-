import React, { forwardRef } from 'react';
import { cn } from '../utils';

// Omit the 'size' property from HTMLInputElement as we're redefining it
type InputHTMLAttributes = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

export interface InputProps extends InputHTMLAttributes {
  /** Size of the input */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the input has an error */
  error?: boolean;
  /** Left icon to display */
  leftIcon?: React.ReactNode;
  /** Right icon to display */
  rightIcon?: React.ReactNode;
  /** Additional class name */
  className?: string;
  /** Input container class name */
  containerClassName?: string;
}

/**
 * A customizable input component with various states and icons
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      size = 'md',
      error = false,
      disabled = false,
      leftIcon,
      rightIcon,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'h-8 text-sm pl-3',
      md: 'h-10 text-base pl-3',
      lg: 'h-12 text-base pl-4',
    };

    const iconSizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    };

    const baseClasses =
      'flex w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const errorClasses = error ? 'border-red-500 focus-visible:ring-red-200' : 'border-input';

    return (
      <div className={cn('relative w-full', containerClassName)}>
        {leftIcon && (
          <div
            className={cn(
              'absolute left-3 top-1/2 -translate-y-1/2 text-gray-400',
              iconSizeClasses[size],
            )}
          >
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            baseClasses,
            sizeClasses[size],
            errorClasses,
            {
              'pl-10': leftIcon,
              'pr-10': rightIcon,
              'cursor-not-allowed opacity-50': disabled,
            },
            className,
          )}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {rightIcon && (
          <div
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 text-gray-400',
              iconSizeClasses[size],
            )}
          >
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
