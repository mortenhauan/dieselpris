import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { Client } = require("@mathieuc/tradingview") as {
  Client: new (opts?: Record<string, unknown>) => TradingViewClient;
};

interface TradingViewClient {
  Session: { Chart: new () => TradingViewChart };
  end: () => Promise<void>;
}

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

interface TradingViewChart {
  periods: TvBar[];
  infos: TvMarketInfos;
  setMarket: (
    symbol: string,
    options?: {
      timeframe?: string;
      range?: number;
      backadjustment?: boolean;
    }
  ) => void;
  onSymbolLoaded: (cb: () => void) => void;
  onUpdate: (cb: () => void) => void;
  onError: (cb: (...args: unknown[]) => void) => void;
  delete: () => void;
}

export const ICEEUR_ULS1_CONTINUOUS = "ICEEUR:ULS1!";

export interface IceGasoilDailyFromTv {
  bars: TvBar[];
  infos: TvMarketInfos;
}

const barTimeToUtcDate = function barTimeToUtcDate(
  barTimeSeconds: number
): string {
  return new Date(barTimeSeconds * 1000).toISOString().slice(0, 10);
};

export const tradingViewBarsToHistorical = function tradingViewBarsToHistorical(
  bars: TvBar[],
  litersPerTon: number,
  usdNokForUtcYmd: (utcYmd: string) => number
): { date: string; price: number; price_nok_liter: number }[] {
  const sorted = [...bars].toSorted((a, b) => a.time - b.time);
  return sorted.map((b) => {
    const date = barTimeToUtcDate(b.time);
    const usdToNok = usdNokForUtcYmd(date);
    return {
      date,
      price: b.close,
      price_nok_liter:
        Math.round(((b.close * usdToNok) / litersPerTon) * 100) / 100,
    };
  });
};

export const fetchIceDailyBarsFromTradingView =
  function fetchIceDailyBarsFromTradingView(options: {
    symbol: string;
    barCount: number;
    minBars: number;
    settleMs: number;
    hardTimeoutMs: number;
    timeoutMinBars?: number;
  }): Promise<IceGasoilDailyFromTv> {
    const { symbol, barCount, minBars, settleMs, hardTimeoutMs } = options;
    const timeoutMinBars = options.timeoutMinBars ?? minBars;

    const client = new Client();
    const chart = new client.Session.Chart();

    const { promise, reject, resolve } =
      Promise.withResolvers<IceGasoilDailyFromTv>();

    let settled = false;
    let settleTimer: ReturnType<typeof setTimeout> | undefined;

    const cleanup = () => {
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
            await client.end();
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
      const bars = [...chart.periods].toSorted((a, b) => a.time - b.time);
      resolve({ bars, infos: { ...chart.infos } });
    };

    const finishErr = (err: Error) => {
      if (settled) {
        return;
      }
      settled = true;
      cleanup();
      reject(err);
    };

    chart.onError((...args: unknown[]) => {
      const msg = args.map(String).join(" ");
      finishErr(new Error(msg || "TradingView chart error"));
    });

    const scheduleSettle = () => {
      if (chart.periods.length < minBars) {
        return;
      }
      if (settleTimer) {
        clearTimeout(settleTimer);
      }
      settleTimer = setTimeout(finishOk, settleMs);
    };

    chart.onUpdate(() => {
      scheduleSettle();
    });

    chart.onSymbolLoaded(() => {
      scheduleSettle();
    });

    setTimeout(() => {
      if (chart.periods.length >= timeoutMinBars) {
        finishOk();
      } else {
        finishErr(new Error("TradingView timeout or insufficient bars"));
      }
    }, hardTimeoutMs);

    chart.setMarket(symbol, {
      backadjustment: true,
      range: barCount,
      timeframe: "D",
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
