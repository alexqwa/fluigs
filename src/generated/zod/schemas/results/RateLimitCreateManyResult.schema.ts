import * as z from 'zod';
export const RateLimitCreateManyResultSchema = z.object({
  count: z.number()
});