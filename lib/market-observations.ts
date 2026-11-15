/** Ignore upcoming session placeholders and unusable quotes from the feed. */
export const observedMarketBars = <T extends { time: number; close: number }>(
  bars: readonly T[],
  observedAtMs: number
): T[] =>
  bars.filter(
    (bar) =>
      Number.isFinite(bar.time) &&
      bar.time > 0 &&
      bar.time * 1000 <= observedAtMs &&
      Number.isFinite(bar.close) &&
      bar.close > 0
  );
