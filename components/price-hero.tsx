"use client"

import { TrendingUp, TrendingDown, RefreshCw, Clock } from "lucide-react"

function formatUpdatedAt(iso: string) {
  return new Date(iso).toLocaleString("no-NO", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Oslo",
  })
}

interface PriceHeroProps {
  priceUsdMt: number
  priceNokLiter: number
  changePercent: number
  updatedAt: string
  isLoading?: boolean
}

export function PriceHero({ priceUsdMt, priceNokLiter, changePercent, updatedAt, isLoading }: PriceHeroProps) {
  const formattedTime = formatUpdatedAt(updatedAt)

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Sanntid fra ICE Futures
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 tracking-tight text-balance">
            Dagens dieselpris
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl text-pretty leading-relaxed">
            Folg ravarepris pa diesel fra borsen. Se hvordan avgifter pavirker prisen ved pumpa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Main price card */}
          <div className="bg-foreground text-background rounded-2xl p-8 md:p-10">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-background/60 text-sm mb-2">ICE Gasoil LFJ26</p>
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl md:text-6xl font-bold tracking-tight ${isLoading ? 'animate-pulse' : ''}`}>
                    ${priceUsdMt.toFixed(0)}
                  </span>
                  <span className="text-background/60 text-lg font-medium">/MT</span>
                </div>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                changePercent >= 0 
                  ? 'bg-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {changePercent >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-background/50">
              <Clock className="h-3.5 w-3.5" />
              <span>{formattedTime}</span>
              {isLoading && <RefreshCw className="h-3.5 w-3.5 animate-spin" />}
            </div>
          </div>

          {/* Norwegian price */}
          <div className="bg-secondary rounded-2xl p-8 md:p-10 flex flex-col justify-between">
            <div>
              <p className="text-muted-foreground text-sm mb-2">Ravarepris i NOK</p>
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl md:text-6xl font-bold tracking-tight text-foreground ${isLoading ? 'animate-pulse' : ''}`}>
                  {priceNokLiter.toFixed(2)}
                </span>
                <span className="text-muted-foreground text-lg font-medium">kr/L</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm mt-6">
              For avgifter og margin. Basert pa dagens valutakurs.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
