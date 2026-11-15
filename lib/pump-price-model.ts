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

/** Regjeringens forslag, kun til prognosen. Ikke vedtatte satser. */
export const PROPOSED_2027_PUMP_PRICE_RATES = {
  co2: 5.13,
  effectiveFrom: "2027-01-01",
  mvaRate: 0.25,
  sourceUrl:
    "https://www.regjeringen.no/no/tema/okonomi-og-budsjett/skatter-og-avgifter/skatte-og-avgiftssatser/avgiftssatser-2027/id3173439/",
  veibruks: 1.84,
} as const;

/**
 * Avgiftene følger datoen i historikken.
 * Kilder:
 * - Regjeringen: Avgiftssatser 2026 (med 2025/2026-tabell)
 * - Skatteetaten: Veibruksavgift på drivstoff / Merverdiavgift
 * - Stortinget, vedtak i sak p=107811
 * - Skatteetaten: midlertidige satser fra april/mai til 1. september 2026.
 *
 * Distribusjon er fortsatt en modellert margin og ikke en offentlig avgiftssats.
 * CO₂-kuttet for autodiesel gjaldt 1. mai–31. august 2026.
 */
export const PUMP_PRICE_RATE_SCHEDULE: readonly ScheduledPumpPriceRates[] = [
  {
    co2: 3.17,
    defaultDistribution: 3.5,
    effectiveFrom: "2024-01-01",
    mvaRate: 0.25,
    veibruks: 2.71,
  },
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

/**
 * Fiske i fjerne farvann: redusert sats fra 2025 (0,93), hevet til 1,11 i 2026.
 * Vedtak 591: 0 kr/l fra 1. april til 1. september 2026 (iverksatt).
 */
export const FISKE_FJERNE_RATE_SCHEDULE: readonly ScheduledComparisonDieselRates[] =
  [
    { co2: 0, effectiveFrom: "2024-01-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 0.93, effectiveFrom: "2025-01-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 1.11, effectiveFrom: "2026-01-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 0, effectiveFrom: "2026-04-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 1.11, effectiveFrom: "2026-09-01", mvaRate: 0.25, veibruks: 0 },
  ] as const;

/**
 * Fiske i nære OG fjerne farvann: ny kategori fra 2026 (2,76 kr/l).
 * Vedtak 592: 0 kr/l fra 1. april til 1. september 2026 (iverksatt).
 */
export const FISKE_NAERE_OG_FJERNE_RATE_SCHEDULE: readonly ScheduledComparisonDieselRates[] =
  [
    { co2: 3.79, effectiveFrom: "2025-01-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 2.76, effectiveFrom: "2026-01-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 0, effectiveFrom: "2026-04-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 2.76, effectiveFrom: "2026-09-01", mvaRate: 0.25, veibruks: 0 },
  ] as const;

/**
 * Fiske utelukkende i nære farvann: nullsats 1. mai–31. august 2026.
 * Kilde: Skatteetaten, avgift på mineralske produkter.
 */
export const FISKE_KUN_NAERE_RATE_SCHEDULE: readonly ScheduledComparisonDieselRates[] =
  [
    { co2: 3.79, effectiveFrom: "2025-01-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 4.42, effectiveFrom: "2026-01-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 0, effectiveFrom: "2026-05-01", mvaRate: 0.25, veibruks: 0 },
    { co2: 4.42, effectiveFrom: "2026-09-01", mvaRate: 0.25, veibruks: 0 },
  ] as const;

const [FIRST_PUMP_PRICE_RATES] = PUMP_PRICE_RATE_SCHEDULE;
const [FIRST_ANLEGGSDIESEL_RATES] = ANLEGGSDIESEL_RATE_SCHEDULE;
const [FIRST_FISKE_FJERNE_RATES] = FISKE_FJERNE_RATE_SCHEDULE;
const [FIRST_FISKE_NAERE_OG_FJERNE_RATES] = FISKE_NAERE_OG_FJERNE_RATE_SCHEDULE;
const [FIRST_FISKE_KUN_NAERE_RATES] = FISKE_KUN_NAERE_RATE_SCHEDULE;

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

export const usesProposedPumpPriceRates = (atDate: string | Date): boolean =>
  (normalizeRateDate(atDate) ?? "") >=
  PROPOSED_2027_PUMP_PRICE_RATES.effectiveFrom;

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

const resolveComparisonRates = function resolveComparisonRates(
  schedule: readonly ScheduledComparisonDieselRates[],
  fallback: ComparisonDieselRates,
  atDate?: string | Date
): ComparisonDieselRates {
  const targetDate = normalizeRateDate(atDate);
  if (!targetDate) {
    return schedule.at(-1) ?? fallback;
  }
  let match = fallback;
  for (const period of schedule) {
    if (period.effectiveFrom <= targetDate) {
      match = period;
    }
  }
  return match;
};

export const getFiskeFjerneFarvannRates = (atDate?: string | Date) =>
  resolveComparisonRates(
    FISKE_FJERNE_RATE_SCHEDULE,
    FIRST_FISKE_FJERNE_RATES,
    atDate
  );

export const getFiskeNaereOgFjerneFarvannRates = (atDate?: string | Date) =>
  resolveComparisonRates(
    FISKE_NAERE_OG_FJERNE_RATE_SCHEDULE,
    FIRST_FISKE_NAERE_OG_FJERNE_RATES,
    atDate
  );

export const getFiskeKunNaereFarvannRates = (atDate?: string | Date) =>
  resolveComparisonRates(
    FISKE_KUN_NAERE_RATE_SCHEDULE,
    FIRST_FISKE_KUN_NAERE_RATES,
    atDate
  );

const distributionNokPerLiterForEstimate =
  function distributionNokPerLiterForEstimate(
    regionId: RegionId | undefined,
    atDate?: string | Date
  ): number {
    const pumpRates = getPumpPriceRates(atDate);
    return regionId
      ? getRegionPriceProfile(regionId).distributionNokPerLiter
      : pumpRates.defaultDistribution;
  };

const totalNokPerLiterFromRawDistributionAndRates =
  function totalNokPerLiterFromRawDistributionAndRates(
    rawNokPerLiter: number,
    distributionNokPerLiter: number,
    rates: ComparisonDieselRates
  ): number {
    const beforeMva =
      rawNokPerLiter + distributionNokPerLiter + rates.veibruks + rates.co2;
    const mva = beforeMva * rates.mvaRate;
    return beforeMva + mva;
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
  { color: "#f59e0b", key: "co2", name: "CO₂-avgift" },
  { color: "#22c55e", key: "veibruks", name: "Veibruksavgift" },
  { color: "#1a1a2e", key: "raw", name: "Råvarepris" },
  { color: "#ef4444", key: "mva", name: "MVA (25 %)" },
];

/** Hover/tooltip: øverst på stakken først i listen (som visuelt ovenfra på grafen). */
export const PUMP_PRICE_STACK_LAYERS_TOOLTIP = [
  ...PUMP_PRICE_STACK_LAYERS,
].toReversed();

const pumpPriceComponentsWithRates = function pumpPriceComponentsWithRates(
  rawNokPerLiter: number,
  distribution: number,
  rates: PumpPriceRates
): PumpPriceComponents {
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

export const pumpPriceComponents = function pumpPriceComponents(
  rawNokPerLiter: number,
  regionId?: RegionId,
  atDate?: string | Date
): PumpPriceComponents {
  return pumpPriceComponentsWithRates(
    rawNokPerLiter,
    distributionNokPerLiterForEstimate(regionId, atDate),
    getPumpPriceRates(atDate)
  );
};

/** Prognosen bruker foreslåtte 2027-satser fra januar, også videre i tid. */
export const forecastPumpPriceComponents = function forecastPumpPriceComponents(
  rawNokPerLiter: number,
  regionId: RegionId,
  atDate: string | Date
): PumpPriceComponents {
  const rates = getPumpPriceRates(atDate);
  return pumpPriceComponentsWithRates(
    rawNokPerLiter,
    distributionNokPerLiterForEstimate(regionId, atDate),
    usesProposedPumpPriceRates(atDate)
      ? { ...rates, ...PROPOSED_2027_PUMP_PRICE_RATES }
      : rates
  );
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

export const estimateComparisonPriceNokPerLiter =
  function estimateComparisonPriceNokPerLiter(
    rawNokPerLiter: number,
    rates: ComparisonDieselRates,
    regionId?: RegionId,
    atDate?: string | Date
  ): number {
    const distribution = distributionNokPerLiterForEstimate(regionId, atDate);
    return totalNokPerLiterFromRawDistributionAndRates(
      rawNokPerLiter,
      distribution,
      rates
    );
  };

export const estimateAnleggsdieselPriceNokPerLiter =
  function estimateAnleggsdieselPriceNokPerLiter(
    rawNokPerLiter: number,
    regionId?: RegionId,
    atDate?: string | Date
  ): number {
    return estimateComparisonPriceNokPerLiter(
      rawNokPerLiter,
      getAnleggsdieselRates(atDate),
      regionId,
      atDate
    );
  };
