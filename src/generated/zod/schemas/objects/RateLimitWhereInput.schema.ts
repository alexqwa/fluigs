import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema'

const ratelimitwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => RateLimitWhereInputObjectSchema), z.lazy(() => RateLimitWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => RateLimitWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => RateLimitWhereInputObjectSchema), z.lazy(() => RateLimitWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  key: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  count: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  lastRequest: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional()
}).strict();
export const RateLimitWhereInputObjectSchema: z.ZodType<Prisma.RateLimitWhereInput> = ratelimitwhereinputSchema as unknown as z.ZodType<Prisma.RateLimitWhereInput>;
export const RateLimitWhereInputObjectZodSchema = ratelimitwhereinputSchema;
