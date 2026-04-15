'use server'

import { prisma } from '@/lib/prisma'

export async function Queries(userId: string) {
  const fluigs = await prisma.fluig.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return fluigs
}
