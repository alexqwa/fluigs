import * as z from 'zod';
// prettier-ignore
export const ProductInputSchema = z.object({
    id: z.string(),
    code: z.string(),
    name: z.string(),
    cost: z.string().optional().nullable(),
    stock: z.string().optional().nullable(),
    buyer: z.string().optional().nullable(),
    curveAbc: z.string().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ProductInputType = z.infer<typeof ProductInputSchema>;
