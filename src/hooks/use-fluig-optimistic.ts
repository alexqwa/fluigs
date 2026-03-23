import z from 'zod'
import { useState } from 'react'

const fluigSchema = z.object({
  id: z.string(),
  date: z.date(),
  code: z.string().min(1, 'Código é obrigatório.'),
  product: z.string().min(1, 'Produto é obrigatório.'),
  quantity: z.string().min(1, 'Quantidade é obrigatório.'),
  nFluig: z.number().min(1, 'Número do fluig é obrigatório.'),
  costTotal: z.string().min(1, 'Custo do produto é obrigatório.'),
  cost: z.string().min(1, 'Custo do produto é obrigatório.'),
  status: z.enum(['Approved', 'Pending', 'Not_Approved']),
})

type FluigSchema = z.infer<typeof fluigSchema>

export function useFluigOptimistic(initialData: FluigSchema[]) {
  const [data, setData] = useState(initialData)

  const add = (item: FluigSchema) => {
    setData((prev) => [item, ...prev])
  }

  const update = (id: string, newData: Partial<FluigSchema>) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...newData } : item))
    )
  }

  const remove = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  const rollback = (oldData: FluigSchema[]) => {
    setData(oldData)
  }

  return { data, add, update, remove, rollback }
}
