import { cacheLife, cacheTag } from 'next/cache'

import { prisma } from '@/lib/db/prisma'

export async function getFluigsCached(userId: string) {
  'use cache'
  cacheLife('hours')
  cacheTag('fluigs')

  return prisma.fluig.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
