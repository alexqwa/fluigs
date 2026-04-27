import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './objects/ImportLogSelect.schema';
import { ImportLogCreateInputObjectSchema as ImportLogCreateInputObjectSchema } from './objects/ImportLogCreateInput.schema';
import { ImportLogUncheckedCreateInputObjectSchema as ImportLogUncheckedCreateInputObjectSchema } from './objects/ImportLogUncheckedCreateInput.schema';

export const ImportLogCreateOneSchema: z.ZodType<Prisma.ImportLogCreateArgs> = z.object({ select: ImportLogSelectObjectSchema.optional(),  data: z.union([ImportLogCreateInputObjectSchema, ImportLogUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.ImportLogCreateArgs>;

export const ImportLogCreateOneZodSchema = z.object({ select: ImportLogSelectObjectSchema.optional(),  data: z.union([ImportLogCreateInputObjectSchema, ImportLogUncheckedCreateInputObjectSchema]) }).strict();