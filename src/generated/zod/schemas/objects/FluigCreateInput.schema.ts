import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StatusSchema } from '../enums/Status.schema';
import { UserCreateNestedOneWithoutFluigsInputObjectSchema as UserCreateNestedOneWithoutFluigsInputObjectSchema } from './UserCreateNestedOneWithoutFluigsInput.schema'

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
  user: z.lazy(() => UserCreateNestedOneWithoutFluigsInputObjectSchema)
}).strict();
export const FluigCreateInputObjectSchema: z.ZodType<Prisma.FluigCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigCreateInput>;
export const FluigCreateInputObjectZodSchema = makeSchema();
