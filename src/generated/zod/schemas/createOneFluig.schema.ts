import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigSelectObjectSchema as FluigSelectObjectSchema } from './objects/FluigSelect.schema';
import { FluigIncludeObjectSchema as FluigIncludeObjectSchema } from './objects/FluigInclude.schema';
import { FluigCreateInputObjectSchema as FluigCreateInputObjectSchema } from './objects/FluigCreateInput.schema';
import { FluigUncheckedCreateInputObjectSchema as FluigUncheckedCreateInputObjectSchema } from './objects/FluigUncheckedCreateInput.schema';

export const FluigCreateOneSchema: z.ZodType<Prisma.FluigCreateArgs> = z.object({ select: FluigSelectObjectSchema.optional(), include: FluigIncludeObjectSchema.optional(), data: z.union([FluigCreateInputObjectSchema, FluigUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.FluigCreateArgs>;

export const FluigCreateOneZodSchema = z.object({ select: FluigSelectObjectSchema.optional(), include: FluigIncludeObjectSchema.optional(), data: z.union([FluigCreateInputObjectSchema, FluigUncheckedCreateInputObjectSchema]) }).strict();