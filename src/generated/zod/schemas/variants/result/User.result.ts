import * as z from 'zod';
// prettier-ignore
export const UserResultSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean(),
    image: z.string().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    branch: z.number().int().nullable(),
    fluigs: z.array(z.unknown()),
    accounts: z.array(z.unknown()),
    sessions: z.array(z.unknown()),
    role: z.string().nullable(),
    banned: z.boolean().nullable(),
    banReason: z.string().nullable(),
    banExpires: z.date().nullable()
}).strict();

export type UserResultType = z.infer<typeof UserResultSchema>;
