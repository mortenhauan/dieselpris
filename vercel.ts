import type { VercelConfig } from "@vercel/config/v1";

/**
 * Weekday 07:00 UTC ≈ European morning open context for benchmarks (ICE energy is mostly
 * electronic ~24/5; adjust schedule in dashboard if you want Sunday week-open or Oslo 08:00).
 * Set `CRON_SECRET` on the Vercel project so invocations send `Authorization: Bearer …`.
 */
export const config: VercelConfig = {
  crons: [{ path: "/api/revalidate-diesel", schedule: "0 7 * * 1-5" }],
};
