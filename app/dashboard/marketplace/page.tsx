"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { GraduationCap, Heart, Zap, Home, ShoppingCart, Search, Star, CheckCircle2, ChevronRight } from "@/lib/icons"

const categories = [
  { id: "education", label: "Education", icon: GraduationCap, color: "text-primary" },
  { id: "healthcare", label: "Healthcare", icon: Heart, color: "text-destructive" },
  { id: "utilities", label: "Utilities", icon: Zap, color: "text-secondary-foreground" },
  { id: "rent", label: "Rent", icon: Home, color: "text-success" },
  { id: "groceries", label: "Groceries", icon: ShoppingCart, color: "text-primary" },
]

export default function MarketplacePage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProviders()
  }, [])

  const loadProviders = async () => {
    try {
      const res = await fetch("/api/marketplace/providers")
      const data = await res.json()
      if (data.success) {
        setProviders(data.data)
      }
    } catch (error) {
      console.error("[v0] Error loading providers:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProviders = providers.filter((provider: any) => {
    const matchesSearch = provider.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || provider.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto border-4 border-purple-600 border-t-transparent rounded-full" />
          <p className="mt-4 text-gray-600">Loading providers...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Purpose-Driven Marketplace</h1>
        <p className="text-muted-foreground">Pay directly to schools, hospitals, and service providers</p>
      </div>

      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Direct Payments to Institutions</p>
            <p className="text-xs text-muted-foreground">
              Send money directly to verified schools, hospitals, and service providers. Your family gets the service,
              not cash - ensuring your support goes exactly where it's needed.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search institutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Browse by service type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(isSelected ? null : category.id)}
                  className={`flex flex-col items-center gap-2 rounded-lg border p-4 transition-all ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border bg-transparent hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      isSelected ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <Icon className={`h-6 w-6 ${isSelected ? category.color : "text-muted-foreground"}`} />
                  </div>
                  <span className={`text-sm font-medium ${isSelected ? "text-primary" : ""}`}>{category.label}</span>
                </button>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {filteredProviders.length} Provider{filteredProviders.length !== 1 ? "s" : ""}
          </CardTitle>
          <CardDescription>
            {selectedCategory
              ? `${categories.find((c) => c.id === selectedCategory)?.label} providers`
              : "All verified institutions"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider: any) => (
              <button
                key={provider.id}
                onClick={() => router.push(`/dashboard/marketplace/${provider.id}`)}
                className="flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all hover:border-primary hover:bg-primary/5"
              >
                <Avatar className="h-14 w-14 rounded-lg">
                  <AvatarImage src={`/generic-placeholder-icon.png?height=56&width=56`} />
                  <AvatarFallback className="rounded-lg bg-primary/10 text-primary">
                    {provider.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{provider.name}</p>
                    {provider.verified && (
                      <Badge variant="secondary" className="gap-1 bg-success/10 text-success">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="capitalize">{provider.category}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-secondary text-secondary" />
                      <span>{provider.rating}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">No providers found</h3>
              <p className="mt-2 text-sm text-muted-foreground">Try adjusting your search or category filter</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory(null)
                }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
