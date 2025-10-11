import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/language-selector";
import {
  Shield,
  Zap,
  DollarSign,
  CheckCircle,
  Globe,
  TrendingUp,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header moved to global layout */}

      <section className="min-h-[60vh] flex items-center justify-center bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground font-[family-name:var(--font-playfair)]">
              REMITTANCE
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Fast, secure, and affordable international money transfers. Send
              Money Across borders, Instantly.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/onboarding">
                <Button
                  size="lg"
                  className="gradient-purple-pink text-white rounded-lg px-8 py-[14px]"
                >
                  Get Started
                </Button>
              </Link>
              <Link href="#why-choose">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-foreground text-foreground hover:bg-gray-50 rounded-lg px-8 py-[14px] bg-white"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-grayish-purple bg-[rgba(239,237,239,1)]">
        <div className="container mx-auto px-6 bg-[rgba(239,237,239,1)]">
          <div className="grid gap-12 lg:grid-cols-2 items-start max-w-6xl mx-auto bg-[rgba(239,237,239,1)]">
            {/* Left column: Descriptive text per spec */}
            <div className="space-y-6">
              <p className="text-base text-muted-foreground leading-relaxed">
                Remittance transfers money from one person to another, typically
                across international borders. It's a vital financial service for
                millions of people working abroad to support their loved ones
                back home.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                With GoozX Remittance, we make these transfers faster, safer,
                and more affordable than ever before, breaking down barriers and
                connecting families across continents.
              </p>
            </div>

            {/* Right column: 2x2 grid per spec with icons, hover effects, light purple backgrounds */}
            <div className="grid gap-6 grid-cols-2">
              <div
                className="p-8 rounded-xl border border-border card-shadow card-hover space-y-3 bg-[rgba(239,237,239,1)]"
                style={{ backgroundColor: "#F3E8FF" }}
              >
                <Shield className="w-8 h-8 text-primary mb-2" />
                <h3 className="text-lg font-bold text-foreground">Secure</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Bank-level encryption and SSL protection
                </p>
              </div>

              <div
                className="p-8 rounded-xl border border-border card-shadow card-hover space-y-3 bg-[rgba(239,237,239,1)]"
                style={{ backgroundColor: "#F3E8FF" }}
              >
                <Zap className="w-8 h-8 text-primary mb-2" />
                <h3 className="text-lg font-bold text-foreground">Fast</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Transfers completed in minutes
                </p>
              </div>

              <div
                className="p-8 rounded-xl border border-border card-shadow card-hover space-y-3 bg-[rgba(239,237,239,1)]"
                style={{ backgroundColor: "#F3E8FF" }}
              >
                <DollarSign className="w-8 h-8 text-primary mb-2" />
                <h3 className="text-lg font-bold text-foreground">
                  Affordable
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Low fees and great exchange rates
                </p>
              </div>

              <div
                className="p-8 rounded-xl border border-border card-shadow card-hover space-y-3 bg-[rgba(239,237,239,1)]"
                style={{ backgroundColor: "#F3E8FF" }}
              >
                <CheckCircle className="w-8 h-8 text-primary mb-2" />
                <h3 className="text-lg font-bold text-foreground">
                  Verified & Compliant
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  KYC verified and fully compliant with international standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-choose" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
              Why Choose Remittance?
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              We understand the importance of every transaction. That's why
              we've built a platform that prioritizes security, speed, and
              transparency.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            <div className="p-8 rounded-xl bg-white border border-border card-shadow card-hover space-y-4 text-center">
              <CheckCircle className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-bold text-foreground">
                Verified & Compliant
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                KYC verified and fully compliant with FinCEN and international
                standards
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border border-border card-shadow card-hover space-y-4 text-center">
              <Globe className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-bold text-foreground">
                Multi-Language Support
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                English, Amharic, and Oromo support for your convenience
              </p>
            </div>

            <div className="p-8 rounded-xl bg-white border border-border card-shadow card-hover space-y-4 text-center">
              <TrendingUp className="w-10 h-10 text-primary mx-auto mb-2" />
              <h3 className="text-lg font-bold text-foreground">
                Competitive Rates
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Great rates with low and transparent fees
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 gradient-purple-pink bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-4xl font-semibold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-base text-white/90 leading-relaxed">
              Join thousands of users who trust GoozX Remittance for their
              international money transfers. Create your account in minutes and
              start sending money securely today.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link href="/onboarding">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 rounded-lg px-8 py-[14px]"
                >
                  Get Started
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 rounded-lg px-8 py-[14px] bg-transparent"
              >
                Contact
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer moved to global layout */}
    </div>
  );
}
