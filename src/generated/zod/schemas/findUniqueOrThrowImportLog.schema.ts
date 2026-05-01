import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './objects/ImportLogSelect.schema';
import { ImportLogWhereUniqueInputObjectSchema as ImportLogWhereUniqueInputObjectSchema } from './objects/ImportLogWhereUniqueInput.schema';

export const ImportLogFindUniqueOrThrowSchema: z.ZodType<Prisma.ImportLogFindUniqueOrThrowArgs> = z.object({ select: ImportLogSelectObjectSchema.optional(),  where: ImportLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.ImportLogFindUniqueOrThrowArgs>;

export const ImportLogFindUniqueOrThrowZodSchema = z.object({ select: ImportLogSelectObjectSchema.optional(),  where: ImportLogWhereUniqueInputObjectSchema }).strict();