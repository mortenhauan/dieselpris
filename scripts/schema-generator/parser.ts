/**
 * Schema parser using ts-morph to extract table definitions from schema.ts.
 */

import { type CallExpression, Node, Project } from "ts-morph";
import type { Index, TableDefinition, TableField } from "./types";

/**
 * Extract validator code from a node.
 * Returns the text representation of the validator.
 */
function extractValidatorCode(node: Node): string {
  return node.getText();
}

/**
 * Find defineSchema call from export default statement
 */
function findDefineSchemaFromStatements(
  sourceFile: ReturnType<Project["addSourceFileAtPath"]>
): CallExpression | null {
  for (const stmt of sourceFile.getStatements()) {
    if (!Node.isExportAssignment(stmt) || stmt.isExportEquals()) {
      continue;
    }
    const expr = stmt.getExpression();
    if (!Node.isCallExpression(expr)) {
      continue;
    }
    const callExpr = expr.getExpression();
    if (Node.isIdentifier(callExpr) && callExpr.getText() === "defineSchema") {
      return expr;
    }
  }
  return null;
}

/**
 * Find defineSchema call from default export symbol
 */
function findDefineSchemaFromSymbol(
  sourceFile: ReturnType<Project["addSourceFileAtPath"]>
): CallExpression | null {
  const defaultExport = sourceFile.getDefaultExportSymbol();
  if (!defaultExport) {
    return null;
  }
  const defaultExportNode = defaultExport.getValueDeclaration();
  if (Node.isVariableDeclaration(defaultExportNode)) {
    const initializer = defaultExportNode.getInitializer();
    if (initializer && Node.isCallExpression(initializer)) {
      return initializer;
    }
  } else if (Node.isExportAssignment(defaultExportNode)) {
    const expression = defaultExportNode.getExpression();
    if (Node.isCallExpression(expression)) {
      return expression;
    }
  }
  return null;
}

/**
 * Find the base defineTable call in a chain of method calls
 */
function findDefineTableCall(
  tableValue: CallExpression
): CallExpression | null {
  let defineTableCall: CallExpression = tableValue;
  let current: Node = tableValue;

  while (Node.isCallExpression(current)) {
    const expr = current.getExpression();
    if (Node.isIdentifier(expr) && expr.getText() === "defineTable") {
      defineTableCall = current;
      break;
    }
    if (Node.isPropertyAccessExpression(expr)) {
      current = expr.getExpression();
    } else {
      break;
    }
  }

  const defineTableExpr = defineTableCall.getExpression();
  if (
    !Node.isIdentifier(defineTableExpr) ||
    defineTableExpr.getText() !== "defineTable"
  ) {
    return null;
  }
  return defineTableCall;
}

/**
 * Extract fields from a table definition object
 */
function extractTableFields(tableArg: Node): TableField[] {
  if (!Node.isObjectLiteralExpression(tableArg)) {
    return [];
  }
  const fields: TableField[] = [];
  for (const fieldProperty of tableArg.getProperties()) {
    if (!Node.isPropertyAssignment(fieldProperty)) {
      continue;
    }
    const fieldName = fieldProperty.getName();
    const fieldValue = fieldProperty.getInitializer();
    if (!fieldValue) {
      continue;
    }
    const validator = extractValidatorCode(fieldValue);
    const isOptional = validator.startsWith("v.optional(");
    fields.push({ name: fieldName, validator, isOptional });
  }
  return fields;
}

/**
 * Extract index information from an index call expression
 */
function extractIndexFromCall(node: CallExpression): Index | null {
  const args = node.getArguments();
  if (args.length < 2) {
    return null;
  }
  const indexNameNode = args[0];
  const indexFieldsNode = args[1];
  if (
    !(
      Node.isStringLiteral(indexNameNode) &&
      Node.isArrayLiteralExpression(indexFieldsNode)
    )
  ) {
    return null;
  }
  const indexName = indexNameNode.getLiteralValue() as string;
  const indexFields: string[] = [];
  for (const element of indexFieldsNode.getElements()) {
    if (Node.isStringLiteral(element)) {
      indexFields.push(element.getLiteralValue() as string);
    }
  }
  return { name: indexName, fields: indexFields };
}

/**
 * Recursively find all .index() calls in a call expression chain
 */
function collectIndexCalls(node: Node, indexes: Index[]): void {
  if (!Node.isCallExpression(node)) {
    return;
  }
  const expr = node.getExpression();
  if (!Node.isPropertyAccessExpression(expr)) {
    return;
  }
  if (expr.getName() === "index") {
    const index = extractIndexFromCall(node);
    if (index) {
      indexes.push(index);
    }
  }
  collectIndexCalls(expr.getExpression(), indexes);
}

/**
 * Parse a single table property and return its definition
 */
function parseTableProperty(property: Node): TableDefinition | null {
  if (!Node.isPropertyAssignment(property)) {
    return null;
  }
  const tableName = property.getName();
  const tableValue = property.getInitializer();
  if (!(tableValue && Node.isCallExpression(tableValue))) {
    return null;
  }
  const defineTableCall = findDefineTableCall(tableValue);
  if (!defineTableCall) {
    return null;
  }
  const tableArg = defineTableCall.getArguments()[0];
  if (!tableArg) {
    throw new Error(`Table "${tableName}" has no defineTable argument.`);
  }
  if (!Node.isObjectLiteralExpression(tableArg)) {
    throw new Error(
      `Table "${tableName}" uses unsupported defineTable format (${tableArg.getKindName()}). ` +
        "Only defineTable({ ...fields }) is currently supported by the generator."
    );
  }
  const fields = extractTableFields(tableArg);
  const indexes: Index[] = [];
  collectIndexCalls(tableValue, indexes);
  return { name: tableName, fields, indexes };
}

/**
 * Parse schema.ts and extract table definitions
 */
export function parseSchema(schemaPath: string): TableDefinition[] {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(schemaPath);

  const defineSchemaCall =
    findDefineSchemaFromStatements(sourceFile) ??
    findDefineSchemaFromSymbol(sourceFile);

  if (!defineSchemaCall) {
    throw new Error("Could not find defineSchema call in default export");
  }

  const schemaArg = defineSchemaCall.getArguments()[0];
  if (!(schemaArg && Node.isObjectLiteralExpression(schemaArg))) {
    throw new Error("defineSchema argument is not an object literal");
  }

  const tables: TableDefinition[] = [];
  for (const property of schemaArg.getProperties()) {
    const table = parseTableProperty(property);
    if (table) {
      tables.push(table);
    }
  }
  return tables;
}
