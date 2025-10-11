export const currentExchangeRate = {
  usdToEtb: 56.8, // Fallback rate
  eurToEtb: 62.5,
  gbpToEtb: 72.3,
  sarToEtb: 15.1,
  aedToEtb: 15.5,
  lastUpdated: "2025-01-06T12:00:00Z",
}

const EXCHANGE_RATE_API = "https://api.exchangerate-api.com/v4/latest"
const CACHE_DURATION = 60 * 60 * 1000 // 1 hour in milliseconds

const lastFetchTimes: Record<Currency, number> = {
  USD: 0,
  EUR: 0,
  GBP: 0,
  SAR: 0,
  AED: 0,
}

const fetchingFlags: Record<Currency, boolean> = {
  USD: false,
  EUR: false,
  GBP: false,
  SAR: false,
  AED: false,
}

export type Currency = "USD" | "EUR" | "GBP" | "SAR" | "AED"

export const currencyInfo: Record<Currency, { name: string; symbol: string; flag: string; region: string }> = {
  USD: { name: "US Dollar", symbol: "$", flag: "🇺🇸", region: "United States" },
  EUR: { name: "Euro", symbol: "€", flag: "🇪🇺", region: "European Union" },
  GBP: { name: "British Pound", symbol: "£", flag: "🇬🇧", region: "United Kingdom" },
  SAR: { name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦", region: "Saudi Arabia" },
  AED: { name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪", region: "United Arab Emirates" },
}

export async function fetchAllExchangeRates(): Promise<Record<Currency, number>> {
  const now = Date.now()
  const currencies: Currency[] = ["USD", "EUR", "GBP", "SAR", "AED"]

  // Check if any currency needs updating
  const needsUpdate = currencies.some((currency) => now - lastFetchTimes[currency] >= CACHE_DURATION)

  if (!needsUpdate) {
    console.log("[v0] Using cached exchange rates (still valid)")
    return {
      USD: currentExchangeRate.usdToEtb,
      EUR: currentExchangeRate.eurToEtb,
      GBP: currentExchangeRate.gbpToEtb,
      SAR: currentExchangeRate.sarToEtb,
      AED: currentExchangeRate.aedToEtb,
    }
  }

  try {
    console.log("[v0] Fetching real-time exchange rates for all currencies...")

    // Fetch from ETB base to get all rates at once
    const response = await fetch(`${EXCHANGE_RATE_API}/ETB`)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (data.rates) {
      const rates: Record<Currency, number> = {
        USD: data.rates.USD ? 1 / data.rates.USD : currentExchangeRate.usdToEtb,
        EUR: data.rates.EUR ? 1 / data.rates.EUR : currentExchangeRate.eurToEtb,
        GBP: data.rates.GBP ? 1 / data.rates.GBP : currentExchangeRate.gbpToEtb,
        SAR: data.rates.SAR ? 1 / data.rates.SAR : currentExchangeRate.sarToEtb,
        AED: data.rates.AED ? 1 / data.rates.AED : currentExchangeRate.aedToEtb,
      }

      // Update all cached rates
      currentExchangeRate.usdToEtb = rates.USD
      currentExchangeRate.eurToEtb = rates.EUR
      currentExchangeRate.gbpToEtb = rates.GBP
      currentExchangeRate.sarToEtb = rates.SAR
      currentExchangeRate.aedToEtb = rates.AED
      currentExchangeRate.lastUpdated = new Date().toISOString()

      // Update fetch times for all currencies
      currencies.forEach((currency) => {
        lastFetchTimes[currency] = now
      })

      console.log("[v0] Exchange rates updated successfully:", rates)
      return rates
    } else {
      throw new Error("Rates not found in API response")
    }
  } catch (error) {
    console.error("[v0] Failed to fetch exchange rates:", error)
    console.log("[v0] Using fallback rates")
    return {
      USD: currentExchangeRate.usdToEtb,
      EUR: currentExchangeRate.eurToEtb,
      GBP: currentExchangeRate.gbpToEtb,
      SAR: currentExchangeRate.sarToEtb,
      AED: currentExchangeRate.aedToEtb,
    }
  }
}

// Fetch real exchange rate for a specific currency
export async function fetchRealExchangeRate(currency: Currency = "USD"): Promise<number> {
  const now = Date.now()

  // Return cached rate if still valid
  if (now - lastFetchTimes[currency] < CACHE_DURATION) {
    return getCachedRate(currency)
  }

  // Prevent multiple simultaneous fetches for the same currency
  if (fetchingFlags[currency]) {
    return getCachedRate(currency)
  }

  try {
    fetchingFlags[currency] = true
    console.log(`[v0] Fetching real-time ${currency} to ETB exchange rate...`)

    const response = await fetch(`${EXCHANGE_RATE_API}/${currency}`)

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    if (data.rates && data.rates.ETB) {
      const newRate = data.rates.ETB
      updateCachedRate(currency, newRate)
      lastFetchTimes[currency] = now

      console.log(`[v0] Exchange rate updated: 1 ${currency} = ${newRate} ETB`)
      return newRate
    } else {
      throw new Error("ETB rate not found in API response")
    }
  } catch (error) {
    console.error(`[v0] Failed to fetch ${currency} exchange rate:`, error)
    const fallbackRate = getCachedRate(currency)
    console.log(`[v0] Using fallback rate: 1 ${currency} = ${fallbackRate} ETB`)
    return fallbackRate
  } finally {
    fetchingFlags[currency] = false
  }
}

function getCachedRate(currency: Currency): number {
  switch (currency) {
    case "USD":
      return currentExchangeRate.usdToEtb
    case "EUR":
      return currentExchangeRate.eurToEtb
    case "GBP":
      return currentExchangeRate.gbpToEtb
    case "SAR":
      return currentExchangeRate.sarToEtb
    case "AED":
      return currentExchangeRate.aedToEtb
    default:
      return currentExchangeRate.usdToEtb
  }
}

function updateCachedRate(currency: Currency, rate: number) {
  switch (currency) {
    case "USD":
      currentExchangeRate.usdToEtb = rate
      break
    case "EUR":
      currentExchangeRate.eurToEtb = rate
      break
    case "GBP":
      currentExchangeRate.gbpToEtb = rate
      break
    case "SAR":
      currentExchangeRate.sarToEtb = rate
      break
    case "AED":
      currentExchangeRate.aedToEtb = rate
      break
  }
  currentExchangeRate.lastUpdated = new Date().toISOString()
}

// Function to manually update exchange rate (for testing)
export function updateExchangeRate(currency: Currency, newRate: number) {
  updateCachedRate(currency, newRate)
  lastFetchTimes[currency] = Date.now()
}

if (typeof window !== "undefined") {
  fetchAllExchangeRates().catch(console.error)
}
