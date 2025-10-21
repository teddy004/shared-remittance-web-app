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
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Copy,
  Mail,
  MessageSquare,
  Share2,
  Home,
} from "lucide-react";

export default function ShareRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [copied, setCopied] = useState(false);

  // Get request data from URL parameters
  const requestId = searchParams.get("requestId") || "req-abc123xyz";
  const amount = searchParams.get("amount") || "100.00";
  const purpose = searchParams.get("purpose") || "Personal Loan";
  const fromName = searchParams.get("fromName") || "Demo User";
  const status = searchParams.get("status") || "pending";

  const requestLink = `https://goozx.app/pay/${requestId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(requestLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (method: string) => {
    // In real app, implement sharing via different methods
    console.log(`Sharing via ${method}`);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <CheckCircle2 className="h-24 w-24 text-success" />
          </div>
          <CardTitle className="text-2xl">Request Created!</CardTitle>
          <CardDescription>Share this link to receive payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Request Details */}
          <div className="space-y-2 rounded-lg border bg-muted/50 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Request ID</span>
              <span className="font-mono font-medium">{requestId}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status</span>
              <span className="font-medium text-secondary-foreground">
                Pending
              </span>
            </div>
          </div>

          {/* Shareable Link */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Link</label>
            <div className="flex gap-2">
              <Input
                value={requestLink}
                readOnly
                className="h-12 font-mono text-sm"
              />
              <Button
                onClick={handleCopy}
                size="icon"
                className="h-12 w-12 shrink-0"
              >
                {copied ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            {copied && (
              <p className="text-xs text-success">Link copied to clipboard!</p>
            )}
          </div>

          {/* Share Options */}
          <div className="space-y-3">
            <p className="text-sm font-medium">Share via:</p>
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => handleShare("email")}
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-4"
              >
                <Mail className="h-6 w-6" />
                <span className="text-xs">Email</span>
              </Button>
              <Button
                onClick={() => handleShare("sms")}
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-4"
              >
                <MessageSquare className="h-6 w-6" />
                <span className="text-xs">SMS</span>
              </Button>
              <Button
                onClick={() => handleShare("other")}
                variant="outline"
                className="h-auto flex-col gap-2 bg-transparent p-4"
              >
                <Share2 className="h-6 w-6" />
                <span className="text-xs">More</span>
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/dashboard/request")}
              variant="outline"
              className="h-12 w-full gap-2"
            >
              View All Requests
            </Button>
            <Button
              onClick={() => router.push("/dashboard")}
              className="h-12 w-full gap-2"
            >
              <Home className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
