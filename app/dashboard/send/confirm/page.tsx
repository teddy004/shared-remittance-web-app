"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OTPInput } from "@/components/otp-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Shield, CheckCircle, Download, Send, Home } from "@/lib/icons";

export default function SendConfirmPage() {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [transactionData, setTransactionData] = useState<any>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleOTPComplete = async (otp: string) => {
    setIsVerifying(true);
    setError("");

    try {
      const res = await fetch("/api/send/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          otp,
          transactionId: searchParams.get("transactionId"),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setTransactionData(data.data);
        setShowSuccessDialog(true);
        setIsVerifying(false);
      } else {
        setError(data.error?.message || "Invalid OTP. Please try again.");
        setIsVerifying(false);
      }
    } catch (error) {
      console.error("[v0] Error confirming transaction:", error);
      setError("An error occurred. Please try again.");
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    try {
      await fetch("/api/auth/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose: "transaction",
        }),
      });
      alert("Code resent successfully!");
    } catch (error) {
      console.error("[v0] Error resending code:", error);
      alert("Failed to resend code. Please try again.");
    }
  };

  const handleViewReceipt = () => {
    if (transactionData?.transactionId) {
      router.push(
        `/dashboard/transactions/${String(
          transactionData.transactionId
        )}/receipt`
      );
    }
  };

  const handleSendAgain = () => {
    router.push("/dashboard/send");
  };

  const handleBackToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <CardTitle className="text-2xl">Confirm Your Transfer</CardTitle>
            <CardDescription>
              Enter the 6-digit code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <OTPInput length={6} onComplete={handleOTPComplete} />
            </div>

            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-center text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="text-center">
              <Button
                variant="link"
                className="text-primary"
                onClick={handleResendCode}
                disabled={isVerifying}
              >
                Resend Code
              </Button>
            </div>

            <div className="rounded-lg border bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                This security step helps protect your account and ensures only
                you can authorize transfers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="sr-only">Transfer Completed</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center text-center space-y-4 py-6">
            <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-success" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Transfer Completed!</h2>
              <p className="text-muted-foreground">
                Your money transfer was successful and is on its way to the
                recipient.
              </p>
            </div>
            <div className="w-full space-y-2 rounded-lg border bg-muted/50 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono font-medium">
                  {transactionData?.referenceNumber
                    ? String(transactionData.referenceNumber)
                    : "ZMN-2025-123456"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium text-success">Completed</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Time</span>
                <span className="font-medium">Within 10 minutes</span>
              </div>
            </div>
            <div className="flex w-full gap-3">
              <Button
                variant="outline"
                onClick={handleViewReceipt}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Receipt
              </Button>
              <Button onClick={handleSendAgain} className="flex-1">
                <Send className="h-4 w-4 mr-2" />
                Send Again
              </Button>
            </div>
            <Button
              variant="outline"
              onClick={handleBackToDashboard}
              className="w-full"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
