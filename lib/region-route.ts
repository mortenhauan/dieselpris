import { DEFAULT_REGION_ID } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";

export const regionPath = function regionPath(regionId: RegionId): string {
  if (regionId === DEFAULT_REGION_ID) {
    return "/";
  }
  return `/${regionId}`;
};
