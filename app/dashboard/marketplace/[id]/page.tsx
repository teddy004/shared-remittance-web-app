"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle2, Info, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { mockServiceProviders } from "@/lib/mock-data"

export default function ProviderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [amount, setAmount] = useState("")
  const [beneficiaryName, setBeneficiaryName] = useState("")
  const [beneficiaryId, setBeneficiaryId] = useState("")
  const [purpose, setPurpose] = useState("")
  const [notes, setNotes] = useState("")

  const provider = mockServiceProviders.find((p) => p.id === params.id)

  if (!provider) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="py-12 text-center">
            <p>Provider not found</p>
            <Button onClick={() => router.push("/dashboard/marketplace")} className="mt-4">
              Back to Marketplace
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(
      `/dashboard/marketplace/review?provider=${provider.id}&amount=${amount}&beneficiary=${beneficiaryName}&purpose=${purpose}`,
    )
  }

  const isFormValid = amount && beneficiaryName && beneficiaryId && purpose

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Make Payment</h1>
        <p className="text-muted-foreground">Pay directly to the institution</p>
      </div>

      {/* Provider Info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 rounded-lg">
              <AvatarImage src={provider.logo || "/placeholder.svg"} />
              <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                {provider.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{provider.name}</h2>
                {provider.verified && (
                  <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="font-medium">{provider.rating}</span>
                <span className="text-muted-foreground">(1,234 payments)</span>
              </div>
              <p className="text-sm capitalize text-muted-foreground">{provider.category}</p>
            </div>
          </div>

          <div className="mt-4 space-y-2 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>+251-11-123-4567</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>info@{provider.name.toLowerCase().replace(/\s+/g, "")}.edu.et</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>Enter the payment information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD) *</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 pl-8 text-lg font-semibold"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Payment Purpose *</Label>
              <Input
                id="purpose"
                placeholder={
                  provider.category === "education"
                    ? "e.g., Tuition Fee - Fall 2025"
                    : provider.category === "healthcare"
                      ? "e.g., Medical Consultation"
                      : "e.g., Monthly Bill"
                }
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="h-12"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beneficiary Information</CardTitle>
            <CardDescription>Who is this payment for?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="beneficiaryName">Beneficiary Name *</Label>
              <Input
                id="beneficiaryName"
                placeholder="Full name of student/patient/account holder"
                value={beneficiaryName}
                onChange={(e) => setBeneficiaryName(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="beneficiaryId">
                {provider.category === "education"
                  ? "Student ID"
                  : provider.category === "healthcare"
                    ? "Patient ID"
                    : "Account Number"}{" "}
                *
              </Label>
              <Input
                id="beneficiaryId"
                placeholder={
                  provider.category === "education"
                    ? "e.g., STU-2025-001234"
                    : provider.category === "healthcare"
                      ? "e.g., PAT-123456"
                      : "e.g., ACC-789012"
                }
                value={beneficiaryId}
                onChange={(e) => setBeneficiaryId(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information for the institution..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px] resize-none"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground">{notes.length}/200 characters</p>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="h-5 w-5 shrink-0 text-primary" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Direct Payment Guarantee</p>
              <p className="text-xs text-muted-foreground">
                Your payment goes directly to {provider.name}. The beneficiary will receive the service, not cash.
                You'll get a receipt from the institution confirming the payment.
              </p>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" disabled={!isFormValid} className="h-12 w-full gap-2">
          Continue to Review <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
