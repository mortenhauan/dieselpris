import { TradingViewClient } from "@mathieuc/tradingview";

import { observedMarketBars } from "@/lib/market-observations";

interface TvBar {
  time: number;
  open: number;
  close: number;
  max: number;
  min: number;
  volume: number;
}

interface TvMarketInfos {
  description?: string;
  full_name?: string;
  currency_code?: string;
  listed_exchange?: string;
}

export const ICEEUR_ULS1_CONTINUOUS = "ICEEUR:ULS1!";

/** ICE Brent — European crude; usual reference for supply into NW European refineries. */
export const ICEEUR_BRN1_CONTINUOUS = "ICEEUR:BRN1!";

export interface IceGasoilDailyFromTv {
  bars: TvBar[];
  infos: TvMarketInfos;
}

/**
 * TradingView daily bar `time` can land a few hours before midnight UTC of
 * the real session date (DST shift in the exchange or library timezone).
 * Adding a 4 h buffer rounds safely into the correct calendar day.
 */
const TV_BAR_BUFFER_SEC = 4 * 3600;

export const barTimeToExchangeDate = function barTimeToExchangeDate(
  barTimeSeconds: number
): string {
  return new Date((barTimeSeconds + TV_BAR_BUFFER_SEC) * 1000)
    .toISOString()
    .slice(0, 10);
};

export const fetchIceDailyBarsFromTradingView =
  function fetchIceDailyBarsFromTradingView(options: {
    symbol: string;
    barCount: number;
    minBars: number;
    settleMs: number;
    hardTimeoutMs: number;
    timeoutMinBars?: number;
    /** TradingView timeframe string. Defaults to "D" (daily). Examples: "60" (1h), "240" (4h). */
    timeframe?: string;
  }): Promise<IceGasoilDailyFromTv> {
    const { symbol, barCount, minBars, settleMs, hardTimeoutMs } = options;
    const timeoutMinBars = options.timeoutMinBars ?? minBars;
    const timeframe = options.timeframe ?? "D";

    const client = new TradingViewClient();
    const chart = client.createChart();

    const { promise, reject, resolve } =
      Promise.withResolvers<IceGasoilDailyFromTv>();

    let settled = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
      clearTimeout(hardTimer);
      if (settleTimer) {
        clearTimeout(settleTimer);
      }
      try {
        chart.delete();
      } catch {
        /* ignore */
      }
      queueMicrotask(() => {
        (async () => {
          try {
            await client.close();
          } catch {
            /* ignore */
          }
        })();
      });
    };

    const finishOk = () => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      const bars = observedMarketBars(chart.candles, Date.now()).map((bar) => ({
        ...bar,
        max: bar.high,
        min: bar.low,
      }));
      if (bars.length < timeoutMinBars) {
        reject(new Error("TradingView returned too few observed bars"));
        return;
      }
      resolve({ bars, infos: { ...chart.symbolInfo } });
    };

    const finishErr = (err: Error) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      reject(err);
    };

    chart.on("error", finishErr);
    client.on("error", finishErr);
    void client.ready.catch(finishErr);

    const scheduleSettle = () => {
      if (chart.candles.length < minBars) {
        return;
      }
      if (settleTimer) {
        clearTimeout(settleTimer);
      }
      settleTimer = setTimeout(finishOk, settleMs);
    };

    chart.on("update", () => {
      scheduleSettle();
    });

    chart.on("symbolLoaded", () => {
      scheduleSettle();
    });

    const hardTimer = setTimeout(() => {
      if (chart.candles.length >= timeoutMinBars) {
        finishOk();
      } else {
        finishErr(new Error("TradingView timeout or insufficient bars"));
      }
    }, hardTimeoutMs);

    chart.setMarket(symbol, {
      backAdjustment: true,
      count: barCount,
      timeframe,
    });

    return promise;
  };

export const fetchIceGasoilUls1Daily =
  function fetchIceGasoilUls1Daily(options?: {
    symbol?: string;
    barCount?: number;
    minBars?: number;
    settleMs?: number;
    hardTimeoutMs?: number;
  }): Promise<IceGasoilDailyFromTv> {
    return fetchIceDailyBarsFromTradingView({
      barCount: options?.barCount ?? 100,
      hardTimeoutMs: options?.hardTimeoutMs ?? 18_000,
      minBars: options?.minBars ?? 85,
      settleMs: options?.settleMs ?? 1200,
      symbol: options?.symbol ?? ICEEUR_ULS1_CONTINUOUS,
      timeoutMinBars: 30,
    });
  };

export const fetchIceBrentDaily = function fetchIceBrentDaily(options?: {
  barCount?: number;
  minBars?: number;
  settleMs?: number;
  hardTimeoutMs?: number;
}): Promise<IceGasoilDailyFromTv> {
  return fetchIceDailyBarsFromTradingView({
    barCount: options?.barCount ?? 110,
    hardTimeoutMs: options?.hardTimeoutMs ?? 22_000,
    minBars: options?.minBars ?? 50,
    settleMs: options?.settleMs ?? 1500,
    symbol: ICEEUR_BRN1_CONTINUOUS,
    timeoutMinBars: 25,
  });
};
