import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './objects/RateLimitSelect.schema';
import { RateLimitCreateInputObjectSchema as RateLimitCreateInputObjectSchema } from './objects/RateLimitCreateInput.schema';
import { RateLimitUncheckedCreateInputObjectSchema as RateLimitUncheckedCreateInputObjectSchema } from './objects/RateLimitUncheckedCreateInput.schema';

export const RateLimitCreateOneSchema: z.ZodType<Prisma.RateLimitCreateArgs> = z.object({ select: RateLimitSelectObjectSchema.optional(),  data: z.union([RateLimitCreateInputObjectSchema, RateLimitUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.RateLimitCreateArgs>;

export const RateLimitCreateOneZodSchema = z.object({ select: RateLimitSelectObjectSchema.optional(),  data: z.union([RateLimitCreateInputObjectSchema, RateLimitUncheckedCreateInputObjectSchema]) }).strict();