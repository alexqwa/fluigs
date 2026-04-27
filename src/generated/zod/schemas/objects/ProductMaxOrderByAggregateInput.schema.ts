import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  stock: SortOrderSchema.optional(),
  buyer: SortOrderSchema.optional(),
  curveAbc: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const ProductMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ProductMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductMaxOrderByAggregateInput>;
export const ProductMaxOrderByAggregateInputObjectZodSchema = makeSchema();
