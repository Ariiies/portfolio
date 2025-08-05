// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['es', 'en'], // Idiomas soportados
    fallbackLng: 'en',          // Idioma de respaldo
    backend: {
      // Ruta donde estarán tus archivos de traducción
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;