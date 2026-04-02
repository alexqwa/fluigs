import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema'

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
  userId: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const FluigOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.FluigOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigOrderByWithRelationInput>;
export const FluigOrderByWithRelationInputObjectZodSchema = makeSchema();
