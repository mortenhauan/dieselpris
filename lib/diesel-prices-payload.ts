import type { IceUlsContractRow } from "@/lib/ice-uls-forward-contracts"

export const DIESEL_LITERS_PER_METRIC_TON = 1176 as const

export type DieselPricesCurrent = {
  price_usd_mt: number
  price_nok_liter: number
  change: number
  change_percent: number
}

export type DieselPricesHistoricalRow = {
  date: string
  price: number
  price_nok_liter: number
}

export type DieselPricesPayload = {
  updated_at: string
  current: DieselPricesCurrent | null
  contracts: IceUlsContractRow[]
  historical: DieselPricesHistoricalRow[]
  exchange_rate: { usd_nok: number; source: string }
  data_source: string
}

export function buildUnavailableDieselPricesPayload(
  usdToNokSpot: number,
  exchangeSource: string,
): DieselPricesPayload {
  return {
    updated_at: new Date().toISOString(),
    current: null,
    contracts: [],
    historical: [],
    exchange_rate: {
      usd_nok: Math.round(usdToNokSpot * 10_000) / 10_000,
      source: exchangeSource,
    },
    data_source: "Ingen live data akkurat nå",
  }
}
