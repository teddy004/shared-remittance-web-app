"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Smile } from "lucide-react"
import { mockRecipients } from "@/lib/mock-data"

const messageSuggestions = [
  "Happy Birthday!",
  "For school fees",
  "Monthly support",
  "Medical expenses",
  "Thinking of you",
  "Love you!",
]

export default function SendMessagePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const recipientId = searchParams.get("recipient")
  const amount = searchParams.get("amount")
  const currency = searchParams.get("currency")

  const [message, setMessage] = useState("")

  const recipient = mockRecipients.find((r) => r.id === recipientId)

  if (!recipient) {
    return null
  }

  const handleContinue = () => {
    router.push(
      `/dashboard/send/review?recipient=${recipientId}&amount=${amount}&currency=${currency}&message=${encodeURIComponent(message)}`,
    )
  }

  const handleSkip = () => {
    router.push(`/dashboard/send/review?recipient=${recipientId}&amount=${amount}&currency=${currency}`)
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Add a Message</h1>
        <p className="text-muted-foreground">Send a personal note with your transfer (optional)</p>
      </div>

      {/* Recipient Card */}
      <Card>
        <CardContent className="flex items-center gap-3 p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={recipient.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {recipient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">{recipient.name}</p>
            <p className="text-sm text-muted-foreground">
              Sending ${amount} {currency}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Message Input */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Message</CardTitle>
          <CardDescription>Add a note to let them know you're thinking of them</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Textarea
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, 200))}
              className="min-h-[120px] resize-none"
              maxLength={200}
            />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{message.length}/200 characters</span>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <Smile className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Message Suggestions */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Quick suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {messageSuggestions.map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(suggestion)}
                  className="h-8"
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleSkip} variant="outline" className="h-12 flex-1 bg-transparent">
              Skip
            </Button>
            <Button onClick={handleContinue} className="h-12 flex-1 gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
