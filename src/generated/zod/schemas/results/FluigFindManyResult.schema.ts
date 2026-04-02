import * as z from 'zod';
export const FluigFindManyResultSchema = z.object({
  data: z.array(z.object({
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
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});