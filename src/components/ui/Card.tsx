import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const cardVariants = cva(
  'flex h-full flex-col rounded-[32px] border border-[var(--card-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-chrome)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--card-bg)]',
  {
    variants: {
      variant: {
        default:
          'bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))] shadow-[var(--card-shadow)]',
        featured:
          'bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))] shadow-[var(--premium-elevation-hover)] scale-[1.01]',
        elevated:
          'bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0))] shadow-[var(--premium-elevation)]',
      },
      size: {
        default: 'p-8',
        sm: 'p-6',
        lg: 'p-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean;
  interactive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, asChild = false, interactive = false, children, ...props }, ref) => {
    const shouldUseSlot = asChild && React.Children.count(children) === 1;
    const Component = shouldUseSlot ? Slot : 'div';
    return (
      <Component
        className={cn(
          cardVariants({ variant, size }),
          interactive ? 'premium-interactive' : undefined,
          className,
        )}
        data-interactive={interactive ? 'true' : 'false'}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Card.displayName = 'Card';

export { Card, cardVariants };
