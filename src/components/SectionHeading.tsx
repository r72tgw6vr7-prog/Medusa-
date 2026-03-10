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

export default SectionHeading;
