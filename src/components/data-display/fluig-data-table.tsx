'use client'

import z from 'zod'
import dayjs from 'dayjs'
import { useState, useMemo, ElementType } from 'react'

import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FormUpdateFluig } from '@/components/forms/form-update-fluig'
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
  IconTrashX,
  IconReload,
  IconChevronLeft,
  IconPencilMinus,
  IconDotsVertical,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconExclamationCircleFilled,
} from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
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

import { Delete } from '@/actions/fluig/delete'
import { Update } from '@/actions/fluig/update'

import { FluigInputSchema } from '@/generated/zod/schemas'
import { useFluigOptimistic } from '@/hooks/use-fluig-optimistic'

type FluigStatus = 'Approved' | 'Pending' | 'Not_Approved'

const fluigSchema = FluigInputSchema.omit({
  user: true,
  userId: true,
  createdAt: true,
}).extend({
  date: z.date(),
  code: z.string().min(1, 'Código é obrigatório.'),
  product: z.string().min(1, 'Produto é obrigatório.'),
  quantity: z.string().min(1, 'Quantidade é obrigatório.'),
  nFluig: z.number().min(1, 'Número do fluig é obrigatório.'),
  cost: z.string().min(1, 'Custo do produto é obrigatório.'),
  status: z.enum(['Approved', 'Pending', 'Not_Approved']),
})

type FluigSchema = z.infer<typeof fluigSchema>

type FluigDataTableProps = {
  data: FluigSchema[]
  optimistic: ReturnType<typeof useFluigOptimistic<FluigSchema>>
}

const statusMap: Record<
  FluigStatus,
  {
    label: string
    icon: ElementType
    color: string
  }
> = {
  Approved: {
    label: 'Aprovado',
    icon: IconCircleCheckFilled,
    color: 'text-green-500',
  },
  Pending: {
    label: 'Aguardando',
    icon: IconReload,
    color: 'text-yellow-400 animate-spin duration-300',
  },
  Not_Approved: {
    label: 'Não Aprovado',
    icon: IconExclamationCircleFilled,
    color: 'text-red-400',
  },
}

export function FluigDataTable({ data, optimistic }: FluigDataTableProps) {
  const { update, remove, rollback, confirmUpdate, confirmDelete } = optimistic

  const [rowSelection, setRowSelection] = useState({})
  const [editingRow, setEditingRow] = useState<FluigSchema | null>(null)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  // Editar: aplica as mudanças na linha antes da resposta do servidor.
  async function handleUpdate(
    id: string,
    formData: Omit<FluigSchema, 'id' | 'costTotal'>
  ) {
    update(id, formData)

    try {
      const updated = await Update(id, formData)

      confirmUpdate(id, updated)
    } catch {
      rollback()
    }
  }

  // Deletar: remove a linha imediatamente.
  async function handleDelete(id: string) {
    remove(id)

    try {
      await Delete(id)

      confirmDelete(id)
    } catch {
      rollback()
    }
  }

  const columns = useMemo<ColumnDef<FluigSchema>[]>(
    () => [
      {
        accessorKey: 'code',
        header: 'Código',
        cell: ({ row }) => (
          <div className="w-24 md:w-fit">
            <span className="text-muted-foreground pr-8 text-sm">
              {row.original.code}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'product',
        header: 'Produto',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground text-sm">
              {row.original.product}
            </span>
          </div>
        ),

        enableHiding: false,
      },
      {
        accessorKey: 'quantity',
        header: 'Quantidade',
        cell: ({ row }) => {
          const quantity = Intl.NumberFormat('pt-BR', {
            style: 'decimal',
            minimumFractionDigits: 2,
          }).format(Number(row.original.quantity))

          return (
            <div className="w-32 md:w-fit">
              <span className="text-muted-foreground text-sm">{quantity}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'nFluig',
        header: 'N Fluig',
        cell: ({ row }) => (
          <div className="w-28 md:w-fit">
            <span className="text-muted-foreground text-sm">
              {row.original.nFluig}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'date',
        header: 'Data',
        cell: ({ row }) => (
          <div className="w-28 md:w-fit">
            <span className="text-muted-foreground text-sm">
              {dayjs(row.original.date).format('DD/MM/YYYY')}
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
      {
        accessorKey: 'costTotal',
        header: 'Custo (R$)',
        cell: ({ row }) => {
          const costTotal = Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(Number(row.original.costTotal))

          return (
            <div className="w-28 md:w-fit">
              <span className="text-muted-foreground text-sm">{costTotal}</span>
            </div>
          )
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => {
          const id = row.original.id

          return (
            <div className="flex justify-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
                    size="icon"
                  >
                    <IconDotsVertical />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-card border-border w-36 border"
                >
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setEditingRow(row.original)}
                    className="hover:bg-muted cursor-pointer"
                  >
                    <IconPencilMinus className="text-muted-foreground" />
                    <span className="text-foreground text-sm">Editar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => handleDelete(id)}
                    className="hover:bg-muted cursor-pointer"
                  >
                    <IconTrashX className="text-muted-foreground" />
                    <span className="text-foreground text-sm">Deletar</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
      <div className="border-border overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted border-border sticky top-0 border-b">
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
      <FormUpdateFluig
        defaultValues={editingRow}
        open={!!editingRow}
        onOpenChange={(open) => {
          if (!open) setEditingRow(null)
        }}
        onSubmit={(formData) => {
          if (!editingRow) return

          handleUpdate(editingRow.id, formData)
          setEditingRow(null)
        }}
      />
    </div>
  )
}
