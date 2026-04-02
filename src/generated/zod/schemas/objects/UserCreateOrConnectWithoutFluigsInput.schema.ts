import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutFluigsInputObjectSchema as UserCreateWithoutFluigsInputObjectSchema } from './UserCreateWithoutFluigsInput.schema';
import { UserUncheckedCreateWithoutFluigsInputObjectSchema as UserUncheckedCreateWithoutFluigsInputObjectSchema } from './UserUncheckedCreateWithoutFluigsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutFluigsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutFluigsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutFluigsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutFluigsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutFluigsInput>;
export const UserCreateOrConnectWithoutFluigsInputObjectZodSchema = makeSchema();
