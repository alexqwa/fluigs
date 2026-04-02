import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  count: SortOrderSchema.optional(),
  lastRequest: SortOrderSchema.optional()
}).strict();
export const RateLimitAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.RateLimitAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitAvgOrderByAggregateInput>;
export const RateLimitAvgOrderByAggregateInputObjectZodSchema = makeSchema();
