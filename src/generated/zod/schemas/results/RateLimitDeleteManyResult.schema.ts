import * as z from 'zod';
export const RateLimitDeleteManyResultSchema = z.object({
  count: z.number()
});