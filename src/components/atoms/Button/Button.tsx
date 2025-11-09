import React from 'react';
import { designTokens } from '../../../design-tokens';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      isLoading = false,
      fullWidth = false,
      icon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const getVariantConfig = (variant: ButtonVariant) => {
      switch (variant) {
        case 'primary':
          return {
            bg: designTokens.colors.gold.primary,
            bgHover: designTokens.colors.gold[600],
            text: designTokens.colors.background,
            border: 'none',
            padding: '12px 24px',
            height: '48px',
            borderRadius: designTokens.borderRadius.md,
          };
        case 'secondary':
          return {
            bg: 'transparent',
            bgHover: designTokens.colors.goldAlpha[10],
            text: designTokens.colors.gold.primary,
            border: `2px solid ${designTokens.colors.gold.primary}`,
            padding: '12px 24px',
            height: '48px',
            borderRadius: designTokens.borderRadius.md,
          };
        case 'tertiary':
          return {
            bg: 'transparent',
            bgHover: designTokens.colors.goldAlpha[10],
            text: designTokens.colors.white,
            border: `1px solid ${designTokens.colors.goldAlpha[20]}`,
            padding: '12px 24px',
            height: '48px',
            borderRadius: designTokens.borderRadius.md,
          };
        default:
          return {
            bg: designTokens.colors.gold.primary,
            bgHover: designTokens.colors.gold[600],
            text: designTokens.colors.background,
            border: 'none',
            padding: '12px 24px',
            height: '48px',
            borderRadius: designTokens.borderRadius.md,
          };
      }
    };

    const variantConfig = getVariantConfig(variant);
    const [isHovered, setIsHovered] = React.useState(false);

    const getBackgroundColor = () => {
      if (disabled) return variantConfig.bg;
      if (isHovered && variant === 'primary') return variantConfig.bgHover;
      return variantConfig.bg;
    };

    const style: React.CSSProperties = {
      backgroundColor: getBackgroundColor(),
      border: variantConfig.border || 'none',
      color: variantConfig.text,
      padding: variantConfig.padding,
      height: variantConfig.height,
      borderRadius: variantConfig.borderRadius,
      fontWeight: designTokens.typography.fontWeight.semibold,
      fontSize: '16px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 300ms ease-out',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : 'auto',
      transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
      boxShadow: isHovered && !disabled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
    };

    return (
      <button
        ref={ref}
        style={style}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                border: '2px solid currentColor',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            Loading...
          </>
        ) : (
          <>
            {icon && <span>{icon}</span>}
            {children}
          </>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } 
        button:focus { 
          outline: 2px solid ${designTokens.colors.gold.primary}; 
          outline-offset: 2px; 
        }`}</style>
      </button>
    );
  },
);

Button.displayName = 'Button';
export default Button;
