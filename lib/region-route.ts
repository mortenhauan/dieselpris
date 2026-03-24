import {
  REGION_PRICE_PROFILES,
  type RegionId,
} from "@/lib/regional-price-model"

const validIds = new Set<string>(REGION_PRICE_PROFILES.map((p) => p.id))

export function parseRegionRouteParam(segment: string): RegionId | null {
  if (!validIds.has(segment)) return null
  return segment as RegionId
}

export function regionPath(regionId: RegionId): string {
  return `/${regionId}`
}
