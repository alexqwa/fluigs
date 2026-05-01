import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumImportStatusWithAggregatesFilterObjectSchema as EnumImportStatusWithAggregatesFilterObjectSchema } from './EnumImportStatusWithAggregatesFilter.schema';
import { ImportStatusSchema } from '../enums/ImportStatus.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const importlogscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ImportLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ImportLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ImportLogScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ImportLogScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ImportLogScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  filename: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumImportStatusWithAggregatesFilterObjectSchema), ImportStatusSchema]).optional(),
  totalRows: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  inserted: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  updated: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  skipped: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  errors: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  errorDetail: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  finishedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ImportLogScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ImportLogScalarWhereWithAggregatesInput> = importlogscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ImportLogScalarWhereWithAggregatesInput>;
export const ImportLogScalarWhereWithAggregatesInputObjectZodSchema = importlogscalarwherewithaggregatesinputSchema;
