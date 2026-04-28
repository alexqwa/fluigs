'use client'

import z from 'zod'
import dayjs from 'dayjs'
import { useState, useMemo, ElementType } from 'react'

import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  flexRender,
  useReactTable,
  type ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  type SortingState,
  getFacetedRowModel,
  getFilteredRowModel,
  type VisibilityState,
  getPaginationRowModel,
  getFacetedUniqueValues,
  type ColumnFiltersState,
} from '@tanstack/react-table'
import {
  IconRefreshDot,
  IconChevronLeft,
  IconCircleHalf2,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconExclamationCircleFilled,
} from '@tabler/icons-react'
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select'
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableHeader,
} from '@/components/ui/table'

import { ImportLogInputSchema } from '@/generated/zod/schemas'

const importLogInputSchema = ImportLogInputSchema.omit({
  skipped: true,
  totalRows: true,
  finishedAt: true,
  errorDetail: true,
})

type HistoryType = z.infer<typeof importLogInputSchema>
type HistoryStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'DONE'
  | 'DONE_WITH_WARNINGS'
  | 'FAILED'

type HistoryDataTableProps = {
  data: HistoryType[]
}

const statusMap: Record<
  HistoryStatus,
  {
    label: string
    icon: ElementType
    color: string
  }
> = {
  DONE: {
    label: 'Concluído',
    icon: IconCircleCheckFilled,
    color: 'text-green-500',
  },
  DONE_WITH_WARNINGS: {
    label: 'Parcial',
    icon: IconCircleHalf2,
    color: 'text-yellow-500',
  },
  FAILED: {
    label: 'Falhou',
    icon: IconExclamationCircleFilled,
    color: 'text-red-500',
  },
  PROCESSING: {
    label: 'Processando',
    icon: IconRefreshDot,
    color: 'text-yellow-500 animate-spin duration-300 scale-x-[-1]',
  },
  PENDING: {
    label: 'Pendente',
    icon: IconRefreshDot,
    color: 'text-purple-500 animate-spin duration-300 scale-x-[-1]',
  },
}

export function HistoryDataTable({ data }: HistoryDataTableProps) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const columns = useMemo<ColumnDef<HistoryType>[]>(
    () => [
      {
        accessorKey: 'filename',
        header: 'Arquivo',
        cell: ({ row }) => (
          <div className="w-fit pr-8">
            <span className="text-muted-foreground pr-8 text-sm">
              {row.original.filename}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Data',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground text-sm">
              {dayjs(row.original.createdAt).format('DD/MM/YYYY')}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'inserted',
        header: 'Inseridos',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground text-sm">
              {row.original.inserted}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'updated',
        header: 'Atualizados',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground text-sm">
              {row.original.updated}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'errors',
        header: 'Erros',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground text-sm">
              {row.original.updated}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = statusMap[row.original.status]
          const Icon = status.icon

          return (
            <div className="w-32 md:w-fit">
              <Badge variant="outline" className="text-muted-foreground px-1.5">
                <Icon className={status.color} />
                {status.label}
              </Badge>
            </div>
          )
        },
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="relative flex flex-1 flex-col gap-4 overflow-auto">
      <div className="border-border overflow-hidden rounded-lg border shadow-md">
        <Table>
          <TableHeader className="bg-card border-border sticky top-0 border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-card **:data-[slot=table-cell]:first:w-8">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="hidden items-center gap-2 lg:flex">
          <Label htmlFor="rows-per-page" className="text-sm font-medium">
            Linhas por página
          </Label>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value))
            }}
          >
            <SelectTrigger
              size="sm"
              className="bg-card border-border w-20 border"
              id="rows-per-page"
            >
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top" className="bg-card border-border border">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  className="hover:bg-muted cursor-pointer"
                  key={pageSize}
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="bg-card border-border hidden h-8 w-8 cursor-pointer border p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Vá para primeira página</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="bg-card border-border size-8 cursor-pointer border"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Vá para página anterior</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="bg-card border-border size-8 cursor-pointer border"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Vá para próxima página</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="bg-card border-border hidden size-8 cursor-pointer border lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Vá para última página</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
