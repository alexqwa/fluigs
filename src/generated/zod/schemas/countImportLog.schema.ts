import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogOrderByWithRelationInputObjectSchema as ImportLogOrderByWithRelationInputObjectSchema } from './objects/ImportLogOrderByWithRelationInput.schema';
import { ImportLogWhereInputObjectSchema as ImportLogWhereInputObjectSchema } from './objects/ImportLogWhereInput.schema';
import { ImportLogWhereUniqueInputObjectSchema as ImportLogWhereUniqueInputObjectSchema } from './objects/ImportLogWhereUniqueInput.schema';
import { ImportLogCountAggregateInputObjectSchema as ImportLogCountAggregateInputObjectSchema } from './objects/ImportLogCountAggregateInput.schema';

export const ImportLogCountSchema: z.ZodType<Prisma.ImportLogCountArgs> = z.object({ orderBy: z.union([ImportLogOrderByWithRelationInputObjectSchema, ImportLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: ImportLogWhereInputObjectSchema.optional(), cursor: ImportLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ImportLogCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ImportLogCountArgs>;

export const ImportLogCountZodSchema = z.object({ orderBy: z.union([ImportLogOrderByWithRelationInputObjectSchema, ImportLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: ImportLogWhereInputObjectSchema.optional(), cursor: ImportLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ImportLogCountAggregateInputObjectSchema ]).optional() }).strict();