import Link from "next/link"
import { Shield, Zap, DollarSign, CheckCircle, Globe, TrendingDown } from "@/lib/icons"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-background via-accent/10 to-background py-24">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-4xl space-y-10">
            <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-primary leading-tight">REMITTANCE</h1>
            <p className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto font-medium">
              Fast, secure, and affordable international money transfers. Send Money Across borders, Instantly.
            </p>
            <div className="flex items-center justify-center gap-5 pt-6">
              <Link href="/onboarding" className="btn-primary">
                Get Started
              </Link>
              <Link href="#why-choose" className="btn-secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid gap-16 lg:grid-cols-2 items-center max-w-7xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-text-primary mb-6">Connecting Families Across Borders</h2>
              <p className="text-lg text-text-secondary leading-relaxed">
                Remittance transfers money from one person to another, typically across international borders. It's a
                vital financial service for millions of people working abroad to support their loved ones back home.
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                With GoozX Remittance, we make these transfers faster, safer, and more affordable than ever before,
                breaking down barriers and connecting families across continents.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="card hover:shadow-xl hover:scale-105 transition-all duration-300 space-y-4">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <Shield className="w-7 h-7 text-on-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Secure</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  Bank-level encryption and SSL protection
                </p>
              </div>

              <div className="card hover:shadow-xl hover:scale-105 transition-all duration-300 space-y-4">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <Zap className="w-7 h-7 text-on-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Fast</h3>
                <p className="text-base text-text-secondary leading-relaxed">Transfers completed in minutes</p>
              </div>

              <div className="card hover:shadow-xl hover:scale-105 transition-all duration-300 space-y-4">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <DollarSign className="w-7 h-7 text-on-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Affordable</h3>
                <p className="text-base text-text-secondary leading-relaxed">Low fees and great exchange rates</p>
              </div>

              <div className="card hover:shadow-xl hover:scale-105 transition-all duration-300 space-y-4">
                <div className="w-14 h-14 bg-primary rounded-lg flex items-center justify-center shadow-md">
                  <CheckCircle className="w-7 h-7 text-on-primary" />
                </div>
                <h3 className="text-xl font-bold text-text-primary">Verified & Compliant</h3>
                <p className="text-base text-text-secondary leading-relaxed">
                  KYC verified and fully compliant with international standards
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-choose" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-text-primary">Why Choose Remittance?</h2>
            <p className="text-xl text-text-secondary leading-relaxed">
              We understand the importance of every transaction. That's why we've built a platform that prioritizes
              security, speed, and transparency.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
            <div className="card hover:shadow-xl hover:scale-105 transition-all duration-300 space-y-6 text-center">
              <div className="w-20 h-20 bg-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-on-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Verified & Compliant</h3>
              <p className="text-base text-text-secondary leading-relaxed">
                KYC verified and fully compliant with FinCEN and international standards
              </p>
            </div>

            <div className="card hover:shadow-xl hover:scale-105 transition-all duration-300 space-y-6 text-center">
              <div className="w-20 h-20 bg-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <Globe className="w-10 h-10 text-on-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Multi-Language Support</h3>
              <p className="text-base text-text-secondary leading-relaxed">
                English, Amharic, and Oromo support for your convenience
              </p>
            </div>

            <div className="card hover:shadow-xl hover:scale-105 transition-all duration-300 space-y-6 text-center">
              <div className="w-20 h-20 bg-primary rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <TrendingDown className="w-10 h-10 text-on-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Competitive Rates</h3>
              <p className="text-base text-text-secondary leading-relaxed">Great rates with low and transparent fees</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mx-auto max-w-4xl space-y-10">
            <h2 className="text-5xl md:text-6xl font-bold text-on-primary leading-tight">Ready to Get Started?</h2>
            <p className="text-xl text-on-primary/95 leading-relaxed max-w-3xl mx-auto">
              Join thousands of users who trust GoozX Remittance for their international money transfers. Create your
              account in minutes and start sending money securely today.
            </p>
            <div className="flex items-center justify-center gap-5 pt-6">
              <Link
                href="/onboarding"
                className="bg-white text-primary px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
