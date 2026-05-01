import z from 'zod'
import { useEffect, useMemo, useState } from 'react'

import { ListProductsAndLogs } from '@/actions/admin/products'

import { ProductInputSchema } from '@/generated/zod/schemas'
import { formatProductName } from '@/hooks/format-product-name'

const productInputSchema = ProductInputSchema.omit({
  id: true,
  buyer: true,
  stock: true,
  curveAbc: true,
  createdAt: true,
  updatedAt: true,
})

type ProductType = z.infer<typeof productInputSchema>

export function useProducts() {
  const [products, setProducts] = useState<ProductType[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const { products } = await ListProductsAndLogs()
      setProducts(products)
    }

    fetchProducts()
  }, [])

  const productMap = useMemo(() => {
    const map = new Map<string, ProductType>()

    for (const p of products) {
      map.set(p.code, {
        ...p,
        name: formatProductName(p.name),
      })
    }

    return map
  }, [products])

  return { productMap }
}
