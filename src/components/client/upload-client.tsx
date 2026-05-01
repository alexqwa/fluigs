'use client'

import z from 'zod'

import { Progress } from '@/components/ui/progress'
import { DataCard } from '@/components/ui/metrics-card'
import { FileUpload } from '@/components/ui/file-upload'
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
} from '@/components/ui/card'

import { ProductInputSchema } from '@/generated/zod/schemas'
import { useProductsAnalytics } from '@/hooks/use-dashboard'

const productInputSchema = ProductInputSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

type ProductType = z.infer<typeof productInputSchema>

const CURVE_KEYS = ['A', 'B', 'C'] as const

function CurveRow({
  label,
  formatted,
  percentage,
}: {
  label: string
  formatted: string
  percentage: number
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-muted-foreground w-4 text-sm">{label}</span>
      <Progress value={percentage} />
      <span className="text-muted-foreground min-w-12 text-right text-sm">
        {formatted}
      </span>
    </div>
  )
}

export function UploadClient({
  products,
  children,
}: {
  products: ProductType[]
  children: React.ReactNode
}) {
  const { curves, topBuyers, formatQuantity, totalCost, formatCurrency } =
    useProductsAnalytics(products)

  return (
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      <DataCard
        title="Total de Itens"
        value={formatQuantity(products.length)}
        description="Na base de dados atual"
        subdescription={`Estoque com custo avaliado em ${formatCurrency(totalCost)}`}
      />
      <DataCard
        title="Curva A"
        value={curves.A.formatted}
        description="Itens de alta relevância"
        subdescription={`Representando ${curves.A.formattedPercentage} do total de itens`}
      />
      <DataCard
        title="Curva B"
        value={curves.B.formatted}
        description="Itens de média relevância"
        subdescription={`Representando ${curves.B.formattedPercentage} do total de itens`}
      />
      <DataCard
        title="Curva C"
        value={curves.C.formatted}
        description="Itens de baixa relevância"
        subdescription={`Representando ${curves.C.formattedPercentage} do total de itens`}
      />
      <Card className="col-span-1 rounded-lg! p-4! md:col-span-2">
        <CardHeader>
          <CardTitle className="text-muted-foreground text-sm font-medium md:text-base">
            Distribuição Curva ABC
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {CURVE_KEYS.map((key) => (
              <CurveRow key={key} label={key} {...curves[key]} />
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
          {topBuyers.map((item, i) => (
            <div
              key={i}
              className="odd:bg-ring/15 flex flex-row items-center justify-between rounded-sm px-3 py-2"
            >
              <span className="text-muted-foreground text-xs uppercase">
                {item.buyer}
              </span>
              <span className="text-muted-foreground text-xs">
                {item.count}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
      <FileUpload />
      {children}
    </div>
  )
}
