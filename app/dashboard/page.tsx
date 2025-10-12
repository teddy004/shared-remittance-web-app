"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionRow } from "@/components/transaction-row";
import { StatusBadge } from "@/components/status-badge";
import {
  Send,
  Download,
  CreditCard,
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
  RefreshCw,
  Plus,
  Sparkles,
  DollarSign,
  ArrowRight,
} from "@/lib/icons";
import { useAuth } from "@/lib/auth-context";
import {
  fetchAllExchangeRates,
  currencyInfo,
  type Currency,
} from "@/lib/exchange-rates";

export default function DashboardPage() {
  const { user } = useAuth();
  const [walletBalance, setWalletBalance] = useState({ usd: 0, etb: 0 });
  const [transactions, setTransactions] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(true);

  // Currency converter state
  const [converterAmount, setConverterAmount] = useState<string>("");
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [converterFromCurrency, setConverterFromCurrency] =
    useState<Currency>("USD");
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [rates, setRates] = useState<any[]>([]);
  const [allRates, setAllRates] = useState<Record<Currency, number> | null>(
    null
  );

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Demo - no auth required
      const balanceRes = await fetch("/api/wallet/balance");
      const balanceData = await balanceRes.json();
      if (balanceData.success) {
        setWalletBalance(balanceData.data);
      }

      const txRes = await fetch("/api/transactions?limit=5");
      const txData = await txRes.json();
      if (txData.success) {
        setTransactions(txData.data);
      }

      const rateRes = await fetch("/api/fx/rate?from=USD&to=ETB");
      const rateData = await rateRes.json();
      if (rateData.success) {
        setExchangeRate(rateData.data.rate);
      }

      // Load exchange rates for converter
      const allRatesData = await fetchAllExchangeRates();
      setAllRates(allRatesData);

      // Load bank rates for converter
      await loadBankRates("USD");
    } catch (error) {
      console.error("[v0] Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadBankRates = async (currency: Currency) => {
    let baseRate: number;
    if (!allRates) {
      const rates = await fetchAllExchangeRates();
      setAllRates(rates);
      baseRate = rates[currency];
    } else {
      baseRate = allRates[currency];
    }

    const bankRates = [
      {
        id: "cbe",
        name: "Commercial Bank of Ethiopia",
        buyRate: baseRate - 0.5,
        sellRate: baseRate + 0.5,
        spread: 1.0,
        lastUpdated: new Date().toISOString(),
        isOpen: true,
      },
      {
        id: "dashen",
        name: "Dashen Bank",
        buyRate: baseRate - 0.3,
        sellRate: baseRate + 0.7,
        spread: 1.0,
        lastUpdated: new Date().toISOString(),
        isOpen: true,
      },
      {
        id: "awash",
        name: "Awash Bank",
        buyRate: baseRate - 0.4,
        sellRate: baseRate + 0.6,
        spread: 1.0,
        lastUpdated: new Date().toISOString(),
        isOpen: true,
      },
      {
        id: "boa",
        name: "Bank of Abyssinia",
        buyRate: baseRate - 0.6,
        sellRate: baseRate + 0.4,
        spread: 1.0,
        lastUpdated: new Date().toISOString(),
        isOpen: true,
      },
      {
        id: "wegagen",
        name: "Wegagen Bank",
        buyRate: baseRate - 0.45,
        sellRate: baseRate + 0.55,
        spread: 1.0,
        lastUpdated: new Date().toISOString(),
        isOpen: true,
      },
      {
        id: "nib",
        name: "Nib International Bank",
        buyRate: baseRate - 0.35,
        sellRate: baseRate + 0.65,
        spread: 1.0,
        lastUpdated: new Date().toISOString(),
        isOpen: true,
      },
      {
        id: "coop",
        name: "Cooperative Bank of Oromia",
        buyRate: baseRate - 0.55,
        sellRate: baseRate + 0.45,
        spread: 1.0,
        lastUpdated: new Date().toISOString(),
        isOpen: true,
      },
      {
        id: "united",
        name: "United Bank",
        buyRate: baseRate - 0.4,
        sellRate: baseRate + 0.6,
        spread: 1.0,
        lastUpdated: new Date().toISOString(),
        isOpen: true,
      },
    ];

    setRates(bankRates);
  };

  const handleRefresh = () => {
    setLoading(true);
    loadDashboardData();
  };

  // Currency converter logic
  useEffect(() => {
    if (converterAmount && selectedBank && allRates) {
      const amount = parseFloat(converterAmount);
      if (!isNaN(amount) && amount > 0) {
        const selectedBankData = rates.find((bank) => bank.id === selectedBank);
        if (selectedBankData) {
          // Using sell rate for conversion (ETB to foreign currency)
          const converted = amount * selectedBankData.sellRate;
          setConvertedAmount(converted);
        }
      } else {
        setConvertedAmount(null);
      }
    } else {
      setConvertedAmount(null);
    }
  }, [converterAmount, selectedBank, allRates, rates]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setConverterAmount(value);
    }
  };

  const currencies: Currency[] = ["USD", "EUR", "GBP", "SAR", "AED"];

  if (loading) {
    return (
      <div className="container mx-auto flex items-center justify-center p-4 min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-purple-600" />
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6 p-4 pb-20 md:pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name?.split(" ")[0] || "User"}
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your account today
          </p>
        </div>
        <div className="flex items-center gap-4">
          <StatusBadge status="verified" />
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="relative overflow-hidden border-purple-100 bg-purple-600 shadow-lg card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-white/90">
              USD Balance
            </CardTitle>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-white hover:bg-white/10"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-5xl font-bold text-white">
                ${walletBalance.usd.toLocaleString()}
              </div>
              <Button
                size="sm"
                className="gap-2 bg-white text-purple-700 hover:bg-white/90 font-medium shadow-md"
              >
                <Plus className="h-4 w-4" />
                Top Up
              </Button>
            </div>
          </CardContent>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="absolute -bottom-8 -right-4 h-24 w-24 rounded-full bg-white/10" />
        </Card>

        {/* Currency Calculator */}
        <Card className="relative overflow-hidden border-2 border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-purple-600" />
              Currency Calculator
            </CardTitle>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-gray-600 hover:bg-gray-100"
              onClick={handleRefresh}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-3 md:grid-cols-3">
                {/* Foreign Currency Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600">
                    Foreign Currency
                  </label>
                  <select
                    value={converterFromCurrency}
                    onChange={(e) =>
                      setConverterFromCurrency(e.target.value as Currency)
                    }
                    className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currencyInfo[currency].flag} {currency}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600">
                    Amount ({converterFromCurrency})
                  </label>
                  <input
                    type="text"
                    value={converterAmount}
                    onChange={handleAmountChange}
                    placeholder="Enter amount"
                    className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>

                {/* Ethiopian Bank Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-gray-600">
                    Ethiopian Bank
                  </label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                  >
                    <option value="">Select Bank</option>
                    {rates.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conversion Result */}
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2">
                  {convertedAmount ? (
                    <span className="font-semibold text-green-600">
                      {convertedAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      ETB
                    </span>
                  ) : (
                    <span className="text-gray-400 text-sm">
                      Enter amount & select bank
                    </span>
                  )}
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
              </div>

              {convertedAmount && selectedBank && (
                <div className="rounded-md bg-white p-2 text-xs text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>
                      Rate: 1 {converterFromCurrency} ={" "}
                      {rates
                        .find((b) => b.id === selectedBank)
                        ?.sellRate.toFixed(2)}{" "}
                      ETB
                    </span>
                    <span className="font-medium">
                      Total:{" "}
                      {convertedAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      ETB
                    </span>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-100/50" />
          <div className="absolute -bottom-8 -right-4 h-24 w-24 rounded-full bg-blue-100/50" />
        </Card>
      </div>

      <Card className="border-purple-100 bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-900">
            Quick Actions
          </CardTitle>
          <CardDescription className="text-gray-600">
            What would you like to do today?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/send" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <Send className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Send Money</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Transfer to family
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/request" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <Download className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Request Money</p>
                    <p className="text-sm text-gray-600 mt-1">Ask for funds</p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/marketplace" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <CreditCard className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Pay Bills</p>
                    <p className="text-sm text-gray-600 mt-1">
                      School, health, utilities
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/investments" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <TrendingUp className="h-7 w-7" />
                    <span className="absolute -right-1 -top-1 flex h-6 items-center justify-center rounded-full bg-red-500 px-2 text-xs font-bold text-white">
                      New
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Invest</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Bonds & real estate
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/exchange-rates" className="block">
              <div className="group h-full rounded-lg border border-purple-100 bg-purple-50/50 p-6 transition-all hover:border-purple-300 hover:bg-purple-50 hover:shadow-md">
                <div className="flex flex-col items-center gap-4 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white shadow-md group-hover:shadow-lg transition-shadow">
                    <DollarSign className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Exchange Rates
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Compare bank rates
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your latest money transfers and payments
              </CardDescription>
            </div>
            <Link href="/dashboard/transactions">
              <Button variant="ghost" size="sm" className="gap-2">
                View All <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            {transactions.length > 0 ? (
              transactions.map((transaction: any) => (
                <TransactionRow
                  key={transaction.id}
                  transaction={transaction}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No transactions yet
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Requests</CardTitle>
              <CardDescription>
                Your latest money requests and responses
              </CardDescription>
            </div>
            <Link href="/dashboard/request">
              <Button variant="ghost" size="sm" className="gap-2">
                View All <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-center py-8 text-gray-500">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 mx-auto mb-3">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm">Click "View All" to see your requests</p>
              <p className="text-xs text-gray-400 mt-1">
                or use the "Request Money" button above
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 shadow-md">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-600 text-white shadow-md">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                New Gift Shop Available!
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Send groceries, electronics, and more to your loved ones
              </p>
            </div>
          </div>
          <Link href="/dashboard/gifts">
            <Button className="gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium shadow-md">
              <Sparkles className="h-4 w-4" />
              Explore
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
