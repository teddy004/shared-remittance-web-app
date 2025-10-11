import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BarChart3,
  Globe2,
  Send,
  Shield,
  TrendingUp,
  Zap,
} from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | GoozX",
  description:
    "Explore remittance, marketplace, gifts, and investment services.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-primary sm:text-6xl">
              SERVICES WE DELIVER
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Empower your business with advanced technologies tailored to your
              needs. Drive efficiency, innovation, and growth with our
              comprehensive suite of services.
            </p>
          </div>
        </div>
      </section>
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Send className="h-20 w-20 text-white" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary">
                  Send Money
                </h3>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Fast, secure transfers to bank accounts and mobile wallets in
                  Ethiopia. Our tailored remittance solutions give your business
                  a competitive edge with real-time transfers and best exchange
                  rates.
                </p>
                <Link href="/dashboard/send">
                  <Button className="btn-primary w-full mt-4">Explore</Button>
                </Link>
              </div>
            </div>

            {/* Pay Bills Service */}
            <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Shield className="h-20 w-20 text-white" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary">
                  Purpose-Driven Payments
                </h3>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Pay school fees, healthcare bills, and utilities directly to
                  providers. We ensure robust data security, provide
                  visualization tools, and use recommendation engines to enhance
                  decision-making and user engagement.
                </p>
                <Link href="/dashboard/marketplace">
                  <Button className="btn-primary w-full mt-4">Explore</Button>
                </Link>
              </div>
            </div>

            {/* Investment Service */}
            <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-primary flex items-center justify-center">
                <TrendingUp className="h-20 w-20 text-white" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary">
                  Investment Gateway
                </h3>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Invest in Ethiopian bonds, real estate, and SME financing
                  opportunities. Our extensive investment solutions offer
                  private and hybrid options, virtual servers, data backup and
                  storage, and system management.
                </p>
                <Link href="/dashboard/investments">
                  <Button className="btn-primary w-full mt-4">Explore</Button>
                </Link>
              </div>
            </div>

            {/* Request Money Service */}
            <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-primary flex items-center justify-center">
                <ArrowRight className="h-20 w-20 text-white" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary">
                  Request Money
                </h3>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Easy way to request funds from family and friends with
                  shareable payment links. Our solutions improve customer
                  engagement with AI-driven tools and offer innovations in
                  autonomous systems and smart agriculture.
                </p>
                <Link href="/dashboard/request">
                  <Button className="btn-primary w-full mt-4">Explore</Button>
                </Link>
              </div>
            </div>

            {/* Gift Shop Service */}
            <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Globe2 className="h-20 w-20 text-white" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary">
                  Gift & E-commerce
                </h3>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Send groceries, electronics, and gift cards to your loved ones
                  in Ethiopia. Our platform ensures smooth, secure, and scalable
                  business operations with comprehensive monitoring and support.
                </p>
                <Link href="/dashboard/gifts">
                  <Button className="btn-primary w-full mt-4">Explore</Button>
                </Link>
              </div>
            </div>

            {/* Track Everything Service */}
            <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-primary flex items-center justify-center">
                <Zap className="h-20 w-20 text-white" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary">
                  Real-time Tracking
                </h3>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Track all your transactions with real-time updates and
                  complete history. Our advanced analytics provide insights,
                  video analytics, and NLP capabilities to enhance your
                  financial decision-making.
                </p>
                <Link href="/dashboard/transactions">
                  <Button className="btn-primary w-full mt-4">Explore</Button>
                </Link>
              </div>
            </div>

            {/* Credit Scoring Service */}
            <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all">
              <div className="h-48 bg-primary flex items-center justify-center">
                <BarChart3 className="h-20 w-20 text-white" />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-semibold text-primary">
                  Credit Scoring
                </h3>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Uses remittance transaction data to evaluate the
                  creditworthiness of both senders and recipients, providing
                  financial insights and access to better lending opportunities.
                </p>
                <Link href="/dashboard/transactions">
                  <Button className="btn-primary w-full mt-4">Explore</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                Bank-Level Security
              </h3>
              <p className="text-sm text-muted-foreground">
                256-bit encryption
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">
                Instant Transfers
              </h3>
              <p className="text-sm text-muted-foreground">Within 10 minutes</p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Globe2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Multi-Language</h3>
              <p className="text-sm text-muted-foreground">
                English, አማርኛ, Afaan Oromoo
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Best Rates</h3>
              <p className="text-sm text-muted-foreground">
                Live exchange rates
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
