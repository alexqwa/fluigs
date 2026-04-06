'use client'

import z from 'zod'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { type DateRange } from 'react-day-picker'

import { FluigInputSchema } from '@/generated/zod/schemas'
import { useFluigOptimistic } from '@/hooks/use-fluig-optimistic'
import { useDashboardAnalytics } from '@/hooks/use-dashboard-analytics'

import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/data-display/date-picker'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
import { FormCreateFluig } from '@/components/forms/form-create-fluig'
import { AnalyticsCard } from '@/components/data-display/analytics-card'
import { FluigDataTable } from '@/components/data-display/fluig-data-table'

import { Create } from '@/actions/fluig/create'

function calculateCostTotal(cost: string, quantity: string): string {
  const costNumber = Number(cost)
  const quantityNumber = Number(quantity.replaceAll(/,/g, '.'))
  const normalizedCost = costNumber < 1 ? costNumber * 1000 : costNumber
  return (normalizedCost * quantityNumber).toFixed(2)
}

const fluigCreateSchema = FluigInputSchema.omit({
  id: true,
  user: true,
  userId: true,
  createdAt: true,
  costTotal: true,
}).extend({
  date: z.date(),
  code: z.string().min(1, 'Código é obrigatório.'),
  product: z.string().min(1, 'Produto é obrigatório.'),
  quantity: z.string().min(1, 'Quantidade é obrigatório.'),
  nFluig: z.number().min(1, 'Número do fluig é obrigatório.'),
  cost: z.string().min(1, 'Custo do produto é obrigatório.'),
  status: z.enum(['Approved', 'Pending', 'Not_Approved']),
})

const fluigSchema = FluigInputSchema.omit({
  user: true,
  userId: true,
  createdAt: true,
}).extend({
  costTotal: z.string(),
})

type FluigCreateInput = z.infer<typeof fluigCreateSchema>
type Fluig = z.infer<typeof fluigSchema>

export function DashboardClient({ fluigs }: { fluigs: Fluig[] }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: dayjs().startOf('month').toDate(),
    to: dayjs().add(7, 'day').toDate(),
  })
  const [code, setCode] = useState('')

  const optimistic = useFluigOptimistic(fluigs)

  const filteredFluigs = useMemo(() => {
    return optimistic.data.filter((item) => {
      const matchCode = item.code.includes(code)

      if (!dateRange?.from) return matchCode

      const from = dayjs(dateRange.from).startOf('day')
      const to = dateRange.to
        ? dayjs(dateRange.to).endOf('day')
        : from.endOf('day')

      const isInDate =
        dayjs(item.date).isAfter(from.subtract(1, 'day')) &&
        dayjs(item.date).isBefore(to.add(1, 'day'))

      return matchCode && isInDate
    })
  }, [optimistic.data, code, dateRange])

  function toFluig(input: FluigCreateInput): Fluig {
    return {
      ...input,
      id: crypto.randomUUID(),
      quantity: input.quantity.replaceAll(',', '.'),
      costTotal: calculateCostTotal(input.cost, input.quantity),
    }
  }

  async function handleCreate(data: FluigCreateInput) {
    const optimisticItem = toFluig(data)
    const tempId = optimistic.add(optimisticItem)

    try {
      const realItem = await Create(data)
      optimistic.confirmCreate(tempId, realItem)
    } catch {
      optimistic.rollback()
    }
  }

  const {
    totalCost,
    averageCost,
    formatWeight,
    totalQuantity,
    pendingFluigs,
    averageFluigs,
    formatCurrency,
    todayCostTotal,
  } = useDashboardAnalytics(filteredFluigs)

  return (
    <div className="space-y-5">
      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Quantidade Total"
          value={`${formatWeight(totalQuantity)} KG`}
          indicator={`${filteredFluigs.length} Fluigs`}
          prospect={
            totalQuantity >= 500 ? 'Em alta neste mês' : 'Em queda neste mês'
          }
          discover="Total consolidado de produtos"
          icon={totalQuantity >= 500 ? 'trending-up' : 'trending-down'}
        />
        <AnalyticsCard
          title="Custo Médio"
          value={formatCurrency(averageCost)}
          prospect={
            averageCost >= 200
              ? 'Aumento no custo médio'
              : 'Redução no custo médio'
          }
          discover={
            averageCost >= 200
              ? 'Custo médio com tendência de crescimento'
              : 'Custo médio com tendência de redução'
          }
          icon={averageCost >= 200 ? 'trending-up' : 'trending-down'}
        />
        <AnalyticsCard
          title="Fluigs Pendentes"
          value={String(pendingFluigs)}
          indicator={`${averageFluigs.toFixed(0)}% Processados`}
          prospect={
            averageFluigs === 100
              ? 'Todas as solicitações em dias'
              : 'Fluigs aguardando por aprovação'
          }
          discover={
            averageFluigs === 100
              ? 'Parabéns continue assim'
              : 'Há fluigs que necessitam de atenção'
          }
          icon={averageFluigs === 100 ? 'trending-up' : 'trending-down'}
        />
        <AnalyticsCard
          title="Custo Total"
          value={formatCurrency(totalCost)}
          indicator={`${formatCurrency(todayCostTotal)} Hoje`}
          prospect={
            totalCost >= 500 ? 'Em alta neste mês' : 'Em queda neste mês'
          }
          discover={
            totalCost >= 500
              ? 'Crescimento de despesas neste mês'
              : 'Redução de despesas neste mês'
          }
          icon={totalCost >= 500 ? 'trending-up' : 'trending-down'}
        />
      </div>
      <div className="flex flex-col items-end gap-4 md:flex-row md:justify-between">
        <FieldGroup className="w-full">
          <Field orientation="vertical">
            <FieldLabel htmlFor="fieldgroup-code">Código</FieldLabel>
            <Input
              id="fieldgroup-code"
              placeholder="Buscar pelo código"
              className="border-border bg-card border"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Field>
          <Field orientation="vertical">
            <FieldLabel htmlFor="fieldgroup-date">Período</FieldLabel>
            <DatePicker value={dateRange} onChange={setDateRange} />
          </Field>
        </FieldGroup>
        <FormCreateFluig onSubmit={handleCreate} />
      </div>
      <FluigDataTable data={filteredFluigs} optimistic={optimistic} />
    </div>
  )
}
