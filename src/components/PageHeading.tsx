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
  // Hero (h1): text-4xl md:text-6xl lg:text-7xl (36-72px)
  // Secondary (h3): text-2xl md:text-3xl lg:text-4xl (24-36px)
  const headingClasses = level === 'hero'
    ? 'font-headline text-(length:--heading-hero-fluid) font-bold tracking-tight leading-tight text-[--brand-accent]'
    : 'font-headline text-(length:--heading-section-secondary-fluid) font-semibold tracking-normal leading-snug text-[--brand-accent]';

  const Tag = level === 'hero' ? 'h1' : 'h3';

  return (
    <div className="text-center space-y-4">
      {eyebrow && (
        <p
          className="text-sm uppercase tracking-widest font-medium text-brand-chrome"
          style={{ marginBottom: 'var(--space-1-5)' }}
        >
          {eyebrow}
        </p>
      )}
      <Tag className={headingClasses}>
        {title}
      </Tag>
      {subtitle && (
        <p className="text-lg text-brand-chrome max-w-2xl mx-auto font-body leading-relaxed mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeading;
