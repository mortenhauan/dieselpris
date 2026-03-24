"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import {
  PUMP_PRICE_STACK_LAYERS,
  pumpPriceComponents,
} from "@/lib/pump-price-model"

interface TaxBreakdownProps {
  rawPrice: number
}

export function TaxBreakdown({ rawPrice }: TaxBreakdownProps) {
  const c = pumpPriceComponents(rawPrice)
  const components = PUMP_PRICE_STACK_LAYERS.map((layer) => ({
    name: layer.name,
    value: c[layer.key],
    color: layer.color,
  }))

  const totalPrice = c.total
  const totalTaxes = c.veibruks + c.co2 + c.mva
  const taxPercent = (totalTaxes / totalPrice) * 100

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Prissammensetting</h3>
        <p className="text-sm text-muted-foreground">Slik er pumpeprisen bygget opp</p>
      </div>

      <div className="relative h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={components}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={2}
              dataKey="value"
              strokeWidth={0}
            >
              {components.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground tabular-nums">{totalPrice.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">kr/liter</p>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {components.map((component, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: component.color }}
              />
              <span className="text-sm text-muted-foreground">{component.name}</span>
            </div>
            <span className="text-sm font-medium text-foreground tabular-nums">
              {component.value.toFixed(2)} kr
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Andel avgifter</span>
          <span className="text-lg font-bold text-foreground">{taxPercent.toFixed(0)}%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {totalTaxes.toFixed(2)} kr av prisen går til staten
        </p>
      </div>
    </div>
  )
}
