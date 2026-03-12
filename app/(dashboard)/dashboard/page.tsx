import { Suspense } from 'react'

import { Queries } from '@/actions/fluig/queries'
import { useDashboardAnalytics } from '@/hooks/use-dashboard-analytics'

import { DataTable } from '@/components/data-display/data-table'
import { DataTableSkeleton } from '@/components/data-display/data-table-skeleton'
import { AnalyticsCard } from '@/components/data-display/analytics-card'
import { AnalyticsSkeletonCard } from '@/components/data-display/analytics-skeleton-card'

async function DataFluigs({ fluigs }: { fluigs: any }) {
  return <DataTable data={fluigs} />
}

async function DashboardAnalytics({ fluigs }: { fluigs: any }) {
  const {
    totalCost,
    totalQuantity,
    pendingFluigs,
    todayCostTotal,
    averageFluigs,
    averageGrowth,
    formatCurrency,
    currentMonthAverage,
  } = useDashboardAnalytics(fluigs)

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <AnalyticsCard
        title="Quantidade Total"
        value={`${totalQuantity.toFixed(2).replaceAll('.', ',')} KG`}
        indicator={`${fluigs.length} Fluigs`}
        prospect={
          totalQuantity >= 500 ? 'Em alta neste mês' : 'Em queda neste mês'
        }
        discover="Total consolidado de produtos"
        icon={totalQuantity >= 500 ? 'trending-up' : 'trending-down'}
      />
      <AnalyticsCard
        title="Custo Médio"
        value={formatCurrency(currentMonthAverage)}
        indicator={`${averageGrowth.toFixed(1)}% Este Mês`}
        prospect={
          averageGrowth >= 0
            ? 'Aumento no custo médio'
            : 'Redução no custo médio'
        }
        discover={
          averageGrowth >= 0
            ? 'Comparativo mensal com tendência de crescimento'
            : 'Comparativo mensal com tendência de redução'
        }
        icon={averageGrowth >= 0 ? 'trending-up' : 'trending-down'}
      />
      <AnalyticsCard
        title="Fluigs Pendentes"
        value={String(pendingFluigs)}
        indicator={`${averageFluigs.toFixed(1)}% Processados`}
        prospect={
          averageFluigs === 100
            ? 'Todas as solicitações em dias'
            : 'Solicitações com lentidão neste período'
        }
        discover={
          averageFluigs === 100
            ? 'Parabéns continue assim'
            : 'As solicitações requer atenção'
        }
        icon={averageFluigs === 100 ? 'trending-up' : 'trending-down'}
      />
      <AnalyticsCard
        title="Custo Total"
        value={formatCurrency(totalCost)}
        indicator={`${formatCurrency(todayCostTotal)} Hoje`}
        prospect={totalCost >= 500 ? 'Em alta neste mês' : 'Em queda neste mês'}
        discover={
          totalCost >= 500
            ? 'Crescimento de despesas neste mês'
            : 'Redução de despesas neste mês'
        }
        icon={totalCost >= 500 ? 'trending-up' : 'trending-down'}
      />
    </div>
  )
}

export default async function Dashboard() {
  const fluigs = await Queries()

  return (
    <>
      <div className="space-y-1">
        <h1 className="text-foreground text-xl font-bold md:text-3xl">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Tenha uma visão completa e em tempo real dos seus fluigs
        </p>
      </div>
      <Suspense
        fallback={
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <AnalyticsSkeletonCard key={i} />
            ))}
          </div>
        }
      >
        <DashboardAnalytics fluigs={fluigs} />
      </Suspense>
      <Suspense fallback={<DataTableSkeleton />}>
        <DataFluigs fluigs={fluigs} />
      </Suspense>
    </>
  )
}
