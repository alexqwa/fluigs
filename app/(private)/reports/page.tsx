import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'

import { ListFluigs } from '@/actions/fluig/list-fluigs'
import { getServerSession } from '@/actions/auth/session'

import { ReportSkeleton } from '@/components/skeletons/tables-skeleton'
import { ReportDataTable } from '@/components/data-display/report-data-table'

export const metadata = {
  title: 'Relatórios',
  description: 'Simplifique a gestão dos seus relatórios em um só lugar',
}

async function ReportData({ userId }: { userId: string }) {
  'use cache'
  const fluigs = await ListFluigs(userId)

  cacheTag(`fluigs-${userId}`)
  cacheLife('days')

  return <ReportDataTable data={fluigs} />
}

export default async function Reports() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return null
  }

  return (
    <main>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">
          Relatórios
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Simplifique a gestão dos seus relatórios em um só lugar
        </p>
      </div>
      <Suspense fallback={<ReportSkeleton />}>
        <ReportData userId={session.user.id} />
      </Suspense>
    </main>
  )
}
