"use client"

import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle2, XCircle, Copy, Share2, Trash2 } from "@/lib/icons"
import { useState, useEffect } from "react"

export default function RequestDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [copied, setCopied] = useState(false)
  const [request, setRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadRequest()
  }, [params.id])

  const loadRequest = async () => {
    try {
      const res = await fetch(`/api/requests/${params.id}`)
      const data = await res.json()
      if (data.success) {
        setRequest(data.data)
      }
    } catch (error) {
      console.error("[v0] Error loading request:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto border-4 border-purple-600 border-t-transparent rounded-full" />
          <p className="mt-4 text-gray-600">Loading request...</p>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="py-12 text-center">
            <p>Request not found</p>
            <Button onClick={() => router.push("/dashboard/request")} className="mt-4">
              Back to Requests
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5" />
      case "completed":
        return <CheckCircle2 className="h-5 w-5" />
      case "cancelled":
        return <XCircle className="h-5 w-5" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-secondary/10 text-secondary-foreground border-secondary/20"
      case "completed":
        return "bg-success/10 text-success border-success/20"
      case "cancelled":
        return "bg-destructive/10 text-destructive border-destructive/20"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const requestLink = `https://goozx.app/pay/${request.id}`

  const handleCopy = () => {
    navigator.clipboard.writeText(requestLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCancel = async () => {
    try {
      const res = await fetch(`/api/requests/${request.id}/cancel`, {
        method: "POST",
      })
      const data = await res.json()
      if (data.success) {
        router.push("/dashboard/request")
      }
    } catch (error) {
      console.error("[v0] Error cancelling request:", error)
    }
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Request Details</h1>
        <p className="text-muted-foreground">View and manage this payment request</p>
      </div>

      <Card className={`border ${getStatusColor(request.status)}`}>
        <CardContent className="flex items-center gap-3 p-4">
          {getStatusIcon(request.status)}
          <div className="flex-1">
            <p className="font-semibold">
              {request.status === "pending"
                ? "Waiting for Payment"
                : request.status === "completed"
                  ? "Payment Received"
                  : "Request Cancelled"}
            </p>
            <p className="text-sm opacity-80">
              {request.status === "pending"
                ? "The recipient has been notified"
                : request.status === "completed"
                  ? "Money has been added to your wallet"
                  : "This request is no longer active"}
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Request Information</CardTitle>
          <CardDescription>Details about this payment request</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`/generic-placeholder-icon.png?height=48&width=48`} />
              <AvatarFallback className="bg-muted text-muted-foreground">
                {request.fromName
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{request.fromName}</p>
              <p className="text-sm text-muted-foreground">{request.fromEmail}</p>
            </div>
          </div>

          <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-2xl font-bold">${request.amount.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Purpose</span>
              <span className="font-medium">{request.purpose}</span>
            </div>
            {request.description && (
              <div className="border-t pt-3">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="mt-1 text-sm">{request.description}</p>
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Due Date</span>
              <span className="font-medium">{new Date(request.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Created</span>
              <span className="font-medium">{new Date(request.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {request.status === "pending" && (
        <Card>
          <CardHeader>
            <CardTitle>Payment Link</CardTitle>
            <CardDescription>Share this link to receive payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={requestLink}
                readOnly
                className="h-12 flex-1 rounded-lg border bg-muted/50 px-4 font-mono text-sm"
              />
              <Button onClick={handleCopy} size="icon" className="h-12 w-12 shrink-0">
                {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            {copied && <p className="text-xs text-success">Link copied to clipboard!</p>}

            <Button className="h-12 w-full gap-2 bg-transparent" variant="outline">
              <Share2 className="h-4 w-4" />
              Share Link
            </Button>
          </CardContent>
        </Card>
      )}

      {request.status === "pending" && (
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Cancel Request</CardTitle>
            <CardDescription>This action cannot be undone</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleCancel} variant="destructive" className="h-12 w-full gap-2">
              <Trash2 className="h-4 w-4" />
              Cancel Request
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
