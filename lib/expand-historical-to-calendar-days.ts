import { isoDateToUtcNoonMs } from "@/lib/chart-time-axis";
import type { DieselPricesHistoricalRow } from "@/lib/diesel-prices-payload";

const MS_PER_DAY = 86_400_000;

const utcIsoFromMs = function utcIsoFromMs(ms: number): string {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/**
 * Fills calendar gaps between trading days: carries forward the last quoted
 * råvare (NOK/L and USD/MT), then callers can apply avgifter per kalenderdag.
 */
export const expandHistoricalTradingToCalendarDays =
  function expandHistoricalTradingToCalendarDays(
    rows: readonly DieselPricesHistoricalRow[]
  ): DieselPricesHistoricalRow[] {
    if (rows.length === 0) {
      return [];
    }
    const sorted = [...rows].toSorted((a, b) => a.date.localeCompare(b.date));
    const byDay = new Map<string, DieselPricesHistoricalRow>();
    for (const row of sorted) {
      byDay.set(row.date.slice(0, 10), row);
    }
    const [first] = sorted;
    const last = sorted.at(-1);
    if (first === undefined || last === undefined) {
      return [];
    }
    const startMs = isoDateToUtcNoonMs(first.date);
    const endMs = isoDateToUtcNoonMs(last.date);
    if (
      !(Number.isFinite(startMs) && Number.isFinite(endMs)) ||
      endMs < startMs
    ) {
      return sorted;
    }

    const out: DieselPricesHistoricalRow[] = [];
    let carry: DieselPricesHistoricalRow | null = null;
    for (let ms = startMs; ms <= endMs; ms += MS_PER_DAY) {
      const iso = utcIsoFromMs(ms);
      const traded = byDay.get(iso);
      if (traded) {
        carry = traded;
      }
      if (carry === null) {
        continue;
      }
      out.push({
        date: iso,
        price: carry.price,
        price_nok_liter: carry.price_nok_liter,
      });
    }
    return out;
  };
