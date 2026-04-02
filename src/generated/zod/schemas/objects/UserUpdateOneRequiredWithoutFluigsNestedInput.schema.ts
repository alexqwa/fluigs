import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserCreateWithoutFluigsInputObjectSchema as UserCreateWithoutFluigsInputObjectSchema } from './UserCreateWithoutFluigsInput.schema';
import { UserUncheckedCreateWithoutFluigsInputObjectSchema as UserUncheckedCreateWithoutFluigsInputObjectSchema } from './UserUncheckedCreateWithoutFluigsInput.schema';
import { UserCreateOrConnectWithoutFluigsInputObjectSchema as UserCreateOrConnectWithoutFluigsInputObjectSchema } from './UserCreateOrConnectWithoutFluigsInput.schema';
import { UserUpsertWithoutFluigsInputObjectSchema as UserUpsertWithoutFluigsInputObjectSchema } from './UserUpsertWithoutFluigsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutFluigsInputObjectSchema as UserUpdateToOneWithWhereWithoutFluigsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutFluigsInput.schema';
import { UserUpdateWithoutFluigsInputObjectSchema as UserUpdateWithoutFluigsInputObjectSchema } from './UserUpdateWithoutFluigsInput.schema';
import { UserUncheckedUpdateWithoutFluigsInputObjectSchema as UserUncheckedUpdateWithoutFluigsInputObjectSchema } from './UserUncheckedUpdateWithoutFluigsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutFluigsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutFluigsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutFluigsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutFluigsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutFluigsInputObjectSchema), z.lazy(() => UserUpdateWithoutFluigsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutFluigsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutFluigsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutFluigsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutFluigsNestedInput>;
export const UserUpdateOneRequiredWithoutFluigsNestedInputObjectZodSchema = makeSchema();
