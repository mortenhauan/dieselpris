/**
 * Generator for internal queries files.
 */

import type { Index, TableDefinition } from "../types";
import {
  buildIndexQueryChain,
  generateIndexValidatorArgs,
  getIndexFunctionName,
  getIndexListFunctionName,
} from "../utils";

/**
 * Generate a getByIndex query for internal queries
 */
function generateGetByIndexQuery(
  table: TableDefinition,
  index: Index,
  validatorName: string
): string[] {
  const functionName = getIndexFunctionName(index.name);
  const args = generateIndexValidatorArgs(table, index);
  const argsStr = index.fields.map((f) => `args.${f}`).join(", ");

  return [
    "/**",
    ` * Get a ${table.name} document by ${index.name} index.`,
    " */",
    `export const ${functionName} = internalQuery({`,
    "  args: {",
    ...args,
    "  },",
    `  returns: v.union(${validatorName}, v.null()),`,
    "  handler: async (ctx, args) => {",
    `    return await functions.${functionName}(ctx.db, ${argsStr});`,
    "  },",
    "});",
    "",
  ];
}

/**
 * Generate a listByIndex query for internal queries
 */
function generateListByIndexQuery(
  table: TableDefinition,
  index: Index,
  validatorName: string
): string[] {
  const queryName = getIndexListFunctionName(index.name);
  const args = generateIndexValidatorArgs(table, index);
  const queryChain = buildIndexQueryChain(index.fields, true);

  return [
    "/**",
    ` * List ${table.name} documents by ${index.name} index.`,
    " */",
    `export const ${queryName} = internalQuery({`,
    "  args: {",
    ...args,
    "    limit: v.optional(v.number()),",
    "  },",
    `  returns: v.array(${validatorName}),`,
    "  handler: async (ctx, args) => {",
    "    const limit = resolveListLimit(args.limit);",
    "    return await ctx.db",
    `      .query("${table.name}")`,
    `      .withIndex("${index.name}", (q) => {`,
    `        return ${queryChain};`,
    "      })",
    "      .take(limit);",
    "  },",
    "});",
    "",
  ];
}

/**
 * Generate internal queries file content for a table
 */
export function generateQueries(table: TableDefinition): string {
  const validatorName = `${table.name}Validator`;
  const functionsName = `${table.name}Functions`;

  const lines: string[] = [
    `import { v } from "convex/values";`,
    `import { internalQuery } from "../_generated/server";`,
    `import * as functions from "./${functionsName}";`,
    `import { ${validatorName} } from "./${table.name}Validators";`,
    "",
    "const DEFAULT_LIST_LIMIT = 100;",
    "const MAX_LIST_LIMIT = 500;",
    "",
    "function resolveListLimit(limit: number | undefined): number {",
    '  if (typeof limit !== "number" || Number.isNaN(limit)) {',
    "    return DEFAULT_LIST_LIMIT;",
    "  }",
    "  const normalized = Math.trunc(limit);",
    "  if (normalized < 1) {",
    "    return 1;",
    "  }",
    "  return Math.min(normalized, MAX_LIST_LIMIT);",
    "}",
    "",
    "/**",
    ` * Internal queries for ${table.name} table.`,
    ` * These use the helper functions from ${functionsName}.`,
    " */",
    "",
    "/**",
    ` * Get a ${table.name} document by ID.`,
    " */",
    "export const getById = internalQuery({",
    "  args: {",
    `    id: v.id("${table.name}"),`,
    "  },",
    `  returns: v.union(${validatorName}, v.null()),`,
    "  handler: async (ctx, args) => {",
    "    return await functions.getById(ctx.db, args.id);",
    "  },",
    "});",
    "",
  ];

  // Generate getByIndex queries
  for (const index of table.indexes) {
    lines.push(...generateGetByIndexQuery(table, index, validatorName));
  }

  // list query
  lines.push(
    "/**",
    ` * List all ${table.name} documents.`,
    " */",
    "export const list = internalQuery({",
    "  args: {",
    "    limit: v.optional(v.number()),",
    "  },",
    `  returns: v.array(${validatorName}),`,
    "  handler: async (ctx, args) => {",
    "    const limit = resolveListLimit(args.limit);",
    `    return await ctx.db.query("${table.name}").take(limit);`,
    "  },",
    "});",
    ""
  );

  // Generate listByIndex queries
  for (const index of table.indexes) {
    lines.push(...generateListByIndexQuery(table, index, validatorName));
  }

  return lines.join("\n");
}
