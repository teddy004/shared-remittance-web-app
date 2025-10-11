"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function InvestmentSuccessPage() {
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount")

  const referenceNumber = `INV-${Date.now().toString().slice(-8)}`

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg border border-border p-6 text-center">
          <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-foreground mb-2">Investment Confirmed!</h2>
          <p className="text-muted-foreground mb-6">Your investment has been successfully processed</p>

          <div className="bg-background rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-xl font-bold text-foreground">
                ${Number.parseFloat(amount || "0").toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">Reference</span>
              <span className="text-sm font-mono text-foreground">{referenceNumber}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="text-sm text-foreground">{new Date().toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-6">
            <p className="text-sm text-foreground">
              You will receive a confirmation email with your investment certificate and detailed terms within 24 hours.
            </p>
          </div>

          <div className="space-y-3">
            <Button onClick={() => (window.location.href = "/dashboard")} className="w-full" size="lg">
              Back to Dashboard
            </Button>
            <Button
              onClick={() => (window.location.href = "/dashboard/investments")}
              variant="outline"
              className="w-full"
              size="lg"
            >
              View All Investments
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
