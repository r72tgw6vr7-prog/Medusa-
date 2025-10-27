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
  Header: React.FC<CardSlotProps>;
  Body: React.FC<CardSlotProps>;
  Footer: React.FC<CardSlotProps>;
} = ({ children, variant = 'default', padding = 'md', hover = true, className = '', onClick }) => {
  const variantClass = VARIANT_STYLES[variant];
  const paddingClass = PADDING_STYLES[padding];
  const hoverClass = hover ? HOVER_STYLES : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`
        flex flex-col h-full
        rounded-2xl
        overflow-hidden
        ${variantClass}
        ${paddingClass}
        ${hoverClass}
        ${clickableClass}
        ${className}
      `
        .trim()
        .replace(/\s+/g, ' ')}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => (e.key === 'Enter' || e.key === ' ') && onClick() : undefined}
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
