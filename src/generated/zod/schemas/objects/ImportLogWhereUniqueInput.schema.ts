import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ImportLogWhereUniqueInputObjectSchema: z.ZodType<Prisma.ImportLogWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ImportLogWhereUniqueInput>;
export const ImportLogWhereUniqueInputObjectZodSchema = makeSchema();
