"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OTPInput } from "@/components/otp-input"
import { apiClient } from "@/lib/api-client"
import { Loader2, Copy, CheckCircle } from "@/lib/icons"

export default function MFAPage() {
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [displayOTP, setDisplayOTP] = useState("")
  const [copied, setCopied] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const email = sessionStorage.getItem("pendingEmail")
    if (!email) {
      router.push("/onboarding/register")
      return
    }
    setUserEmail(email)

    const sendInitialOTP = async () => {
      try {
        const response = await apiClient.auth.sendOTP(email)
        if (!response.success) {
          throw new Error(response.error?.message || "Failed to send OTP")
        }
        if (response.data?.code) {
          setDisplayOTP(response.data.code)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to send OTP. Please try again."
        setError(errorMessage)
        console.error("[v0] OTP send error:", errorMessage)
      }
    }
    sendInitialOTP()
  }, [router])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleOTPComplete = async (otp: string) => {
    setError("")
    setIsVerifying(true)

    try {
      const response = await apiClient.auth.verifyOTP({ email: userEmail, code: otp })
      if (!response.success) {
        throw new Error(response.error?.message || "Invalid OTP code")
      }

      if (response.data?.token) {
        localStorage.setItem("auth_token", response.data.token)
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user))
        }
      }

      sessionStorage.removeItem("pendingEmail")
      router.push("/onboarding/profile")
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Invalid OTP. Please try again."
      setError(errorMessage)
      console.error("[v0] OTP verification error:", errorMessage)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setError("")
    setCountdown(60)
    setCanResend(false)
    setCopied(false)

    try {
      const response = await apiClient.auth.sendOTP(userEmail)
      if (!response.success) {
        throw new Error(response.error?.message || "Failed to resend OTP")
      }
      if (response.data?.code) {
        setDisplayOTP(response.data.code)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to resend OTP. Please try again."
      setError(errorMessage)
      console.error("[v0] OTP resend error:", errorMessage)
    }
  }

  const handleCopyOTP = () => {
    navigator.clipboard.writeText(displayOTP)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verify Your Identity</CardTitle>
          <CardDescription>We sent a 6-digit code to {userEmail}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive text-center">{error}</div>
          )}

          {displayOTP && (
            <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Demo Mode - Your OTP Code
                </p>
                <Button variant="ghost" size="sm" onClick={handleCopyOTP} className="h-7 px-2 text-xs">
                  {copied ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <p className="text-3xl font-bold tracking-widest text-primary font-mono">{displayOTP}</p>
              </div>
              <p className="text-xs text-center text-muted-foreground mt-2">
                Copy this code and paste it below to verify
              </p>
            </div>
          )}

          <div className="flex justify-center">
            <OTPInput length={6} onComplete={handleOTPComplete} disabled={isVerifying} />
          </div>

          {isVerifying && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Verifying...
            </div>
          )}

          <div className="text-center">
            {canResend ? (
              <Button variant="link" onClick={handleResend} className="text-primary">
                Resend Code
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend code in <span className="font-medium text-foreground">{countdown}s</span>
              </p>
            )}
          </div>

          <div className="rounded-lg border bg-muted/50 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              This is a demo environment. In production, the OTP would be sent to your email.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
