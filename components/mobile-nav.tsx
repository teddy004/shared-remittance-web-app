"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLinks } from "./nav-links";
import { useTranslation } from "@/lib/use-translation";
import { useAuth } from "@/lib/auth-context";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setOpen(false);
    router.push("/login");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="p-4">
          <Link
            href="/"
            className="text-2xl font-bold text-purple-600 mb-8 block"
            onClick={() => setOpen(false)}
          >
            GoozX
          </Link>
          <nav className="flex flex-col gap-4">
            <NavLinks isMobile onLinkClick={() => setOpen(false)} />
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  {t("login")}
                </Button>
              </Link>
            )}
            <Link href="/onboarding" onClick={() => setOpen(false)}>
              <Button className="btn-primary w-full">{t("getStarted")}</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
