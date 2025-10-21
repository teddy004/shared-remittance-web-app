"use client";

import { useLanguage } from "./language-context";
import { translations } from "./translations";

export function useTranslation() {
  const { language, setLanguage } = useLanguage();

  const t = (key: keyof typeof translations.en) => {
    // Fallback to English if a translation is missing or if the key is not found in the current language.
    const langTranslations = translations[language] as Partial<typeof translations.en> | undefined;
    if (langTranslations && key in langTranslations && langTranslations[key] !== undefined) {
      return langTranslations[key] as string;
    }
    return translations["en"][key];
  };

  return { t, language, setLanguage };
}