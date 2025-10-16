"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function VerificationSuccessPage() {
  const [showAnimation, setShowAnimation] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => setShowAnimation(true), 100);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-background to-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <div className="h-2 w-2 rounded-full bg-success" />
            <div className="h-2 w-2 rounded-full bg-success" />
            <div className="h-2 w-2 rounded-full bg-success" />
            <div className="h-2 w-2 rounded-full bg-success" />
          </div>
          <CardTitle className="text-2xl">Congratulations!</CardTitle>
          <CardDescription>
            Your account has been verified successfully
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-6 py-8">
            <div
              className={`transition-all duration-500 ${
                showAnimation ? "scale-100 opacity-100" : "scale-50 opacity-0"
              }`}
            >
              <CheckCircle2 className="h-24 w-24 text-success" />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium">You&apos;re Verified!</p>
              <p className="mt-2 text-sm text-muted-foreground">
                You can now send money, pay bills, and access all GoozX features
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={() => router.push("/dashboard")}
              className="h-12 w-full"
              size="lg"
            >
              Continue to Wallet
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="h-12 w-full"
              size="lg"
            >
              Explore Features
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
