/**
 * Generator for table helper functions files.
 */

import type { Index, TableDefinition } from "../types";
import {
  buildIndexQueryChain,
  camelToPascal,
  generateIndexParams,
  getIndexFunctionName,
} from "../utils";

/**
 * Generate getByIndex function for a single index
 */
function generateGetByIndexFunction(
  table: TableDefinition,
  index: Index
): string[] {
  const functionName = getIndexFunctionName(index.name);
  const params = generateIndexParams(table, index);
  const queryChain = buildIndexQueryChain(index.fields, false);

  return [
    "/**",
    ` * Get a document by ${index.name} index.`,
    " * Returns null if not found.",
    " */",
    `export async function ${functionName}(`,
    "  db: DatabaseReader,",
    `  ${params.join(",\n  ")}`,
    `): Promise<Id<"${table.name}"> extends never ? never : (Awaited<ReturnType<typeof db.get<"${table.name}">>> | null)> {`,
    "  return await db",
    `    .query("${table.name}")`,
    `    .withIndex("${index.name}", (q) => {`,
    `      return ${queryChain};`,
    "    })",
    "    .unique();",
    "}",
    "",
  ];
}

/**
 * Generate functions file content for a table
 */
export function generateFunctions(table: TableDefinition): string {
  const tableDocName = `${camelToPascal(table.name)}Doc`;
  const tableTypeName = `${camelToPascal(table.name)}Data`;
  const tablePatchName = `${camelToPascal(table.name)}Patch`;

  const lines: string[] = [
    `import type { Doc, Id } from "../_generated/dataModel";`,
    `import type { DatabaseReader, DatabaseWriter } from "../_generated/server";`,
    "",
    `type ${tableDocName} = Doc<"${table.name}">;`,
    `type ${tableTypeName} = Omit<${tableDocName}, "_id" | "_creationTime">;`,
    "",
    `type ${tablePatchName} = Partial<${tableTypeName}>;`,
    "",
    "/**",
    ` * Helper functions for ${table.name} table operations.`,
    " * These are pure database operations without Convex function wrappers.",
    " */",
    "",
    "/**",
    " * Get a document by ID.",
    " * Returns null if not found.",
    " */",
    "export async function getById(",
    "  db: DatabaseReader,",
    `  id: Id<"${table.name}">`,
    `): Promise<Id<"${table.name}"> extends never ? never : (Awaited<ReturnType<typeof db.get<"${table.name}">>> | null)> {`,
    "  return await db.get(id);",
    "}",
    "",
  ];

  // Generate getByIndex functions
  for (const index of table.indexes) {
    lines.push(...generateGetByIndexFunction(table, index));
  }

  // updateById
  lines.push(
    "/**",
    " * Update a document by ID with partial data.",
    " * Only updates fields that are provided (not undefined).",
    " */",
    "export async function updateById(",
    "  db: DatabaseWriter,",
    `  id: Id<"${table.name}">,`,
    `  updates: ${tablePatchName}`,
    "): Promise<void> {",
    `  const cleanUpdates: ${tablePatchName} = Object.fromEntries(`,
    "    Object.entries(updates).filter(([_, v]) => v !== undefined)",
    `  ) as ${tablePatchName};`,
    "  if (Object.keys(cleanUpdates).length > 0) {",
    "    await db.patch(id, cleanUpdates);",
    "  }",
    "}",
    "",
    "/**",
    " * Update a document by ID and preserve explicit undefined values.",
    " * Use this when you intentionally want to clear optional fields.",
    " */",
    "export async function updateByIdWithUndefined(",
    "  db: DatabaseWriter,",
    `  id: Id<"${table.name}">,`,
    `  updates: ${tablePatchName}`,
    "): Promise<void> {",
    "  await db.patch(id, updates);",
    "}",
    "",
    "/**",
    " * Delete a document by ID.",
    " */",
    "export async function deleteById(",
    "  db: DatabaseWriter,",
    `  id: Id<"${table.name}">`,
    "): Promise<void> {",
    "  await db.delete(id);",
    "}",
    "",
    "/**",
    ` * Get a document by ID, or create it if it doesn't exist.`,
    " * Returns the document ID.",
    " */",
    "export async function getOrUpdateById(",
    "  db: DatabaseWriter,",
    `  id: Id<"${table.name}">,`,
    `  data: ${tableTypeName}`,
    `): Promise<Id<"${table.name}">> {`,
    "  const existing = await db.get(id);",
    "  if (existing) {",
    "    await updateById(db, id, data);",
    "    return id;",
    "  }",
    `  return await db.insert("${table.name}", data);`,
    "}",
    ""
  );

  return lines.join("\n");
}
