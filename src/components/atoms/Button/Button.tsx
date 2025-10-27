import React, { ButtonHTMLAttributes } from 'react';
import { TRANSITION_PRESETS, respectMotionPreferences } from '../../../lib/animations';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  loading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseStyles = 'flex items-center justify-center font-medium';

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

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabledStyles}
        ${widthStyles}
        ${motionStyles}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className='mr-0 animate-spin'>⟳</span>}
      {icon && iconPosition === 'left' && <span className='mr-0'>{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className='ml-0'>{icon}</span>}
    </button>
  );
};

export default Button;
