import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './objects/ImportLogSelect.schema';
import { ImportLogWhereUniqueInputObjectSchema as ImportLogWhereUniqueInputObjectSchema } from './objects/ImportLogWhereUniqueInput.schema';

export const ImportLogDeleteOneSchema: z.ZodType<Prisma.ImportLogDeleteArgs> = z.object({ select: ImportLogSelectObjectSchema.optional(),  where: ImportLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ImportLogDeleteArgs>;

export const ImportLogDeleteOneZodSchema = z.object({ select: ImportLogSelectObjectSchema.optional(),  where: ImportLogWhereUniqueInputObjectSchema }).strict();