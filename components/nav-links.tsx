"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
]

export function NavLinks() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-4 text-sm text-foreground/80">
      {navLinks.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={pathname === href ? "text-primary font-semibold" : "hover:text-foreground"}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
