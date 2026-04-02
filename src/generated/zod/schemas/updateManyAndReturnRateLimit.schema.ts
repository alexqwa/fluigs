import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './objects/RateLimitSelect.schema';
import { RateLimitUpdateManyMutationInputObjectSchema as RateLimitUpdateManyMutationInputObjectSchema } from './objects/RateLimitUpdateManyMutationInput.schema';
import { RateLimitWhereInputObjectSchema as RateLimitWhereInputObjectSchema } from './objects/RateLimitWhereInput.schema';

export const RateLimitUpdateManyAndReturnSchema: z.ZodType<Prisma.RateLimitUpdateManyAndReturnArgs> = z.object({ select: RateLimitSelectObjectSchema.optional(), data: RateLimitUpdateManyMutationInputObjectSchema, where: RateLimitWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitUpdateManyAndReturnArgs>;

export const RateLimitUpdateManyAndReturnZodSchema = z.object({ select: RateLimitSelectObjectSchema.optional(), data: RateLimitUpdateManyMutationInputObjectSchema, where: RateLimitWhereInputObjectSchema.optional() }).strict();