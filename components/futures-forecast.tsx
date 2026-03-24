"use client"

import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  PUMP_PRICE_STACK_LAYERS,
  type PumpPriceLayerKey,
  pumpPriceComponents,
} from "@/lib/pump-price-model"
import { getRegionPriceProfile, type RegionId } from "@/lib/regional-price-model"

interface Contract {
  contract_code: string
  contract_month: string
  last_price: number
  change: number
  change_percent: number
}

interface FuturesForecastProps {
  contracts: Contract[]
  exchangeRate: number
  regionId: RegionId
}

const MONTH_MARKER_STROKE = "oklch(0.88 0.012 250)"
const LITERS_PER_MT = 1176
const Y_STEP_KR = 5

type StackedFuturesRow = {
  contract_code: string
  contract_month: string
  price: number
  price_nok_liter: number
} & Record<PumpPriceLayerKey, number> & { total: number }

function impliedUsdNok(priceUsdMt: number, nokPerLiter: number): number | null {
  if (!Number.isFinite(priceUsdMt) || priceUsdMt <= 0) return null
  const v = (nokPerLiter * LITERS_PER_MT) / priceUsdMt
  return Number.isFinite(v) ? v : null
}

function toStackedFutures(
  contracts: Contract[],
  exchangeRate: number,
  regionId: RegionId,
  litersPerTon: number,
): StackedFuturesRow[] {
  return contracts.map((c) => {
    const price_nok_liter = Math.round(((c.last_price * exchangeRate) / litersPerTon) * 100) / 100
    const parts = pumpPriceComponents(price_nok_liter, regionId)
    return {
      contract_code: c.contract_code,
      contract_month: c.contract_month,
      price: c.last_price,
      price_nok_liter,
      raw: parts.raw,
      distribution: parts.distribution,
      veibruks: parts.veibruks,
      co2: parts.co2,
      mva: parts.mva,
      total: parts.total,
    }
  })
}

function yScaleFromTotals(totals: number[]): { yTicks: number[]; yDomain: [number, number] } {
  if (totals.length === 0) {
    return { yTicks: [0, 5, 10, 15, 20, 25, 30], yDomain: [0, 30] }
  }
  const maxP = Math.max(...totals)
  const last = Math.max(Y_STEP_KR, Math.ceil(maxP / Y_STEP_KR) * Y_STEP_KR)
  const yTicks: number[] = []
  for (let v = 0; v <= last; v += Y_STEP_KR) {
    yTicks.push(v)
  }
  return { yTicks, yDomain: [0, last] }
}

export function FuturesForecast({ contracts, exchangeRate, regionId }: FuturesForecastProps) {
  const region = getRegionPriceProfile(regionId)
  const litersPerTon = 1176
  const stackedData = toStackedFutures(contracts, exchangeRate, regionId, litersPerTon)
  const { yTicks, yDomain } = yScaleFromTotals(stackedData.map((d) => d.total))
  const xCategories = stackedData.map((r) => r.contract_code)

  const firstPrice = stackedData[0]?.total ?? 0
  const lastPrice = stackedData[stackedData.length - 1]?.total ?? 0
  const priceDiff = lastPrice - firstPrice
  const priceDiffPercent = firstPrice > 0 ? ((priceDiff / firstPrice) * 100).toFixed(1) : "0.0"

  const formatKr = (value: number) =>
    `${value.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} kr`

  const tickLabel = (code: string) =>
    stackedData.find((r) => r.contract_code === code)?.contract_month ?? code

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-2">Estimert pumpepris fremover</h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          Basert på de neste seks månedlige lavsvovel-gasoil-kontraktene på ICE (samme omregning som 90-dagers
          historikken): råvare i USD/MT, valutakurs {exchangeRate.toFixed(4)} USD/NOK, deretter distribusjon og
          avgifter for {region.label.toLowerCase()}.
        </p>
      </div>

      <div className="flex flex-wrap gap-6 mb-8">
        <div className="bg-secondary/50 rounded-xl px-5 py-4">
          <p className="text-xs text-muted-foreground mb-1">Nærmeste kontrakt</p>
          <p className="text-2xl font-bold text-foreground tabular-nums">{firstPrice.toFixed(2)} kr/L</p>
          <p className="text-xs text-muted-foreground">{stackedData[0]?.contract_month}</p>
        </div>
        <div className="bg-secondary/50 rounded-xl px-5 py-4">
          <p className="text-xs text-muted-foreground mb-1">Siste av 6 måneder</p>
          <p className="text-2xl font-bold text-foreground tabular-nums">{lastPrice.toFixed(2)} kr/L</p>
          <p className="text-xs text-muted-foreground">{stackedData[stackedData.length - 1]?.contract_month}</p>
        </div>
        <div className="bg-secondary/50 rounded-xl px-5 py-4">
          <p className="text-xs text-muted-foreground mb-1">Forventet endring</p>
          <p
            className={`text-2xl font-bold tabular-nums ${priceDiff < 0 ? "text-emerald-600" : "text-amber-600"}`}
          >
            {priceDiff > 0 ? "+" : ""}
            {priceDiff.toFixed(2)} kr
          </p>
          <p className="text-xs text-muted-foreground">{priceDiffPercent}% endring</p>
        </div>
      </div>

      <div className="h-[240px] sm:h-[300px] md:h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stackedData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis
              dataKey="contract_code"
              type="category"
              ticks={xCategories}
              tickFormatter={tickLabel}
              tick={{ fill: "oklch(0.50 0.02 250)", fontSize: 11 }}
              axisLine={{ stroke: "oklch(0.90 0.01 250)" }}
              tickLine={false}
              interval={0}
            />
            <YAxis
              tickFormatter={(value) => `${value} kr`}
              tick={{ fill: "oklch(0.50 0.02 250)", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={yDomain}
              ticks={yTicks}
              width={60}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!(active && payload?.length)) return null
                const row = payload[0]?.payload as StackedFuturesRow
                const fx = impliedUsdNok(row.price, row.price_nok_liter)
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-lg min-w-[200px]">
                    <p className="text-sm text-muted-foreground mb-2">{row.contract_month}</p>
                    <p className="text-xs text-muted-foreground mb-2 font-mono">{row.contract_code}</p>
                    <div className="space-y-1.5">
                      {PUMP_PRICE_STACK_LAYERS.map((layer) => (
                        <div key={layer.key} className="flex items-center justify-between gap-4 text-sm">
                          <span className="flex items-center gap-2 text-muted-foreground">
                            <span
                              className="size-2 shrink-0 rounded-full"
                              style={{ backgroundColor: layer.color }}
                            />
                            {layer.name}
                          </span>
                          <span className="font-medium tabular-nums text-foreground">
                            {formatKr(row[layer.key])}
                          </span>
                        </div>
                      ))}
                      <div className="flex items-center justify-between gap-4 border-t border-border pt-2 mt-2 text-sm font-semibold text-foreground">
                        <span>Sum pumpepris</span>
                        <span className="tabular-nums">{formatKr(row.total)}</span>
                      </div>
                    </div>
                    {row.price > 0 && (
                      <p className="text-xs text-muted-foreground/80 mt-2 tabular-nums">
                        {row.price.toLocaleString("nb-NO", { maximumFractionDigits: 0 })} USD/MT
                      </p>
                    )}
                    {fx !== null && (
                      <p className="text-xs text-muted-foreground/80 tabular-nums">
                        USD/NOK ≈{" "}
                        {fx.toLocaleString("nb-NO", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 4,
                        })}
                      </p>
                    )}
                  </div>
                )
              }}
            />
            {PUMP_PRICE_STACK_LAYERS.map((layer) => (
              <Area
                key={layer.key}
                type="monotone"
                dataKey={layer.key}
                name={layer.name}
                stackId="pump"
                stroke={layer.color}
                fill={layer.color}
                fillOpacity={0.92}
                strokeWidth={0.5}
                isAnimationActive={false}
              />
            ))}
            {xCategories.map((code) => (
              <ReferenceLine
                key={code}
                x={code}
                stroke={MONTH_MARKER_STROKE}
                strokeWidth={1}
                strokeDasharray="4 5"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:justify-center">
        {PUMP_PRICE_STACK_LAYERS.map((layer) => (
          <span key={layer.key} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
            {layer.name}
          </span>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>Avgifter etter gjeldende modell (dato-uavhengig i prognosen)</span>
          <span>Distribusjon og margin: {region.label.toLowerCase()}</span>
          <span>Kontrakter: ICE Futures Europe (lavsvovel gasoil)</span>
        </div>
      </div>
    </div>
  )
}
