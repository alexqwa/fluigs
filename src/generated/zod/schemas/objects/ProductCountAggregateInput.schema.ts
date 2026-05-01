import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  code: z.literal(true).optional(),
  name: z.literal(true).optional(),
  cost: z.literal(true).optional(),
  stock: z.literal(true).optional(),
  buyer: z.literal(true).optional(),
  curveAbc: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional(),
  _all: z.literal(true).optional()
}).strict();
export const ProductCountAggregateInputObjectSchema: z.ZodType<Prisma.ProductCountAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ProductCountAggregateInputType>;
export const ProductCountAggregateInputObjectZodSchema = makeSchema();
