import { cacheLife, cacheTag } from 'next/cache'

import { Queries } from '@/actions/fluig/queries'
import { getServerSession } from '@/actions/auth/session'

import { ReportDataTable } from '@/components/data-display/report-data-table'

import type { Fluig } from '@/generated/prisma/client'

async function CachedDataTable({
  userId,
  fluigs,
}: {
  userId: string
  fluigs: Fluig[]
}) {
  'use cache'
  cacheLife('max')
  cacheTag(`reports-table-${userId}`)

  return <ReportDataTable data={fluigs} />
}

export default async function Reports() {
  const session = await getServerSession()
  const userId = session?.user?.id ?? ''
  const fluigs = await Queries()

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">
          Relatórios
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Simplifique a gestão dos seus relatórios em um só lugar
        </p>
      </div>
      <CachedDataTable userId={userId} fluigs={fluigs} />
    </>
  )
}
