"use client";

import {
  Shield,
  Zap,
  DollarSign,
  CheckCircle,
  Globe,
  ArrowRight,
} from "@/lib/icons";
import { Award, Clock, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
      <section className="relative pt-32 pb-20 bg-purple-600 from-primary via-primary/95 to-primary/80 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-8 leading-tight">
                MAKING MONEY
                <br />
                TRANSFERS
                <br />
                SMARTER
              </h1>
              <p className="text-xl md:text-2xl text-white/95 mb-10 leading-relaxed">
                Fast, secure, and affordable international money transfers. Send money across borders instantly with
                competitive rates.
              </p>
              <Link
                href="/onboarding"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
              >
                LEARN ABOUT OUR SOLUTIONS
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="relative">
              <Image
                src="/happy-young-couple-smiling-looking-at-iphone-toget.jpg"
                alt="Couple using mobile banking"
                className="rounded-2xl shadow-2xl"
                width={500}
                height={500}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">$50M+</div>
              <div className="text-gray-600 font-medium">Transferred</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">150K+</div>
              <div className="text-gray-600 font-medium">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">99.9%</div>
              <div className="text-gray-600 font-medium">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-gray-600 font-medium">Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16 text-center">
            Why Choose GoozX Remittance
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src="/professional-woman-using-smartphone-for-secure-ban.jpg"
                  alt="Bank-level security"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">SECURITY</div>
                <h3 className="text-xl font-bold text-gray-900">Bank-Level Security & Compliance</h3>
                <p className="text-gray-600 leading-relaxed">
                  Military-grade encryption, KYC verification, and full compliance with international financial
                  regulations including FinCEN standards.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
                >
                  READ MORE <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src="/young-man-smiling-holding-iphone-showing-instant-m.jpg"
                  alt="Lightning-fast transfers"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">SPEED</div>
                <h3 className="text-xl font-bold text-gray-900">Lightning-Fast Transfers</h3>
                <p className="text-gray-600 leading-relaxed">
                  Send money in minutes, not days. Our advanced infrastructure ensures your transfers reach recipients
                  instantly across borders.
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
                >
                  READ MORE <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
              <div className="aspect-video overflow-hidden relative">
                <Image
                  src="/diverse-group-of-people-comparing-exchange-rates-o.jpg"
                  alt="Competitive exchange rates"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className="text-sm font-semibold text-purple-600 uppercase tracking-wide">VALUE</div>
                <h3 className="text-xl font-bold text-gray-900">Competitive Exchange Rates</h3>
                <p className="text-gray-600 leading-relaxed">
                  Get the best rates with transparent fees. Compare real-time exchange rates from multiple Ethiopian
                  banks before you send.
                </p>
                <Link
                  href="/dashboard/exchange-rates"
                  className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all"
                >
                  READ MORE <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-600/90 transition-colors"
            >
              VIEW MORE INSIGHTS
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Connecting Families Across Borders
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Remittance transfers money from one person to another, typically across international borders. It's a
                  vital financial service for millions of people working abroad to support their loved ones back home.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  With GoozX Remittance, we make these transfers faster, safer, and more affordable than ever before,
                  breaking down barriers and connecting families across continents.
                </p>
              </div>

              <div className="relative">
                <img
                  src="/happy-african-family-video-calling-on-smartphone--.jpg"
                  alt="Family connecting across borders"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">150K+</div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Clock className="w-12 h-12 text-purple-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">&lt;5 min</div>
                <div className="text-gray-600 font-medium">Average Transfer Time</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Globe className="w-12 h-12 text-purple-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">3</div>
                <div className="text-gray-600 font-medium">Languages Supported</div>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
                <Award className="w-12 h-12 text-purple-600 mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-600 font-medium">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Partner with GoozX</h2>
              <p className="text-xl text-white/95 leading-relaxed mb-8">
                Join our network of trusted partners and help us transform the remittance industry. Together, we can
                make international money transfers accessible to everyone.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                LEARN ABOUT OUR PARTNER NETWORK
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">Ready to Get Started?</h2>
              <p className="text-xl text-white/95 leading-relaxed mb-8">
                Create your account in minutes and start sending money securely. Join thousands of users who trust GoozX
                Remittance for their international transfers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/onboarding"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  GET STARTED
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  CONTACT US
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
