"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OTPInput } from "@/components/otp-input"
import { Shield } from "@/lib/icons"

export default function SendConfirmPage() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleOTPComplete = async (otp: string) => {
    setIsVerifying(true)
    setError("")

    try {
      const res = await fetch("/api/send/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp,
          transactionId: searchParams.get("transactionId"),
        }),
      })

      const data = await res.json()

      if (data.success) {
        router.push(`/dashboard/send/success?transactionId=${data.data.transactionId}`)
      } else {
        setError(data.error || "Invalid OTP. Please try again.")
        setIsVerifying(false)
      }
    } catch (error) {
      console.error("[v0] Error confirming transaction:", error)
      setError("An error occurred. Please try again.")
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    try {
      await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose: "transaction",
        }),
      })
      alert("Code resent successfully!")
    } catch (error) {
      console.error("[v0] Error resending code:", error)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Shield className="h-6 w-6" />
          </div>
          <CardTitle className="text-2xl">Confirm Your Transfer</CardTitle>
          <CardDescription>Enter the 6-digit code sent to your email</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <OTPInput length={6} onComplete={handleOTPComplete} disabled={isVerifying} />
          </div>

          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">{error}</div>
          )}

          <div className="text-center">
            <Button variant="link" className="text-primary" onClick={handleResendCode} disabled={isVerifying}>
              Resend Code
            </Button>
          </div>

          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              This security step helps protect your account and ensures only you can authorize transfers.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
