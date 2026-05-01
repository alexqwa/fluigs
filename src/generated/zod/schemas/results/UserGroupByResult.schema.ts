import * as z from 'zod';
export const UserGroupByResultSchema = z.array(z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  branch: z.number().int(),
  role: z.string(),
  banned: z.boolean(),
  banReason: z.string(),
  banExpires: z.date(),
  _count: z.object({
    id: z.number(),
    name: z.number(),
    email: z.number(),
    emailVerified: z.number(),
    image: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    branch: z.number(),
    fluigs: z.number(),
    accounts: z.number(),
    sessions: z.number(),
    role: z.number(),
    banned: z.number(),
    banReason: z.number(),
    banExpires: z.number()
  }).optional(),
  _sum: z.object({
    branch: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    branch: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    branch: z.number().int().nullable(),
    role: z.string().nullable(),
    banReason: z.string().nullable(),
    banExpires: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    image: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    branch: z.number().int().nullable(),
    role: z.string().nullable(),
    banReason: z.string().nullable(),
    banExpires: z.date().nullable()
  }).nullable().optional()
}));