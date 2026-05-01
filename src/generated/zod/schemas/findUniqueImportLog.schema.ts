import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './objects/ImportLogSelect.schema';
import { ImportLogWhereUniqueInputObjectSchema as ImportLogWhereUniqueInputObjectSchema } from './objects/ImportLogWhereUniqueInput.schema';

export const ImportLogFindUniqueSchema: z.ZodType<Prisma.ImportLogFindUniqueArgs> = z.object({ select: ImportLogSelectObjectSchema.optional(),  where: ImportLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ImportLogFindUniqueArgs>;

export const ImportLogFindUniqueZodSchema = z.object({ select: ImportLogSelectObjectSchema.optional(),  where: ImportLogWhereUniqueInputObjectSchema }).strict();