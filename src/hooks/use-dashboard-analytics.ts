import dayjs from 'dayjs'

export function useDashboardAnalytics(fluigs: any) {
  const today = dayjs()
  const lastMonth = today.subtract(1, 'month')

  let totalQuantity = 0
  let totalCost = 0
  let pendingFluigs = 0
  let todayCostTotal = 0

  let currentMonthCost = 0
  let currentMonthCount = 0

  let lastMonthCost = 0
  let lastMonthCount = 0

  for (const fluig of fluigs) {
    const quantity = Number(fluig.quantity.replaceAll(',', '.'))
    const cost = Number(fluig.costTotal)
    const date = dayjs(fluig.date)

    totalQuantity += quantity
    totalCost += cost

    if (fluig.status === 'Pending') {
      pendingFluigs++
    }

    if (date.isSame(today, 'day')) {
      todayCostTotal += cost
    }

    if (date.isSame(today, 'month')) {
      currentMonthCost += cost
      currentMonthCount++
    }

    if (date.isSame(lastMonth, 'month')) {
      lastMonthCost += cost
      lastMonthCount++
    }
  }

  const averageFluigs = fluigs.length
    ? ((fluigs.length - pendingFluigs) / fluigs.length) * 100
    : 0

  const currentMonthAverage = currentMonthCost / (currentMonthCount || 1)

  const lastMonthAverage = lastMonthCost / (lastMonthCount || 1)

  const averageGrowth =
    lastMonthAverage > 0
      ? ((currentMonthAverage - lastMonthAverage) / lastMonthAverage) * 100
      : 0

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value)

  return {
    totalCost,
    totalQuantity,
    pendingFluigs,
    todayCostTotal,
    averageFluigs,
    averageGrowth,
    formatCurrency,
    currentMonthAverage,
  }
}
