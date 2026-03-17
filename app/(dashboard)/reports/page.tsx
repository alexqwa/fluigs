import { Suspense } from 'react'
import { unauthorized } from 'next/navigation'
import { cacheLife, cacheTag } from 'next/cache'

import { getUser } from '@/actions/auth/user'
import { Queries } from '@/actions/fluig/queries'

import { ReportDataTable } from '@/components/data-display/report-data-table'
import { DataTableSkeleton } from '@/components/data-display/data-table-skeleton'

async function CachedDataTable({ userId }: { userId: string }) {
  'use cache'
  cacheLife('max')
  cacheTag(`fluigs-${userId}`)

  const fluigs = await Queries(userId)

  return <ReportDataTable data={fluigs} />
}

export default async function Reports() {
  const user = await getUser()

  if (!user) return unauthorized()

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
      <Suspense fallback={<DataTableSkeleton />}>
        <CachedDataTable userId={user.id} />
      </Suspense>
    </>
  )
}
