"use client"

import { Area, AreaChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"

interface HistoricalData {
  date: string
  price_nok_liter: number
}

interface PriceChartProps {
  data: HistoricalData[]
}

export function PriceChart({ data }: PriceChartProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('no-NO', { day: 'numeric', month: 'short' })
  }

  const formatPrice = (value: number) => `${value.toFixed(2)} kr`

  return (
    <div className="h-[300px] md:h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="oklch(0.50 0.15 250)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="oklch(0.50 0.15 250)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            tick={{ fill: 'oklch(0.50 0.02 250)', fontSize: 12 }}
            axisLine={{ stroke: 'oklch(0.90 0.01 250)' }}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis 
            tickFormatter={(value) => `${value} kr`}
            tick={{ fill: 'oklch(0.50 0.02 250)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            domain={['dataMin - 0.5', 'dataMax + 0.5']}
            width={60}
          />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-sm text-muted-foreground mb-1">
                      {formatDate(label)}
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatPrice(payload[0].value as number)}
                    </p>
                    <p className="text-xs text-muted-foreground">per liter (råvare)</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="price_nok_liter"
            stroke="oklch(0.50 0.15 250)"
            strokeWidth={2}
            fill="url(#priceGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
