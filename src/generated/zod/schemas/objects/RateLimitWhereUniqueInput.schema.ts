import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  key: z.string().optional()
}).strict();
export const RateLimitWhereUniqueInputObjectSchema: z.ZodType<Prisma.RateLimitWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.RateLimitWhereUniqueInput>;
export const RateLimitWhereUniqueInputObjectZodSchema = makeSchema();
