// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import des traductions
import translationFR from './components/translations/fr.json';
import translationEN from './components/translations/en.json';

const resources = {
  en: { translation: translationEN },
  fr: { translation: translationFR },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // langue par défaut
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false, // react déjà protège contre les XSS
    },
  });

export default i18n;
