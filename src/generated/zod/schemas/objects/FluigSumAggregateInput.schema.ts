import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  nFluig: z.literal(true).optional()
}).strict();
export const FluigSumAggregateInputObjectSchema: z.ZodType<Prisma.FluigSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FluigSumAggregateInputType>;
export const FluigSumAggregateInputObjectZodSchema = makeSchema();
