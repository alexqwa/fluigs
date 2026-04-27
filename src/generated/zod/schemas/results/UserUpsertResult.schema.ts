import * as z from 'zod';
export const UserUpsertResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  branch: z.number().int().optional(),
  fluigs: z.array(z.unknown()),
  accounts: z.array(z.unknown()),
  sessions: z.array(z.unknown()),
  role: z.string().optional(),
  banned: z.boolean().optional(),
  banReason: z.string().optional(),
  banExpires: z.date().optional()
});