export type SocialPlatform = "facebook" | "x";

export const X_SITE_HANDLE = "@DieselprisNo" as const;

const socialX = {
  ariaLabel: "Dieselpris.no på X (åpner i ny fane)",
  href: "https://x.com/DieselprisNo",
  label: "@DieselprisNo på X",
  platform: "x" as const,
};

const socialFacebook = {
  ariaLabel: "Dieselpris.no på Facebook (åpner i ny fane)",
  href: "https://www.facebook.com/dieselpris.no",
  label: "Dieselpris.no på Facebook",
  platform: "facebook" as const,
};

export const SOCIAL_PROFILES = [socialX, socialFacebook] as const;

export const SOCIAL_X = socialX;
export const SOCIAL_FACEBOOK = socialFacebook;

export const SOCIAL_PROFILE_HREFS = SOCIAL_PROFILES.map((p) => p.href);
