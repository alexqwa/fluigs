import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BigIntWithAggregatesFilterObjectSchema as BigIntWithAggregatesFilterObjectSchema } from './BigIntWithAggregatesFilter.schema'

const ratelimitscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => RateLimitScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RateLimitScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RateLimitScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RateLimitScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => RateLimitScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  key: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  count: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  lastRequest: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional()
}).strict();
export const RateLimitScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.RateLimitScalarWhereWithAggregatesInput> = ratelimitscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.RateLimitScalarWhereWithAggregatesInput>;
export const RateLimitScalarWhereWithAggregatesInputObjectZodSchema = ratelimitscalarwherewithaggregatesinputSchema;
