import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { RateLimitOrderByWithRelationInputObjectSchema as RateLimitOrderByWithRelationInputObjectSchema } from './objects/RateLimitOrderByWithRelationInput.schema';
import { RateLimitWhereInputObjectSchema as RateLimitWhereInputObjectSchema } from './objects/RateLimitWhereInput.schema';
import { RateLimitWhereUniqueInputObjectSchema as RateLimitWhereUniqueInputObjectSchema } from './objects/RateLimitWhereUniqueInput.schema';
import { RateLimitCountAggregateInputObjectSchema as RateLimitCountAggregateInputObjectSchema } from './objects/RateLimitCountAggregateInput.schema';

export const RateLimitCountSchema: z.ZodType<Prisma.RateLimitCountArgs> = z.object({ orderBy: z.union([RateLimitOrderByWithRelationInputObjectSchema, RateLimitOrderByWithRelationInputObjectSchema.array()]).optional(), where: RateLimitWhereInputObjectSchema.optional(), cursor: RateLimitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RateLimitCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.RateLimitCountArgs>;

export const RateLimitCountZodSchema = z.object({ orderBy: z.union([RateLimitOrderByWithRelationInputObjectSchema, RateLimitOrderByWithRelationInputObjectSchema.array()]).optional(), where: RateLimitWhereInputObjectSchema.optional(), cursor: RateLimitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), RateLimitCountAggregateInputObjectSchema ]).optional() }).strict();