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

  await Promise.all([
    toInsert.length > 0
      ? prisma.product.createMany({ data: toInsert, skipDuplicates: true })
      : Promise.resolve(),

    toUpdate.length > 0
      ? (() => {
          const values = toUpdate
            .map(
              (r) =>
                `(${sanitize(r.code)}, ${sanitize(r.name)}, ${sanitize(r.cost)}, ${sanitize(r.stock)}, ${sanitize(r.buyer)}, ${sanitize(r.curveAbc)})`
            )
            .join(', ')

          return prisma.$executeRawUnsafe(`
            UPDATE products AS p
            SET
              name       = v.name,
              cost       = v.cost,
              stock      = v.stock,
              buyer      = v.buyer,
              curve_abc  = v.curve_abc,
              updated_at = NOW()
            FROM (VALUES ${values}) AS v(code, name, cost, stock, buyer, curve_abc)
            WHERE p.code = v.code
          `)
        })()
      : Promise.resolve(),
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
    console.error('[importProducts]', err)

    await prisma.importLog.update({
      where: { id: log.id },
      data: { status: 'FAILED', finishedAt: new Date() },
    })

    return { success: false, error: 'Erro interno ao processar o arquivo' }
  }
}
