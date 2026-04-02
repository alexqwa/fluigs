import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitUpdateManyMutationInputObjectSchema as RateLimitUpdateManyMutationInputObjectSchema } from './objects/RateLimitUpdateManyMutationInput.schema';
import { RateLimitWhereInputObjectSchema as RateLimitWhereInputObjectSchema } from './objects/RateLimitWhereInput.schema';

export const RateLimitUpdateManySchema: z.ZodType<Prisma.RateLimitUpdateManyArgs> = z.object({ data: RateLimitUpdateManyMutationInputObjectSchema, where: RateLimitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitUpdateManyArgs>;

export const RateLimitUpdateManyZodSchema = z.object({ data: RateLimitUpdateManyMutationInputObjectSchema, where: RateLimitWhereInputObjectSchema.optional() }).strict();