import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  filename: z.boolean().optional(),
  status: z.boolean().optional(),
  totalRows: z.boolean().optional(),
  inserted: z.boolean().optional(),
  updated: z.boolean().optional(),
  skipped: z.boolean().optional(),
  errors: z.boolean().optional(),
  errorDetail: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  finishedAt: z.boolean().optional()
}).strict();
export const ImportLogSelectObjectSchema: z.ZodType<Prisma.ImportLogSelect> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogSelect>;
export const ImportLogSelectObjectZodSchema = makeSchema();
