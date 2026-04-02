import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string(),
  key: z.string(),
  count: z.number().int(),
  lastRequest: z.bigint()
}).strict();
export const RateLimitCreateManyInputObjectSchema: z.ZodType<Prisma.RateLimitCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitCreateManyInput>;
export const RateLimitCreateManyInputObjectZodSchema = makeSchema();
