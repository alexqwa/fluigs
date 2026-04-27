import * as z from 'zod';
export const ProductDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  cost: z.string().optional(),
  stock: z.string().optional(),
  buyer: z.string().optional(),
  curveAbc: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
}));