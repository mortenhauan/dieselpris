# Recursive Schema Generation Update

## Overview

The schema generator has been updated to support **multiple schema files** throughout the codebase. It now recursively searches for all `schema.ts` files in the `convex/` directory and generates code in `./generated` folders relative to each schema file.

## What Changed

### Before
- Single schema file: `convex/schema.ts`
- Generated files: `convex/generated/`
- Hardcoded paths to specific schema location

### After
- **Multiple schema files**: Finds all `schema.ts` files recursively
- **Relative generation**: Creates `./generated` folder next to each schema
- **Dynamic discovery**: No hardcoded paths, automatically discovers schemas

## Key Features

### 1. Recursive Schema Discovery
The generator now includes a `findSchemaFiles()` function that:
- Recursively traverses the `convex/` directory
- Finds all `schema.ts` files
- Skips generated directories (`generated`, `_generated`)
- Skips `node_modules` and hidden directories

### 2. Relative Output Paths
For each schema file found, the generator:
- Determines the schema's directory
- Creates a `./generated` folder in that directory
- Generates all files relative to the schema location

### 3. Enhanced Watch Mode
Watch mode now:
- Watches all `schema.ts` files using glob pattern `**/schema.ts`
- Detects new schema files (on `add` event)
- Regenerates only affected schema on change
- Ignores generated and system directories

## Example Structure

```
convex/
├── schema.ts                          # Main application schema
├── generated/                         # Generated for main schema
│   ├── usersValidators.ts
│   ├── usersFunctions.ts
│   ├── usersInternalMutation.ts
│   ├── usersInternalQueries.ts
│   ├── conversationsValidators.ts
│   └── ... (48 files for 12 tables)
│
└── hydrobase/                         # Hydrobase subdomain
    ├── schema.ts                      # Hydrobase schema
    ├── convex.config.ts               # Hydrobase config
    └── generated/                     # Generated for hydrobase schema
        ├── providersValidators.ts
        ├── providersFunctions.ts
        ├── providersInternalMutation.ts
        ├── providersInternalQueries.ts
        ├── locationsValidators.ts
        └── ... (8 files for 2 tables)
```

## Usage

### Generate All Schemas
```bash
pnpm run generate:schema
```

Output:
```
Searching for schema.ts files...
Found 2 schema file(s):
  - hydrobase/schema.ts
  - schema.ts

Processing hydrobase/schema.ts...
  Found 2 tables
  ✓ Generated files for table: providers
  ✓ Generated files for table: locations

Processing schema.ts...
  Found 12 tables
  ✓ Generated files for table: users
  ✓ Generated files for table: conversations
  ...

✅ Code generation complete! Generated 56 files from 2 schema(s).
```

### Watch Mode
```bash
pnpm run generate:schema:watch
```

The watcher will:
- Monitor all `schema.ts` files
- Regenerate on changes
- Detect new schema files automatically

## Implementation Details

### Modified Files

#### `scripts/schema-generator/index.ts`
- Added `findSchemaFiles()` - Recursive schema file discovery
- Modified `generateTableFiles()` - Now takes `generatedDir` parameter
- Added `generateForSchemaFile()` - Handles single schema processing
- Updated `generateAll()` - Processes all discovered schemas
- Enhanced `main()` - Watch mode with glob pattern

### Code Changes

**Import additions:**
```typescript
import { readdirSync, statSync } from "node:fs";
import { relative } from "node:path";
```

**New function:**
```typescript
function findSchemaFiles(dir: string): string[] {
  // Recursively finds all schema.ts files
  // Skips: generated/, _generated/, node_modules/, hidden dirs
}
```

**Updated constants:**
```typescript
// Before:
const SCHEMA_PATH = join(currentDir, "../../convex/schema.ts");
const GENERATED_DIR = join(currentDir, "../../convex/generated");

// After:
const CONVEX_DIR = join(currentDir, "../../convex");
// Paths are now computed per-schema
```

## Benefits

1. **Modularity**: Different parts of the codebase can have their own schemas
2. **Isolation**: Generated code stays close to its schema definition
3. **Scalability**: Easy to add new domains/modules with their own schemas
4. **Maintainability**: Each schema's generated code is self-contained

## Migration Guide

If you have an existing project with a single schema:

1. **No action needed!** The generator is backward compatible
2. Your existing `convex/schema.ts` → `convex/generated/` still works
3. To add new schemas, just create `schema.ts` in a subdirectory:
   ```
   convex/
   ├── schema.ts          # Existing main schema
   ├── generated/         # Existing generated files
   └── newdomain/
       └── schema.ts      # New schema
   ```
4. Run `pnpm run generate:schema` to generate for the new schema

## Testing

All existing tests still pass:
```bash
pnpm test:schema-generator
```

Result:
```
✓ scripts/schema-generator/__tests__/parser.test.ts (1 test)
✓ scripts/schema-generator/__tests__/generators.test.ts (25 tests)

Test Files  2 passed (2)
     Tests  26 passed (26)
```

## Future Enhancements

Possible future improvements:
- Option to specify custom output directory names (not just `generated/`)
- Support for schema files with different names (e.g., `tables.ts`)
- Parallel processing of multiple schemas for better performance
- Schema dependency graph for ordered generation

## Type Safety and Query Safety Updates

- Generated `list` and `listBy...` queries now accept optional `limit` and enforce sane bounds.
- Optional fields in generated update mutations are no longer double-wrapped.
- Validator-to-TypeScript mapping now includes richer conversions (`v.int64`, `v.array`, `v.record`, etc.).
- Fallback type inference uses `unknown` instead of `any` when validator shapes are ambiguous.

## Parser Guardrails

- The generator currently supports `defineTable({ ...fields })`.
- If a table uses an unsupported non-object `defineTable(...)` form, parsing now fails fast with a targeted error message instead of silently skipping that table.
