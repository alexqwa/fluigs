import clsx from 'clsx'
import { useState, useRef, useCallback } from 'react'
import { RotateCw, UploadIcon, File, X, CloudCheck } from 'lucide-react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'

import { type RowError } from '@/lib/import/parser'
import { importProducts } from '@/actions/admin/products'

function fmtSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const ALLOWED_EXT = ['xlsx', 'xls', 'csv']

function getExt(name: string) {
  return name.split('.').pop()?.toLowerCase() ?? ''
}

type Status = 'idle' | 'uploading' | 'done' | 'error'

type ImportResult =
  | {
      success: true
      imported: number
      inserted: number
      updated: number
      skipped: number
      errors: RowError[]
    }
  | {
      success: false
      error: string
      errors?: RowError[]
      skipped?: number
    }

export function FileUpload() {
  const [dragover, setDragover] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>('')

  const [uploadState, setUploadState] = useState<Status>('idle')
  const [progress, setProgress] = useState<number>(0)
  const [progressLabel, setProgressLabel] = useState('')
  const [result, setResult] = useState<ImportResult | null>(null)

  const progressRef = useRef<NodeJS.Timeout | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleUpload = useCallback(async () => {
    if (!file || uploadState === 'uploading' || uploadState === 'done') return

    setUploadState('uploading')
    setProgress(0)
    setResult(null)
    startFakeProgress()

    const form = new FormData()
    form.append('file', file)

    try {
      const data = await importProducts(form)

      if (progressRef.current) clearInterval(progressRef.current)
      setProgress(100)

      if (!data.success) {
        setUploadState('error')
        setProgressLabel(data.error ?? 'Erro ao processar o arquivo')
        setResult(data)
      } else {
        setUploadState('done')
        setProgressLabel('Importação concluída')
        setResult(data)
      }
    } catch (err) {
      if (progressRef.current) clearInterval(progressRef.current)
      setProgress(0)
      setUploadState('error')
      setProgressLabel('Erro de conexão. Tente novamente.')
    }
  }, [file, uploadState])

  return (
    <>
      <Card
        onDrop={onDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragover(true)
        }}
        onDragLeave={() => setDragover(false)}
        onClick={() => !file && fileInputRef.current?.click()}
        className={clsx(
          'border-border col-span-1 flex cursor-pointer items-center justify-center rounded-lg! border-[1.5px] border-dashed py-10! transition-colors md:col-span-2 lg:col-span-4',
          {
            ['dark:bg-ring/15 bg-ring/20 border-muted-foreground dark:border-border']:
              dragover,
            ['cursor-default']: file,
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
            <div className="text-destructive mt-2.5 text-xs font-medium">
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
    </>
  )
}
