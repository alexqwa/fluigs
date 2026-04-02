import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  product: SortOrderSchema.optional(),
  code: SortOrderSchema.optional(),
  nFluig: SortOrderSchema.optional(),
  quantity: SortOrderSchema.optional(),
  cost: SortOrderSchema.optional(),
  costTotal: SortOrderSchema.optional(),
  date: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional()
}).strict();
export const FluigMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FluigMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigMinOrderByAggregateInput>;
export const FluigMinOrderByAggregateInputObjectZodSchema = makeSchema();
