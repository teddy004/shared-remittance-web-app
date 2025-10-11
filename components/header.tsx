"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { NavLinks } from "@/components/nav-links"
import { LanguageSelector } from "@/components/language-selector"
import { Bell } from "@/lib/icons"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"

export function Header() {
  const { isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const unreadCount = 2 // Mock unread count

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold text-primary hover:scale-105 transition-transform">
            GoozX
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center gap-6">
          <LanguageSelector />
          <Link href="/dashboard/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-error">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </Link>
          {isAuthenticated ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-text-secondary hover:text-primary font-medium text-base"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button variant="ghost" className="text-text-secondary hover:text-primary font-medium text-base">
                Login
              </Button>
            </Link>
          )}
          <Link href="/onboarding">
            <Button className="btn-primary">Get Started</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
