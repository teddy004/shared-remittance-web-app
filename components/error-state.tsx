"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, RefreshCw } from "@/lib/icons"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

export function ErrorState({
  title = "Something went wrong",
  message = "We encountered an error while loading this content. Please try again.",
  onRetry,
  showRetry = true,
}: ErrorStateProps) {
  return (
    <Card className="p-12 text-center border-error/20 bg-error/5">
      <AlertTriangle className="h-16 w-16 text-error mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-error mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{message}</p>
      {showRetry && onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          className="border-error text-error hover:bg-error hover:text-white bg-transparent"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
      )}
    </Card>
  )
}
