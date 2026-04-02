import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  nFluig: z.literal(true).optional()
}).strict();
export const FluigAvgAggregateInputObjectSchema: z.ZodType<Prisma.FluigAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.FluigAvgAggregateInputType>;
export const FluigAvgAggregateInputObjectZodSchema = makeSchema();
