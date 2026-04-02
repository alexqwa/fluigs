import * as z from 'zod';
export const RateLimitUpsertResultSchema = z.object({
  id: z.string(),
  key: z.string(),
  count: z.number().int(),
  lastRequest: z.bigint()
});