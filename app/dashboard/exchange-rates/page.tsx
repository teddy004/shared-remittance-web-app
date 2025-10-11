"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, TrendingUp, TrendingDown, Building2 } from "@/lib/icons"
import { fetchAllExchangeRates, currencyInfo, type Currency } from "@/lib/exchange-rates"

interface BankRate {
  id: string
  name: string
  logo?: string
  buyRate: number
  sellRate: number
  spread: number
  lastUpdated: string
  isOpen: boolean
}

export default function ExchangeRatesPage() {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>("USD")
  const [rates, setRates] = useState<BankRate[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date())
  const [allRates, setAllRates] = useState<Record<Currency, number> | null>(null)

  const fetchBankRates = async (currency: Currency) => {
    setLoading(true)

    let baseRate: number
    if (!allRates) {
      const rates = await fetchAllExchangeRates()
      setAllRates(rates)
      baseRate = rates[currency]
    } else {
      baseRate = allRates[currency]
    }

    await new Promise((resolve) => setTimeout(resolve, 500))

    const bankRates: BankRate[] = [
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
    ]

    setRates(bankRates)
    setLoading(false)
    setLastRefresh(new Date())
  }

  useEffect(() => {
    fetchBankRates(selectedCurrency)
  }, [selectedCurrency])

  const handleRefresh = () => {
    setAllRates(null)
    fetchBankRates(selectedCurrency)
  }

  const getBestBuyRate = () => {
    if (rates.length === 0) return null
    return rates.reduce((best, current) => (current.buyRate > best.buyRate ? current : best))
  }

  const getBestSellRate = () => {
    if (rates.length === 0) return null
    return rates.reduce((best, current) => (current.sellRate < best.sellRate ? current : best))
  }

  const bestBuy = getBestBuyRate()
  const bestSell = getBestSellRate()

  const currencies: Currency[] = ["USD", "EUR", "GBP", "SAR", "AED"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50/30 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Exchange Rates</h1>
              <p className="mt-2 text-gray-600">Compare foreign currency to ETB rates across Ethiopian banks</p>
            </div>
            <Button onClick={handleRefresh} disabled={loading} className="bg-purple-600 hover:bg-purple-700">
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-500">Last updated: {lastRefresh.toLocaleTimeString()}</div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {currencies.map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`flex items-center gap-2 rounded-lg px-4 py-3 font-medium transition-all ${
                  selectedCurrency === currency
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-purple-50"
                }`}
              >
                <span className="text-xl">{currencyInfo[currency].flag}</span>
                <div className="text-left">
                  <div className="text-sm font-semibold">{currency}</div>
                  <div className="text-xs opacity-80">{currencyInfo[currency].name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Best Rates Summary */}
        <div className="mb-6 grid gap-4 md:grid-cols-2">
          <Card className="border-green-200 bg-green-50 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                  <TrendingUp className="h-4 w-4" />
                  Best Buy Rate
                </div>
                <div className="mt-2 text-3xl font-bold text-green-900">
                  {bestBuy ? bestBuy.buyRate.toFixed(2) : "--"} ETB
                </div>
                <div className="mt-1 text-sm text-green-700">{bestBuy?.name}</div>
              </div>
            </div>
          </Card>

          <Card className="border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 text-sm font-medium text-blue-700">
                  <TrendingDown className="h-4 w-4" />
                  Best Sell Rate
                </div>
                <div className="mt-2 text-3xl font-bold text-blue-900">
                  {bestSell ? bestSell.sellRate.toFixed(2) : "--"} ETB
                </div>
                <div className="mt-1 text-sm text-blue-700">{bestSell?.name}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Rates Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Bank</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Buy Rate (ETB)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Sell Rate (ETB)</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Spread</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center">
                        <RefreshCw className="mr-2 h-5 w-5 animate-spin text-purple-600" />
                        <span className="text-gray-600">Loading rates...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  rates.map((bank) => (
                    <tr key={bank.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <Building2 className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{bank.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-semibold text-gray-900">{bank.buyRate.toFixed(2)}</div>
                        {bank.id === bestBuy?.id && <div className="text-xs text-green-600">Best</div>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="font-semibold text-gray-900">{bank.sellRate.toFixed(2)}</div>
                        {bank.id === bestSell?.id && <div className="text-xs text-blue-600">Best</div>}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="text-gray-600">{bank.spread.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            bank.isOpen ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {bank.isOpen ? "Open" : "Closed"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Info Section */}
        <Card className="mt-6 bg-purple-50 p-6">
          <h3 className="font-semibold text-gray-900">Understanding Exchange Rates</h3>
          <div className="mt-3 space-y-2 text-sm text-gray-700">
            <p>
              <strong>Buy Rate:</strong> The rate at which banks buy {selectedCurrency} from you (you receive ETB)
            </p>
            <p>
              <strong>Sell Rate:</strong> The rate at which banks sell {selectedCurrency} to you (you pay ETB)
            </p>
            <p>
              <strong>Spread:</strong> The difference between buy and sell rates (bank's profit margin)
            </p>
          </div>
          <div className="mt-4 rounded-lg bg-white p-4 text-sm text-gray-600">
            <strong>Note:</strong> Exchange rates are updated regularly but may vary. Contact your bank directly for the
            most accurate rates before making transactions.
          </div>
        </Card>
      </div>
    </div>
  )
}
