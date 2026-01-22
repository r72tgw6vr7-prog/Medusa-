import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-base lg:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[var(--accent-chrome)] text-[var(--deep-black)] hover:bg-[var(--accent-chrome)]/80 focus-visible:ring-[var(--accent-chrome)]',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        // Chrome accent variants (v2.0 design system)
        chrome: 'bg-[var(--accent-chrome)] text-[var(--deep-black)] hover:bg-[var(--accent-chrome)]/80 focus-visible:ring-[var(--accent-chrome)]',
        outlineChrome:
          'border border-[var(--accent-chrome)] text-[var(--accent-chrome)] bg-transparent hover:bg-[var(--accent-chrome)]/10 focus-visible:ring-[var(--accent-chrome)]',
        ghostChrome: 'text-[var(--accent-chrome)] bg-transparent hover:bg-[var(--accent-chrome)]/10',
        // Deprecated aliases for backward compatibility (now point to chrome)
        /** @deprecated Use 'chrome' instead */
        gold: 'bg-[var(--accent-chrome)] text-[var(--deep-black)] hover:bg-[var(--accent-chrome)]/80',
        /** @deprecated Use 'outlineChrome' instead */
        outlineGold:
          'border border-[var(--accent-chrome)] text-[var(--accent-chrome)] bg-transparent hover:bg-[var(--accent-chrome)]/10',
        /** @deprecated Use 'ghostChrome' instead */
        ghostGold: 'text-[var(--accent-chrome)] bg-transparent hover:bg-[var(--accent-chrome)]/10',
      },
      size: {
        default: 'min-h-12 px-6 py-3 md:min-h-11 lg:h-10',
        sm: 'min-h-11 rounded-md px-5 md:min-h-10 lg:h-9',
        lg: 'min-h-12 rounded-md px-8 md:min-h-11 lg:h-11',
        icon: 'min-h-12 min-w-12 md:min-h-11 md:min-w-11 lg:h-10 lg:w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
