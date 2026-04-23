import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'emailVerified', 'image', 'createdAt', 'updatedAt', 'branch', 'role', 'banned', 'banReason', 'banExpires'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;