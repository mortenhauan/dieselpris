"use client";

import { Info } from "lucide-react";
import type { ReactNode } from "react";
import { useCallback, useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Tooltip as HintTooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DIESEL_LITERS_PER_METRIC_TON } from "@/lib/diesel-prices-payload";
import {
  PUMP_PRICE_STACK_LAYERS,
  pumpPriceComponents,
} from "@/lib/pump-price-model";
import type { PumpPriceLayerKey } from "@/lib/pump-price-model";
import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

interface Contract {
  contract_code: string;
  duty_at_utc_ymd: string;
  contract_month: string;
  last_price: number;
  high: number;
  low: number;
  change: number;
  change_percent: number;
}

interface FuturesForecastProps {
  contracts: Contract[];
  exchangeRate: number;
  regionId: RegionId;
}

const Y_STEP_KR = 5;
const HINT_CLASS =
  "max-w-[min(22rem,calc(100vw-2rem))] text-xs leading-relaxed px-3 py-2.5 font-normal normal-case tracking-normal";

const sessionDayRangeHintBody = (): ReactNode => (
  <p>
    Laveste og høyeste nivå for denne månedskontrakten i siste ICE-handelsdag vi
    har kurser for (lav- og høyeste dagsnotering). Omregnet til pumpeanslag med
    samme valutakurs og avgifter som «Estimert pumpepris» — ikke
    minutt-for-minutt siste døgn.
  </p>
);

type StackedFuturesRow = {
  contract_code: string;
  contract_month: string;
  price: number;
  price_nok_liter: number;
  session_pump_low: number;
  session_pump_high: number;
} & Record<PumpPriceLayerKey, number> & { total: number };

const toStackedFutures = function toStackedFutures(
  contracts: Contract[],
  exchangeRate: number,
  regionId: RegionId,
  litersPerTon: number
): StackedFuturesRow[] {
  return contracts.map((c) => {
    const price_nok_liter =
      Math.round(((c.last_price * exchangeRate) / litersPerTon) * 100) / 100;
    const parts = pumpPriceComponents(
      price_nok_liter,
      regionId,
      c.duty_at_utc_ymd
    );
    const rawLowNokLiter =
      Math.round(((c.low * exchangeRate) / litersPerTon) * 100) / 100;
    const rawHighNokLiter =
      Math.round(((c.high * exchangeRate) / litersPerTon) * 100) / 100;
    const partsLow = pumpPriceComponents(
      rawLowNokLiter,
      regionId,
      c.duty_at_utc_ymd
    );
    const partsHigh = pumpPriceComponents(
      rawHighNokLiter,
      regionId,
      c.duty_at_utc_ymd
    );
    const session_pump_low = Math.min(partsLow.total, partsHigh.total);
    const session_pump_high = Math.max(partsLow.total, partsHigh.total);
    return {
      co2: parts.co2,
      contract_code: c.contract_code,
      contract_month: c.contract_month,
      distribution: parts.distribution,
      mva: parts.mva,
      price: c.last_price,
      price_nok_liter,
      raw: parts.raw,
      session_pump_high,
      session_pump_low,
      total: parts.total,
      veibruks: parts.veibruks,
    };
  });
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

const formatKrPerLiter = function formatKrPerLiter(value: number): string {
  return `${value.toLocaleString("nb-NO", { maximumFractionDigits: 2, minimumFractionDigits: 2 })} kr/L`;
};

const Hint = function Hint({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <HintTooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="inline-flex shrink-0 rounded-full p-0.5 text-muted-foreground/55 outline-none transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring/40"
          aria-label={`Forklaring: ${label}`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        align="start"
        sideOffset={6}
        className={HINT_CLASS}
      >
        {children}
      </TooltipContent>
    </HintTooltip>
  );
};

const LAYER_LEGEND = PUMP_PRICE_STACK_LAYERS.map((l) => l.name).join(" → ");

const formatYAxisKr = function formatYAxisKr(value: number): string {
  return `${value} kr`;
};

interface FuturesChartTooltipProps {
  active?: boolean;
  payload?: readonly { payload?: unknown }[];
}

const FuturesChartTooltip = function FuturesChartTooltip({
  active,
  payload,
}: FuturesChartTooltipProps) {
  if (!(active && payload?.length)) {
    return null;
  }
  const row = payload[0]?.payload as StackedFuturesRow;
  return (
    <div className="min-w-[200px] rounded-lg border border-border bg-card p-3 shadow-lg">
      <p className="mb-2 text-sm font-medium text-foreground">
        {row.contract_month}
      </p>
      <p className="mb-2 text-sm font-semibold tabular-nums text-foreground">
        {formatKrPerLiter(row.total)}
      </p>
      <div className="space-y-1">
        {PUMP_PRICE_STACK_LAYERS.map((layer) => (
          <div key={layer.key} className="flex justify-between gap-4 text-xs">
            <span className="text-muted-foreground">{layer.name}</span>
            <span className="tabular-nums text-foreground">
              {row[layer.key].toLocaleString("nb-NO", {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}{" "}
              kr
            </span>
          </div>
        ))}
      </div>
      {row.price > 0 ? (
        <p className="mt-2 border-t border-border pt-2 text-xs text-muted-foreground tabular-nums">
          Råvare på børs:{" "}
          {row.price.toLocaleString("nb-NO", {
            maximumFractionDigits: 0,
          })}{" "}
          USD/MT
        </p>
      ) : null}
    </div>
  );
};

export const FuturesForecast = function FuturesForecast({
  contracts,
  exchangeRate,
  regionId,
}: FuturesForecastProps) {
  const region = getRegionPriceProfile(regionId);
  const stackedData = useMemo(
    () =>
      toStackedFutures(
        contracts,
        exchangeRate,
        regionId,
        DIESEL_LITERS_PER_METRIC_TON
      ),
    [contracts, exchangeRate, regionId]
  );
  const { yTicks, yDomain } = useMemo(
    () => yScaleFromTotals(stackedData.map((d) => d.total)),
    [stackedData]
  );
  const xCategories = useMemo(
    () => stackedData.map((r) => r.contract_code),
    [stackedData]
  );

  const [firstRow] = stackedData;
  const lastRow = stackedData.at(-1);
  const firstTotal = firstRow?.total ?? 0;
  const lastTotal = lastRow?.total ?? 0;
  const priceDiff = lastTotal - firstTotal;
  const priceDiffPercent =
    firstTotal > 0 ? ((priceDiff / firstTotal) * 100).toFixed(1) : "0.0";

  let priceDiffClass = "text-muted-foreground";
  if (priceDiff < 0) {
    priceDiffClass = "text-emerald-600";
  } else if (priceDiff > 0) {
    priceDiffClass = "text-amber-600";
  }

  const tickLabel = useCallback(
    (code: string) =>
      stackedData.find((r) => r.contract_code === code)?.contract_month ?? code,
    [stackedData]
  );

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="mb-2 flex items-center gap-2">
            <h3 className="text-xl font-bold text-foreground">
              Pris de neste månedene
            </h3>
            <Hint label="Hva er dette?">
              <p>
                Et grovt pumpeprisanslag per måned, basert på hva markedet
                legger til grunn for diesellevering den måneden. Det er ikke det
                du betaler på en bestemt dag på stasjonen, og det er ikke en
                spådom om fremtidig pumpepris. Beregningen bruker dagens
                valutakurs, nasjonale avgifter per leveringsmåned (forenklet: 1.
                i måneden), og en modellert andel for distribusjon i{" "}
                {region.label.toLowerCase()}.
              </p>
            </Hint>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tallene bygger på månedlige ICE-kontrakter og speiler grovt hva
            markedet priser inn for diesellevering den måneden — nivået det
            faktisk handles til. Ment som oversikt, ikke eksakte kjøpspriser på
            stasjon.
          </p>
        </div>
        {firstRow && lastRow && stackedData.length >= 2 ? (
          <p className={`text-sm font-medium tabular-nums ${priceDiffClass}`}>
            {firstRow.contract_month} → {lastRow.contract_month}:{" "}
            {priceDiff > 0 ? "+" : ""}
            {priceDiff.toFixed(2)} kr/L ({priceDiff > 0 ? "+" : ""}
            {priceDiffPercent}%)
          </p>
        ) : null}
      </div>

      <p className="mb-3 text-xs text-muted-foreground">
        Grafen viser de samme prisdelene som «Prissammensetting» (fra bunnen:{" "}
        {LAYER_LEGEND}).
      </p>

      <div className="h-[220px] sm:h-[280px] md:h-[340px] w-full">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ height: 280, width: 900 }}
        >
          <AreaChart
            data={stackedData}
            margin={{ bottom: 0, left: 0, right: 8, top: 8 }}
          >
            <XAxis
              dataKey="contract_code"
              type="category"
              ticks={xCategories}
              tickFormatter={tickLabel}
              tick={{ fill: "oklch(0.50 0.02 250)", fontSize: 11 }}
              axisLine={{ stroke: "oklch(0.90 0.01 250)" }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              tickFormatter={formatYAxisKr}
              tick={{ fill: "oklch(0.50 0.02 250)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={yDomain}
              ticks={yTicks}
              width={56}
            />
            <Tooltip content={FuturesChartTooltip} />
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
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[280px] text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/40 text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Måned
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-right font-medium text-muted-foreground">
                <span className="inline-flex w-full items-center justify-end gap-1.5">
                  Lav
                  <Hint label="Lav — siste handelsdag">
                    {sessionDayRangeHintBody()}
                  </Hint>
                </span>
              </th>
              <th className="hidden md:table-cell px-4 py-3 text-right font-medium text-muted-foreground">
                <span className="inline-flex w-full items-center justify-end gap-1.5">
                  Høy
                  <Hint label="Høy — siste handelsdag">
                    {sessionDayRangeHintBody()}
                  </Hint>
                </span>
              </th>
              <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                Estimert pumpepris
              </th>
            </tr>
          </thead>
          <tbody>
            {stackedData.map((row) => (
              <tr
                key={row.contract_code}
                className="border-b border-border last:border-b-0"
              >
                <td className="px-4 py-3 text-foreground">
                  {row.contract_month}
                </td>
                <td className="hidden md:table-cell px-4 py-3 text-right tabular-nums text-foreground">
                  {formatKrPerLiter(row.session_pump_low)}
                </td>
                <td className="hidden md:table-cell px-4 py-3 text-right tabular-nums text-foreground">
                  {formatKrPerLiter(row.session_pump_high)}
                </td>
                <td className="px-4 py-3 text-right text-base font-semibold tabular-nums text-foreground">
                  {formatKrPerLiter(row.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Avgifter etter leveringsmåned (dato 1. i måneden) · Valuta{" "}
        {exchangeRate.toFixed(4)} USD/NOK · ICE lavsvovel gasoil
      </p>
      <p className="mt-2 text-xs text-muted-foreground">
        Fra mai 2026 er CO₂-kuttet for autodiesel lagt inn etter Stortingets
        vedtak. Regjeringen skriver samtidig at denne delen fortsatt avventer
        avklaringer, så anslagene kan bli endret senere.
      </p>
    </div>
  );
};
