"use client"

import { useMemo } from "react"
import {
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

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
}

type ChartRow = {
  month: string
  total: number
}

type TooltipPayloadEntry = {
  name?: string | number
  value?: number | string | Array<number | string>
  color?: string
}

type FuturesTooltipProps = {
  active?: boolean
  payload?: TooltipPayloadEntry[]
  label?: string | number
  chartData: ChartRow[]
}

function FuturesAreaTooltip({ active, payload, label, chartData }: FuturesTooltipProps) {
  if (active && payload && payload.length) {
    const data = chartData.find((d) => d.month === String(label))
    return (
      <div className="bg-card border border-border rounded-xl p-4 shadow-lg">
        <p className="font-semibold text-foreground mb-3">{label != null ? String(label) : ""}</p>
        <div className="space-y-1.5 text-sm">
          {payload
            .slice()
            .reverse()
            .map((entry, index) => (
              <div key={index} className="flex justify-between gap-6">
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: String(entry.color ?? "transparent") }}
                  />
                  <span className="text-muted-foreground">{entry.name ?? ""}</span>
                </span>
                <span className="font-medium tabular-nums">
                  {(() => {
                    const v = entry.value
                    if (typeof v === "number" && Number.isFinite(v)) return `${v.toFixed(2)} kr`
                    if (typeof v === "string") {
                      const n = Number.parseFloat(v)
                      return Number.isFinite(n) ? `${n.toFixed(2)} kr` : "— kr"
                    }
                    return "— kr"
                  })()}
                </span>
              </div>
            ))}
          <div className="border-t border-border pt-2 mt-2 flex justify-between gap-6">
            <span className="font-semibold">Estimert pumpepris</span>
            <span className="font-bold text-foreground tabular-nums">{data?.total.toFixed(2)} kr/L</span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

// Norwegian diesel cost components (2026)
const VEIBRUKSAVGIFT = 2.28
const CO2_AVGIFT = 4.42
const DISTRIBUSJON_MARGIN = 3.20 // Average distribution + margin

export function FuturesForecast({ contracts, exchangeRate }: FuturesForecastProps) {
  const chartData = useMemo(() => {
    const litersPerTon = 1176
    
    return contracts.map((contract) => {
      // Convert USD/MT to NOK/liter
      const rawPrice = (contract.last_price * exchangeRate) / litersPerTon
      
      // Calculate components (excluding MVA first)
      const priceBeforeMva = rawPrice + VEIBRUKSAVGIFT + CO2_AVGIFT + DISTRIBUSJON_MARGIN
      
      // MVA is 25% of the total price before MVA
      const mva = priceBeforeMva * 0.25
      
      return {
        month: contract.contract_month,
        code: contract.contract_code,
        rawPrice: Math.round(rawPrice * 100) / 100,
        veibruksavgift: VEIBRUKSAVGIFT,
        co2Avgift: CO2_AVGIFT,
        distribusjon: DISTRIBUSJON_MARGIN,
        mva: Math.round(mva * 100) / 100,
        total: Math.round((priceBeforeMva + mva) * 100) / 100,
        change: contract.change,
        changePercent: contract.change_percent,
      }
    })
  }, [contracts, exchangeRate])

  const firstPrice = chartData[0]?.total ?? 0
  const lastPrice = chartData[chartData.length - 1]?.total ?? 0
  const priceDiff = lastPrice - firstPrice
  const priceDiffPercent = ((priceDiff / firstPrice) * 100).toFixed(1)

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Estimert pumpepris fremover
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
          Basert på terminkontrakter fra ICE-børsen viser vi estimert pumpepris for kommende måneder.
          Diagrammet viser alle kostnadskomponenter stablet oppover: råvarepris, avgifter, distribusjon og MVA.
        </p>
      </div>

      {/* Price trend summary */}
      <div className="flex flex-wrap gap-6 mb-8">
        <div className="bg-secondary/50 rounded-xl px-5 py-4">
          <p className="text-xs text-muted-foreground mb-1">Nærmeste kontrakt</p>
          <p className="text-2xl font-bold text-foreground tabular-nums">{firstPrice.toFixed(2)} kr/L</p>
          <p className="text-xs text-muted-foreground">{chartData[0]?.month}</p>
        </div>
        <div className="bg-secondary/50 rounded-xl px-5 py-4">
          <p className="text-xs text-muted-foreground mb-1">Om 12 måneder</p>
          <p className="text-2xl font-bold text-foreground tabular-nums">{lastPrice.toFixed(2)} kr/L</p>
          <p className="text-xs text-muted-foreground">{chartData[chartData.length - 1]?.month}</p>
        </div>
        <div className="bg-secondary/50 rounded-xl px-5 py-4">
          <p className="text-xs text-muted-foreground mb-1">Forventet endring</p>
          <p className={`text-2xl font-bold tabular-nums ${priceDiff < 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
            {priceDiff > 0 ? '+' : ''}{priceDiff.toFixed(2)} kr
          </p>
          <p className="text-xs text-muted-foreground">{priceDiffPercent}% endring</p>
        </div>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRaw" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="hsl(220, 70%, 50%)" stopOpacity={0.7}/>
              </linearGradient>
              <linearGradient id="colorVei" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(280, 60%, 55%)" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="hsl(280, 60%, 55%)" stopOpacity={0.7}/>
              </linearGradient>
              <linearGradient id="colorCo2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(340, 65%, 55%)" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="hsl(340, 65%, 55%)" stopOpacity={0.7}/>
              </linearGradient>
              <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(35, 85%, 55%)" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="hsl(35, 85%, 55%)" stopOpacity={0.7}/>
              </linearGradient>
              <linearGradient id="colorMva" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="hsl(160, 60%, 45%)" stopOpacity={0.7}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={{ stroke: 'hsl(var(--border))' }}
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value} kr`}
              domain={[0, 'auto']}
              dx={-10}
            />
            <Tooltip
              content={(props) => (
                <FuturesAreaTooltip
                  active={props.active}
                  payload={props.payload}
                  label={props.label}
                  chartData={chartData}
                />
              )}
            />
            <Legend 
              verticalAlign="bottom"
              height={50}
              iconType="square"
              formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
            />
            <Area
              type="monotone"
              dataKey="rawPrice"
              name="Råvarepris"
              stackId="1"
              stroke="hsl(220, 70%, 50%)"
              fill="url(#colorRaw)"
              strokeWidth={0}
            />
            <Area
              type="monotone"
              dataKey="veibruksavgift"
              name="Veibruksavgift"
              stackId="1"
              stroke="hsl(280, 60%, 55%)"
              fill="url(#colorVei)"
              strokeWidth={0}
            />
            <Area
              type="monotone"
              dataKey="co2Avgift"
              name="CO2-avgift"
              stackId="1"
              stroke="hsl(340, 65%, 55%)"
              fill="url(#colorCo2)"
              strokeWidth={0}
            />
            <Area
              type="monotone"
              dataKey="distribusjon"
              name="Distribusjon"
              stackId="1"
              stroke="hsl(35, 85%, 55%)"
              fill="url(#colorDist)"
              strokeWidth={0}
            />
            <Area
              type="monotone"
              dataKey="mva"
              name="MVA"
              stackId="1"
              stroke="hsl(160, 60%, 45%)"
              fill="url(#colorMva)"
              strokeWidth={0}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
          <span>Avgifter basert på 2026-satser</span>
          <span>Distribusjon: gjennomsnitt for Norge</span>
          <span>Kilde: ICE Futures Europe</span>
        </div>
      </div>
    </div>
  )
}
