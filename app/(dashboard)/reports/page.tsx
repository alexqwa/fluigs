import { Suspense } from 'react'

import { Queries } from '@/actions/fluig/queries'
import type { Fluig } from '@/generated/prisma/client'

import { ReportDataTable } from '@/components/data-display/report-data-table'
import { DataTableSkeleton } from '@/components/data-display/data-table-skeleton'

async function CachedDataTable({ fluigs }: { fluigs: Fluig[] }) {
  return <ReportDataTable data={fluigs} />
}

export default async function Reports() {
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
      <Suspense fallback={<DataTableSkeleton />}>
        <CachedDataTable fluigs={fluigs} />
      </Suspense>
    </>
  )
}
