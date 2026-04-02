import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './objects/RateLimitSelect.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';

export const RateLimitFindUniqueSchema: z.ZodType<Prisma.RateLimitFindUniqueArgs> = z.object({ select: RateLimitSelectObjectSchema.optional(),  where: RateLimitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RateLimitFindUniqueArgs>;

export const RateLimitFindUniqueZodSchema = z.object({ select: RateLimitSelectObjectSchema.optional(),  where: RateLimitWhereUniqueInputObjectSchema }).strict();