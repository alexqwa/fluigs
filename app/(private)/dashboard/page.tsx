// import { auth } from '@/lib/auth'
// import { headers } from 'next/headers'

import data from '@/hooks/data.json'
import { DataTable } from '@/components/DataTable'
import { AnalyticsCard } from '@/components/AnalyticsCard'

export default async function Dashboard() {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // })

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
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Quantidade Total"
          value="1.455 Kg"
          indicator="12 Fluigs"
          prospect="Em alta neste mês"
          discover="Total consolidado de produtos ativos"
          icon="trending-up"
        />
        <AnalyticsCard
          title="Custo Médio"
          value="R$ 423,34"
          indicator="+34.5% Este Mês"
          prospect="Aumento no custo médio"
          discover="Comparativo mensal com tendência de crescimento"
          icon="trending-up"
        />
        <AnalyticsCard
          title="Fluigs Pendentes"
          value="4 Fluigs"
          indicator="57% Processados"
          prospect="Solicitações com lentidão neste período"
          discover="As solicitações requer atenção"
          icon="trending-down"
        />
        <AnalyticsCard
          title="Custo Total"
          value="R$ 5.818,47"
          indicator="R$ 824,17 Hoje"
          prospect="Em alta neste mês"
          discover="Crescimento de despesas neste mês"
          icon="trending-up"
        />
      </div>
      <DataTable data={data.products} />
    </>
  )
}
