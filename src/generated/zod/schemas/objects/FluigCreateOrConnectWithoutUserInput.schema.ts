import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './FluigWhereUniqueInput.schema';
import { FluigCreateWithoutUserInputObjectSchema as FluigCreateWithoutUserInputObjectSchema } from './FluigCreateWithoutUserInput.schema';
import { FluigUncheckedCreateWithoutUserInputObjectSchema as FluigUncheckedCreateWithoutUserInputObjectSchema } from './FluigUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FluigWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FluigCreateWithoutUserInputObjectSchema), z.lazy(() => FluigUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const FluigCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.FluigCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigCreateOrConnectWithoutUserInput>;
export const FluigCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
