import * as z from 'zod';
export const RateLimitUpdateResultSchema = z.nullable(z.object({
  id: z.string(),
  key: z.string(),
  count: z.number().int(),
  lastRequest: z.bigint()
}));