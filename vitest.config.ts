import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["scripts/schema-generator/__tests__/**/*.test.ts"],
  },
});
