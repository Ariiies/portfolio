// src/components/ui/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (e) => {
    const newLang = e.target.checked ? 'en' : 'es';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="language-switch">
      <span>ES</span>
      <label className="switch">
        <input 
          type="checkbox" 
          checked={i18n.language === 'en'} 
          onChange={handleLanguageChange} 
        />
        <span className="slider round"></span>
      </label>
      <span>EN</span>
    </div>
  );
};

export default LanguageSwitcher;