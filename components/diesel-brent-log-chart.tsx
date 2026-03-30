"use client";

import { useMemo } from "react";
import type { ReactElement } from "react";
import {
  ComposedChart,
  Line,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  dateFromChartTooltipLabel,
  isoDateToUtcNoonMs,
  monthStartTimestampsUtc,
} from "@/lib/chart-time-axis";
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

interface TimeSeriesRow extends MergedRow {
  timeMs: number;
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

const createMonthTickFormatterMs = function createMonthTickFormatterMs(
  spanYears: boolean
) {
  return function formatMonthTick(ms: number): string {
    return new Date(ms).toLocaleDateString(
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

const lastPointDot = function lastPointDot(
  stroke: string,
  lastIndex: number
): (props: unknown) => ReactElement | null {
  return function renderDot(props: unknown) {
    const p = props as { cx?: number; cy?: number; index?: number };
    if (p.index !== lastIndex || p.cx === undefined || p.cy === undefined) {
      return null;
    }
    return (
      <circle
        cx={p.cx}
        cy={p.cy}
        fill={stroke}
        r={4}
        stroke="oklch(0.99 0.005 250)"
        strokeWidth={1}
      />
    );
  };
};

const LogDualTooltip = function LogDualTooltip({
  active,
  label,
  payload,
}: LogTooltipProps) {
  if (!(active && payload?.length)) {
    return null;
  }
  const labelDate = dateFromChartTooltipLabel(label);
  const dateLabel = labelDate
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
  spotAsOfDate,
  spotBrentUsdBbl,
  spotGasoilUsdMt,
}: {
  brent: BrentHistoricalRow[];
  historical: DieselPricesHistoricalRow[];
  spotAsOfDate?: string;
  spotBrentUsdBbl?: number;
  spotGasoilUsdMt?: number;
}) {
  const merged = useMemo(
    () => mergeGasoilBrentByDate(historical, brent),
    [brent, historical]
  );

  const showSpotTail = useMemo(() => {
    const last = merged.at(-1);
    if (last === undefined) {
      return false;
    }
    if (
      spotAsOfDate === undefined ||
      spotGasoilUsdMt === undefined ||
      spotBrentUsdBbl === undefined
    ) {
      return false;
    }
    if (
      !(
        spotGasoilUsdMt > 0 &&
        spotBrentUsdBbl > 0 &&
        Number.isFinite(spotGasoilUsdMt) &&
        Number.isFinite(spotBrentUsdBbl)
      )
    ) {
      return false;
    }
    return spotAsOfDate.localeCompare(last.date) > 0;
  }, [merged, spotAsOfDate, spotBrentUsdBbl, spotGasoilUsdMt]);

  const chartData = useMemo((): MergedRow[] => {
    if (
      !showSpotTail ||
      spotAsOfDate === undefined ||
      spotGasoilUsdMt === undefined ||
      spotBrentUsdBbl === undefined
    ) {
      return merged;
    }
    return [
      ...merged,
      {
        brent_usd_bbl: spotBrentUsdBbl,
        date: spotAsOfDate,
        gasoil_usd_mt: spotGasoilUsdMt,
      },
    ];
  }, [merged, showSpotTail, spotAsOfDate, spotBrentUsdBbl, spotGasoilUsdMt]);

  const timeSeriesData = useMemo(
    (): TimeSeriesRow[] =>
      chartData
        .map((r) => {
          const timeMs = isoDateToUtcNoonMs(r.date);
          return Number.isFinite(timeMs) ? { ...r, timeMs } : null;
        })
        .filter((r): r is TimeSeriesRow => r !== null),
    [chartData]
  );

  const spanYears = useMemo(() => {
    const y0 = timeSeriesData[0]?.date.slice(0, 4) ?? "";
    const y1 = timeSeriesData.at(-1)?.date.slice(0, 4) ?? "";
    return y0 !== y1;
  }, [timeSeriesData]);
  const formatMonthTick = useMemo(
    () => createMonthTickFormatterMs(spanYears),
    [spanYears]
  );

  const monthTicks = useMemo(() => {
    const [first] = timeSeriesData;
    const last = timeSeriesData.at(-1);
    if (first === undefined || last === undefined) {
      return [];
    }
    return monthStartTimestampsUtc(first.timeMs, last.timeMs);
  }, [timeSeriesData]);

  const lastChartIndex = Math.max(0, timeSeriesData.length - 1);

  const gasoilDomain = useMemo((): [number, number] | undefined => {
    if (timeSeriesData.length === 0) {
      return undefined;
    }
    const vals = timeSeriesData.map((r) => r.gasoil_usd_mt);
    return logDomainPad(Math.min(...vals), Math.max(...vals));
  }, [timeSeriesData]);

  const brentDomain = useMemo((): [number, number] | undefined => {
    if (timeSeriesData.length === 0) {
      return undefined;
    }
    const vals = timeSeriesData.map((r) => r.brent_usd_bbl);
    return logDomainPad(Math.min(...vals), Math.max(...vals));
  }, [timeSeriesData]);

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
            data={timeSeriesData}
            margin={{ bottom: 0, left: 2, right: 4, top: 10 }}
          >
            <XAxis
              dataKey="timeMs"
              domain={["dataMin", "dataMax"]}
              scale="time"
              tick={{ fill: "oklch(0.50 0.02 250)", fontSize: 12 }}
              tickFormatter={formatMonthTick}
              tickLine={false}
              ticks={monthTicks}
              type="number"
              axisLine={{ stroke: "oklch(0.90 0.01 250)" }}
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
              dot={lastPointDot(GASOIL_STROKE, lastChartIndex)}
              isAnimationActive={false}
              name="Gasoil"
              stroke={GASOIL_STROKE}
              strokeWidth={2}
              type="linear"
              yAxisId="gasoil"
            />
            <Line
              dataKey="brent_usd_bbl"
              dot={lastPointDot(BRENT_STROKE, lastChartIndex)}
              isAnimationActive={false}
              name="Brent"
              stroke={BRENT_STROKE}
              strokeWidth={2}
              type="linear"
              yAxisId="brent"
            />
            {monthTicks.map((t) => (
              <ReferenceLine
                key={t}
                stroke={MONTH_MARKER_STROKE}
                strokeDasharray="4 5"
                strokeWidth={1}
                x={t}
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
        {showSpotTail ? (
          <span className="w-full basis-full text-center max-w-xl mx-auto text-muted-foreground">
            Siste punkt følger visningsdato og bruker samme nivåer som
            råvarekortet når siste felles handelsdag i kilden er eldre.
          </span>
        ) : null}
      </div>
    </div>
  );
};
