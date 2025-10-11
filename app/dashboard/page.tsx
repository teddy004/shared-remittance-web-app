"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TransactionRow } from "@/components/transaction-row"
import { StatusBadge } from "@/components/status-badge"
import {
  Send,
  Download,
  CreditCard,
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
  RefreshCw,
  Plus,
  Sparkles,
  DollarSign,
} from "@/lib/icons"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()
  const [walletBalance, setWalletBalance] = useState({ usd: 0, etb: 0 })
  const [transactions, setTransactions] = useState([])
  const [exchangeRate, setExchangeRate] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const balanceRes = await fetch("/api/wallet/balance")
      const balanceData = await balanceRes.json()
      if (balanceData.success) {
        setWalletBalance(balanceData.data)
      }

      const txRes = await fetch("/api/transactions?limit=5")
      const txData = await txRes.json()
      if (txData.success) {
        setTransactions(txData.data)
      }

      const rateRes = await fetch("/api/fx/rate?from=USD&to=ETB")
      const rateData = await rateRes.json()
      if (rateData.success) {
        setExchangeRate(rateData.data.rate)
      }
    } catch (error) {
      console.error("[v0] Error loading dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    loadDashboardData()
  }

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-purple-600" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name?.split(" ")[0] || "User"}</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with your account today</p>
        </div>
        <StatusBadge status="verified" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden border-purple-100 bg-primary shadow-lg card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">USD Balance</CardTitle>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-white">${walletBalance.usd.toLocaleString()}</div>
              <Button size="sm" className="gap-2 bg-white text-purple-700 hover:bg-white/90 font-medium shadow-md">
                <Plus className="h-4 w-4" />
                Top Up
              </Button>
            </div>
          </CardContent>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -right-4 h-24 w-24 rounded-full bg-white/10" />
        </Card>

        <Card className="relative overflow-hidden border-purple-100 bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">ETB Balance</CardTitle>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-gray-600 hover:bg-gray-100"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-5xl font-bold text-gray-900">{walletBalance.etb.toLocaleString()} Br</div>
              <p className="text-sm text-gray-600">1 USD = {exchangeRate.toFixed(2)} ETB</p>
            </div>
          </CardContent>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-50" />
          <div className="absolute -bottom-8 -right-4 h-24 w-24 rounded-full bg-purple-50" />
        </Card>
      </div>

      <Card className="border-purple-100 bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">Quick Actions</CardTitle>
          <CardDescription className="text-gray-600">What would you like to do today?</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/send" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <Send className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Send Money</p>
                    <p className="text-sm text-gray-600 mt-1">Transfer to family</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/request" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <Download className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Request Money</p>
                    <p className="text-sm text-gray-600 mt-1">Ask for funds</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/marketplace" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <CreditCard className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pay Bills</p>
                    <p className="text-sm text-gray-600 mt-1">School, health, utilities</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/investments" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <TrendingUp className="h-7 w-7" />
                    <span className="absolute -right-1 -top-1 flex h-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                      New
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Invest</p>
                    <p className="text-sm text-gray-600 mt-1">Bonds & real estate</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/exchange-rates" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <DollarSign className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Exchange Rates</p>
                    <p className="text-sm text-gray-600 mt-1">Compare bank rates</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest money transfers and payments</CardDescription>
          </div>
          <Link href="/dashboard/transactions">
            <Button variant="ghost" size="sm" className="gap-2">
              View All <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-2">
          {transactions.length > 0 ? (
            transactions.map((transaction: any) => <TransactionRow key={transaction.id} transaction={transaction} />)
          ) : (
            <div className="text-center py-8 text-gray-500">No transactions yet</div>
          )}
        </CardContent>
      </Card>

      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 shadow-md">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-md">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">New Gift Shop Available!</h3>
              <p className="text-sm text-gray-600 mt-1">Send groceries, electronics, and more to your loved ones</p>
            </div>
          </div>
          <Link href="/dashboard/gifts">
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md">
              <Sparkles className="h-4 w-4" />
              Explore
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
