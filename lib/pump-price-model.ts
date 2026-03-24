/** 2026-modell: faste ledd + MVA av alt før MVA (som i `TaxBreakdown`). */
export const VEIBRUKSAVGIFT = 2.28
export const CO2_AVGIFT = 4.42
export const MVA_RATE = 0.25
export const DISTRIBUTION_MARGIN = 3.5

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

export function pumpPriceComponents(rawNokPerLiter: number): PumpPriceComponents {
  const distribution = DISTRIBUTION_MARGIN
  const veibruks = VEIBRUKSAVGIFT
  const co2 = CO2_AVGIFT
  const priceBeforeMva = rawNokPerLiter + distribution + veibruks + co2
  const mva = priceBeforeMva * MVA_RATE
  return {
    raw: rawNokPerLiter,
    distribution,
    veibruks,
    co2,
    mva,
    total: priceBeforeMva + mva,
  }
}
