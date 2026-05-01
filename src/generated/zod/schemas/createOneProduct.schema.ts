import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ProductSelectObjectSchema as ProductSelectObjectSchema } from './objects/ProductSelect.schema';
import { ProductCreateInputObjectSchema as ProductCreateInputObjectSchema } from './objects/ProductCreateInput.schema';
import { ProductUncheckedCreateInputObjectSchema as ProductUncheckedCreateInputObjectSchema } from './objects/ProductUncheckedCreateInput.schema';

export const ProductCreateOneSchema: z.ZodType<Prisma.ProductCreateArgs> = z.object({ select: ProductSelectObjectSchema.optional(),  data: z.union([ProductCreateInputObjectSchema, ProductUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ProductCreateArgs>;

export const ProductCreateOneZodSchema = z.object({ select: ProductSelectObjectSchema.optional(),  data: z.union([ProductCreateInputObjectSchema, ProductUncheckedCreateInputObjectSchema]) }).strict();