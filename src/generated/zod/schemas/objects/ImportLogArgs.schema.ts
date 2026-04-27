import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { ImportLogSelectObjectSchema as ImportLogSelectObjectSchema } from './ImportLogSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => ImportLogSelectObjectSchema).optional()
}).strict();
export const ImportLogArgsObjectSchema = makeSchema();
export const ImportLogArgsObjectZodSchema = makeSchema();
