import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  status: z.boolean().optional(),
  product: z.boolean().optional(),
  code: z.boolean().optional(),
  nFluig: z.boolean().optional(),
  quantity: z.boolean().optional(),
  cost: z.boolean().optional(),
  costTotal: z.boolean().optional(),
  date: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional()
}).strict();
export const FluigSelectObjectSchema: z.ZodType<Prisma.FluigSelect> = makeSchema() as unknown as z.ZodType<Prisma.FluigSelect>;
export const FluigSelectObjectZodSchema = makeSchema();
