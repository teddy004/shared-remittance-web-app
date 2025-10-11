"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, Edit } from "lucide-react"
import { mockServiceProviders, currentExchangeRate } from "@/lib/mock-data"

export default function MarketplaceReviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const providerId = searchParams.get("provider")
  const amount = searchParams.get("amount")
  const beneficiary = searchParams.get("beneficiary")
  const purpose = searchParams.get("purpose")

  const provider = mockServiceProviders.find((p) => p.id === providerId)

  if (!provider || !amount) {
    return null
  }

  const numericAmount = Number.parseFloat(amount)
  const transferFee = 1.99 // Lower fee for institutional payments
  const totalAmount = numericAmount + transferFee
  const amountInETB = numericAmount * currentExchangeRate.usdToEtb

  const handleConfirm = () => {
    router.push("/dashboard/marketplace/confirm")
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Review Payment</h1>
        <p className="text-muted-foreground">Please review all details before confirming</p>
      </div>

      {/* Provider Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment To</CardTitle>
            <CardDescription>Verified institution</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="h-14 w-14 rounded-lg">
              <AvatarImage src={provider.logo || "/placeholder.svg"} />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                {provider.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold">{provider.name}</p>
                <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              </div>
              <p className="text-sm capitalize text-muted-foreground">{provider.category}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Amount and purpose</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Payment Amount</span>
            <span className="font-medium">${numericAmount.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Service Fee</span>
            <span className="font-medium">${transferFee.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span className="font-medium">1 USD = {currentExchangeRate.usdToEtb} ETB</span>
          </div>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Amount</span>
              <span className="text-xl font-bold">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="rounded-lg bg-primary/10 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">Institution Receives</span>
              <span className="text-lg font-bold text-primary">{amountInETB.toLocaleString()} ETB</span>
            </div>
          </div>
          <div className="space-y-2 border-t pt-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Purpose</span>
              <span className="font-medium">{decodeURIComponent(purpose || "")}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Beneficiary</span>
              <span className="font-medium">{decodeURIComponent(beneficiary || "")}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <Shield className="h-5 w-5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Direct Payment Protection</p>
            <p className="text-xs text-muted-foreground">
              This payment goes directly to {provider.name}. You'll receive an official receipt from the institution.
              The beneficiary will receive the service, not cash.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleConfirm} className="h-12 w-full">
        Confirm Payment
      </Button>
    </div>
  )
}
