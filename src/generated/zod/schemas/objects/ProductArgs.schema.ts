import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ProductSelectObjectSchema as ProductSelectObjectSchema } from './ProductSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ProductSelectObjectSchema).optional()
}).strict();
export const ProductArgsObjectSchema = makeSchema();
export const ProductArgsObjectZodSchema = makeSchema();
