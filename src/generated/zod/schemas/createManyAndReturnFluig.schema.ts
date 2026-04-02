import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigSelectObjectSchema as FluigSelectObjectSchema } from './objects/FluigSelect.schema';
import { FluigCreateManyInputObjectSchema as FluigCreateManyInputObjectSchema } from './objects/FluigCreateManyInput.schema';

export const FluigCreateManyAndReturnSchema: z.ZodType<Prisma.FluigCreateManyAndReturnArgs> = z.object({ select: FluigSelectObjectSchema.optional(), data: z.union([ FluigCreateManyInputObjectSchema, z.array(FluigCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.FluigCreateManyAndReturnArgs>;

export const FluigCreateManyAndReturnZodSchema = z.object({ select: FluigSelectObjectSchema.optional(), data: z.union([ FluigCreateManyInputObjectSchema, z.array(FluigCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();