"use client"

import { Truck, Leaf, Receipt, ArrowRight } from "lucide-react"

export function TaxExplainer() {
  const taxItems = [
    {
      icon: Truck,
      title: "Veibruksavgift",
      rate: "2,28",
      unit: "kr/L",
      description: "Dekker samfunnets kostnader ved bilbruk - veislitasje, ulykker og kodannelse.",
      trend: "Ned fra 2,71 kr (2024)"
    },
    {
      icon: Leaf,
      title: "CO2-avgift",
      rate: "4,42",
      unit: "kr/L",
      description: "Miljoavgift som skal gjore det dyrere a slippe ut klimagasser. Oker arlig.",
      trend: "Opp fra 3,17 kr (2024)"
    },
    {
      icon: Receipt,
      title: "Merverdiavgift",
      rate: "25",
      unit: "%",
      description: "Beregnes av totalprisen inkludert alle andre avgifter.",
      trend: "Uendret"
    },
  ]

  const historicalData = [
    { year: "2024", vei: "2,71", co2: "3,17", total: "5,88" },
    { year: "2025", vei: "2,69", co2: "3,79", total: "6,48" },
    { year: "2026", vei: "2,28", co2: "4,42", total: "6,70", current: true },
  ]

  return (
    <section className="py-16 md:py-24 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            Norske dieselavgifter
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Over 60% av pumpeprisen gar til staten i form av avgifter.
          </p>
        </div>

        {/* Tax cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {taxItems.map((item, index) => (
            <div key={index} className="bg-card rounded-2xl border border-border p-6">
              <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center mb-5">
                <item.icon className="h-6 w-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-4xl font-bold text-foreground">{item.rate}</span>
                <span className="text-muted-foreground">{item.unit}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <ArrowRight className="h-4 w-4 text-accent" />
                <span className="text-accent font-medium">{item.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Historical table */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 md:p-8 border-b border-border">
            <h3 className="font-semibold text-foreground">Utvikling over tid</h3>
            <p className="text-sm text-muted-foreground">Faste avgifter per liter (ekskl. MVA)</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary/50">
                  <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Ar</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Veibruksavgift</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">CO2-avgift</th>
                  <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Sum avgifter</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-t border-border ${row.current ? 'bg-foreground text-background' : ''}`}
                  >
                    <td className={`py-4 px-6 font-semibold ${row.current ? '' : 'text-foreground'}`}>
                      {row.year}
                    </td>
                    <td className={`py-4 px-6 text-right tabular-nums ${row.current ? '' : 'text-muted-foreground'}`}>
                      {row.vei} kr
                    </td>
                    <td className={`py-4 px-6 text-right tabular-nums ${row.current ? '' : 'text-muted-foreground'}`}>
                      {row.co2} kr
                    </td>
                    <td className={`py-4 px-6 text-right font-bold tabular-nums`}>
                      {row.total} kr
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Veibruksavgiften har blitt redusert, men CO2-avgiften oker mer. Samlet har avgiftene okt med 22 ore fra 2025 til 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
