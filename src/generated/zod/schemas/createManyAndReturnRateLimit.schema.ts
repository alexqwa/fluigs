import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './objects/RateLimitSelect.schema';
import { RateLimitCreateManyInputObjectSchema as RateLimitCreateManyInputObjectSchema } from './objects/RateLimitCreateManyInput.schema';

export const RateLimitCreateManyAndReturnSchema: z.ZodType<Prisma.RateLimitCreateManyAndReturnArgs> = z.object({ select: RateLimitSelectObjectSchema.optional(), data: z.union([ RateLimitCreateManyInputObjectSchema, z.array(RateLimitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitCreateManyAndReturnArgs>;

export const RateLimitCreateManyAndReturnZodSchema = z.object({ select: RateLimitSelectObjectSchema.optional(), data: z.union([ RateLimitCreateManyInputObjectSchema, z.array(RateLimitCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();