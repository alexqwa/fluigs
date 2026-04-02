import * as z from 'zod';
export const FluigGroupByResultSchema = z.array(z.object({
  id: z.string(),
  product: z.string(),
  code: z.string(),
  nFluig: z.number().int(),
  quantity: z.string(),
  cost: z.string(),
  costTotal: z.string(),
  date: z.date(),
  createdAt: z.date(),
  userId: z.string(),
  _count: z.object({
    id: z.number(),
    status: z.number(),
    product: z.number(),
    code: z.number(),
    nFluig: z.number(),
    quantity: z.number(),
    cost: z.number(),
    costTotal: z.number(),
    date: z.number(),
    createdAt: z.number(),
    userId: z.number(),
    user: z.number()
  }).optional(),
  _sum: z.object({
    nFluig: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    nFluig: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    product: z.string().nullable(),
    code: z.string().nullable(),
    nFluig: z.number().int().nullable(),
    quantity: z.string().nullable(),
    cost: z.string().nullable(),
    costTotal: z.string().nullable(),
    date: z.date().nullable(),
    createdAt: z.date().nullable(),
    userId: z.string().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    product: z.string().nullable(),
    code: z.string().nullable(),
    nFluig: z.number().int().nullable(),
    quantity: z.string().nullable(),
    cost: z.string().nullable(),
    costTotal: z.string().nullable(),
    date: z.date().nullable(),
    createdAt: z.date().nullable(),
    userId: z.string().nullable()
  }).nullable().optional()
}));