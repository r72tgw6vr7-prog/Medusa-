import React from 'react';

export interface PageHeaderProps {
  /**
   * Small uppercase label above title
   */
  eyebrow?: string;
  
  /**
   * Main page title
   */
  title: string;
  
  /**
   * Descriptive subtitle below title
   */
  subtitle?: string;
  
  /**
   * Text alignment
   * @default 'center'
   */
  alignment?: 'left' | 'center' | 'right';
  
  /**
   * Maximum width for subtitle
   * @default 'md'
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

const maxWidthMap = {
  sm: 'max-w-xl',   // 576px
  md: 'max-w-2xl',  // 672px
  lg: 'max-w-3xl',  // 768px
  xl: 'max-w-4xl',  // 896px
  full: 'max-w-full'
};

const alignmentMap = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

/**
 * PageHeader Component
 * 
 * Standardized page header with optional eyebrow, title, and subtitle.
 * Supports left, center, and right alignment for visual variety.
 * 
 * @example
 * <PageHeader
 *   eyebrow="Medusa München"
 *   title="Häufige Fragen (FAQ)"
 *   subtitle="Alles, was Sie zur Buchung wissen müssen."
 *   alignment="center"
 * />
 */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  alignment = 'center',
  maxWidth = 'md',
  className = ''
}) => {
  const alignClass = alignmentMap[alignment];
  const maxWClass = maxWidthMap[maxWidth];
  const marginClass = alignment === 'center' ? 'mx-auto' : '';

  return (
    <div className={`space-y-8 mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <p className='text-sm uppercase tracking-[0.3em] text-white/50 font-semibold'>
          {eyebrow}
        </p>
      )}
      <h1 className='font-headline text-5xl md:text-6xl lg:text-7xl text-[var(--brand-gold)]'>
        {title}
      </h1>
      {subtitle && (
        <p className={`text-lg text-[#C0C0C0] font-body leading-relaxed ${maxWClass} ${marginClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
