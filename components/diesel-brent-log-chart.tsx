"use client";

import { useMemo } from "react";
import {
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  BrentHistoricalRow,
  DieselPricesHistoricalRow,
} from "@/lib/diesel-prices-payload";

const MONTH_MARKER_STROKE = "oklch(0.88 0.012 250)";
const GASOIL_STROKE = "oklch(0.35 0.14 145)";
const BRENT_STROKE = "oklch(0.50 0.14 250)";
/** Enough steps so log axes span min→max (Recharts log default ticks often stop mid-range). */
const LOG_AXIS_TICK_STEPS = 11;

interface MergedRow {
  date: string;
  gasoil_usd_mt: number;
  brent_usd_bbl: number;
}

const mergeGasoilBrentByDate = function mergeGasoilBrentByDate(
  historical: DieselPricesHistoricalRow[],
  brent: BrentHistoricalRow[]
): MergedRow[] {
  const brentByDate = new Map(
    brent.map((b) => [b.date, b.usd_per_barrel] as const)
  );
  const gasoilByDate = new Map(
    historical.map((h) => [h.date, h.price] as const)
  );
  const dates = [...new Set([...gasoilByDate.keys(), ...brentByDate.keys()])]
    .filter((d) => {
      const g = gasoilByDate.get(d);
      const br = brentByDate.get(d);
      return (
        g !== undefined &&
        br !== undefined &&
        g > 0 &&
        br > 0 &&
        Number.isFinite(g) &&
        Number.isFinite(br)
      );
    })
    .toSorted((a, b) => a.localeCompare(b));

  return dates.map((date) => ({
    brent_usd_bbl: brentByDate.get(date) as number,
    date,
    gasoil_usd_mt: gasoilByDate.get(date) as number,
  }));
};

const monthBoundaryCategories = function monthBoundaryCategories(
  rows: MergedRow[]
): string[] {
  const out: string[] = [];
  let prevYm = "";
  for (const row of rows) {
    const ym = row.date.slice(0, 7);
    if (ym !== prevYm) {
      out.push(row.date);
      prevYm = ym;
    }
  }
  return out;
};

const createMonthTickFormatter = function createMonthTickFormatter(
  spanYears: boolean
) {
  return function formatMonthTick(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(
      "nb-NO",
      spanYears ? { month: "short", year: "2-digit" } : { month: "short" }
    );
  };
};

const formatGasoilAxisTick = function formatGasoilAxisTick(n: number): string {
  const rounded = n >= 100 ? Math.round(n) : Math.round(n * 10) / 10;
  return `${rounded.toLocaleString("nb-NO", { maximumFractionDigits: 1 })} $/t`;
};

const formatBrentAxisTick = function formatBrentAxisTick(n: number): string {
  const rounded = n >= 20 ? Math.round(n) : Math.round(n * 10) / 10;
  return `${rounded.toLocaleString("nb-NO", { maximumFractionDigits: 1 })} $/f`;
};

const logDomainPad = function logDomainPad(
  dataMin: number,
  dataMax: number
): [number, number] {
  const lo = Math.max(dataMin * 0.96, 1e-6);
  const hi = dataMax * 1.08;
  return [lo, hi];
};

/** Equal multiplicative steps; Recharts' default log ticks often truncate early. */
const logEvenTicks = function logEvenTicks(
  min: number,
  max: number,
  stepCount: number
): number[] {
  if (!(min > 0 && max > min && Number.isFinite(min) && Number.isFinite(max))) {
    return [];
  }
  const ln0 = Math.log(min);
  const ln1 = Math.log(max);
  const ticks: number[] = [];
  const n = Math.max(2, stepCount);
  for (let i = 0; i < n; i += 1) {
    ticks.push(Math.exp(ln0 + ((ln1 - ln0) * i) / (n - 1)));
  }
  return ticks;
};

interface LogTooltipProps {
  active?: boolean;
  label?: unknown;
  payload?: readonly {
    dataKey?: unknown;
    value?: unknown;
    color?: string;
  }[];
}

const LogDualTooltip = function LogDualTooltip({
  active,
  label,
  payload,
}: LogTooltipProps) {
  if (!(active && payload?.length)) {
    return null;
  }
  const labelStr =
    typeof label === "string" || typeof label === "number" ? String(label) : "";
  const labelDate = labelStr ? new Date(labelStr) : null;
  const dateLabel =
    labelDate && !Number.isNaN(labelDate.getTime())
      ? labelDate.toLocaleDateString("nb-NO", {
          day: "numeric",
          month: "short",
        })
      : null;

  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px]">
      {dateLabel ? (
        <p className="text-sm text-muted-foreground mb-2">{dateLabel}</p>
      ) : null}
      <div className="space-y-1.5">
        {payload.map((entry) => {
          const raw = entry.value;
          const v = typeof raw === "number" ? raw : Number(raw);
          if (!Number.isFinite(v)) {
            return null;
          }
          const key = String(entry.dataKey ?? "");
          const isGasoil = key === "gasoil_usd_mt";
          const unit = isGasoil ? "USD/t (gasoil)" : "USD/fat (Brent)";
          return (
            <div
              key={key}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="flex items-center gap-2 text-muted-foreground">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                {isGasoil ? "Gasoil" : "Brent"}
              </span>
              <span className="font-medium tabular-nums text-foreground">
                {v.toLocaleString("nb-NO", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  {unit}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const DieselBrentLogChart = function DieselBrentLogChart({
  brent,
  historical,
}: {
  brent: BrentHistoricalRow[];
  historical: DieselPricesHistoricalRow[];
}) {
  const merged = useMemo(
    () => mergeGasoilBrentByDate(historical, brent),
    [brent, historical]
  );
  const monthCategories = useMemo(
    () => monthBoundaryCategories(merged),
    [merged]
  );
  const spanYears = useMemo(() => {
    const y0 = merged[0]?.date.slice(0, 4) ?? "";
    const y1 = merged.at(-1)?.date.slice(0, 4) ?? "";
    return y0 !== y1;
  }, [merged]);
  const formatMonthTick = useMemo(
    () => createMonthTickFormatter(spanYears),
    [spanYears]
  );

  const gasoilDomain = useMemo((): [number, number] | undefined => {
    if (merged.length === 0) {
      return undefined;
    }
    const vals = merged.map((r) => r.gasoil_usd_mt);
    return logDomainPad(Math.min(...vals), Math.max(...vals));
  }, [merged]);

  const brentDomain = useMemo((): [number, number] | undefined => {
    if (merged.length === 0) {
      return undefined;
    }
    const vals = merged.map((r) => r.brent_usd_bbl);
    return logDomainPad(Math.min(...vals), Math.max(...vals));
  }, [merged]);

  const gasoilTicks = useMemo(() => {
    if (gasoilDomain === undefined) {
      return [];
    }
    return logEvenTicks(gasoilDomain[0], gasoilDomain[1], LOG_AXIS_TICK_STEPS);
  }, [gasoilDomain]);

  const brentTicks = useMemo(() => {
    if (brentDomain === undefined) {
      return [];
    }
    return logEvenTicks(brentDomain[0], brentDomain[1], LOG_AXIS_TICK_STEPS);
  }, [brentDomain]);

  if (merged.length < 2) {
    return (
      <div className="h-[200px] flex items-center justify-center text-sm text-muted-foreground">
        For få felles handelsdager mellom gasoil og Brent i dette vinduet.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="h-[240px] sm:h-[300px] md:h-[360px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ height: 320, width: 800 }}
        >
          <ComposedChart
            data={merged}
            margin={{ bottom: 0, left: 2, right: 4, top: 10 }}
          >
            <XAxis
              dataKey="date"
              type="category"
              ticks={monthCategories}
              tickFormatter={formatMonthTick}
              tick={{ fill: "oklch(0.50 0.02 250)", fontSize: 12 }}
              axisLine={{ stroke: "oklch(0.90 0.01 250)" }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              allowDecimals
              domain={gasoilDomain}
              interval={0}
              niceTicks="none"
              orientation="left"
              scale="log"
              tick={{ fill: "oklch(0.45 0.08 145)", fontSize: 11 }}
              tickFormatter={formatGasoilAxisTick}
              tickLine={false}
              ticks={gasoilTicks}
              type="number"
              width={72}
              yAxisId="gasoil"
            />
            <YAxis
              allowDecimals
              domain={brentDomain}
              interval={0}
              niceTicks="none"
              orientation="right"
              scale="log"
              tick={{ fill: "oklch(0.50 0.06 250)", fontSize: 11 }}
              tickFormatter={formatBrentAxisTick}
              tickLine={false}
              ticks={brentTicks}
              type="number"
              width={66}
              yAxisId="brent"
            />
            <Tooltip content={LogDualTooltip} />
            <Line
              dataKey="gasoil_usd_mt"
              dot={false}
              isAnimationActive={false}
              name="Gasoil"
              stroke={GASOIL_STROKE}
              strokeWidth={2}
              type="monotone"
              yAxisId="gasoil"
            />
            <Line
              dataKey="brent_usd_bbl"
              dot={false}
              isAnimationActive={false}
              name="Brent"
              stroke={BRENT_STROKE}
              strokeWidth={2}
              type="monotone"
              yAxisId="brent"
            />
            {monthCategories.map((d) => (
              <ReferenceLine
                key={d}
                stroke={MONTH_MARKER_STROKE}
                strokeDasharray="4 5"
                strokeWidth={1}
                x={d}
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <span
            className="size-2 rounded-full shrink-0"
            style={{ backgroundColor: GASOIL_STROKE }}
          />
          Venstre akse: lavsvovel gasoil (ICE), USD/t — log
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="size-2 rounded-full shrink-0"
            style={{ backgroundColor: BRENT_STROKE }}
          />
          Høyre akse: Brent råolje, USD/fat — log
        </span>
      </div>
    </div>
  );
};
