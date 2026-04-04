import { Suspense } from 'react'
import { cacheLife, cacheTag } from 'next/cache'

import { Queries } from '@/actions/fluig/queries'

import { Skeleton } from '@/components/ui/skeleton'
import { ReportDataTable } from '@/components/data-display/report-data-table'

export const metadata = {
  title: 'Relatórios',
  description: 'Simplifique a gestão dos seus relatórios em um só lugar',
}

function DataTableSkeleton() {
  return (
    <div className="mt-10 space-y-5">
      <div className="block space-y-3 md:flex md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex flex-col gap-3 md:flex-row">
          <Skeleton className="bg-muted h-8 w-full md:w-42.5" />
          <Skeleton className="bg-muted h-8 w-full md:w-42.5" />
        </div>
        <Skeleton className="bg-muted h-8 w-full md:w-42.5" />
      </div>
      <div className="border-border divide-border w-full flex-col divide-y overflow-hidden rounded-lg border">
        <div className="bg-muted h-10 w-full" />
        <div className="bg-card divide-border grid grid-cols-8 divide-x divide-y">
          {Array.from({ length: 96 }).map((_, i) => (
            <div key={i} className="p-2">
              <Skeleton className="bg-muted h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

async function ReportData() {
  'use cache'
  cacheTag('fluigs')
  cacheLife('hours')
  const fluigs = await Queries()

  return <ReportDataTable data={fluigs} />
}

export default async function Reports() {
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
      <Suspense fallback={<DataTableSkeleton />}>
        <ReportData />
      </Suspense>
    </main>
  )
}
