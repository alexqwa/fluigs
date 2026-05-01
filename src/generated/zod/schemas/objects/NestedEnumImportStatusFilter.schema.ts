import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ImportStatusSchema } from '../enums/ImportStatus.schema'

const nestedenumimportstatusfilterSchema = z.object({
  equals: ImportStatusSchema.optional(),
  in: ImportStatusSchema.array().optional(),
  notIn: ImportStatusSchema.array().optional(),
  not: z.union([ImportStatusSchema, z.lazy(() => NestedEnumImportStatusFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumImportStatusFilterObjectSchema: z.ZodType<Prisma.NestedEnumImportStatusFilter> = nestedenumimportstatusfilterSchema as unknown as z.ZodType<Prisma.NestedEnumImportStatusFilter>;
export const NestedEnumImportStatusFilterObjectZodSchema = nestedenumimportstatusfilterSchema;
