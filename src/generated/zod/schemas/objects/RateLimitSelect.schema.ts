import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  key: z.boolean().optional(),
  count: z.boolean().optional(),
  lastRequest: z.boolean().optional()
}).strict();
export const RateLimitSelectObjectSchema: z.ZodType<Prisma.RateLimitSelect> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitSelect>;
export const RateLimitSelectObjectZodSchema = makeSchema();
