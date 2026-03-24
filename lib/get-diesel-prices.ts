import { cacheLife, cacheTag } from "next/cache"
import { buildFallbackDieselPricesPayload } from "@/lib/diesel-prices-fallback"
import {
  fetchNorgesBankUsdNokSeries,
  USD_NOK_FALLBACK,
  usdNokOnOrBefore,
} from "@/lib/norges-bank-usd-nok"
import { fetchNextSixIceUlsMonthlyContracts } from "@/lib/ice-uls-forward-contracts"
import {
  fetchIceGasoilUls1Daily,
  ICEEUR_ULS1_CONTINUOUS,
  tradingViewBarsToHistorical,
} from "@/lib/tradingview-ice-gasoil"

export type DieselPricesPayload = ReturnType<typeof buildFallbackDieselPricesPayload>

const LITERS_PER_TON = 1176
const HISTORY_DAYS = 90
const REVALIDATE_SECONDS = 15 * 60

function sliceLastDailyBars<T extends { time: number }>(bars: T[], max: number): T[] {
  const sorted = [...bars].sort((a, b) => a.time - b.time)
  return sorted.slice(-max)
}

export async function getDieselPricesData(): Promise<DieselPricesPayload> {
  "use cache"
  cacheTag("diesel-prices")
  cacheLife({ revalidate: REVALIDATE_SECONDS })

  const fxSeries = await fetchNorgesBankUsdNokSeries(130)
  const spotUsdNok = fxSeries?.latestRate ?? USD_NOK_FALLBACK
  const exchangeSource = fxSeries
    ? `Norges Bank (USD/NOK, ${fxSeries.latestDate})`
    : `Fast kurs (fallback ${USD_NOK_FALLBACK})`

  const resolveUsdNok = (utcYmd: string) =>
    usdNokOnOrBefore(fxSeries, utcYmd, spotUsdNok)

  try {
    const { bars: rawBars } = await fetchIceGasoilUls1Daily({
      symbol: ICEEUR_ULS1_CONTINUOUS,
      barCount: 110,
      minBars: 80,
      settleMs: 1500,
      hardTimeoutMs: 22_000,
    })

    const bars = sliceLastDailyBars(rawBars, HISTORY_DAYS)
    if (bars.length < 2) {
      return buildFallbackDieselPricesPayload(spotUsdNok, exchangeSource, resolveUsdNok)
    }

    const forwardContracts = await fetchNextSixIceUlsMonthlyContracts()

    const sorted = [...bars].sort((a, b) => a.time - b.time)
    const latest = sorted[sorted.length - 1]
    const prev = sorted[sorted.length - 2]
    const currentPrice = latest.close
    const change = currentPrice - prev.close
    const changePercent = prev.close !== 0 ? (change / prev.close) * 100 : 0
    const latestYmd = new Date(latest.time * 1000).toISOString().slice(0, 10)
    const spotForLatest = resolveUsdNok(latestYmd)
    const rawPricePerLiter = (currentPrice * spotForLatest) / LITERS_PER_TON
    const contracts = forwardContracts.length >= 2 ? forwardContracts : []

    return {
      updated_at: new Date().toISOString(),
      current: {
        price_usd_mt: Math.round(currentPrice * 100) / 100,
        price_nok_liter: Math.round(rawPricePerLiter * 100) / 100,
        change: Math.round(change * 100) / 100,
        change_percent: Math.round(changePercent * 100) / 100,
      },
      contracts,
      historical: tradingViewBarsToHistorical(bars, LITERS_PER_TON, resolveUsdNok),
      exchange_rate: {
        usd_nok: Math.round(spotUsdNok * 10000) / 10000,
        source: exchangeSource,
      },
      data_source:
        "Lavsvovel gasoil (ICE Europa): sammenhengende dagskurve + seks månedlige terminkontrakter",
    }
  } catch {
    return buildFallbackDieselPricesPayload(spotUsdNok, exchangeSource, resolveUsdNok)
  }
}
