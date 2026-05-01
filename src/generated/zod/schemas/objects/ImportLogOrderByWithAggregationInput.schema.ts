import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ImportLogCountOrderByAggregateInputObjectSchema as ImportLogCountOrderByAggregateInputObjectSchema } from './ImportLogCountOrderByAggregateInput.schema';
import { ImportLogAvgOrderByAggregateInputObjectSchema as ImportLogAvgOrderByAggregateInputObjectSchema } from './ImportLogAvgOrderByAggregateInput.schema';
import { ImportLogMaxOrderByAggregateInputObjectSchema as ImportLogMaxOrderByAggregateInputObjectSchema } from './ImportLogMaxOrderByAggregateInput.schema';
import { ImportLogMinOrderByAggregateInputObjectSchema as ImportLogMinOrderByAggregateInputObjectSchema } from './ImportLogMinOrderByAggregateInput.schema';
import { ImportLogSumOrderByAggregateInputObjectSchema as ImportLogSumOrderByAggregateInputObjectSchema } from './ImportLogSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  filename: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  totalRows: SortOrderSchema.optional(),
  inserted: SortOrderSchema.optional(),
  updated: SortOrderSchema.optional(),
  skipped: SortOrderSchema.optional(),
  errors: SortOrderSchema.optional(),
  errorDetail: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  finishedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ImportLogCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ImportLogAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ImportLogMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ImportLogMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ImportLogSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ImportLogOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ImportLogOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogOrderByWithAggregationInput>;
export const ImportLogOrderByWithAggregationInputObjectZodSchema = makeSchema();
