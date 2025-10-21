"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { marketplaceServiceProviders } from "@/lib/mock-data/marketplace";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { ErrorState } from "@/components/error-state";

// Remove import of useToast from '@/components/ui/use-toast' because it doesn't exist

export default function ProviderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const provider = marketplaceServiceProviders.find((p) => p.id === params.id);

  if (!provider) {
    return (
      <ErrorState
        title="Provider Not Found"
        message="The service provider you are looking for does not exist."
        onRetry={() => router.push("/dashboard/marketplace")}
        showRetry={true}
      />
    );
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const paymentAmount = parseFloat(amount);

    if (!accountNumber.trim()) {
      toast({
        title: "Missing Information",
        description: `Please enter the ${provider.accountNumberLabel}.`,
      });
      return;
    }

    if (isNaN(paymentAmount) || paymentAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount.",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Payment Successful!",
        description: `Your payment of $${paymentAmount.toLocaleString()} to ${
          provider.name
        } has been submitted.`,
        action: (
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
        ),
      });
      router.push("/dashboard/marketplace");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Marketplace
      </Button>

      <Card>
        <CardHeader className="flex-row items-center gap-4">
          <Image
            src={provider.logoUrl}
            alt={`${provider.name} logo`}
            width={64}
            height={64}
            className="rounded-lg"
          />
          <div>
            <CardTitle className="text-2xl">{provider.name}</CardTitle>
            <CardDescription>{provider.category}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{provider.description}</p>

          <form
            onSubmit={handlePayment}
            className="space-y-4 rounded-lg border p-4"
          >
            <h4 className="font-semibold">Make a Payment</h4>
            <div className="space-y-2">
              <Label htmlFor="accountNumber">
                {provider.accountNumberLabel}
              </Label>
              <Input
                id="accountNumber"
                type="text"
                placeholder={provider.accountNumberPlaceholder}
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="e.g., 50.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Pay Bill"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
