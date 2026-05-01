import z from 'zod'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { ProductInputSchema } from '@/generated/zod/schemas'

dayjs.extend(utc)
dayjs.extend(timezone)

const productInputSchema = ProductInputSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

type ProductType = z.infer<typeof productInputSchema>

export function useDashboardAnalytics(fluigs: any) {
  const today = dayjs().tz('America/Sao_Paulo')

  const startOfToday = today.startOf('day')
  const endOfToday = today.endOf('day')

  let totalCost = 0
  let totalQuantity = 0
  let pendingFluigs = 0
  let todayCostTotal = 0

  for (const fluig of fluigs) {
    const cost = Number(fluig.costTotal)
    const date = dayjs.utc(fluig.date).tz('America/Sao_Paulo')
    const quantity = Number(fluig.quantity.replaceAll(',', '.'))

    totalQuantity += quantity
    totalCost += cost

    if (fluig.status === 'Pending') {
      pendingFluigs++
    }

    if (date >= startOfToday && date <= endOfToday) {
      todayCostTotal += cost
    }
  }

  const averageFluigs = fluigs.length
    ? ((fluigs.length - pendingFluigs) / fluigs.length) * 100
    : 0

  const averageCost = fluigs.length ? totalCost / fluigs.length : 0

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const formatWeight = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
    }).format(value)

  return {
    totalCost,
    averageCost,
    formatWeight,
    totalQuantity,
    pendingFluigs,
    averageFluigs,
    todayCostTotal,
    formatCurrency,
  }
}

export function useProductsAnalytics(products: ProductType[]) {
  let totalCost = 0

  for (const p of products) {
    const cost = Number(p.cost)

    totalCost += cost
  }

  const formatQuantity = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(value)

  const formatPercent = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100)

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  const curves = (['A', 'B', 'C'] as const).reduce(
    (acc, curve) => {
      const count = products.filter((p) => p.curveAbc === curve).length
      const percentage = products.length ? (count / products.length) * 100 : 0

      acc[curve] = {
        count,
        percentage,
        formatted: formatQuantity(count),
        formattedPercentage: formatPercent(percentage),
      }
      return acc
    },
    {} as Record<
      'A' | 'B' | 'C',
      {
        count: number
        percentage: number
        formatted: string
        formattedPercentage: string
      }
    >
  )

  const topBuyers = Object.entries(
    products.reduce(
      (acc, product) => {
        const buyer = product.buyer ?? 'Sem Informação'
        acc[buyer] = (acc[buyer] ?? 0) + 1
        return acc
      },
      {} as Record<string, number>
    )
  )
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([buyer, count]) => ({ buyer, count }))

  return { formatQuantity, formatCurrency, topBuyers, curves, totalCost }
}
