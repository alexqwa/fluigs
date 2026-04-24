import { Suspense } from 'react'
import { cacheTag, cacheLife } from 'next/cache'

import { ListUsers } from '@/actions/admin/list-users'

import { StoresClient } from '@/components/data-display/stores-client'
import { ReportSkeleton } from '@/components/skeletons/tables-skeleton'

export const metadata = {
  title: 'Lojas',
  description: 'Gerencie todas as suas lojas com praticidade',
}

async function StoreData() {
  'use cache'
  const users = await ListUsers()

  cacheTag('stores')
  cacheLife('hours')

  return <StoresClient users={users} />
}

export default function Stores() {
  return (
    <main>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">Lojas</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Gerencie todas as suas lojas com praticidade
        </p>
      </div>
      <Suspense fallback={<ReportSkeleton />}>
        <StoreData />
      </Suspense>
    </main>
  )
}
