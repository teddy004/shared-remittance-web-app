"use client";

import { usePathname } from "next/navigation";
import { Header, UserHeader } from "@/components/header";
import { useAuth } from "@/lib/auth-context";

export function ConditionalHeader() {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  // Don't render header until auth state is loaded to prevent flickering
  if (isLoading) {
    return null;
  }

  // Show UserHeader for dashboard and authenticated pages
  const isDashboardRoute = pathname?.startsWith("/dashboard");

  if (isAuthenticated && isDashboardRoute) {
    return <UserHeader />;
  }

  // Show regular header for public pages or when not authenticated
  return <Header />;
}
