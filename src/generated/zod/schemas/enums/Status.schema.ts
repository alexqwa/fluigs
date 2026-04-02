import * as z from 'zod';

export const StatusSchema = z.enum(['Approved', 'Not_Approved', 'Pending'])

export type Status = z.infer<typeof StatusSchema>;