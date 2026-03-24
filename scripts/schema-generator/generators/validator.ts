/**
 * Generator for table validator files.
 */

import type { TableDefinition } from "../types";

/**
 * Generate validator file content for a table
 */
export function generateValidator(table: TableDefinition): string {
  const validatorName = `${table.name}Validator`;
  const lines: string[] = [
    `import { v } from "convex/values";`,
    "",
    "/**",
    ` * Validator for ${table.name} table (matches schema.ts).`,
    " * Includes all schema fields plus system fields (_id, _creationTime).",
    " */",
    `export const ${validatorName} = v.object({`,
    `  _id: v.id("${table.name}"),`,
    "  _creationTime: v.number(),",
  ];

  for (const field of table.fields) {
    lines.push(`  ${field.name}: ${field.validator},`);
  }

  lines.push("});");

  return lines.join("\n");
}
