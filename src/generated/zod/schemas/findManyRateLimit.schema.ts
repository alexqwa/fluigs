import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitOrderByWithRelationInputObjectSchema as RateLimitOrderByWithRelationInputObjectSchema } from './objects/RateLimitOrderByWithRelationInput.schema';
import { RateLimitWhereInputObjectSchema as RateLimitWhereInputObjectSchema } from './objects/RateLimitWhereInput.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';
import { RateLimitScalarFieldEnumSchema } from './enums/RateLimitScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const RateLimitFindManySelectSchema: z.ZodType<Prisma.RateLimitSelect> = z.object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    count: z.boolean().optional(),
    lastRequest: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.RateLimitSelect>;

export const RateLimitFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    key: z.boolean().optional(),
    count: z.boolean().optional(),
    lastRequest: z.boolean().optional()
  }).strict();

export const RateLimitFindManySchema: z.ZodType<Prisma.RateLimitFindManyArgs> = z.object({ select: RateLimitFindManySelectSchema.optional(),  orderBy: z.union([RateLimitOrderByWithRelationInputObjectSchema, RateLimitOrderByWithRelationInputObjectSchema.array()]).optional(), where: RateLimitWhereInputObjectSchema.optional(), cursor: RateLimitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RateLimitScalarFieldEnumSchema, RateLimitScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitFindManyArgs>;

export const RateLimitFindManyZodSchema = z.object({ select: RateLimitFindManySelectSchema.optional(),  orderBy: z.union([RateLimitOrderByWithRelationInputObjectSchema, RateLimitOrderByWithRelationInputObjectSchema.array()]).optional(), where: RateLimitWhereInputObjectSchema.optional(), cursor: RateLimitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([RateLimitScalarFieldEnumSchema, RateLimitScalarFieldEnumSchema.array()]).optional() }).strict();