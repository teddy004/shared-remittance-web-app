"use client"

import { useParams, useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Share2, ArrowLeft, Printer } from "@/lib/icons"

export default function TransactionReceiptPage() {
  const params = useParams()
  const router = useRouter()
  const transactionId = params.id as string

  // Mock transaction data
  const transaction = {
    id: transactionId,
    referenceNumber: "ZMN-2025-001234",
    status: "completed",
    date: "January 6, 2025 at 2:30 PM",
    sender: {
      name: "Abebe Kebede",
      email: "abebe.kebede@example.com",
      country: "United States",
    },
    recipient: {
      name: "Tigist Alemu",
      phone: "+251-911-234567",
      accountNumber: "1000123456789",
      accountType: "Bank Account",
      bank: "Commercial Bank of Ethiopia",
      country: "Ethiopia",
    },
    amount: {
      sent: 100.0,
      currency: "USD",
      received: 5680.0,
      receivedCurrency: "ETB",
      exchangeRate: 56.8,
      fee: 2.99,
      total: 102.99,
    },
    message: "For school fees",
    estimatedDelivery: "Within 24 hours",
    actualDelivery: "January 6, 2025 at 3:15 PM",
  }

  const handleDownload = () => {
    // In real app, generate PDF and download
    console.log("[v0] Downloading receipt...")
    alert("Receipt download functionality would be implemented here")
  }

  const handleShare = () => {
    // In real app, use Web Share API
    console.log("[v0] Sharing receipt...")
    if (navigator.share) {
      navigator
        .share({
          title: "Transaction Receipt",
          text: `Receipt for transaction ${transaction.referenceNumber}`,
          url: window.location.href,
        })
        .catch((err) => console.log("Error sharing:", err))
    } else {
      alert("Share functionality would be implemented here")
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white print:hidden">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => router.back()} className="mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Transactions
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Actions - Hide on print */}
        <div className="flex justify-end gap-3 mb-6 print:hidden">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleDownload} className="bg-primary">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>

        {/* Receipt Card */}
        <Card className="p-8 print:shadow-none print:border-0">
          {/* Header */}
          <div className="text-center mb-8 pb-6 border-b">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mb-4">
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">Transaction Receipt</h1>
            <p className="text-muted-foreground">Transfer Completed Successfully</p>
          </div>

          {/* Reference Number */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">Reference Number</p>
            <p className="text-xl font-mono font-bold text-primary">{transaction.referenceNumber}</p>
          </div>

          {/* Transaction Details */}
          <div className="space-y-6 mb-6">
            {/* Amount Section */}
            <div className="bg-primary/5 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">You Sent</p>
                  <p className="text-2xl font-bold text-primary">
                    ${transaction.amount.sent.toFixed(2)} {transaction.amount.currency}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Recipient Gets</p>
                  <p className="text-2xl font-bold text-success">
                    {transaction.amount.received.toLocaleString()} {transaction.amount.receivedCurrency}
                  </p>
                </div>
              </div>
            </div>

            {/* Sender Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Sender Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{transaction.sender.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email</span>
                  <span className="font-medium">{transaction.sender.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-medium">{transaction.sender.country}</span>
                </div>
              </div>
            </div>

            {/* Recipient Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Recipient Information</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Name</span>
                  <span className="font-medium">{transaction.recipient.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{transaction.recipient.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-medium">{transaction.recipient.bank}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account</span>
                  <span className="font-medium font-mono">{transaction.recipient.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Country</span>
                  <span className="font-medium">{transaction.recipient.country}</span>
                </div>
              </div>
            </div>

            {/* Transaction Breakdown */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Transaction Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transfer Amount</span>
                  <span className="font-medium">${transaction.amount.sent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span className="font-medium">
                    1 {transaction.amount.currency} = {transaction.amount.exchangeRate}{" "}
                    {transaction.amount.receivedCurrency}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span className="font-medium">${transaction.amount.fee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-semibold">
                  <span>Total Paid</span>
                  <span className="text-primary">${transaction.amount.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Timing Information */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Timing</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Initiated</span>
                  <span className="font-medium">{transaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-medium text-success">{transaction.actualDelivery}</span>
                </div>
              </div>
            </div>

            {/* Message */}
            {transaction.message && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Message</h3>
                <p className="text-muted-foreground italic">"{transaction.message}"</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="pt-6 border-t text-center text-sm text-muted-foreground">
            <p className="mb-2">Thank you for using GoozX Remittance</p>
            <p>For support, contact us at support@goozx.com or call +1-800-GOOZX</p>
            <p className="mt-4 text-xs">This is an official receipt for your transaction.</p>
          </div>
        </Card>

        {/* Help Text */}
        <p className="text-center text-sm text-muted-foreground mt-6 print:hidden">
          Keep this receipt for your records. You can download or print it anytime from your transaction history.
        </p>
      </div>
    </div>
  )
}
