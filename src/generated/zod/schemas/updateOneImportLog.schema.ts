import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './objects/ImportLogSelect.schema';
import { ImportLogUpdateInputObjectSchema as ImportLogUpdateInputObjectSchema } from './objects/ImportLogUpdateInput.schema';
import { ImportLogUncheckedUpdateInputObjectSchema as ImportLogUncheckedUpdateInputObjectSchema } from './objects/ImportLogUncheckedUpdateInput.schema';
import { ImportLogWhereUniqueInputObjectSchema as ImportLogWhereUniqueInputObjectSchema } from './objects/ImportLogWhereUniqueInput.schema';

export const ImportLogUpdateOneSchema: z.ZodType<Prisma.ImportLogUpdateArgs> = z.object({ select: ImportLogSelectObjectSchema.optional(),  data: z.union([ImportLogUpdateInputObjectSchema, ImportLogUncheckedUpdateInputObjectSchema]), where: ImportLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ImportLogUpdateArgs>;

export const ImportLogUpdateOneZodSchema = z.object({ select: ImportLogSelectObjectSchema.optional(),  data: z.union([ImportLogUpdateInputObjectSchema, ImportLogUncheckedUpdateInputObjectSchema]), where: ImportLogWhereUniqueInputObjectSchema }).strict();