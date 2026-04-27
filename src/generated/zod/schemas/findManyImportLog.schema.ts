import type { Prisma } from '../../prisma/client';
import * as z from 'zod';
import { ImportLogOrderByWithRelationInputObjectSchema as ImportLogOrderByWithRelationInputObjectSchema } from './objects/ImportLogOrderByWithRelationInput.schema';
import { ImportLogWhereInputObjectSchema as ImportLogWhereInputObjectSchema } from './objects/ImportLogWhereInput.schema';
import { ImportLogWhereUniqueInputObjectSchema as ImportLogWhereUniqueInputObjectSchema } from './objects/ImportLogWhereUniqueInput.schema';
import { ImportLogScalarFieldEnumSchema } from './enums/ImportLogScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const ImportLogFindManySelectSchema: z.ZodType<Prisma.ImportLogSelect> = z.object({
    id: z.boolean().optional(),
    filename: z.boolean().optional(),
    status: z.boolean().optional(),
    totalRows: z.boolean().optional(),
    inserted: z.boolean().optional(),
    updated: z.boolean().optional(),
    skipped: z.boolean().optional(),
    errors: z.boolean().optional(),
    errorDetail: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    finishedAt: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.ImportLogSelect>;

export const ImportLogFindManySelectZodSchema = z.object({
    id: z.boolean().optional(),
    filename: z.boolean().optional(),
    status: z.boolean().optional(),
    totalRows: z.boolean().optional(),
    inserted: z.boolean().optional(),
    updated: z.boolean().optional(),
    skipped: z.boolean().optional(),
    errors: z.boolean().optional(),
    errorDetail: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    finishedAt: z.boolean().optional()
  }).strict();

export const ImportLogFindManySchema: z.ZodType<Prisma.ImportLogFindManyArgs> = z.object({ select: ImportLogFindManySelectSchema.optional(),  orderBy: z.union([ImportLogOrderByWithRelationInputObjectSchema, ImportLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: ImportLogWhereInputObjectSchema.optional(), cursor: ImportLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ImportLogScalarFieldEnumSchema, ImportLogScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.ImportLogFindManyArgs>;

export const ImportLogFindManyZodSchema = z.object({ select: ImportLogFindManySelectSchema.optional(),  orderBy: z.union([ImportLogOrderByWithRelationInputObjectSchema, ImportLogOrderByWithRelationInputObjectSchema.array()]).optional(), where: ImportLogWhereInputObjectSchema.optional(), cursor: ImportLogWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([ImportLogScalarFieldEnumSchema, ImportLogScalarFieldEnumSchema.array()]).optional() }).strict();