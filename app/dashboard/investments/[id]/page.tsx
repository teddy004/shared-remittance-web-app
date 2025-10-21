"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockInvestments } from "@/components/investments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { ErrorState } from "@/components/error-state";

export default function InvestmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const investment = mockInvestments.find((inv) => inv.id === params.id);

  if (!investment) {
    return (
      <ErrorState
        title="Investment Not Found"
        message="The investment product you are looking for does not exist."
        onRetry={() => router.push("/dashboard/investments")}
        showRetry={true}
      />
    );
  }

  const handleInvest = (e: React.FormEvent) => {
    e.preventDefault();
    const investmentAmount = parseFloat(amount);

    if (isNaN(investmentAmount) || investmentAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description:
          "Please enter a valid positive number for the investment amount.",
      });
      return;
    }

    if (investmentAmount < investment.minInvestment) {
      toast({
        variant: "destructive",
        title: "Minimum Investment Not Met",
        description: `The minimum investment for this product is $${investment.minInvestment.toLocaleString()}.`,
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Investment Successful!",
        description: `You have successfully invested $${investmentAmount.toLocaleString()} in ${
          investment.name
        }.`,
        action: (
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-success" />
          </div>
        ),
      });
      router.push("/dashboard/investments");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Investments
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{investment.name}</CardTitle>
          <div className="flex flex-wrap gap-2 pt-2">
            <Badge variant="secondary">{investment.category}</Badge>
            <Badge variant="outline">Yield: {investment.annualYield}</Badge>
            <Badge variant="outline">Risk: {investment.riskLevel}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-muted-foreground">{investment.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Issuer:</span> {investment.issuer}
            </div>
            <div>
              <span className="font-medium">Maturity:</span>{" "}
              {investment.maturityDate}
            </div>
            <div>
              <span className="font-medium">Min. Investment:</span> $
              {investment.minInvestment.toLocaleString()}
            </div>
          </div>

          <form
            onSubmit={handleInvest}
            className="space-y-4 rounded-lg border p-4"
          >
            <h4 className="font-semibold">Make an Investment</h4>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`e.g., ${investment.minInvestment}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={investment.minInvestment}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Processing..." : "Invest Now"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
