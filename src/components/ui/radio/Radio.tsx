import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cn } from '../utils';
import { Circle } from 'lucide-react';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> & {
    label?: string;
  }
>(({ className, children, label, ...props }, ref) => {
  const id = React.useId();

  return (
    <div className='flex items-center space-x-0'>
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          'h-4 w-4 rounded-full border border-primary text-primary ring-offset-background',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
          className,
        )}
        id={id}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
          <Circle className='h-2.5 w-2.5 fill-current text-primary-foreground' />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {label && (
        <label
          htmlFor={id}
          className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
        >
          {label}
        </label>
      )}
      {children}
    </div>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

// Standalone Radio component (without group)
interface RadioProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  label?: string;
}

const Radio = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitive.Item>, RadioProps>(
  ({ className, label, id: propId, ...props }, ref) => {
    const id = React.useId();
    const radioId = propId || `radio-${id}`;

    return (
      <div className='flex items-center space-x-0'>
        <RadioGroupPrimitive.Item
          ref={ref}
          className={cn(
            'h-4 w-4 rounded-full border border-primary text-primary ring-offset-background',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'data-[state=checked]:border-primary data-[state=checked]:bg-primary',
            className,
          )}
          id={radioId}
          {...props}
        >
          <RadioGroupPrimitive.Indicator className='flex items-center justify-center'>
            <Circle className='h-2.5 w-2.5 fill-current text-primary-foreground' />
          </RadioGroupPrimitive.Indicator>
        </RadioGroupPrimitive.Item>
        {label && (
          <label
            htmlFor={radioId}
            className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);
Radio.displayName = 'Radio';

export { Radio, RadioGroup, RadioGroupItem };
