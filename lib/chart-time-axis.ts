/** UTC noon for YYYY-MM-DD so x-positions are stable (no DST shift on the axis). */
export const isoDateToUtcNoonMs = function isoDateToUtcNoonMs(
  isoDate: string
): number {
  const parts = isoDate.split("-").map(Number);
  const [y, m, d] = parts;
  if (
    y === undefined ||
    m === undefined ||
    d === undefined ||
    !Number.isFinite(y) ||
    !Number.isFinite(m) ||
    !Number.isFinite(d)
  ) {
    return Number.NaN;
  }
  return Date.UTC(y, m - 1, d, 12, 0, 0, 0);
};

/** First UTC day of each month (noon) from the month of `minMs` through `maxMs`. */
export const monthStartTimestampsUtc = function monthStartTimestampsUtc(
  minMs: number,
  maxMs: number
): number[] {
  if (!(Number.isFinite(minMs) && Number.isFinite(maxMs) && maxMs >= minMs)) {
    return [];
  }
  const ticks: number[] = [];
  const a = new Date(minMs);
  let y = a.getUTCFullYear();
  let mo = a.getUTCMonth();
  for (let i = 0; i < 48; i += 1) {
    const t = Date.UTC(y, mo, 1, 12, 0, 0, 0);
    if (t > maxMs + 86_400_000) {
      break;
    }
    ticks.push(t);
    mo += 1;
    if (mo > 11) {
      mo = 0;
      y += 1;
    }
  }
  return ticks;
};

export const dateFromChartTooltipLabel = function dateFromChartTooltipLabel(
  label: unknown
): Date | null {
  if (typeof label === "number" && Number.isFinite(label)) {
    const d = new Date(label);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof label === "string") {
    const n = Number(label);
    if (Number.isFinite(n) && label.trim() === String(n)) {
      const d = new Date(n);
      return Number.isNaN(d.getTime()) ? null : d;
    }
    const d = new Date(label);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
};
