import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  filename: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  totalRows: SortOrderSchema.optional(),
  inserted: SortOrderSchema.optional(),
  updated: SortOrderSchema.optional(),
  skipped: SortOrderSchema.optional(),
  errors: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  finishedAt: SortOrderSchema.optional()
}).strict();
export const ImportLogMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ImportLogMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogMaxOrderByAggregateInput>;
export const ImportLogMaxOrderByAggregateInputObjectZodSchema = makeSchema();
