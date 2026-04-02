import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigCreateWithoutUserInputObjectSchema as FluigCreateWithoutUserInputObjectSchema } from './FluigCreateWithoutUserInput.schema';
import { FluigUncheckedCreateWithoutUserInputObjectSchema as FluigUncheckedCreateWithoutUserInputObjectSchema } from './FluigUncheckedCreateWithoutUserInput.schema';
import { FluigCreateOrConnectWithoutUserInputObjectSchema as FluigCreateOrConnectWithoutUserInputObjectSchema } from './FluigCreateOrConnectWithoutUserInput.schema';
import { FluigUpsertWithWhereUniqueWithoutUserInputObjectSchema as FluigUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './FluigUpsertWithWhereUniqueWithoutUserInput.schema';
import { FluigCreateManyUserInputEnvelopeObjectSchema as FluigCreateManyUserInputEnvelopeObjectSchema } from './FluigCreateManyUserInputEnvelope.schema';
import { FluigWhereUniqueInputObjectSchema as FluigWhereUniqueInputObjectSchema } from './FluigWhereUniqueInput.schema';
import { FluigUpdateWithWhereUniqueWithoutUserInputObjectSchema as FluigUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './FluigUpdateWithWhereUniqueWithoutUserInput.schema';
import { FluigUpdateManyWithWhereWithoutUserInputObjectSchema as FluigUpdateManyWithWhereWithoutUserInputObjectSchema } from './FluigUpdateManyWithWhereWithoutUserInput.schema';
import { FluigScalarWhereInputObjectSchema as FluigScalarWhereInputObjectSchema } from './FluigScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FluigCreateWithoutUserInputObjectSchema), z.lazy(() => FluigCreateWithoutUserInputObjectSchema).array(), z.lazy(() => FluigUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => FluigUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => FluigCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => FluigCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => FluigUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => FluigUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => FluigCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => FluigWhereUniqueInputObjectSchema), z.lazy(() => FluigWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => FluigWhereUniqueInputObjectSchema), z.lazy(() => FluigWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => FluigWhereUniqueInputObjectSchema), z.lazy(() => FluigWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => FluigWhereUniqueInputObjectSchema), z.lazy(() => FluigWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => FluigUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => FluigUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => FluigUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => FluigUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => FluigScalarWhereInputObjectSchema), z.lazy(() => FluigScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const FluigUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.FluigUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigUpdateManyWithoutUserNestedInput>;
export const FluigUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
