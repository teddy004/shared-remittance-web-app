"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockServiceProviders, mockMarketplaceCategories } from "@/lib/mock-data/marketplace";
import { ToggleGroup, ToggleGroupItem } from "@/components/toggle-group";
import Image from "next/image";

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProviders =
    selectedCategory === "All"
      ? mockServiceProviders
      : mockServiceProviders.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground">
          Pay for bills and services directly for your loved ones.
        </p>
      </div>

      <ToggleGroup
        type="single"
        defaultValue="All"
        value={selectedCategory}
        onValueChange={(value) => value && setSelectedCategory(value)}
        className="flex-wrap justify-start"
      >
        {mockMarketplaceCategories.map((category) => (
          <ToggleGroupItem key={category} value={category} aria-label={`Filter by ${category}`}>
            {category}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProviders.map((provider) => (
          <Link key={provider.id} href={`/dashboard/marketplace/${provider.id}`} className="block hover:scale-[1.02] transition-transform">
            <Card className="h-full hover:border-purple-600/50 transition-colors">
              <CardHeader className="flex-row items-center gap-4">
                <Image src={provider.logoUrl} alt={`${provider.name} logo`} width={48} height={48} className="rounded-lg" />
                <div className="flex-1">
                  <CardTitle>{provider.name}</CardTitle>
                  <CardDescription>{provider.category}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>{provider.description}</CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}