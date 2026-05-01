import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ProductOrderByWithRelationInputObjectSchema as ProductOrderByWithRelationInputObjectSchema } from './objects/ProductOrderByWithRelationInput.schema';
import { ProductWhereInputObjectSchema as ProductWhereInputObjectSchema } from './objects/ProductWhereInput.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';
import { ProductScalarFieldEnumSchema } from './enums/ProductScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ProductFindFirstSelectSchema: z.ZodType<Prisma.ProductSelect> = z.object({
    id: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    cost: z.boolean().optional(),
    stock: z.boolean().optional(),
    buyer: z.boolean().optional(),
    curveAbc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ProductSelect>;

export const ProductFindFirstSelectZodSchema = z.object({
    id: z.boolean().optional(),
    code: z.boolean().optional(),
    name: z.boolean().optional(),
    cost: z.boolean().optional(),
    stock: z.boolean().optional(),
    buyer: z.boolean().optional(),
    curveAbc: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional()
  }).strict();

export const ProductFindFirstSchema: z.ZodType<Prisma.ProductFindFirstArgs> = z.object({ select: ProductFindFirstSelectSchema.optional(),  orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ProductFindFirstArgs>;

export const ProductFindFirstZodSchema = z.object({ select: ProductFindFirstSelectSchema.optional(),  orderBy: z.union([ProductOrderByWithRelationInputObjectSchema, ProductOrderByWithRelationInputObjectSchema.array()]).optional(), where: ProductWhereInputObjectSchema.optional(), cursor: ProductWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ProductScalarFieldEnumSchema, ProductScalarFieldEnumSchema.array()]).optional() }).strict();