import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCreateWithoutFluigsInputObjectSchema as UserCreateWithoutFluigsInputObjectSchema } from './UserCreateWithoutFluigsInput.schema';
import { UserUncheckedCreateWithoutFluigsInputObjectSchema as UserUncheckedCreateWithoutFluigsInputObjectSchema } from './UserUncheckedCreateWithoutFluigsInput.schema';
import { UserCreateOrConnectWithoutFluigsInputObjectSchema as UserCreateOrConnectWithoutFluigsInputObjectSchema } from './UserCreateOrConnectWithoutFluigsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutFluigsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutFluigsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFluigsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutFluigsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutFluigsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutFluigsInput>;
export const UserCreateNestedOneWithoutFluigsInputObjectZodSchema = makeSchema();
