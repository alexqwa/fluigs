import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  count: z.literal(true).optional(),
  lastRequest: z.literal(true).optional()
}).strict();
export const RateLimitAvgAggregateInputObjectSchema: z.ZodType<Prisma.RateLimitAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitAvgAggregateInputType>;
export const RateLimitAvgAggregateInputObjectZodSchema = makeSchema();
