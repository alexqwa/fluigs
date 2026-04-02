import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserUpdateWithoutFluigsInputObjectSchema as UserUpdateWithoutFluigsInputObjectSchema } from './UserUpdateWithoutFluigsInput.schema';
import { UserUncheckedUpdateWithoutFluigsInputObjectSchema as UserUncheckedUpdateWithoutFluigsInputObjectSchema } from './UserUncheckedUpdateWithoutFluigsInput.schema';
import { UserCreateWithoutFluigsInputObjectSchema as UserCreateWithoutFluigsInputObjectSchema } from './UserCreateWithoutFluigsInput.schema';
import { UserUncheckedCreateWithoutFluigsInputObjectSchema as UserUncheckedCreateWithoutFluigsInputObjectSchema } from './UserUncheckedCreateWithoutFluigsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutFluigsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutFluigsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutFluigsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutFluigsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutFluigsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutFluigsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutFluigsInput>;
export const UserUpsertWithoutFluigsInputObjectZodSchema = makeSchema();
