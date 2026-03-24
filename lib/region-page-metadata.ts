import type { Metadata } from "next";

import { regionPath } from "@/lib/region-route";
import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId, RegionPriceProfile } from "@/lib/regional-price-model";
import { SITE_URL } from "@/lib/site-url";

const regionDescription = function regionDescription(
  profile: RegionPriceProfile
): string {
  if (profile.id === "national") {
    return "Forstå bedre råvarepriser og avgifter på diesel i Norge.";
  }
  return `Forstå bedre hvordan råvarepriser, avgifter og regionale forskjeller påvirker diesel i ${profile.label}.`;
};

export const regionPageMetadata = function regionPageMetadata(
  regionId: RegionId
): Metadata {
  const profile = getRegionPriceProfile(regionId);
  const path = regionPath(regionId);
  const canonical = `${SITE_URL}${path}`;
  const description = regionDescription(profile);
  const title = `Dieselpris – ${profile.shortLabel} | Dieselpris.no`;
  return {
    alternates: { canonical },
    description,
    openGraph: {
      description,
      siteName: "Dieselpris.no",
      title,
      url: canonical,
    },
    title,
    twitter: {
      card: "summary_large_image",
      description,
      title,
    },
  };
};
