import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigCreateManyUserInputObjectSchema as FluigCreateManyUserInputObjectSchema } from './FluigCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => FluigCreateManyUserInputObjectSchema), z.lazy(() => FluigCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const FluigCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.FluigCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.FluigCreateManyUserInputEnvelope>;
export const FluigCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
