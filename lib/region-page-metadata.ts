import type { Metadata } from "next"
import {
  getRegionPriceProfile,
  type RegionId,
  type RegionPriceProfile,
} from "@/lib/regional-price-model"
import { regionPath } from "@/lib/region-route"
import { SITE_URL } from "@/lib/site-url"

function regionDescription(profile: RegionPriceProfile): string {
  if (profile.id === "national") {
    return "ICE-basert råvarepris oppdatert jevnlig. Veiledende modell av norske avgifter og pumpepris — ikke kjøpspris."
  }
  return `ICE lavsvovel gasoil og veiledende pumpeprisestimat for ${profile.label}: avgifter, mva og modellert regional distribusjon og margin.`
}

export function regionPageMetadata(regionId: RegionId): Metadata {
  const profile = getRegionPriceProfile(regionId)
  const path = regionPath(regionId)
  const canonical = `${SITE_URL}${path}`
  const description = regionDescription(profile)
  const title = `Dieselpris – ${profile.shortLabel} | Dieselpris.no`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
    },
    twitter: {
      title,
      description,
    },
  }
}
