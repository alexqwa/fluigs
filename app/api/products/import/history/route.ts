import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const logs = await prisma.importLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: 20,
    select: {
      id: true,
      filename: true,
      status: true,
      totalRows: true,
      inserted: true,
      updated: true,
      skipped: true,
      errors: true,
      createdAt: true,
      finishedAt: true,
    },
  })

  return NextResponse.json(logs)
}
