export interface FallbackContract {
  contract_code: string
  contract_month: string
  last_price: number
  change: number
  open: number
  high: number
  low: number
  previous: number
  volume: number
}

export interface FallbackHistoricalRow {
  date: string
  price: number
}

const REAL_CONTRACTS: FallbackContract[] = [
  { contract_code: "LFJ26", contract_month: "Apr 2026", last_price: 1282.0, change: -5.75, open: 1238.0, high: 1296.75, low: 1238.0, previous: 1287.75, volume: 3574 },
  { contract_code: "LFK26", contract_month: "Mai 2026", last_price: 1121.25, change: -9.25, open: 1095.0, high: 1134.5, low: 1090.0, previous: 1130.5, volume: 5727 },
  { contract_code: "LFM26", contract_month: "Jun 2026", last_price: 997.5, change: -4.75, open: 971.5, high: 1005.5, low: 968.0, previous: 1002.25, volume: 4174 },
  { contract_code: "LFN26", contract_month: "Jul 2026", last_price: 941.25, change: -0.5, open: 916.0, high: 947.5, low: 911.75, previous: 941.75, volume: 2344 },
  { contract_code: "LFQ26", contract_month: "Aug 2026", last_price: 911.5, change: 1.25, open: 889.75, high: 917.5, low: 888.0, previous: 910.25, volume: 1255 },
  { contract_code: "LFU26", contract_month: "Sep 2026", last_price: 891.75, change: 2.5, open: 870.75, high: 898.0, low: 870.75, previous: 889.25, volume: 2073 },
  { contract_code: "LFV26", contract_month: "Okt 2026", last_price: 879.0, change: 4.5, open: 862.5, high: 883.5, low: 862.5, previous: 874.5, volume: 605 },
  { contract_code: "LFX26", contract_month: "Nov 2026", last_price: 855.75, change: 3.5, open: 841.25, high: 861.5, low: 841.25, previous: 852.25, volume: 598 },
  { contract_code: "LFZ26", contract_month: "Des 2026", last_price: 833.5, change: 4.0, open: 817.5, high: 840.0, low: 816.25, previous: 829.5, volume: 2020 },
  { contract_code: "LFF27", contract_month: "Jan 2027", last_price: 822.25, change: 4.5, open: 810.5, high: 826.25, low: 810.5, previous: 817.75, volume: 255 },
  { contract_code: "LFG27", contract_month: "Feb 2027", last_price: 813.0, change: 4.75, open: 802.0, high: 817.75, low: 802.0, previous: 808.25, volume: 123 },
  { contract_code: "LFH27", contract_month: "Mar 2027", last_price: 803.25, change: 5.5, open: 798.25, high: 807.5, low: 798.0, previous: 797.75, volume: 285 },
]

function generateHistoricalData(days: number, currentPrice: number): FallbackHistoricalRow[] {
  const data: FallbackHistoricalRow[] = []
  const today = new Date()
  const startPrice = currentPrice * 0.85
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    const progress = (days - i) / days
    const trendPrice = startPrice + (currentPrice - startPrice) * progress
    const dailyVolatility = (Math.random() - 0.5) * currentPrice * 0.03
    const price = trendPrice + dailyVolatility
    data.push({
      date: date.toISOString().split("T")[0],
      price: Math.round(price * 100) / 100,
    })
  }
  if (data.length > 0) {
    data[data.length - 1].price = currentPrice
  }
  return data
}

export function buildFallbackDieselPricesPayload() {
  const contracts = REAL_CONTRACTS
  const currentPrice = contracts[0].last_price
  const historical = generateHistoricalData(90, currentPrice)
  const usdToNok = 11
  const litersPerTon = 1176
  const rawPricePerLiter = (currentPrice * usdToNok) / litersPerTon
  const changePercent = (contracts[0].change / contracts[0].previous) * 100

  return {
    updated_at: new Date().toISOString(),
    current: {
      price_usd_mt: currentPrice,
      price_nok_liter: Math.round(rawPricePerLiter * 100) / 100,
      change: contracts[0].change,
      change_percent: Math.round(changePercent * 100) / 100,
    },
    contracts: contracts.map((c) => ({
      contract_code: c.contract_code,
      contract_month: c.contract_month,
      last_price: c.last_price,
      change: c.change,
      change_percent: Math.round((c.change / c.previous) * 100 * 100) / 100,
      open: c.open,
      high: c.high,
      low: c.low,
      previous: c.previous,
      volume: c.volume,
    })),
    historical: historical.map((h) => ({
      ...h,
      price_nok_liter: Math.round(((h.price * usdToNok) / litersPerTon) * 100) / 100,
    })),
    exchange_rate: {
      usd_nok: usdToNok,
      source: "Norges Bank (estimat)",
    },
    data_source: "Statisk eksempeldata (fallback)",
  }
}
