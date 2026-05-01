import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  filename: z.literal(true).optional(),
  status: z.literal(true).optional(),
  totalRows: z.literal(true).optional(),
  inserted: z.literal(true).optional(),
  updated: z.literal(true).optional(),
  skipped: z.literal(true).optional(),
  errors: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  finishedAt: z.literal(true).optional()
}).strict();
export const ImportLogMinAggregateInputObjectSchema: z.ZodType<Prisma.ImportLogMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogMinAggregateInputType>;
export const ImportLogMinAggregateInputObjectZodSchema = makeSchema();
