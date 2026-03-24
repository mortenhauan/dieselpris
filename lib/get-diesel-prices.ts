import { cacheLife, cacheTag } from "next/cache";

import {
  buildUnavailableDieselPricesPayload,
  DIESEL_LITERS_PER_METRIC_TON,
} from "@/lib/diesel-prices-payload";
import type { DieselPricesPayload } from "@/lib/diesel-prices-payload";
import { fetchNextSixIceUlsMonthlyContracts } from "@/lib/ice-uls-forward-contracts";
import {
  fetchNorgesBankUsdNokSeries,
  USD_NOK_FALLBACK,
  usdNokOnOrBefore,
} from "@/lib/norges-bank-usd-nok";
import {
  fetchIceBrentDaily,
  fetchIceGasoilUls1Daily,
  ICEEUR_ULS1_CONTINUOUS,
  tradingViewBarsToHistorical,
} from "@/lib/tradingview-ice-gasoil";

export type {
  BrentHistoricalRow,
  DieselPricesPayload,
  DieselPricesCurrent,
  DieselPricesHistoricalRow,
} from "@/lib/diesel-prices-payload";

const HISTORY_DAYS = 90;

const sliceLastDailyBars = function sliceLastDailyBars<
  T extends { time: number },
>(bars: T[], max: number): T[] {
  const sorted = [...bars].toSorted((a, b) => a.time - b.time);
  return sorted.slice(-max);
};

export const getDieselPricesData =
  async function getDieselPricesData(): Promise<DieselPricesPayload> {
    "use cache";
    cacheTag("diesel-prices");
    cacheLife("dieselPrices");

    const fxSeries = await fetchNorgesBankUsdNokSeries(130);
    const spotUsdNok = fxSeries?.latestRate ?? USD_NOK_FALLBACK;
    const exchangeSource = fxSeries
      ? `Norges Bank (USD/NOK, ${fxSeries.latestDate})`
      : `Fast kurs (fallback ${USD_NOK_FALLBACK})`;

    const resolveUsdNok = (utcYmd: string) =>
      usdNokOnOrBefore(fxSeries, utcYmd, spotUsdNok);

    try {
      const { bars: rawBars } = await fetchIceGasoilUls1Daily({
        barCount: 110,
        hardTimeoutMs: 22_000,
        minBars: 80,
        settleMs: 1500,
        symbol: ICEEUR_ULS1_CONTINUOUS,
      });

      const bars = sliceLastDailyBars(rawBars, HISTORY_DAYS);
      if (bars.length < 2) {
        return buildUnavailableDieselPricesPayload(spotUsdNok, exchangeSource);
      }

      const [forwardContracts, brentTv] = await Promise.all([
        fetchNextSixIceUlsMonthlyContracts(),
        fetchIceBrentDaily({
          barCount: 110,
          hardTimeoutMs: 22_000,
          minBars: 50,
          settleMs: 1500,
        }).catch(() => null),
      ]);

      const brentBars = brentTv
        ? sliceLastDailyBars(brentTv.bars, HISTORY_DAYS)
        : [];
      const brent_historical =
        brentBars.length >= 2
          ? [...brentBars]
              .toSorted((a, b) => a.time - b.time)
              .map((b) => ({
                date: new Date(b.time * 1000).toISOString().slice(0, 10),
                usd_per_barrel: Math.round(b.close * 100) / 100,
              }))
          : [];

      const sorted = [...bars].toSorted((a, b) => a.time - b.time);
      const latest = sorted.at(-1);
      const prev = sorted.at(-2);
      if (latest === undefined || prev === undefined) {
        return buildUnavailableDieselPricesPayload(spotUsdNok, exchangeSource);
      }
      const currentPrice = latest.close;
      const change = currentPrice - prev.close;
      const changePercent = prev.close === 0 ? 0 : (change / prev.close) * 100;
      const latestYmd = new Date(latest.time * 1000).toISOString().slice(0, 10);
      const spotForLatest = resolveUsdNok(latestYmd);
      const rawPricePerLiter =
        (currentPrice * spotForLatest) / DIESEL_LITERS_PER_METRIC_TON;
      const contracts = forwardContracts.length >= 2 ? forwardContracts : [];

      return {
        brent_historical,
        contracts,
        current: {
          change: Math.round(change * 100) / 100,
          change_percent: Math.round(changePercent * 100) / 100,
          price_nok_liter: Math.round(rawPricePerLiter * 100) / 100,
          price_usd_mt: Math.round(currentPrice * 100) / 100,
        },
        data_source:
          "Lavsvovel gasoil (ICE Europa): sammenhengende dagskurve + seks månedlige terminkontrakter",
        exchange_rate: {
          source: exchangeSource,
          usd_nok: Math.round(spotUsdNok * 10_000) / 10_000,
        },
        historical: tradingViewBarsToHistorical(
          bars,
          DIESEL_LITERS_PER_METRIC_TON,
          resolveUsdNok
        ),
        updated_at: new Date().toISOString(),
      };
    } catch {
      return buildUnavailableDieselPricesPayload(spotUsdNok, exchangeSource);
    }
  };
