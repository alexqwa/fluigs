'use server'

import { prisma } from '@/lib/prisma'

export async function ListProductsAndLogs() {
  const [products, logs] = await Promise.all([
    prisma.product.findMany({
      omit: {
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        name: 'asc',
      },
    }),
    prisma.importLog.findMany({
      omit: {
        errorDetail: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    }),
  ])

  return { products, logs }
}
