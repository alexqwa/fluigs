import { prisma } from '@/lib/prisma'
import type { ParsedProduct, RowError } from './parser'

const BATCH_SIZE = 500

type UpsertResult = {
  inserted: number
  updated: number
}

export async function upsertProducts(
  rows: ParsedProduct[],
  logId: string
): Promise<UpsertResult> {
  let inserted = 0
  let updated = 0

  const batches: ParsedProduct[][] = []
  for (let i = 0; i < rows.length; i += BATCH_SIZE) {
    batches.push(rows.slice(i, i + BATCH_SIZE))
  }

  for (const batch of batches) {
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

    if (toInsert.length > 0) {
      await prisma.product.createMany({
        data: toInsert,
        skipDuplicates: true,
      })
      inserted += toInsert.length
    }

    for (const row of toUpdate) {
      await prisma.product.update({
        where: { code: row.code },
        data: {
          name: row.name,
          stock: row.stock,
          cost: row.cost,
          curveAbc: row.curveAbc,
          buyer: row.buyer,
          updatedAt: new Date(),
        },
      })
      updated++
    }
  }

  await prisma.importLog.update({
    where: { id: logId },
    data: {
      inserted,
      updated,
      status: 'DONE',
      finishedAt: new Date(),
    },
  })

  return { inserted, updated }
}
