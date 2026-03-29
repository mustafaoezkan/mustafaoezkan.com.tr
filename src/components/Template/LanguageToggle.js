import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  return (
    <button
      type="button"
      className="language-toggle"
      onClick={toggleLanguage}
      aria-label={`Switch to ${language === 'en' ? 'Turkish' : 'English'}`}
      title={language === 'en' ? 'Türkçe' : 'English'}
    >
      {language === 'en' ? 'TR' : 'EN'}
    </button>
  );
};

export default LanguageToggle;
