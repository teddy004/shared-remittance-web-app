import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <DashboardNav />
      {children}
    </div>
  )
}
