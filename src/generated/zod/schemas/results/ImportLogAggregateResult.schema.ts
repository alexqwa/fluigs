import * as z from 'zod';
export const ImportLogAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    filename: z.number(),
    status: z.number(),
    totalRows: z.number(),
    inserted: z.number(),
    updated: z.number(),
    skipped: z.number(),
    errors: z.number(),
    errorDetail: z.number(),
    createdAt: z.number(),
    finishedAt: z.number()
  }).optional(),
  _sum: z.object({
    totalRows: z.number().nullable(),
    inserted: z.number().nullable(),
    updated: z.number().nullable(),
    skipped: z.number().nullable(),
    errors: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    totalRows: z.number().nullable(),
    inserted: z.number().nullable(),
    updated: z.number().nullable(),
    skipped: z.number().nullable(),
    errors: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    filename: z.string().nullable(),
    totalRows: z.number().int().nullable(),
    inserted: z.number().int().nullable(),
    updated: z.number().int().nullable(),
    skipped: z.number().int().nullable(),
    errors: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    finishedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    filename: z.string().nullable(),
    totalRows: z.number().int().nullable(),
    inserted: z.number().int().nullable(),
    updated: z.number().int().nullable(),
    skipped: z.number().int().nullable(),
    errors: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    finishedAt: z.date().nullable()
  }).nullable().optional()});