import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  key: z.literal(true).optional(),
  count: z.literal(true).optional(),
  lastRequest: z.literal(true).optional()
}).strict();
export const RateLimitMaxAggregateInputObjectSchema: z.ZodType<Prisma.RateLimitMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitMaxAggregateInputType>;
export const RateLimitMaxAggregateInputObjectZodSchema = makeSchema();
