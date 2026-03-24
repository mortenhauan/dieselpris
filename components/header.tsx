"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Droplet } from "lucide-react";
import {
  REGION_PRICE_PROFILES,
  type RegionId,
} from "@/lib/regional-price-model";
import { regionPath } from "@/lib/region-route";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type HeaderProps = {
  selectedRegionId: RegionId;
};

export function Header({ selectedRegionId }: HeaderProps) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-row gap-3 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105">
              <Droplet className="h-4 w-4 text-background" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">
              dieselpris
            </span>
          </Link>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <div className="flex items-center gap-2">
              <span
                id="region-select-label"
                className="text-sm font-medium text-muted-foreground hidden md:block"
              >
                Region
              </span>
              <Select
                value={selectedRegionId}
                onValueChange={(value) => {
                  router.push(regionPath(value as RegionId));
                }}
              >
                <SelectTrigger
                  aria-labelledby="region-select-label"
                  size="sm"
                  className="bg-background"
                >
                  <SelectValue placeholder="Velg region" />
                </SelectTrigger>
                <SelectContent>
                  {REGION_PRICE_PROFILES.map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <nav className="hidden items-center gap-6 text-sm md:flex">
              <a
                href="#priser"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Priser
              </a>
              <a
                href="#distribusjon"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Distribusjon
              </a>
              <a
                href="#avgifter"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Avgifter
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
