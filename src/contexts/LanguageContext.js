import React, {
  createContext, useContext, useState, useMemo, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import tr from '../i18n/tr';
import en from '../i18n/en';

const translations = { tr, en };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(
    () => localStorage.getItem('language') || 'en',
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === 'en' ? 'tr' : 'en';
      localStorage.setItem('language', next);
      return next;
    });
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let result = translations[language];
      keys.forEach((k) => {
        result = result?.[k];
      });
      return result || key;
    },
    [language],
  );

  const value = useMemo(
    () => ({ language, toggleLanguage, t }),
    [language, toggleLanguage, t],
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => useContext(LanguageContext);
