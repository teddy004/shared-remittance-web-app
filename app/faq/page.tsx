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
import { useTranslation } from "@/lib/use-translation";

const faqCategoriesData = [
  {
    id: "getting-started",
    nameKey: "faqCategoryGettingStarted" as const,
    icon: User,
    faqs: [
      {
        questionKey: "faqGettingStartedQ1" as const,
        answerKey: "faqGettingStartedA1" as const,
      },
      {
        questionKey: "faqGettingStartedQ2" as const,
        answerKey: "faqGettingStartedA2" as const,
      },
      {
        questionKey: "faqGettingStartedQ3" as const,
        answerKey: "faqGettingStartedA3" as const,
      },
    ],
  },
  {
    id: "transfers",
    nameKey: "faqCategoryTransfers" as const,
    icon: DollarSign,
    faqs: [
      {
        questionKey: "faqTransfersQ1" as const,
        answerKey: "faqTransfersA1" as const,
      },
      {
        questionKey: "faqTransfersQ2" as const,
        answerKey: "faqTransfersA2" as const,
      },
      {
        questionKey: "faqTransfersQ3" as const,
        answerKey: "faqTransfersA3" as const,
      },
      {
        questionKey: "faqTransfersQ4" as const,
        answerKey: "faqTransfersA4" as const,
      },
      {
        questionKey: "faqTransfersQ5" as const,
        answerKey: "faqTransfersA5" as const,
      },
    ],
  },
  {
    id: "security",
    nameKey: "faqCategorySecurity" as const,
    icon: Shield,
    faqs: [
      {
        questionKey: "faqSecurityQ1" as const,
        answerKey: "faqSecurityA1" as const,
      },
      {
        questionKey: "faqSecurityQ2" as const,
        answerKey: "faqSecurityA2" as const,
      },
      {
        questionKey: "faqSecurityQ3" as const,
        answerKey: "faqSecurityA3" as const,
      },
    ],
  },
  {
    id: "compliance",
    nameKey: "faqCategoryCompliance" as const,
    icon: FileText,
    faqs: [
      {
        questionKey: "faqComplianceQ1" as const,
        answerKey: "faqComplianceA1" as const,
      },
      {
        questionKey: "faqComplianceQ2" as const,
        answerKey: "faqComplianceA2" as const,
      },
      {
        questionKey: "faqComplianceQ3" as const,
        answerKey: "faqComplianceA3" as const,
      },
    ],
  },
  {
    id: "tracking",
    nameKey: "faqCategoryTracking" as const,
    icon: Clock,
    faqs: [
      {
        questionKey: "faqTrackingQ1" as const,
        answerKey: "faqTrackingA1" as const,
      },
      {
        questionKey: "faqTrackingQ2" as const,
        answerKey: "faqTrackingA2" as const,
      },
      {
        questionKey: "faqTrackingQ3" as const,
        answerKey: "faqTrackingA3" as const,
      },
    ],
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { t } = useTranslation();

  const filteredCategories = faqCategoriesData
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          t(faq.questionKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
          t(faq.answerKey).toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0)
    .filter(
      (category) => !selectedCategory || t(category.nameKey) === selectedCategory
    );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white border-b border-purple-100">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-purple-700">{t("faqTitle")}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t("faqDescription")}
            </p>

            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder={t("faqSearchPlaceholder")}
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
              {t("faqAllTopics")}
            </Button>
            {faqCategoriesData.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => setSelectedCategory(t(category.nameKey))}
                  variant={
                    selectedCategory === t(category.nameKey)
                      ? "default"
                      : "outline"
                  }
                  className={`rounded-full px-6 py-2 transition-all duration-300 ${
                    selectedCategory === t(category.nameKey)
                      ? "bg-purple-600 text-white shadow-lg"
                      : "border-purple-200 hover:border-purple-400 hover:bg-purple-50"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {t(category.nameKey)}
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
                {t("faqNoResults").replace("{query}", searchQuery)}
              </p>
              <Button
                onClick={() => setSearchQuery("")}
                className="bg-purple-600 hover:bg-purple-700 mt-6"
              >
                {t("faqClearSearch")}
              </Button>
            </div>
          ) : (
            <div className="space-y-12">
              {filteredCategories.map((category, categoryIndex) => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="space-y-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-purple-600 shadow-lg">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">
                        {t(category.nameKey)}
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
                                    {t(faq.questionKey)}
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
                                      {t(faq.answerKey)}
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
            <h3 className="text-3xl text-white font-bold mb-4">{t("faqStillHaveQuestions")}</h3>
            <p className="text-xl text-white/90 mb-8">
              {t("faqHelpInfo")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-purple-600 rounded-xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">{t("faqContactSupport")}</Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  {t("faqContactSupport")}
                </Button>
              </Link>
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 rounded-xl px-8 py-6 text-lg font-semibold transition-all duration-300 bg-transparent"
                >
                  {t("getStarted")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
