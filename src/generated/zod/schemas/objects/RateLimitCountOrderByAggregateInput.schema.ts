import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  key: SortOrderSchema.optional(),
  count: SortOrderSchema.optional(),
  lastRequest: SortOrderSchema.optional()
}).strict();
export const RateLimitCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RateLimitCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitCountOrderByAggregateInput>;
export const RateLimitCountOrderByAggregateInputObjectZodSchema = makeSchema();
