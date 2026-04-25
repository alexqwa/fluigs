'use server'

import { prisma } from '@/lib/db/prisma'

export async function ListFluigs(userId: string) {
  const fluigs = await prisma.fluig.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  })

  return fluigs
}
