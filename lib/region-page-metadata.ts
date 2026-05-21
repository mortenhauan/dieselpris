import type { Metadata } from "next";

import { regionPath } from "@/lib/region-route";
import { getRegionPriceProfile } from "@/lib/regional-price-model";
import type { RegionId } from "@/lib/regional-price-model";
import { siteSummaryDescriptionForRegion } from "@/lib/site-seo-copy";
import { SITE_URL } from "@/lib/site-url";

export const regionPageMetadata = function regionPageMetadata(
  regionId: RegionId
): Metadata {
  const profile = getRegionPriceProfile(regionId);
  const path = regionPath(regionId);
  const canonical = `${SITE_URL}${path}`;
  const description = siteSummaryDescriptionForRegion(regionId);
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
