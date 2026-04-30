import { Suspense } from 'react'
import { cacheTag, cacheLife } from 'next/cache'

import { ListProducts } from '@/actions/admin'

import { UploadClient } from '@/components/client/upload-client'
import { DashboardSkeleton } from '@/components/skeletons/tables-skeleton'

export const metadata = {
  title: 'Dashboard',
  description: 'Todos os dados do seu sistema em um só lugar',
}

async function DashboardData() {
  'use cache'
  const products = await ListProducts()

  cacheTag('products')
  cacheLife('hours')

  return <UploadClient products={products} />
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
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardData />
      </Suspense>
    </main>
  )
}
