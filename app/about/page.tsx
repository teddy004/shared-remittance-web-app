import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Zap, Globe } from "@/lib/icons";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-primary">
              About GoozX
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              We are a pioneering Ethiopian crowdfunded financial technology
              company dedicated to revolutionizing international money transfers
              for the Ethiopian diaspora.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
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
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-black text-white">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To provide fast, secure, and affordable remittance services
                  that empower Ethiopian families to thrive and strengthen their
                  communities.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We believe that money transfers should never be a barrier
                  between loved ones. That's why we created a platform that
                  combines cutting-edge technology with deep understanding of
                  diaspora needs.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-square bg-purple-50 rounded-3xl flex items-center justify-center shadow-xl">
                  <div className="w-40 h-40 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-24 h-24 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                Our Story
              </h2>
              <p className="text-xl text-gray-600">
                Found Your Tomorrow, Empower Your Family
              </p>
            </div>
            <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded by Goozam Technologies in 2024, GoozX emerged from
                recognizing the challenges Ethiopian migrants face in sending
                money home. Traditional transfer methods are slow, expensive,
                and unreliable - often taking days and costing excessive fees
                that burden both sender and receiver.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our founding team, drawing from Ethiopian heritage and global
                fintech experience, developed a modern platform that enables
                instant, secure, and low-cost transfers. Using superior banking
                systems, blockchain technology, and mobile banking integration,
                we deliver a superior user experience that has helped thousands
                of families maintain financial connections across borders.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, GoozX serves customers in over 60 countries, supporting
                Ethiopian communities worldwide with reliable, transparent, and
                innovative financial services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
                Our Values & Commitments
              </h2>
              <p className="text-xl text-gray-600">
                Building trust through transparency and reliability
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-purple-200/60 hover:border-purple-400/80">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Shield className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Security First
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Bank-level encryption and compliance with international
                    financial standards
                  </p>
                </div>
              </div>
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-blue-200/60 hover:border-blue-400/80">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Zap className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Innovation-Driven
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Leveraging fintech to simplify global transfers for diaspora
                    communities
                  </p>
                </div>
              </div>
              <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-green-200/60 hover:border-green-400/80">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Ethiopia-Centered
                  </h3>
                  <p className="text-gray-600 text-center leading-relaxed">
                    Deep understanding of Ethiopian diaspora needs and cultural
                    context
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
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

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Join Thousands of Satisfied Customers
            </h2>
            <p className="text-xl text-purple-100 leading-relaxed font-light drop-shadow-lg">
              Start your own success story with GoozX Remittance today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/onboarding">
                <Button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-lg rounded-xl hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl shadow-purple-500/25">
                  <span className="relative z-10">Get Started Now</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </Link>
              <Link href="/contact">
                <Button className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/20 transition-all duration-300">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
