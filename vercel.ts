import type { VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  buildCommand: "npx convex deploy --cmd 'pnpm run build'",
};
