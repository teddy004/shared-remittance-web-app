"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "@/lib/icons"
import { SocialLink } from "@/components/social-link"
import { FooterLinkGroup } from "@/components/footer-link-group" 
import { useTranslation } from "@/lib/use-translation"

const socialLinks = [
  { href: "#", icon: Facebook },
  { href: "#", icon: Twitter },
  { href: "#", icon: Instagram },
  { href: "#", icon: Linkedin },
]

const quickLinks = {
  titleKey: "quickLinks" as const,
  links: [
    { href: "/about", labelKey: "aboutUs" as const },
    { href: "/services", labelKey: "services" as const },
    { href: "/faq", labelKey: "faq" as const },
    { href: "/contact", labelKey: "contactUs" as const },
  ],
}

const legalLinks = {
  titleKey: "legal" as const,
  links: [
    { href: "/privacy", labelKey: "privacyPolicy" as const },
    { href: "/terms", labelKey: "termsOfService" as const },
    { href: "/compliance", labelKey: "compliance" as const },
    { href: "/security", labelKey: "security" as const },
  ],
}

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-background border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-purple-600">GoozX</h3>
            <p className="text-base text-text-secondary leading-relaxed">
              {t("footerDescription")}
            </p>
            <div className="flex gap-4 pt-2">
              {socialLinks.map((link) => (
                <SocialLink key={link.href + link.icon.displayName} href={link.href} icon={link.icon} />
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterLinkGroup title={t(quickLinks.titleKey)} links={quickLinks.links.map(link => ({...link, label: t(link.labelKey)}))} />

          {/* Legal */}
          <FooterLinkGroup title={t(legalLinks.titleKey)} links={legalLinks.links.map(link => ({...link, label: t(link.labelKey)}))} />

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">{t("contact")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>support@goozx.com</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>
                  123 Business St, Suite 100
                  <br />
                  San Francisco, CA 94105
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-base text-text-secondary">
          <p>&copy; 2025 GoozX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
