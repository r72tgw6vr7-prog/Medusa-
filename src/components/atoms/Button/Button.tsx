import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { TRANSITION_PRESETS, respectMotionPreferences } from '../../../lib/animations';
import { VisuallyHidden } from '../../accessibility/VisuallyHidden';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'aria-disabled'> {
  /** The visual style of the button */
  variant?: ButtonVariant;
  /** The size of the button */
  size?: ButtonSize;
  /** Optional icon to display with the button */
  icon?: React.ReactNode;
  /** Position of the icon relative to the text */
  iconPosition?: 'left' | 'right';
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Whether the button should take up the full width of its container */
  fullWidth?: boolean;
  /** Additional class names to apply to the button */
  className?: string;
  /** 
   * Accessible label for the button (required if no visible text is provided)
   * This will be announced by screen readers instead of the button's content
   */
  'aria-label'?: string;
  /** 
   * Accessible description for the button
   * Use this to provide additional context that will be read after the label
   */
  'aria-describedby'?: string;
  /** 
   * Indicates the current "pressed" state of a toggle button
   * Only use for buttons that toggle between two states
   */
  'aria-pressed'?: boolean | 'true' | 'false' | 'mixed';
  /** 
   * Indicates the current state of a collapsible element
   * Only use for buttons that control expandable content
   */
  'aria-expanded'?: boolean | 'true' | 'false';
  /** 
   * Indicates that the button controls another element
   * Use with aria-expanded for collapsible content
   */
  'aria-controls'?: string;
  /** 
   * Indicates that the button has a popup menu
   * Use with aria-haspopup for menus, dialogs, etc.
   */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
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
 * <Button icon={<Icon />} iconPosition="left">Save</Button>
 * 
 * @example
 * // Icon-only button
 * <Button icon={<CloseIcon />} aria-label="Close dialog" />
 * 
 * @example
 * // Loading state
 * <Button loading>Processing...</Button>
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  className = '',
  children,
  disabled = false,
  type = 'button',
  ...props
}, ref) => {
  const baseStyles = 'flex items-center justify-center font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-gold';
  
  // Determine if this is an icon-only button (no visible text)
  const isIconOnly = !children || (Array.isArray(children) && children.length === 0);

  const variantStyles = {
    primary: `bg-brand-gold text-black border-2 border-solid border-brand-gold hover:border-brand-gold-hover shadow-gold-subtle ${TRANSITION_PRESETS.buttonGold}`,
    secondary: `bg-transparent border-2 border-solid border-brand-gold text-white hover:bg-brand-gold/10 ${TRANSITION_PRESETS.button}`,
    ghost: `bg-transparent border-2 border-solid border-brand-chrome/50 text-white hover:border-brand-gold ${TRANSITION_PRESETS.button}`,
    link: `bg-transparent text-white hover:text-brand-gold px-0 ${TRANSITION_PRESETS.link}`,
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-4 text-base rounded-lg',
    lg: 'px-8 py-5 text-lg rounded-lg',
  };

  const disabledStyles = disabled || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthStyles = fullWidth ? 'w-full' : '';
  const motionStyles = respectMotionPreferences();

  // Accessibility attributes
  const accessibilityProps = {
    'aria-busy': loading ? true : undefined,
    'aria-disabled': disabled || loading || undefined, // Use undefined instead of false for better a11y
    'aria-label': props['aria-label'] || (isIconOnly ? 'Button' : undefined),
    'aria-describedby': props['aria-describedby'],
    'aria-pressed': props['aria-pressed'],
    'aria-expanded': props['aria-expanded'],
    'aria-controls': props['aria-controls'],
    'aria-haspopup': props['aria-haspopup'],
    disabled: disabled || loading,
    type,
  };

  // Warn in development if an icon-only button is missing an aria-label
  if (process.env.NODE_ENV !== 'production' && isIconOnly && !props['aria-label']) {
    console.warn('Icon-only buttons should have an aria-label for accessibility');
  }

  return (
    <button
      ref={ref}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${widthStyles}
        ${motionStyles}
        ${className}
      `}
      {...accessibilityProps}
      {...props}
    >
      {loading && (
        <span 
          className={`${iconPosition === 'right' ? 'order-1' : 'order-0'} mr-2`}
          aria-hidden='true'
        >
          <span className='animate-spin'>⟳</span>
        </span>
      )}
      {!loading && icon && iconPosition === 'left' && (
        <span className='mr-0' aria-hidden='true'>{icon}</span>
      )}
      {children && (
        <span className={`${loading ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </span>
      )}
      {!loading && icon && iconPosition === 'right' && (
        <span className={children ? 'ml-2' : ''} aria-hidden='true'>{icon}</span>
      )}
      {isIconOnly && !loading && !icon && (
        <VisuallyHidden>Button</VisuallyHidden>
      )}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
