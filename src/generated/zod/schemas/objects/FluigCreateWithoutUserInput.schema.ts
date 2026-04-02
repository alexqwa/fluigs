import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StatusSchema } from '../enums/Status.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  status: StatusSchema.optional(),
  product: z.string(),
  code: z.string(),
  nFluig: z.number().int(),
  quantity: z.string(),
  cost: z.string(),
  costTotal: z.string(),
  date: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const FluigCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.FluigCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigCreateWithoutUserInput>;
export const FluigCreateWithoutUserInputObjectZodSchema = makeSchema();
