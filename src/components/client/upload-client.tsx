'use client'

import z from 'zod'
import clsx from 'clsx'
import { useState, useRef, useCallback, useEffect } from 'react'
import { UploadIcon, File, X, CloudCheck, RotateCw } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
} from '@/components/ui/card'

import { ImportLogInputSchema } from '@/generated/zod/schemas'
import { DataCard } from '@/components/data-display/metrics-card'
import { HistoryDataTable } from '@/components/data-display/history-data-table'

const COMPRADORES = [
  { name: 'Limpeza / Higiene', count: '2.283' },
  { name: 'Lidiane Braga', count: '2.216' },
  { name: 'Gustavo', count: '1.445' },
  { name: 'Luciria Melo', count: '1.229' },
  { name: 'Maisa Sousa', count: '1.025' },
]

const C = {
  green: {
    bg: '#EAF3DE',
    text: '#3B6D11',
    mid: '#639922',
    dark: '#27500A',
    bar: '#4A8A18',
    border: '#C0DD97',
  },
  amber: { bg: '#FAEEDA', text: '#854F0B', mid: '#EF9F27', border: '#F5CFA0' },
  red: { bg: '#FDECEC', text: '#922020', border: '#F5B8B8' },
  gray: { bg: '#F1EFE8', text: '#5F5E5A', mid: '#B4B2A9', border: '#E0DED8' },
  surface: '#FAFAF8',
  card: '#FFFFFF',
  border: '#E0DED8',
  txt1: '#1A1A18',
  txt2: '#5F5E5A',
  txt3: '#B4B2A9',
}

const CURVA = [
  { label: 'A', pct: 29, count: '3.430', color: C.green.bar },
  { label: 'B', pct: 20, count: '2.459', color: C.amber.mid },
  { label: 'C', pct: 100, count: '12.437', color: C.gray.mid },
]

const importLogInputSchema = ImportLogInputSchema.omit({
  skipped: true,
  totalRows: true,
  finishedAt: true,
  errorDetail: true,
})

type Status = 'idle' | 'uploading' | 'done' | 'error'
type HistoryType = z.infer<typeof importLogInputSchema>

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const ALLOWED_EXT = ['xlsx', 'xls', 'csv']

function getExt(name: string) {
  return name.split('.').pop()?.toLowerCase() ?? ''
}

export function UploadClient() {
  const [dragover, setDragover] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')

  // upload state: idle | uploading | done | error
  const [uploadState, setUploadState] = useState<Status>('idle')
  const [progress, setProgress] = useState<number>(0)
  const [progressLabel, setProgressLabel] = useState('')
  const [result, setResult] = useState(null)

  const [history, setHistory] = useState<HistoryType[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)

  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Derivados de UI ──────────────────────────────────────────────────────────
  const isDone = uploadState === 'done'
  const isError = uploadState === 'error'
  const isUploading = uploadState === 'uploading'
  const isReady = !!file && uploadState === 'idle'
  const btnLabel = isUploading
    ? 'Processando...'
    : isDone
      ? 'Importado'
      : isError
        ? 'Tentar novamente'
        : 'Importar e atualizar sistema'

  // ── Busca histórico de importações ──────────────────────────────────────────
  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true)
    try {
      const res = await fetch('/api/products/import/history')
      if (res.ok) setHistory(await res.json())
    } catch (_) {
      /* silencioso */
    } finally {
      setLoadingHistory(false)
    }
  }, [])

  useEffect(() => {
    fetchHistory()
  }, [fetchHistory])

  // ── Seleção de arquivo ───────────────────────────────────────────────────────
  const handleFile = useCallback((f: File | undefined) => {
    if (!f) return
    setFileError('')
    setResult(null)

    const ext = getExt(f.name)
    if (!ALLOWED_EXT.includes(ext)) {
      setFileError(`Formato "${ext}" não permitido. Use .xlsx, .xls ou .csv`)
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      setFileError('Arquivo maior que 10MB.')
      return
    }
    setFile(f)
    setUploadState('idle')
    setProgress(0)
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      setDragover(false)
      handleFile(e.dataTransfer.files[0])
    },
    [handleFile]
  )

  const reset = useCallback(() => {
    if (progressRef.current) clearInterval(progressRef.current)
    setFile(null)
    setUploadState('idle')
    setProgress(0)
    setProgressLabel('')
    setResult(null)
    setFileError('')
  }, [])

  // ── Simulação de progresso visual (feedback enquanto aguarda API) ─────────
  function startFakeProgress(onDone?: () => void) {
    let pct = 0
    if (progressRef.current) clearInterval(progressRef.current)
    progressRef.current = setInterval(() => {
      pct += Math.floor(Math.random() * 8) + 3
      if (pct >= 90) {
        if (progressRef.current) clearInterval(progressRef.current)
        pct = 90
      }
      setProgress(pct)
      if (pct < 35) setProgressLabel('Enviando arquivo...')
      else if (pct < 65) setProgressLabel('Validando dados...')
      else setProgressLabel('Atualizando produtos...')
    }, 220)
    return () => {
      if (progressRef.current) clearInterval(progressRef.current)
    }
  }

  // ── Upload real para a API ──────────────────────────────────────────────────
  const handleUpload = useCallback(async () => {
    if (!file || uploadState === 'uploading' || uploadState === 'done') return

    setUploadState('uploading')
    setProgress(0)
    setResult(null)
    startFakeProgress()

    const form = new FormData()
    form.append('file', file)

    try {
      const res = await fetch('/api/products/import', {
        method: 'POST',
        body: form,
      })
      const data = await res.json()

      if (progressRef.current) clearInterval(progressRef.current)
      setProgress(100)

      if (!res.ok) {
        setUploadState('error')
        setProgressLabel(data.error ?? 'Erro ao processar o arquivo')
        setResult(data)
      } else {
        setUploadState('done')
        setProgressLabel('Importação concluída')
        setResult(data)
        fetchHistory() // atualiza o histórico
      }
    } catch (err) {
      if (progressRef.current) clearInterval(progressRef.current)
      setProgress(0)
      setUploadState('error')
      setProgressLabel('Erro de conexão. Tente novamente.')
    }
  }, [file, uploadState, fetchHistory])

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
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragover(true)
        }}
        onDragLeave={() => setDragover(false)}
        onClick={() => !file && fileInputRef.current?.click()}
        className={clsx(
          'col-span-1 flex cursor-default items-center justify-center rounded-lg! border-[1.5px] border-dashed border-[#c8c6be] py-10! transition-colors md:col-span-2 lg:col-span-4',
          {
            ['border-[#3B6D11] bg-[#EAF3DE]']: dragover,
            ['cursor-pointer']: file,
          }
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleFile(e.target.files?.[0])
          }
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

          {fileError && (
            <div
              style={{
                fontSize: 12,
                color: C.red.text,
                marginTop: 10,
                fontWeight: 500,
              }}
            >
              {fileError}
            </div>
          )}

          <span className="text-muted-foreground/80 text-xs">
            .xlsx · .xls · .csv · máx 10 MB
          </span>
        </div>
      </Card>
      {file && (
        <div className="col-span-1 md:col-span-2 lg:col-span-4">
          <div className="bg-card border-border mb-2.5 flex items-center gap-3 rounded-lg border px-2.5 py-3.5">
            <div className="bg-ring/15 border-border flex size-9 shrink-0 items-center justify-center rounded-lg border">
              <File size={18} className="text-foreground" />
            </div>
            <div className="flex flex-1 flex-col">
              <span className="text-foreground overflow-hidden text-sm font-medium text-ellipsis">
                {file.name}
              </span>
              <span className="text-muted-foreground text-xs">
                {fmtSize(file.size)}
              </span>
            </div>
            {!isDone && (
              <Button
                onClick={reset}
                variant={'outline'}
                className="cursor-pointer"
              >
                <X size={18} className="text-muted-foreground" />
              </Button>
            )}
          </div>
          <Progress value={progress} />
          <div className="mt-1 flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              {progressLabel}
            </span>
            <span className="text-muted-foreground text-xs">{progress}%</span>
          </div>
        </div>
      )}

      {file && !isError && (
        <Button
          variant={'default'}
          onClick={isError ? reset : handleUpload}
          disabled={isUploading || isDone}
          className={clsx(
            'col-span-1 h-12 cursor-default md:col-span-2 lg:col-span-4',
            {
              ['cursor-pointer']: isReady,
            }
          )}
        >
          <span>{btnLabel}</span>
          {isReady ? (
            <UploadIcon size={24} className="text-primary-foreground" />
          ) : isDone ? (
            <CloudCheck size={24} className='text-primary-foreground"' />
          ) : null}
        </Button>
      )}

      {isError && (
        <Button
          onClick={reset}
          variant={'outline'}
          className="col-span-1 h-12 cursor-pointer md:col-span-2 lg:col-span-4"
        >
          Tentar novamente
          <RotateCw size={20} className="text-foreground" />
        </Button>
      )}

      <Card className="col-span-1 rounded-lg! p-4! md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm font-medium md:text-base">
            Histórico de Importações
          </CardTitle>
        </CardHeader>
        {loadingHistory ? (
          <div className="text-muted-foreground flex items-center justify-center py-10 text-sm">
            Carregando informações...
          </div>
        ) : history.length === 0 ? (
          <div className="text-muted-foreground flex items-center justify-center py-10 text-sm">
            Nenhuma importação registrada.
          </div>
        ) : (
          <HistoryDataTable data={history} />
        )}
      </Card>
    </div>
  )
}
