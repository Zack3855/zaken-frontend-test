import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "./translations/English.json";
import frenchTranslation from "./translations/French.json";
import russianTranslation from "./translations/Russian.json";
import germanTranslation from "./translations/German.json";

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: "eng",
    resources: {
      eng: { translation: enTranslation },
      fra: { translation: frenchTranslation },
      rus: { translation: russianTranslation },
      ger: { translation: germanTranslation },
    },
  });
