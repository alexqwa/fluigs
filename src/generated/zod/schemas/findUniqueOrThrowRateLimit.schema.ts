import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './objects/RateLimitSelect.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';

export const RateLimitFindUniqueOrThrowSchema: z.ZodType<Prisma.RateLimitFindUniqueOrThrowArgs> = z.object({ select: RateLimitSelectObjectSchema.optional(),  where: RateLimitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RateLimitFindUniqueOrThrowArgs>;

export const RateLimitFindUniqueOrThrowZodSchema = z.object({ select: RateLimitSelectObjectSchema.optional(),  where: RateLimitWhereUniqueInputObjectSchema }).strict();