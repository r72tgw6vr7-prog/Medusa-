import React, { forwardRef, useEffect, useRef } from 'react';
import { cn } from '../utils';

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Size of the textarea */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the textarea has an error */
  error?: boolean;
  /** Whether the textarea should auto-resize */
  autoResize?: boolean;
  /** Minimum number of rows */
  minRows?: number;
  /** Maximum number of rows */
  maxRows?: number;
  /** Additional class name */
  className?: string;
}

/**
 * A customizable textarea component with auto-resize functionality
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      size = 'md',
      error = false,
      disabled = false,
      autoResize = false,
      minRows = 3,
      maxRows = 8,
      rows = minRows,
      style,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const currentRef = (ref as React.RefObject<HTMLTextAreaElement>) || textareaRef;

    const sizeClasses = {
      sm: 'py-1.5 px-3 text-sm',
      md: 'py-2 px-3 text-base',
      lg: 'py-2.5 px-4 text-lg',
    };

    const baseClasses =
      'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';

    const errorClasses = error
      ? 'border-red-500 focus-visible:ring-red-200'
      : 'border-input';

    // Auto-resize functionality
    useEffect(() => {
      const textarea = currentRef.current;
      if (!autoResize || !textarea) return;
      
      const adjustHeight = () => {
        textarea.style.height = 'auto';
        const maxHeight = maxRows * 24; // Approximate line height
        
        if (textarea.scrollHeight <= maxHeight) {
          textarea.style.height = `${Math.max(textarea.scrollHeight, minRows * 24)}px`;
        } else {
          textarea.style.overflowY = 'auto';
          textarea.style.height = `${maxHeight}px`;
        }
      };

      const handleInput = (e: Event) => {
        adjustHeight();
        if (onChange) {
          onChange(e as unknown as React.ChangeEvent<HTMLTextAreaElement>);
        }
      };

      textarea.addEventListener('input', handleInput);
      adjustHeight(); // Initial adjustment

      return () => {
        textarea.removeEventListener('input', handleInput);
      };
    }, [autoResize, minRows, maxRows, onChange, currentRef]);

    return (
      <textarea
        ref={currentRef}
        rows={rows}
        className={cn(
          baseClasses,
          sizeClasses[size],
          errorClasses,
          {
            'resize-none': autoResize,
            'cursor-not-allowed opacity-50': disabled,
          },
          className
        )}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        style={{
          ...style,
          minHeight: `${minRows * 24}px`,
          maxHeight: autoResize ? `${maxRows * 24}px` : undefined,
        }}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
