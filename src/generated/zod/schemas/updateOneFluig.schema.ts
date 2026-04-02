import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigSelectObjectSchema as FluigSelectObjectSchema } from './objects/FluigSelect.schema';
import { FluigIncludeObjectSchema as FluigIncludeObjectSchema } from './objects/FluigInclude.schema';
import { FluigUpdateInputObjectSchema as FluigUpdateInputObjectSchema } from './objects/FluigUpdateInput.schema';
import { FluigUncheckedUpdateInputObjectSchema as FluigUncheckedUpdateInputObjectSchema } from './objects/FluigUncheckedUpdateInput.schema';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './objects/FluigWhereUniqueInput.schema';

export const FluigUpdateOneSchema: z.ZodType<Prisma.FluigUpdateArgs> = z.object({ select: FluigSelectObjectSchema.optional(), include: FluigIncludeObjectSchema.optional(), data: z.union([FluigUpdateInputObjectSchema, FluigUncheckedUpdateInputObjectSchema]), where: FluigWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FluigUpdateArgs>;

export const FluigUpdateOneZodSchema = z.object({ select: FluigSelectObjectSchema.optional(), include: FluigIncludeObjectSchema.optional(), data: z.union([FluigUpdateInputObjectSchema, FluigUncheckedUpdateInputObjectSchema]), where: FluigWhereUniqueInputObjectSchema }).strict();