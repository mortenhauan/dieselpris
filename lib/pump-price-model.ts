export type PumpPriceRates = {
  veibruks: number
  co2: number
  mvaRate: number
  distribution: number
}

type ScheduledPumpPriceRates = PumpPriceRates & {
  effectiveFrom: string
}

/**
 * Avgiftene følger datoen i historikken.
 * Kilder:
 * - Regjeringen: Avgiftssatser 2026 (med 2025/2026-tabell)
 * - Skatteetaten: Veibruksavgift på drivstoff / Merverdiavgift
 *
 * Distribusjon er fortsatt en modellert, fast margin og ikke en offentlig avgiftssats.
 */
export const PUMP_PRICE_RATE_SCHEDULE: ReadonlyArray<ScheduledPumpPriceRates> = [
  {
    effectiveFrom: "2025-01-01",
    veibruks: 2.69,
    co2: 3.79,
    mvaRate: 0.25,
    distribution: 3.5,
  },
  {
    effectiveFrom: "2026-01-01",
    veibruks: 2.28,
    co2: 4.42,
    mvaRate: 0.25,
    distribution: 3.5,
  },
] as const

function normalizeRateDate(atDate?: string | Date): string | null {
  if (!atDate) return null
  if (typeof atDate === "string") return atDate.slice(0, 10)
  return atDate.toISOString().slice(0, 10)
}

export function getPumpPriceRates(atDate?: string | Date): PumpPriceRates {
  const targetDate = normalizeRateDate(atDate)
  if (!targetDate) {
    return PUMP_PRICE_RATE_SCHEDULE[PUMP_PRICE_RATE_SCHEDULE.length - 1]
  }

  let match = PUMP_PRICE_RATE_SCHEDULE[0]
  for (const period of PUMP_PRICE_RATE_SCHEDULE) {
    if (period.effectiveFrom <= targetDate) {
      match = period
    }
  }
  return match
}

export const VEIBRUKSAVGIFT = getPumpPriceRates().veibruks
export const CO2_AVGIFT = getPumpPriceRates().co2
export const MVA_RATE = getPumpPriceRates().mvaRate
export const DISTRIBUTION_MARGIN = getPumpPriceRates().distribution

export type PumpPriceLayerKey = "raw" | "distribution" | "veibruks" | "co2" | "mva"

export type PumpPriceComponents = Record<PumpPriceLayerKey, number> & { total: number }

/** Stablet rekkefølge (bunn → topp), samme farger som paien. */
export const PUMP_PRICE_STACK_LAYERS: ReadonlyArray<{
  key: PumpPriceLayerKey
  name: string
  color: string
}> = [
  { key: "raw", name: "Råvarepris", color: "#1a1a2e" },
  { key: "distribution", name: "Distribusjon", color: "#4a5568" },
  { key: "veibruks", name: "Veibruksavgift", color: "#22c55e" },
  { key: "co2", name: "CO2-avgift", color: "#f59e0b" },
  { key: "mva", name: "MVA (25%)", color: "#ef4444" },
]

export function pumpPriceComponents(
  rawNokPerLiter: number,
  atDate?: string | Date,
): PumpPriceComponents {
  const rates = getPumpPriceRates(atDate)
  const distribution = rates.distribution
  const veibruks = rates.veibruks
  const co2 = rates.co2
  const priceBeforeMva = rawNokPerLiter + distribution + veibruks + co2
  const mva = priceBeforeMva * rates.mvaRate
  return {
    raw: rawNokPerLiter,
    distribution,
    veibruks,
    co2,
    mva,
    total: priceBeforeMva + mva,
  }
}
