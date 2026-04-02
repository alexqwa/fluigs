import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumStatusFilterObjectSchema as EnumStatusFilterObjectSchema } from './EnumStatusFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

const fluigscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FluigScalarWhereInputObjectSchema), z.lazy(() => FluigScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FluigScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FluigScalarWhereInputObjectSchema), z.lazy(() => FluigScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumStatusFilterObjectSchema), StatusSchema]).optional(),
  product: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  nFluig: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  quantity: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cost: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  costTotal: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional()
}).strict();
export const FluigScalarWhereInputObjectSchema: z.ZodType<Prisma.FluigScalarWhereInput> = fluigscalarwhereinputSchema as unknown as z.ZodType<Prisma.FluigScalarWhereInput>;
export const FluigScalarWhereInputObjectZodSchema = fluigscalarwhereinputSchema;
