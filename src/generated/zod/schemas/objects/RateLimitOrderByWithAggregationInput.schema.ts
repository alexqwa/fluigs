import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { RateLimitCountOrderByAggregateInputObjectSchema as RateLimitCountOrderByAggregateInputObjectSchema } from './RateLimitCountOrderByAggregateInput.schema';
import { RateLimitAvgOrderByAggregateInputObjectSchema as RateLimitAvgOrderByAggregateInputObjectSchema } from './RateLimitAvgOrderByAggregateInput.schema';
import { RateLimitMaxOrderByAggregateInputObjectSchema as RateLimitMaxOrderByAggregateInputObjectSchema } from './RateLimitMaxOrderByAggregateInput.schema';
import { RateLimitMinOrderByAggregateInputObjectSchema as RateLimitMinOrderByAggregateInputObjectSchema } from './RateLimitMinOrderByAggregateInput.schema';
import { RateLimitSumOrderByAggregateInputObjectSchema as RateLimitSumOrderByAggregateInputObjectSchema } from './RateLimitSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  lastRequest: SortOrderSchema.optional(),
  _count: z.lazy(() => RateLimitCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => RateLimitAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => RateLimitMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => RateLimitMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => RateLimitSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const RateLimitOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.RateLimitOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitOrderByWithAggregationInput>;
export const RateLimitOrderByWithAggregationInputObjectZodSchema = makeSchema();
