import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigUpdateManyMutationInputObjectSchema as FluigUpdateManyMutationInputObjectSchema } from './objects/FluigUpdateManyMutationInput.schema';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './objects/FluigWhereInput.schema';

export const FluigUpdateManySchema: z.ZodType<Prisma.FluigUpdateManyArgs> = z.object({ data: FluigUpdateManyMutationInputObjectSchema, where: FluigWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FluigUpdateManyArgs>;

export const FluigUpdateManyZodSchema = z.object({ data: FluigUpdateManyMutationInputObjectSchema, where: FluigWhereInputObjectSchema.optional() }).strict();