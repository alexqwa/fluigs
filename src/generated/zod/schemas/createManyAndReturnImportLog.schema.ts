import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './objects/ImportLogSelect.schema';
import { ImportLogCreateManyInputObjectSchema as ImportLogCreateManyInputObjectSchema } from './objects/ImportLogCreateManyInput.schema';

export const ImportLogCreateManyAndReturnSchema: z.ZodType<Prisma.ImportLogCreateManyAndReturnArgs> = z.object({ select: ImportLogSelectObjectSchema.optional(), data: z.union([ ImportLogCreateManyInputObjectSchema, z.array(ImportLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ImportLogCreateManyAndReturnArgs>;

export const ImportLogCreateManyAndReturnZodSchema = z.object({ select: ImportLogSelectObjectSchema.optional(), data: z.union([ ImportLogCreateManyInputObjectSchema, z.array(ImportLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();