import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  key: z.literal(true).optional(),
  count: z.literal(true).optional(),
  lastRequest: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const RateLimitCountAggregateInputObjectSchema: z.ZodType<Prisma.RateLimitCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitCountAggregateInputType>;
export const RateLimitCountAggregateInputObjectZodSchema = makeSchema();
