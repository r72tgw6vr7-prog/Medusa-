import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check, Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border border-transparent text-base lg:text-sm font-medium tracking-[0.01em] transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-chrome-rgb),0.55)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-page)] disabled:pointer-events-none disabled:opacity-50 active:translate-y-px',
  {
    variants: {
      variant: {
        default:
          'bg-(--accent-chrome) text-(--deep-black) shadow-[0_14px_38px_rgba(var(--accent-chrome-rgb),0.16)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_44px_rgba(var(--accent-chrome-rgb),0.22)]',
        destructive:
          'bg-red-600/90 text-white shadow-[0_14px_34px_rgba(127,29,29,0.24)] hover:-translate-y-0.5 hover:bg-red-500',
        outline:
          'border-white/14 bg-white/4 text-white hover:-translate-y-0.5 hover:border-white/26 hover:bg-white/8 hover:shadow-[0_18px_38px_rgba(0,0,0,0.26)]',
        secondary:
          'border-white/14 bg-white/6 text-white hover:-translate-y-0.5 hover:border-white/26 hover:bg-white/10 hover:shadow-[0_18px_38px_rgba(0,0,0,0.26)]',
        ghost:
          'text-white/82 shadow-none hover:bg-white/6 hover:text-white focus-visible:ring-white/30',
        link: 'h-auto min-h-0 rounded-none border-none px-0 py-0 text-white/84 shadow-none hover:text-(--accent-chrome)',
        chrome:
          'bg-(--accent-chrome) text-(--deep-black) shadow-[0_14px_38px_rgba(var(--accent-chrome-rgb),0.16)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_44px_rgba(var(--accent-chrome-rgb),0.22)]',
        outlineChrome:
          'border-[rgba(var(--accent-chrome-rgb),0.42)] bg-[rgba(255,255,255,0.03)] text-(--accent-chrome) shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 hover:border-[rgba(var(--accent-chrome-rgb),0.72)] hover:bg-[rgba(var(--accent-chrome-rgb),0.08)] hover:shadow-[0_18px_42px_rgba(0,0,0,0.24)]',
        ghostChrome:
          'text-(--accent-chrome) bg-transparent shadow-none hover:bg-[rgba(var(--accent-chrome-rgb),0.08)] hover:text-white',
        // Deprecated aliases for backward compatibility (now point to chrome)
        /** @deprecated Use 'chrome' instead */
        gold: 'bg-(--accent-chrome) text-(--deep-black) shadow-[0_14px_38px_rgba(var(--accent-chrome-rgb),0.16)] hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_18px_44px_rgba(var(--accent-chrome-rgb),0.22)]',
        /** @deprecated Use 'outlineChrome' instead */
        outlineGold:
          'border-[rgba(var(--accent-chrome-rgb),0.42)] bg-[rgba(255,255,255,0.03)] text-(--accent-chrome) shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 hover:border-[rgba(var(--accent-chrome-rgb),0.72)] hover:bg-[rgba(var(--accent-chrome-rgb),0.08)] hover:shadow-[0_18px_42px_rgba(0,0,0,0.24)]',
        /** @deprecated Use 'ghostChrome' instead */
        ghostGold:
          'text-(--accent-chrome) bg-transparent shadow-none hover:bg-[rgba(var(--accent-chrome-rgb),0.08)] hover:text-white',
      },
      size: {
        default: 'min-h-12 px-6 py-3 md:min-h-12 lg:h-11',
        sm: 'min-h-11 px-5 md:min-h-11 lg:h-10',
        lg: 'min-h-[52px] px-8 py-3.5 md:min-h-12 lg:h-12',
        icon: 'min-h-12 min-w-12 md:min-h-12 md:min-w-12 lg:h-11 lg:w-11',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  status?: 'default' | 'success' | 'error';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      status = 'default',
      disabled: disabledProp,
      onClick,
      tabIndex,
      ...props
    },
    ref,
  ) => {
    const isDisabled = loading || disabledProp;
    const statusClasses =
      status === 'success'
        ? 'border-emerald-400/50 bg-emerald-500/12 text-white shadow-[0_14px_34px_rgba(22,163,74,0.18)]'
        : status === 'error'
          ? 'border-red-400/50 bg-red-500/12 text-white shadow-[0_14px_34px_rgba(220,38,38,0.16)]'
          : '';
    const content = (
      <>
        {loading ? <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' /> : null}
        {!loading && status === 'success' ? <Check className='h-4 w-4' aria-hidden='true' /> : null}
        <span
          className={cn(
            'inline-flex items-center justify-center',
            loading ? 'opacity-90' : undefined,
          )}
        >
          {children}
        </span>
      </>
    );

    if (asChild) {
      const onlyChild = React.Children.count(children) === 1 ? React.Children.only(children) : null;

      if (React.isValidElement(onlyChild)) {
        const composedChild = React.cloneElement(
          onlyChild as React.ReactElement<{ children?: React.ReactNode }>,
          undefined,
          <>
            {loading ? <Loader2 className='h-4 w-4 animate-spin' aria-hidden='true' /> : null}
            {!loading && status === 'success' ? (
              <Check className='h-4 w-4' aria-hidden='true' />
            ) : null}
            <span
              className={cn(
                'inline-flex items-center justify-center',
                loading ? 'opacity-90' : undefined,
              )}
            >
              {onlyChild.props.children}
            </span>
          </>,
        );

        return (
          <Slot
            aria-busy={loading || undefined}
            aria-disabled={isDisabled || undefined}
            className={cn(buttonVariants({ variant, size }), statusClasses, className)}
            data-disabled={isDisabled ? '' : undefined}
            data-status={status}
            onClick={
              isDisabled
                ? (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                : onClick
            }
            ref={ref}
            tabIndex={isDisabled ? -1 : tabIndex}
            {...props}
          >
            {composedChild}
          </Slot>
        );
      }
    }

    return (
      <button
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ variant, size }), statusClasses, className)}
        data-status={status}
        disabled={isDisabled}
        ref={ref}
        onClick={onClick}
        tabIndex={tabIndex}
        {...props}
      >
        {content}
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
