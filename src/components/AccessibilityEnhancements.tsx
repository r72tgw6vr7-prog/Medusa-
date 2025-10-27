import React from 'react';

export const AccessibilityEnhancements: React.FC = () => {
  return (
    <div className='sr-only'>
      {/* Accessibility enhancements for screen readers */}
      <div
        id='skip-link'
        className='sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-brand-gold text-brand-background p-0 z-50'
      >
        Skip to main content
      </div>
    </div>
  );
};

export default AccessibilityEnhancements;
