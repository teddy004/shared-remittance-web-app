"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslation } from "@/lib/use-translation"
import { Building2, CheckCircle, Globe, Users } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    nameKey: "teamMember1Name" as const,
    roleKey: "teamMember1Role" as const,
    avatar: "/avatars/01.png",
  },
  {
    nameKey: "teamMember2Name" as const,
    roleKey: "teamMember2Role" as const,
    avatar: "/avatars/02.png",
  },
  {
    nameKey: "teamMember3Name" as const,
    roleKey: "teamMember3Role" as const,
    avatar: "/avatars/03.png",
  },
  {
    nameKey: "teamMember4Name" as const,
    roleKey: "teamMember4Role" as const,
    avatar: "/avatars/04.png",
  },
]

const coreValues = [
  {
    icon: Building2,
    titleKey: "valueInnovationTitle" as const,
    descriptionKey: "valueInnovationDescription" as const,
  },
  {
    icon: CheckCircle,
    titleKey: "valueSecurityTitle" as const,
    descriptionKey: "valueSecurityDescription" as const,
  },
  {
    icon: Users,
    titleKey: "valueCommunityTitle" as const,
    descriptionKey: "valueCommunityDescription" as const,
  },
  {
    icon: Globe,
    titleKey: "valueTransparencyTitle" as const,
    descriptionKey: "valueTransparencyDescription" as const,
  },
]

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">{t("aboutTitle")}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">{t("aboutSubtitle")}</p>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">{t("ourMissionTitle")}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t("ourMissionDescription")}</p>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900">{t("ourVisionTitle")}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{t("ourVisionDescription")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">{t("meetTheTeamTitle")}</h2>
            <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">{t("meetTheTeamDescription")}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.nameKey} className="text-center space-y-3">
                <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20 shadow-lg">
                  <AvatarImage src={member.avatar} alt={t(member.nameKey)} />
                  <AvatarFallback className="bg-primary text-white text-3xl">
                    {t(member.nameKey)
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{t(member.nameKey)}</h3>
                  <p className="text-primary">{t(member.roleKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary">{t("ourValuesTitle")}</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {coreValues.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.titleKey} className="text-center p-8 border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{t(value.titleKey)}</h3>
                  <p className="text-gray-600 leading-relaxed">{t(value.descriptionKey)}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary">
        <div className="container mx-auto px-6 text-center text-white">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-4xl font-bold">{t("joinUsTitle")}</h2>
            <p className="text-xl text-white/90 leading-relaxed">{t("joinUsDescription")}</p>
            <div className="pt-4">
              <Link href="/careers">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 rounded-xl px-10 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {t("viewCareers")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}