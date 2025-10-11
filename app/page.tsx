"use client";

import {
  Shield,
  Zap,
  DollarSign,
  CheckCircle,
  Globe,
  TrendingDown,
} from "@/lib/icons";
import Link from "next/link";

const features = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description:
      "Your transfers are protected with 256-bit encryption and multi-factor authentication.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Send money that arrives within 10 minutes to bank accounts and mobile wallets.",
  },
  {
    icon: DollarSign,
    title: "Best Exchange Rates",
    description:
      "Get competitive rates with real-time currency conversion and locked rates.",
  },
  {
    icon: CheckCircle,
    title: "Verified Recipients",
    description:
      "All recipients are verified through our secure KYC process for your peace of mind.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-background via-purple-50 to-background py-20 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-purple-700 leading-tight">
              GoozX Remittance
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-medium">
              Empowering Cross-Border Connections Through Innovation. Send money
              home with purpose to Ethiopia and beyond.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-6">
              <Link
                href="/onboarding"
                className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/services"
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-purple-50 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 items-center max-w-7xl mx-auto">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Connecting Families Across Borders
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                GoozX makes it easy for diaspora communities to send money home
                with confidence. Our secure platform ensures your funds reach
                your loved ones quickly and safely.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                More than just transfers - we provide purpose-driven payments,
                investment opportunities, and a marketplace for Ethiopian goods
                and services.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="card p-6 space-y-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="why-choose" className="py-16 sm:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Why Choose GoozX?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              We're more than a remittance service - we're your trusted
              financial bridge to home.
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <div className="card hover:shadow-xl transition-shadow space-y-6 text-center p-8">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Verified & Secure
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                All recipients are verified through our comprehensive KYC
                process, ensuring secure and compliant transactions.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow space-y-6 text-center p-8">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Multi-Language Support
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Available in English, Amharic, and Oromo to serve Ethiopia's
                diverse linguistic communities.
              </p>
            </div>

            <div className="card hover:shadow-xl transition-shadow space-y-6 text-center p-8">
              <div className="w-20 h-20 bg-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                <TrendingDown className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Competitive Rates
              </h3>
              <p className="text-base text-gray-600 leading-relaxed">
                Get the best exchange rates with real-time currency conversion
                and transparent fee structures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mx-auto max-w-4xl space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Ready to Send Money Home?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust GoozX for their
              remittance needs. Start sending money with confidence today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 pt-6">
              <Link
                href="/onboarding"
                className="bg-white text-purple-600 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
