"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/nav-links";
import { LanguageSelector } from "@/components/language-selector";
import { Bell } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { MobileNav } from "@/components/mobile-nav";
import { useAuth } from "@/lib/auth-context";
import { useTranslation } from "@/lib/use-translation";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();
  const router = useRouter();
  const unreadCount = 2; // Mock unread count

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="border-b border-gray-200/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-bold text-purple-600 hover:scale-105 transition-transform"
          >
            GoozX
          </Link>
          <NavLinks />
        </div>

        <div className="hidden md:flex items-center gap-6">
          <LanguageSelector />
          <Link href="/dashboard/notifications">
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-gray-100/50 transition-colors"
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </Link>
          {isAuthenticated ? (
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-red-600 hover:text-red-700 font-medium text-base"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-text-secondary hover:text-purple-600 font-medium text-base"
              >
                {t("login")}
              </Button>
            </Link>
          )}
          <Link href="/onboarding">
            <Button className="btn-primary">{t("getStarted")}</Button>
          </Link>
        </div>
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

// User Header for authenticated users
export function UserHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const unreadCount = 2; // Mock unread count

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-xl font-bold text-purple-600 hover:scale-105 transition-transform"
          >
            GoozX
          </Link>
          <div className="hidden md:block text-sm text-gray-600">
            Welcome back, {user?.name?.split(" ")[0] || "User"}
          </div>
        </div>

        <div className="flex items-center gap-4">
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

          <div className="hidden md:flex items-center gap-3 text-sm">
            <div className="text-right">
              <p className="font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 font-medium text-sm"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
