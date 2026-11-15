"use client";

import { Info } from "lucide-react";
import type { ReactNode } from "react";
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
import { isoDateToUtcNoonMs } from "@/lib/chart-time-axis";
import { DIESEL_LITERS_PER_METRIC_TON } from "@/lib/diesel-prices-payload";
import {
  forecastPumpPriceComponents,
  PROPOSED_2027_PUMP_PRICE_RATES,
  PUMP_PRICE_STACK_LAYERS,
  PUMP_PRICE_STACK_LAYERS_TOOLTIP,
  usesProposedPumpPriceRates,
} from "@/lib/pump-price-model";
import type { PumpPriceLayerKey } from "@/lib/pump-price-model";
import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

interface Contract {
  contract_code: string;
  quote_date: string;
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
  exchangeDate: string | null;
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
  quote_date: string;
  contract_month: string;
  timeMs: number;
  price: number;
  price_nok_liter: number;
  session_pump_low: number;
  session_pump_high: number;
  usesProposedRates: boolean;
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
    const parts = forecastPumpPriceComponents(
      price_nok_liter,
      regionId,
      c.duty_at_utc_ymd
    );
    const rawLowNokLiter =
      Math.round(((c.low * exchangeRate) / litersPerTon) * 100) / 100;
    const rawHighNokLiter =
      Math.round(((c.high * exchangeRate) / litersPerTon) * 100) / 100;
    const partsLow = forecastPumpPriceComponents(
      rawLowNokLiter,
      regionId,
      c.duty_at_utc_ymd
    );
    const partsHigh = forecastPumpPriceComponents(
      rawHighNokLiter,
      regionId,
      c.duty_at_utc_ymd
    );
    const session_pump_low = Math.min(partsLow.total, partsHigh.total);
    const session_pump_high = Math.max(partsLow.total, partsHigh.total);
    return {
      co2: parts.co2,
      contract_code: c.contract_code,
      quote_date: c.quote_date,
      timeMs: isoDateToUtcNoonMs(c.duty_at_utc_ymd),
      contract_month: c.contract_month,
      distribution: parts.distribution,
      mva: parts.mva,
      price: c.last_price,
      price_nok_liter,
      raw: parts.raw,
      session_pump_high,
      session_pump_low,
      total: parts.total,
      usesProposedRates: usesProposedPumpPriceRates(c.duty_at_utc_ymd),
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

const Hint = ({ label, children }: { label: string; children: ReactNode }) => (
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

const LAYER_LEGEND = PUMP_PRICE_STACK_LAYERS.map((l) => l.name).join(" → ");

const formatYAxisKr = function formatYAxisKr(value: number): string {
  return `${value} kr`;
};

interface FuturesChartTooltipProps {
  active?: boolean;
  payload?: readonly { payload?: unknown }[];
}

const FuturesChartTooltip = ({ active, payload }: FuturesChartTooltipProps) => {
  if (!(active && payload?.length)) {
    return null;
  }
  const row = payload[0]?.payload as StackedFuturesRow;
  const totalTaxes = row.veibruks + row.co2 + row.mva;
  const taxSharePercent = row.total > 0 ? (totalTaxes / row.total) * 100 : null;
  const showFooter = taxSharePercent !== null || row.price > 0;
  return (
    <div className="min-w-[200px] rounded-lg border border-border bg-card p-3 shadow-lg">
      <p className="mb-2 text-sm font-medium text-foreground">
        {row.contract_month}
      </p>
      <p className="mb-2 text-xs text-muted-foreground">
        Børsdag {row.quote_date}
      </p>
      <p className="mb-2 text-sm font-semibold tabular-nums text-foreground">
        {formatKrPerLiter(row.total)}
      </p>
      {row.usesProposedRates ? (
        <p className="mb-2 max-w-60 text-xs text-muted-foreground">
          Med foreslåtte avgifter for 2027. Ikke vedtatt.
        </p>
      ) : null}
      <div className="space-y-1">
        {PUMP_PRICE_STACK_LAYERS_TOOLTIP.map((layer) => (
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
      {showFooter ? (
        <div className="mt-2 space-y-1.5 border-t border-border pt-2">
          {taxSharePercent === null ? null : (
            <div className="flex justify-between gap-4 text-xs text-muted-foreground">
              <span>Andel avgifter inkl. MVA</span>
              <span className="font-semibold tabular-nums text-foreground">
                {taxSharePercent.toFixed(0)}%
              </span>
            </div>
          )}
          {row.price > 0 ? (
            <p className="text-xs text-muted-foreground tabular-nums">
              Råvare på børs:{" "}
              {row.price.toLocaleString("nb-NO", {
                maximumFractionDigits: 0,
              })}{" "}
              USD/MT
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

const tickLabel = (timeMs: number) =>
  new Date(timeMs).toLocaleDateString("nb-NO", {
    month: "short",
    year: "2-digit",
    timeZone: "UTC",
  });

export const FuturesForecast = ({
  contracts,
  exchangeRate,
  exchangeDate,
  regionId,
}: FuturesForecastProps) => {
  const region = getRegionPriceProfile(regionId);
  const stackedData = toStackedFutures(
    contracts,
    exchangeRate,
    regionId,
    DIESEL_LITERS_PER_METRIC_TON
  );
  const { yTicks, yDomain } = yScaleFromTotals(stackedData.map((d) => d.total));
  const monthTicks = stackedData.map((r) => r.timeMs);

  const [firstRow] = stackedData;
  const lastRow = stackedData.at(-1);
  const hasProposedRates = stackedData.some((row) => row.usesProposedRates);
  const firstTotal = firstRow?.total ?? 0;
  const lastTotal = lastRow?.total ?? 0;
  const priceDiff = lastTotal - firstTotal;
  const priceDiffPercent = (
    firstTotal > 0 ? (priceDiff / firstTotal) * 100 : 0
  ).toLocaleString("nb-NO", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

  let priceDiffClass = "text-muted-foreground";
  if (priceDiff < 0) {
    priceDiffClass = "text-emerald-600";
  } else if (priceDiff > 0) {
    priceDiffClass = "text-amber-600";
  }

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
                spådom om fremtidig pumpepris. Beregningen bruker valutakursen
                fra Norges Bank, nasjonale avgifter per leveringsmåned
                (forenklet: 1. i måneden), og en modellert andel for
                distribusjon i {region.label.toLowerCase()}.
              </p>
            </Hint>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Tallene bygger på månedlige ICE-kontrakter og speiler grovt hva
            markedet priser inn for diesellevering den måneden — nivået det
            faktisk handles til. Ment som oversikt, ikke eksakte kjøpspriser på
            stasjon. Beregningen bruker den oppgitte valutakursen og avgiftene
            for leveringsmåneden, med 1. i måneden som avgiftsdato.
          </p>
          {hasProposedRates ? (
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">
                Foreløpige avgifter fra januar 2027:
              </span>{" "}
              Anslagene bruker regjeringens forslag om CO₂-avgift på 5,13 kr/l
              og veibruksavgift på 1,84 kr/l, begge uten mva. Mva. er 25 %.
              Forslaget er ikke vedtatt og kan bli endret.{" "}
              <a
                href={PROPOSED_2027_PUMP_PRICE_RATES.sourceUrl}
                className="underline underline-offset-4 hover:text-foreground"
              >
                Se avgiftsforslaget
              </a>
              .
            </p>
          ) : null}
        </div>
        {firstRow && lastRow && stackedData.length >= 2 ? (
          <p className={`text-sm font-medium tabular-nums ${priceDiffClass}`}>
            {firstRow.contract_month} → {lastRow.contract_month}:{" "}
            {priceDiff > 0 ? "+" : ""}
            {priceDiff.toLocaleString("nb-NO", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            kr/L ({priceDiff > 0 ? "+" : ""}
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
              dataKey="timeMs"
              type="number"
              scale="time"
              domain={["dataMin", "dataMax"]}
              ticks={monthTicks}
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
                  <time
                    dateTime={row.quote_date}
                    className="mt-1 block text-xs text-muted-foreground"
                  >
                    Børsdag {row.quote_date}
                  </time>
                  {row.usesProposedRates ? (
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Foreslåtte avgifter
                    </span>
                  ) : null}
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
        {exchangeRate.toLocaleString("nb-NO", {
          minimumFractionDigits: 4,
          maximumFractionDigits: 4,
        })}{" "}
        USD/NOK ({exchangeDate ?? "ukjent dato"}) · ICE lavsvovel gasoil
      </p>
      {hasProposedRates ? (
        <p className="mt-2 text-xs text-muted-foreground">
          Modellen bruker satsene for fossil diesel. Innblanding av biodrivstoff
          kan gi andre avgifter. For måneder etter 2027 videreføres de
          foreslåtte 2027-satsene som en forutsetning.
        </p>
      ) : null}
    </div>
  );
};
