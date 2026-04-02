import * as z from 'zod';
// prettier-ignore
export const RateLimitInputSchema = z.object({
    id: z.string(),
    key: z.string(),
    count: z.number().int(),
    lastRequest: z.bigint()
}).strict();

export type RateLimitInputType = z.infer<typeof RateLimitInputSchema>;
