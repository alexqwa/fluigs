import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  totalRows: SortOrderSchema.optional(),
  inserted: SortOrderSchema.optional(),
  updated: SortOrderSchema.optional(),
  skipped: SortOrderSchema.optional(),
  errors: SortOrderSchema.optional()
}).strict();
export const ImportLogAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ImportLogAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogAvgOrderByAggregateInput>;
export const ImportLogAvgOrderByAggregateInputObjectZodSchema = makeSchema();
