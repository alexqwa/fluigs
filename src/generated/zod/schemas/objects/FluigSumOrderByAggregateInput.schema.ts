import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  nFluig: SortOrderSchema.optional()
}).strict();
export const FluigSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.FluigSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigSumOrderByAggregateInput>;
export const FluigSumOrderByAggregateInputObjectZodSchema = makeSchema();
