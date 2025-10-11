import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
} from "@/lib/icons";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-primary">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We're here to help! Reach out to our support team for assistance
              with your remittance needs.
            </p>
            <p className="text-lg text-gray-500">
              We respond within 24 hours during business days.
            </p>
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
                <CardTitle className="text-2xl text-center">
                  Email Support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Contact us via email for detailed inquiries
                </p>
                <p className="text-lg font-semibold text-primary">
                  support@goozx.com
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card">
              <CardHeader>
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Phone className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center">
                  Phone Support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">
                  Call us for immediate assistance
                </p>
                <p className="text-lg font-semibold text-primary">
                  +251 11 123 4567
                </p>
                <p className="text-sm text-gray-500 mt-2">Ethiopia office</p>
              </CardContent>
            </Card>

            <Card className="border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 card">
              <CardHeader>
                <div className="w-16 h-16 bg-success rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-center">
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-4">When we're available</p>
                <p className="text-lg font-semibold text-success">
                  Mon-Fri: 9:00 AM - 6:00 PM EST
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Support Response: Within 24 hours
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-lg text-gray-600">
              Have questions? Check our
              <a
                href="/faq"
                className="text-primary hover:text-accent font-semibold ml-1 underline decoration-2 underline-offset-4"
              >
                FAQ page
              </a>{" "}
              for quick answers.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
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
                  className="btn-primary w-full py-6 text-lg font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Send Message
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
              <h2 className="text-4xl font-bold text-primary mb-6">
                Visit Our Office
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg border border-purple-100 card">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Goozam Technologies HQ
                    </h3>
                    <p className="text-gray-600">
                      Bole Sub-city, Addis Ababa, Ethiopia
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                      Located in the heart of Ethiopia's tech innovation
                      district
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Follow Us
              </h2>
              <p className="text-gray-600 mb-6 text-lg">
                Stay connected and get the latest updates about our services and
                features.
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
  );
}
