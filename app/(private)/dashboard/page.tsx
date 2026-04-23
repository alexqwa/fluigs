import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'

import { ListFluigs } from '@/actions/fluig/list-fluigs'
import { getServerSession } from '@/actions/auth/session'

import { DashboardSkeleton } from '@/components/skeletons/tables-skeleton'
import { DashboardClient } from '@/components/data-display/dashboard-client'

export const metadata = {
  title: 'Dashboard',
  description: 'Tenha uma visão completa e em tempo real dos seus fluigs',
}

async function DashboardData({ userId }: { userId: string }) {
  'use cache'
  const fluigs = await ListFluigs(userId)

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
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardData userId={session.user.id} />
      </Suspense>
    </main>
  )
}
