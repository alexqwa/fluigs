'use server'

import { prisma } from '@/lib/prisma'

export async function ListProducts() {
  const products = await prisma.product.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return products
}
