import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  Send,
  Shield,
  TrendingUp,
  Zap,
} from "@/lib/icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | GoozX",
  description:
    "Explore remittance, marketplace, gifts, and investment services.",
};

export default function ServicesPage() {
  return (
    <>
      {/* Full Page Dynamic Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 z-0">
        {/* Animated geometric shapes - distributed across full page */}
        <div className="absolute inset-0">
          {/* Floating circles with different animations */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-blue-400/35 to-purple-400/35 rounded-full blur-2xl animate-pulse delay-700"></div>
          <div className="absolute top-3/4 left-1/2 w-36 h-36 bg-gradient-to-r from-purple-500/25 to-blue-500/25 rounded-full blur-3xl animate-pulse delay-300"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-2xl animate-pulse delay-1000"></div>

          {/* Animated lines - more distributed */}
          <div className="absolute top-1/4 left-0 w-48 h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-pulse"></div>
          <div className="absolute bottom-1/3 right-0 w-64 h-px bg-gradient-to-l from-transparent via-blue-400/60 to-transparent animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-0 w-32 h-px bg-gradient-to-r from-transparent via-purple-300/50 to-transparent animate-pulse delay-500"></div>
          <div className="absolute top-3/4 right-0 w-40 h-px bg-gradient-to-l from-transparent via-blue-300/50 to-transparent animate-pulse delay-700"></div>

          {/* Rotating squares only */}
          <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-purple-400/40 rounded-lg rotate-45 animate-spin"></div>
          <div className="absolute top-2/3 right-1/3 w-14 h-14 border-2 border-purple-300/30 rounded-lg rotate-12 animate-spin delay-500"></div>
        </div>

        {/* Interactive grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30 animate-pulse"></div>
      </div>

      <main className="relative z-10">
        {/* Modern Interactive Hero Section */}
        <section className="relative min-h-[80vh] flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <div className="mx-auto max-w-5xl space-y-12">
              {/* Animated Main Heading */}
              <div className="space-y-6 animate-fade-in-up">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
                  <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
                    SERVICES
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-100 via-purple-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                    WE DELIVER
                  </span>
                </h1>

                {/* Animated divider line */}
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-1 bg-gradient-to-r from-transparent to-purple-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                  <div className="w-16 h-1 bg-gradient-to-l from-transparent to-blue-400 rounded-full"></div>
                </div>
              </div>

              {/* Animated Subtitle */}
              <p className="text-xl md:text-2xl text-purple-100 leading-relaxed max-w-4xl mx-auto font-light animate-fade-in-up delay-300 drop-shadow-lg">
                Empower your business with advanced technologies tailored to
                your needs. Drive efficiency, innovation, and growth with our
                comprehensive suite of services.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid with Full Page Background Theme */}
        <section id="services" className="relative py-32 z-10">
          <div className="container mx-auto px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
              {/* Send Money Service */}
              <div className="group relative p-8 bg-purple-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-600/50 hover:border-purple-400/50 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Send Money</h3>
                  <p className="text-white/90 leading-relaxed">
                    Fast, secure transfers to bank accounts and mobile wallets
                    in Ethiopia. Real-time transfers with competitive exchange
                    rates.
                  </p>
                  <Link href="/dashboard/send">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                      Explore Service
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Purpose-Driven Payments Service */}
              <div className="group relative p-8 bg-blue-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-600/50 hover:border-blue-400/50 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Purpose-Driven Payments
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Pay school fees, healthcare bills, and utilities directly to
                    providers with enhanced security and user engagement tools.
                  </p>
                  <Link href="/dashboard/marketplace">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                      Explore Service
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Investment Gateway Service */}
              <div className="group relative p-8 bg-green-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-600/50 hover:border-green-400/50 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Investment Gateway
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Invest in Ethiopian bonds, real estate, and SME financing
                    opportunities with comprehensive investment solutions.
                  </p>
                  <Link href="/dashboard/investments">
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                      Explore Service
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Request Money Service */}
              <div className="group relative p-8 bg-orange-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-orange-600/50 hover:border-orange-400/50 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Request Money
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Easy way to request funds from family and friends with
                    shareable payment links and AI-driven engagement tools.
                  </p>
                  <Link href="/dashboard/request">
                    <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                      Explore Service
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Gift & E-commerce Service */}
              <div className="group relative p-8 bg-indigo-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-indigo-600/50 hover:border-indigo-400/50 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Gift & E-commerce
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Send groceries, electronics, and gift cards to your loved
                    ones in Ethiopia with secure and scalable operations.
                  </p>
                  <Link href="/dashboard/gifts">
                    <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                      Explore Service
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Real-time Tracking Service */}
              <div className="group relative p-8 bg-yellow-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-yellow-600/50 hover:border-yellow-400/50 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Real-time Tracking
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Track all your transactions with real-time updates and
                    complete history with advanced analytics and insights.
                  </p>
                  <Link href="/dashboard/transactions">
                    <Button className="w-full bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                      Explore Service
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Credit Scoring Service */}
              <div className="group relative p-8 bg-teal-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-teal-600/50 hover:border-teal-400/50 hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Credit Scoring
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    Evaluate creditworthiness using remittance transaction data
                    to provide financial insights and better lending
                    opportunities.
                  </p>
                  <Link href="/dashboard/transactions">
                    <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                      Explore Service
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Features Section - Separate Section Below */}
      <section className="py-24 bg-gradient-to-br from-slate-100 via-purple-50 to-blue-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSAzIDQgMyA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Why Choose GoozX?
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/60 hover:border-purple-400/80 transition-all duration-500 text-center shadow-lg hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-purple-600 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-purple-900 mb-2">
                    Bank-Level Security
                  </h3>
                  <p className="text-sm text-purple-700">256-bit encryption</p>
                </div>
              </div>

              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-blue-200/60 hover:border-blue-400/80 transition-all duration-500 text-center shadow-lg hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Instant Transfers
                  </h3>
                  <p className="text-sm text-blue-700">Within 10 minutes</p>
                </div>
              </div>

              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-indigo-200/60 hover:border-indigo-400/80 transition-all duration-500 text-center shadow-lg hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Globe2 className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-indigo-900 mb-2">
                    Multi-Language
                  </h3>
                  <p className="text-sm text-indigo-700">
                    English, አማርኛ, Afaan Oromoo
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200/60 hover:border-green-400/80 transition-all duration-500 text-center shadow-lg hover:shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-green-900 mb-2">
                    Best Rates
                  </h3>
                  <p className="text-sm text-green-700">Live exchange rates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
