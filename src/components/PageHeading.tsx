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
    <div className='premium-section-intro'>
      {eyebrow && <p className='premium-eyebrow'>{eyebrow}</p>}
      <Tag className={headingClasses}>{title}</Tag>
      <div
        className='premium-divider premium-divider--short premium-divider--center'
        aria-hidden='true'
      />
      {subtitle && (
        <p className='premium-subtitle reading-measure mx-auto font-body font-semibold'>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeading;
