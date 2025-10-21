"use client";

import type React from "react";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Loader2 } from "lucide-react";

const ETHIOPIAN_BANKS = [
  { value: "cbe", label: "Commercial Bank of Ethiopia" },
  { value: "dashen", label: "Dashen Bank" },
  { value: "awash", label: "Awash Bank" },
  { value: "boa", label: "Bank of Abyssinia" },
  { value: "wegagen", label: "Wegagen Bank" },
  { value: "united", label: "United Bank" },
  { value: "nib", label: "Nib International Bank" },
  { value: "coop", label: "Cooperative Bank of Oromia" },
  { value: "lion", label: "Lion International Bank" },
  { value: "oromia", label: "Oromia International Bank" },
  { value: "zemen", label: "Zemen Bank" },
  { value: "bunna", label: "Bunna International Bank" },
  { value: "berhan", label: "Berhan International Bank" },
  { value: "abay", label: "Abay Bank" },
  { value: "addis", label: "Addis International Bank" },
];

const ETHIOPIAN_WALLETS = [
  { value: "telebirr", label: "TeleBirr" },
  { value: "cbebirr", label: "CBE Birr" },
  { value: "mpesa", label: "M-Pesa Ethiopia" },
  { value: "amole", label: "Amole" },
  { value: "hellocash", label: "HelloCash" },
];

// Helper function to get bank name from bank code
const getBankName = (bankCode: string): string => {
  const allBanks = [...ETHIOPIAN_BANKS, ...ETHIOPIAN_WALLETS];
  const bank = allBanks.find((b) => b.value === bankCode);
  return bank?.label || bankCode;
};

export default function AddRecipientPage() {
  const [recipientType, setRecipientType] = useState<
    "personal" | "institution"
  >("personal");
  const [isValidating, setIsValidating] = useState(false);
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("id");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "+251", // Default to Ethiopian country code
    email: "",
    accountNumber: "",
    accountType: "",
    bank: "", // Added bank field
    country: "ET", // Always Ethiopia
  });

  // Load recipient data if editing
  useEffect(() => {
    if (recipientId) {
      setIsLoading(true);
      setIsEditing(true);

      const loadRecipient = async () => {
        try {
          const token = localStorage.getItem("auth_token");
          if (!token) {
            alert("You need to be logged in to view recipients.");
            router.push("/login");
            return;
          }

          const response = await fetch(`/api/recipients/${recipientId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const result = await response.json();

          if (result.success && result.data) {
            const recipient = result.data;
            // Pre-populate form with recipient data
            setFormData({
              fullName: recipient.name || "",
              phone: recipient.phone || "+251",
              email: recipient.email || "",
              accountNumber: recipient.accountNumber || "",
              accountType: recipient.accountType || "",
              bank:
                recipient.accountType === "bank"
                  ? "cbe"
                  : recipient.accountType === "mobile_wallet"
                  ? "telebirr"
                  : "", // Default bank/wallet for demo
              country: recipient.country || "ET",
            });
            setIsValidated(true); // Since it's an existing recipient, consider it validated
          } else {
            console.error("Failed to load recipient:", result.error);
            alert("Recipient not found or failed to load.");
            router.push("/dashboard/send");
          }
        } catch (error) {
          console.error("Error loading recipient:", error);
          alert("Failed to load recipient data.");
          router.push("/dashboard/send");
        } finally {
          setIsLoading(false);
        }
      };

      loadRecipient();
    } else {
      setIsEditing(false);
      setIsValidated(false);
    }
  }, [recipientId, router]);

  const handleValidate = async () => {
    setIsValidating(true);
    // Simulate validation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsValidating(false);
    setIsValidated(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Check if user is logged in
      const token = localStorage.getItem("auth_token");
      if (!token) {
        alert(
          "You need to be logged in to add recipients. Please login first."
        );
        return;
      }

      // Prepare the recipient data to send to API
      const recipientData = {
        name: formData.fullName,
        phone: formData.phone,
        email: formData.email || undefined,
        accountNumber: formData.accountNumber,
        accountType: formData.accountType as "bank" | "mobile_wallet",
        country: "Ethiopia",
        bankName: formData.bank ? getBankName(formData.bank) : undefined,
      };

      // Create the recipient via API
      const response = await fetch("/api/recipients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipientData),
      });

      const result = await response.json();

      if (result.success) {
        // Successfully created, navigate back to send page with refresh flag
        router.push("/dashboard/send?new=1");
      } else {
        // Handle error with specific message
        console.error("Failed to create recipient:", result.error);
        const errorMessage =
          result.error?.message ||
          "Failed to save recipient. Please try again.";
        alert(`${result.error?.code || "ERROR"}: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error creating recipient:", error);
      alert(
        "Network error occurred. Please check your connection and try again."
      );
    }
  };

  const isFormValid =
    formData.fullName &&
    formData.phone &&
    formData.phone.length > 4 &&
    formData.accountNumber &&
    formData.accountType &&
    (formData.accountType === "mobile_wallet" || formData.bank);

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">
          {isEditing ? "Edit Recipient" : "Add New Recipient"}
        </h1>
        <p className="text-muted-foreground">
          {isEditing
            ? "Update recipient information and save changes"
            : "Enter recipient details to save them for future transfers"}
        </p>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin mr-2" />
          <span>Loading recipient data...</span>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recipient Information</CardTitle>
          <CardDescription>
            Choose recipient type and enter their details
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            value={recipientType}
            onValueChange={(v) =>
              setRecipientType(v as "personal" | "institution")
            }
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="institution">Institution</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4 pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Abebe Kebede"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="h-12"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+251911234567"
                        value={formData.phone}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Ensure +251 prefix is always present
                          if (!value.startsWith("+251")) {
                            setFormData({ ...formData, phone: "+251" });
                          } else {
                            setFormData({ ...formData, phone: value });
                          }
                        }}
                        className="h-12"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ethiopian phone number starting with +251
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="abebe@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountType">Account Type *</Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        accountType: value,
                        bank: "",
                        accountNumber: "",
                      })
                    }
                  >
                    <SelectTrigger id="accountType" className="h-12">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank Account</SelectItem>
                      <SelectItem value="mobile_wallet">
                        Mobile Wallet
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.accountType === "bank" && (
                  <div className="space-y-2">
                    <Label htmlFor="bank">Select Bank *</Label>
                    <Select
                      value={formData.bank}
                      onValueChange={(value) =>
                        setFormData({ ...formData, bank: value })
                      }
                    >
                      <SelectTrigger id="bank" className="h-12">
                        <SelectValue placeholder="Choose Ethiopian bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {ETHIOPIAN_BANKS.map((bank) => (
                          <SelectItem key={bank.value} value={bank.value}>
                            {bank.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.accountType === "mobile_wallet" && (
                  <div className="space-y-2">
                    <Label htmlFor="wallet">Select Wallet Provider *</Label>
                    <Select
                      value={formData.bank}
                      onValueChange={(value) =>
                        setFormData({ ...formData, bank: value })
                      }
                    >
                      <SelectTrigger id="wallet" className="h-12">
                        <SelectValue placeholder="Choose wallet provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {ETHIOPIAN_WALLETS.map((wallet) => (
                          <SelectItem key={wallet.value} value={wallet.value}>
                            {wallet.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">
                    {formData.accountType === "mobile_wallet"
                      ? "Mobile Wallet Number"
                      : "Bank Account Number"}{" "}
                    *
                  </Label>
                  <Input
                    id="accountNumber"
                    placeholder={
                      formData.accountType === "mobile_wallet"
                        ? "0911234567"
                        : "1000123456789"
                    }
                    value={formData.accountNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        accountNumber: e.target.value,
                      })
                    }
                    className="h-12"
                    required
                  />
                </div>

                <div className="rounded-lg border bg-muted/50 p-3">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Country:</span> Ethiopia 🇪🇹
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Currently, we only support transfers to Ethiopian banks and
                    mobile wallets.
                  </p>
                </div>

                {isFormValid && !isValidated && (
                  <Button
                    type="button"
                    onClick={handleValidate}
                    disabled={isValidating}
                    className="h-12 w-full gap-2 bg-transparent"
                    variant="outline"
                  >
                    {isValidating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Validating Account...
                      </>
                    ) : (
                      "Validate Account"
                    )}
                  </Button>
                )}

                {isValidated && (
                  <div className="flex items-center gap-2 rounded-lg border border-success bg-success/5 p-4 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                    <p className="text-sm font-medium">
                      Account validated successfully!
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={!isValidated}
                  className="h-12 w-full"
                >
                  {isEditing ? "Update Recipient" : "Save Recipient"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="institution" className="space-y-4 pt-4">
              <div className="rounded-lg border bg-muted/50 p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Institution payments are available through the Purpose-Driven
                  Marketplace. Visit the Pay Bills section to pay directly to
                  schools, hospitals, and utilities.
                </p>
                <Button
                  onClick={() => router.push("/dashboard/marketplace")}
                  className="mt-4"
                >
                  Go to Marketplace
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
