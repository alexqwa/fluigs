import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  count: SortOrderSchema.optional(),
  lastRequest: SortOrderSchema.optional()
}).strict();
export const RateLimitSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RateLimitSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitSumOrderByAggregateInput>;
export const RateLimitSumOrderByAggregateInputObjectZodSchema = makeSchema();
