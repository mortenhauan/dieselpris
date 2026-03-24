"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface TaxBreakdownProps {
  rawPrice: number
}

const VEIBRUKSAVGIFT = 2.28
const CO2_AVGIFT = 4.42
const MVA_RATE = 0.25

export function TaxBreakdown({ rawPrice }: TaxBreakdownProps) {
  const distributionMargin = 3.50
  const priceBeforeTax = rawPrice + distributionMargin
  const fixedTaxes = VEIBRUKSAVGIFT + CO2_AVGIFT
  const priceBeforeMva = priceBeforeTax + fixedTaxes
  const mva = priceBeforeMva * MVA_RATE
  const totalPrice = priceBeforeMva + mva
  
  const components = [
    { name: "Ravarepris", value: rawPrice, color: "#1a1a2e" },
    { name: "Distribusjon", value: distributionMargin, color: "#4a5568" },
    { name: "Veibruksavgift", value: VEIBRUKSAVGIFT, color: "#22c55e" },
    { name: "CO2-avgift", value: CO2_AVGIFT, color: "#f59e0b" },
    { name: "MVA (25%)", value: mva, color: "#ef4444" },
  ]

  const totalTaxes = VEIBRUKSAVGIFT + CO2_AVGIFT + mva
  const taxPercent = (totalTaxes / totalPrice) * 100

  return (
    <div className="bg-card rounded-2xl border border-border p-6 md:p-8 h-full">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Prissammensetting</h3>
        <p className="text-sm text-muted-foreground">Slik er pumpeprisen bygget opp</p>
      </div>

      {/* Pie Chart with center text */}
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
            <p className="text-3xl font-bold text-foreground">{totalPrice.toFixed(0)}</p>
            <p className="text-xs text-muted-foreground">kr/liter</p>
          </div>
        </div>
      </div>

      {/* Stacked bar */}
      <div className="h-3 flex rounded-full overflow-hidden mb-6">
        {components.map((component, index) => (
          <div
            key={index}
            className="h-full first:rounded-l-full last:rounded-r-full"
            style={{ 
              width: `${(component.value / totalPrice) * 100}%`,
              backgroundColor: component.color
            }}
          />
        ))}
      </div>

      {/* Legend */}
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
            <span className="text-sm font-medium text-foreground tabular-nums">{component.value.toFixed(2)} kr</span>
          </div>
        ))}
      </div>

      {/* Tax summary */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Andel avgifter</span>
          <span className="text-lg font-bold text-foreground">{taxPercent.toFixed(0)}%</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {totalTaxes.toFixed(2)} kr av prisen gar til staten
        </p>
      </div>
    </div>
  )
}
