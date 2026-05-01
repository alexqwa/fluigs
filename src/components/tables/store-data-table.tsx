'use client'

import z from 'zod'
import { useState, useMemo } from 'react'

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
  IconTrashX,
  IconChevronLeft,
  IconPencilMinus,
  IconDotsVertical,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
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

import { Update, Delete } from '@/actions/admin/orgs'

import { UserInputSchema } from '@/generated/zod/schemas'
import { useDataOptimistic } from '@/hooks/use-data-optimistic'
import { FormUpdateBranch } from '@/components/forms/branch/form-update-branch'

const userSchema = UserInputSchema.omit({
  role: true,
  image: true,
  banned: true,
  sessions: true,
  accounts: true,
  banReason: true,
  updatedAt: true,
  createdAt: true,
  banExpires: true,
  emailVerified: true,
})

type UserSchema = z.infer<typeof userSchema>
type UserInputSchema = Omit<UserSchema, 'id'>

type FluigDataTableProps = {
  data: UserSchema[]
  optimistic: ReturnType<typeof useDataOptimistic<UserSchema>>
}

export function StoreDataTable({ data, optimistic }: FluigDataTableProps) {
  const { update, remove, rollback, confirmUpdate, confirmDelete } = optimistic

  const [rowSelection, setRowSelection] = useState({})
  const [editingRow, setEditingRow] = useState<UserSchema | null>(null)
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  function toUserSchema(
    updatedUser: Awaited<ReturnType<typeof Update>>,
    input: UserInputSchema
  ) {
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      branch: input.branch,
      fluigs: [],
    }
  }

  async function handleUpdate(id: string, formData: UserInputSchema) {
    update(id, formData)

    try {
      const updated = await Update(id, formData)

      confirmUpdate(id, toUserSchema(updated, formData))
    } catch {
      rollback()
    }
  }

  async function handleDelete(id: string) {
    remove(id)

    try {
      await Delete(id)

      confirmDelete(id)
    } catch {
      rollback()
    }
  }

  const columns = useMemo<ColumnDef<UserSchema>[]>(
    () => [
      {
        accessorKey: 'branch',
        header: 'Filial',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground pr-8 text-sm">
              {row.original.branch}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'store',
        header: 'Loja',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground text-sm">
              {row.original.name}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: 'E-mail',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground text-sm">
              {row.original.email}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'fluigs',
        header: 'Fluigs',
        cell: ({ row }) => (
          <div className="w-fit pr-8 md:pr-0">
            <span className="text-muted-foreground text-sm">
              {row.original.fluigs.length}
            </span>
          </div>
        ),
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
                    className="text-muted-foreground flex size-8 cursor-pointer"
                    size="icon"
                  >
                    <IconDotsVertical />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-card border-border w-36 border"
                >
                  <DropdownMenuItem
                    variant="default"
                    className="focus:bg-ring/15 text-primary cursor-pointer"
                    onClick={() => setEditingRow(row.original)}
                  >
                    <IconPencilMinus className="text-primary" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={() => handleDelete(id)}
                  >
                    <IconTrashX />
                    Deletar
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
      <FormUpdateBranch
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
