import * as z from 'zod';

export const ImportStatusSchema = z.enum(['PENDING', 'PROCESSING', 'DONE', 'DONE_WITH_WARNINGS', 'FAILED'])

export type ImportStatus = z.infer<typeof ImportStatusSchema>;