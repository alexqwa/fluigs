import { useState, useRef, useEffect } from 'react'

export type OptimisticStatus = 'idle' | 'creating' | 'updating' | 'deleting'

export type FluigOptimistic<T> = T & {
  _optimistic?: OptimisticStatus
  _temp?: boolean
}

export function useFluigOptimistic<T extends { id: string }>(initialData: T[]) {
  const [data, setData] = useState<FluigOptimistic<T>[]>(initialData)
  const historyRef = useRef<FluigOptimistic<T>[][]>([])

  function reset(newData: T[]) {
    setData(newData)
    historyRef.current = []
  }

  useEffect(() => {
    reset(initialData)
  }, [initialData])

  const saveHistory = () => {
    historyRef.current.push(data)
  }

  const rollback = () => {
    const prev = historyRef.current.pop()
    if (prev) setData(prev)
  }

  // ── Create ──────────────────────────────────────────────────────────────────

  const add = (item: T) => {
    saveHistory()

    const tempId = `temp-${Date.now()}`

    const optimisticItem: FluigOptimistic<T> = {
      ...item,
      id: tempId,
      _optimistic: 'creating',
      _temp: true,
    }

    setData((prev) => [optimisticItem, ...prev])

    return tempId
  }

  const confirmCreate = (tempId: string, realItem: T) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === tempId
          ? { ...realItem, _optimistic: 'idle', _temp: false }
          : item
      )
    )
  }

  // ── Update ──────────────────────────────────────────────────────────────────

  const update = (id: string, newData: Partial<T>) => {
    saveHistory()

    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...newData, _optimistic: 'updating' } : item
      )
    )
  }

  const confirmUpdate = (id: string, newData: T) => {
    setData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...newData, _optimistic: 'idle' } : item
      )
    )
  }

  // ── Delete ──────────────────────────────────────────────────────────────────

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

  // ── Sync Data ──────────────────────────────────────────────────────────────────

  async function sync(fetcher: () => Promise<T[]>) {
    try {
      const freshData = await fetcher()
      reset(freshData)
    } catch (err) {
      rollback()
    }
  }

  // ── Paginate ──────────────────────────────────────────────────────────────────

  function paginate(page: number, pageSize: number) {
    const start = page * pageSize
    const end = start + pageSize
    return data.slice(start, end)
  }

  return {
    data,
    add,
    update,
    remove,
    confirmCreate,
    confirmUpdate,
    confirmDelete,
    rollback,
    reset,
    sync,
    paginate,
  }
}
