import { Suspense } from 'react'
import { cacheTag, cacheLife } from 'next/cache'

import { ListUsers } from '@/actions/admin/list-users'

import { Skeleton } from '@/components/ui/skeleton'
import { StoresClient } from '@/components/data-display/stores-client'

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

function DataTableSkeleton() {
  return (
    <div className="mt-10 space-y-5">
      <div className="block space-y-3 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col gap-3 md:flex-row">
          <Skeleton className="h-8 w-full md:w-42.5" />
          <Skeleton className="h-8 w-full md:w-42.5" />
        </div>
        <Skeleton className="h-8 w-full md:w-42.5" />
      </div>
      <div className="border-border divide-border w-full flex-col divide-y overflow-hidden rounded-lg border">
        <div className="h-10 w-full" />
        <div className="bg-card divide-border grid grid-cols-8 divide-x divide-y">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="p-2">
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
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
      <Suspense fallback={<DataTableSkeleton />}>
        <StoreData />
      </Suspense>
    </main>
  )
}
