"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  FileCheck,
  TrendingUp,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
} from "@/lib/icons"

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "kyc" | "transactions">("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)

  // Mock admin stats
  const stats = {
    totalUsers: 1247,
    pendingKYC: 23,
    activeTransactions: 156,
    flaggedTransactions: 4,
    totalVolume: 2456789,
    monthlyGrowth: 12.5,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-primary">Zemna Admin</h1>
              <p className="text-sm text-muted-foreground">Compliance & Operations Dashboard</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b">
          {[
            { id: "overview", label: "Overview", icon: TrendingUp },
            { id: "users", label: "Users", icon: Users },
            { id: "kyc", label: "KYC Review", icon: FileCheck },
            { id: "transactions", label: "Transactions", icon: AlertTriangle },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">+{stats.monthlyGrowth}%</Badge>
                </div>
                <h3 className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</h3>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <FileCheck className="h-8 w-8 text-accent" />
                  <Badge variant="secondary">{stats.pendingKYC}</Badge>
                </div>
                <h3 className="text-2xl font-bold">{stats.pendingKYC}</h3>
                <p className="text-sm text-muted-foreground">Pending KYC</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-success" />
                  <Badge variant="secondary">{stats.activeTransactions}</Badge>
                </div>
                <h3 className="text-2xl font-bold">${(stats.totalVolume / 1000).toFixed(0)}K</h3>
                <p className="text-sm text-muted-foreground">Monthly Volume</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <AlertTriangle className="h-8 w-8 text-error" />
                  <Badge variant="destructive">{stats.flaggedTransactions}</Badge>
                </div>
                <h3 className="text-2xl font-bold">{stats.flaggedTransactions}</h3>
                <p className="text-sm text-muted-foreground">Flagged Items</p>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  {
                    type: "kyc",
                    user: "Abebe Kebede",
                    action: "KYC Approved",
                    time: "2 minutes ago",
                    status: "success",
                  },
                  {
                    type: "transaction",
                    user: "Tigist Alemu",
                    action: "Large Transfer Flagged",
                    time: "15 minutes ago",
                    status: "warning",
                  },
                  {
                    type: "user",
                    user: "Dawit Tesfaye",
                    action: "New User Registered",
                    time: "1 hour ago",
                    status: "info",
                  },
                  { type: "kyc", user: "Meron Haile", action: "KYC Submitted", time: "2 hours ago", status: "info" },
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-2 w-2 rounded-full ${
                          activity.status === "success"
                            ? "bg-success"
                            : activity.status === "warning"
                              ? "bg-error"
                              : "bg-primary"
                        }`}
                      />
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>

            {/* Users Table */}
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">User</th>
                      <th className="text-left p-4 font-medium">Email</th>
                      <th className="text-left p-4 font-medium">KYC Status</th>
                      <th className="text-left p-4 font-medium">Joined</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Abebe Kebede", email: "abebe.k@email.com", kyc: "verified", joined: "2024-12-15" },
                      { name: "Tigist Alemu", email: "tigist.a@email.com", kyc: "pending", joined: "2025-01-03" },
                      { name: "Dawit Tesfaye", email: "dawit.t@email.com", kyc: "verified", joined: "2024-11-20" },
                      { name: "Meron Haile", email: "meron.h@email.com", kyc: "rejected", joined: "2025-01-05" },
                    ].map((user, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">{user.name[0]}</span>
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-muted-foreground">{user.email}</td>
                        <td className="p-4">
                          <Badge
                            variant={
                              user.kyc === "verified" ? "default" : user.kyc === "pending" ? "secondary" : "destructive"
                            }
                          >
                            {user.kyc}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{user.joined}</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* KYC Review Tab */}
        {activeTab === "kyc" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Pending KYC Reviews</h2>
              <Badge variant="secondary">{stats.pendingKYC} pending</Badge>
            </div>

            <div className="grid gap-6">
              {[
                { name: "Tigist Alemu", email: "tigist.a@email.com", submitted: "2025-01-05", docType: "Passport" },
                { name: "Samuel Girma", email: "samuel.g@email.com", submitted: "2025-01-06", docType: "National ID" },
              ].map((submission, i) => (
                <Card key={i} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-medium text-primary">{submission.name[0]}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold">{submission.name}</h3>
                        <p className="text-sm text-muted-foreground">{submission.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Pending Review</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Document Type</p>
                      <p className="font-medium">{submission.docType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">{submission.submitted}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-success hover:bg-success/90">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Review
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Transaction Monitoring</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Today
                </Button>
                <Button variant="outline" size="sm">
                  This Week
                </Button>
                <Button variant="outline" size="sm">
                  This Month
                </Button>
              </div>
            </div>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b bg-muted/50">
                    <tr>
                      <th className="text-left p-4 font-medium">Reference</th>
                      <th className="text-left p-4 font-medium">Sender</th>
                      <th className="text-left p-4 font-medium">Recipient</th>
                      <th className="text-left p-4 font-medium">Amount</th>
                      <th className="text-left p-4 font-medium">Status</th>
                      <th className="text-left p-4 font-medium">Risk</th>
                      <th className="text-left p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        ref: "ZMN-2025-001234",
                        sender: "Abebe K.",
                        recipient: "Tigist A.",
                        amount: 100,
                        status: "completed",
                        risk: "low",
                      },
                      {
                        ref: "ZMN-2025-001256",
                        sender: "Dawit T.",
                        recipient: "Meron H.",
                        amount: 5500,
                        status: "flagged",
                        risk: "high",
                      },
                      {
                        ref: "ZMN-2025-001189",
                        sender: "Samuel G.",
                        recipient: "Tigist A.",
                        amount: 50,
                        status: "completed",
                        risk: "low",
                      },
                    ].map((tx, i) => (
                      <tr key={i} className="border-b hover:bg-muted/50">
                        <td className="p-4 font-mono text-sm">{tx.ref}</td>
                        <td className="p-4">{tx.sender}</td>
                        <td className="p-4">{tx.recipient}</td>
                        <td className="p-4 font-medium">${tx.amount}</td>
                        <td className="p-4">
                          <Badge variant={tx.status === "completed" ? "default" : "destructive"}>{tx.status}</Badge>
                        </td>
                        <td className="p-4">
                          <Badge variant={tx.risk === "low" ? "secondary" : "destructive"}>{tx.risk}</Badge>
                        </td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
