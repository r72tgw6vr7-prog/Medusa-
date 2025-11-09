import React, { forwardRef } from 'react';
import { cn } from '../utils';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Whether the field is required */
  required?: boolean;
  /** Additional class name */
  className?: string;
}

/**
 * A reusable label component with required indicator
 */
export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, children, required, htmlFor, ...props }, ref) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        className={cn(
          'block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1',
          { 'after:content-["*"] after:ml-0.5 after:text-red-500': required },
          className,
        )}
        {...props}
      >
        {children}
      </label>
    );
  },
);

Label.displayName = 'Label';

export default Label;
