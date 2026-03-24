"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { DIESEL_LITERS_PER_METRIC_TON } from "@/lib/diesel-prices-payload";
import {
  PUMP_PRICE_STACK_LAYERS,
  pumpPriceComponents,
} from "@/lib/pump-price-model";
import type { PumpPriceLayerKey } from "@/lib/pump-price-model";
import type { RegionId } from "@/lib/regional-price-model";

/** Matches API `historical` rows: ICE close USD/MT + NOK/liter (råvare). */
interface HistoricalData {
  date: string;
  price: number;
  price_nok_liter: number;
}

type StackedRow = HistoricalData &
  Record<PumpPriceLayerKey, number> & { total: number };

interface PriceChartProps {
  data: HistoricalData[];
  regionId: RegionId;
}

const Y_STEP_KR = 5;
const MONTH_MARKER_STROKE = "oklch(0.88 0.012 250)";
const impliedUsdNok = function impliedUsdNok(
  priceUsdMt: number,
  nokPerLiter: number
): number | null {
  if (!Number.isFinite(priceUsdMt) || priceUsdMt <= 0) {
    return null;
  }
  const v = (nokPerLiter * DIESEL_LITERS_PER_METRIC_TON) / priceUsdMt;
  return Number.isFinite(v) ? v : null;
};

const toStackedRows = function toStackedRows(
  data: HistoricalData[],
  regionId: RegionId
): StackedRow[] {
  return data.map((row) => {
    const parts = pumpPriceComponents(row.price_nok_liter, regionId, row.date);
    return {
      ...row,
      co2: parts.co2,
      distribution: parts.distribution,
      mva: parts.mva,
      raw: parts.raw,
      total: parts.total,
      veibruks: parts.veibruks,
    };
  });
};

const monthBoundaryCategories = function monthBoundaryCategories(
  sorted: StackedRow[]
): string[] {
  const out: string[] = [];
  let prevYm = "";
  for (const row of sorted) {
    const ym = row.date.slice(0, 7);
    if (ym !== prevYm) {
      out.push(row.date);
      prevYm = ym;
    }
  }
  return out;
};

const yScaleFromTotals = function yScaleFromTotals(totals: number[]): {
  yTicks: number[];
  yDomain: [number, number];
} {
  if (totals.length === 0) {
    return { yDomain: [0, 30], yTicks: [0, 5, 10, 15, 20, 25, 30] };
  }
  const maxP = Math.max(...totals);
  const last = Math.max(Y_STEP_KR, Math.ceil(maxP / Y_STEP_KR) * Y_STEP_KR);

  const yTicks: number[] = [];
  for (let v = 0; v <= last; v += Y_STEP_KR) {
    yTicks.push(v);
  }

  return { yDomain: [0, last], yTicks };
};

const formatChartTooltipDate = function formatChartTooltipDate(
  dateStr: string
) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("nb-NO", { day: "numeric", month: "short" });
};

const formatChartKr = function formatChartKr(value: number): string {
  return `${value.toLocaleString("nb-NO", { maximumFractionDigits: 2, minimumFractionDigits: 2 })} kr`;
};

const formatChartYAxisKr = function formatChartYAxisKr(value: number): string {
  return `${value} kr`;
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

interface PriceChartTooltipProps {
  active?: boolean;
  label?: string | number;
  payload?: readonly { payload?: unknown }[];
}

const PriceChartTooltip = function PriceChartTooltip({
  active,
  label,
  payload,
}: PriceChartTooltipProps) {
  if (!(active && payload?.length)) {
    return null;
  }
  const row = payload[0]?.payload as StackedRow;
  const fx = impliedUsdNok(row.price, row.price_nok_liter);
  return (
    <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px]">
      <p className="text-sm text-muted-foreground mb-2">
        {formatChartTooltipDate(String(label))}
      </p>
      <div className="space-y-1.5">
        {PUMP_PRICE_STACK_LAYERS.map((layer) => (
          <div
            key={layer.key}
            className="flex items-center justify-between gap-4 text-sm"
          >
            <span className="flex items-center gap-2 text-muted-foreground">
              <span
                className="size-2 shrink-0 rounded-full"
                style={{ backgroundColor: layer.color }}
              />
              {layer.name}
            </span>
            <span className="font-medium tabular-nums text-foreground">
              {formatChartKr(row[layer.key])}
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 border-t border-border pt-2 mt-2 text-sm font-semibold text-foreground">
          <span>Sum pumpepris</span>
          <span className="tabular-nums">{formatChartKr(row.total)}</span>
        </div>
      </div>
      {row.price > 0 && (
        <p className="text-xs text-muted-foreground/80 mt-2 tabular-nums">
          {row.price.toLocaleString("nb-NO", {
            maximumFractionDigits: 0,
          })}{" "}
          USD/MT
        </p>
      )}
      {fx !== null && (
        <p className="text-xs text-muted-foreground/80 mt-2 tabular-nums">
          USD/NOK ≈{" "}
          {fx.toLocaleString("nb-NO", {
            maximumFractionDigits: 4,
            minimumFractionDigits: 2,
          })}
        </p>
      )}
    </div>
  );
};

const axisTicksFromStacked = function axisTicksFromStacked(data: StackedRow[]) {
  if (data.length === 0) {
    return {
      monthCategories: [] as string[],
      spanYears: false,
      yDomain: [0, 30] as [number, number],
      yTicks: [0, 5, 10, 15, 20, 25, 30],
    };
  }

  const sorted = [...data].toSorted((a, b) => a.date.localeCompare(b.date));
  const monthCategories = monthBoundaryCategories(sorted);
  const totals = sorted.map((d) => d.total);
  const { yTicks, yDomain } = yScaleFromTotals(totals);
  const y0 = sorted[0]?.date.slice(0, 4) ?? "";
  const y1 = sorted.at(-1)?.date.slice(0, 4) ?? "";

  return {
    monthCategories,
    spanYears: y0 !== y1,
    yDomain,
    yTicks,
  };
};

export const PriceChart = function PriceChart({
  data,
  regionId,
}: PriceChartProps) {
  const stackedData = useMemo(
    () => toStackedRows(data, regionId),
    [data, regionId]
  );
  const { monthCategories, yTicks, yDomain, spanYears } = useMemo(
    () => axisTicksFromStacked(stackedData),
    [stackedData]
  );

  const formatMonthTick = useMemo(
    () => createMonthTickFormatter(spanYears),
    [spanYears]
  );

  return (
    <div className="w-full">
      <div className="h-[240px] sm:h-[300px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={stackedData}
            margin={{ bottom: 0, left: 0, right: 10, top: 10 }}
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
              tickFormatter={formatChartYAxisKr}
              tick={{ fill: "oklch(0.50 0.02 250)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={yDomain}
              ticks={yTicks}
              width={60}
            />
            <Tooltip content={PriceChartTooltip} />
            {PUMP_PRICE_STACK_LAYERS.map((layer) => (
              <Area
                key={layer.key}
                type="monotone"
                dataKey={layer.key}
                name={layer.name}
                stackId="pump"
                stroke={layer.color}
                fill={layer.color}
                fillOpacity={0.92}
                strokeWidth={0.5}
                isAnimationActive={false}
              />
            ))}
            {monthCategories.map((d) => (
              <ReferenceLine
                key={d}
                x={d}
                stroke={MONTH_MARKER_STROKE}
                strokeWidth={1}
                strokeDasharray="4 5"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:justify-center">
        {PUMP_PRICE_STACK_LAYERS.map((layer) => (
          <span
            key={layer.key}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground"
          >
            <span
              className="size-2 rounded-full shrink-0"
              style={{ backgroundColor: layer.color }}
            />
            {layer.name}
          </span>
        ))}
      </div>
    </div>
  );
};
