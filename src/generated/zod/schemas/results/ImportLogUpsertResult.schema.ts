import * as z from 'zod';
export const ImportLogUpsertResultSchema = z.object({
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
});