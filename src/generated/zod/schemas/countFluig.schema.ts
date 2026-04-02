import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigOrderByWithRelationInputObjectSchema as FluigOrderByWithRelationInputObjectSchema } from './objects/FluigOrderByWithRelationInput.schema';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './objects/FluigWhereInput.schema';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './objects/FluigWhereUniqueInput.schema';
import { FluigCountAggregateInputObjectSchema as FluigCountAggregateInputObjectSchema } from './objects/FluigCountAggregateInput.schema';

export const FluigCountSchema: z.ZodType<Prisma.FluigCountArgs> = z.object({ orderBy: z.union([FluigOrderByWithRelationInputObjectSchema, FluigOrderByWithRelationInputObjectSchema.array()]).optional(), where: FluigWhereInputObjectSchema.optional(), cursor: FluigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FluigCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.FluigCountArgs>;

export const FluigCountZodSchema = z.object({ orderBy: z.union([FluigOrderByWithRelationInputObjectSchema, FluigOrderByWithRelationInputObjectSchema.array()]).optional(), where: FluigWhereInputObjectSchema.optional(), cursor: FluigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), FluigCountAggregateInputObjectSchema ]).optional() }).strict();