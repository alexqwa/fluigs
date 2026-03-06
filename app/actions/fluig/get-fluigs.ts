'use server'

import { prisma } from '@/lib/prisma'
import { unstable_cache } from 'next/cache'
import { getServerSession } from 'actions/get-session'

async function getFluigsRaw(userId: string) {
  return await prisma.fluig.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function getFluigs() {
  const session = await getServerSession()

  if (!session?.user) {
    return []
  }

  const cached = unstable_cache(
    () => getFluigsRaw(session.user.id),
    ['fluigs', session.user.id],
    {
      tags: ['fluigs'],
      revalidate: 5,
    }
  )

  return cached()
}
