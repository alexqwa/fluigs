'use server'

import { prisma } from '@/lib/prisma'
import { getServerSession } from './get-session'

export async function getFluigs() {
  const session = await getServerSession()

  if (!session?.user) {
    return []
  }

  return await prisma.fluig.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
