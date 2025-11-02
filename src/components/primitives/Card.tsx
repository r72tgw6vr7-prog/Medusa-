/**
 * Card Primitive Component
 * ========================
 * A design-system-compliant card component with equal-height layout baked in.
 *
 * Features:
 * - Automatic equal-height layout (flex flex-col h-full)
 * - Slot-based architecture (header, body, footer)
 * - Footer auto-pushes to bottom (mt-auto)
 * - Built-in hover transitions
 * - 100% spacing compliance (8px grid)
 *
 * Usage:
 * <Card variant="default" hover={true}>
 *   <Card.Header>Title content</Card.Header>
 *   <Card.Body>Main content</Card.Body>
 *   <Card.Footer>CTA or actions</Card.Footer>
 * </Card>
 */

import React from 'react';

// ============================================
// Types
// ============================================

type CardVariant = 'default' | 'elevated' | 'outlined' | 'glass';
type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  padding?: CardPadding;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
  role?: string;
  tabIndex?: number;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

interface CardSlotProps {
  children: React.ReactNode;
  className?: string;
}

// ============================================
// Design System Tokens (8px grid compliant)
// ============================================

const VARIANT_STYLES: Record<CardVariant, string> = {
  default: 'bg-[#1A1A1A] border border-white/10',
  elevated: 'bg-[#1A1A1A] shadow-lg shadow-black/50',
  outlined: 'bg-transparent border-2 border-[#D4AF37]',
  glass: 'bg-white/5 backdrop-blur-md border border-white/10',
};

const PADDING_STYLES: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-16', // 16px = 2 × 8
  md: 'p-24', // 24px = 3 × 8
  lg: 'p-32', // 32px = 4 × 8
};

const HOVER_STYLES =
  'hover:scale-[1.02] hover:shadow-xl hover:shadow-gold-glow transition-all duration-300 ease-out';

// ============================================
// Main Card Component
// ============================================

export const Card: React.FC<CardProps> & {
  Header: typeof CardHeader;
  Body: typeof CardBody;
  Footer: typeof CardFooter;
} = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = true,
  className = '',
  onClick,
  role = 'region',
  tabIndex,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  'aria-describedby': ariaDescribedBy,
  ...props
}) => {
  const baseClasses = 'flex flex-col h-full rounded-lg transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500';
  const variantClasses = VARIANT_STYLES[variant];
  const paddingClasses = PADDING_STYLES[padding];
  const hoverClasses = hover ? 'hover:transform hover:-translate-y-1 hover:shadow-xl' : '';
  const isClickable = !!onClick;
  const cardRole = isClickable ? 'button' : role;
  const cardTabIndex = tabIndex !== undefined ? tabIndex : (isClickable ? 0 : undefined);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick?.();
    }
  };

  const classes = [
    baseClasses,
    variantClasses,
    paddingClasses,
    hoverClasses,
    isClickable ? 'cursor-pointer' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div
      className={classes}
      onClick={onClick}
      role={cardRole}
      tabIndex={cardTabIndex}
      onKeyDown={isClickable ? handleKeyDown : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      {...(isClickable ? { 'data-clickable': 'true' } : {})}
      {...props}
    >
      {children}
    </div>
  );
};

// ============================================
// Card Header Slot
// ============================================

const CardHeader: React.FC<CardSlotProps> = ({ children, className = '' }) => {
  return <div className={`flex-shrink-0 mb-16 ${className}`.trim()}>{children}</div>;
};

// ============================================
// Card Body Slot
// ============================================

const CardBody: React.FC<CardSlotProps> = ({ children, className = '' }) => {
  return <div className={`flex-grow ${className}`.trim()}>{children}</div>;
};

// ============================================
// Card Footer Slot (auto-pushes to bottom)
// ============================================

const CardFooter: React.FC<CardSlotProps> = ({ children, className = '' }) => {
  return <div className={`flex-shrink-0 mt-auto pt-16 ${className}`.trim()}>{children}</div>;
};

// ============================================
// Attach Slots to Card
// ============================================

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// ============================================
// Export
// ============================================

export default Card;
