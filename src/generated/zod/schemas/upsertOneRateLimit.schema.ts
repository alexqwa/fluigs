import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './objects/RateLimitSelect.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';
import { RateLimitCreateInputObjectSchema as RateLimitCreateInputObjectSchema } from './objects/RateLimitCreateInput.schema';
import { RateLimitUncheckedCreateInputObjectSchema as RateLimitUncheckedCreateInputObjectSchema } from './objects/RateLimitUncheckedCreateInput.schema';
import { RateLimitUpdateInputObjectSchema as RateLimitUpdateInputObjectSchema } from './objects/RateLimitUpdateInput.schema';
import { RateLimitUncheckedUpdateInputObjectSchema as RateLimitUncheckedUpdateInputObjectSchema } from './objects/RateLimitUncheckedUpdateInput.schema';

export const RateLimitUpsertOneSchema: z.ZodType<Prisma.RateLimitUpsertArgs> = z.object({ select: RateLimitSelectObjectSchema.optional(),  where: RateLimitWhereUniqueInputObjectSchema, create: z.union([ RateLimitCreateInputObjectSchema, RateLimitUncheckedCreateInputObjectSchema ]), update: z.union([ RateLimitUpdateInputObjectSchema, RateLimitUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.RateLimitUpsertArgs>;

export const RateLimitUpsertOneZodSchema = z.object({ select: RateLimitSelectObjectSchema.optional(),  where: RateLimitWhereUniqueInputObjectSchema, create: z.union([ RateLimitCreateInputObjectSchema, RateLimitUncheckedCreateInputObjectSchema ]), update: z.union([ RateLimitUpdateInputObjectSchema, RateLimitUncheckedUpdateInputObjectSchema ]) }).strict();