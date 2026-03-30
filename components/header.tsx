"use client";

import { Fuel } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { regionPath } from "@/lib/region-route";
import {
  DEFAULT_REGION_ID,
  REGION_PRICE_PROFILES,
} from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";
import { cn } from "@/lib/utils";

interface HeaderProps {
  activeNav?: "news" | "prices";
  selectedRegionId?: RegionId;
  variant?: "content" | "region";
}

const navLinkClass = function navLinkClass(isActive: boolean) {
  return cn(
    "font-medium transition-colors",
    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
  );
};

export const Header = function Header({
  activeNav = "prices",
  selectedRegionId = DEFAULT_REGION_ID,
  variant = "region",
}: HeaderProps) {
  const router = useRouter();
  const sectionBasePath = regionPath(selectedRegionId);
  const showRegionSelect = variant === "region";

  const onRegionChange = useCallback(
    (value: string) => {
      router.push(regionPath(value as RegionId));
    },
    [router]
  );
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex flex-row gap-3 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center transition-transform group-hover:scale-105">
              <Fuel className="h-4 w-4 text-background" />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">
              dieselpris
            </span>
          </Link>
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            {showRegionSelect ? (
              <div className="flex items-center gap-2">
                <span
                  id="region-select-label"
                  className="text-sm font-medium text-muted-foreground hidden md:block"
                >
                  Region
                </span>
                <Select value={selectedRegionId} onValueChange={onRegionChange}>
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
            ) : null}

            <nav className="hidden items-center gap-6 text-sm md:flex">
              <Link
                href="/nyheter"
                className={navLinkClass(activeNav === "news")}
              >
                Nyheter
              </Link>
              {showRegionSelect ? (
                <>
                  <a
                    href={`${sectionBasePath}#priser`}
                    className={navLinkClass(activeNav === "prices")}
                  >
                    Priser
                  </a>
                  <a
                    href={`${sectionBasePath}#distribusjon`}
                    className={navLinkClass(false)}
                  >
                    Distribusjon
                  </a>
                  <a
                    href={`${sectionBasePath}#avgifter`}
                    className={navLinkClass(false)}
                  >
                    Avgifter
                  </a>
                </>
              ) : (
                <Link href="/" className={navLinkClass(activeNav === "prices")}>
                  Priser
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
