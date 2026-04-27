import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ProductSelectObjectSchema as ProductSelectObjectSchema } from './objects/ProductSelect.schema';
import { ProductWhereUniqueInputObjectSchema as ProductWhereUniqueInputObjectSchema } from './objects/ProductWhereUniqueInput.schema';

export const ProductFindUniqueOrThrowSchema: z.ZodType<Prisma.ProductFindUniqueOrThrowArgs> = z.object({ select: ProductSelectObjectSchema.optional(),  where: ProductWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ProductFindUniqueOrThrowArgs>;

export const ProductFindUniqueOrThrowZodSchema = z.object({ select: ProductSelectObjectSchema.optional(),  where: ProductWhereUniqueInputObjectSchema }).strict();