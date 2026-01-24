import React from 'react';

interface PageHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Use 'secondary' for non-page-level headings that should be h2/h3 instead of h1 */
  level?: 'hero' | 'secondary';
}

/**
 * PageHeading - For page-level headings
 * - 'hero' (default): h1 with largest scale (text-4xl to text-7xl) - USE ONLY ONCE PER PAGE
 * - 'secondary': h3 with smaller scale for supporting sections
 */
export const PageHeading: React.FC<PageHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  level = 'hero',
}) => {
  // Hero (h1): use H1 token, Secondary (h3): use H3 token
  const headingClasses =
    level === 'hero'
      ? 'font-headline text-(length:--text-h1) font-bold tracking-tight leading-tight text-(--color-text-primary)'
      : 'font-headline text-(length:--text-h2) font-bold tracking-tight leading-tight text-(--color-text-primary)';

  const Tag = level === 'hero' ? 'h1' : 'h3';

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

export default PageHeading;
