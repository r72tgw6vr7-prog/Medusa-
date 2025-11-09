import React from 'react';
import { designTokens } from '../../../design-tokens';

type CardVariant = 'default' | 'elevated' | 'bordered' | 'glass';
type CardPadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  selected?: boolean;
  backgroundImage?: string;
  overlay?: boolean;
  children: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      selected = false,
      backgroundImage,
      overlay = false,
      children,
      className = '',
      style,
      ...props
    },
    ref,
  ) => {
    const paddingMap = {
      none: '0',
      sm: '12px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    };

    const getVariantStyles = () => {
      switch (variant) {
        case 'elevated':
          return {
            backgroundColor: designTokens.colors.backgroundAlpha[85],
            border: 'none',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
          };
        case 'bordered':
          return {
            backgroundColor: designTokens.colors.backgroundAlpha[85],
            border: `1px solid ${designTokens.colors.goldAlpha[20]}`,
            boxShadow: 'none',
          };
        case 'glass':
          return {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'none',
          };
        default:
          return {
            backgroundColor: designTokens.colors.backgroundAlpha[85],
            border: 'none',
            boxShadow: 'none',
          };
      }
    };

    const baseStyles: React.CSSProperties = {
      borderRadius: designTokens.borderRadius.md,
      padding: paddingMap[padding],
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 300ms ease-out',
      ...getVariantStyles(),
      ...(backgroundImage && {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }),
      ...(selected && {
        borderColor: designTokens.colors.gold.primary,
        boxShadow: `0 0 0 2px ${designTokens.colors.gold.primary}`,
      }),
      ...(hover && {
        cursor: 'pointer',
        transform: 'translateY(-2px)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      }),
      ...style,
    };

    return (
      <div ref={ref} className={`card ${className}`} style={baseStyles} {...props}>
        {/* Background overlay for better text readability */}
        {overlay && backgroundImage && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
              zIndex: 1,
            }}
          />
        )}

        {/* Content */}
        <div
          style={{
            position: backgroundImage ? 'relative' : 'static',
            zIndex: overlay ? 2 : 'auto',
            height: '100%',
          }}
        >
          {children}
        </div>
      </div>
    );
  },
);

Card.displayName = 'Card';

// Card Header component for consistent headers
export const CardHeader: React.FC<{
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, action, className = '' }) => (
  <div className={`card-header flex justify-between items-start mb-4 ${className}`}>
    <div>
      {title && (
        <h3
          style={{
            color: designTokens.colors.gold.primary,
            fontSize: '18px',
            fontWeight: designTokens.typography.fontWeight.semibold,
            margin: 0,
          }}
        >
          {title}
        </h3>
      )}
      {subtitle && (
        <p style={{ color: designTokens.colors.chrome, fontSize: '14px', margin: '4px 0 0 0' }}>
          {subtitle}
        </p>
      )}
    </div>
    {action && <div className='card-action'>{action}</div>}
  </div>
);

// Card Content component for consistent content spacing
export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`card-content ${className}`}>{children}</div>
);

// Card Footer component for consistent footers
export const CardFooter: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div className={`card-footer mt-4 pt-4 border-t border-gray-200 ${className}`}>{children}</div>
);

export default Card;
