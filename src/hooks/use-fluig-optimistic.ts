import z from 'zod'
import { useState, useRef } from 'react'

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

type OptimisticStatus = 'idle' | 'creating' | 'updating' | 'deleting'

type FluigOptimistic = FluigSchema & {
  _optimistic?: OptimisticStatus
  _temp?: boolean
}

export function useFluigOptimistic(initialData: FluigSchema[]) {
  const [data, setData] = useState<FluigOptimistic[]>(initialData)

  // Histórico automático para rollback
  const historyRef = useRef<FluigOptimistic[][]>([])

  const saveHistory = () => {
    historyRef.current.push(data)
  }

  const rollback = () => {
    const prev = historyRef.current.pop()
    if (prev) setData(prev)
  }

  const add = (item: FluigSchema) => {
    saveHistory()

    const tempId = `temp-${Date.now()}`

    const optimisticItem: FluigOptimistic = {
      ...item,
      id: tempId,
      _optimistic: 'creating',
      _temp: true,
    }

    setData((prev) => [optimisticItem, ...prev])

    return tempId
  }

  const confirmCreate = (tempId: string, realItem: FluigSchema) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === tempId
          ? { ...realItem, _optimistic: 'idle', _temp: false }
          : item
      )
    )
  }

  const update = (id: string, newData: Partial<FluigSchema>) => {
    saveHistory()

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...newData, _optimistic: 'updating' } : item
      )
    )
  }

  const confirmUpdate = (id: string, newData: FluigSchema) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...newData, _optimistic: 'idle' } : item
      )
    )
  }

  const remove = (id: string) => {
    saveHistory()

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, _optimistic: 'deleting' } : item
      )
    )
  }

  const confirmDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  return {
    data,
    add,
    update,
    remove,
    rollback,
    confirmCreate,
    confirmUpdate,
    confirmDelete,
  }
}
