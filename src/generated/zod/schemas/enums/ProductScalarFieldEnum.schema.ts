import * as z from 'zod';

export const ProductScalarFieldEnumSchema = z.enum(['id', 'code', 'name', 'cost', 'stock', 'buyer', 'curveAbc', 'createdAt', 'updatedAt'])

export type ProductScalarFieldEnum = z.infer<typeof ProductScalarFieldEnumSchema>;