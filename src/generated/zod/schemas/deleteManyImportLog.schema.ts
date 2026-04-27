import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogWhereInputObjectSchema as ImportLogWhereInputObjectSchema } from './objects/ImportLogWhereInput.schema';

export const ImportLogDeleteManySchema: z.ZodType<Prisma.ImportLogDeleteManyArgs> = z.object({ where: ImportLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ImportLogDeleteManyArgs>;

export const ImportLogDeleteManyZodSchema = z.object({ where: ImportLogWhereInputObjectSchema.optional() }).strict();