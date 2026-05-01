import z from 'zod'
import { Suspense } from 'react'
import { HistoryDataTable } from '@/components/tables'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import { ImportLogInputSchema } from '@/generated/zod/schemas'

const importLogInputSchema = ImportLogInputSchema.omit({
  skipped: true,
  totalRows: true,
  finishedAt: true,
  errorDetail: true,
})

type HistoryType = z.infer<typeof importLogInputSchema>

export function CardLogs({ logs }: { logs: HistoryType[] }) {
  return (
    <Card className="col-span-1 rounded-lg! p-4! md:col-span-2 lg:col-span-4">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-sm font-medium md:text-base">
          Histórico de Importações
        </CardTitle>
      </CardHeader>
      <HistoryDataTable data={logs} />
    </Card>
  )
}
