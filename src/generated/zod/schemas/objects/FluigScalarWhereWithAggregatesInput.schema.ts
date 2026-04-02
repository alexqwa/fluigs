import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { EnumStatusWithAggregatesFilterObjectSchema as EnumStatusWithAggregatesFilterObjectSchema } from './EnumStatusWithAggregatesFilter.schema';
import { StatusSchema } from '../enums/Status.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

const fluigscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => FluigScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FluigScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FluigScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FluigScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FluigScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  status: z.union([z.lazy(() => EnumStatusWithAggregatesFilterObjectSchema), StatusSchema]).optional(),
  product: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  code: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  nFluig: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  quantity: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  cost: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  costTotal: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  date: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional()
}).strict();
export const FluigScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.FluigScalarWhereWithAggregatesInput> = fluigscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.FluigScalarWhereWithAggregatesInput>;
export const FluigScalarWhereWithAggregatesInputObjectZodSchema = fluigscalarwherewithaggregatesinputSchema;
