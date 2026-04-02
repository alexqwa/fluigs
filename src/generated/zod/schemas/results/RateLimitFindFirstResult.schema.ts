import * as z from 'zod';
export const RateLimitFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  key: z.string(),
  count: z.number().int(),
  lastRequest: z.bigint()
}));