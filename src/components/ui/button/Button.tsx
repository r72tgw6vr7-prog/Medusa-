import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils';
import { VisuallyHidden } from '../accessibility/VisuallyHidden';

const buttonVariants = cva(
  'inline-flex items-center justify-center font-medium rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 py-2 px-4 text-base',
        lg: 'h-11 px-8 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render as a child element */
  asChild?: boolean;
  /** Show a loading spinner */
  loading?: boolean;
  /** Icon to display before the button text */
  leftIcon?: React.ReactNode;
  /** Icon to display after the button text */
  rightIcon?: React.ReactNode;
  /** Make the button take up the full width of its container */
  fullWidth?: boolean;
  /** @deprecated Use leftIcon instead */
  icon?: React.ReactNode;
  /** @deprecated Use leftIcon/rightIcon instead */
  iconPosition?: 'left' | 'right';
}

/**
 * A customizable, accessible button component with support for icons, loading states, and more.
 *
 * @example
 * // Basic usage
 * <Button>Click me</Button>
 *
 * @example
 * // With icon
 * <Button leftIcon={<Icon />}>Save</Button>
 *
 * @example
 * // Icon-only button
 * <Button icon={<CloseIcon />} aria-label="Close dialog" />
 *
 * @example
 * // Loading state
 * <Button loading>Processing...</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      leftIcon,
      rightIcon,
      fullWidth,
      children,
      disabled,
      icon,
      iconPosition = 'right',
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isIconOnly =
      React.Children.count(children) === 0 && (!!leftIcon || !!rightIcon || !!icon);
    const { 'aria-label': ariaLabel } = props;

    // Handle deprecated icon prop
    const resolvedLeftIcon = leftIcon || (icon && iconPosition === 'left' ? icon : null);
    const resolvedRightIcon = rightIcon || (icon && iconPosition === 'right' ? icon : null);

    // Warn in development if an icon-only button is missing an aria-label
    React.useEffect(() => {
      if (process.env.NODE_ENV !== 'production' && isIconOnly && !ariaLabel) {
        console.warn('Icon-only buttons should have an aria-label for accessibility');
      }
    }, [isIconOnly, ariaLabel]);

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && 'w-full',
          isIconOnly && 'p-0',
          className,
        )}
        ref={ref}
        disabled={disabled || loading}
        type={type}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className='inline-flex items-center' aria-hidden='true'>
            <svg
              className='animate-spin h-4 w-4 text-current'
              fill='none'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'
              />
              <path
                className='opacity-75'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                fill='currentColor'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </span>
        )}

        {!loading && resolvedLeftIcon && (
          <span className={cn('inline-flex', children && 'mr-2')} aria-hidden='true'>
            {resolvedLeftIcon}
          </span>
        )}

        {children && <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>}

        {!loading && resolvedRightIcon && (
          <span className={cn('inline-flex', children && 'ml-2')} aria-hidden='true'>
            {resolvedRightIcon}
          </span>
        )}

        {isIconOnly && !loading && !resolvedLeftIcon && !resolvedRightIcon && (
          <VisuallyHidden>Button</VisuallyHidden>
        )}
      </Comp>
    );
  },
);

Button.displayName = 'Button';

export { Button, buttonVariants };
