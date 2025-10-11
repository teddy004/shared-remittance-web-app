"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, Shield, Edit, Lock } from "@/lib/icons";

export default function SendReviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipient");
  const amount = searchParams.get("amount");
  const currency = searchParams.get("currency");
  const bank = searchParams.get("bank");
  const rate = searchParams.get("rate");

  const [recipient, setRecipient] = useState<any>(null);
  const [countdown, setCountdown] = useState(600); // 10 minutes
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadRecipient();
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadRecipient = async () => {
    try {
      // Demo - no auth required
      const res = await fetch(`/api/recipients/${recipientId}`);
      const data = await res.json();
      if (data.success) {
        setRecipient(data.data);
      }
    } catch (error) {
      console.error("[v0] Error loading recipient:", error);
    }
  };

  if (!recipient || !amount || !currency || !bank || !rate) {
    return null;
  }

  const numericAmount = Number.parseFloat(amount);
  const exchangeRate = Number.parseFloat(rate);
  const transferFee = numericAmount > 100 ? numericAmount * 0.01 : 2.99;
  const totalAmount = numericAmount + transferFee;
  const recipientReceives = numericAmount * exchangeRate;

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      SAR: "﷼",
      AED: "د.إ",
    };
    return symbols[curr] || curr;
  };

  const handleConfirm = async () => {
    setProcessing(true);

    try {
      // Initiate transfer with OTP (demo - no auth required)
      const initiateRes = await fetch("/api/send/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipientId,
          amount: numericAmount,
          currency,
          bank,
          exchangeRate,
          fee: transferFee,
        }),
      });

      const initiateData = await initiateRes.json();

      if (initiateData.success) {
        // Navigate to OTP confirmation page
        router.push(
          `/dashboard/send/confirm?transactionId=${initiateData.data.transactionId}`
        );
      } else {
        alert(
          initiateData.error?.message ||
            "Failed to initiate transfer. Please try again."
        );
      }
    } catch (error) {
      console.error("[v0] Error initiating transfer:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Review Transfer</h1>
        <p className="text-muted-foreground">
          Please review all details before confirming
        </p>
      </div>

      {/* Rate Lock Timer */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-center gap-3 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Clock className="h-5 w-5" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Exchange rate locked</p>
            <p className="text-xs text-muted-foreground">
              Rate expires in {minutes}:{seconds.toString().padStart(2, "0")}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recipient Details */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recipient</CardTitle>
            <CardDescription>Who will receive the money</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/dashboard/send")}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={recipient.avatar || "/placeholder.svg"} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {recipient.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-semibold">{recipient.name}</p>
              <p className="text-sm text-muted-foreground">{recipient.phone}</p>
              <p className="text-sm text-muted-foreground">
                {recipient.accountType === "bank"
                  ? "Bank Account"
                  : "Mobile Wallet"}{" "}
                • {recipient.accountNumber}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Amount Breakdown */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Amount Details</CardTitle>
            <CardDescription>Transfer breakdown</CardDescription>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className="gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Send Amount</span>
            <span className="font-medium">
              {getCurrencySymbol(currency)}
              {numericAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Transfer Fee</span>
            <span className="font-medium">
              {getCurrencySymbol(currency)}
              {transferFee.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              Exchange Rate ({bank.toUpperCase()})
            </span>
            <span className="font-medium">
              1 {currency} = {exchangeRate.toFixed(2)} ETB
            </span>
          </div>
          <div className="border-t pt-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Total Amount</span>
              <span className="text-xl font-bold">
                {getCurrencySymbol(currency)}
                {totalAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-success/10 p-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-success">
                Recipient Receives
              </span>
              <span className="text-lg font-bold text-success">
                {recipientReceives.toLocaleString()} ETB
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Estimated delivery: Within 10 minutes</span>
          </div>
        </CardContent>
      </Card>

      {/* Security Notice */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="flex items-start gap-3 p-4">
          <Shield className="h-5 w-5 shrink-0 text-primary" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Secure Transfer</p>
            <p className="text-xs text-muted-foreground">
              Your transfer is protected with bank-level encryption. You'll need
              to verify via SMS code to complete this transaction.
            </p>
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handleConfirm}
        disabled={processing}
        className="h-12 w-full gap-2"
      >
        {processing ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Initiating Transfer...
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Confirm Transfer
          </>
        )}
      </Button>
    </div>
  );
}
