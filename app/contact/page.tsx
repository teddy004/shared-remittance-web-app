"use client";

import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { Textarea } from "@/components/textarea";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "@/lib/icons";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-blue-500/25 to-purple-500/25 rounded-full blur-xl animate-pulse delay-500"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="mx-auto max-w-4xl space-y-8">
            <h1 className="text-5xl md:text-6xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent drop-shadow-2xl">
                Get in Touch
              </span>
            </h1>
            <p className="text-xl text-purple-100 leading-relaxed max-w-3xl mx-auto font-light drop-shadow-lg">
              We're here to help you with any questions or concerns. Reach out
              to us through any of our contact methods below.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">
              Send us a Message
            </h2>
            <p className="text-xl text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <Card className="border-purple-100 shadow-xl card">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your question or issue in detail"
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  className="group relative w-full py-6 text-lg font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  <span className="relative z-10">Send Message</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Office and Social Media */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/30 relative overflow-hidden">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
            <div className="group">
              <h2 className="text-4xl font-black text-gray-800 mb-6">
                Visit Our Office
              </h2>
              <div className="space-y-4">
                <div className="group relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-purple-200/60 hover:border-purple-400/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-gray-900 mb-3">
                        Goozam Technologies HQ
                      </h3>
                      <p className="text-gray-700 text-lg mb-2 font-medium">
                        Bole Sub-city, Addis Ababa, Ethiopia
                      </p>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        Located in the heart of Ethiopia's tech innovation
                        district, our headquarters serves as the central hub for
                        our global operations.
                      </p>

                      {/* Contact Information */}
                      <div className="space-y-4 pt-4 border-t border-gray-200">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Email Support
                          </h4>
                          <p className="text-gray-600">support@goozx.com</p>
                          <p className="text-sm text-gray-500">
                            Response time: Within 2 hours
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Phone Support
                          </h4>
                          <p className="text-gray-600">+251 11 123 4567</p>
                          <p className="text-sm text-gray-500">
                            Ethiopia Office • Mon-Fri 9AM-6PM EST
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-2">
                            Business Hours
                          </h4>
                          <p className="text-gray-600">
                            Mon-Fri: 9:00 AM - 6:00 PM EST
                          </p>
                          <p className="text-sm text-gray-500">
                            Emergency support available 24/7
                          </p>
                        </div>

                        <div className="pt-2">
                          <p className="text-gray-600">
                            Have questions? Check our{" "}
                            <a
                              href="/faq"
                              className="text-purple-600 hover:text-purple-700 font-semibold underline decoration-2 underline-offset-4 transition-colors"
                            >
                              FAQ page
                            </a>{" "}
                            for quick answers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <h2 className="text-4xl font-black text-gray-800 mb-6">
                Follow Us
              </h2>
              <p className="text-gray-700 mb-8 text-lg leading-relaxed">
                Stay connected and get the latest updates about our services and
                features. Join our community of satisfied customers worldwide.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="#"
                  className="group relative p-6 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <Twitter className="w-8 h-8 mb-2 relative z-10" />
                  <span className="text-sm font-semibold relative z-10">
                    Twitter
                  </span>
                </a>
                <a
                  href="#"
                  className="group relative p-6 bg-gradient-to-br from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <Facebook className="w-8 h-8 mb-2 relative z-10" />
                  <span className="text-sm font-semibold relative z-10">
                    Facebook
                  </span>
                </a>
                <a
                  href="#"
                  className="group relative p-6 bg-gradient-to-br from-blue-700 to-blue-900 hover:from-blue-800 hover:to-indigo-900 text-white rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <Linkedin className="w-8 h-8 mb-2 relative z-10" />
                  <span className="text-sm font-semibold relative z-10">
                    LinkedIn
                  </span>
                </a>
                <a
                  href="#"
                  className="group relative p-6 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <MessageCircle className="w-8 h-8 mb-2 relative z-10" />
                  <span className="text-sm font-semibold relative z-10">
                    WhatsApp
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
