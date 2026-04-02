import * as z from 'zod';

export const FluigScalarFieldEnumSchema = z.enum(['id', 'status', 'product', 'code', 'nFluig', 'quantity', 'cost', 'costTotal', 'date', 'createdAt', 'userId'])

export type FluigScalarFieldEnum = z.infer<typeof FluigScalarFieldEnumSchema>;