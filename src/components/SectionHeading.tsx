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
  // Primary: text-3xl md:text-4xl lg:text-5xl (30-48px)
  // Secondary: text-2xl md:text-3xl lg:text-4xl (24-36px)
  const headingClasses = level === 'primary'
    ? 'font-headline text-[length:var(--heading-section-primary-fluid)] font-bold tracking-tight leading-tight text-[var(--accent-chrome)]'
    : 'font-headline text-[length:var(--heading-section-secondary-fluid)] font-semibold tracking-normal leading-snug text-[var(--accent-chrome)]';

  const Tag = level === 'primary' ? 'h2' : 'h3';

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

export default SectionHeading;
