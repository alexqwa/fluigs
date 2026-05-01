import { Suspense } from 'react'
import { cacheTag, cacheLife } from 'next/cache'

import { ListProductsAndLogs } from '@/actions/admin/products'

import { CardLogs } from '@/components/ui/card-logs'
import { UploadClient } from '@/components/client/upload-client'
import { AdminDashboardSkeleton } from '@/components/skeletons/tables-skeleton'

export const metadata = {
  title: 'Dashboard',
  description: 'Todos os dados do seu sistema em um só lugar',
}

async function DashboardData() {
  'use cache'
  const { products, logs } = await ListProductsAndLogs()

  cacheTag('products')
  cacheLife('hours')

  return (
    <UploadClient products={products}>
      <CardLogs logs={logs} />
    </UploadClient>
  )
}

export default function Dashboard() {
  return (
    <main>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Todos os dados do seu sistema em um só lugar
        </p>
      </div>
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <DashboardData />
      </Suspense>
    </main>
  )
}
