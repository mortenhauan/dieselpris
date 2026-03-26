import { fetchIceDailyBarsFromTradingView } from "@/lib/tradingview-ice-gasoil";

const ICE_MONTH_LETTERS = [
  "F",
  "G",
  "H",
  "J",
  "K",
  "M",
  "N",
  "Q",
  "U",
  "V",
  "X",
  "Z",
] as const;
const FORWARD_MONTHS = 6;
/** TradingView throttles parallel sockets; stay at one session at a time with a small gap. */
const MS_BETWEEN_TV_REQUESTS = 450;

const delay = async function delay(ms: number): Promise<void> {
  const { promise, resolve } = Promise.withResolvers<number>();
  setTimeout(() => {
    resolve(0);
  }, ms);
  await promise;
};

export interface IceUlsContractRow {
  contract_code: string;
  /** UTC `YYYY-MM-DD` (1. i leveringsmåneden) — til dato-styrt avgift i pumpeprismodellen. */
  duty_at_utc_ymd: string;
  contract_month: string;
  last_price: number;
  change: number;
  change_percent: number;
  open: number;
  high: number;
  low: number;
  previous: number;
  volume: number;
}

const addCalendarMonthsUTC = function addCalendarMonthsUTC(
  year: number,
  month0: number,
  delta: number
): { y: number; m: number } {
  const d = new Date(Date.UTC(year, month0 + delta, 1));
  return { m: d.getUTCMonth(), y: d.getUTCFullYear() };
};

const isBusinessDayUtc = function isBusinessDayUtc(dayOfWeek: number): boolean {
  return dayOfWeek !== 0 && dayOfWeek !== 6;
};

const subtractBusinessDaysUTC = function subtractBusinessDaysUTC(
  date: Date,
  businessDays: number
): Date {
  const result = new Date(date);
  let remaining = businessDays;

  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() - 1);
    if (isBusinessDayUtc(result.getUTCDay())) {
      remaining -= 1;
    }
  }

  return result;
};

const currentForwardStartOffset = function currentForwardStartOffset(
  now: Date
): number {
  const monthCeaseDate = subtractBusinessDaysUTC(
    new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 14, 12)),
    2
  );

  return now.getTime() > monthCeaseDate.getTime() ? 1 : 0;
};

const ulsTvSymbol = function ulsTvSymbol(year: number, month0: number): string {
  const letter = ICE_MONTH_LETTERS[month0];
  return `ICEEUR:ULS${letter}${year}`;
};

const formatContractMonthNb = function formatContractMonthNb(
  year: number,
  month0: number
): string {
  return new Date(Date.UTC(year, month0, 1)).toLocaleDateString("nb-NO", {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  });
};

const round2 = function round2(n: number): number {
  return Math.round(n * 100) / 100;
};

const lastCloseForSymbol = async function lastCloseForSymbol(
  symbol: string
): Promise<{ last: number; prev: number } | null> {
  try {
    const { bars } = await fetchIceDailyBarsFromTradingView({
      barCount: 8,
      hardTimeoutMs: 14_000,
      minBars: 2,
      settleMs: 900,
      symbol,
      timeoutMinBars: 2,
    });
    const sorted = [...bars].toSorted((a, b) => a.time - b.time);
    if (sorted.length < 2) {
      return null;
    }
    const last = sorted.at(-1);
    const prev = sorted.at(-2);
    if (last === undefined || prev === undefined) {
      return null;
    }
    return { last: last.close, prev: prev.close };
  } catch {
    return null;
  }
};

export const fetchNextSixIceUlsMonthlyContracts =
  async function fetchNextSixIceUlsMonthlyContracts(
    now: Date = new Date()
  ): Promise<IceUlsContractRow[]> {
    const y0 = now.getUTCFullYear();
    const m0 = now.getUTCMonth();
    const startOffset = currentForwardStartOffset(now);
    const slots = Array.from({ length: FORWARD_MONTHS }, (_, i) =>
      addCalendarMonthsUTC(y0, m0, startOffset + i)
    );

    const settled: (IceUlsContractRow | null)[] = [];
    for (let i = 0; i < slots.length; i += 1) {
      if (i > 0) {
        await delay(MS_BETWEEN_TV_REQUESTS);
      }
      const slot = slots[i];
      if (!slot) {
        settled.push(null);
        continue;
      }
      const { y, m } = slot;
      const symbol = ulsTvSymbol(y, m);
      const closes = await lastCloseForSymbol(symbol);
      if (!closes) {
        settled.push(null);
        continue;
      }
      const { last, prev } = closes;
      const change = last - prev;
      const changePercent = prev === 0 ? 0 : round2((change / prev) * 100);
      const code = symbol.replace(/^ICEEUR:/, "");
      const duty_at_utc_ymd = `${y}-${String(m + 1).padStart(2, "0")}-01`;
      settled.push({
        change: round2(change),
        change_percent: changePercent,
        contract_code: code,
        contract_month: formatContractMonthNb(y, m),
        duty_at_utc_ymd,
        high: round2(last),
        last_price: round2(last),
        low: round2(last),
        open: round2(last),
        previous: round2(prev),
        volume: 0,
      });
    }

    return settled.filter((r): r is IceUlsContractRow => r !== null);
  };
