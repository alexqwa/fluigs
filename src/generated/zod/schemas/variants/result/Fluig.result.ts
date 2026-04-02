import * as z from 'zod';
import { StatusSchema } from '../../enums/Status.schema';
// prettier-ignore
export const FluigResultSchema = z.object({
    id: z.string(),
    status: StatusSchema,
    product: z.string(),
    code: z.string(),
    nFluig: z.number().int(),
    quantity: z.string(),
    cost: z.string(),
    costTotal: z.string(),
    date: z.date(),
    createdAt: z.date(),
    userId: z.string(),
    user: z.unknown()
}).strict();

export type FluigResultType = z.infer<typeof FluigResultSchema>;
