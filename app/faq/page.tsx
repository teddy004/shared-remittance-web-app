"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, Search, DollarSign, Clock, Shield, FileText, User, Globe } from "@/lib/icons"

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const faqCategories = [
    {
      id: "getting-started",
      name: "Getting Started",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      faqs: [
        {
          question: "How do I register for an account?",
          answer:
            "Download the GoozX app or visit our website. Complete KYC verification by uploading your ID documents. The process takes 2-3 business days for approval, after which you can access all features including higher transfer limits and additional services.",
        },
        {
          question: "Can I send money without an account?",
          answer:
            "Yes, guest transfers up to $100 don't require registration. For higher amounts or recurring transfers, account creation is required for compliance and enhanced security. Creating an account also gives you access to transaction history and better rates.",
        },
        {
          question: "What documents do I need for verification?",
          answer:
            "You'll need a valid government-issued ID (passport, driver's license, or national ID card) and proof of address (utility bill or bank statement from the last 3 months). For business accounts, additional documentation may be required.",
        },
      ],
    },
    {
      id: "transfers",
      name: "Transfers & Fees",
      icon: DollarSign,
      color: "from-purple-500 to-pink-500",
      faqs: [
        {
          question: "How much does it cost to send money with GoozX?",
          answer:
            "Our fees start at 1% for transfers above $100. Calculated fees are shown transparently before confirming your transfer. We don't charge hidden fees for currency conversion or processing. The exact fee depends on the amount, destination, and payment method.",
        },
        {
          question: "How long does a transfer take?",
          answer:
            "Most transfers complete within 10-30 minutes. Express transfers to mobile wallets are fastest, while bank transfers may take 1-2 business days depending on the recipient bank. You'll receive real-time updates on your transfer status.",
        },
        {
          question: "Which countries can I send money to?",
          answer:
            "Send money to Ethiopia, Kenya, Uganda, Tanzania, Rwanda, and 50+ other African and Middle Eastern countries. Check our supported destinations list for complete coverage. We're constantly expanding to new markets.",
        },
        {
          question: "What currencies are supported?",
          answer:
            "Send in USD, EUR, GBP, CAD, and major currencies. Recipient countries have local currencies (ETB for Ethiopia, KES for Kenya, UGX for Uganda, etc.). Exchange rates are competitive and transparently shown before you confirm your transfer.",
        },
        {
          question: "Are there daily or monthly limits?",
          answer:
            "Limits vary by account verification level: Guest (up to $100/day), Basic KYC ($500/day, $2,000/month), Enhanced ($2,000/day, $10,000/month), Premium ($10,000/day, $50,000/month). Contact us to upgrade your limits based on your needs.",
        },
      ],
    },
    {
      id: "security",
      name: "Security & Safety",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      faqs: [
        {
          question: "Is my money secure?",
          answer:
            "We use bank-level 256-bit SSL encryption and comply with international financial standards. All transfers are insured and regulated by relevant authorities. Your funds are held in segregated accounts and protected by multiple layers of security.",
        },
        {
          question: "How do you protect my personal information?",
          answer:
            "We follow strict data protection regulations including GDPR. Your personal information is encrypted, stored securely, and never shared with third parties without your consent. We use multi-factor authentication and regular security audits to protect your account.",
        },
        {
          question: "What if I suspect fraud on my account?",
          answer:
            "Contact our support team immediately at support@goozx.com or call our 24/7 hotline. We'll freeze your account, investigate the issue, and work to recover any unauthorized transactions. We also offer fraud protection insurance on all verified accounts.",
        },
      ],
    },
    {
      id: "compliance",
      name: "Compliance & Legal",
      icon: FileText,
      color: "from-orange-500 to-red-500",
      faqs: [
        {
          question: "Is GoozX compliant with Ethiopian financial laws?",
          answer:
            "Yes, fully licensed and regulated. We work with authorized financial partners in Ethiopia and follow all Central Bank of Ethiopia (NBE) guidelines. Your money is safe and your transactions are fully compliant with local and international regulations.",
        },
        {
          question: "Do you report transactions to authorities?",
          answer:
            "We comply with all anti-money laundering (AML) and counter-terrorism financing (CTF) regulations. Suspicious transactions are reported to relevant authorities as required by law. This helps keep the platform safe for all users.",
        },
        {
          question: "What is your refund policy?",
          answer:
            "Transfers cannot be cancelled once initiated for security reasons. If there's an issue with delivery after 48 hours, contact our support team for assistance. Refunds are processed within 5-7 business days if the transfer fails or cannot be completed.",
        },
      ],
    },
    {
      id: "tracking",
      name: "Tracking & Support",
      icon: Clock,
      color: "from-indigo-500 to-purple-500",
      faqs: [
        {
          question: "How do I track my transfer?",
          answer:
            "Once your transfer is initiated, you'll receive a tracking reference number via email and SMS. Use this in the app or on our website to check real-time status updates. You can also enable push notifications for instant updates.",
        },
        {
          question: "What do I need to receive money?",
          answer:
            "Recipients need a valid ID for pickup. In Ethiopia, money can be received at mobile money accounts, agent locations, or directly to bank accounts. No recipient registration is required. They'll receive an SMS with pickup instructions.",
        },
        {
          question: "How can I contact customer support?",
          answer:
            "Our support team is available 24/7 via live chat in the app, email at support@goozx.com, or phone at +1 (555) 123-4567. We also have a comprehensive help center with guides and tutorials. Average response time is under 2 hours.",
        },
      ],
    },
  ]

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.faqs.length > 0)
    .filter((category) => !selectedCategory || category.id === selectedCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white border-b border-purple-100">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Find quick answers to common questions about our remittance services.
            </p>

            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-purple-200 focus:border-primary rounded-xl shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white/50 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => setSelectedCategory(null)}
              variant={selectedCategory === null ? "default" : "outline"}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                selectedCategory === null
                  ? "btn-primary shadow-lg"
                  : "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
              }`}
            >
              <Globe className="w-4 h-4 mr-2" />
              All Topics
            </Button>
            {faqCategories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className={`rounded-full px-6 py-2 transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "btn-primary shadow-lg"
                      : "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">No results found for "{searchQuery}"</p>
              <Button
                onClick={() => setSearchQuery("")}
                className="btn-primary mt-6 hover:shadow-lg transition-all duration-300"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => {
                const Icon = category.icon
                return (
                  <div key={category.id} className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">{category.name}</h2>
                    </div>

                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex
                        return (
                          <Card
                            key={globalIndex}
                            className="border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden card"
                          >
                            <CardContent className="p-0">
                              <button
                                onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)}
                                className="w-full text-left p-6 hover:bg-purple-50/50 transition-colors duration-200"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <h3 className="font-semibold text-lg text-gray-900 leading-relaxed pr-4">
                                    {faq.question}
                                  </h3>
                                  <ChevronDown
                                    className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                                      openIndex === globalIndex ? "rotate-180" : ""
                                    }`}
                                  />
                                </div>
                              </button>
                              {openIndex === globalIndex && (
                                <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <div className="pt-4 border-t border-purple-100">
                                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          <div className="text-center mt-20 bg-primary rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl text-white font-bold mb-4">Still have questions?</h3>
            <p className="text-xl text-white/90 mb-8">We're here to help 24/7</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="btn-secondary rounded-xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Contact Support
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
