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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, RefreshCw, Info, Wallet } from "@/lib/icons";
import {
  fetchAllExchangeRates,
  getBankExchangeRates,
} from "@/lib/exchange-rates";

type Currency = "USD" | "EUR" | "GBP" | "SAR" | "AED" | "ETB";

const ETHIOPIAN_BANKS = [
  { value: "cbe", label: "Commercial Bank of Ethiopia (CBE)" },
  { value: "dashen", label: "Dashen Bank" },
  { value: "awash", label: "Awash Bank" },
  { value: "abyssinia", label: "Bank of Abyssinia" },
  { value: "nib", label: "Nib International Bank" },
  { value: "wegagen", label: "Wegagen Bank" },
  { value: "united", label: "United Bank" },
  { value: "oromia", label: "Oromia Bank" },
];

export default function SendAmountPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipient");

  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState<Currency>("USD");
  const [selectedBank, setSelectedBank] = useState("");
  const [recipient, setRecipient] = useState<any>(null);
  const [walletBalances, setWalletBalances] = useState<any>({});
  const [exchangeRates, setExchangeRates] = useState<any>({});
  const [fees, setFees] = useState({ transferFee: 0, totalFee: 0 });
  const [bankExchangeRates, setBankExchangeRates] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [recipientId]);

  useEffect(() => {
    if (amount && Number.parseFloat(amount) > 0) {
      calculateFees();
    }
  }, [amount, currency]);

  const loadData = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      // Load recipient
      const recipientRes = await fetch(`/api/recipients/${recipientId}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const recipientData = await recipientRes.json();
      if (recipientData.success) {
        setRecipient(recipientData.data);
      }

      // Load wallet balances
      const balanceRes = await fetch("/api/wallet/balance", {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      const balanceData = await balanceRes.json();
      if (balanceData.success) {
        setWalletBalances(balanceData.data);
      }

      // Load exchange rates
      const rates = await fetchAllExchangeRates();
      setExchangeRates(rates);

      // Load bank-specific exchange rates
      const bankRates = await getBankExchangeRates();
      setBankExchangeRates(bankRates);
    } catch (error) {
      console.error("[v0] Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateFees = async () => {
    try {
      const token = localStorage.getItem("auth_token");
      const res = await fetch("/api/send/calculate-fees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          amount: Number.parseFloat(amount),
          currency,
          recipientId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFees(data.data);
      }
    } catch (error) {
      console.error("[v0] Error calculating fees:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin mx-auto border-4 border-purple-600 border-t-transparent rounded-full" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!recipient) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="py-12 text-center">
            <p>Recipient not found</p>
            <Button
              onClick={() => router.push("/dashboard/send")}
              className="mt-4"
            >
              Back to Recipients
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const availableCurrencies = Object.entries(walletBalances)
    .filter(([curr, balance]) => (balance as number) > 0)
    .map(([curr]) => curr.toUpperCase());

  const numericAmount = Number.parseFloat(amount) || 0;
  const currentBalance = walletBalances[currency.toLowerCase()] || 0;
  const totalAmount = numericAmount + fees.transferFee;

  const bankRate =
    selectedBank && bankExchangeRates[selectedBank] && currency === "USD"
      ? bankExchangeRates[selectedBank].usdToEtb
      : selectedBank && currency === "USD"
      ? 56.8 // Default if no bank rate available
      : currency === "USD"
      ? 56.8
      : 0; // Placeholder rates for other currencies

  const recipientReceives = numericAmount * bankRate;

  const handleContinue = () => {
    if (numericAmount > 0 && selectedBank && currentBalance >= totalAmount) {
      router.push(
        `/dashboard/send/review?recipient=${recipientId}&amount=${amount}&currency=${currency}&bank=${selectedBank}&rate=${bankRate}`
      );
    }
  };

  const getCurrencySymbol = (curr: string) => {
    const symbols: Record<string, string> = {
      USD: "$",
      EUR: "€",
      GBP: "£",
      SAR: "﷼",
      AED: "د.إ",
      ETB: "ETB",
    };
    return symbols[curr] || curr;
  };

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div>
        <h1 className="text-2xl font-bold">Enter Amount</h1>
        <p className="text-muted-foreground">
          How much would you like to send?
        </p>
      </div>

      {/* Recipient Card */}
      <Card>
        <CardContent className="flex items-center gap-3 p-4">
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
            <p className="text-sm text-muted-foreground">
              {recipient.countryCode} • ****{recipient.accountNumber.slice(-4)}
            </p>
          </div>
          <Badge variant="secondary">
            {recipient.accountType === "bank" ? "Bank" : "Mobile Wallet"}
          </Badge>
        </CardContent>
      </Card>

      {/* Currency Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Select Currency</CardTitle>
          <CardDescription>Choose from your available balances</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {availableCurrencies.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Wallet className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No available balance. Please top up your wallet first.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableCurrencies.map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr as Currency)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    currency === curr
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="text-sm font-medium">{curr}</div>
                  <div className="text-lg font-bold mt-1">
                    {getCurrencySymbol(curr)}
                    {walletBalances[curr.toLowerCase()].toLocaleString()}
                  </div>
                </button>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Amount Input */}
      {availableCurrencies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Send Amount</CardTitle>
            <CardDescription>Enter the amount you want to send</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Amount Input */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">
                {getCurrencySymbol(currency)}
              </span>
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-16 pl-12 text-2xl font-bold"
                min="0"
                step="0.01"
              />
            </div>

            {/* Balance Info */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Available Balance</span>
              <span className="font-medium">
                {getCurrencySymbol(currency)}
                {currentBalance.toLocaleString()}
              </span>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {[50, 100, 200, 500].map((quickAmount) => (
                <Button
                  key={quickAmount}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(quickAmount.toString())}
                  className="h-10"
                  disabled={quickAmount > currentBalance}
                >
                  {quickAmount}
                </Button>
              ))}
            </div>

            {/* Bank Selection */}
            {numericAmount > 0 && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Select Ethiopian Bank
                  </label>
                  <Select value={selectedBank} onValueChange={setSelectedBank}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Choose recipient's bank" />
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

                {/* Exchange Rate Info */}
                {selectedBank && (
                  <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Exchange Rate ({selectedBank.toUpperCase()})
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          1 {currency} = {bankRate.toFixed(2)} ETB
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={loadData}
                        >
                          <RefreshCw className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        Transfer Fee
                      </span>
                      <span className="font-medium">
                        {getCurrencySymbol(currency)}
                        {fees.transferFee.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Total Amount</span>
                        <span className="text-lg font-bold">
                          {getCurrencySymbol(currency)}
                          {totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-success/10 p-3">
                      <span className="text-sm font-medium text-success">
                        Recipient Receives
                      </span>
                      <span className="text-lg font-bold text-success">
                        {recipientReceives.toLocaleString()} ETB
                      </span>
                    </div>

                    {totalAmount > currentBalance && (
                      <div className="flex items-start gap-2 text-xs text-destructive bg-destructive/10 p-3 rounded-lg">
                        <Info className="mt-0.5 h-3 w-3 shrink-0" />
                        <p>
                          Insufficient balance. You need{" "}
                          {getCurrencySymbol(currency)}
                          {(totalAmount - currentBalance).toFixed(2)} more.
                        </p>
                      </div>
                    )}

                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Info className="mt-0.5 h-3 w-3 shrink-0" />
                      <p>
                        Exchange rate is locked for 10 minutes after
                        confirmation
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            <Button
              onClick={handleContinue}
              disabled={
                numericAmount <= 0 ||
                !selectedBank ||
                totalAmount > currentBalance
              }
              className="h-12 w-full gap-2"
            >
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
