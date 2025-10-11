"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, CheckCircle, AlertCircle, Info, CreditCard, Settings, Trash2, Check } from "@/lib/icons"

interface Notification {
  id: string
  type: "success" | "warning" | "info" | "transaction"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
}

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Transfer Completed",
      message: "Your transfer of $100 to Tigist Alemu has been completed successfully.",
      timestamp: "2025-01-06T14:30:00Z",
      read: false,
      actionUrl: "/dashboard/transactions/1",
    },
    {
      id: "2",
      type: "info",
      title: "New Money Request",
      message: "Sarah Johnson has requested $150 for Rent Payment.",
      timestamp: "2025-01-06T12:15:00Z",
      read: false,
      actionUrl: "/dashboard/request",
    },
    {
      id: "3",
      type: "warning",
      title: "KYC Document Expiring",
      message: "Your passport document will expire in 30 days. Please update your documents.",
      timestamp: "2025-01-06T09:00:00Z",
      read: true,
      actionUrl: "/onboarding/kyc",
    },
    {
      id: "4",
      type: "transaction",
      title: "Payment Received",
      message: "You received $25 from Samuel Girma.",
      timestamp: "2025-01-05T16:45:00Z",
      read: true,
    },
    {
      id: "5",
      type: "success",
      title: "KYC Approved",
      message: "Your identity verification has been approved. You can now send up to $10,000 per day.",
      timestamp: "2025-01-05T10:20:00Z",
      read: true,
    },
    {
      id: "6",
      type: "info",
      title: "New Investment Opportunity",
      message: "Ethiopian Diaspora Bond 2025 is now available with 7.5% annual yield.",
      timestamp: "2025-01-04T14:00:00Z",
      read: true,
      actionUrl: "/dashboard/investments",
    },
  ])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
  }

  const filteredNotifications = filter === "unread" ? notifications.filter((n) => !n.read) : notifications

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-success" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-error" />
      case "transaction":
        return <CreditCard className="h-5 w-5 text-primary" />
      default:
        return <Info className="h-5 w-5 text-accent" />
    }
  }

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000)

    if (diff < 60) return "Just now"
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Notifications</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}` : "All caught up!"}
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-primary" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "unread" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("unread")}
              className={filter === "unread" ? "bg-primary" : ""}
            >
              Unread
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>

          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark all as read
            </Button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No notifications</h3>
              <p className="text-muted-foreground">
                {filter === "unread" ? "You're all caught up!" : "You don't have any notifications yet."}
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-4 transition-all hover:shadow-md ${!notification.read ? "border-l-4 border-l-primary bg-primary/5" : ""}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">{getIcon(notification.type)}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <h3 className={`font-semibold ${!notification.read ? "text-primary" : ""}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {getTimeAgo(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {notification.actionUrl && (
                        <Button variant="outline" size="sm" className="h-8 bg-transparent">
                          View Details
                        </Button>
                      )}
                      {!notification.read && (
                        <Button variant="ghost" size="sm" className="h-8" onClick={() => markAsRead(notification.id)}>
                          <Check className="h-3 w-3 mr-1" />
                          Mark as read
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-error hover:text-error"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
