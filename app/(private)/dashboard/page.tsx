import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'

import { Queries } from '@/actions/fluig/queries'

import { DashboardClient } from '@/components/data-display/dashboard-client'
import { DataTableSkeleton } from '@/components/data-display/data-table-skeleton'
import { getServerSession } from '@/actions/auth/session'

export const metadata = {
  title: 'Dashboard',
  description: 'Tenha uma visão completa e em tempo real dos seus fluigs',
}

async function DashboardData({ userId }: { userId: string }) {
  'use cache'
  const fluigs = await Queries(userId)

  cacheTag(`fluigs-${userId}`)
  cacheLife('hours')

  return <DashboardClient fluigs={fluigs} />
}

export default async function Dashboard() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return null
  }

  return (
    <main>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Tenha uma visão completa e em tempo real dos seus fluigs
        </p>
      </div>
      <Suspense fallback={<DataTableSkeleton />}>
        <DashboardData userId={session.user.id} />
      </Suspense>
    </main>
  )
}
