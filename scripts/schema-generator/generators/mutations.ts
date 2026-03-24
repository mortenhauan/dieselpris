/**
 * Generator for internal mutations files.
 */

import type { TableDefinition } from "../types";

function optionalPatchValidator(validator: string): string {
  return validator.startsWith("v.optional(")
    ? validator
    : `v.optional(${validator})`;
}

/**
 * Generate internal mutations file content for a table
 */
export function generateMutations(table: TableDefinition): string {
  const functionsName = `${table.name}Functions`;
  const lines: string[] = [
    `import { v } from "convex/values";`,
    `import { internalMutation } from "../_generated/server";`,
    `import * as functions from "./${functionsName}";`,
    "",
    "/**",
    ` * Internal mutations for ${table.name} table.`,
    ` * These use the helper functions from ${functionsName}.`,
    " */",
  ];

  // create mutation
  lines.push(
    "/**",
    ` * Create a new ${table.name} document.`,
    " */",
    "export const create = internalMutation({",
    "  args: {"
  );

  for (const field of table.fields) {
    lines.push(`    ${field.name}: ${field.validator},`);
  }

  lines.push(
    "  },",
    `  returns: v.id("${table.name}"),`,
    "  handler: async (ctx, args) => {",
    `    return await ctx.db.insert("${table.name}", args);`,
    "  },",
    "});",
    ""
  );

  // update mutation
  lines.push(
    "/**",
    ` * Update an existing ${table.name} document by ID.`,
    " * Accepts partial updates - only provided fields are updated.",
    " */",
    "export const update = internalMutation({",
    "  args: {",
    `    id: v.id("${table.name}"),`
  );

  for (const field of table.fields) {
    lines.push(
      `    ${field.name}: ${optionalPatchValidator(field.validator)},`
    );
  }

  lines.push(
    "  },",
    "  returns: v.null(),",
    "  handler: async (ctx, args) => {",
    "    const { id, ...updates } = args;",
    "    await functions.updateById(ctx.db, id, updates);",
    "    return null;",
    "  },",
    "});",
    ""
  );

  // updateWithUndefined mutation
  lines.push(
    "/**",
    ` * Update an existing ${table.name} document by ID and preserve explicit undefined values.`,
    " * Use this when you intentionally want to clear optional fields.",
    " */",
    "export const updateWithUndefined = internalMutation({",
    "  args: {",
    `    id: v.id("${table.name}"),`
  );

  for (const field of table.fields) {
    lines.push(
      `    ${field.name}: ${optionalPatchValidator(field.validator)},`
    );
  }

  lines.push(
    "  },",
    "  returns: v.null(),",
    "  handler: async (ctx, args) => {",
    "    const { id, ...updates } = args;",
    "    await functions.updateByIdWithUndefined(ctx.db, id, updates);",
    "    return null;",
    "  },",
    "});",
    ""
  );

  // delete mutation
  lines.push(
    "/**",
    ` * Delete a ${table.name} document by ID.`,
    " */",
    "export const remove = internalMutation({",
    "  args: {",
    `    id: v.id("${table.name}"),`,
    "  },",
    "  returns: v.null(),",
    "  handler: async (ctx, args) => {",
    "    await functions.deleteById(ctx.db, args.id);",
    "    return null;",
    "  },",
    "});",
    ""
  );

  // upsert mutation
  lines.push(
    "/**",
    ` * Create or update a ${table.name} document.`,
    ` * If the document exists, it's updated; otherwise, it's created.`,
    " */",
    "export const upsert = internalMutation({",
    "  args: {",
    `    id: v.id("${table.name}"),`
  );

  for (const field of table.fields) {
    lines.push(`    ${field.name}: ${field.validator},`);
  }

  lines.push(
    "  },",
    `  returns: v.id("${table.name}"),`,
    "  handler: async (ctx, args) => {",
    "    const { id, ...data } = args;",
    "    return await functions.getOrUpdateById(ctx.db, id, data);",
    "  },",
    "});",
    ""
  );

  return lines.join("\n");
}
