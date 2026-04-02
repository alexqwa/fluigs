import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  key: z.string(),
  count: z.number().int(),
  lastRequest: z.bigint()
}).strict();
export const RateLimitCreateInputObjectSchema: z.ZodType<Prisma.RateLimitCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitCreateInput>;
export const RateLimitCreateInputObjectZodSchema = makeSchema();
