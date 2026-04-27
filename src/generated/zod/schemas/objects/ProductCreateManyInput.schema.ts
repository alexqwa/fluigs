import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  code: z.string(),
  name: z.string(),
  cost: z.string().optional().nullable(),
  stock: z.string().optional().nullable(),
  buyer: z.string().optional().nullable(),
  curveAbc: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const ProductCreateManyInputObjectSchema: z.ZodType<Prisma.ProductCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ProductCreateManyInput>;
export const ProductCreateManyInputObjectZodSchema = makeSchema();
