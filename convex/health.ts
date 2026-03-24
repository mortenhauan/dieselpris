import { query } from "./_generated/server";
import { v } from "convex/values";

export const ping = query({
  args: {},
  returns: v.literal("ok"),
  handler: async (): Promise<"ok"> => "ok",
});
