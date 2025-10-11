"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function InvestmentDetailPage() {
  const params = useParams();
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);

  const investment = {
    id: params.id,
    name: "Ethiopian Government Bonds",
    type: "Government Bond",
    minInvestment: 1000,
    maxInvestment: 100000,
    expectedReturn: "8-10%",
    term: "5 years",
    risk: "Low",
    description:
      "Secure government-backed bonds supporting national development projects including infrastructure, education, and healthcare initiatives.",
    verified: true,
    features: [
      "Government-backed security",
      "Fixed interest payments",
      "Tax benefits available",
      "Early withdrawal options",
    ],
    documents: [
      "Investment Prospectus",
      "Risk Disclosure",
      "Terms & Conditions",
    ],
  };

  const handleInvest = () => {
    if (
      !amount ||
      Number.parseFloat(amount) < investment.minInvestment ||
      !agreed
    ) {
      return;
    }
    window.location.href = `/dashboard/investments/review?id=${params.id}&amount=${amount}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <a
          href="/dashboard/investments"
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
          Back to Investments
        </a>

        <div className="bg-card rounded-lg border border-border p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">
                {investment.name}
              </h1>
              <p className="text-muted-foreground">{investment.type}</p>
            </div>
            {investment.verified && (
              <div className="bg-primary/10 text-primary text-sm font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Verified Partner
              </div>
            )}
          </div>

          <p className="text-foreground mb-6">{investment.description}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Expected Return
              </p>
              <p className="text-xl font-bold text-success">
                {investment.expectedReturn}
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Term</p>
              <p className="text-xl font-bold text-foreground">
                {investment.term}
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">
                Min. Investment
              </p>
              <p className="text-xl font-bold text-foreground">
                ${investment.minInvestment.toLocaleString()}
              </p>
            </div>
            <div className="bg-background rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Risk Level</p>
              <p className="text-xl font-bold text-success">
                {investment.risk}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">Key Features</h3>
            <ul className="space-y-2">
              {investment.features.map((feature, index) => (
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

          <div className="mb-6">
            <h3 className="font-semibold text-foreground mb-3">
              Required Documents
            </h3>
            <div className="space-y-2">
              {investment.documents.map((doc, index) => (
                <button
                  key={index}
                  className="w-full flex items-center justify-between p-3 bg-background rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <span className="text-sm text-foreground">{doc}</span>
                  </div>
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
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Investment Amount
          </h2>

          <div className="space-y-4 mb-6">
            <div>
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input
                id="amount"
                type="number"
                placeholder={`Min. $${investment.minInvestment.toLocaleString()}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={investment.minInvestment}
                max={investment.maxInvestment}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Minimum: ${investment.minInvestment.toLocaleString()} • Maximum:
                ${investment.maxInvestment.toLocaleString()}
              </p>
            </div>

            {amount &&
              Number.parseFloat(amount) >= investment.minInvestment && (
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-muted-foreground">
                      Investment Amount
                    </span>
                    <span className="font-semibold text-foreground">
                      ${Number.parseFloat(amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Estimated Annual Return ({investment.expectedReturn})
                    </span>
                    <span className="font-semibold text-success">
                      $
                      {(Number.parseFloat(amount) * 0.09).toLocaleString(
                        undefined,
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </span>
                  </div>
                </div>
              )}
          </div>

          <div className="flex items-start gap-3 mb-6">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <label
              htmlFor="terms"
              className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
            >
              I have read and agree to the investment terms, risk disclosure,
              and understand that investments carry risk and returns are not
              guaranteed.
            </label>
          </div>

          <Button
            onClick={handleInvest}
            disabled={
              !amount ||
              Number.parseFloat(amount) < investment.minInvestment ||
              Number.parseFloat(amount) > investment.maxInvestment ||
              !agreed
            }
            className="w-full"
            size="lg"
          >
            Continue to Review
          </Button>
        </div>
      </div>
    </div>
  );
}
