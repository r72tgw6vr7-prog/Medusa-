import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** 'primary' for main sections (Gallery, Process, Studio), 'secondary' for supporting sections (Testimonials, Partners, Pricing) */
  level?: 'primary' | 'secondary';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  level = 'primary',
}) => {
  // Primary: uses H2 token, Secondary: uses H3 token
  const headingClasses =
    level === 'primary'
      ? 'font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-(--color-text-primary)'
      : 'font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-(--color-text-primary)';

  const Tag = level === 'primary' ? 'h2' : 'h3';

  return (
    <div className='text-center space-y-4'>
      {eyebrow && (
        <p className='text-(length:--text-sm) uppercase tracking-widest font-medium text-brand-chrome mb-(--space-2)'>
          {eyebrow}
        </p>
      )}
      <Tag className={headingClasses}>{title}</Tag>
      {subtitle && (
        <p
          className='text-(length:--text-lg) text-brand-chrome max-w-2xl mx-auto font-body font-semibold leading-(--line-height-normal) mt-4'
          style={{ textShadow: '0 0 12px var(--chrome-glow-soft)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
