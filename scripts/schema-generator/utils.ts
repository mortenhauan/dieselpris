/**
 * Utility functions for string manipulation and code generation helpers.
 */

import type { Index, TableDefinition } from "./types";

// Regex pattern for extracting table name from v.id()
const VID_PATTERN_REGEX = /v\.id\("([^"]+)"\)/;

// Regex pattern for extracting literal value from v.literal()
const LITERAL_PATTERN_REGEX = /v\.literal\("([^"]+)"\)/;

/**
 * Split comma-separated arguments while respecting nested parentheses/braces/brackets.
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Small parser utility for nested validator expressions.
function splitTopLevelArgs(input: string): string[] {
  const result: string[] = [];
  let current = "";
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;
  let inString = false;
  let stringChar = "";

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const prev = i > 0 ? input[i - 1] : "";

    if (
      (char === '"' || char === "'" || char === "`") &&
      !inString &&
      prev !== "\\"
    ) {
      inString = true;
      stringChar = char;
      current += char;
      continue;
    }

    if (char === stringChar && inString && prev !== "\\") {
      inString = false;
      stringChar = "";
      current += char;
      continue;
    }

    if (inString) {
      current += char;
      continue;
    }

    if (char === "(") {
      parenDepth++;
    }
    if (char === ")") {
      parenDepth--;
    }
    if (char === "{") {
      braceDepth++;
    }
    if (char === "}") {
      braceDepth--;
    }
    if (char === "[") {
      bracketDepth++;
    }
    if (char === "]") {
      bracketDepth--;
    }

    if (
      char === "," &&
      parenDepth === 0 &&
      braceDepth === 0 &&
      bracketDepth === 0
    ) {
      const trimmed = current.trim();
      if (trimmed.length > 0) {
        result.push(trimmed);
      }
      current = "";
      continue;
    }

    current += char;
  }

  const trimmed = current.trim();
  if (trimmed.length > 0) {
    result.push(trimmed);
  }
  return result;
}

/**
 * Get function argument content from expressions like fn(...)
 */
function getCallArgs(expr: string): string | null {
  const start = expr.indexOf("(");
  const end = expr.lastIndexOf(")");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }
  return expr.slice(start + 1, end).trim();
}

/**
 * Convert snake_case to camelCase
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Convert camelCase to PascalCase
 */
export function camelToPascal(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Extract literal value from v.literal("value")
 */
function extractLiteralValue(validator: string): string | null {
  const literalMatch = validator.match(LITERAL_PATTERN_REGEX);
  return literalMatch ? literalMatch[1] : null;
}

/**
 * Extract TypeScript type from a validator string
 */
// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Centralized validator mapping keeps generated type behavior in one place.
export function validatorToTsType(validator: string): string {
  const trimmedValidator = validator.trim();

  if (trimmedValidator.startsWith("v.optional(")) {
    const optionalArgs = getCallArgs(trimmedValidator);
    if (!optionalArgs) {
      return "unknown";
    }
    return validatorToTsType(optionalArgs);
  }

  if (trimmedValidator.startsWith("v.id(")) {
    const match = trimmedValidator.match(VID_PATTERN_REGEX);
    if (match) {
      return `Id<"${match[1]}">`;
    }
  }
  if (trimmedValidator === "v.number()") {
    return "number";
  }
  if (trimmedValidator === "v.boolean()") {
    return "boolean";
  }
  if (trimmedValidator === "v.string()") {
    return "string";
  }
  if (trimmedValidator === "v.int64()") {
    return "bigint";
  }
  if (trimmedValidator === "v.bytes()") {
    return "ArrayBuffer";
  }
  if (trimmedValidator === "v.null()") {
    return "null";
  }
  if (trimmedValidator === "v.any()") {
    return "unknown";
  }

  if (trimmedValidator.startsWith("v.array(")) {
    const arrayArgs = getCallArgs(trimmedValidator);
    if (!arrayArgs) {
      return "Array<unknown>";
    }
    return `Array<${validatorToTsType(arrayArgs)}>`;
  }

  if (trimmedValidator.startsWith("v.record(")) {
    const recordArgs = getCallArgs(trimmedValidator);
    if (!recordArgs) {
      return "Record<string, unknown>";
    }
    const [keyArg, valueArg] = splitTopLevelArgs(recordArgs);
    const keyType = keyArg ? validatorToTsType(keyArg) : "string";
    const valueType = valueArg ? validatorToTsType(valueArg) : "unknown";
    const normalizedKeyType =
      keyType === "number" || keyType === "symbol" ? keyType : "string";
    return `Record<${normalizedKeyType}, ${valueType}>`;
  }

  if (trimmedValidator.startsWith("v.object(")) {
    return "Record<string, unknown>";
  }

  // Handle v.union() with literals and other validators
  if (trimmedValidator.startsWith("v.union(")) {
    const unionArgs = getCallArgs(trimmedValidator);
    if (!unionArgs) {
      return "unknown";
    }
    const unionParts = splitTopLevelArgs(unionArgs).map((part) =>
      validatorToTsType(part)
    );
    if (unionParts.length === 0) {
      return "unknown";
    }
    return unionParts.join(" | ");
  }
  // Handle single v.literal()
  const literalValue = extractLiteralValue(trimmedValidator);
  if (literalValue !== null) {
    return `"${literalValue}"`;
  }

  // Keep backward-compatible fallback, but avoid any unsafe assumptions.
  return "unknown";
}

/**
 * Get function name from index name (e.g., "by_user_id" -> "getByUserId")
 */
export function getIndexFunctionName(indexName: string): string {
  const nameWithoutPrefix = indexName.startsWith("by_")
    ? indexName.slice(3)
    : indexName;
  return `getBy${camelToPascal(snakeToCamel(nameWithoutPrefix))}`;
}

/**
 * Get list function name from index name (e.g., "by_user_id" -> "listByUserId")
 */
export function getIndexListFunctionName(indexName: string): string {
  const nameWithoutPrefix = indexName.startsWith("by_")
    ? indexName.slice(3)
    : indexName;
  return `listBy${camelToPascal(snakeToCamel(nameWithoutPrefix))}`;
}

/**
 * Build the query chain for index fields
 */
export function buildIndexQueryChain(
  fields: string[],
  withArgs = false
): string {
  const prefix = withArgs ? "args." : "";
  if (fields.length === 1) {
    return `q.eq("${fields[0]}", ${prefix}${fields[0]})`;
  }
  let chain = `q.eq("${fields[0]}", ${prefix}${fields[0]})`;
  for (let i = 1; i < fields.length; i++) {
    chain += `.eq("${fields[i]}", ${prefix}${fields[i]})`;
  }
  return chain;
}

/**
 * Generate parameter list for index fields
 */
export function generateIndexParams(
  table: TableDefinition,
  index: Index
): string[] {
  const params: string[] = [];
  for (const fieldName of index.fields) {
    const field = table.fields.find((f) => f.name === fieldName);
    if (field) {
      let paramType = validatorToTsType(field.validator);
      // If the validator is optional, add undefined to the type
      if (field.validator.startsWith("v.optional(")) {
        paramType = `${paramType} | undefined`;
      }
      params.push(`${fieldName}: ${paramType}`);
    } else {
      params.push(`${fieldName}: string`);
    }
  }
  return params;
}

/**
 * Generate validator args for index fields
 */
export function generateIndexValidatorArgs(
  table: TableDefinition,
  index: Index
): string[] {
  const args: string[] = [];
  for (const fieldName of index.fields) {
    const field = table.fields.find((f) => f.name === fieldName);
    if (field) {
      args.push(`    ${fieldName}: ${field.validator},`);
    } else {
      args.push(`    ${fieldName}: v.string(),`);
    }
  }
  return args;
}

/**
 * Generate field type definitions for a table
 */
export function generateFieldTypes(
  table: TableDefinition,
  includeOptional: boolean
): string[] {
  const lines: string[] = [];
  for (const field of table.fields) {
    const tsType = validatorToTsType(field.validator);
    const optional = includeOptional && field.isOptional ? "?" : "";
    lines.push(`    ${field.name}${optional}: ${tsType};`);
  }
  return lines;
}
