'use server'

import { prisma } from '@/lib/prisma'
import { updateTag } from 'next/cache'
import {
  parseProductFile,
  type RowError,
  type ParsedProduct,
} from '@/lib/import/parser'

const BATCH_SIZE = 500

type ImportResult =
  | {
      success: true
      imported: number
      inserted: number
      updated: number
      skipped: number
      errors: RowError[]
    }
  | {
      success: false
      error: string
      errors?: RowError[]
      skipped?: number
    }

function sanitize(v: string | null | undefined): string {
  if (v === null) return 'NULL'
  return `'${String(v).replace(/'/g, "''")}'`
}

async function upsertBatch(
  batch: ParsedProduct[]
): Promise<{ inserted: number; updated: number }> {
  const codes = batch.map((r) => r.code)

  const existing = new Set(
    (
      await prisma.product.findMany({
        where: { code: { in: codes } },
        select: { code: true },
      })
    ).map((p) => p.code)
  )

  const toInsert = batch.filter((r) => !existing.has(r.code))
  const toUpdate = batch.filter((r) => existing.has(r.code))

  await prisma.$transaction([
    ...(toInsert.length > 0
      ? [prisma.product.createMany({ data: toInsert, skipDuplicates: true })]
      : []),

    ...toUpdate.map((r) =>
      prisma.product.update({
        where: {
          code: r.code,
        },
        data: {
          name: r.name,
          cost: r.cost,
          stock: r.stock,
          buyer: r.buyer,
          curveAbc: r.curveAbc,
          updatedAt: new Date(),
        },
      })
    ),
  ])

  return { inserted: toInsert.length, updated: toUpdate.length }
}

export async function importProducts(
  formData: FormData
): Promise<ImportResult> {
  const file = formData.get('file') as File | null

  if (!file) {
    return { success: false, error: 'Nunhum arquivo enviado' }
  }

  const log = await prisma.importLog.create({
    data: {
      status: 'PROCESSING',
      filename: file.name,
      finishedAt: new Date(),
    },
  })

  try {
    const buffer = Buffer.from(await file.arrayBuffer())
    const { rows, errors, skipped } = parseProductFile(buffer)

    if (rows.length === 0) {
      await prisma.importLog.update({
        where: { id: log.id },
        data: {
          status: 'DONE',
          finishedAt: new Date(),
          inserted: 0,
          updated: 0,
        },
      })

      return {
        success: false,
        error: 'Nenhum produto válido encontrado',
        errors,
        skipped,
      }
    }

    let totalInserted = 0
    let totalUpdated = 0

    for (let i = 0; i < rows.length; i += BATCH_SIZE) {
      const batch = rows.slice(i, i + BATCH_SIZE)
      const { inserted, updated } = await upsertBatch(batch)
      totalInserted += inserted
      totalUpdated += updated
    }

    await prisma.importLog.update({
      where: { id: log.id },
      data: {
        status: 'DONE',
        finishedAt: new Date(),
        inserted: totalInserted,
        updated: totalUpdated,
      },
    })

    updateTag('products')

    return {
      success: true,
      imported: totalInserted + totalUpdated,
      inserted: totalInserted,
      updated: totalUpdated,
      skipped,
      errors,
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error('[importProducts]', err)
      console.error('[importProducts] message:', err.message)
    }

    await prisma.importLog.update({
      where: { id: log.id },
      data: { status: 'FAILED', finishedAt: new Date() },
    })

    updateTag('products')

    return { success: false, error: 'Erro interno ao processar o arquivo' }
  }
}
