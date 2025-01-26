import { join } from 'path';
import { recase } from '@kristiandupont/recase';
import { generateIndexFile } from 'kanel';
import { generateZodSchemas } from 'kanel-zod';
import { makeKyselyHook } from 'kanel-kysely';

// Convert snake_case to PascalCase for type names
const toPascalCase = recase('snake', 'pascal');

const outputPath = './types/supabase';

/** @type {import('kanel').Config} */
const config = {
  // Connection details from your Supabase project
  connection: {
    host: process.env.SUPABASE_DB_HOST,
    port: Number(process.env.SUPABASE_DB_PORT),
    user: process.env.SUPABASE_DB_USER,
    password: process.env.SUPABASE_DB_PASSWORD,
    database: process.env.SUPABASE_DB_NAME,
  },

  // Only generate types for public and n8n schemas
  schemas: ['public', 'n8n'],

  // Output configuration
  outputPath,
  preDeleteOutputFolder: true,

  // Generate types with proper naming conventions
  getMetadata: (details) => ({
    name: toPascalCase(details.name),
    comment: [details.comment].filter(Boolean),
    path: join(outputPath, details.schemaName, toPascalCase(details.name)),
  }),

  // Add database type comments to properties
  getPropertyMetadata: (property) => ({
    name: property.name,
    comment: [`Database type: ${property.expandedType}`, property.comment].filter(Boolean),
  }),

  // Generate branded types for IDs
  generateIdentifierType: (column, details) => {
    const name = toPascalCase(details.name) + 'Id';
    return {
      declarationType: 'typeDeclaration',
      name,
      exportAs: 'named',
      typeDefinition: [`number & { __flavor?: '${name}' }`],
      comment: [`Identifier type for ${details.name}`],
    };
  },

  // Generate Zod schemas and Kysely types
  preRenderHooks: [generateZodSchemas, makeKyselyHook(), generateIndexFile],

  // Resolve view types properly
  resolveViews: true,
};

export default config;
