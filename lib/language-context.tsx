"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "en" | "am" | "om"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "app_language"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  // On initial mount, try to read the language from localStorage
  useEffect(() => {
    try {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
      if (storedLanguage && ["en", "am", "om"].includes(storedLanguage)) {
        setLanguage(storedLanguage as Language)
      }
    } catch (error) {
      console.error("Error reading language from localStorage", error)
    }
  }, [])

  // When the language changes, save it to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    } catch (error) {
      console.error("Error saving language to localStorage", error)
    }
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}