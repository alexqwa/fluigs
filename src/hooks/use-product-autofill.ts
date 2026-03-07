import { useProducts } from 'hooks/use-products'

export function useProductAutoFill() {
  const { productMap } = useProducts()

  function getProduct(code?: string) {
    if (!code) return null
    return productMap.get(code) ?? null
  }

  return { getProduct }
}
