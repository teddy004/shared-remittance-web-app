"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ChevronRight, Package } from "@/lib/icons"

export default function GiftsPage() {
  const router = useRouter()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const res = await fetch("/api/gifts/products")
      const data = await res.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error("[v0] Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const categories = [
    {
      id: "electronics",
      name: "Electronics",
      icon: "📱",
      count: products.filter((p: any) => p.category === "electronics").length,
    },
    {
      id: "fashion",
      name: "Fashion & Clothing",
      icon: "👕",
      count: products.filter((p: any) => p.category === "fashion").length,
    },
    { id: "home", name: "Home & Living", icon: "🏠", count: products.filter((p: any) => p.category === "home").length },
    {
      id: "food",
      name: "Food & Groceries",
      icon: "🍽️",
      count: products.filter((p: any) => p.category === "food").length,
    },
  ]

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto border-4 border-purple-600 border-t-transparent rounded-full" />
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Gift Shop & E-commerce</h1>
        <p className="text-muted-foreground">Send gifts and products directly to your loved ones in Ethiopia</p>
      </div>

      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <Package className="h-5 w-5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Direct Delivery to Ethiopia</p>
            <p className="text-xs text-muted-foreground">
              All products are sourced from verified Ethiopian retailers and delivered directly to your recipient's
              address. Track your order in real-time.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Shop by Category</CardTitle>
          <CardDescription>Browse our product categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => router.push(`/dashboard/gifts/category/${category.id}`)}
                className="bg-card rounded-lg border border-border p-6 hover:border-primary/50 hover:shadow-md transition-all text-center"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} items</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Featured Products</CardTitle>
          <CardDescription>Popular items for gifting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 8).map((product: any) => (
              <button
                key={product.id}
                onClick={() => router.push(`/dashboard/gifts/${product.id}`)}
                className="bg-card rounded-lg border border-border overflow-hidden hover:border-primary/50 hover:shadow-md transition-all text-left"
              >
                <div className="aspect-square bg-muted">
                  <img
                    src={product.image || "/placeholder.svg?height=200&width=200"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground mb-1 capitalize">{product.category}</p>
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-secondary text-secondary" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-foreground">${product.price}</p>
                      <p className="text-xs text-muted-foreground">{product.delivery}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
