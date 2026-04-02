import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigSelectObjectSchema as FluigSelectObjectSchema } from './objects/FluigSelect.schema';
import { FluigUpdateManyMutationInputObjectSchema as FluigUpdateManyMutationInputObjectSchema } from './objects/FluigUpdateManyMutationInput.schema';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './objects/FluigWhereInput.schema';

export const FluigUpdateManyAndReturnSchema: z.ZodType<Prisma.FluigUpdateManyAndReturnArgs> = z.object({ select: FluigSelectObjectSchema.optional(), data: FluigUpdateManyMutationInputObjectSchema, where: FluigWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FluigUpdateManyAndReturnArgs>;

export const FluigUpdateManyAndReturnZodSchema = z.object({ select: FluigSelectObjectSchema.optional(), data: FluigUpdateManyMutationInputObjectSchema, where: FluigWhereInputObjectSchema.optional() }).strict();