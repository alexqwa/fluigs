import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitWhereInputObjectSchema as RateLimitWhereInputObjectSchema } from './objects/RateLimitWhereInput.schema';

export const RateLimitDeleteManySchema: z.ZodType<Prisma.RateLimitDeleteManyArgs> = z.object({ where: RateLimitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitDeleteManyArgs>;

export const RateLimitDeleteManyZodSchema = z.object({ where: RateLimitWhereInputObjectSchema.optional() }).strict();