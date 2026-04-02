import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const FluigWhereUniqueInputObjectSchema: z.ZodType<Prisma.FluigWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.FluigWhereUniqueInput>;
export const FluigWhereUniqueInputObjectZodSchema = makeSchema();
