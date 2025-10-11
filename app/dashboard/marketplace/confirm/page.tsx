"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OTPInput } from "@/components/otp-input"
import { Shield } from "lucide-react"

export default function MarketplaceConfirmPage() {
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()

  const handleOTPComplete = async (otp: string) => {
    setIsVerifying(true)
    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push("/dashboard/marketplace/success")
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Confirm Your Payment</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <OTPInput length={6} onComplete={handleOTPComplete} />
          </div>

          <div className="text-center">
            <Button variant="link" className="text-primary">
              Resend Code
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              This security step ensures your payment goes to the correct institution and protects your account.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
