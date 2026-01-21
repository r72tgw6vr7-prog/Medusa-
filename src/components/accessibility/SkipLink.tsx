import React, { HTMLAttributes } from 'react';
import { VisuallyHidden } from './VisuallyHidden';

interface SkipLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  targetId?: string;
  /** The label text for screen readers */
  label?: string;
  /** Additional class names to apply */
  className?: string;
}

/**
 * SkipLink component that provides keyboard users with a way to skip to the main content.
 * Renders a visually hidden link that becomes visible when focused.
 */
export const SkipLink = ({
  targetId = 'main-content',
  label = 'Skip to main content',
  className = '',
  ...props
}: SkipLinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  return (
    <a
      href={`#${targetId}`}
      className={`absolute left-0 top-0 z-50 -translate-y-full bg-brand-accent px-4 py-3 font-medium text-luxury-text-primary transition-transform duration-200 focus:translate-y-0 focus:ring-2 focus:ring-brand-chrome focus:ring-offset-2 focus:ring-offset-luxury-bg-dark ${className}`}
      {...props}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      <span aria-hidden='true' className='block'>
        {label}
      </span>
    </a>
  );
};

// Add display name for better debugging
SkipLink.displayName = 'SkipLink';

export default SkipLink;
