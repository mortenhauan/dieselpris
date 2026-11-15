import { cacheLife, cacheTag } from "next/cache";

import {
  buildUnavailableDieselPricesPayload,
  DIESEL_LITERS_PER_METRIC_TON,
} from "@/lib/diesel-prices-payload";
import type { DieselPricesPayload } from "@/lib/diesel-prices-payload";
import { fetchNextSixIceUlsMonthlyContracts } from "@/lib/ice-uls-forward-contracts";
import {
  fetchNorgesBankUsdNokSeries,
  usdNokOnOrBefore,
} from "@/lib/norges-bank-usd-nok";
import {
  barTimeToExchangeDate,
  fetchIceBrentDaily,
  fetchIceGasoilUls1Daily,
  ICEEUR_ULS1_CONTINUOUS,
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

    const [fxSeries, gasoilTv, forwardContracts, brentTv] = await Promise.all([
      fetchNorgesBankUsdNokSeries(130),
      fetchIceGasoilUls1Daily({
        barCount: 110,
        hardTimeoutMs: 22_000,
        minBars: 80,
        settleMs: 1500,
        symbol: ICEEUR_ULS1_CONTINUOUS,
      }).catch(() => null),
      fetchNextSixIceUlsMonthlyContracts().catch(() => []),
      fetchIceBrentDaily({
        barCount: 110,
        hardTimeoutMs: 22_000,
        minBars: 50,
        settleMs: 1500,
      }).catch(() => null),
    ]);
    const spotUsdNok = fxSeries?.latestRate ?? null;
    const exchangeSource = fxSeries
      ? `Norges Bank (USD/NOK, ${fxSeries.latestDate})`
      : "Valutakurs utilgjengelig";

    const resolveUsdNok = (utcYmd: string) =>
      usdNokOnOrBefore(fxSeries, utcYmd);

    try {
      if (!gasoilTv) {
        return buildUnavailableDieselPricesPayload(spotUsdNok, exchangeSource);
      }
      const rawBars = gasoilTv.bars;
      const bars = sliceLastDailyBars(rawBars, HISTORY_DAYS);
      if (bars.length < 2) {
        return buildUnavailableDieselPricesPayload(spotUsdNok, exchangeSource);
      }

      const brentBars = brentTv
        ? sliceLastDailyBars(brentTv.bars, HISTORY_DAYS)
        : [];
      const brent_historical =
        brentBars.length >= 2
          ? [...brentBars]
              .toSorted((a, b) => a.time - b.time)
              .map((b) => ({
                date: barTimeToExchangeDate(b.time),
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
      const latestYmd = barTimeToExchangeDate(latest.time);
      const spotForLatest = resolveUsdNok(latestYmd);
      const rateDate =
        fxSeries?.sortedDatesAsc.findLast((date) => date <= latestYmd) ?? null;
      const rawPricePerLiter =
        spotForLatest === null
          ? null
          : (currentPrice * spotForLatest) / DIESEL_LITERS_PER_METRIC_TON;
      const contracts = forwardContracts.length >= 2 ? forwardContracts : [];

      return {
        brent_historical,
        contracts,
        current: {
          change: Math.round(change * 100) / 100,
          change_percent: Math.round(changePercent * 100) / 100,
          price_nok_liter:
            rawPricePerLiter === null
              ? null
              : Math.round(rawPricePerLiter * 100) / 100,
          price_usd_mt: Math.round(currentPrice * 100) / 100,
        },
        data_source:
          "Lavsvovel gasoil (ICE Europa): sammenhengende dagskurve + seks månedlige terminkontrakter",
        exchange_rate: {
          date: rateDate,
          source: rateDate
            ? `Norges Bank (USD/NOK, ${rateDate})`
            : "Valutakurs utilgjengelig",
          usd_nok: spotForLatest,
        },
        historical: bars.flatMap((bar) => {
          const date = barTimeToExchangeDate(bar.time);
          const fx = resolveUsdNok(date);
          return fx === null
            ? []
            : [
                {
                  date,
                  price: bar.close,
                  price_nok_liter:
                    Math.round(
                      ((bar.close * fx) / DIESEL_LITERS_PER_METRIC_TON) * 100
                    ) / 100,
                },
              ];
        }),
        fetched_at: new Date().toISOString(),
        market_date: latestYmd,
      };
    } catch (error) {
      console.error(
        "[diesel-prices] Failed to load live ICE gasoil data",
        error
      );
      return buildUnavailableDieselPricesPayload(spotUsdNok, exchangeSource);
    }
  };
