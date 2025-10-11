"use client";

import { useLanguage } from "./language-context";
import { translations } from "./translations";

export function useTranslation() {
  const { language, setLanguage } = useLanguage();

  const t = (key: keyof typeof translations.en) => {
    // Fallback to English if a translation is missing or if the key is not found in the current language.
    return (translations[language]?.[key] || translations["en"][key]) as string;
  };

  return { t, language, setLanguage };
}