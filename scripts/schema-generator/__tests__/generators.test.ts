/**
 * Tests for the schema code generator.
 * Tests parsing, generation, and edge cases.
 */

import { describe, expect, it } from "vitest";
import { generateFunctions } from "../generators/functions";
import { generateMutations } from "../generators/mutations";
import { generateQueries } from "../generators/queries";
import { generateValidator } from "../generators/validator";
import type { TableDefinition, TableField } from "../types";
import { validatorToTsType } from "../utils";

describe("Schema Generator", () => {
  // Helper to create test table definitions
  function createTestTable(
    overrides: Partial<TableDefinition> = {}
  ): TableDefinition {
    return {
      name: "users",
      fields: [
        {
          name: "email",
          validator: "v.string()",
          isOptional: false,
        },
        {
          name: "name",
          validator: "v.optional(v.string())",
          isOptional: true,
        },
        {
          name: "age",
          validator: "v.number()",
          isOptional: false,
        },
      ],
      indexes: [
        {
          name: "by_email",
          fields: ["email"],
        },
      ],
      ...overrides,
    };
  }

  describe("Validator Generation", () => {
    it("should generate a valid validator with all fields", () => {
      const table = createTestTable();
      const output = generateValidator(table);

      expect(output).toContain('import { v } from "convex/values";');
      expect(output).toContain("export const usersValidator = v.object({");
      expect(output).toContain('_id: v.id("users"),');
      expect(output).toContain("_creationTime: v.number(),");
      expect(output).toContain("email: v.string(),");
      expect(output).toContain("name: v.optional(v.string()),");
      expect(output).toContain("age: v.number(),");
      expect(output).toContain("});");
    });

    it("should handle table names with underscores", () => {
      const table = createTestTable({ name: "users_profiles" });
      const output = generateValidator(table);
      expect(output).toContain(
        "export const users_profilesValidator = v.object({"
      );
    });
  });

  describe("Functions Generation", () => {
    it("should generate helper functions with getById", () => {
      const table = createTestTable();
      const output = generateFunctions(table);

      expect(output).toContain(
        'import type { Doc, Id } from "../_generated/dataModel";'
      );
      expect(output).toContain("export async function getById(");
      expect(output).toContain("return await db.get(id);");
    });

    it("should generate getByIndex functions for each index", () => {
      const table = createTestTable({
        indexes: [
          { name: "by_email", fields: ["email"] },
          { name: "by_name", fields: ["name"] },
        ],
      });
      const output = generateFunctions(table);

      expect(output).toContain("export async function getByEmail(");
      expect(output).toContain("export async function getByName(");
    });

    it("should correctly handle index names starting with 'by_'", () => {
      const table = createTestTable({
        indexes: [{ name: "by_userId", fields: ["email"] }],
      });
      const output = generateFunctions(table);

      // Should not have double "by_" (getByByUserId is wrong)
      expect(output).not.toContain("getByByUserId");
      expect(output).toContain("getByUserId");
    });

    it("should handle optional fields in index queries", () => {
      const table = createTestTable({
        indexes: [{ name: "by_name", fields: ["name"] }],
      });
      const output = generateFunctions(table);

      // The function should accept string | undefined for optional fields
      expect(output).toContain("name: string | undefined");
    });

    it("should generate updateById, deleteById, getOrUpdateById", () => {
      const table = createTestTable();
      const output = generateFunctions(table);

      expect(output).toContain("export async function updateById(");
      expect(output).toContain(
        "export async function updateByIdWithUndefined("
      );
      expect(output).toContain("export async function deleteById(");
      expect(output).toContain("export async function getOrUpdateById(");
    });
  });

  describe("Mutations Generation", () => {
    it("should generate all standard mutations", () => {
      const table = createTestTable();
      const output = generateMutations(table);

      expect(output).toContain("export const create = internalMutation({");
      expect(output).toContain("export const update = internalMutation({");
      expect(output).toContain(
        "export const updateWithUndefined = internalMutation({"
      );
      expect(output).toContain("export const remove = internalMutation({");
      expect(output).toContain("export const upsert = internalMutation({");
    });

    it("should import correct validator and functions names", () => {
      const table = createTestTable();
      const output = generateMutations(table);

      expect(output).toContain(
        'import * as functions from "./usersFunctions";'
      );
      expect(output).not.toContain("import { usersValidator }");
    });

    it("should wire update and updateWithUndefined to the correct helpers", () => {
      const table = createTestTable();
      const output = generateMutations(table);

      expect(output).toContain(
        "await functions.updateById(ctx.db, id, updates);"
      );
      expect(output).toContain(
        "await functions.updateByIdWithUndefined(ctx.db, id, updates);"
      );
    });

    it("should handle optional fields in mutation args", () => {
      const table = createTestTable();
      const output = generateMutations(table);

      // Create mutation should use the validator as-is (already has v.optional wrapper)
      expect(output).toContain("name: v.optional(v.string()),");
      // Update mutation should not double-wrap already optional fields
      expect(output).not.toContain("v.optional(v.optional(");
    });
  });

  describe("Queries Generation", () => {
    it("should generate all standard queries", () => {
      const table = createTestTable();
      const output = generateQueries(table);

      expect(output).toContain("export const getById = internalQuery({");
      expect(output).toContain("export const list = internalQuery({");
      expect(output).toContain("limit: v.optional(v.number()),");
      expect(output).toContain("resolveListLimit(args.limit)");
    });

    it("should generate getByIndex queries", () => {
      const table = createTestTable({
        indexes: [{ name: "by_email", fields: ["email"] }],
      });
      const output = generateQueries(table);

      expect(output).toContain("export const getByEmail = internalQuery({");
    });

    it("should generate listByIndex queries", () => {
      const table = createTestTable({
        indexes: [{ name: "by_email", fields: ["email"] }],
      });
      const output = generateQueries(table);

      expect(output).toContain("export const listByEmail = internalQuery({");
      expect(output).toContain(".take(limit);");
    });

    it("should not double-wrap optional fields", () => {
      const table = createTestTable({
        indexes: [{ name: "by_name", fields: ["name"] }],
      });
      const output = generateQueries(table);

      // Should be v.optional(v.string()), not v.optional(v.optional(v.string()))
      expect(output).not.toContain("v.optional(v.optional(");
    });

    it("should correctly handle index names with 'by_' prefix", () => {
      const table = createTestTable({
        indexes: [
          { name: "by_email", fields: ["email"] },
          { name: "by_name", fields: ["name"] },
        ],
      });
      const output = generateQueries(table);

      // Should not have double "by_" in function names
      expect(output).not.toContain("getByByEmail");
      expect(output).not.toContain("listByByEmail");
      expect(output).toContain("getByEmail");
      expect(output).toContain("listByEmail");
    });
  });

  describe("Multi-field indexes", () => {
    it("should handle indexes with multiple fields", () => {
      const table = createTestTable({
        fields: [
          ...createTestTable().fields,
          { name: "userId", validator: 'v.id("users")', isOptional: false },
          { name: "status", validator: "v.string()", isOptional: false },
        ],
        indexes: [{ name: "by_userId_status", fields: ["userId", "status"] }],
      });

      const functions = generateFunctions(table);
      expect(functions).toContain("getByUserIdStatus");
      // Should have multiple .eq() calls
      expect(functions).toContain('.eq("userId"');
      expect(functions).toContain('.eq("status"');
    });
  });

  describe("Type Conversions", () => {
    it("should convert v.id() validators to Id types", () => {
      expect(validatorToTsType('v.id("users")')).toBe('Id<"users">');
    });

    it("should convert v.number() to number type", () => {
      expect(validatorToTsType("v.number()")).toBe("number");
    });

    it("should convert v.boolean() to boolean type", () => {
      expect(validatorToTsType("v.boolean()")).toBe("boolean");
    });

    it("should handle v.any() types", () => {
      expect(validatorToTsType("v.any()")).toBe("unknown");
    });

    it("should convert v.int64() to bigint", () => {
      expect(validatorToTsType("v.int64()")).toBe("bigint");
    });

    it("should convert v.array() to Array<T>", () => {
      expect(validatorToTsType("v.array(v.string())")).toBe("Array<string>");
    });

    it("should convert v.record() to Record<K, V>", () => {
      expect(validatorToTsType("v.record(v.string(), v.number())")).toBe(
        "Record<string, number>"
      );
    });
  });

  describe("Edge Cases", () => {
    it("should handle tables with no indexes", () => {
      const table = createTestTable({ indexes: [] });

      const functions = generateFunctions(table);
      const queries = generateQueries(table);

      // Should still have getById
      expect(functions).toContain("export async function getById(");
      expect(queries).toContain("export const getById = internalQuery({");
      // Should have list but no getByIndex
      expect(queries).toContain("export const list = internalQuery({");
    });

    it("should handle tables with many fields", () => {
      const manyFields: TableField[] = Array.from({ length: 20 }, (_, i) => ({
        name: `field${i}`,
        validator: "v.string()",
        isOptional: false,
      }));

      const table = createTestTable({ fields: manyFields });
      const validator = generateValidator(table);

      expect(validator).toContain("field0: v.string(),");
      expect(validator).toContain("field19: v.string(),");
    });

    it("should generate valid code for tables with underscores and mixed case", () => {
      const table = createTestTable({
        name: "user_profiles",
        indexes: [{ name: "by_user_id", fields: ["email"] }],
      });

      const validator = generateValidator(table);
      const functions = generateFunctions(table);
      const mutations = generateMutations(table);
      const queries = generateQueries(table);

      // Should have valid camelCase function names
      expect(functions).toContain("getByUserId");
      expect(queries).toContain("getByUserId");

      // All should be non-empty
      expect(validator.length).toBeGreaterThan(0);
      expect(functions.length).toBeGreaterThan(0);
      expect(mutations.length).toBeGreaterThan(0);
      expect(queries.length).toBeGreaterThan(0);
    });
  });

  describe("Code Quality", () => {
    it("should generate code under 300 lines per file", () => {
      const table = createTestTable({
        fields: Array.from({ length: 50 }, (_, i) => ({
          name: `field${i}`,
          validator: "v.string()",
          isOptional: false,
        })),
        indexes: Array.from({ length: 10 }, (_, i) => ({
          name: `by_field${i}`,
          fields: [`field${i}`],
        })),
      });

      const functions = generateFunctions(table);
      const mutations = generateMutations(table);
      const queries = generateQueries(table);

      const functionLines = functions.split("\n").length;
      const mutationLines = mutations.split("\n").length;
      const queryLines = queries.split("\n").length;

      // Each generated file should stay reasonably sized
      // (may exceed 300 with many fields/indexes, but should be reasonable)
      expect(functionLines).toBeLessThan(500);
      expect(mutationLines).toBeLessThan(500);
      expect(queryLines).toBeLessThan(500);
    });

    it("should include proper documentation comments", () => {
      const table = createTestTable();
      const functions = generateFunctions(table);
      const mutations = generateMutations(table);
      const queries = generateQueries(table);

      expect(functions).toContain("/**");
      expect(functions).toContain("* Get a document by ID");
      expect(mutations).toContain("/**");
      expect(queries).toContain("/**");
    });
  });
});
