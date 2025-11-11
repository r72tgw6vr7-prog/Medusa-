import React from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  alignment?: 'left' | 'center' | 'right';
  maxWidth?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  alignment = 'left',
  maxWidth,
  className = '',
  children,
}: PageHeaderProps) {
  const alignClass = alignment === 'center' ? 'text-center' : alignment === 'right' ? 'text-right' : 'text-left';
  const containerStyle = maxWidth ? { maxWidth } : undefined;
  return (
    <header className={`w-full py-16 ${className}`}>
      <div className="container mx-auto px-8 sm:px-8 lg:px-8" style={containerStyle}>
        {eyebrow && (
          <div className={`text-sm text-white/70 uppercase tracking-wider font-medium mb-8 ${alignClass}`}>{eyebrow}</div>
        )}
        <h1 className={`font-playfair text-4xl md:text-5xl font-semibold text-(--brand-gold) mb-8 ${alignClass}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-white/80 text-lg md:text-xl mb-8 ${alignClass}`}>{subtitle}</p>
        )}
        {children}
      </div>
    </header>
  );
}

export default PageHeader;
