import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { LanguageProvider } from "@/lib/language-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GoozX - Empowering Cross-Border Connections Through Innovation",
  description: "Send money home with purpose. A modern remittance platform for Ethiopian diaspora.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <LanguageProvider>
          <AuthProvider>
            <Header />

            <main className="flex-1">{children}</main>

            <Footer />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
