import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigSelectObjectSchema as FluigSelectObjectSchema } from './objects/FluigSelect.schema';
import { FluigIncludeObjectSchema as FluigIncludeObjectSchema } from './objects/FluigInclude.schema';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './objects/FluigWhereUniqueInput.schema';
import { FluigCreateInputObjectSchema as FluigCreateInputObjectSchema } from './objects/FluigCreateInput.schema';
import { FluigUncheckedCreateInputObjectSchema as FluigUncheckedCreateInputObjectSchema } from './objects/FluigUncheckedCreateInput.schema';
import { FluigUpdateInputObjectSchema as FluigUpdateInputObjectSchema } from './objects/FluigUpdateInput.schema';
import { FluigUncheckedUpdateInputObjectSchema as FluigUncheckedUpdateInputObjectSchema } from './objects/FluigUncheckedUpdateInput.schema';

export const FluigUpsertOneSchema: z.ZodType<Prisma.FluigUpsertArgs> = z.object({ select: FluigSelectObjectSchema.optional(), include: FluigIncludeObjectSchema.optional(), where: FluigWhereUniqueInputObjectSchema, create: z.union([ FluigCreateInputObjectSchema, FluigUncheckedCreateInputObjectSchema ]), update: z.union([ FluigUpdateInputObjectSchema, FluigUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.FluigUpsertArgs>;

export const FluigUpsertOneZodSchema = z.object({ select: FluigSelectObjectSchema.optional(), include: FluigIncludeObjectSchema.optional(), where: FluigWhereUniqueInputObjectSchema, create: z.union([ FluigCreateInputObjectSchema, FluigUncheckedCreateInputObjectSchema ]), update: z.union([ FluigUpdateInputObjectSchema, FluigUncheckedUpdateInputObjectSchema ]) }).strict();