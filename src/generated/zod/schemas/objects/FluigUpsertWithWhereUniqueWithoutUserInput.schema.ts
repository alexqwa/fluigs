import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './FluigWhereUniqueInput.schema';
import { FluigUpdateWithoutUserInputObjectSchema as FluigUpdateWithoutUserInputObjectSchema } from './FluigUpdateWithoutUserInput.schema';
import { FluigUncheckedUpdateWithoutUserInputObjectSchema as FluigUncheckedUpdateWithoutUserInputObjectSchema } from './FluigUncheckedUpdateWithoutUserInput.schema';
import { FluigCreateWithoutUserInputObjectSchema as FluigCreateWithoutUserInputObjectSchema } from './FluigCreateWithoutUserInput.schema';
import { FluigUncheckedCreateWithoutUserInputObjectSchema as FluigUncheckedCreateWithoutUserInputObjectSchema } from './FluigUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FluigWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => FluigUpdateWithoutUserInputObjectSchema), z.lazy(() => FluigUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => FluigCreateWithoutUserInputObjectSchema), z.lazy(() => FluigUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const FluigUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.FluigUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigUpsertWithWhereUniqueWithoutUserInput>;
export const FluigUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
