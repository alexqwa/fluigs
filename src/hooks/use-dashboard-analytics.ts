import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(timezone)

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
