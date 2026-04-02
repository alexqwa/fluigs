import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitCreateManyInputObjectSchema as RateLimitCreateManyInputObjectSchema } from './objects/RateLimitCreateManyInput.schema';

export const RateLimitCreateManySchema: z.ZodType<Prisma.RateLimitCreateManyArgs> = z.object({ data: z.union([ RateLimitCreateManyInputObjectSchema, z.array(RateLimitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitCreateManyArgs>;

export const RateLimitCreateManyZodSchema = z.object({ data: z.union([ RateLimitCreateManyInputObjectSchema, z.array(RateLimitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();