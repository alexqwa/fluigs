// 'use client'

// import * as React from 'react'
// import {
//   type ColumnDef,
//   type ColumnFiltersState,
//   flexRender,
//   getCoreRowModel,
//   getFacetedRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   type SortingState,
//   useReactTable,
//   type VisibilityState,
// } from '@tanstack/react-table'
// import {
//   IconChevronLeft,
//   IconChevronRight,
//   IconChevronsLeft,
//   IconChevronsRight,
//   IconCircleCheckFilled,
//   IconDotsVertical,
//   IconUpload,
//   IconLoader,
//   IconHeartSpark,
//   IconPencilMinus,
//   IconTrashX,
// } from '@tabler/icons-react'
// import Image from 'next/image'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'
// import { useIsMobile } from '@/hooks/use-mobile'
// import { Checkbox } from '@/components/ui/checkbox'
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from '@/components/ui/table'
// import { DatePicker } from './DatePicker'
// import { FieldGroup, Field, FieldLabel } from './ui/field'

// interface DataItem {
//   id: number
//   product: string
//   price: string
//   discount: string
//   status: string
//   date: string
//   imgCover?: string
// }

// const columns: ColumnDef<DataItem>[] = [
//   {
//     id: 'select',
//     header: ({ table }) => (
//       <div className="flex items-center justify-center">
//         <Checkbox
//           checked={
//             table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() && 'indeterminate')
//           }
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       </div>
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'product',
//     header: 'Produto',
//     cell: ({ row }) => {
//       return <TableCellViewer item={row.original} />
//     },
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'price',
//     header: 'Preço',
//     cell: ({ row }) => (
//       <div className="w-32 md:w-fit">
//         <span className="text-muted-foreground text-sm">
//           {row.original.price}
//         </span>
//       </div>
//     ),
//   },
//   {
//     accessorKey: 'discount',
//     header: 'Desconto',
//     cell: ({ row }) => (
//       <div className="w-24 md:w-fit">
//         <span className="text-muted-foreground text-sm">
//           {row.original.discount}
//         </span>
//       </div>
//     ),
//   },
//   {
//     accessorKey: 'status',
//     header: 'Status',
//     cell: ({ row }) => (
//       <div className="w-32 md:w-fit">
//         <Badge variant="outline" className="text-muted-foreground px-1.5">
//           {row.original.status === 'Ativo' ? (
//             <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
//           ) : (
//             <IconLoader />
//           )}
//           {row.original.status}
//         </Badge>
//       </div>
//     ),
//   },
//   {
//     accessorKey: 'date',
//     header: 'Data',
//     cell: ({ row }) => (
//       <span className="text-muted-foreground text-sm">{row.original.date}</span>
//     ),
//   },
//   {
//     id: 'actions',
//     cell: () => (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
//             size="icon"
//           >
//             <IconDotsVertical />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent
//           align="end"
//           className="bg-card border-border w-36 border"
//         >
//           <DropdownMenuItem className="hover:bg-muted cursor-pointer">
//             <IconPencilMinus className="text-muted-foreground" />
//             <span className="text-foreground text-sm">Editar</span>
//           </DropdownMenuItem>
//           <DropdownMenuItem className="hover:bg-muted cursor-pointer">
//             <IconHeartSpark className="text-muted-foreground" />
//             <span className="text-foreground text-sm">Favoritar</span>
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             className="hover:bg-muted cursor-pointer"
//             variant="destructive"
//           >
//             <IconTrashX className="text-muted-foreground" />
//             <span className="text-foreground text-sm">Deletar</span>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     ),
//   },
// ]

// export function DataTable({ data: initialData }: { data: DataItem[] }) {
//   const [rowSelection, setRowSelection] = React.useState({})
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [pagination, setPagination] = React.useState({
//     pageIndex: 0,
//     pageSize: 10,
//   })

//   const table = useReactTable({
//     data: initialData,
//     columns,
//     state: {
//       sorting,
//       columnVisibility,
//       rowSelection,
//       columnFilters,
//       pagination,
//     },
//     getRowId: (row) => row.id.toString(),
//     enableRowSelection: true,
//     onRowSelectionChange: setRowSelection,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     onColumnVisibilityChange: setColumnVisibility,
//     onPaginationChange: setPagination,
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFacetedRowModel: getFacetedRowModel(),
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//   })

//   return (
//     <div className="relative flex flex-1 flex-col gap-4 overflow-auto">
//       <FieldGroup className="mt-8">
//         <Field>
//           <FieldLabel htmlFor="fieldgroup-code">Código</FieldLabel>
//           <Input
//             id="fieldgroup-code"
//             placeholder="Buscar pelo código"
//             className="border-border bg-card border"
//             value={
//               (table.getColumn('product')?.getFilterValue() as string) ?? ''
//             }
//             onChange={(event) =>
//               table.getColumn('product')?.setFilterValue(event.target.value)
//             }
//           />
//         </Field>
//         <Field>
//           <FieldLabel htmlFor="fieldgroup-fluig">Nº Fluig</FieldLabel>
//           <Input
//             id="fieldgroup-fluig"
//             placeholder="Digite o número do fluig"
//             className="border-border bg-card border"
//           />
//         </Field>
//         <Field>
//           <FieldLabel htmlFor="fieldgroup-date">Data</FieldLabel>
//           <DatePicker />
//         </Field>
//       </FieldGroup>
//       <div className="border-border overflow-hidden rounded-lg border">
//         <Table>
//           <TableHeader className="bg-muted border-border sticky top-0 z-10 border-b">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id} colSpan={header.colSpan}>
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                             header.column.columnDef.header,
//                             header.getContext()
//                           )}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody className="bg-card **:data-[slot=table-cell]:first:w-8">
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && 'selected'}
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id}>
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   Sem resultados.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
//           {table.getFilteredSelectedRowModel().rows.length} de{' '}
//           {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
//         </div>
//         <div className="flex w-full items-center gap-8 lg:w-fit">
//           <div className="hidden items-center gap-2 lg:flex">
//             <Label htmlFor="rows-per-page" className="text-sm font-medium">
//               Linhas por página
//             </Label>
//             <Select
//               value={`${table.getState().pagination.pageSize}`}
//               onValueChange={(value) => {
//                 table.setPageSize(Number(value))
//               }}
//             >
//               <SelectTrigger
//                 size="sm"
//                 className="bg-card border-border w-20 border"
//                 id="rows-per-page"
//               >
//                 <SelectValue
//                   placeholder={table.getState().pagination.pageSize}
//                 />
//               </SelectTrigger>
//               <SelectContent
//                 side="top"
//                 className="bg-card border-border border"
//               >
//                 {[10, 20, 30, 40, 50].map((pageSize) => (
//                   <SelectItem
//                     className="hover:bg-muted cursor-pointer"
//                     key={pageSize}
//                     value={`${pageSize}`}
//                   >
//                     {pageSize}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="flex w-fit items-center justify-center text-sm font-medium">
//             Página {table.getState().pagination.pageIndex + 1} de{' '}
//             {table.getPageCount()}
//           </div>
//           <div className="ml-auto flex items-center gap-2 lg:ml-0">
//             <Button
//               variant="outline"
//               className="bg-card border-border hidden h-8 w-8 cursor-pointer border p-0 lg:flex"
//               onClick={() => table.setPageIndex(0)}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <span className="sr-only">Vá para primeira página</span>
//               <IconChevronsLeft />
//             </Button>
//             <Button
//               variant="outline"
//               className="bg-card border-border size-8 cursor-pointer border"
//               size="icon"
//               onClick={() => table.previousPage()}
//               disabled={!table.getCanPreviousPage()}
//             >
//               <span className="sr-only">Vá para página anterior</span>
//               <IconChevronLeft />
//             </Button>
//             <Button
//               variant="outline"
//               className="bg-card border-border size-8 cursor-pointer border"
//               size="icon"
//               onClick={() => table.nextPage()}
//               disabled={!table.getCanNextPage()}
//             >
//               <span className="sr-only">Vá para próxima página</span>
//               <IconChevronRight />
//             </Button>
//             <Button
//               variant="outline"
//               className="bg-card border-border hidden size-8 cursor-pointer border lg:flex"
//               size="icon"
//               onClick={() => table.setPageIndex(table.getPageCount() - 1)}
//               disabled={!table.getCanNextPage()}
//             >
//               <span className="sr-only">Vá para última página</span>
//               <IconChevronsRight />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// function TableCellViewer({ item }: { item: DataItem }) {
//   const isMobile = useIsMobile()

//   return (
//     <Drawer direction={isMobile ? 'bottom' : 'right'}>
//       <DrawerTrigger asChild>
//         <Button variant="link" className="text-foreground w-fit px-0 text-left">
//           {item.product}
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader className="gap-1">
//           <DrawerTitle>{item.product}</DrawerTitle>
//           <DrawerDescription>
//             Mostrando o detalhes do seu produto
//           </DrawerDescription>
//         </DrawerHeader>
//         <div className="overflow-y-auto px-4 text-sm">
//           {item.imgCover ? (
//             <div className="mb-4 flex flex-col">
//               <div className="group relative mb-2 h-44 w-full overflow-hidden rounded-lg">
//                 <Image
//                   fill
//                   className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
//                   src={item.imgCover}
//                   alt="Imagem do produto"
//                 />
//               </div>
//               <Badge variant="outline" className="cursor-pointer">
//                 <IconUpload size={20} className="text-muted-foreground" />
//                 <span className="text-muted-foreground">Mudar imagem</span>
//               </Badge>
//             </div>
//           ) : (
//             <div className="border-border mb-4 flex h-44 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed transition-all">
//               <div className="inline-flex gap-2">
//                 <IconUpload size={20} className="text-muted-foreground" />
//                 <span className="text-muted-foreground text-sm">
//                   Fazer upload de imagem
//                 </span>
//               </div>
//             </div>
//           )}
//           <form className="flex flex-col gap-4">
//             <div className="flex flex-col gap-3">
//               <Label htmlFor="title">Título</Label>
//               <Input
//                 id="title"
//                 defaultValue={item.product}
//                 className="text-sm"
//               />
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex flex-col gap-3">
//                 <Label htmlFor="price">Preço</Label>
//                 <Input
//                   id="price"
//                   defaultValue={item.price}
//                   className="text-sm"
//                 />
//               </div>
//               <div className="flex flex-col gap-3">
//                 <Label htmlFor="discount">Desconto</Label>
//                 <Input
//                   id="discount"
//                   defaultValue={item.discount}
//                   className="text-sm"
//                 />
//               </div>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="flex flex-col gap-3">
//                 <Label htmlFor="status">Status</Label>
//                 <Select defaultValue={item.status}>
//                   <SelectTrigger
//                     id="status"
//                     className="h-9 w-full cursor-pointer"
//                   >
//                     <SelectValue placeholder="Selecione o status" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-card">
//                     <SelectItem
//                       value="Ativo"
//                       className="hover:bg-muted cursor-pointer text-sm"
//                     >
//                       Ativo
//                     </SelectItem>
//                     <SelectItem
//                       value="Em rascunho"
//                       className="hover:bg-muted cursor-pointer text-sm"
//                     >
//                       Em rascunho
//                     </SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex flex-col gap-3">
//                 <Label htmlFor="date">Data</Label>
//                 <Input id="date" defaultValue={item.date} className="text-sm" />
//               </div>
//             </div>
//           </form>
//         </div>
//         <DrawerFooter>
//           <Button className="cursor-pointer text-sm font-medium hover:brightness-125">
//             Salvar alterações
//           </Button>
//           <DrawerClose asChild>
//             <Button
//               variant="outline"
//               className="cursor-pointer text-sm font-medium hover:brightness-125"
//             >
//               Voltar
//             </Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   )
// }

'use client'

import * as React from 'react'
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconUpload,
  IconLoader,
  IconHeartSpark,
  IconPencilMinus,
  IconTrashX,
} from '@tabler/icons-react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useIsMobile } from '@/hooks/use-mobile'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DatePicker } from './DatePicker'
import { FieldGroup, Field, FieldLabel } from './ui/field'

interface DataItem {
  id: number
  code: string
  product: string
  quantity: string
  nFluig: string
  date: string
  status: string
  cost: string
  imgCover?: string
}

const columns: ColumnDef<DataItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'code',
    header: 'Codigo',
    cell: ({ row }) => (
      <span className="text-muted-foreground font-mono text-sm">
        {row.original.code}
      </span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: 'product',
    header: 'Produto',
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: 'quantity',
    header: 'Quantidade (KG)',
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
          {row.original.status === 'Ativo' ? (
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
    header: 'Custo',
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
          <DropdownMenuItem className="hover:bg-muted cursor-pointer">
            <IconHeartSpark className="text-muted-foreground" />
            <span className="text-foreground text-sm">Favoritar</span>
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
          <FieldLabel htmlFor="fieldgroup-fluig">Nº Fluig</FieldLabel>
          <Input
            id="fieldgroup-fluig"
            placeholder="Digite o número do fluig"
            className="border-border bg-card border"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="fieldgroup-date">Data</FieldLabel>
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
      <div className="flex items-center justify-between">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} de{' '}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
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
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent
                side="top"
                className="bg-card border-border border"
              >
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

function TableCellViewer({ item }: { item: DataItem }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.product}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.product}</DrawerTitle>
          <DrawerDescription>
            Mostrando o detalhes do seu produto
          </DrawerDescription>
        </DrawerHeader>
        <div className="overflow-y-auto px-4 text-sm">
          {item.imgCover ? (
            <div className="mb-4 flex flex-col">
              <div className="group relative mb-2 h-44 w-full overflow-hidden rounded-lg">
                <Image
                  fill
                  className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-105"
                  src={item.imgCover}
                  alt="Imagem do produto"
                />
              </div>
              <Badge variant="outline" className="cursor-pointer">
                <IconUpload size={20} className="text-muted-foreground" />
                <span className="text-muted-foreground">Mudar imagem</span>
              </Badge>
            </div>
          ) : (
            <div className="border-border mb-4 flex h-44 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed transition-all">
              <div className="inline-flex gap-2">
                <IconUpload size={20} className="text-muted-foreground" />
                <span className="text-muted-foreground text-sm">
                  Fazer upload de imagem
                </span>
              </div>
            </div>
          )}
          <form className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="code">Codigo</Label>
                <Input id="code" defaultValue={item.code} className="text-sm" />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="title">Produto</Label>
                <Input
                  id="title"
                  defaultValue={item.product}
                  className="text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="quantity">Quantidade (KG)</Label>
                <Input
                  id="quantity"
                  defaultValue={item.quantity}
                  className="text-sm"
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="nFluig">N Fluig</Label>
                <Input
                  id="nFluig"
                  defaultValue={item.nFluig}
                  className="text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date">Data</Label>
                <Input id="date" defaultValue={item.date} className="text-sm" />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger
                    id="status"
                    className="h-9 w-full cursor-pointer"
                  >
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent className="bg-card">
                    <SelectItem
                      value="Ativo"
                      className="hover:bg-muted cursor-pointer text-sm"
                    >
                      Ativo
                    </SelectItem>
                    <SelectItem
                      value="Em rascunho"
                      className="hover:bg-muted cursor-pointer text-sm"
                    >
                      Em rascunho
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="cost">Custo</Label>
              <Input id="cost" defaultValue={item.cost} className="text-sm" />
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button className="cursor-pointer text-sm font-medium hover:brightness-125">
            Salvar alterações
          </Button>
          <DrawerClose asChild>
            <Button
              variant="outline"
              className="cursor-pointer text-sm font-medium hover:brightness-125"
            >
              Voltar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
