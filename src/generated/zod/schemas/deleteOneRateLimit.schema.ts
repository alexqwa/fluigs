import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './objects/RateLimitSelect.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';

export const RateLimitDeleteOneSchema: z.ZodType<Prisma.RateLimitDeleteArgs> = z.object({ select: RateLimitSelectObjectSchema.optional(),  where: RateLimitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RateLimitDeleteArgs>;

export const RateLimitDeleteOneZodSchema = z.object({ select: RateLimitSelectObjectSchema.optional(),  where: RateLimitWhereUniqueInputObjectSchema }).strict();