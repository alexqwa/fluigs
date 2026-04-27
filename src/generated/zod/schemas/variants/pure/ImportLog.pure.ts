import * as z from 'zod';
import { ImportStatusSchema } from '../../enums/ImportStatus.schema';
// prettier-ignore
export const ImportLogModelSchema = z.object({
    id: z.string(),
    filename: z.string(),
    status: ImportStatusSchema,
    totalRows: z.number().int(),
    inserted: z.number().int(),
    updated: z.number().int(),
    skipped: z.number().int(),
    errors: z.number().int(),
    errorDetail: z.unknown().nullable(),
    createdAt: z.date(),
    finishedAt: z.date()
}).strict();

export type ImportLogPureType = z.infer<typeof ImportLogModelSchema>;
