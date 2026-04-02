import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigSelectObjectSchema as FluigSelectObjectSchema } from './FluigSelect.schema';
import { FluigIncludeObjectSchema as FluigIncludeObjectSchema } from './FluigInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => FluigSelectObjectSchema).optional(),
  include: z.lazy(() => FluigIncludeObjectSchema).optional()
}).strict();
export const FluigArgsObjectSchema = makeSchema();
export const FluigArgsObjectZodSchema = makeSchema();
