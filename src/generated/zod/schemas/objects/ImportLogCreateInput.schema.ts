import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ImportStatusSchema } from '../enums/ImportStatus.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  filename: z.string(),
  status: ImportStatusSchema.optional(),
  totalRows: z.number().int().optional(),
  inserted: z.number().int().optional(),
  updated: z.number().int().optional(),
  skipped: z.number().int().optional(),
  errors: z.number().int().optional(),
  errorDetail: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  finishedAt: z.coerce.date()
}).strict();
export const ImportLogCreateInputObjectSchema: z.ZodType<Prisma.ImportLogCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogCreateInput>;
export const ImportLogCreateInputObjectZodSchema = makeSchema();
