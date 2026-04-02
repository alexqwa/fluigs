import * as z from 'zod';

export const RateLimitScalarFieldEnumSchema = z.enum(['id', 'key', 'count', 'lastRequest'])

export type RateLimitScalarFieldEnum = z.infer<typeof RateLimitScalarFieldEnumSchema>;