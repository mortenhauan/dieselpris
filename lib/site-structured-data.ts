import { SITE_URL } from "@/lib/site-url";

const organization = function organization(): Record<string, unknown> {
  return {
    "@type": "Organization",
    name: "Dieselpris.no",
    url: SITE_URL,
  };
};

export const articleJsonLd = function articleJsonLd(input: {
  canonicalUrl: string;
  datePublished: string;
  description?: string;
  headline: string;
}): Record<string, unknown> {
  const pub = organization();
  const base: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    author: pub,
    dateModified: input.datePublished,
    datePublished: input.datePublished,
    headline: input.headline,
    inLanguage: "nb-NO",
    mainEntityOfPage: { "@id": input.canonicalUrl, "@type": "WebPage" },
    publisher: pub,
    url: input.canonicalUrl,
  };
  if (input.description) {
    base.description = input.description;
  }
  return base;
};

export const websiteJsonLd = function websiteJsonLd(): Record<string, unknown> {
  const pub = organization();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Dieselpris.no",
    publisher: pub,
    url: SITE_URL,
  };
};
