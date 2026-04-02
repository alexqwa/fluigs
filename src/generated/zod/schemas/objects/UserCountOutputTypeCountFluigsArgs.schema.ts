import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { FluigWhereInputObjectSchema as FluigWhereInputObjectSchema } from './FluigWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FluigWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountFluigsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountFluigsArgsObjectZodSchema = makeSchema();
