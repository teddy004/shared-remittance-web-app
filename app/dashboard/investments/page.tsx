"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { mockInvestments } from "@/components/investments";
import { Badge } from "@/components/ui/badge";
import { Landmark, Building2, Lightbulb, Wheat } from "lucide-react";

const iconMap = {
  Landmark,
  Building2,
  Lightbulb,
  Wheat,
};

export default function InvestmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Investment Gateway</h1>
        <p className="text-muted-foreground">
          Invest in Ethiopia's future and grow your wealth.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockInvestments.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap] || Landmark;
          return (
            <Link key={item.id} href={`/dashboard/investments/${item.id}`} className="block hover:scale-[1.02] transition-transform">
              <Card className="h-full hover:border-purple-600/50 transition-colors">
                <CardHeader className="flex-row items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600/10">
                    <Icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.category}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Yield: {item.annualYield}</Badge>
                    <Badge variant="outline">Risk: {item.riskLevel}</Badge>
                    <Badge variant="outline">Min: ${item.minInvestment.toLocaleString()}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}