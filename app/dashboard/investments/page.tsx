"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, CheckCircle2, ChevronRight } from "@/lib/icons"

export default function InvestmentsPage() {
  const router = useRouter()
  const [investments, setInvestments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadInvestments()
  }, [])

  const loadInvestments = async () => {
    try {
      const res = await fetch("/api/investments/products")
      const data = await res.json()
      if (data.success) {
        setInvestments(data.data)
      }
    } catch (error) {
      console.error("[v0] Error loading investments:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto border-4 border-purple-600 border-t-transparent rounded-full" />
          <p className="mt-4 text-gray-600">Loading investments...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Investment Opportunities</h1>
        <p className="text-muted-foreground">Grow your wealth while supporting Ethiopia's development</p>
      </div>

      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <TrendingUp className="h-5 w-5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Verified Investment Partners</p>
            <p className="text-xs text-muted-foreground">
              All investment opportunities are vetted and regulated by Ethiopian authorities. Your investments are
              protected and transparent.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {investments.map((investment: any) => (
          <button
            key={investment.id}
            onClick={() => router.push(`/dashboard/investments/${investment.id}`)}
            className="block bg-card rounded-lg border border-border p-6 hover:border-primary/50 hover:shadow-md transition-all text-left"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{investment.name}</h3>
                <p className="text-sm text-muted-foreground">{investment.type}</p>
              </div>
              {investment.verified && (
                <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-4">{investment.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expected Return</p>
                <p className="font-semibold text-success">{investment.expectedReturn}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Term</p>
                <p className="font-semibold text-foreground">{investment.term}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Min. Investment</p>
                <p className="font-semibold text-foreground">${investment.minInvestment.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
                <p
                  className={`font-semibold ${
                    investment.risk === "Low"
                      ? "text-success"
                      : investment.risk === "Medium"
                        ? "text-warning"
                        : "text-destructive"
                  }`}
                >
                  {investment.risk}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <span className="text-sm text-primary font-medium">View Details</span>
              <ChevronRight className="h-5 w-5 text-primary" />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
