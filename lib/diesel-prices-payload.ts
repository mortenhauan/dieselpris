import type { IceUlsContractRow } from "@/lib/ice-uls-forward-contracts";

export const DIESEL_LITERS_PER_METRIC_TON = 1176 as const;

export interface DieselPricesCurrent {
  price_usd_mt: number;
  price_nok_liter: number;
  change: number;
  change_percent: number;
}

export interface DieselPricesHistoricalRow {
  date: string;
  price: number;
  price_nok_liter: number;
}

export interface DieselPricesPayload {
  updated_at: string;
  current: DieselPricesCurrent | null;
  contracts: IceUlsContractRow[];
  historical: DieselPricesHistoricalRow[];
  exchange_rate: { usd_nok: number; source: string };
  data_source: string;
}

export const buildUnavailableDieselPricesPayload =
  function buildUnavailableDieselPricesPayload(
    usdToNokSpot: number,
    exchangeSource: string
  ): DieselPricesPayload {
    return {
      contracts: [],
      current: null,
      data_source: "Ingen live data akkurat nå",
      exchange_rate: {
        source: exchangeSource,
        usd_nok: Math.round(usdToNokSpot * 10_000) / 10_000,
      },
      historical: [],
      updated_at: new Date().toISOString(),
    };
  };
