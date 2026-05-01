import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/lib/prisma'
import { upsertProducts } from '@/lib/import/upsert'
import { parseProductFile } from '@/lib/import/parser'
import { getServerSession } from '@/actions/auth/session'

const MAX_SIZE_BYTES = 10 * 1024 * 1024
const ALLOWED_EXT = ['xlsx', 'xls', 'csv']

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  const user = session?.user

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // ── 1. Recebe e valida o arquivo ───────────────────────────────────────────
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Requisição inválida' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  if (!file) {
    return NextResponse.json(
      { error: 'Nenhum arquivo enviado' },
      { status: 400 }
    )
  }

  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json(
      { error: `Formato não permitido. Use: ${ALLOWED_EXT.join(', ')}` },
      { status: 415 }
    )
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: 'Arquivo muito grande. Limite: 10MB' },
      { status: 413 }
    )
  }

  // ── 2. Cria o log de importação com status PROCESSING ─────────────────────
  const log = await prisma.importLog.create({
    data: { filename: file.name, status: 'PROCESSING', finishedAt: new Date() },
  })

  try {
    // ── 3. Parse e validação das linhas ──────────────────────────────────────
    const buffer = Buffer.from(await file.arrayBuffer())
    const { rows, errors, skipped } = parseProductFile(buffer)

    // Atualiza o log com o resultado do parse
    await prisma.importLog.update({
      where: { id: log.id },
      data: {
        totalRows: rows.length,
        errors: errors.length,
        skipped,
        errorDetail: errors.length > 0 ? errors : undefined,
        status: rows.length === 0 ? 'FAILED' : 'PROCESSING',
      },
    })

    // Nenhuma linha válida — encerra com erro
    if (rows.length === 0) {
      return NextResponse.json(
        {
          logId: log.id,
          error: 'Nenhuma linha válida encontrada no arquivo',
          errors,
          skipped,
        },
        { status: 422 }
      )
    }

    // ── 4. Upsert no banco ───────────────────────────────────────────────────
    const { inserted, updated } = await upsertProducts(rows, log.id)

    // Atualiza status final do log
    const finalStatus = errors.length > 0 ? 'DONE_WITH_WARNINGS' : 'DONE'
    await prisma.importLog.update({
      where: { id: log.id },
      data: { status: finalStatus, finishedAt: new Date() },
    })

    // ── 5. Resposta ──────────────────────────────────────────────────────────
    revalidateTag('products', 'max')
    return NextResponse.json({
      logId: log.id,
      status: finalStatus,
      totalRows: rows.length,
      inserted,
      updated,
      skipped,
      errors: errors.length,
      errorDetail: errors.length > 0 ? errors : undefined,
    })
  } catch (err) {
    // Falha inesperada — marca o log como FAILED
    console.error('[import] erro inesperado:', err)
    await prisma.importLog.update({
      where: { id: log.id },
      data: { status: 'FAILED', finishedAt: new Date() },
    })

    return NextResponse.json(
      { logId: log.id, error: 'Erro interno ao processar o arquivo' },
      { status: 500 }
    )
  }
}
