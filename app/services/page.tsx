"use client";

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

const services = [
  {
    icon: Send,
    title: "Send Money",
    description:
      "Fast, secure transfers to bank accounts and mobile wallets in Ethiopia. Our tailored remittance solutions give your business a competitive edge with real-time transfers and best exchange rates.",
    link: "/dashboard/send",
  },
  {
    icon: Shield,
    title: "Purpose-Driven Payments",
    description:
      "Pay school fees, healthcare bills, and utilities directly to providers. We ensure robust data security, provide visualization tools, and use recommendation engines to enhance decision-making and user engagement.",
    link: "/dashboard/marketplace",
  },
  {
    icon: TrendingUp,
    title: "Investment Gateway",
    description:
      "Invest in Ethiopian bonds, real estate, and SME financing opportunities. Our extensive investment solutions offer private and hybrid options, virtual servers, data backup and storage, and system management.",
    link: "/dashboard/investments",
  },
  {
    icon: ArrowRight,
    title: "Request Money",
    description:
      "Easy way to request funds from family and friends with shareable payment links. Our solutions improve customer engagement with AI-driven tools and offer innovations in autonomous systems and smart agriculture.",
    link: "/dashboard/request",
  },
  {
    icon: Globe2,
    title: "Gift & E-commerce",
    description:
      "Send groceries, electronics, and gift cards to your loved ones in Ethiopia. Our platform ensures smooth, secure, and scalable business operations with comprehensive monitoring and support.",
    link: "/dashboard/gifts",
  },
  {
    icon: Zap,
    title: "Real-time Tracking",
    description:
      "Track all your transactions with real-time updates and complete history. Our advanced analytics provide insights, video analytics, and NLP capabilities to enhance your financial decision-making.",
    link: "/dashboard/transactions",
  },
  {
    icon: BarChart3,
    title: "Credit Scoring",
    description:
      "Uses remittance transaction data to evaluate the creditworthiness of both senders and recipients, providing financial insights and access to better lending opportunities.",
    link: "/dashboard/transactions",
  },
];

const highlights = [
  {
    icon: Shield,
    title: "Bank-Level Security",
    description: "256-bit encryption",
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Within 10 minutes",
  },
  {
    icon: Globe2,
    title: "Multi-Language",
    description: "English, አማርኛ, Afaan Oromoo",
  },
  {
    icon: TrendingUp,
    title: "Best Rates",
    description: "Live exchange rates",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <section className="pt-32 pb-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl font-bold tracking-tight text-purple-700 sm:text-6xl">
              SERVICES WE DELIVER
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
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
            {services.map((service) => (
              <Link key={service.title} href={service.link}>
                <div className="rounded-lg overflow-hidden bg-white border border-purple-200 card shadow-lg hover:shadow-xl transition-all h-full">
                  <div className="h-48 bg-purple-600 flex items-center justify-center">
                    <service.icon className="h-20 w-20 text-white" />
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-purple-700">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-600 text-justify leading-relaxed">
                      {service.description}
                    </p>
                    <div className="pt-2">
                      <span className="text-purple-600 text-sm font-medium hover:text-purple-700">
                        Explore →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="flex flex-col items-center gap-3 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100">
                  <highlight.icon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900">
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
