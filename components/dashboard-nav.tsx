"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Send, DollarSign, ShoppingCart, TrendingUp } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { mockUser } from "@/lib/mock-data"

const Bell = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

const Store = ShoppingCart
const ShoppingBag = ShoppingCart

const navItems = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/dashboard/send", label: "Send", icon: Send },
  { href: "/dashboard/request", label: "Request", icon: DollarSign },
  { href: "/dashboard/marketplace", label: "Pay Bills", icon: Store },
  { href: "/dashboard/investments", label: "Invest", icon: TrendingUp },
  { href: "/dashboard/gifts", label: "Gifts", icon: ShoppingBag },
]

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-lg font-bold">Z</span>
            </div>
            <span className="hidden text-xl font-bold sm:inline">GoozX</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.slice(0, 4).map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    size="sm"
                    className={cn("gap-2", isActive && "bg-primary/10 text-primary")}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <Link href="/dashboard/settings">
            <Avatar className="h-8 w-8 cursor-pointer">
              <AvatarImage src={mockUser.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {mockUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>
      </div>

      <nav className="flex items-center justify-around border-t bg-background p-2 md:hidden overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                size="sm"
                className={cn("flex-col gap-1 h-auto py-2 min-w-[60px]", isActive && "text-primary")}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
