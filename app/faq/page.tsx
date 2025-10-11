"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  Search,
  DollarSign,
  Clock,
  Shield,
  FileText,
  User,
  Globe,
} from "@/lib/icons";

const faqData = [
  {
    category: "Getting Started",
    icon: User,
    faqs: [
      {
        question: "How do I create a GoozX account?",
        answer:
          "You can create an account by visiting our website and clicking 'Get Started'. You'll need to provide your email address, create a password, and complete our simple verification process.",
      },
      {
        question: "What documents do I need for verification?",
        answer:
          "For account verification, you'll need a valid government-issued ID (passport, driver's license, or national ID) and a recent selfie for identity verification.",
      },
      {
        question: "How long does the verification process take?",
        answer:
          "Most verifications are completed within 24 hours. You'll receive an email notification once your account is fully verified and ready to use.",
      },
    ],
  },
  {
    category: "Money Transfers",
    icon: DollarSign,
    faqs: [
      {
        question: "How long do transfers take to arrive?",
        answer:
          "Most transfers to Ethiopian bank accounts and mobile wallets arrive within 10 minutes. Some transfers may take up to 24 hours depending on the recipient's bank processing times.",
      },
      {
        question: "What are the transfer fees?",
        answer:
          "Our fees are competitive: 1% for transfers over $100, or a flat fee of $2.99 for transfers of $100 or less. Exchange rates are locked for 10 minutes after confirmation.",
      },
      {
        question: "What's the maximum amount I can send?",
        answer:
          "Verified users can send up to $10,000 per day and $50,000 per month. New users have lower limits until they complete full verification.",
      },
      {
        question: "Can I cancel a transfer after sending?",
        answer:
          "Transfers can be cancelled within 30 seconds of initiation. After that, the transfer is processed and cannot be cancelled for security reasons.",
      },
      {
        question: "What currencies can I send?",
        answer:
          "You can send in USD, EUR, GBP, and other major currencies. Recipients receive in ETB at competitive exchange rates.",
      },
    ],
  },
  {
    category: "Security & Privacy",
    icon: Shield,
    faqs: [
      {
        question: "How secure are my transactions?",
        answer:
          "All transactions are protected with bank-level 256-bit encryption. We use multi-factor authentication and comply with international financial security standards.",
      },
      {
        question: "Is my personal information safe?",
        answer:
          "Yes, we use industry-standard encryption to protect your data. We never share your personal information with third parties without your consent.",
      },
      {
        question: "What happens if I lose my phone?",
        answer:
          "Contact our support team immediately. We can help secure your account and prevent unauthorized access to your funds.",
      },
    ],
  },
  {
    category: "Compliance & Regulations",
    icon: FileText,
    faqs: [
      {
        question: "Do you comply with financial regulations?",
        answer:
          "Yes, GoozX is fully compliant with Ethiopian financial regulations and international standards including AML (Anti-Money Laundering) and KYC (Know Your Customer) requirements.",
      },
      {
        question: "Why do you need my ID documents?",
        answer:
          "We require ID verification to comply with financial regulations and prevent fraud. This helps protect both you and our platform from illegal activities.",
      },
      {
        question: "Are my transactions reported to authorities?",
        answer:
          "We report suspicious activities as required by law, but normal transactions between verified users are private and not shared with third parties.",
      },
    ],
  },
  {
    category: "Tracking & Support",
    icon: Clock,
    faqs: [
      {
        question: "How can I track my transfer?",
        answer:
          "You can track your transfer status in real-time through your dashboard. You'll also receive email and SMS notifications about your transfer progress.",
      },
      {
        question: "What if my recipient didn't receive the money?",
        answer:
          "Contact our support team immediately with your transaction reference number. We'll investigate and resolve any delivery issues within 24 hours.",
      },
      {
        question: "How do I contact customer support?",
        answer:
          "You can reach us via email at support@goozx.com, phone at +251 11 123 4567, or through our in-app chat support available 24/7.",
      },
    ],
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredCategories = faqData
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0)
    .filter(
      (category) => !selectedCategory || category.category === selectedCategory
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white border-b border-purple-100">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-700">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Find answers to common questions about GoozX remittance services,
              security, and support.
            </p>

            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 text-lg border-2 border-purple-200 focus:border-purple-600 rounded-xl shadow-sm"
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
                  ? "bg-purple-600 text-white shadow-lg"
                  : "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
              }`}
            >
              <Globe className="w-4 h-4 mr-2" />
              All Topics
            </Button>
            {faqData.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.category}
                  onClick={() => setSelectedCategory(category.category)}
                  variant={
                    selectedCategory === category.category
                      ? "default"
                      : "outline"
                  }
                  className={`rounded-full px-6 py-2 transition-all duration-300 ${
                    selectedCategory === category.category
                      ? "bg-purple-600 text-white shadow-lg"
                      : "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.category}
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-5xl">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500">
                No results found for "{searchQuery}"
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                className="bg-purple-600 hover:bg-purple-700 mt-6"
              >
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div key={category.category} className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-purple-600 shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {category.category}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      {category.faqs.map((faq, faqIndex) => {
                        const globalIndex = categoryIndex * 100 + faqIndex;
                        return (
                          <Card
                            key={globalIndex}
                            className="border-purple-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                          >
                            <CardContent className="p-0">
                              <button
                                onClick={() =>
                                  setOpenIndex(
                                    openIndex === globalIndex
                                      ? null
                                      : globalIndex
                                  )
                                }
                                className="w-full text-left p-6 hover:bg-purple-50/50 transition-colors duration-200"
                              >
                                <div className="flex items-start justify-between gap-4">
                                  <h3 className="font-semibold text-lg text-gray-900 leading-relaxed pr-4">
                                    {faq.question}
                                  </h3>
                                  <ChevronDown
                                    className={`w-5 h-5 text-purple-600 flex-shrink-0 transition-transform duration-300 ${
                                      openIndex === globalIndex
                                        ? "rotate-180"
                                        : ""
                                    }`}
                                  />
                                </div>
                              </button>
                              {openIndex === globalIndex && (
                                <div className="px-6 pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
                                  <div className="pt-4 border-t border-purple-100">
                                    <p className="text-gray-600 leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="text-center mt-20 bg-purple-600 rounded-3xl p-12 shadow-2xl">
            <h3 className="text-3xl text-white font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl text-white/90 mb-8">
              Our support team is here to help you with any questions about
              GoozX services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-purple-600 rounded-xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
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
  );
}
