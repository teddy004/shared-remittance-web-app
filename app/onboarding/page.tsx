import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Globe } from "lucide-react"

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-purple-100 bg-white shadow-xl card">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-purple-600 shadow-lg">
            <span className="text-4xl font-bold text-white">Z</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-gray-900">Welcome to GoozX</CardTitle>
            <CardDescription className="text-base text-gray-600">Empowering Cross-Border Connections</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-gray-700 leading-relaxed px-2">
            Send money home with purpose. Support education, healthcare, and family needs with transparent, secure
            transfers.
          </p>

          <div className="space-y-3">
            <Link href="/onboarding/register" className="block">
              <Button
                className="btn-primary h-12 w-full gap-2 font-medium shadow-md hover:shadow-lg transition-all"
                size="lg"
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/onboarding/language" className="block">
              <Button
                variant="outline"
                className="h-12 w-full gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 font-medium bg-transparent"
                size="lg"
              >
                <Globe className="h-5 w-5" />
                Choose Language First
              </Button>
            </Link>
          </div>

          <div className="pt-4 text-center border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-purple-600 hover:text-purple-700 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
