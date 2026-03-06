'use server'

import { prisma } from '@/lib/prisma'
import { updateTag } from 'next/cache'
import { getServerSession } from 'actions/get-session'

export async function deleteFluig(id: string) {
  const session = await getServerSession()

  if (!session?.user) {
    throw new Error('Unauthorized')
  }

  await prisma.fluig.delete({
    where: { id },
  })

  updateTag('fluigs')
}
