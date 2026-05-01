import * as z from 'zod';

export const ImportLogScalarFieldEnumSchema = z.enum(['id', 'filename', 'status', 'totalRows', 'inserted', 'updated', 'skipped', 'errors', 'errorDetail', 'createdAt', 'finishedAt'])

export type ImportLogScalarFieldEnum = z.infer<typeof ImportLogScalarFieldEnumSchema>;