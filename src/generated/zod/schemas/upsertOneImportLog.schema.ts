import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './objects/ImportLogSelect.schema';
import { ImportLogWhereUniqueInputObjectSchema as ImportLogWhereUniqueInputObjectSchema } from './objects/ImportLogWhereUniqueInput.schema';
import { ImportLogCreateInputObjectSchema as ImportLogCreateInputObjectSchema } from './objects/ImportLogCreateInput.schema';
import { ImportLogUncheckedCreateInputObjectSchema as ImportLogUncheckedCreateInputObjectSchema } from './objects/ImportLogUncheckedCreateInput.schema';
import { ImportLogUpdateInputObjectSchema as ImportLogUpdateInputObjectSchema } from './objects/ImportLogUpdateInput.schema';
import { ImportLogUncheckedUpdateInputObjectSchema as ImportLogUncheckedUpdateInputObjectSchema } from './objects/ImportLogUncheckedUpdateInput.schema';

export const ImportLogUpsertOneSchema: z.ZodType<Prisma.ImportLogUpsertArgs> = z.object({ select: ImportLogSelectObjectSchema.optional(),  where: ImportLogWhereUniqueInputObjectSchema, create: z.union([ ImportLogCreateInputObjectSchema, ImportLogUncheckedCreateInputObjectSchema ]), update: z.union([ ImportLogUpdateInputObjectSchema, ImportLogUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.ImportLogUpsertArgs>;

export const ImportLogUpsertOneZodSchema = z.object({ select: ImportLogSelectObjectSchema.optional(),  where: ImportLogWhereUniqueInputObjectSchema, create: z.union([ ImportLogCreateInputObjectSchema, ImportLogUncheckedCreateInputObjectSchema ]), update: z.union([ ImportLogUpdateInputObjectSchema, ImportLogUncheckedUpdateInputObjectSchema ]) }).strict();