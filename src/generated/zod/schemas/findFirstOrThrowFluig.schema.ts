import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigIncludeObjectSchema as FluigIncludeObjectSchema } from './objects/FluigInclude.schema';
import { FluigOrderByWithRelationInputObjectSchema as FluigOrderByWithRelationInputObjectSchema } from './objects/FluigOrderByWithRelationInput.schema';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './objects/FluigWhereInput.schema';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './objects/FluigWhereUniqueInput.schema';
import { FluigScalarFieldEnumSchema } from './enums/FluigScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const FluigFindFirstOrThrowSelectSchema: z.ZodType<Prisma.FluigSelect> = z.object({
    id: z.boolean().optional(),
    status: z.boolean().optional(),
    product: z.boolean().optional(),
    code: z.boolean().optional(),
    nFluig: z.boolean().optional(),
    quantity: z.boolean().optional(),
    cost: z.boolean().optional(),
    costTotal: z.boolean().optional(),
    date: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.FluigSelect>;

export const FluigFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    status: z.boolean().optional(),
    product: z.boolean().optional(),
    code: z.boolean().optional(),
    nFluig: z.boolean().optional(),
    quantity: z.boolean().optional(),
    cost: z.boolean().optional(),
    costTotal: z.boolean().optional(),
    date: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const FluigFindFirstOrThrowSchema: z.ZodType<Prisma.FluigFindFirstOrThrowArgs> = z.object({ select: FluigFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => FluigIncludeObjectSchema.optional()), orderBy: z.union([FluigOrderByWithRelationInputObjectSchema, FluigOrderByWithRelationInputObjectSchema.array()]).optional(), where: FluigWhereInputObjectSchema.optional(), cursor: FluigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FluigScalarFieldEnumSchema, FluigScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.FluigFindFirstOrThrowArgs>;

export const FluigFindFirstOrThrowZodSchema = z.object({ select: FluigFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => FluigIncludeObjectSchema.optional()), orderBy: z.union([FluigOrderByWithRelationInputObjectSchema, FluigOrderByWithRelationInputObjectSchema.array()]).optional(), where: FluigWhereInputObjectSchema.optional(), cursor: FluigWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([FluigScalarFieldEnumSchema, FluigScalarFieldEnumSchema.array()]).optional() }).strict();