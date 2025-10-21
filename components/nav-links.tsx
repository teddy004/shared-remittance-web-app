"use client"

import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/use-translation"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", labelKey: "home" as const },
  { href: "/services", labelKey: "services" as const },
  { href: "/about", labelKey: "aboutUs" as const },
  { href: "/contact", labelKey: "contactUs" as const },
  { href: "/faq", labelKey: "faq" as const },
]

interface NavLinksProps {
  isMobile?: boolean
  onLinkClick?: () => void
}

export function NavLinks({ isMobile = false, onLinkClick }: NavLinksProps) {
  const { t } = useTranslation()
  const pathname = usePathname()

  return (
    <nav
      className={cn(
        "items-center gap-4 text-sm text-foreground/80",
        isMobile ? "flex flex-col items-start text-base" : "hidden md:flex",
      )}
    >
      {navLinks.map(({ href, labelKey }) => (
        <Link
          key={href}
          href={href}
          className={cn("transition-colors", pathname === href ? "text-purple-600 font-semibold" : "hover:text-foreground")}
          onClick={onLinkClick}
        >
          {t(labelKey)}
        </Link>
      ))}
    </nav>
  )
}
