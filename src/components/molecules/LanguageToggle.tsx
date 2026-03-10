import React from 'react';

interface LanguageToggleProps {
  language?: 'de' | 'en';
  onLanguageChange?: (language: 'de' | 'en') => void;
  germanAriaLabel?: string;
  englishAriaLabel?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  language = 'de',
  onLanguageChange,
  germanAriaLabel = 'Zu Deutsch wechseln',
  englishAriaLabel = 'Zu Englisch wechseln',
}) => {
  const isGerman = language === 'de';

  const handleGermanClick = () => {
    onLanguageChange?.('de');
  };

  const handleEnglishClick = () => {
    onLanguageChange?.('en');
  };

  return (
    <div className='language-toggle' role='group' aria-label='Sprachauswahl'>
      <div
        className={`language-toggle__indicator ${isGerman ? '' : 'language-toggle__indicator--en'}`}
      />

      {/* DE Button */}
      <button
        onClick={handleGermanClick}
        type='button'
        className={`language-toggle__button ${isGerman ? 'language-toggle__button--active' : 'language-toggle__button--inactive'}`}
        aria-label={germanAriaLabel}
        aria-pressed={isGerman}
      >
        DE
      </button>

      {/* EN Button */}
      <button
        onClick={handleEnglishClick}
        type='button'
        className={`language-toggle__button ${isGerman ? 'language-toggle__button--inactive' : 'language-toggle__button--active'}`}
        aria-label={englishAriaLabel}
        aria-pressed={!isGerman}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
