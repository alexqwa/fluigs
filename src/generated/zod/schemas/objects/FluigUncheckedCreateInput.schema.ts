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
  createdAt: z.coerce.date().optional(),
  userId: z.string()
}).strict();
export const FluigUncheckedCreateInputObjectSchema: z.ZodType<Prisma.FluigUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigUncheckedCreateInput>;
export const FluigUncheckedCreateInputObjectZodSchema = makeSchema();
