import { useMemo } from 'react'
import products from '@/hooks/products.json'
import { formatProductName } from '@/lib/format-product-name'

type Product = {
  code: string
  product: string
  cost: string
}

export function useProducts() {
  const productMap = useMemo(() => {
    const map = new Map<string, Product>()

    for (const p of products as Product[]) {
      map.set(p.code, {
        ...p,
        product: formatProductName(p.product),
      })
    }

    return map
  }, [])

  return { productMap }
}
