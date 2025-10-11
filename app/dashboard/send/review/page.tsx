"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Clock, Shield, Edit, Lock, CheckCircle } from "@/lib/icons"

export default function SendReviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recipientId = searchParams.get("recipient")
  const amount = searchParams.get("amount")
  const currency = searchParams.get("currency")
  const bank = searchParams.get("bank")
  const rate = searchParams.get("rate")

  const [recipient, setRecipient] = useState<any>(null)
  const [countdown, setCountdown] = useState(600) // 10 minutes
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [processing, setProcessing] = useState(false)
  const [transactionData, setTransactionData] = useState<any>(null)

  useEffect(() => {
    loadRecipient()
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const loadRecipient = async () => {
    try {
      const res = await fetch(`/api/recipients/${recipientId}`)
      const data = await res.json()
      if (data.success) {
        setRecipient(data.data)
      }
    } catch (error) {
      console.error("[v0] Error loading recipient:", error)
    }
  }

  if (!recipient || !amount || !currency || !bank || !rate) {
    return null
  }

  const numericAmount = Number.parseFloat(amount)
  const exchangeRate = Number.parseFloat(rate)
  const transferFee = 2.99
  const totalAmount = numericAmount + transferFee
  const recipientReceives = numericAmount * exchangeRate

  const minutes = Math.floor(countdown / 60)
  const seconds = countdown % 60

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", SAR: "﷼", AED: "د.إ" }
    return symbols[curr] || curr
  }

  const handleConfirm = () => {
    setShowPasswordDialog(true)
  }

  const handlePasswordSubmit = async () => {
    setPasswordError("")

    if (!password) {
      setPasswordError("Please enter your password")
      return
    }

    setProcessing(true)

    try {
      // Verify password
      const authRes = await fetch("/api/auth/verify-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const authData = await authRes.json()

      if (!authData.success) {
        setPasswordError("Incorrect password. Please try again.")
        setProcessing(false)
        return
      }

      // Submit transaction
      const transferRes = await fetch("/api/send/transfer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientId,
          amount: numericAmount,
          currency,
          bank,
          exchangeRate,
          fee: transferFee,
        }),
      })

      const transferData = await transferRes.json()

      if (transferData.success) {
        setTransactionData(transferData.data)
        setShowPasswordDialog(false)
        setShowSuccessDialog(true)
      } else {
        setPasswordError(transferData.message || "Transaction failed. Please try again.")
      }
    } catch (error) {
      console.error("[v0] Transaction error:", error)
      setPasswordError("An error occurred. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  const handleViewReceipt = () => {
    if (transactionData) {
      router.push(`/dashboard/transactions/${transactionData.transactionId}/receipt`)
    }
  }

  const handleBackToDashboard = () => {
    router.push("/dashboard")
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Review Transfer</h1>
        <p className="text-muted-foreground">Please review all details before confirming</p>
      </div>

      {/* Rate Lock Timer */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Exchange rate locked</p>
            <p className="text-xs text-muted-foreground">
              Rate expires in {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recipient</CardTitle>
            <CardDescription>Who will receive the money</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard/send")} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={recipient.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {recipient.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{recipient.name}</p>
              <p className="text-sm text-muted-foreground">{recipient.phone}</p>
              <p className="text-sm text-muted-foreground">
                {recipient.accountType === "bank" ? "Bank Account" : "Mobile Wallet"} • {recipient.accountNumber}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amount Breakdown */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Amount Details</CardTitle>
            <CardDescription>Transfer breakdown</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.back()} className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Send Amount</span>
            <span className="font-medium">
              {getCurrencySymbol(currency)}
              {numericAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Transfer Fee</span>
            <span className="font-medium">
              {getCurrencySymbol(currency)}
              {transferFee.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Exchange Rate ({bank.toUpperCase()})</span>
            <span className="font-medium">
              1 {currency} = {exchangeRate.toFixed(2)} ETB
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Amount</span>
              <span className="text-xl font-bold">
                {getCurrencySymbol(currency)}
                {totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-success/10 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-success">Recipient Receives</span>
              <span className="text-lg font-bold text-success">{recipientReceives.toLocaleString()} ETB</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated delivery: Within 10 minutes</span>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <Shield className="h-5 w-5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Secure Transfer</p>
            <p className="text-xs text-muted-foreground">
              Your transfer is protected with bank-level encryption. You'll need to verify your password to complete
              this transaction.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleConfirm} className="h-12 w-full gap-2">
        <Lock className="h-4 w-4" />
        Confirm Transfer
      </Button>

      {/* Password Verification Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify Your Password</DialogTitle>
            <DialogDescription>Please enter your password to confirm this transfer</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError("")
                }}
                placeholder="Enter your password"
                className="h-12"
                disabled={processing}
              />
              {passwordError && <p className="text-sm text-destructive">{passwordError}</p>}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPasswordDialog(false)}
                className="flex-1"
                disabled={processing}
              >
                Cancel
              </Button>
              <Button onClick={handlePasswordSubmit} className="flex-1" disabled={processing}>
                {processing ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Transfer Complete!</h2>
              <p className="text-muted-foreground">
                Your transfer of {getCurrencySymbol(currency)}
                {numericAmount.toFixed(2)} to {recipient.name} was successful.
              </p>
            </div>
            <div className="w-full space-y-2 rounded-lg border bg-muted/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono font-medium">{transactionData?.referenceNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Recipient Receives</span>
                <span className="font-bold text-success">{recipientReceives.toLocaleString()} ETB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">New Balance</span>
                <span className="font-medium">
                  {getCurrencySymbol(currency)}
                  {transactionData?.newBalance?.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <Button variant="outline" onClick={handleViewReceipt} className="flex-1 bg-transparent">
                View Receipt
              </Button>
              <Button onClick={handleBackToDashboard} className="flex-1">
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
