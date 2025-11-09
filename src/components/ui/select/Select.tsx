import React, { forwardRef } from 'react';
import type { SelectHTMLAttributes as ReactSelectHTMLAttributes } from 'react';
import { cn } from '../utils';

// Custom dropdown arrow icon
const ChevronDownIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className='text-gray-400'
    aria-hidden='true'
  >
    <path d='m6 9 6 6 6-6' />
  </svg>
);

// Omit the 'size' property from HTMLSelectElement as we're redefining it
type SelectHTMLAttributes = Omit<ReactSelectHTMLAttributes<HTMLSelectElement>, 'size'>;

export interface SelectProps extends SelectHTMLAttributes {
  /** Size of the select */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the select has an error */
  error?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Additional class name */
  className?: string;
  /** Select container class name */
  containerClassName?: string;
}

/**
 * A customizable select component with a custom dropdown arrow
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      containerClassName,
      size = 'md',
      error = false,
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = {
      sm: 'h-8 text-sm pl-3 pr-8',
      md: 'h-10 text-base pl-3 pr-10',
      lg: 'h-12 text-base pl-4 pr-12',
    };

    const iconSizeClasses = {
      sm: 'right-2',
      md: 'right-3',
      lg: 'right-4',
    };

    const baseClasses =
      'appearance-none w-full rounded-md border bg-background py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const errorClasses = error ? 'border-red-500 focus:ring-red-200' : 'border-input';

    return (
      <div className={cn('relative', containerClassName)}>
        <select
          ref={ref}
          className={cn(
            baseClasses,
            sizeClasses[size],
            errorClasses,
            'pr-8', // Make room for the icon
            {
              'cursor-not-allowed opacity-50': disabled,
              'text-gray-400': !props.value, // Placeholder text color
            },
            className,
          )}
          disabled={disabled}
          aria-invalid={error}
          {...props}
        >
          {children}
        </select>
        <div
          className={cn(
            'pointer-events-none absolute top-1/2 -translate-y-1/2',
            iconSizeClasses[size],
          )}
        >
          <ChevronDownIcon />
        </div>
      </div>
    );
  },
);

Select.displayName = 'Select';

export default Select;
