import * as z from 'zod';
import type { Prisma } from '../../../prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutFluigsInputObjectSchema as UserUpdateWithoutFluigsInputObjectSchema } from './UserUpdateWithoutFluigsInput.schema';
import { UserUncheckedUpdateWithoutFluigsInputObjectSchema as UserUncheckedUpdateWithoutFluigsInputObjectSchema } from './UserUncheckedUpdateWithoutFluigsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutFluigsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutFluigsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutFluigsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFluigsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutFluigsInput>;
export const UserUpdateToOneWithWhereWithoutFluigsInputObjectZodSchema = makeSchema();
