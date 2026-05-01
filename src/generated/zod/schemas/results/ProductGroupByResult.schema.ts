import * as z from 'zod';
export const ProductGroupByResultSchema = z.array(z.object({
  id: z.string(),
  code: z.string(),
  name: z.string(),
  cost: z.string(),
  stock: z.string(),
  buyer: z.string(),
  curveAbc: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    code: z.number(),
    name: z.number(),
    cost: z.number(),
    stock: z.number(),
    buyer: z.number(),
    curveAbc: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    code: z.string().nullable(),
    name: z.string().nullable(),
    cost: z.string().nullable(),
    stock: z.string().nullable(),
    buyer: z.string().nullable(),
    curveAbc: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    code: z.string().nullable(),
    name: z.string().nullable(),
    cost: z.string().nullable(),
    stock: z.string().nullable(),
    buyer: z.string().nullable(),
    curveAbc: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));