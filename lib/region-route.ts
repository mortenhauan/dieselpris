import { DEFAULT_REGION_ID, type RegionId } from "@/lib/regional-price-model";

export function regionPath(regionId: RegionId): string {
  if (regionId === DEFAULT_REGION_ID) return "/";
  return `/${regionId}`;
}
