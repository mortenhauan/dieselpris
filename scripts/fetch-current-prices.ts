#!/usr/bin/env npx tsx
/**
 * Fetches ICE gasoil (ULS1) and Brent (BRN1) price data from TradingView
 * and converts to NOK/liter using the Norges Bank USD/NOK rate.
 *
 * Outputs:
 *   - 7-day daily OHLC table for ULS1
 *   - 48h intraday sparkline (hourly bars) for ULS1
 *   - Latest Brent daily close + 7-day range
 *
 * Uses the same data source and formula as the live site:
 *   NOK/liter = (USD/mt × USD/NOK) ÷ 1176
 *
 * Run:
 *   source scripts/use-nvm.sh && npx tsx scripts/fetch-current-prices.ts
 */

import {
  fetchNorgesBankUsdNokSeries,
  USD_NOK_FALLBACK,
} from "../lib/norges-bank-usd-nok";
import {
  barTimeToExchangeDate,
  fetchIceDailyBarsFromTradingView,
  ICEEUR_BRN1_CONTINUOUS,
  ICEEUR_ULS1_CONTINUOUS,
} from "../lib/tradingview-ice-gasoil";

const DIESEL_LITERS_PER_METRIC_TON = 1176;
const DAILY_DAYS = 7;
const INTRADAY_BARS = 48;

const fetchDaily = (symbol: string, days: number) =>
  fetchIceDailyBarsFromTradingView({
    barCount: days + 2,
    hardTimeoutMs: 22_000,
    minBars: Math.min(days, 3),
    settleMs: 800,
    symbol,
    timeoutMinBars: Math.min(days, 3),
  });

const fetchIntraday = (symbol: string, bars: number) =>
  fetchIceDailyBarsFromTradingView({
    barCount: bars + 4,
    hardTimeoutMs: 22_000,
    minBars: Math.min(bars, 6),
    settleMs: 1000,
    symbol,
    timeframe: "60",
    timeoutMinBars: Math.min(bars, 6),
  });

const fmt = (n: number, d = 2) => n.toFixed(d);
const sign = (n: number) => (n >= 0 ? "+" : "");
const pad = (s: string, w: number) => s.padStart(w);

const sparkline = (values: number[]): string => {
  const chars = "▁▂▃▄▅▆▇█";
  if (values.length === 0) return "";
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min;
  if (range === 0) return chars[3].repeat(values.length);
  return values
    .map((v) => {
      const idx = Math.round(((v - min) / range) * (chars.length - 1));
      return chars[idx];
    })
    .join("");
};

async function main() {
  console.log("Fetching prices from TradingView + Norges Bank…\n");

  const [fxResult, dailyResult, intradayResult, brentResult] =
    await Promise.allSettled([
      fetchNorgesBankUsdNokSeries(10),
      fetchDaily(ICEEUR_ULS1_CONTINUOUS, DAILY_DAYS),
      fetchIntraday(ICEEUR_ULS1_CONTINUOUS, INTRADAY_BARS),
      fetchDaily(ICEEUR_BRN1_CONTINUOUS, DAILY_DAYS),
    ]);

  const fx =
    fxResult.status === "fulfilled" && fxResult.value ? fxResult.value : null;
  const usdNok = fx?.latestRate ?? USD_NOK_FALLBACK;
  const fxDate = fx?.latestDate ?? "fallback";

  console.log(`USD/NOK  ${fmt(usdNok, 4)}  (Norges Bank, ${fxDate})`);
  console.log();

  // ── ULS1 daily OHLC table ─────────────────────────────────────────────────
  if (dailyResult.status === "fulfilled") {
    const bars = [...dailyResult.value.bars]
      .sort((a, b) => a.time - b.time)
      .slice(-DAILY_DAYS);

    console.log("ICE Low Sulphur Gasoil  ICEEUR:ULS1!  (siste 7 dager)");
    console.log(
      "  Dato        Open      High       Low     Close   Endring  NOK/L"
    );
    console.log("  ─────────────────────────────────────────────────────────");

    for (let i = 0; i < bars.length; i++) {
      const bar = bars[i];
      const prev = bars[i - 1];
      const date = barTimeToExchangeDate(bar.time);
      const change = prev ? bar.close - prev.close : 0;
      const nokLiter = (bar.close * usdNok) / DIESEL_LITERS_PER_METRIC_TON;
      console.log(
        `  ${date}` +
          `  ${pad(fmt(bar.open), 7)}` +
          `  ${pad(fmt(bar.max), 7)}` +
          `  ${pad(fmt(bar.min), 7)}` +
          `  ${pad(fmt(bar.close), 7)}` +
          `  ${pad(`${sign(change)}${fmt(change)}`, 8)}` +
          `  ${fmt(nokLiter)}`
      );
    }
    console.log();
  } else {
    console.error("ULS1 daglig data feilet:", dailyResult.reason);
  }

  // ── ULS1 intraday sparkline (last 48h) ────────────────────────────────────
  if (intradayResult.status === "fulfilled") {
    const bars = [...intradayResult.value.bars]
      .sort((a, b) => a.time - b.time)
      .slice(-INTRADAY_BARS);

    const closes = bars.map((b) => b.close);
    const highs = bars.map((b) => b.max);
    const lows = bars.map((b) => b.min);
    const overallHigh = Math.max(...highs);
    const overallLow = Math.min(...lows);
    const first = bars.at(0);
    const last = bars.at(-1);
    const totalMove = first && last ? last.close - first.close : 0;

    console.log(`ICE ULS1 siste 48t  (timesintervall)`);
    console.log(`  ${sparkline(closes)}`);
    console.log(
      `  Lav: ${fmt(overallLow)}  Høy: ${fmt(overallHigh)}  ` +
        `Total endring: ${sign(totalMove)}${fmt(totalMove)} USD/mt`
    );
    console.log();
  } else {
    console.error("ULS1 intradag data feilet:", intradayResult.reason);
  }

  // ── Brent daily ───────────────────────────────────────────────────────────
  if (brentResult.status === "fulfilled") {
    const bars = [...brentResult.value.bars]
      .sort((a, b) => a.time - b.time)
      .slice(-DAILY_DAYS);
    const latest = bars.at(-1);
    const prev = bars.at(-2);

    if (latest) {
      const date = barTimeToExchangeDate(latest.time);
      const change = prev ? latest.close - prev.close : 0;
      const weekHigh = Math.max(...bars.map((b) => b.max));
      const weekLow = Math.min(...bars.map((b) => b.min));
      const closes = bars.map((b) => b.close);

      console.log(`ICE Brent Crude  ICEEUR:BRN1!`);
      console.log(
        `  ${sparkline(closes)}  (${bars.at(0) ? barTimeToExchangeDate(bars.at(0)!.time) : "?"} → ${date})`
      );
      console.log(
        `  Siste: ${fmt(latest.close)} USD/fat  ` +
          `Endring: ${sign(change)}${fmt(change)}  ` +
          `7d-høy: ${fmt(weekHigh)}  7d-lav: ${fmt(weekLow)}`
      );
      console.log();
    }
  } else {
    console.error("BRN1 data feilet:", brentResult.reason);
  }

  console.log(
    "NB: Pumpepris = råvare + veibruksavgift (~2.10 kr/L) + CO2-avgift (~0.95 kr/L)"
  );
  console.log("    + biodrivstoff innblanding + distribusjonsmargin + 25% MVA");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
