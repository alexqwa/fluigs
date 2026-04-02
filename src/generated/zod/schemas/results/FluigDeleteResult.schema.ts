import * as z from 'zod';
export const FluigDeleteResultSchema = z.nullable(z.object({
  id: z.string(),
  status: z.unknown(),
  product: z.string(),
  code: z.string(),
  nFluig: z.number().int(),
  quantity: z.string(),
  cost: z.string(),
  costTotal: z.string(),
  date: z.date(),
  createdAt: z.date(),
  userId: z.string(),
  user: z.unknown()
}));