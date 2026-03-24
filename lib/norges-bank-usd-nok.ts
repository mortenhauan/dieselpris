import { z } from "zod"

const NB_EXR_URL =
  "https://data.norges-bank.no/api/data/EXR/B.USD.NOK.SP?format=sdmx-json&lastNObservations="

const sdmxZ = z.object({
  data: z.object({
    dataSets: z.array(
      z.object({
        series: z.record(
          z.string(),
          z.object({
            observations: z.record(z.string(), z.array(z.string())),
          }),
        ),
      }),
    ),
    structure: z.object({
      dimensions: z.object({
        observation: z.array(
          z.object({
            values: z.array(z.object({ id: z.string() })),
          }),
        ),
      }),
    }),
  }),
})

export const USD_NOK_FALLBACK = 11

export type NorgesBankUsdNokSeries = {
  byDate: Map<string, number>
  /** YYYY-MM-DD, ascending */
  sortedDatesAsc: string[]
  latestDate: string
  latestRate: number
}

/** Last published NOK per 1 USD on or before `ymd` (YYYY-MM-DD). */
export function usdNokOnOrBefore(
  series: NorgesBankUsdNokSeries | null,
  ymd: string,
  fallback: number,
): number {
  if (!series || series.sortedDatesAsc.length === 0) return fallback
  const { sortedDatesAsc, byDate } = series
  let picked: string | null = null
  for (const d of sortedDatesAsc) {
    if (d <= ymd) picked = d
    else break
  }
  if (picked !== null) {
    const v = byDate.get(picked)
    if (v !== undefined && Number.isFinite(v)) return v
  }
  const first = sortedDatesAsc[0]
  return byDate.get(first) ?? fallback
}

export async function fetchNorgesBankUsdNokSeries(
  lastNObservations = 130,
): Promise<NorgesBankUsdNokSeries | null> {
  const url = `${NB_EXR_URL}${lastNObservations}`
  const res = await fetch(url, { cache: "no-store" })
  if (!res.ok) return null
  const json: unknown = await res.json().catch(() => null)
  const parsed = sdmxZ.safeParse(json)
  if (!parsed.success) return null

  const ds0 = parsed.data.data.dataSets[0]
  const seriesEntries = Object.values(ds0.series)
  if (seriesEntries.length === 0) return null

  const observations = seriesEntries[0].observations
  const timeValues = parsed.data.data.structure.dimensions.observation[0]?.values
  if (!timeValues?.length) return null

  const byDate = new Map<string, number>()
  const sortedDatesAsc: string[] = []

  for (const [idxStr, valArr] of Object.entries(observations)) {
    const idx = Number.parseInt(idxStr, 10)
    if (!Number.isFinite(idx) || idx < 0 || idx >= timeValues.length) continue
    const date = timeValues[idx].id
    const raw = valArr[0]
    const rate = Number.parseFloat(raw)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(rate)) continue
    byDate.set(date, rate)
    sortedDatesAsc.push(date)
  }

  sortedDatesAsc.sort((a, b) => a.localeCompare(b))
  if (sortedDatesAsc.length === 0) return null

  const latestDate = sortedDatesAsc[sortedDatesAsc.length - 1]
  const latestRate = byDate.get(latestDate)
  if (latestRate === undefined || !Number.isFinite(latestRate)) return null

  return { byDate, sortedDatesAsc, latestDate, latestRate }
}
