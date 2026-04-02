import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitOrderByWithRelationInputObjectSchema as RateLimitOrderByWithRelationInputObjectSchema } from './objects/RateLimitOrderByWithRelationInput.schema';
import { RateLimitWhereInputObjectSchema as RateLimitWhereInputObjectSchema } from './objects/RateLimitWhereInput.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';
import { RateLimitScalarFieldEnumSchema } from './enums/RateLimitScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RateLimitFindFirstOrThrowSelectSchema: z.ZodType<Prisma.RateLimitSelect> = z.object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    count: z.boolean().optional(),
    lastRequest: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RateLimitSelect>;

export const RateLimitFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    count: z.boolean().optional(),
    lastRequest: z.boolean().optional()
  }).strict();

export const RateLimitFindFirstOrThrowSchema: z.ZodType<Prisma.RateLimitFindFirstOrThrowArgs> = z.object({ select: RateLimitFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([RateLimitOrderByWithRelationInputObjectSchema, RateLimitOrderByWithRelationInputObjectSchema.array()]).optional(), where: RateLimitWhereInputObjectSchema.optional(), cursor: RateLimitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RateLimitScalarFieldEnumSchema, RateLimitScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitFindFirstOrThrowArgs>;

export const RateLimitFindFirstOrThrowZodSchema = z.object({ select: RateLimitFindFirstOrThrowSelectSchema.optional(),  orderBy: z.union([RateLimitOrderByWithRelationInputObjectSchema, RateLimitOrderByWithRelationInputObjectSchema.array()]).optional(), where: RateLimitWhereInputObjectSchema.optional(), cursor: RateLimitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RateLimitScalarFieldEnumSchema, RateLimitScalarFieldEnumSchema.array()]).optional() }).strict();