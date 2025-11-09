import React from 'react';

interface PageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export const PageBackground: React.FC<PageBackgroundProps> = ({ children, className = '' }) => {
  return (
    <div className={`min-h-screen relative ${className}`}>
      {/* Fixed background image */}
      <div
        className='fixed inset-0 z-20'
        style={{
          backgroundImage: 'url("/assets/images/photos/backgrounds/process-timeline-bg.webp")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay to ensure text readability */}
        <div
          className='absolute inset-0'
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(2px)',
          }}
        />
      </div>

      {/* Content with proper z-index to appear above background */}
      <div className='relative z-20'>{children}</div>
    </div>
  );
};
