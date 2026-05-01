import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ImportStatusSchema } from '../enums/ImportStatus.schema';
import { NestedEnumImportStatusWithAggregatesFilterObjectSchema as NestedEnumImportStatusWithAggregatesFilterObjectSchema } from './NestedEnumImportStatusWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumImportStatusFilterObjectSchema as NestedEnumImportStatusFilterObjectSchema } from './NestedEnumImportStatusFilter.schema'

const makeSchema = () => z.object({
  equals: ImportStatusSchema.optional(),
  in: ImportStatusSchema.array().optional(),
  notIn: ImportStatusSchema.array().optional(),
  not: z.union([ImportStatusSchema, z.lazy(() => NestedEnumImportStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumImportStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumImportStatusFilterObjectSchema).optional()
}).strict();
export const EnumImportStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumImportStatusWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumImportStatusWithAggregatesFilter>;
export const EnumImportStatusWithAggregatesFilterObjectZodSchema = makeSchema();
