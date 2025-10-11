import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "@/lib/icons"

export function Footer() {
  return (
    <footer className="bg-background border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <h3 className="text-2xl font-bold text-primary">GoozX</h3>
            <p className="text-base text-text-secondary leading-relaxed">
              Empowering cross-border connections through innovation. Send money home with purpose.
            </p>
            <div className="flex gap-4 pt-2">
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-text-secondary hover:text-on-primary hover:bg-primary hover:border-transparent transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-text-secondary hover:text-on-primary hover:bg-primary hover:border-transparent transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-text-secondary hover:text-on-primary hover:bg-primary hover:border-transparent transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-text-secondary hover:text-on-primary hover:bg-primary hover:border-transparent transition-all duration-300 hover:scale-110 shadow-sm"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/compliance" className="text-muted-foreground hover:text-primary transition-colors">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-muted-foreground hover:text-primary transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contact</h4>
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
