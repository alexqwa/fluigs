import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './FluigWhereUniqueInput.schema';
import { FluigUpdateWithoutUserInputObjectSchema as FluigUpdateWithoutUserInputObjectSchema } from './FluigUpdateWithoutUserInput.schema';
import { FluigUncheckedUpdateWithoutUserInputObjectSchema as FluigUncheckedUpdateWithoutUserInputObjectSchema } from './FluigUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FluigWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => FluigUpdateWithoutUserInputObjectSchema), z.lazy(() => FluigUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const FluigUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.FluigUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigUpdateWithWhereUniqueWithoutUserInput>;
export const FluigUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
