import * as z from 'zod';
// prettier-ignore
export const ProductResultSchema = z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    cost: z.string().nullable(),
    stock: z.string().nullable(),
    buyer: z.string().nullable(),
    curveAbc: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ProductResultType = z.infer<typeof ProductResultSchema>;
