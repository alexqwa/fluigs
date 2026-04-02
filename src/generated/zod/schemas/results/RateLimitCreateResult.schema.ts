import * as z from 'zod';
export const RateLimitCreateResultSchema = z.object({
  id: z.string(),
  key: z.string(),
  count: z.number().int(),
  lastRequest: z.bigint()
});