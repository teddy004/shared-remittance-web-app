"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GiftDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: params.id,
    name: "Ethiopian Coffee Gift Set",
    price: 45,
    currency: "USD",
    images: [
      "/ethiopian-coffee-gift-set.jpg",
      "/coffee-beans-package.png",
      "/coffee-gift-box.jpg",
    ],
    category: "Food & Groceries",
    rating: 4.8,
    reviews: 124,
    delivery: "2-3 days",
    inStock: true,
    description:
      "Premium Ethiopian coffee gift set featuring a selection of the finest Arabica beans from Yirgacheffe, Sidamo, and Harrar regions. Includes traditional coffee ceremony accessories and brewing guide.",
    features: [
      "3 varieties of premium Ethiopian coffee (250g each)",
      "Traditional jebena (coffee pot)",
      "Coffee ceremony incense",
      "Brewing guide and recipe book",
      "Beautiful gift packaging",
    ],
    seller: {
      name: "Ethiopian Coffee Co.",
      verified: true,
      rating: 4.9,
    },
  };

  const handleAddToCart = () => {
    window.location.href = `/dashboard/gifts/checkout?id=${params.id}&quantity=${quantity}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <a
          href="/dashboard/gifts"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Gift Shop
        </a>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <div className="bg-card rounded-lg border border-border overflow-hidden mb-4">
              <div className="aspect-square bg-muted">
                <img
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-card rounded-lg border overflow-hidden ${
                    selectedImage === index
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl font-bold text-foreground mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-accent fill-accent"
                          : "text-muted fill-muted"
                      }`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-foreground ml-2">
                    {product.rating}
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.reviews} reviews
                </span>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price}
                </span>
                <span className="text-sm text-muted-foreground">
                  {product.currency}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="w-4 h-4 text-success"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-success font-medium">In Stock</span>
                <span className="text-muted-foreground">
                  • Delivery: {product.delivery}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">
                What's Included
              </h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-success mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card rounded-lg border border-border p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">
                      {product.seller.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {product.seller.rating} rating
                      </span>
                      {product.seller.verified && (
                        <span className="text-xs text-primary">• Verified</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </Button>
                  <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(
                        Math.max(1, Number.parseInt(e.target.value) || 1)
                      )
                    }
                    className="w-20 text-center"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-border">
                <span className="text-lg font-semibold text-foreground">
                  Total
                </span>
                <span className="text-2xl font-bold text-foreground">
                  ${(product.price * quantity).toFixed(2)}
                </span>
              </div>

              <Button onClick={handleAddToCart} className="w-full" size="lg">
                Continue to Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
