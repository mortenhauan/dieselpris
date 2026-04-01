import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

export interface PumpPriceRates {
  veibruks: number;
  co2: number;
  mvaRate: number;
  defaultDistribution: number;
}

export interface ComparisonDieselRates {
  co2: number;
  mvaRate: number;
  veibruks: number;
}

type ScheduledPumpPriceRates = PumpPriceRates & {
  effectiveFrom: string;
};

type ScheduledComparisonDieselRates = ComparisonDieselRates & {
  effectiveFrom: string;
};

/**
 * Avgiftene følger datoen i historikken.
 * Kilder:
 * - Regjeringen: Avgiftssatser 2026 (med 2025/2026-tabell)
 * - Skatteetaten: Veibruksavgift på drivstoff / Merverdiavgift
 * - Stortinget, vedtak i sak p=107811
 * - Regjeringen, oppfølging 30.03.2026: veibruks 0 fra 1. april, øvrige CO2-endringer avventer avklaringer
 *
 * Distribusjon er fortsatt en modellert margin og ikke en offentlig avgiftssats.
 * Appen modellerer likevel Stortingets vedtakte CO2-kutt for autodiesel fra
 * 1. mai 2026, og merker dette i UI som vedtatt men ikke endelig avklart.
 */
export const PUMP_PRICE_RATE_SCHEDULE: readonly ScheduledPumpPriceRates[] = [
  {
    co2: 3.79,
    defaultDistribution: 3.5,
    effectiveFrom: "2025-01-01",
    mvaRate: 0.25,
    veibruks: 2.69,
  },
  {
    co2: 4.42,
    defaultDistribution: 3.5,
    effectiveFrom: "2026-01-01",
    mvaRate: 0.25,
    veibruks: 2.28,
  },
  {
    co2: 4.42,
    defaultDistribution: 3.5,
    effectiveFrom: "2026-04-01",
    mvaRate: 0.25,
    veibruks: 0,
  },
  {
    co2: 3.09,
    defaultDistribution: 3.5,
    effectiveFrom: "2026-05-01",
    mvaRate: 0.25,
    veibruks: 0,
  },
  {
    co2: 4.42,
    defaultDistribution: 3.5,
    effectiveFrom: "2026-09-01",
    mvaRate: 0.25,
    veibruks: 2.28,
  },
] as const;

export const ANLEGGSDIESEL_RATE_SCHEDULE: readonly ScheduledComparisonDieselRates[] =
  [
    {
      co2: 3.79,
      effectiveFrom: "2025-01-01",
      mvaRate: 0.25,
      veibruks: 0,
    },
    {
      co2: 4.42,
      effectiveFrom: "2026-01-01",
      mvaRate: 0.25,
      veibruks: 0,
    },
    {
      co2: 1.92,
      effectiveFrom: "2026-05-01",
      mvaRate: 0.25,
      veibruks: 0,
    },
    {
      co2: 4.42,
      effectiveFrom: "2026-09-01",
      mvaRate: 0.25,
      veibruks: 0,
    },
  ] as const;

const [FIRST_PUMP_PRICE_RATES] = PUMP_PRICE_RATE_SCHEDULE;
const [FIRST_ANLEGGSDIESEL_RATES] = ANLEGGSDIESEL_RATE_SCHEDULE;

const normalizeRateDate = function normalizeRateDate(
  atDate?: string | Date
): string | null {
  if (!atDate) {
    return null;
  }
  if (typeof atDate === "string") {
    return atDate.slice(0, 10);
  }
  return atDate.toISOString().slice(0, 10);
};

export const getPumpPriceRates = function getPumpPriceRates(
  atDate?: string | Date
): PumpPriceRates {
  const targetDate = normalizeRateDate(atDate);
  if (!targetDate) {
    return PUMP_PRICE_RATE_SCHEDULE.at(-1) ?? FIRST_PUMP_PRICE_RATES;
  }

  let match = FIRST_PUMP_PRICE_RATES;
  for (const period of PUMP_PRICE_RATE_SCHEDULE) {
    if (period.effectiveFrom <= targetDate) {
      match = period;
    }
  }
  return match;
};

export const getAnleggsdieselRates = function getAnleggsdieselRates(
  atDate?: string | Date
): ComparisonDieselRates {
  const targetDate = normalizeRateDate(atDate);
  if (!targetDate) {
    return ANLEGGSDIESEL_RATE_SCHEDULE.at(-1) ?? FIRST_ANLEGGSDIESEL_RATES;
  }

  let match = FIRST_ANLEGGSDIESEL_RATES;
  for (const period of ANLEGGSDIESEL_RATE_SCHEDULE) {
    if (period.effectiveFrom <= targetDate) {
      match = period;
    }
  }
  return match;
};

export const VEIBRUKSAVGIFT = getPumpPriceRates().veibruks;
export const CO2_AVGIFT = getPumpPriceRates().co2;
export const MVA_RATE = getPumpPriceRates().mvaRate;
export const DISTRIBUTION_MARGIN = getPumpPriceRates().defaultDistribution;

export type PumpPriceLayerKey =
  | "raw"
  | "distribution"
  | "veibruks"
  | "co2"
  | "mva";

export type PumpPriceComponents = Record<PumpPriceLayerKey, number> & {
  total: number;
};

/** Stablet rekkefølge (bunn → topp). Samme farger som paien. */
export const PUMP_PRICE_STACK_LAYERS: readonly {
  key: PumpPriceLayerKey;
  name: string;
  color: string;
}[] = [
  { color: "#4a5568", key: "distribution", name: "Modellert distribusjon" },
  { color: "#f59e0b", key: "co2", name: "CO2-avgift" },
  { color: "#22c55e", key: "veibruks", name: "Veibruksavgift" },
  { color: "#1a1a2e", key: "raw", name: "Råvarepris" },
  { color: "#ef4444", key: "mva", name: "MVA (25%)" },
];

/** Hover/tooltip: øverst på stakken først i listen (som visuelt ovenfra på grafen). */
export const PUMP_PRICE_STACK_LAYERS_TOOLTIP = [
  ...PUMP_PRICE_STACK_LAYERS,
].toReversed();

export const pumpPriceComponents = function pumpPriceComponents(
  rawNokPerLiter: number,
  regionId?: RegionId,
  atDate?: string | Date
): PumpPriceComponents {
  const rates = getPumpPriceRates(atDate);
  const distribution = regionId
    ? getRegionPriceProfile(regionId).distributionNokPerLiter
    : rates.defaultDistribution;
  const { veibruks } = rates;
  const { co2 } = rates;
  const priceBeforeMva = rawNokPerLiter + distribution + veibruks + co2;
  const mva = priceBeforeMva * rates.mvaRate;
  return {
    co2,
    distribution,
    mva,
    raw: rawNokPerLiter,
    total: priceBeforeMva + mva,
    veibruks,
  };
};

/** Råvare (NOK/L) + veibruks + CO₂ + MVA — samme MVA-grunnlag som i `pumpPriceComponents`, men uten distribusjon/margin. */
export const rawPlusPublicDutiesNokPerLiter =
  function rawPlusPublicDutiesNokPerLiter(
    rawNokPerLiter: number,
    atDate?: string | Date
  ): number {
    const rates = getPumpPriceRates(atDate);
    const beforeMva = rawNokPerLiter + rates.veibruks + rates.co2;
    const mva = beforeMva * rates.mvaRate;
    return beforeMva + mva;
  };

export const estimateAnleggsdieselPriceNokPerLiter =
  function estimateAnleggsdieselPriceNokPerLiter(
    rawNokPerLiter: number,
    regionId?: RegionId,
    atDate?: string | Date
  ): number {
    const pumpRates = getPumpPriceRates(atDate);
    const comparisonRates = getAnleggsdieselRates(atDate);
    const distribution = regionId
      ? getRegionPriceProfile(regionId).distributionNokPerLiter
      : pumpRates.defaultDistribution;
    const beforeMva =
      rawNokPerLiter +
      distribution +
      comparisonRates.veibruks +
      comparisonRates.co2;
    const mva = beforeMva * comparisonRates.mvaRate;
    return beforeMva + mva;
  };
