import Link from "next/link";
import {
  Shield,
  Zap,
  DollarSign,
  CheckCircle,
  Globe,
  TrendingDown,
  ArrowRight,
  Sparkles,
} from "@/lib/icons";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Modern Hero Section with Tech-inspired Design */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#750BC0] via-purple-800 to-blue-900">
          {/* Infinite Geometric Planes - No Visible Borders */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Top-left infinite plane */}
            <div className="absolute -top-20 -left-20 w-[150%] h-[80%] bg-gradient-to-br from-purple-800/30 to-purple-600/20 transform rotate-12 origin-top-left"></div>

            {/* Top-right infinite plane */}
            <div className="absolute -top-20 -right-20 w-[150%] h-[80%] bg-gradient-to-bl from-purple-700/35 to-purple-500/25 transform -rotate-12 origin-top-right"></div>

            {/* Bottom-right infinite plane */}
            <div className="absolute -bottom-20 -right-20 w-[150%] h-[80%] bg-gradient-to-tl from-purple-600/40 to-purple-400/25 transform rotate-12 origin-bottom-right"></div>

            {/* Bottom-left infinite plane */}
            <div className="absolute -bottom-20 -left-20 w-[150%] h-[80%] bg-gradient-to-tr from-purple-700/35 to-purple-500/20 transform -rotate-12 origin-bottom-left"></div>

            {/* Top edge infinite plane */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-b from-purple-500/25 to-purple-300/15 transform -rotate-6 origin-top"></div>

            {/* Right edge infinite plane */}
            <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 w-[60%] h-[120%] bg-gradient-to-l from-purple-600/30 to-purple-400/20 transform rotate-6 origin-right"></div>

            {/* Bottom edge infinite plane */}
            <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-[120%] h-[60%] bg-gradient-to-t from-purple-500/25 to-purple-300/15 transform rotate-6 origin-bottom"></div>

            {/* Left edge infinite plane */}
            <div className="absolute top-1/2 -left-20 transform -translate-y-1/2 w-[60%] h-[120%] bg-gradient-to-r from-purple-600/30 to-purple-400/20 transform -rotate-6 origin-left"></div>
          </div>

          {/* Subtle floating elements for depth */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mx-auto max-w-6xl space-y-12">
            {/* Main Heading with Modern Typography */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
                <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                  REMITTANCE
                </span>
              </h1>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </div>

            {/* Subtitle */}
            <p className="text-lg md:text-xl lg:text-2xl text-purple-100 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] drop-shadow-[0_0_40px_rgba(255,255,255,0.6)] drop-shadow-[0_0_80px_rgba(255,255,255,0.4)] drop-shadow-[0_0_120px_rgba(255,255,255,0.3)] animate-fade-in-up delay-300">
              Fast, secure, and affordable international money transfers. Send
              money across borders, instantly.
            </p>

            {/* CTA Buttons with Modern Styling */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-fade-in-up delay-500">
              <Link
                href="/onboarding"
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link
                href="#why-choose"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Modern Features Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDYwIDAgTCAwIDAgMCA2MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid gap-20 lg:grid-cols-2 items-center max-w-7xl mx-auto">
            {/* Content Side */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight">
                  Connecting Families
                  <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                    Across Borders
                  </span>
                </h2>

                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </div>

              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  Remittance transfers money from one person to another,
                  typically across international borders. It's a vital financial
                  service for millions of people working abroad to support their
                  loved ones back home.
                </p>
                <p>
                  With{" "}
                  <span className="font-semibold text-purple-600">
                    GoozX Remittance
                  </span>
                  , we make these transfers faster, safer, and more affordable
                  than ever before, breaking down barriers and connecting
                  families across continents.
                </p>
              </div>

              {/* Modern Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    $2.5B+
                  </div>
                  <div className="text-sm text-gray-500">Transferred</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">500K+</div>
                  <div className="text-sm text-gray-500">Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    99.9%
                  </div>
                  <div className="text-sm text-gray-500">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Bank-Grade Security
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Advanced encryption and multi-layer security protocols
                    ensure your money is always protected.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Lightning Fast
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Send money in minutes, not days. Our optimized network
                    ensures instant transfers.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Lowest Fees
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Transparent pricing with competitive rates. No hidden fees,
                    no surprises.
                  </p>
                </div>
              </div>

              <div className="group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-purple-200">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Fully Compliant
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    KYC verified and fully compliant with international
                    financial regulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Why Choose Section */}
      <section
        id="why-choose"
        className="py-32 bg-gray-900 relative overflow-hidden"
      >
        {/* Techy Background with High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900"></div>

        {/* Tech Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0idGVjaCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDgwIDAgTCAwIDAgMCA4MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0gMCA0MCBMIDgwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0gNDAgMCBMIDQwIDgwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCN0ZWNoKSIvPjwvc3ZnPg==')] opacity-25"></div>

        {/* Diagonal Tech Lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZGlhZyIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDAgNDAgTCA0MCAwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wOCkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNkaWFnKSIvPjwvc3ZnPg==')] opacity-20"></div>

        {/* High Contrast Floating Elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-500/15 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/15 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        {/* Tech Accent Lines with Glow */}
        <div className="absolute top-1/4 left-0 w-48 h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent shadow-[0_0_10px_rgba(168,85,247,0.3)]"></div>
        <div className="absolute bottom-1/4 right-0 w-48 h-px bg-gradient-to-l from-transparent via-blue-400/50 to-transparent shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>

        {/* Vertical Tech Lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-400/40 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400/40 to-transparent"></div>

        {/* Corner Tech Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border border-purple-400/30 rounded-lg rotate-45 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-20 h-20 border border-blue-400/30 rounded-lg rotate-45 animate-pulse delay-500"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 border border-purple-400/30 rounded-lg rotate-45 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border border-blue-400/30 rounded-lg rotate-45 animate-pulse delay-1500"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="text-white">Built for</span>
              <span className="block bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Modern Finance
              </span>
            </h2>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              We understand the importance of every transaction. That's why
              we've built a platform that prioritizes security, speed, and
              transparency with cutting-edge technology.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
            <div className="group relative p-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-purple-400/50 transition-all duration-500 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Verified & Compliant
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  KYC verified and fully compliant with FinCEN and international
                  standards. Your security is our priority.
                </p>
              </div>
            </div>

            <div className="group relative p-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-blue-400/50 transition-all duration-500 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Multi-Language Support
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  English, Amharic, and Oromo support for your convenience.
                  Breaking language barriers worldwide.
                </p>
              </div>
            </div>

            <div className="group relative p-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-green-400/50 transition-all duration-500 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 space-y-6">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <TrendingDown className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Competitive Rates
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Great rates with low and transparent fees. More money reaches
                  your loved ones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-100 via-purple-50 to-blue-50 relative overflow-hidden">
        {/* Calm Background */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

        {/* Subtle Floating Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-2xl animate-pulse delay-1000"></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mx-auto max-w-6xl space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9]">
                <span className="text-gray-800">Ready to</span>
                <span className="block bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Get Started?
                </span>
              </h2>

              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto font-light">
              Join thousands of users who trust{" "}
              <span className="text-gray-800 font-semibold">
                GoozX Remittance
              </span>{" "}
              for their international money transfers. Create your account in
              minutes and start sending money securely today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
              <Link
                href="/onboarding"
                className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xl rounded-2xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/25"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Start Sending Money
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              </Link>

              <Link
                href="/contact"
                className="px-12 py-6 bg-gray-800/10 backdrop-blur-md border-2 border-gray-300/30 text-gray-800 font-bold text-xl rounded-2xl hover:bg-gray-800/20 hover:border-gray-400/50 transition-all duration-300"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
