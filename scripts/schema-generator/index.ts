/**
 * Schema Code Generator - Main orchestration module.
 *
 * Recursively finds all schema.ts files and generates:
 * - tableNameValidators.ts - Validators matching schema
 * - tableNameFunctions.ts - Helper functions (get, update, delete, etc.)
 * - tableNameInternalMutation.ts - Internal mutations
 * - tableNameInternalQueries.ts - Internal queries
 *
 * Generated files are placed in ./generated folders relative to each schema.ts file.
 */

import {
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, relative } from "node:path";
import chokidar from "chokidar";
import { generateFunctions } from "./generators/functions";
import { generateMutations } from "./generators/mutations";
import { generateQueries } from "./generators/queries";
import { generateValidator } from "./generators/validator";
import { parseSchema } from "./parser";
import type { TableDefinition } from "./types";

// Regex for stripping leading slash on Windows
const PATH_START_SLASH_REGEX = /^\//;

/**
 * Get directory using import.meta.url for ES modules
 */
function getDirname(): string {
  try {
    if (typeof import.meta.dirname !== "undefined") {
      return import.meta.dirname;
    }
  } catch {
    // __dirname not available in ES modules
  }
  const url = new URL(import.meta.url);
  const filePath =
    url.pathname.startsWith("/") && process.platform !== "win32"
      ? url.pathname
      : url.pathname.replace(PATH_START_SLASH_REGEX, "");
  return dirname(filePath);
}

const currentDir = getDirname();
const CONVEX_DIR = join(currentDir, "../../convex");

/**
 * Recursively find all schema.ts files in a directory
 */
function findSchemaFiles(dir: string): string[] {
  const schemaFiles: string[] = [];

  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip generated, _generated, node_modules, and hidden directories
        if (
          entry === "generated" ||
          entry === "_generated" ||
          entry === "node_modules" ||
          entry.startsWith(".")
        ) {
          continue;
        }
        // Recursively search subdirectories
        schemaFiles.push(...findSchemaFiles(fullPath));
      } else if (stat.isFile() && entry === "schema.ts") {
        schemaFiles.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return schemaFiles;
}

/**
 * Generate all files for a table
 */
function generateTableFiles(
  table: TableDefinition,
  generatedDir: string
): void {
  if (!existsSync(generatedDir)) {
    mkdirSync(generatedDir, { recursive: true });
  }

  writeFileSync(
    join(generatedDir, `${table.name}Validators.ts`),
    generateValidator(table)
  );

  writeFileSync(
    join(generatedDir, `${table.name}Functions.ts`),
    generateFunctions(table)
  );

  writeFileSync(
    join(generatedDir, `${table.name}InternalMutation.ts`),
    generateMutations(table)
  );

  writeFileSync(
    join(generatedDir, `${table.name}InternalQueries.ts`),
    generateQueries(table)
  );

  console.log(`  ✓ Generated files for table: ${table.name}`);
}

/**
 * Generate code for a single schema file
 */
function generateForSchemaFile(schemaPath: string): number {
  const schemaDir = dirname(schemaPath);
  const generatedDir = join(schemaDir, "generated");
  const relativePath = relative(CONVEX_DIR, schemaPath);

  console.log(`\nProcessing ${relativePath}...`);

  try {
    const tables = parseSchema(schemaPath);

    if (tables.length === 0) {
      console.warn(
        `  ⚠️  Warning: No tables found in ${relativePath}. Check that the schema is correctly formatted.`
      );
      return 0;
    }

    console.log(`  Found ${tables.length} tables`);

    // Clear and recreate generated directory
    if (existsSync(generatedDir)) {
      rmSync(generatedDir, { recursive: true, force: true });
    }
    mkdirSync(generatedDir, { recursive: true });

    for (const table of tables) {
      generateTableFiles(table, generatedDir);
    }

    return tables.length * 4;
  } catch (error) {
    console.error(`  ✗ Error processing ${relativePath}:`, error);
    if (error instanceof Error) {
      console.error(`  ${error.message}`);
    }
    return 0;
  }
}

/**
 * Generate all files from all schema files
 */
function generateAll(): void {
  try {
    console.log("Searching for schema.ts files...");
    const schemaFiles = findSchemaFiles(CONVEX_DIR);

    if (schemaFiles.length === 0) {
      console.warn("⚠️  Warning: No schema.ts files found in convex directory.");
      return;
    }

    console.log(`Found ${schemaFiles.length} schema file(s):`);
    for (const schemaFile of schemaFiles) {
      console.log(`  - ${relative(CONVEX_DIR, schemaFile)}`);
    }

    let totalFilesGenerated = 0;
    for (const schemaFile of schemaFiles) {
      totalFilesGenerated += generateForSchemaFile(schemaFile);
    }

    console.log(
      `\n✅ Code generation complete! Generated ${totalFilesGenerated} files from ${schemaFiles.length} schema(s).`
    );
  } catch (error) {
    console.error("Error generating code:", error);
    if (error instanceof Error) {
      console.error(error.message);
      console.error(error.stack);
    }
    process.exit(1);
  }
}

/**
 * Main entry point
 */
export function main(): void {
  const watchMode = process.argv.includes("--watch");

  if (watchMode) {
    console.log("Watching for schema.ts changes...");
    generateAll();

    // Watch for all schema.ts files in the convex directory
    const watcher = chokidar.watch(join(CONVEX_DIR, "**/schema.ts"), {
      persistent: true,
      ignoreInitial: true,
      ignored: [
        "**/node_modules/**",
        "**/generated/**",
        "**/_generated/**",
        "**/.*/**",
      ],
    });

    watcher.on("change", (path) => {
      console.log(`\n📝 Schema changed: ${relative(CONVEX_DIR, path)}`);
      generateForSchemaFile(path);
    });

    watcher.on("add", (path) => {
      console.log(`\n➕ New schema file: ${relative(CONVEX_DIR, path)}`);
      generateForSchemaFile(path);
    });

    watcher.on("error", (error) => {
      console.error("Watcher error:", error);
    });
  } else {
    generateAll();
  }
}
