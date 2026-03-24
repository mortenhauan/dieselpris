"use client"

import Link from "next/link"
import { Droplet } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105">
              <Droplet className="h-4 w-4 text-background" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">dieselpris</span>
          </Link>
          <nav className="flex items-center gap-8 text-sm">
            <a href="#priser" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Priser
            </a>
            <a href="#distribusjon" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Distribusjon
            </a>
            <a href="#avgifter" className="text-muted-foreground hover:text-foreground transition-colors font-medium">
              Avgifter
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
