import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './FluigWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => FluigWhereInputObjectSchema).optional(),
  some: z.lazy(() => FluigWhereInputObjectSchema).optional(),
  none: z.lazy(() => FluigWhereInputObjectSchema).optional()
}).strict();
export const FluigListRelationFilterObjectSchema: z.ZodType<Prisma.FluigListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.FluigListRelationFilter>;
export const FluigListRelationFilterObjectZodSchema = makeSchema();
