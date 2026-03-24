"use client"

import { Droplet } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                <Droplet className="h-4 w-4 text-background" />
              </div>
              <span className="text-base font-semibold tracking-tight text-foreground">dieselpris</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              En uavhengig tjeneste som gir deg innsikt i norske dieselpriser og hvordan de settes.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Kilder</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="https://www.ice.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  ICE Futures Europe
                </a>
              </li>
              <li>
                <a href="https://lovdata.no" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Lovdata
                </a>
              </li>
              <li>
                <a href="https://www.norges-bank.no" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  Norges Bank
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">Om prisene</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prisene er basert pa ICE Gasoil futures og gir en indikasjon pa ravarepris. 
              Faktiske pumpepriser varierer.
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} dieselpris.no</p>
        </div>
      </div>
    </footer>
  )
}
