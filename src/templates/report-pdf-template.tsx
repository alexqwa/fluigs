import z from 'zod'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

import { FluigInputSchema } from '@/generated/zod/schemas'
import { useDashboardAnalytics } from '@/hooks/use-dashboard-analytics'

const fluigSchema = FluigInputSchema.omit({
  user: true,
  userId: true,
  createdAt: true,
})

type FluigSchema = z.infer<typeof fluigSchema>
type FluigStatus = 'Approved' | 'Pending' | 'Not_Approved'

interface ReportPDFTemplateProps {
  data: FluigSchema[]
  filters: {
    status: FluigStatus | 'All'
    month: number | 'All'
  }
  generatedAt: Date
}

const statusLabels: Record<FluigStatus, string> = {
  Approved: 'Aprovado',
  Pending: 'Aguardando',
  Not_Approved: 'Não Aprovado',
}

const statusColors: Record<FluigStatus, { bg: string; text: string }> = {
  Approved: { bg: '#dcfce7', text: '#166534' },
  Pending: { bg: '#fef9c3', text: '#854d0e' },
  Not_Approved: { bg: '#fee2e2', text: '#991b1b' },
}

const monthNames = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

function getFilterDescription(
  filters: ReportPDFTemplateProps['filters']
): string {
  const parts: string[] = []

  if (filters.status !== 'All') {
    parts.push(`Status: ${statusLabels[filters.status]}`)
  }

  if (filters.month !== 'All') {
    parts.push(`Mês: ${monthNames[filters.month]}`)
  }

  return parts.length > 0 ? parts.join(' | ') : 'Todos os registros'
}

export function ReportPDFTemplate({
  data,
  filters,
  generatedAt,
}: ReportPDFTemplateProps): string {
  const totalCost = data.reduce((acc, item) => acc + Number(item.costTotal), 0)
  const totalQuantity = data.reduce(
    (acc, item) => acc + Number(item.quantity),
    0
  )

  const { formatWeight, formatCurrency } = useDashboardAnalytics(data)

  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Relatório de Fluigs - ${dayjs().format('DD/MM/YYYY')}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 11px;
          line-height: 1.5;
          color: #1f2937;
          background: #ffffff;
        }

        .page {
          padding: 40px;
          min-height: 100vh;
        }

        /* Header */
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .header-title {
          font-size: 24px;
          font-weight: 700;
          color: #111827;
        }

        .header-subtitle {
          font-size: 13px;
          color: #6b7280;
        }

        .header-right {
          text-align: right;
          font-size: 11px;
          color: #6b7280;
        }

        .header-right p {
          margin-bottom: 2px;
        }

        /* Filters */
        .filters {
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 24px;
        }

        .filters-title {
          font-size: 12px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }

        .filters-description {
          font-size: 11px;
          color: #6b7280;
        }

        /* Summary Cards */
        .summary {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .summary-card {
          flex: 1;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 16px;
        }

        .summary-card-label {
          font-size: 11px;
          color: #6b7280;
          margin-bottom: 4px;
        }

        .summary-card-value {
          font-size: 18px;
          font-weight: 700;
          color: #111827;
        }

        /* Status Summary */
        .status-summary {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
        }

        .status-count {
          font-weight: 700;
        }

        /* Table */
        .table-container {
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #f3f4f6;
        }

        th {
          text-align: left;
          padding: 12px 16px;
          font-size: 11px;
          font-weight: 600;
          color: #374151;
          border-bottom: 1px solid #e5e7eb;
        }

        td {
          padding: 12px 16px;
          font-size: 11px;
          color: #4b5563;
          border-bottom: 1px solid #f3f4f6;
        }

        tr:last-child td {
          border-bottom: none;
        }

        tr:nth-child(even) {
          background: #f9fafb;
        }

        .status-cell {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 500;
        }

        .text-right {
          text-align: right;
        }

        /* Footer */
        .footer {
          margin-top: 32px;
          padding-top: 16px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          font-size: 10px;
          color: #9ca3af;
        }
        /* Page break */
        .page-break {
          page-break-after: always;
        }

        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
        }
      </style>
    </head>
    <body>
      <div class="page">
        <header class="header">
          <div class="header-left">
            <h1 class="header-title">Relatório de Fluigs</h1>
            <p class="header-subtitle">Gestão de solicitações e aprovações</p>
          </div>
          <div class="header-right">
            <p><strong>Gerado em:</strong></p>
            <p>${dayjs(generatedAt).tz('America/Sao_Paulo').format('DD/MM/YYYY [às] HH:mm')}</p>
          </div>
        </header>

        <div class="filters">
          <p class="filters-title">Filtros aplicados</p>
          <p class="filters-description">${getFilterDescription(filters)}</p>
        </div>

        <div class="summary">
          <div class="summary-card">
            <p class="summary-card-label">Total de Fluigs</p>
            <p class="summary-card-value">${data.length}</p>
          </div>
          <div class="summary-card">
            <p class="summary-card-label">Quantidade Total</p>
            <p class="summary-card-value">${`${formatWeight(totalQuantity)} KG`}</p>
          </div>
          <div class="summary-card">
            <p class="summary-card-label">Custo Total</p>
            <p class="summary-card-value">${formatCurrency(totalCost)}</p>
          </div>
        </div>

        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Produto</th>
                <th>Qtd.</th>
                <th>N° Fluig</th>
                <th>Data</th>
                <th>Status</th>
                <th class="text-right">Custo (R$)</th>
              </tr>
            </thead>
            <tbody>
              ${data
                .map(
                  (item) => `
                <tr>
                  <td>${item.code}</td>
                  <td>${item.product}</td>
                  <td>${formatWeight(Number(item.quantity))}</td>
                  <td>${item.nFluig}</td>
                  <td>${dayjs(item.date).format('DD/MM/YYYY')}</td>
                  <td>
                    <span class="status-cell" style="background: ${statusColors[item.status].bg}; color: ${statusColors[item.status].text};">
                      ${statusLabels[item.status]}
                    </span>
                  </td>
                  <td class="text-right">${formatCurrency(Number(item.costTotal))}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>

        <footer class="footer">
          <p>Documento gerado automaticamente pelo sistema Controle de Fluigs</p>
        </footer>
      </div>
    </body>
    </html>
  `
}
