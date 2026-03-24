import { NextResponse } from "next/server"
import { buildFallbackDieselPricesPayload } from "@/lib/diesel-prices-fallback"
import {
  fetchIceGasoilUls1Daily,
  ICEEUR_ULS1_CONTINUOUS,
  tradingViewBarsToHistorical,
} from "@/lib/tradingview-ice-gasoil"

export const maxDuration = 30

const LITERS_PER_TON = 1176
const USD_NOK_FALLBACK = 11
const HISTORY_DAYS = 90

function sliceLastDailyBars<T extends { time: number }>(bars: T[], max: number): T[] {
  const sorted = [...bars].sort((a, b) => a.time - b.time)
  return sorted.slice(-max)
}

export async function GET() {
  const usdToNok = USD_NOK_FALLBACK

  try {
    const { bars: rawBars, infos } = await fetchIceGasoilUls1Daily({
      symbol: ICEEUR_ULS1_CONTINUOUS,
      barCount: 110,
      minBars: 80,
      settleMs: 1500,
      hardTimeoutMs: 22_000,
    })

    const bars = sliceLastDailyBars(rawBars, HISTORY_DAYS)
    if (bars.length < 2) {
      return NextResponse.json(buildFallbackDieselPricesPayload())
    }

    const sorted = [...bars].sort((a, b) => a.time - b.time)
    const latest = sorted[sorted.length - 1]
    const prev = sorted[sorted.length - 2]
    const currentPrice = latest.close
    const change = currentPrice - prev.close
    const changePercent = prev.close !== 0 ? (change / prev.close) * 100 : 0
    const rawPricePerLiter = (currentPrice * usdToNok) / LITERS_PER_TON

    const label = infos.full_name ?? infos.description ?? ICEEUR_ULS1_CONTINUOUS

    return NextResponse.json({
      updated_at: new Date().toISOString(),
      current: {
        price_usd_mt: Math.round(currentPrice * 100) / 100,
        price_nok_liter: Math.round(rawPricePerLiter * 100) / 100,
        change: Math.round(change * 100) / 100,
        change_percent: Math.round(changePercent * 100) / 100,
      },
      contracts: [],
      historical: tradingViewBarsToHistorical(bars, usdToNok, LITERS_PER_TON),
      exchange_rate: {
        usd_nok: usdToNok,
        source: "Norges Bank (estimat)",
      },
      data_source: `TradingView — ${label} (daglig, sammenhengende kontrakt)`,
    })
  } catch {
    return NextResponse.json(buildFallbackDieselPricesPayload())
  }
}
