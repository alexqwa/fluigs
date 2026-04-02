import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  status: z.literal(true).optional(),
  product: z.literal(true).optional(),
  code: z.literal(true).optional(),
  nFluig: z.literal(true).optional(),
  quantity: z.literal(true).optional(),
  cost: z.literal(true).optional(),
  costTotal: z.literal(true).optional(),
  date: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  userId: z.literal(true).optional()
}).strict();
export const FluigMinAggregateInputObjectSchema: z.ZodType<Prisma.FluigMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FluigMinAggregateInputType>;
export const FluigMinAggregateInputObjectZodSchema = makeSchema();
