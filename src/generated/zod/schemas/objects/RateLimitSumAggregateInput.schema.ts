import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  count: z.literal(true).optional(),
  lastRequest: z.literal(true).optional()
}).strict();
export const RateLimitSumAggregateInputObjectSchema: z.ZodType<Prisma.RateLimitSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitSumAggregateInputType>;
export const RateLimitSumAggregateInputObjectZodSchema = makeSchema();
