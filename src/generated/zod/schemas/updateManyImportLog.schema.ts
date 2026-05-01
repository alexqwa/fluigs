import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogUpdateManyMutationInputObjectSchema as ImportLogUpdateManyMutationInputObjectSchema } from './objects/ImportLogUpdateManyMutationInput.schema';
import { ImportLogWhereInputObjectSchema as ImportLogWhereInputObjectSchema } from './objects/ImportLogWhereInput.schema';

export const ImportLogUpdateManySchema: z.ZodType<Prisma.ImportLogUpdateManyArgs> = z.object({ data: ImportLogUpdateManyMutationInputObjectSchema, where: ImportLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ImportLogUpdateManyArgs>;

export const ImportLogUpdateManyZodSchema = z.object({ data: ImportLogUpdateManyMutationInputObjectSchema, where: ImportLogWhereInputObjectSchema.optional() }).strict();