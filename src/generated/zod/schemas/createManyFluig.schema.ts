import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigCreateManyInputObjectSchema as FluigCreateManyInputObjectSchema } from './objects/FluigCreateManyInput.schema';

export const FluigCreateManySchema: z.ZodType<Prisma.FluigCreateManyArgs> = z.object({ data: z.union([ FluigCreateManyInputObjectSchema, z.array(FluigCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.FluigCreateManyArgs>;

export const FluigCreateManyZodSchema = z.object({ data: z.union([ FluigCreateManyInputObjectSchema, z.array(FluigCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();