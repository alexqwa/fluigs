'use server'

import { updateTag } from 'next/cache'
import { prisma } from '@/lib/db/prisma'
import { getServerSession } from '@/actions/auth/session'

export async function Delete(id: string) {
  const session = await getServerSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  await prisma.fluig.delete({
    where: { id },
  })

  const userId = session.user.id
  updateTag(`fluigs-${userId}`)
  updateTag(`dashboard-table-${userId}`)
  updateTag(`dashboard-analytics-${userId}`)
  updateTag(`reports-table-${userId}`)
}
