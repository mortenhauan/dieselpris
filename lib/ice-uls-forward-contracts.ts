import { fetchIceDailyBarsFromTradingView } from "@/lib/tradingview-ice-gasoil"

const ICE_MONTH_LETTERS = ["F", "G", "H", "J", "K", "M", "N", "Q", "U", "V", "X", "Z"] as const
const FORWARD_MONTHS = 6
/** TradingView throttles parallel sockets; stay at one session at a time with a small gap. */
const MS_BETWEEN_TV_REQUESTS = 450

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export type IceUlsContractRow = {
  contract_code: string
  contract_month: string
  last_price: number
  change: number
  change_percent: number
  open: number
  high: number
  low: number
  previous: number
  volume: number
}

function addCalendarMonthsUTC(year: number, month0: number, delta: number): { y: number; m: number } {
  const d = new Date(Date.UTC(year, month0 + delta, 1))
  return { y: d.getUTCFullYear(), m: d.getUTCMonth() }
}

function isBusinessDayUtc(dayOfWeek: number): boolean {
  return dayOfWeek !== 0 && dayOfWeek !== 6
}

function subtractBusinessDaysUTC(date: Date, businessDays: number): Date {
  const result = new Date(date)
  let remaining = businessDays

  while (remaining > 0) {
    result.setUTCDate(result.getUTCDate() - 1)
    if (isBusinessDayUtc(result.getUTCDay())) {
      remaining -= 1
    }
  }

  return result
}

function currentForwardStartOffset(now: Date): number {
  const monthCeaseDate = subtractBusinessDaysUTC(
    new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 14, 12)),
    2,
  )

  return now.getTime() > monthCeaseDate.getTime() ? 1 : 0
}

function ulsTvSymbol(year: number, month0: number): string {
  const letter = ICE_MONTH_LETTERS[month0]
  return `ICEEUR:ULS${letter}${year}`
}

function formatContractMonthNb(year: number, month0: number): string {
  return new Date(Date.UTC(year, month0, 1)).toLocaleDateString("nb-NO", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  })
}

function round2(n: number): number {
  return Math.round(n * 100) / 100
}

async function lastCloseForSymbol(symbol: string): Promise<{ last: number; prev: number } | null> {
  try {
    const { bars } = await fetchIceDailyBarsFromTradingView({
      symbol,
      barCount: 8,
      minBars: 2,
      settleMs: 900,
      hardTimeoutMs: 14_000,
      timeoutMinBars: 2,
    })
    const sorted = [...bars].sort((a, b) => a.time - b.time)
    if (sorted.length < 2) return null
    const last = sorted[sorted.length - 1]
    const prev = sorted[sorted.length - 2]
    return { last: last.close, prev: prev.close }
  } catch {
    return null
  }
}

export async function fetchNextSixIceUlsMonthlyContracts(
  now: Date = new Date(),
): Promise<IceUlsContractRow[]> {
  const y0 = now.getUTCFullYear()
  const m0 = now.getUTCMonth()
  const startOffset = currentForwardStartOffset(now)
  const slots = Array.from({ length: FORWARD_MONTHS }, (_, i) => addCalendarMonthsUTC(y0, m0, startOffset + i))

  const settled: Array<IceUlsContractRow | null> = []
  for (let i = 0; i < slots.length; i++) {
    if (i > 0) await delay(MS_BETWEEN_TV_REQUESTS)
    const { y, m } = slots[i]!
    const symbol = ulsTvSymbol(y, m)
    const closes = await lastCloseForSymbol(symbol)
    if (!closes) {
      settled.push(null)
      continue
    }
    const { last, prev } = closes
    const change = last - prev
    const changePercent = prev !== 0 ? round2((change / prev) * 100) : 0
    const code = symbol.replace(/^ICEEUR:/, "")
    settled.push({
      contract_code: code,
      contract_month: formatContractMonthNb(y, m),
      last_price: round2(last),
      change: round2(change),
      change_percent: changePercent,
      open: round2(last),
      high: round2(last),
      low: round2(last),
      previous: round2(prev),
      volume: 0,
    })
  }

  return settled.filter((r): r is IceUlsContractRow => r !== null)
}
