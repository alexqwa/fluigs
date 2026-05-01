import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  totalRows: z.literal(true).optional(),
  inserted: z.literal(true).optional(),
  updated: z.literal(true).optional(),
  skipped: z.literal(true).optional(),
  errors: z.literal(true).optional()
}).strict();
export const ImportLogAvgAggregateInputObjectSchema: z.ZodType<Prisma.ImportLogAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogAvgAggregateInputType>;
export const ImportLogAvgAggregateInputObjectZodSchema = makeSchema();
