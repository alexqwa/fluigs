import * as z from 'zod';
export const ProductAggregateResultSchema = z.object({  _count: z.object({
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
  }).nullable().optional()});