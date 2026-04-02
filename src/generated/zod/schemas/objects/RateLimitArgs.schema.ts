import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { RateLimitSelectObjectSchema as RateLimitSelectObjectSchema } from './RateLimitSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => RateLimitSelectObjectSchema).optional()
}).strict();
export const RateLimitArgsObjectSchema = makeSchema();
export const RateLimitArgsObjectZodSchema = makeSchema();
