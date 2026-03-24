/**
 * Type definitions for the schema code generator.
 */

export interface TableField {
  isOptional: boolean;
  name: string;
  validator: string;
}

export interface Index {
  fields: string[];
  name: string;
}

export interface TableDefinition {
  fields: TableField[];
  indexes: Index[];
  name: string;
}
