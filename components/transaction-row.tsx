"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/status-badge"
import { ArrowUpRight, ArrowDownLeft } from "@/lib/icons"
import { cn } from "@/lib/utils"

interface TransactionRowProps {
  transaction: {
    id: string;
    recipientName: string;
    type: "sent" | "received" | "request";
    status: "completed" | "pending" | "failed";
    amount: number;
    date: string;
  }
  onClick?: () => void
}

export function TransactionRow({ transaction, onClick }: TransactionRowProps) {
  const isSent = transaction.type === "sent"
  const isReceived = transaction.type === "received"

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    }
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-muted/50"
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`/ceholder-svg-key-9btlu.jpg?key=9btlu&height=40&width=40`} />
          <AvatarFallback className="bg-purple-600/10 text-purple-600">
            {getInitials(transaction.recipientName)}
          </AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background",
            isSent ? "bg-destructive/10 text-destructive" : "bg-success/10 text-success",
          )}
        >
          {isSent ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownLeft className="h-3 w-3" />}
        </div>
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium">{transaction.recipientName}</p>
          <p
            className={cn(
              "font-semibold",
              isSent ? "text-destructive" : isReceived ? "text-success" : "text-foreground",
            )}
          >
            {isSent ? "-" : "+"}${transaction.amount.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground capitalize">{transaction.type}</p>
          <div className="flex items-center gap-2">
            <StatusBadge status={transaction.status} />
            <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
          </div>
        </div>
      </div>
    </button>
  )
}
