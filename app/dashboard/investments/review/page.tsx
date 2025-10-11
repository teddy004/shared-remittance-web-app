"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function InvestmentReviewPage() {
  const searchParams = useSearchParams()
  const investmentId = searchParams.get("id")
  const amount = searchParams.get("amount")
  const [showOTP, setShowOTP] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const investment = {
    id: investmentId,
    name: "Ethiopian Government Bonds",
    type: "Government Bond",
    expectedReturn: "8-10%",
    term: "5 years",
    risk: "Low",
  }

  const handleConfirm = () => {
    setShowOTP(true)
  }

  const handleOTPSubmit = () => {
    window.location.href = `/dashboard/investments/success?id=${investmentId}&amount=${amount}`
  }

  if (showOTP) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-lg border border-border p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">Verify Investment</h2>
              <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your phone</p>
            </div>

            <div className="flex gap-2 justify-center mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...otp]
                    newOtp[index] = e.target.value
                    setOtp(newOtp)
                    if (e.target.value && index < 5) {
                      const nextInput = document.getElementById(`otp-${index + 1}`)
                      nextInput?.focus()
                    }
                  }}
                  id={`otp-${index}`}
                  className="w-12 h-12 text-center text-lg font-semibold border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              ))}
            </div>

            <Button onClick={handleOTPSubmit} disabled={otp.some((digit) => !digit)} className="w-full mb-3" size="lg">
              Confirm Investment
            </Button>

            <button className="w-full text-sm text-primary hover:underline">Resend Code</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <a
          href={`/dashboard/investments/${investmentId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </a>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Review Investment</h1>
          <p className="text-muted-foreground">Please review your investment details before confirming</p>
        </div>

        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <h3 className="font-semibold text-foreground mb-4">Investment Details</h3>

          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Investment Product</span>
              <span className="font-medium text-foreground text-right">{investment.name}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Type</span>
              <span className="font-medium text-foreground">{investment.type}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Investment Amount</span>
              <span className="font-medium text-foreground">${Number.parseFloat(amount || "0").toLocaleString()}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Expected Return</span>
              <span className="font-medium text-success">{investment.expectedReturn}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Term</span>
              <span className="font-medium text-foreground">{investment.term}</span>
            </div>

            <div className="flex justify-between py-3 border-b border-border">
              <span className="text-muted-foreground">Risk Level</span>
              <span className="font-medium text-success">{investment.risk}</span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-muted-foreground">Estimated Annual Return</span>
              <span className="font-medium text-success">
                $
                {(Number.parseFloat(amount || "0") * 0.09).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-6">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm text-foreground">
                <strong>Important:</strong> Investments carry risk and returns are not guaranteed. Please ensure you
                have read and understood all investment documents before proceeding.
              </p>
            </div>
          </div>
        </div>

        <Button onClick={handleConfirm} className="w-full" size="lg">
          Confirm Investment
        </Button>
      </div>
    </div>
  )
}
