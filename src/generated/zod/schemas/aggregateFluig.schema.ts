import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigOrderByWithRelationInputObjectSchema as FluigOrderByWithRelationInputObjectSchema } from './objects/FluigOrderByWithRelationInput.schema';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './objects/FluigWhereInput.schema';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './objects/FluigWhereUniqueInput.schema';
import { FluigCountAggregateInputObjectSchema as FluigCountAggregateInputObjectSchema } from './objects/FluigCountAggregateInput.schema';
import { FluigMinAggregateInputObjectSchema as FluigMinAggregateInputObjectSchema } from './objects/FluigMinAggregateInput.schema';
import { FluigMaxAggregateInputObjectSchema as FluigMaxAggregateInputObjectSchema } from './objects/FluigMaxAggregateInput.schema';
import { FluigAvgAggregateInputObjectSchema as FluigAvgAggregateInputObjectSchema } from './objects/FluigAvgAggregateInput.schema';
import { FluigSumAggregateInputObjectSchema as FluigSumAggregateInputObjectSchema } from './objects/FluigSumAggregateInput.schema';

export const FluigAggregateSchema: z.ZodType<Prisma.FluigAggregateArgs> = z.object({ orderBy: z.union([FluigOrderByWithRelationInputObjectSchema, FluigOrderByWithRelationInputObjectSchema.array()]).optional(), where: FluigWhereInputObjectSchema.optional(), cursor: FluigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FluigCountAggregateInputObjectSchema ]).optional(), _min: FluigMinAggregateInputObjectSchema.optional(), _max: FluigMaxAggregateInputObjectSchema.optional(), _avg: FluigAvgAggregateInputObjectSchema.optional(), _sum: FluigSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FluigAggregateArgs>;

export const FluigAggregateZodSchema = z.object({ orderBy: z.union([FluigOrderByWithRelationInputObjectSchema, FluigOrderByWithRelationInputObjectSchema.array()]).optional(), where: FluigWhereInputObjectSchema.optional(), cursor: FluigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), FluigCountAggregateInputObjectSchema ]).optional(), _min: FluigMinAggregateInputObjectSchema.optional(), _max: FluigMaxAggregateInputObjectSchema.optional(), _avg: FluigAvgAggregateInputObjectSchema.optional(), _sum: FluigSumAggregateInputObjectSchema.optional() }).strict();