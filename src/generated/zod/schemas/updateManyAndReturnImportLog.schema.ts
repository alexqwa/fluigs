import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './objects/ImportLogSelect.schema';
import { ImportLogUpdateManyMutationInputObjectSchema as ImportLogUpdateManyMutationInputObjectSchema } from './objects/ImportLogUpdateManyMutationInput.schema';
import { ImportLogWhereInputObjectSchema as ImportLogWhereInputObjectSchema } from './objects/ImportLogWhereInput.schema';

export const ImportLogUpdateManyAndReturnSchema: z.ZodType<Prisma.ImportLogUpdateManyAndReturnArgs> = z.object({ select: ImportLogSelectObjectSchema.optional(), data: ImportLogUpdateManyMutationInputObjectSchema, where: ImportLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ImportLogUpdateManyAndReturnArgs>;

export const ImportLogUpdateManyAndReturnZodSchema = z.object({ select: ImportLogSelectObjectSchema.optional(), data: ImportLogUpdateManyMutationInputObjectSchema, where: ImportLogWhereInputObjectSchema.optional() }).strict();