"use client";

import type React from "react";
import { Header, UserHeader } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";
import { ConditionalHeader } from "@/components/conditional-header";

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ConditionalHeader />

        <main className="flex-1">{children}</main>

        <Footer />
      </AuthProvider>
    </LanguageProvider>
  );
}
