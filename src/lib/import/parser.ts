import z from 'zod'
import * as XLSX from 'xlsx'

import { ProductInputSchema } from '@/generated/zod/schemas'

const productInputSchema = ProductInputSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export type ParsedProduct = z.infer<typeof productInputSchema>

export type RowError = {
  row: number
  field: string
  message: string
}

export type ParseResult = {
  rows: ParsedProduct[]
  errors: RowError[]
  skipped: number
}

const COL = {
  code: 0,
  name: 1,
  cost: 25,
  stock: 3,
  buyer: 12,
  curveAbc: 13,
} as const

function parseStock(raw: unknown): string | null {
  if (raw === null || raw === undefined || raw === '') return null
  const str = String(raw)
    .replace(/[^\d,.-]/g, '')
    .replace(',', '.')
  const n = parseFloat(str)
  return isNaN(n) ? null : String(n)
}

function parseDecimal(raw: unknown): string | null {
  if (raw === null || raw === undefined || raw === '') return null
  const n =
    typeof raw === 'number' ? raw : parseFloat(String(raw).replace(',', '.'))
  return isNaN(n) ? null : String(n)
}

export function parseProductFile(buffer: Buffer): ParseResult {
  const workbook = XLSX.read(buffer, { type: 'buffer', cellDates: true })
  const sheetName = workbook.SheetNames[0]
  const sheet = workbook.Sheets[sheetName]

  const allRows = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    defval: null,
    raw: true,
  })

  if (allRows.length < 2) {
    return { rows: [], errors: [], skipped: 0 }
  }

  const rows: ParsedProduct[] = []
  const errors: RowError[] = []
  let skipped = 0

  for (let i = 1; i < allRows.length; i++) {
    const raw = allRows[i] as unknown[]
    const rowNum = i + 1

    const rawCode = raw[COL.code]
    const rawName = raw[COL.name]

    if (!rawCode && !rawName) {
      skipped++
      continue
    }

    const rowErrors: RowError[] = []

    if (!rawCode) {
      rowErrors.push({
        row: rowNum,
        field: 'Código',
        message: 'Código ausente',
      })
    }
    if (!rawName) {
      rowErrors.push({ row: rowNum, field: 'Nome', message: 'Nome ausente' })
    }

    if (rowErrors.length > 0) {
      errors.push(...rowErrors)
      continue
    }

    rows.push({
      code: String(rawCode).trim(),
      name: String(rawName).trim(),
      stock: parseStock(raw[COL.stock]),
      cost: parseDecimal(raw[COL.cost]),
      curveAbc: raw[COL.curveAbc] ? String(raw[COL.curveAbc]).trim() : null,
      buyer: raw[COL.buyer] ? String(raw[COL.buyer]).trim() : null,
    })
  }

  return { rows, errors, skipped }
}
