import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';

interface VisuallyHiddenProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The content to be visually hidden but accessible to screen readers */
  children: React.ReactNode;
  /** Whether the content should be rendered as a child element */
  asChild?: boolean;
  /** Whether the element should be focusable when it's visually hidden */
  focusable?: boolean;
}

/**
 * VisuallyHidden component that hides content visually but keeps it accessible to screen readers.
 * 
 * @example
 * // Basic usage
 * <VisuallyHidden>This text is only visible to screen readers</VisuallyHidden>
 * 
 * @example
 * // As a child element
 * <button>
 *   <VisuallyHidden>Close modal</VisuallyHidden>
 *   <span aria-hidden="true">×</span>
 * </button>
 */
const VisuallyHidden = React.forwardRef<HTMLSpanElement, VisuallyHiddenProps>(
  ({ className, children, asChild = false, focusable = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';
    
    return (
      <Comp
        ref={ref}
        className={cn(
          'absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0',
          'm-0 -mx-px -my-px',
          'clip-[rect(0,0,0,0)]',
          {
            'p-0': !focusable,
            'overflow-visible': focusable,
            'clip-auto': focusable,
            'h-auto': focusable,
            'w-auto': focusable,
            'm-0': focusable,
            'p-2': focusable,
            'z-[9999]': focusable,
            'top-0 left-0': focusable,
            'bg-white': focusable,
            'shadow-md': focusable,
          },
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';

export { VisuallyHidden };
