import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  filename: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  totalRows: SortOrderSchema.optional(),
  inserted: SortOrderSchema.optional(),
  updated: SortOrderSchema.optional(),
  skipped: SortOrderSchema.optional(),
  errors: SortOrderSchema.optional(),
  errorDetail: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  finishedAt: SortOrderSchema.optional()
}).strict();
export const ImportLogOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ImportLogOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogOrderByWithRelationInput>;
export const ImportLogOrderByWithRelationInputObjectZodSchema = makeSchema();
