import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en/translation.json';
import frTranslations from './locales/fr/translation.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      fr: { translation: frTranslations },
    },
    lng: 'fr', // Langue par défaut définie sur 'fr'
    fallbackLng: 'fr', // Langue de repli définie sur 'fr'
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
