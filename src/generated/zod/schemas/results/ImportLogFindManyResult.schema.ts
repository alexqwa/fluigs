import * as z from 'zod';
export const ImportLogFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  filename: z.string(),
  status: z.unknown(),
  totalRows: z.number().int(),
  inserted: z.number().int(),
  updated: z.number().int(),
  skipped: z.number().int(),
  errors: z.number().int(),
  errorDetail: z.unknown().optional(),
  createdAt: z.date(),
  finishedAt: z.date()
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