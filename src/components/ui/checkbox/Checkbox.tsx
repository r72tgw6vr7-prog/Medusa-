import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '../utils';
import { Check, Minus } from 'lucide-react';

const Checkbox = React.forwardRef<
  React.ElementRef<'button'>,
  React.ComponentPropsWithoutRef<'button'> & {
    asChild?: boolean;
    checked?: boolean | 'indeterminate';
    onCheckedChange?: (checked: boolean | 'indeterminate') => void;
    disabled?: boolean;
    name?: string;
    value?: string;
    required?: boolean;
  }
>(
  (
    {
      className,
      asChild = false,
      checked = false,
      onCheckedChange,
      disabled = false,
      name,
      value,
      required = false,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'button';
    const isIndeterminate = checked === 'indeterminate';
    const isChecked = checked === true;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (asChild && props.onClick) {
        props.onClick(e);
      }

      if (onCheckedChange) {
        if (isIndeterminate) {
          onCheckedChange(false);
        } else {
          onCheckedChange(!isChecked);
        }
      }
    };

    return (
      <>
        <Comp
          ref={ref}
          type='button'
          role='checkbox'
          aria-checked={isIndeterminate ? 'mixed' : isChecked}
          aria-required={required}
          disabled={disabled}
          data-state={isIndeterminate ? 'indeterminate' : isChecked ? 'checked' : 'unchecked'}
          data-disabled={disabled ? '' : undefined}
          onClick={handleClick}
          className={cn(
            'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            {
              'bg-primary text-primary-foreground': isChecked,
              'bg-background': !isChecked,
              'border-destructive': !isChecked && props['aria-invalid'],
            },
            className,
          )}
          {...props}
        >
          {isChecked ? (
            <Check className='h-3.5 w-3.5' />
          ) : isIndeterminate ? (
            <Minus className='h-3.5 w-3.5' />
          ) : null}
        </Comp>
        <input
          type='checkbox'
          name={name}
          value={value}
          checked={isChecked}
          onChange={() => {}}
          className='sr-only'
          ref={(el) => {
            if (el) {
              el.indeterminate = isIndeterminate;
            }
          }}
          disabled={disabled}
          required={required}
        />
      </>
    );
  },
);

Checkbox.displayName = 'Checkbox';

const CheckboxWithLabel = React.forwardRef<
  React.ElementRef<typeof Checkbox>,
  React.ComponentProps<typeof Checkbox> & {
    label: React.ReactNode;
    id?: string;
  }
>(({ id, label, className, ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || `checkbox-${generatedId}`;

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Checkbox id={checkboxId} ref={ref} {...props} />
      <label
        htmlFor={checkboxId}
        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
      >
        {label}
      </label>
    </div>
  );
});

CheckboxWithLabel.displayName = 'CheckboxWithLabel';

export { Checkbox, CheckboxWithLabel };
