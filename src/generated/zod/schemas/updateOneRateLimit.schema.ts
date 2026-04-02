import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './objects/RateLimitSelect.schema';
import { RateLimitUpdateInputObjectSchema as RateLimitUpdateInputObjectSchema } from './objects/RateLimitUpdateInput.schema';
import { RateLimitUncheckedUpdateInputObjectSchema as RateLimitUncheckedUpdateInputObjectSchema } from './objects/RateLimitUncheckedUpdateInput.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';

export const RateLimitUpdateOneSchema: z.ZodType<Prisma.RateLimitUpdateArgs> = z.object({ select: RateLimitSelectObjectSchema.optional(),  data: z.union([RateLimitUpdateInputObjectSchema, RateLimitUncheckedUpdateInputObjectSchema]), where: RateLimitWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.RateLimitUpdateArgs>;

export const RateLimitUpdateOneZodSchema = z.object({ select: RateLimitSelectObjectSchema.optional(),  data: z.union([RateLimitUpdateInputObjectSchema, RateLimitUncheckedUpdateInputObjectSchema]), where: RateLimitWhereUniqueInputObjectSchema }).strict();