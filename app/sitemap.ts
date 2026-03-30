import type { MetadataRoute } from "next";

import { getAllNewsSlugs } from "@/lib/news-articles";
import { regionPath } from "@/lib/region-route";
import { REGION_PRICE_PROFILES } from "@/lib/regional-price-model";
import { SITE_URL } from "@/lib/site-url";

const sitemap = function sitemap(): MetadataRoute.Sitemap {
  const regionEntries = REGION_PRICE_PROFILES.map((p) => ({
    changeFrequency: "daily" as const,
    priority: p.id === "national" ? 1 : 0.8,
    url: new URL(regionPath(p.id), SITE_URL).href,
  }));
  const newsEntries = getAllNewsSlugs().map((slug) => ({
    changeFrequency: "daily" as const,
    priority: 0.6,
    url: new URL(`/nyheter/${slug}`, SITE_URL).href,
  }));

  return [
    ...regionEntries,
    {
      changeFrequency: "daily" as const,
      priority: 0.7,
      url: new URL("/nyheter", SITE_URL).href,
    },
    ...newsEntries,
  ];
};
export default sitemap;
