"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Download, Send, Home } from "lucide-react"

export default function SendSuccessPage() {
  const [showAnimation, setShowAnimation] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 100)
  }, [])

  const referenceNumber = "ZMN-2025-" + Math.floor(Math.random() * 900000 + 100000)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div
            className={`mx-auto mb-4 transition-all duration-500 ${showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
          >
            <CheckCircle2 className="h-24 w-24 text-success" />
          </div>
          <CardTitle className="text-2xl">Transfer Completed!</CardTitle>
          <CardDescription>Your money is on its way</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Reference Number</span>
              <span className="font-mono font-medium">{referenceNumber}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-success">Completed</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Estimated Delivery</span>
              <span className="font-medium">Within 10 minutes</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="h-12 w-full gap-2 bg-transparent" variant="outline">
              <Download className="h-4 w-4" />
              View Receipt
            </Button>
            <Button onClick={() => router.push("/dashboard/send")} className="h-12 w-full gap-2" variant="outline">
              <Send className="h-4 w-4" />
              Send Again
            </Button>
            <Button onClick={() => router.push("/dashboard")} className="h-12 w-full gap-2">
              <Home className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
