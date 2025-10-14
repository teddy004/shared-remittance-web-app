import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"
import AppContent from "./client-layout"

export const metadata: Metadata = {
  title: "GoozX - Empowering Cross-Border Connections Through Innovation",
  description: "Send money home with purpose. A modern remittance platform for Ethiopian diaspora.",
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <Providers>
          <AppContent>{children}</AppContent>
        </Providers>
      </body>
    </html>
  )
}
