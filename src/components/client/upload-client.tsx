'use client'

import { useState, useRef } from 'react'
import { UploadIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
} from '@/components/ui/card'

import { DataCard } from '@/components/data-display/metrics-card'

const COMPRADORES = [
  { name: 'Limpeza / Higiene', count: '2.283' },
  { name: 'Lidiane Braga', count: '2.216' },
  { name: 'Gustavo', count: '1.445' },
  { name: 'Luciria Melo', count: '1.229' },
  { name: 'Maisa Sousa', count: '1.025' },
]

const COLORS = {
  green: {
    bg: '#EAF3DE',
    text: '#3B6D11',
    mid: '#639922',
    dark: '#27500A',
    bar: '#4A8A18',
  },
  amber: { bg: '#FAEEDA', text: '#854F0B', mid: '#EF9F27' },
  gray: { bg: '#F1EFE8', text: '#5F5E5A', mid: '#B4B2A9' },
}

const CURVA = [
  { label: 'A', pct: 29, count: '3.430', color: COLORS.green.bar },
  { label: 'B', pct: 20, count: '2.459', color: COLORS.amber.mid },
  { label: 'C', pct: 100, count: '12.437', color: COLORS.gray.mid },
]

type Status = 'idle' | 'ready' | 'parsing' | 'uploading' | 'done' | 'error'

export function UploadClient() {
  const [dragover, setDragover] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState<Status>('idle')
  const [statusLabel, setStatusLabel] = useState('')
  const [fileErrors, setFileErrors] = useState<string[]>([])
  const [rowErrors, setRowErrors] = useState<string[]>([])
  const [importedCount, setImportedCount] = useState(0)
  const [serverError, setServerError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <DataCard
        title="Total de Itens"
        value="23.938"
        description="Na base de dados atual"
        subdescription="14,8% dos itens"
      />
      <DataCard
        title="Curva A"
        value="3.430"
        description="Itens de alta relevância"
        subdescription="14,8% dos itens"
      />
      <DataCard
        title="Curva B"
        value="2.459"
        description="Itens de média relevância"
        subdescription="10,6% dos itens"
      />
      <DataCard
        title="Curva C"
        value="12.437"
        description="Itens de baixa relevância"
        subdescription="53,7% dos itens"
      />
      <Card className="col-span-1 rounded-lg! p-4! md:col-span-2">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm font-medium md:text-base">
            Distribuição Curva ABC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {CURVA.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4">
                  <span className="text-muted-foreground text-sm">
                    {c.label}
                  </span>
                </div>
                <Progress value={c.pct} />
                <div className="min-w-12 text-right">
                  <span className="text-muted-foreground text-sm">
                    {c.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex flex-col gap-1.5">
            <span className="text-foreground text-xs leading-tight font-medium">
              Boa distribuição entre categorias
            </span>
            <span className="text-muted-foreground text-xs leading-tight">
              Aumento da lucratividade e redução de custos de estoque
            </span>
          </div>
        </CardFooter>
      </Card>
      <Card className="col-span-1 rounded-lg! p-4! md:col-span-2">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm font-medium md:text-base">
            Principais Compradores
          </CardTitle>
        </CardHeader>
        <CardContent>
          {COMPRADORES.map((item, i) => (
            <div
              key={i}
              className="odd:bg-ring/15 flex flex-row items-center justify-between rounded-sm px-3 py-2"
            >
              <span className="text-muted-foreground text-xs">{item.name}</span>
              <span className="text-muted-foreground text-xs">
                {item.count}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card
        style={{
          border: `1.5px dashed ${dragover ? '#3B6D11' : '#c8c6be'}`,
          background: dragover ? '#EAF3DE' : '#f6f6f6',
          cursor: file ? 'default' : 'pointer',
          transition: 'background 0.15s, border-color 0.15s',
        }}
        className="col-span-1 flex items-center justify-center py-10! md:col-span-2 lg:col-span-4"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          style={{ display: 'none' }}
        />
        <div className="flex flex-col items-center space-y-3">
          <div className="bg-ring/15 flex size-13 items-center justify-center rounded-lg">
            <UploadIcon className="text-muted-foreground" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-foreground text-base font-medium">
              Arraste e solte a planilha aqui
            </span>
            <span className="text-muted-foreground text-sm">
              ou clique para selecionar o arquivo
            </span>
          </div>
          {!file && (
            <Button
              onClick={(e) => {
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
              variant="outline"
              className="cursor-pointer"
            >
              Selecionar arquivo
            </Button>
          )}
          <span className="text-muted-foreground/80 text-xs">
            .xlsx · .xls · .csv · máx 10 MB
          </span>
        </div>
      </Card>
    </div>
  )
}
