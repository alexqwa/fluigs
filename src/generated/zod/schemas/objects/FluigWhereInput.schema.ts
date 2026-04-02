import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { EnumStatusFilterObjectSchema as EnumStatusFilterObjectSchema } from './EnumStatusFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const fluigwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FluigWhereInputObjectSchema), z.lazy(() => FluigWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FluigWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FluigWhereInputObjectSchema), z.lazy(() => FluigWhereInputObjectSchema).array()]).optional(),
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
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const FluigWhereInputObjectSchema: z.ZodType<Prisma.FluigWhereInput> = fluigwhereinputSchema as unknown as z.ZodType<Prisma.FluigWhereInput>;
export const FluigWhereInputObjectZodSchema = fluigwhereinputSchema;
