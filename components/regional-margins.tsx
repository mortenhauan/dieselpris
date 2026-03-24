"use client"

import { MapPin, Truck, TrendingUp, Store, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { REGION_PRICE_PROFILES, type RegionId } from "@/lib/regional-price-model"

const marginComponents = [
  {
    icon: TrendingUp,
    title: "Lokal konkurranse",
    description: "Konkurransetilsynet peker på at lokal konkurranse ofte betyr mye for pumpeprisen.",
    impact: "Ofte viktigst"
  },
  {
    icon: Truck,
    title: "Avstand og logistikk",
    description: "Lengre transport, ferger og mer krevende logistikk kan gi høyere kostnader.",
    impact: "Mer utslag i distriktene"
  },
  {
    icon: Store,
    title: "Stasjonstype",
    description: "Lavpris og ubetjente stasjoner ligger ofte lavere enn fullservice-stasjoner.",
    impact: "Varierer med kjede"
  },
  {
    icon: MapPin,
    title: "Tidspunkt",
    description: "Samme område kan ha store forskjeller gjennom uka og mellom nabostasjoner.",
    impact: "Følg lokale priser"
  }
]

type RegionalMarginsProps = {
  selectedRegionId: RegionId
}

export function RegionalMargins({ selectedRegionId }: RegionalMarginsProps) {
  return (
    <section className="py-16 md:py-24 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            Distribusjon og margin
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Mellom råvarepris og pumpepris kommer distribusjon og margin. Det varierer mellom regioner, men også
            mye lokalt fra stasjon til stasjon.
          </p>
        </div>

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

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="p-6 md:p-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-foreground flex items-center justify-center">
                <MapPin className="h-5 w-5 text-background" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Regionale forskjeller</h3>
                <p className="text-sm text-muted-foreground">
                  Prisestimatet varierer litt per region ut fra transport og konkurranse. Valgt region er markert.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2">
            {REGION_PRICE_PROFILES.filter((region) => region.id !== "national").map((region) => (
              <div
                key={region.id}
                className={cn(
                  "p-6 md:p-8 border-b md:border-b-0 md:odd:border-r border-border last:border-b-0",
                  region.id === selectedRegionId && "bg-secondary/40",
                )}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-foreground">{region.label}</h4>
                  <span className="text-sm font-bold bg-secondary px-3 py-1 rounded-full">
                    {region.distributionNokPerLiter.toFixed(2)} kr/L i estimatet
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{region.summary}</p>
                <ul className="space-y-2">
                  {region.factors.map((factor) => (
                    <li key={factor} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-foreground/30 mt-0.5">-</span>
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 bg-accent/10 rounded-xl p-6 flex gap-4">
          <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Om estimatene</p>
            <p className="mb-3">
              Dette er en enkel modell for å forklare prisforskjeller, ikke en fasit for hver stasjon. Faktiske
              priser påvirkes av lokal konkurranse, kjede, kampanjer og tidspunkt på dagen og uka.
            </p>
            <p>
              Ser du en annen pumpepris enn estimatet lenger opp, er det som oftest av samme grunn: modellen bruker
              ett regionalt påslag, mens virkeligheten varierer fra sted til sted og dag til dag.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
