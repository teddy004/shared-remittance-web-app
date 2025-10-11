import type React from "react"
import Link from "next/link"
import { NavLinks } from "@/components/nav-links"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import type { Metadata } from "next"
import { Inter, Poppins, JetBrains_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Zemna - Empowering Cross-Border Connections Through Innovation",
  description:
    "Send money home with purpose. A modern remittance platform for Ethiopian diaspora powered by Goozam Technologies.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('serviceWorker' in navigator) {
                  Object.defineProperty(navigator.serviceWorker, 'register', {
                    value: function() {
                      return Promise.resolve({ unregister: function() { return Promise.resolve(true); } });
                    },
                    writable: false,
                    configurable: false
                  });
                }
                window.addEventListener('unhandledrejection', function(event) {
                  if (event.reason && 
                      ((event.reason.name === 'InvalidStateError' && 
                        event.reason.message && 
                        event.reason.message.includes('ServiceWorker')) ||
                       (typeof event.reason === 'string' && event.reason.includes('ServiceWorker')))) {
                    event.preventDefault();
                  }
                });
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <header className="border-b bg-white sticky top-0 z-50">
          <div className="container mx-auto flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-6">
              <span className="text-xl font-bold text-foreground">GoozX</span>
              <NavLinks />
            </div>

            <div className="flex items-center gap-6">
              <LanguageSelector />
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="text-foreground hover:text-primary"
                >
                  Login
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button className="gradient-purple-pink text-white rounded-lg px-8">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {children}

        <footer className="bg-gray-50 py-12 border-t">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">GoozX</h3>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                      title="About us"
                      rel="noopener noreferrer"
                      prefetch={false}
                      target="_blank"
                    >
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Payments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Security
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      System Status
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Cookie Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Compliance
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
