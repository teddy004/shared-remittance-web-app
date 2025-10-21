"use client"

import { AuthProvider } from "@/lib/auth-context"
import { LanguageProvider } from "@/lib/language-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </AuthProvider>
  )
}