import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigScalarWhereInputObjectSchema as FluigScalarWhereInputObjectSchema } from './FluigScalarWhereInput.schema';
import { FluigUpdateManyMutationInputObjectSchema as FluigUpdateManyMutationInputObjectSchema } from './FluigUpdateManyMutationInput.schema';
import { FluigUncheckedUpdateManyWithoutUserInputObjectSchema as FluigUncheckedUpdateManyWithoutUserInputObjectSchema } from './FluigUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FluigScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => FluigUpdateManyMutationInputObjectSchema), z.lazy(() => FluigUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const FluigUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.FluigUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigUpdateManyWithWhereWithoutUserInput>;
export const FluigUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
