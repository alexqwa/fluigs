import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ImportStatusSchema } from '../enums/ImportStatus.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumImportStatusFilterObjectSchema as NestedEnumImportStatusFilterObjectSchema } from './NestedEnumImportStatusFilter.schema'

const nestedenumimportstatuswithaggregatesfilterSchema = z.object({
  equals: ImportStatusSchema.optional(),
  in: ImportStatusSchema.array().optional(),
  notIn: ImportStatusSchema.array().optional(),
  not: z.union([ImportStatusSchema, z.lazy(() => NestedEnumImportStatusWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumImportStatusFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumImportStatusFilterObjectSchema).optional()
}).strict();
export const NestedEnumImportStatusWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumImportStatusWithAggregatesFilter> = nestedenumimportstatuswithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumImportStatusWithAggregatesFilter>;
export const NestedEnumImportStatusWithAggregatesFilterObjectZodSchema = nestedenumimportstatuswithaggregatesfilterSchema;
