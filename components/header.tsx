"use client";

import { Fuel, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

const mobileNavLinkClass = function mobileNavLinkClass(isActive: boolean) {
  return cn(
    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
    isActive
      ? "bg-accent text-foreground"
      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
  );
};

export const Header = function Header({
  activeNav = "prices",
  selectedRegionId = DEFAULT_REGION_ID,
  variant = "region",
}: HeaderProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const sectionBasePath = regionPath(selectedRegionId);
  const showRegionSelect = variant === "region";
  const showSectionAnchors =
    showRegionSelect && selectedRegionId !== DEFAULT_REGION_ID;

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const onRegionChange = useCallback(
    (value: string) => {
      router.push(regionPath(value as RegionId));
    },
    [router]
  );

  return (
    <header className="sticky top-0 z-50 border-border/50 border-b bg-background/80 backdrop-blur-lg">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6 md:py-4">
        <div className="flex items-center gap-3">
          <Link
            className="group flex shrink-0 items-center gap-2.5"
            href="/"
            onClick={closeMobile}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground transition-transform group-hover:scale-105">
              <Fuel className="h-4 w-4 text-background" />
            </div>
            <span className="font-semibold text-base text-foreground tracking-tight">
              dieselpris
            </span>
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-2 md:gap-6">
            {showRegionSelect ? (
              <div className="flex min-w-0 max-w-[min(100%,12rem)] items-center gap-2 sm:max-w-[14rem] md:max-w-none">
                <span
                  className="hidden font-medium text-muted-foreground text-sm lg:inline"
                  id="region-select-label"
                >
                  Region
                </span>
                <Select onValueChange={onRegionChange} value={selectedRegionId}>
                  <SelectTrigger
                    aria-labelledby="region-select-label"
                    className="min-w-0 flex-1 bg-background"
                    size="sm"
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

            <Sheet onOpenChange={setMobileOpen} open={mobileOpen}>
              <SheetTrigger asChild>
                <Button
                  aria-expanded={mobileOpen}
                  aria-label="Åpne meny"
                  className="md:hidden"
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[min(100%,20rem)]" side="right">
                <SheetHeader>
                  <SheetTitle>Meny</SheetTitle>
                </SheetHeader>
                <nav
                  aria-label="Hovedmeny"
                  className="flex flex-col gap-1 px-2 pb-6 pt-2"
                >
                  <Link
                    className={mobileNavLinkClass(activeNav === "news")}
                    href="/nyheter"
                    onClick={closeMobile}
                  >
                    Nyheter
                  </Link>
                  {showRegionSelect ? (
                    <>
                      <a
                        className={mobileNavLinkClass(activeNav === "prices")}
                        href={`${sectionBasePath}#priser`}
                        onClick={closeMobile}
                      >
                        Priser
                      </a>
                      {showSectionAnchors ? (
                        <>
                          <a
                            className={mobileNavLinkClass(false)}
                            href={`${sectionBasePath}#distribusjon`}
                            onClick={closeMobile}
                          >
                            Distribusjon
                          </a>
                          <a
                            className={mobileNavLinkClass(false)}
                            href={`${sectionBasePath}#avgifter`}
                            onClick={closeMobile}
                          >
                            Avgifter
                          </a>
                        </>
                      ) : null}
                    </>
                  ) : (
                    <Link
                      className={mobileNavLinkClass(activeNav === "prices")}
                      href="/"
                      onClick={closeMobile}
                    >
                      Priser
                    </Link>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <nav
              aria-label="Hovedmeny"
              className="hidden items-center gap-5 text-sm md:flex lg:gap-6"
            >
              <Link
                className={navLinkClass(activeNav === "news")}
                href="/nyheter"
              >
                Nyheter
              </Link>
              {showRegionSelect ? (
                <>
                  <a
                    className={navLinkClass(activeNav === "prices")}
                    href={`${sectionBasePath}#priser`}
                  >
                    Priser
                  </a>
                  {showSectionAnchors ? (
                    <>
                      <a
                        className={navLinkClass(false)}
                        href={`${sectionBasePath}#distribusjon`}
                      >
                        Distribusjon
                      </a>
                      <a
                        className={navLinkClass(false)}
                        href={`${sectionBasePath}#avgifter`}
                      >
                        Avgifter
                      </a>
                    </>
                  ) : null}
                </>
              ) : (
                <Link className={navLinkClass(activeNav === "prices")} href="/">
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
