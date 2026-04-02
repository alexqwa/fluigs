import * as z from 'zod';
// prettier-ignore
export const RateLimitResultSchema = z.object({
    id: z.string(),
    key: z.string(),
    count: z.number().int(),
    lastRequest: z.bigint()
}).strict();

export type RateLimitResultType = z.infer<typeof RateLimitResultSchema>;
