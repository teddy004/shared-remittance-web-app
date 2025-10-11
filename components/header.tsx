"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { NavLinks } from "@/components/nav-links";
import { LanguageSelector } from "@/components/language-selector";
import { Bell } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const { isAuthenticated, logout } = useAuth();
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
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <span className="text-white font-black text-lg">G</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              GoozX
            </span>
          </Link>
          <NavLinks />
        </div>

        <div className="flex items-center gap-6">
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
              className="text-gray-600 hover:text-purple-600 font-medium text-base hover:bg-purple-50 transition-all duration-200"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-purple-600 font-medium text-base hover:bg-purple-50 transition-all duration-200"
              >
                Login
              </Button>
            </Link>
          )}
          <Link href="/onboarding">
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
