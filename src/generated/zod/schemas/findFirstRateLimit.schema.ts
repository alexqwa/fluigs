import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitOrderByWithRelationInputObjectSchema as RateLimitOrderByWithRelationInputObjectSchema } from './objects/RateLimitOrderByWithRelationInput.schema';
import { RateLimitWhereInputObjectSchema as RateLimitWhereInputObjectSchema } from './objects/RateLimitWhereInput.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';
import { RateLimitScalarFieldEnumSchema } from './enums/RateLimitScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RateLimitFindFirstSelectSchema: z.ZodType<Prisma.RateLimitSelect> = z.object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    count: z.boolean().optional(),
    lastRequest: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RateLimitSelect>;

export const RateLimitFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    count: z.boolean().optional(),
    lastRequest: z.boolean().optional()
  }).strict();

export const RateLimitFindFirstSchema: z.ZodType<Prisma.RateLimitFindFirstArgs> = z.object({ select: RateLimitFindFirstSelectSchema.optional(),  orderBy: z.union([RateLimitOrderByWithRelationInputObjectSchema, RateLimitOrderByWithRelationInputObjectSchema.array()]).optional(), where: RateLimitWhereInputObjectSchema.optional(), cursor: RateLimitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RateLimitScalarFieldEnumSchema, RateLimitScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitFindFirstArgs>;

export const RateLimitFindFirstZodSchema = z.object({ select: RateLimitFindFirstSelectSchema.optional(),  orderBy: z.union([RateLimitOrderByWithRelationInputObjectSchema, RateLimitOrderByWithRelationInputObjectSchema.array()]).optional(), where: RateLimitWhereInputObjectSchema.optional(), cursor: RateLimitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RateLimitScalarFieldEnumSchema, RateLimitScalarFieldEnumSchema.array()]).optional() }).strict();