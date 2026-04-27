import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogCreateManyInputObjectSchema as ImportLogCreateManyInputObjectSchema } from './objects/ImportLogCreateManyInput.schema';

export const ImportLogCreateManySchema: z.ZodType<Prisma.ImportLogCreateManyArgs> = z.object({ data: z.union([ ImportLogCreateManyInputObjectSchema, z.array(ImportLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.ImportLogCreateManyArgs>;

export const ImportLogCreateManyZodSchema = z.object({ data: z.union([ ImportLogCreateManyInputObjectSchema, z.array(ImportLogCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();