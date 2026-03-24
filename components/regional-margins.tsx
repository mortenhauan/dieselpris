"use client"

import { MapPin, Truck, TrendingUp, Store, Fuel, Info } from "lucide-react"

interface RegionData {
  name: string
  estimatedMargin: { min: number; max: number }
  factors: string[]
}

const regions: RegionData[] = [
  {
    name: "Oslo / Østlandet",
    estimatedMargin: { min: 2.50, max: 3.50 },
    factors: [
      "Kort avstand til import-terminaler",
      "Høy konkurranse mellom stasjoner",
      "Stort volum gir stordriftsfordeler"
    ]
  },
  {
    name: "Vestlandet",
    estimatedMargin: { min: 2.80, max: 3.80 },
    factors: [
      "Nærhet til Mongstad-raffineriet",
      "God infrastruktur og høyt volum",
      "Moderat konkurranse"
    ]
  },
  {
    name: "Trøndelag",
    estimatedMargin: { min: 3.00, max: 4.20 },
    factors: [
      "Lengre transport fra raffinerier",
      "Regionale lagre reduserer kostnader",
      "Sesongvariasjoner (vinter)"
    ]
  },
  {
    name: "Nord-Norge",
    estimatedMargin: { min: 3.50, max: 5.00 },
    factors: [
      "Lange transportavstander",
      "Færre stasjoner, lavere konkurranse",
      "Utfordrende logistikk"
    ]
  }
]

const marginComponents = [
  {
    icon: Truck,
    title: "Transport",
    description: "Frakt fra terminal til stasjon",
    impact: "0.30 - 1.50 kr/L"
  },
  {
    icon: Store,
    title: "Lagring",
    description: "Lokale tankanlegg og utstyr",
    impact: "0.40 - 0.80 kr/L"
  },
  {
    icon: TrendingUp,
    title: "Grossist",
    description: "Oljeselskapets margin",
    impact: "0.50 - 1.20 kr/L"
  },
  {
    icon: Fuel,
    title: "Forhandler",
    description: "Stasjonens fortjeneste",
    impact: "0.30 - 0.80 kr/L"
  }
]

export function RegionalMargins() {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            Distribusjon og margin
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Mellom råvarepris og pumpepris ligger distribusjonskostnader og marginer som varierer geografisk.
          </p>
        </div>

        {/* Margin Components */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {marginComponents.map((component, index) => (
            <div key={index} className="bg-secondary rounded-xl p-5">
              <div className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center mb-4">
                <component.icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{component.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{component.description}</p>
              <p className="text-sm font-semibold text-foreground">{component.impact}</p>
            </div>
          ))}
        </div>

        {/* Regional Breakdown */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 md:p-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                <MapPin className="h-5 w-5 text-background" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Regionale forskjeller</h3>
                <p className="text-sm text-muted-foreground">Estimert margin per region (ekskl. avgifter)</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            {regions.map((region, index) => (
              <div 
                key={index} 
                className="p-6 md:p-8 border-b md:border-b-0 md:odd:border-r border-border last:border-b-0"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">{region.name}</h4>
                  <span className="text-sm font-bold bg-secondary px-3 py-1 rounded-full">
                    {region.estimatedMargin.min.toFixed(2)} - {region.estimatedMargin.max.toFixed(2)} kr/L
                  </span>
                </div>
                <ul className="space-y-2">
                  {region.factors.map((factor, fIndex) => (
                    <li key={fIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground/30 mt-0.5">-</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-6 bg-accent/10 rounded-xl p-6 flex gap-4">
          <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Om estimatene</p>
            <p>
              Marginene er estimater basert på bransjedata. Faktiske marginer varierer mellom kjeder og tidspunkt.
              Lavpris-kjeder som Uno-X og Best har generelt lavere marginer enn fullservice-stasjoner.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
