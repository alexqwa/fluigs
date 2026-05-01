import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ImportStatusSchema } from '../enums/ImportStatus.schema';
import { NestedEnumImportStatusFilterObjectSchema as NestedEnumImportStatusFilterObjectSchema } from './NestedEnumImportStatusFilter.schema'

const makeSchema = () => z.object({
  equals: ImportStatusSchema.optional(),
  in: ImportStatusSchema.array().optional(),
  notIn: ImportStatusSchema.array().optional(),
  not: z.union([ImportStatusSchema, z.lazy(() => NestedEnumImportStatusFilterObjectSchema)]).optional()
}).strict();
export const EnumImportStatusFilterObjectSchema: z.ZodType<Prisma.EnumImportStatusFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumImportStatusFilter>;
export const EnumImportStatusFilterObjectZodSchema = makeSchema();
