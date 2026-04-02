import * as z from 'zod';
// prettier-ignore
export const RateLimitModelSchema = z.object({
    id: z.string(),
    key: z.string(),
    count: z.number().int(),
    lastRequest: z.bigint()
}).strict();

export type RateLimitPureType = z.infer<typeof RateLimitModelSchema>;
