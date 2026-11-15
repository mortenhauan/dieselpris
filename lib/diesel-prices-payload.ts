import type { IceUlsContractRow } from "@/lib/ice-uls-forward-contracts";

export const DIESEL_LITERS_PER_METRIC_TON = 1176 as const;

export interface DieselPricesCurrent {
  price_usd_mt: number;
  price_nok_liter: number | null;
  change: number;
  change_percent: number;
}

export interface DieselPricesHistoricalRow {
  date: string;
  price: number;
  price_nok_liter: number;
}

/** ICE Brent, USD per barrel — European crude benchmark. */
export interface BrentHistoricalRow {
  date: string;
  usd_per_barrel: number;
}

export interface DieselPricesPayload {
  /** Date of the quoted daily ICE observation, never the fetch date. */
  market_date: string | null;
  fetched_at: string;
  current: DieselPricesCurrent | null;
  contracts: IceUlsContractRow[];
  historical: DieselPricesHistoricalRow[];
  brent_historical: BrentHistoricalRow[];
  exchange_rate: {
    usd_nok: number | null;
    date: string | null;
    source: string;
  };
  data_source: string;
}

export const buildUnavailableDieselPricesPayload =
  function buildUnavailableDieselPricesPayload(
    usdToNokSpot: number | null,
    exchangeSource: string
  ): DieselPricesPayload {
    return {
      brent_historical: [],
      contracts: [],
      current: null,
      data_source: "Ingen live data akkurat nå",
      exchange_rate: {
        date: null,
        source: exchangeSource,
        usd_nok: usdToNokSpot,
      },
      historical: [],
      fetched_at: new Date().toISOString(),
      market_date: null,
    };
  };
