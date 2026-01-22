import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

const cardVariants = cva(
  'flex flex-col h-full rounded-[32px] border transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--accent-chrome)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--card-bg)]',
  {
    variants: {
      variant: {
        default: 'bg-[var(--card-bg)] border-[var(--card-border)] shadow-[var(--card-shadow)]',
        featured: 'bg-[var(--card-bg)] border-[var(--card-border)] shadow-[var(--card-shadow)] scale-[1.01]',
        elevated: 'bg-[var(--card-bg)] border-[var(--card-border)] shadow-[var(--card-shadow)]',
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
  }
);

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const shouldUseSlot = asChild && React.Children.count(children) === 1;
    const Component = shouldUseSlot ? Slot : 'div';
    return (
      <Component
        className={cn(cardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };
