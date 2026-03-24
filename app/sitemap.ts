import type { MetadataRoute } from "next"
import { REGION_PRICE_PROFILES } from "@/lib/regional-price-model"
import { regionPath } from "@/lib/region-route"
import { SITE_URL } from "@/lib/site-url"

export default function sitemap(): MetadataRoute.Sitemap {
  return REGION_PRICE_PROFILES.map((p) => ({
    url: new URL(regionPath(p.id), SITE_URL).href,
    changeFrequency: "daily" as const,
    priority: p.id === "national" ? 1 : 0.8,
  }))
}
