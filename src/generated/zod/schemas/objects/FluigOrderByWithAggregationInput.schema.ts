import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { FluigCountOrderByAggregateInputObjectSchema as FluigCountOrderByAggregateInputObjectSchema } from './FluigCountOrderByAggregateInput.schema';
import { FluigAvgOrderByAggregateInputObjectSchema as FluigAvgOrderByAggregateInputObjectSchema } from './FluigAvgOrderByAggregateInput.schema';
import { FluigMaxOrderByAggregateInputObjectSchema as FluigMaxOrderByAggregateInputObjectSchema } from './FluigMaxOrderByAggregateInput.schema';
import { FluigMinOrderByAggregateInputObjectSchema as FluigMinOrderByAggregateInputObjectSchema } from './FluigMinOrderByAggregateInput.schema';
import { FluigSumOrderByAggregateInputObjectSchema as FluigSumOrderByAggregateInputObjectSchema } from './FluigSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  product: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  nFluig: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  costTotal: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  _count: z.lazy(() => FluigCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => FluigAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => FluigMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => FluigMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => FluigSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const FluigOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.FluigOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigOrderByWithAggregationInput>;
export const FluigOrderByWithAggregationInputObjectZodSchema = makeSchema();
