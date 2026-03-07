import { prisma } from 'lib/prisma'
import { unstable_cache } from 'next/cache'

export function getFluigsCached(userId: string) {
  return unstable_cache(
    async () => {
      return prisma.fluig.findMany({
        where: {
          userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    },
    ['fluigs', userId],
    {
      tags: ['fluigs'],
      revalidate: 5,
    }
  )()
}
