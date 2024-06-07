import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'cyr',
    resources: {
      en: {
        translation: {
          course_catalogue: "COURSE CATALOGUE",
        },
      },
      lat: {
        translation: {
          course_catalogue: "KATALOG PREDMETA",
        },
      },
      cyr: {
        translation: {
          course_catalogue: "КАТАЛОГ ПРЕДМЕТА",
        },
      },
    },
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });
