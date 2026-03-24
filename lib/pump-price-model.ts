import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

export interface PumpPriceRates {
  veibruks: number;
  co2: number;
  mvaRate: number;
  defaultDistribution: number;
}

type ScheduledPumpPriceRates = PumpPriceRates & {
  effectiveFrom: string;
};

/**
 * Avgiftene følger datoen i historikken.
 * Kilder:
 * - Regjeringen: Avgiftssatser 2026 (med 2025/2026-tabell)
 * - Skatteetaten: Veibruksavgift på drivstoff / Merverdiavgift
 *
 * Distribusjon er fortsatt en modellert margin og ikke en offentlig avgiftssats.
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
] as const;

const [FIRST_PUMP_PRICE_RATES] = PUMP_PRICE_RATE_SCHEDULE;

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

/** Stablet rekkefølge (bunn → topp), samme farger som paien. */
export const PUMP_PRICE_STACK_LAYERS: readonly {
  key: PumpPriceLayerKey;
  name: string;
  color: string;
}[] = [
  { color: "#1a1a2e", key: "raw", name: "Råvarepris" },
  { color: "#4a5568", key: "distribution", name: "Distribusjon" },
  { color: "#22c55e", key: "veibruks", name: "Veibruksavgift" },
  { color: "#f59e0b", key: "co2", name: "CO2-avgift" },
  { color: "#ef4444", key: "mva", name: "MVA (25%)" },
];

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
