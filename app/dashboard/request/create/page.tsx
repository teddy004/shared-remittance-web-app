"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Info } from "@/lib/icons";

const purposeOptions = [
  "Personal Loan",
  "Rent Payment",
  "Shared Expenses",
  "Gift",
  "Service Payment",
  "Other",
];

export default function CreateRequestPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fromName: "",
    fromEmail: "",
    fromPhone: "",
    amount: "",
    purpose: "",
    description: "",
    dueDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fromName: formData.fromName,
          fromEmail: formData.fromEmail,
          fromPhone: formData.fromPhone,
          amount: Number.parseFloat(formData.amount),
          purpose: formData.purpose,
          description: formData.description,
          dueDate: formData.dueDate,
        }),
      });

      const data = await res.json();
      console.log("[v0] API Response:", data);

      if (data.success) {
        const requestData = data.data;
        console.log("[v0] Request created successfully:", requestData);

        // Navigate to share page with request data
        const params = new URLSearchParams({
          requestId: requestData.id,
          amount: String(requestData.amount),
          purpose: requestData.purpose,
          fromName: requestData.fromName,
          status: requestData.status,
        });

        router.push(`/dashboard/request/share?${params.toString()}`);
      } else {
        console.error("[v0] Request creation failed:", data);
        const errorMessage =
          (typeof data.error === "object" ? data.error?.message : data.error) ||
          "Failed to create request";
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("[v0] Error creating request:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.fromName &&
    formData.fromEmail &&
    formData.amount &&
    formData.purpose &&
    formData.dueDate;

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Create Payment Request</h1>
        <p className="text-muted-foreground">
          Request money from anyone via email or link
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Who should pay you?</CardTitle>
            <CardDescription>
              Enter the payer's contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromName">Full Name *</Label>
              <Input
                id="fromName"
                placeholder="John Doe"
                value={formData.fromName}
                onChange={(e) =>
                  setFormData({ ...formData, fromName: e.target.value })
                }
                className="h-12"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fromEmail">Email Address *</Label>
                <Input
                  id="fromEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.fromEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, fromEmail: e.target.value })
                  }
                  className="h-12"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fromPhone">Phone Number (Optional)</Label>
                <Input
                  id="fromPhone"
                  type="tel"
                  placeholder="+1-555-0123"
                  value={formData.fromPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, fromPhone: e.target.value })
                  }
                  className="h-12"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>Specify the amount and purpose</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD) *</Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="h-12 pl-8 text-lg font-semibold"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose *</Label>
              <Select
                value={formData.purpose}
                onValueChange={(value) =>
                  setFormData({ ...formData, purpose: value })
                }
              >
                <SelectTrigger id="purpose" className="h-12">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  {purposeOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any additional details about this request..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="min-h-[100px] resize-none"
                maxLength={200}
              />
              <p className="text-xs text-muted-foreground">
                {formData.description.length}/200 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date *</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="h-12"
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-start gap-3 p-4">
            <Info className="h-5 w-5 shrink-0 text-primary" />
            <div className="space-y-1">
              <p className="text-sm font-medium">How it works</p>
              <p className="text-xs text-muted-foreground">
                We'll send a payment request to the email address you provided.
                They can pay directly through the link, and you'll be notified
                when the payment is complete.
              </p>
            </div>
          </CardContent>
        </Card>

        <Button
          type="submit"
          disabled={!isFormValid || loading}
          className="h-12 w-full gap-2"
        >
          {loading ? "Creating..." : "Create Request"}{" "}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
