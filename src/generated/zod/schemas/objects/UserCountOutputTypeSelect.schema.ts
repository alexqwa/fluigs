import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCountOutputTypeCountFluigsArgsObjectSchema as UserCountOutputTypeCountFluigsArgsObjectSchema } from './UserCountOutputTypeCountFluigsArgs.schema';
import { UserCountOutputTypeCountAccountsArgsObjectSchema as UserCountOutputTypeCountAccountsArgsObjectSchema } from './UserCountOutputTypeCountAccountsArgs.schema';
import { UserCountOutputTypeCountSessionsArgsObjectSchema as UserCountOutputTypeCountSessionsArgsObjectSchema } from './UserCountOutputTypeCountSessionsArgs.schema'

const makeSchema = () => z.object({
  fluigs: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountFluigsArgsObjectSchema)]).optional(),
  accounts: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAccountsArgsObjectSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountSessionsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
