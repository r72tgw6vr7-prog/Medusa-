import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

/**
 * LanguageSwitcher Component
 * UI component for switching between languages
 */
export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage();

  // Function to handle language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        type='button'
        onClick={() => handleLanguageChange('de')}
        className={`px-2 py-1 text-sm transition-colors duration-200 ${
          language === 'de'
            ? 'text-brand-gold font-bold'
            : 'text-brand-chrome hover:text-brand-gold'
        }`}
        aria-label='Switch to German'
        aria-pressed={language === 'de'}
      >
        DE
      </button>
      <span className='text-brand-chrome text-opacity-50'>|</span>
      <button
        type='button'
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 text-sm transition-colors duration-200 ${
          language === 'en'
            ? 'text-brand-gold font-bold'
            : 'text-brand-chrome hover:text-brand-gold'
        }`}
        aria-label='Switch to English'
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSwitcher;
