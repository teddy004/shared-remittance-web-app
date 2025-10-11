"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "@/lib/icons"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="h-16 w-16 text-error mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-2">Oops! Something went wrong</h1>
        <p className="text-muted-foreground mb-6">
          We encountered an unexpected error. Don't worry, our team has been notified and we're working on it.
        </p>
        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go Home
          </Button>
          <Button onClick={reset} className="bg-primary">
            Try Again
          </Button>
        </div>
        {error.digest && <p className="text-xs text-muted-foreground mt-4">Error ID: {error.digest}</p>}
      </div>
    </div>
  )
}
