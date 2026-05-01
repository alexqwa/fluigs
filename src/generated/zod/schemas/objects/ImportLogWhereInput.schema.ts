import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumImportStatusFilterObjectSchema as EnumImportStatusFilterObjectSchema } from './EnumImportStatusFilter.schema';
import { ImportStatusSchema } from '../enums/ImportStatus.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const importlogwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ImportLogWhereInputObjectSchema), z.lazy(() => ImportLogWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ImportLogWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ImportLogWhereInputObjectSchema), z.lazy(() => ImportLogWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  filename: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumImportStatusFilterObjectSchema), ImportStatusSchema]).optional(),
  totalRows: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  inserted: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  updated: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  skipped: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  errors: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  errorDetail: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  finishedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ImportLogWhereInputObjectSchema: z.ZodType<Prisma.ImportLogWhereInput> = importlogwhereinputSchema as unknown as z.ZodType<Prisma.ImportLogWhereInput>;
export const ImportLogWhereInputObjectZodSchema = importlogwhereinputSchema;
