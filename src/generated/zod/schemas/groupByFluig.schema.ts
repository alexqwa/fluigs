import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './objects/FluigWhereInput.schema';
import { FluigOrderByWithAggregationInputObjectSchema as FluigOrderByWithAggregationInputObjectSchema } from './objects/FluigOrderByWithAggregationInput.schema';
import { FluigScalarWhereWithAggregatesInputObjectSchema as FluigScalarWhereWithAggregatesInputObjectSchema } from './objects/FluigScalarWhereWithAggregatesInput.schema';
import { FluigScalarFieldEnumSchema } from './enums/FluigScalarFieldEnum.schema';
import { FluigCountAggregateInputObjectSchema as FluigCountAggregateInputObjectSchema } from './objects/FluigCountAggregateInput.schema';
import { FluigMinAggregateInputObjectSchema as FluigMinAggregateInputObjectSchema } from './objects/FluigMinAggregateInput.schema';
import { FluigMaxAggregateInputObjectSchema as FluigMaxAggregateInputObjectSchema } from './objects/FluigMaxAggregateInput.schema';
import { FluigAvgAggregateInputObjectSchema as FluigAvgAggregateInputObjectSchema } from './objects/FluigAvgAggregateInput.schema';
import { FluigSumAggregateInputObjectSchema as FluigSumAggregateInputObjectSchema } from './objects/FluigSumAggregateInput.schema';

export const FluigGroupBySchema: z.ZodType<Prisma.FluigGroupByArgs> = z.object({ where: FluigWhereInputObjectSchema.optional(), orderBy: z.union([FluigOrderByWithAggregationInputObjectSchema, FluigOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FluigScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FluigScalarFieldEnumSchema), _count: z.union([ z.literal(true), FluigCountAggregateInputObjectSchema ]).optional(), _min: FluigMinAggregateInputObjectSchema.optional(), _max: FluigMaxAggregateInputObjectSchema.optional(), _avg: FluigAvgAggregateInputObjectSchema.optional(), _sum: FluigSumAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FluigGroupByArgs>;

export const FluigGroupByZodSchema = z.object({ where: FluigWhereInputObjectSchema.optional(), orderBy: z.union([FluigOrderByWithAggregationInputObjectSchema, FluigOrderByWithAggregationInputObjectSchema.array()]).optional(), having: FluigScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(FluigScalarFieldEnumSchema), _count: z.union([ z.literal(true), FluigCountAggregateInputObjectSchema ]).optional(), _min: FluigMinAggregateInputObjectSchema.optional(), _max: FluigMaxAggregateInputObjectSchema.optional(), _avg: FluigAvgAggregateInputObjectSchema.optional(), _sum: FluigSumAggregateInputObjectSchema.optional() }).strict();