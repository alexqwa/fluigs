import dayjs from 'dayjs'

export function useDashboardAnalytics(fluigs: any) {
  const today = dayjs()

  const startOfToday = today.startOf('day')
  const endOfToday = today.endOf('day')

  const startOfCurrentMonth = today.startOf('month')
  const endOfCurrentMonth = today.endOf('month')

  const startOfLastMonth = today.subtract(1, 'month').startOf('month')
  const endOfLastMonth = today.subtract(1, 'month').endOf('month')

  let totalCost = 0
  let totalQuantity = 0
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

    // Today
    if (date >= startOfToday && date <= endOfToday) {
      todayCostTotal += cost
    }

    // Current Month
    if (date >= startOfCurrentMonth && date <= endOfCurrentMonth) {
      currentMonthCost += cost
      currentMonthCount++
    }

    // Last Month
    if (date >= startOfLastMonth && date <= endOfLastMonth) {
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
