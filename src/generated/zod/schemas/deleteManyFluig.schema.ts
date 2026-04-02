import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './objects/FluigWhereInput.schema';

export const FluigDeleteManySchema: z.ZodType<Prisma.FluigDeleteManyArgs> = z.object({ where: FluigWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FluigDeleteManyArgs>;

export const FluigDeleteManyZodSchema = z.object({ where: FluigWhereInputObjectSchema.optional() }).strict();