import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'flex flex-col h-full rounded-3xl border-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--brand-accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--deep-black)] chrome-border-glow',
  {
    variants: {
      variant: {
        default: 'bg-[var(--surface-card-bg)] border-[var(--surface-card-border)] shadow-[var(--surface-card-shadow)] hover:border-[var(--brand-accent)]/70 hover:shadow-chrome-glow-subtle',
        featured: 'bg-[var(--surface-card-bg)] border-[var(--surface-card-border-featured)] shadow-[var(--surface-card-shadow-featured)] scale-[1.01] shadow-chrome-glow',
        elevated: 'bg-[var(--surface-card-bg)] border-[var(--surface-card-border)] shadow-[var(--shadow-md)] hover:border-[var(--brand-accent)]/70 hover:shadow-chrome-glow',
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
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card, cardVariants };
