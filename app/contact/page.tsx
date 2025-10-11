"use client"

import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, Twitter, Facebook, Linkedin, MessageCircle } from "@/lib/icons"
import { useTranslation } from "@/lib/use-translation"

// export const metadata: Metadata = {
//   title: "Contact Us | GoozX Remittance",
//   description: "Get in touch with our support team for assistance with your international money transfers.",
// }

export default function ContactPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">{t("contactGetInTouch")}</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t("contactDescription")}
            </p>
            <p className="text-lg text-gray-500">{t("contactResponseTime")}</p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
            <Card className="border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center">{t("contactEmailSupport")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{t("contactEmailDescription")}</p>
                <p className="text-lg font-semibold text-primary">support@goozx.com</p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center">{t("contactPhoneSupport")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{t("contactPhoneDescription")}</p>
                <p className="text-lg font-semibold text-primary">+251 11 123 4567</p>
                <p className="text-sm text-gray-500 mt-2">{t("contactPhoneOffice")}</p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card">
              <CardHeader>
                <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center">{t("contactBusinessHours")}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">{t("contactBusinessHoursDescription")}</p>
                <p className="text-lg font-semibold text-success">{t("contactBusinessHoursTime")}</p>
                <p className="text-sm text-gray-500 mt-2">{t("contactBusinessHoursResponse")}</p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600">
              {t("contactHaveQuestions")}{" "}
              <a
                href="/faq"
                className="text-primary hover:text-accent font-semibold ml-1 underline decoration-2 underline-offset-4"
              >
                {t("contactFaqLink")}
              </a>
              {t("contactForQuickAnswers")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">{t("contactSendMessageTitle")}</h2>
            <p className="text-xl text-gray-600">{t("contactSendMessageDescription")}</p>
          </div>

          <Card className="border-purple-100 shadow-xl card">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("contactFormFirstName")}</Label>
                    <Input id="firstName" placeholder={t("contactFormFirstNamePlaceholder")} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t("contactFormLastName")}</Label>
                    <Input id="lastName" placeholder={t("contactFormLastNamePlaceholder")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t("contactFormEmail")}</Label>
                  <Input id="email" type="email" placeholder={t("contactFormEmailPlaceholder")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">{t("contactFormSubject")}</Label>
                  <Input id="subject" placeholder={t("contactFormSubjectPlaceholder")} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t("contactFormMessage")}</Label>
                  <Textarea id="message" placeholder={t("contactFormMessagePlaceholder")} rows={5} />
                </div>

                <Button
                  type="submit"
                  className="btn-primary w-full py-6 text-lg font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {t("contactFormSend")}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office and Social Media */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">{t("contactVisitOffice")}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg border border-purple-100 card">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">GoozX HQ</h3>
                    <p className="text-gray-600">{t("contactOfficeLocation")}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {t("contactOfficeDescription")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">{t("contactFollowUs")}</h2>
              <p className="text-gray-600 mb-6 text-lg">
                {t("contactFollowUsDescription")}
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-14 h-14 bg-primary hover:bg-accent text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Twitter className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-primary hover:bg-accent text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-primary hover:bg-accent text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="w-14 h-14 bg-success hover:bg-success/90 text-white rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
