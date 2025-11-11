import React from 'react';
import AtomButton from '../../atoms/Button/Button';

export type LegacyVariant = 'gold' | 'outlineGold' | 'primary' | 'secondary' | 'tertiary';
export type LegacySize = 'lg' | 'md' | undefined;

export type UIButtonProps = Omit<React.ComponentProps<typeof AtomButton>, 'variant' | 'style' | 'className'> & {
  variant?: LegacyVariant;
  size?: LegacySize;
  asChild?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export const Button = React.forwardRef<HTMLButtonElement, UIButtonProps>(
  ({ variant = 'primary', size, asChild, className = '', style, ...props }, ref) => {
    const mappedVariant: 'primary' | 'secondary' | 'tertiary' =
      variant === 'gold' ? 'primary' : variant === 'outlineGold' ? 'secondary' : (variant as any);

    // Translate legacy size prop to padding/height/font-size tweaks
    const sizeStyles: React.CSSProperties =
      size === 'lg'
        ? { padding: '16px 28px', height: '56px', fontSize: '18px' }
        : size === 'md'
        ? { padding: '12px 22px', height: '48px', fontSize: '16px' }
        : {};

    const mergedStyle: React.CSSProperties = { ...sizeStyles, ...style };

    return (
      <AtomButton
        ref={ref}
        variant={mappedVariant}
        style={mergedStyle}
        className={className}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export default Button;
