import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { FluigSelectObjectSchema as FluigSelectObjectSchema } from './objects/FluigSelect.schema';
import { FluigIncludeObjectSchema as FluigIncludeObjectSchema } from './objects/FluigInclude.schema';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './objects/FluigWhereUniqueInput.schema';

export const FluigDeleteOneSchema: z.ZodType<Prisma.FluigDeleteArgs> = z.object({ select: FluigSelectObjectSchema.optional(), include: FluigIncludeObjectSchema.optional(), where: FluigWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FluigDeleteArgs>;

export const FluigDeleteOneZodSchema = z.object({ select: FluigSelectObjectSchema.optional(), include: FluigIncludeObjectSchema.optional(), where: FluigWhereUniqueInputObjectSchema }).strict();