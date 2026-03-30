"use client";

import { Info } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DIESEL_LITERS_PER_METRIC_TON } from "@/lib/diesel-prices-payload";
import {
  estimateAnleggsdieselPriceNokPerLiter,
  getAnleggsdieselRates,
  PUMP_PRICE_STACK_LAYERS,
  pumpPriceComponents,
} from "@/lib/pump-price-model";
import type { PumpPriceLayerKey } from "@/lib/pump-price-model";
import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

const breakdownTooltipClass =
  "max-w-[min(18rem,calc(100vw-2rem))] text-xs leading-relaxed px-3 py-2.5 font-normal tracking-normal";

const BREAKDOWN_HINTS: Record<PumpPriceLayerKey, string> = {
  co2: "En miljøavgift på utslippene når diesel brukes. Den skal gjøre det dyrere å forurense.",
  distribution:
    "Kostnaden for å få dieselen fram til stasjonen og selge den videre. Det dekker blant annet lager, transport og drift.",
  mva: "25 % merverdiavgift på hele beløpet. Den legges oppå både drivstoffet og de andre kostnadene.",
  raw: `Prisen på selve dieselen før avgifter. Råvarekostnaden er omregnet fra USD per tonn med ca. ${DIESEL_LITERS_PER_METRIC_TON} liter per metrisk tonn (fast antagelse) og valutakurs — litt varierende i virkeligheten.`,
  veibruks:
    "En statlig avgift på drivstoff til veibruk. Den skal bidra til å dekke kostnader veitrafikken påfører samfunnet.",
};

interface TaxBreakdownProps {
  dutyReferenceDate: string;
  rawPrice: number;
  regionId: RegionId;
}

const BreakdownHint = function BreakdownHint({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <Tooltip>
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
        className={breakdownTooltipClass}
      >
        <p>{description}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export const TaxBreakdown = function TaxBreakdown({
  dutyReferenceDate,
  rawPrice,
  regionId,
}: TaxBreakdownProps) {
  const region = getRegionPriceProfile(regionId);
  const c = pumpPriceComponents(rawPrice, regionId, dutyReferenceDate);
  const anleggsdieselRates = getAnleggsdieselRates(dutyReferenceDate);
  const anleggsdieselPrice = estimateAnleggsdieselPriceNokPerLiter(
    rawPrice,
    regionId,
    dutyReferenceDate
  );
  const components = PUMP_PRICE_STACK_LAYERS.map((layer) => ({
    color: layer.color,
    description: BREAKDOWN_HINTS[layer.key],
    key: layer.key,
    name: layer.name,
    value: c[layer.key],
  }));

  const totalPrice = c.total;
  const totalTaxes = c.veibruks + c.co2 + c.mva;
  const taxPercent = (totalTaxes / totalPrice) * 100;

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          Prissammensetting
        </h3>
        <p className="text-sm text-muted-foreground">
          Estimert pumpepris for {region.label.toLowerCase()}
        </p>
      </div>

      <div className="relative h-48 mb-6">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ height: 192, width: 400 }}
        >
          <PieChart>
            <Pie
              data={components}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {components.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground tabular-nums">
              {totalPrice.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">kr/liter</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {components.map((component) => (
          <div
            key={component.key}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: component.color }}
              />
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-muted-foreground">
                  {component.name}
                </span>
                <BreakdownHint
                  label={component.name}
                  description={component.description}
                />
              </div>
            </div>
            <span className="text-sm font-medium text-foreground tabular-nums">
              {component.value.toFixed(2)} kr
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Andel avgifter inkl. MVA
          </span>
          <span className="text-lg font-bold text-foreground">
            {taxPercent.toFixed(0)}%
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {totalTaxes.toFixed(2)} kr av prisen går til staten (veibruks, CO₂ og
          MVA i modellen).
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Enkelte andre satser er ikke med. Svovelavgift gjelder i
          utgangspunktet bare mineralolje med over 0,05 % svovel — ikke typisk
          veidiesel.
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Til sammenligning: Med samme råvarepris og modellert distribusjon
          ville anleggsdiesel ligget rundt{" "}
          <span className="font-medium text-foreground tabular-nums">
            {anleggsdieselPrice.toFixed(2)} kr/l
          </span>
          . Dette følger satsene for samme dato som kortet over, med
          veibruksavgift {anleggsdieselRates.veibruks.toFixed(2)} kr/l og CO2{" "}
          {anleggsdieselRates.co2.toFixed(2)} kr/l.
        </p>
      </div>
    </div>
  );
};
