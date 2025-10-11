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
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-primary">
              About GoozX Remittance
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
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-primary">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  To provide fast, secure, and affordable remittance services
                  that empower Ethiopian families to thrive and strengthen their
                  communities.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
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
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
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
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                Our Values & Commitments
              </h2>
              <p className="text-xl text-gray-600">
                Building trust through transparency and reliability
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100 card">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100 card">
                <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100 card">
                <div className="w-20 h-20 bg-success rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Join Thousands of Satisfied Customers
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Start your own success story with GoozX Remittance today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/onboarding">
                <Button className="btn-secondary rounded-xl px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Get Started Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-semibold transition-all duration-300 bg-transparent"
                >
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
