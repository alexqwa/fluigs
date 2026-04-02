import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigCreateWithoutUserInputObjectSchema as FluigCreateWithoutUserInputObjectSchema } from './FluigCreateWithoutUserInput.schema';
import { FluigUncheckedCreateWithoutUserInputObjectSchema as FluigUncheckedCreateWithoutUserInputObjectSchema } from './FluigUncheckedCreateWithoutUserInput.schema';
import { FluigCreateOrConnectWithoutUserInputObjectSchema as FluigCreateOrConnectWithoutUserInputObjectSchema } from './FluigCreateOrConnectWithoutUserInput.schema';
import { FluigCreateManyUserInputEnvelopeObjectSchema as FluigCreateManyUserInputEnvelopeObjectSchema } from './FluigCreateManyUserInputEnvelope.schema';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './FluigWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FluigCreateWithoutUserInputObjectSchema), z.lazy(() => FluigCreateWithoutUserInputObjectSchema).array(), z.lazy(() => FluigUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => FluigUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FluigCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => FluigCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FluigCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => FluigWhereUniqueInputObjectSchema), z.lazy(() => FluigWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const FluigCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.FluigCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigCreateNestedManyWithoutUserInput>;
export const FluigCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
