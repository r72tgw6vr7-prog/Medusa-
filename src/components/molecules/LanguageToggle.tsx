import React, { useState } from 'react';

interface LanguageToggleProps {
  onLanguageChange?: (language: 'DE' | 'EN') => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ onLanguageChange }) => {
  const [isGerman, setIsGerman] = useState(true);

  const handleGermanClick = () => {
    setIsGerman(true);
    onLanguageChange?.('DE');
  };

  const handleEnglishClick = () => {
    setIsGerman(false);
    onLanguageChange?.('EN');
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        width: '140px',
        height: '48px',
        backgroundColor: 'rgba(var(--color-text-primary-rgb), 0.1)',
        border: '1px solid rgba(var(--color-text-primary-rgb), 0.15)',
        borderRadius: '9999px',
        padding: '4px',
      }}
    >
      {/* Gold sliding pill */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          left: '4px',
          width: '66px',
          height: '40px',
          backgroundColor: 'var(--brand-accent)',
          borderRadius: '9999px',
          transform: isGerman ? 'translateX(0px)' : 'translateX(66px)',
          transition: 'transform 300ms ease-in-out',
          zIndex: 0,
        }}
      />

      {/* DE Button */}
      <button
        onClick={handleGermanClick}
        className="rounded-full"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '66px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isGerman ? 'var(--deep-black)' : 'var(--color-text-primary)',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '1',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'color 200ms ease-in-out',
        }}
        aria-label='Switch to German'
      >
        DE
      </button>

      {/* EN Button */}
      <button
        onClick={handleEnglishClick}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '66px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isGerman ? 'var(--color-text-primary)' : 'var(--deep-black)',
          fontWeight: 600,
          fontSize: '16px',
          lineHeight: '1',
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          transition: 'color 200ms ease-in-out',
        }}
        aria-label='Switch to English'
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
