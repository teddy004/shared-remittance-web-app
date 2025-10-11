"use client"

import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LanguageSelector } from "@/components/language-selector"
import {
  Bell,
  Gift,
  HelpCircle,
  Home,
  MoreHorizontal,
  Repeat2,
  Send,
  Settings,
  TrendingUp,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useTranslation } from "@/lib/use-translation"
import { DashboardNavLink } from "./dashboard-nav-link"

export function DashboardNav() {
  const { user } = useAuth()
  const { t } = useTranslation()

  const dashboardNavItems = [
    { href: "/dashboard", labelKey: "dashboard" as const, icon: Home },
    { href: "/dashboard/send", labelKey: "send" as const, icon: Send },
    { href: "/dashboard/transactions", labelKey: "transactions" as const, icon: Repeat2 },
    { href: "/dashboard/gifts", labelKey: "gifts" as const, icon: Gift },
    { href: "/dashboard/investments", labelKey: "investments" as const, icon: TrendingUp },
    { href: "/dashboard/settings", labelKey: "settings" as const, icon: Settings },
    { href: "/help", labelKey: "help" as const, icon: HelpCircle },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Desktop and Tablet Header */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground">
              G
            </div>
            <span className="hidden text-xl font-bold sm:inline">GoozX</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {dashboardNavItems.slice(0, 4).map((item) => (
              <DashboardNavLink
                key={item.href}
                href={item.href}
                label={t(item.labelKey)}
                icon={item.icon}
              />
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MoreHorizontal className="h-4 w-4" />
                  More
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>More Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dashboardNavItems.slice(4).map((item) => (
                  <Link key={item.href} href={item.href}>
                    <DropdownMenuItem className="gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{t(item.labelKey)}</span>
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <Link href="/dashboard/settings">
            <Avatar className="h-8 w-8 cursor-pointer">
              {user?.avatar && <AvatarImage src={user.avatar} />}
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user ? user.name.split(" ").map((n: any[]) => n[0]).join("") : "G"}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t bg-background p-1 md:hidden">
        {dashboardNavItems.slice(0, 5).map((item) => (
          <DashboardNavLink
            key={item.href}
            href={item.href}
            label={t(item.labelKey)}
            icon={item.icon}
            isMobile
          />
        ))}
      </nav>
    </header>
  )
}