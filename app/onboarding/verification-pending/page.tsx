"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function VerificationPendingPage() {
  const router = useRouter()

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      router.push("/onboarding/verification-success")
    }, 3000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 rounded-full bg-primary" />
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          </div>
          <CardTitle className="text-2xl">Verifying Your Details</CardTitle>
          <CardDescription>Step 4 of 4 - Please wait while we verify your information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-6 py-8">
            <div className="relative">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-8 rounded-full bg-background" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">We're verifying your details...</p>
              <p className="mt-2 text-sm text-muted-foreground">This usually takes 2-3 minutes</p>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <p className="text-sm">Checking document authenticity</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary animation-delay-200" />
              <p className="text-sm">Verifying personal information</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 animate-pulse rounded-full bg-primary animation-delay-400" />
              <p className="text-sm">Running security checks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
