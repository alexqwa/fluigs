'use client'

import * as React from 'react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field'
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
  IconLoader,
  IconTrashX,
  IconHeartSpark,
  IconPencilMinus,
  IconChevronLeft,
  IconDotsVertical,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
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

import { DatePicker } from '@/components/DatePicker'
import { EditableFluigDialog } from '@/components/EditableFluigDialog'

interface DataItem {
  id: number
  code: string
  product: string
  quantity: string
  nFluig: string
  date: string
  status: string
  cost: string
}

const columns: ColumnDef<DataItem>[] = [
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
    cell: ({ row }) => {
      return <EditableFluigDialog item={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade',
    cell: ({ row }) => (
      <div className="w-32 md:w-fit">
        <span className="text-muted-foreground text-sm">
          {row.original.quantity}
        </span>
      </div>
    ),
  },
  {
    accessorKey: 'nFluig',
    header: 'N Fluig',
    cell: ({ row }) => (
      <div className="w-24 md:w-fit">
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
      <span className="text-muted-foreground text-sm">{row.original.date}</span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className="w-32 md:w-fit">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.status === 'Aprovado' ? (
            <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
          ) : (
            <IconLoader />
          )}
          {row.original.status}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'cost',
    header: 'Custo Total',
    cell: ({ row }) => (
      <div className="w-28 md:w-fit">
        <span className="text-muted-foreground text-sm">
          {row.original.cost}
        </span>
      </div>
    ),
  },
  {
    id: 'actions',
    cell: () => (
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
            <DropdownMenuItem className="hover:bg-muted cursor-pointer">
              <IconPencilMinus className="text-muted-foreground" />
              <span className="text-foreground text-sm">Editar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="hover:bg-muted cursor-pointer"
              variant="destructive"
            >
              <IconTrashX className="text-muted-foreground" />
              <span className="text-foreground text-sm">Deletar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
]

export function DataTable({ data: initialData }: { data: DataItem[] }) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data: initialData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
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
      <FieldGroup className="mt-8">
        <Field>
          <FieldLabel htmlFor="fieldgroup-code">Código</FieldLabel>
          <Input
            id="fieldgroup-code"
            placeholder="Buscar pelo código"
            className="border-border bg-card border"
            value={(table.getColumn('code')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('code')?.setFilterValue(event.target.value)
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-date">Período</FieldLabel>
          <DatePicker />
        </Field>
      </FieldGroup>
      <div className="border-border overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted border-border sticky top-0 z-10 border-b">
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
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
