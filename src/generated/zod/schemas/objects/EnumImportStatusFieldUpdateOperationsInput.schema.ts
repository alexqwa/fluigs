import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ImportStatusSchema } from '../enums/ImportStatus.schema'

const makeSchema = () => z.object({
  set: ImportStatusSchema.optional()
}).strict();
export const EnumImportStatusFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumImportStatusFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumImportStatusFieldUpdateOperationsInput>;
export const EnumImportStatusFieldUpdateOperationsInputObjectZodSchema = makeSchema();
