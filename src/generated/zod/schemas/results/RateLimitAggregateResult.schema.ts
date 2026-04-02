import * as z from 'zod';
export const RateLimitAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    key: z.number(),
    count: z.number(),
    lastRequest: z.number()
  }).optional(),
  _sum: z.object({
    count: z.number().nullable(),
    lastRequest: z.bigint().nullable()
  }).nullable().optional(),
  _avg: z.object({
    count: z.number().nullable(),
    lastRequest: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    key: z.string().nullable(),
    count: z.number().int().nullable(),
    lastRequest: z.bigint().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    key: z.string().nullable(),
    count: z.number().int().nullable(),
    lastRequest: z.bigint().nullable()
  }).nullable().optional()});