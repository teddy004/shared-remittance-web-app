"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function GiftCheckoutPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get("id")
  const quantity = Number.parseInt(searchParams.get("quantity") || "1")

  const [recipientName, setRecipientName] = useState("")
  const [recipientPhone, setRecipientPhone] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [recipientCity, setRecipientCity] = useState("")
  const [giftMessage, setGiftMessage] = useState("")

  const product = {
    id: productId,
    name: "Ethiopian Coffee Gift Set",
    price: 45,
    image: "/ethiopian-coffee-gift-set.jpg",
  }

  const subtotal = product.price * quantity
  const deliveryFee = 5
  const total = subtotal + deliveryFee

  const handleCheckout = () => {
    window.location.href = `/dashboard/gifts/review?id=${productId}&quantity=${quantity}&name=${encodeURIComponent(recipientName)}&phone=${encodeURIComponent(recipientPhone)}`
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <a
          href={`/dashboard/gifts/${productId}`}
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Product
        </a>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">Checkout</h1>
          <p className="text-muted-foreground">Enter recipient details for delivery</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Recipient Information</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Enter recipient's full name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => setRecipientPhone(e.target.value)}
                    placeholder="+251-911-234567"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address *</Label>
                  <Input
                    id="address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    placeholder="Street address, building, apartment"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={recipientCity}
                    onChange={(e) => setRecipientCity(e.target.value)}
                    placeholder="Addis Ababa"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Gift Message (Optional)</h2>

              <Textarea
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                placeholder="Add a personal message to your gift..."
                rows={4}
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground mt-2">{giftMessage.length}/200 characters</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="bg-card rounded-lg border border-border p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">Order Summary</h2>

              <div className="flex gap-3 mb-4 pb-4 border-b border-border">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-foreground text-sm mb-1">{product.name}</p>
                  <p className="text-sm text-muted-foreground">Qty: {quantity}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="text-foreground">${deliveryFee.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-border mb-6">
                <span className="font-semibold text-foreground">Total</span>
                <span className="text-2xl font-bold text-foreground">${total.toFixed(2)}</span>
              </div>

              <Button
                onClick={handleCheckout}
                disabled={!recipientName || !recipientPhone || !recipientAddress || !recipientCity}
                className="w-full"
                size="lg"
              >
                Continue to Payment
              </Button>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="w-4 h-4 text-success" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
