import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/site-url";

const robots = function robots(): MetadataRoute.Robots {
  return {
    rules: { allow: "/", userAgent: "*" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
};
export default robots;
